import React from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';
import FlipMove from 'react-flip-move';
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from './StateProvider';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div>
            <div className='checkout'>
                <div className='checkout__left'>
                    <img
                        className='checkout__ad'
                        src='add.jpg'
                        alt='Ad'
                    />
                    <div>
                        <h3>Hello, {user ? user.email : 'Guest'}</h3>
                        <h2 className='checkout__title'>
                            Your Shopping Cart
                        </h2>
                        {/* Wrap the CheckoutProduct list inside FlipMove */}
                        <FlipMove>
                            {basket.map(item => (
                                <CheckoutProduct
                                    key={item.id}  // Add a key for each product
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                />
                            ))}
                        </FlipMove>
                    </div>
                </div>
                <div className='checkout__right'>
                    <Subtotal />
                </div>        
            </div>
        </div>
    )
}

export default Checkout
