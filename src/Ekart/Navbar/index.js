import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {FaShoppingCart} from "react-icons/fa";
import * as authServices from "../Auth/authService";
import {setCurrentUser, setRole} from "../Auth/userReducer";
import {useAuth} from "../../AuthContext";
import {getCart} from "../Cart/service";
import {setCartItems} from "../Cart/cartReducer";
import {Roles} from "../../Constants/roles";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, invalidateAuth } = useAuth();
  const role = useSelector((state) => state.userReducer.role);
  const cartItemsFromReducer = useSelector(
    (state) => state.cartReducer.cartItems
  );
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!user);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search...");
  const [isSeller, setIsSeller] = useState(role === Roles.SELLER);
  console.log(role);


  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      dispatch(setCartItems(cartData));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const search = () => {
    if (isSeller) {
      navigate(`/Products/seller/search/${searchTerm}`);
    } else {
      navigate(`/Products/search/${searchTerm}`);
    }
  }


  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
      fetchCart(); // Fetching the cart info after a refresh as user gets updated after refresh.
    }
    if (role === Roles.SELLER) {
      setIsSeller(true);
      setSearchPlaceholder("Search your products...");
    }
  }, [user, role]);

  const [searchTerm, setSearchTerm] = useState("");

  const logout = async () => {
    await authServices.logout();
    invalidateAuth();
    dispatch(setCurrentUser(null));
    dispatch(setRole(Roles.ANON));
    setIsUserLoggedIn(false);
    navigate("/Login");
  };

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

        {/* Search Bar in the middle */}
        <div className="d-flex flex-grow-1 justify-content-center ms-3">
          <InputBase
            placeholder={searchPlaceholder}
            inputProps={{ "aria-label": "search" }}
            className="wd-search-input"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <IconButton
            className="wd-search-icon wd-fg-white"
            aria-label="search"
            onClick={search}
          >
            <SearchIcon />
          </IconButton>
        </div>

        <div
          className={`wd-td-none wd-fg-white me-3 ${
            role === Roles.ADMIN ? "wd-ml-auto" : ""
          }`}
        >
          <Typography
            variant="h6"
            component="div"
            className="wd-title flex-column"
          >
            {isUserLoggedIn && (
              <p className={"fs-6 mb-0"}>Hello, {user?.firstName}</p>
            )}
          </Typography>
          <div className="dropdown">
            <div
              className="btn btn-outline-light border-0 dropdown-toggle fs-5 py-0"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </div>
            <ul className="dropdown-menu">
              <li>
                <Link to={"/Account/Profile"} className="dropdown-item">
                  My Profile
                </Link>
              </li>
              <li>
                {!isSeller && <Link to={"/Account/Orders"} className="dropdown-item">
                  My Orders
                </Link>}
              </li>
              <li>
                {!isSeller && <Link to={"/Account/Wishlist"} className="dropdown-item">
                  Wishlist
                </Link>}
              </li>
              {isUserLoggedIn && (
                <>
                  <li>
                    <hr className={"dropdown-divider"} />
                  </li>
                  <li>
                    <div
                      className={"dropdown-item text-danger wd-cursor-pointer"}
                      onClick={logout}
                    >
                      Sign Out
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {!isUserLoggedIn && (
          <Link to={`/Login`} className="wd-td-none wd-fg-white me-3">
            <Typography variant="h6" component="div" className="wd-title ms-4">
              Sign In
            </Typography>
          </Link>
        )}

        {role !== Roles.ADMIN && !isSeller && (
          <Link to={`/Cart`} className="wd-td-none wd-fg-white">
            <Typography variant="h6" component="div" className="wd-title me-4">
              <FaShoppingCart className={"me-1"} />
              Cart: {cartItemsFromReducer ? cartItemsFromReducer.length : 0}
            </Typography>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
