import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import './index.css';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {

  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  return (
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h5" component="div" className="wd-title">
            E-Kart
          </Typography>

          <Link to={`/Home`} className="wd-td-none wd-fg-white">
            <Typography variant="h6" component="div" className="wd-title ms-5">
              Home
            </Typography>
          </Link>

          <Link to={`/`} className="wd-td-none wd-fg-white">
            <Typography variant="h6" component="div" className="wd-title ms-4">
              Account
            </Typography>
          </Link>

          <Link to={`/Login`} className="wd-td-none wd-fg-white">
            <Typography variant="h6" component="div" className="wd-title ms-4">
              Sign In
            </Typography>
          </Link>

          {/* Search Bar in the middle */}
          <div className="wd-search-container">
            <div className="wd-search-box">
              <InputBase
                  placeholder="Search..."
                  inputProps={{'aria-label': 'search'}}
                  className="wd-search-input"
              />

              <IconButton className="wd-search-icon wd-fg-white"
                          aria-label="search">
                <SearchIcon/>
              </IconButton>
            </div>
          </div>

          <Link to={`/Cart`} className="wd-td-none wd-fg-white">
            <Typography variant="h6" component="div" className="wd-title me-4">
              Cart: {cartItems.length}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
