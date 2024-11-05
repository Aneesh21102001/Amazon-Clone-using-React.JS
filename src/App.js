import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import PrivacyNotice from './PrivacyNotice'; 
import CookiesNotice from './CookiesNotice'; 
import Orders from './Orders';
import InternetBasedAdsNotice from './InternetBasedAdsNotice'; // Import the InterestBasedAdsNotice component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('THE USER IS >>>', authUser);
      if (authUser) {
        // The user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // The user logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Header is outside of Routes to always be visible */}
        <Header />

        {/* Routes is the new Switch */}
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Checkout route */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Add Privacy Notice route */}
          <Route path="/privacy" element={<PrivacyNotice />} /> 

          {/* Add Cookies Notice route */}
          <Route path="/cookies" element={<CookiesNotice />} />  

          {/* Add Interest-Based Ads Notice route */}
          <Route path="/ads" element={<InternetBasedAdsNotice />} />

          {/* Orders Route */}
          <Route path="/orders" element={<Orders />} />

          {/* Payment Route with Elements provider */}
          <Route path="/payment" element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
