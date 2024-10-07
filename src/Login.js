import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './StateProvider'; // Import the state provider

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between sign-in and sign-up
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState(''); // State for last name
  const [{}, dispatch] = useStateValue(); // Access dispatch from state provider

  // Handle sign-in
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate('/'); // Redirect to the homepage after successful login
      })
      .catch((error) => alert(error.message));
  };

  // Handle registration
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        // Navigate to the homepage after successful registration
        if (auth) {
          // Dispatch user info to the state
          dispatch({
            type: 'SET_USER',
            user: {
              email: auth.user.email,
              firstName: firstName,
              lastName: lastName,
            },
          });
          navigate('/'); // Redirect to homepage
        }
      })
      .catch((error) => alert(error.message));
  };

  // Toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle guest login
  const loginAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        navigate('/'); // Redirect to the homepage after guest login
      })
      .catch((error) => alert(error.message));
  };

  // Toggle between Sign-In and Sign-Up views
  const toggleSignInSignUp = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img className='login__logo' src='Amazon_logo.jpg' alt='Amazon Logo' />
      </Link>

      <div className='login__container'>
        <h1>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>

        <form>
          {/* Show first name and last name fields only during Sign-Up */}
          {!isSignIn && (
            <>
              <h5>First Name</h5>
              <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='Enter your first name'
                required
              />
              <h5>Last Name</h5>
              <input
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Enter your last name'
                required
              />
            </>
          )}

          <h5>Email</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />

          <h5>Password</h5>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />

          {/* Show Password Toggle */}
          <div className='showPassword'>
            <input
              type='checkbox'
              id='showPasswordCheckbox'
              checked={showPassword}
              onChange={handleShowPassword}
            />
            <label htmlFor='showPasswordCheckbox'>Show Password</label>
          </div>

          {/* Display Sign-In or Sign-Up Button based on state */}
          {isSignIn ? (
            <>
              <button type='submit' onClick={signIn} className='login__signInButton'>
                Sign In
              </button>
              <button type='button' className='login__guestButton' onClick={loginAsGuest}>
                Login as Guest
              </button>
            </>
          ) : (
            <button type='submit' onClick={register} className='login__signInButton'>
              Sign Up
            </button>
          )}
        </form>

        {/* Show conditions notice only during Sign-In */}
        {isSignIn ? (
          <div className='login__acceptCondition'>
            <input type='checkbox' id='acceptConditions' required />
            <label htmlFor='acceptConditions' className='login__condition'>
              By signing-in you agree to the <strong>AMAZON FAKE CLONE</strong> Conditions of Use & Sale.
              Please see our <Link to="/privacy">Privacy Notice</Link>, our <Link to="/cookies">Cookies Notice</Link>, and our <Link to="/ads">Internet-Based Ads Notice</Link>.
            </label>
          </div>
        ) : null}

        {/* Toggle between Sign-In and Sign-Up */}
        <button onClick={toggleSignInSignUp} className='login__toggleButton'>
          {isSignIn ? 'Create New Account' : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
}

export default Login;
