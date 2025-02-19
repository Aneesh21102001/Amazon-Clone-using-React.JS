import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('DD MM YYYY, hh:mm a')}</p>
            <p className='order__id'>
                <small>{order.id}</small>
            </p>
            
            {/* Corrected map function */}
            {order.data.basket?.map((item) => (
                <CheckoutProduct
                    key={item.id} // Add a unique key for each CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    hideButton
                />
            ))}
            <CurrencyFormat 
                renderText={(value)=>(
                    <h3 className='order__total'>Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount/100}
                displayType={"text"}
                thousandSeperator={true}
                prefix={"₹"}
            />
        </div>
    );
}

export default Order;
