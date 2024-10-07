import React from "react";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {  
  const [{basket, user}, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if(user) {
      auth.signOut();
    }    
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="amazon.png"
          alt="Amazon Logo" // Added alt attribute for accessibility
        />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello, {user ? user.email : 'Guest'}
            </span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        <Link to='./orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <a href="https://www.primevideo.com/region/eu/offers/nonprimehomepage/ref=dv_web_force_root" target="_blank" rel="noopener noreferrer">
          <div className="header__option">
            <span className="header__optionLineOne">Prime</span>
            <span className="header__optionLineTwo">Video</span>
          </div>
        </a>

        <Link to='/checkout'>
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
