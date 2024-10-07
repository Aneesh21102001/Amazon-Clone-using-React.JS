import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // Address state
  const [address, setAddress] = useState({
    houseNumber: '',
    street: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
  });

  useEffect(() => {
    // Generate Stripe client secret whenever the basket changes
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `http://127.0.0.1:5001/clone-5da2c/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error generating client secret:", err);
      }
    };

    getClientSecret();
  }, [basket]);

  const handleChange = (event) => {
    // Handle change in CardElement and update error and disabled states
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleInputChange = (e) => {
    // Update the delivery address state on input change
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentIntent) {
        const userOrdersRef = doc(collection(db, 'users', user?.uid, 'orders'), paymentIntent.id);

        await setDoc(userOrdersRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
          address: address,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_BASKET',
        });

        navigate('/orders', { replace: true });
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      setProcessing(false);
    }
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <div className="payment__greeting">
              <h4>{user ? `Hello, ${user.email}` : 'Hello, Guest'}</h4>
            </div>

            <form className="payment__addressForm">
              {Object.keys(address).map((key) => (
                <div className="payment__formGroup" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input
                    type="text"
                    name={key}
                    value={address[key]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key}`}
                    required
                  />
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button className="payment__button" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div className="payment__error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
