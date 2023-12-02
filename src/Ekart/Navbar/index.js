import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography
} from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material';
import './index.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar = () => {

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const [searchTerm, setSearchTerm] = useState('');

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
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                  }}
              />

              <IconButton className="wd-search-icon wd-fg-white"
                          aria-label="search"
                          onClick={() => navigate(`/Products/search/${searchTerm}`)}>
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
