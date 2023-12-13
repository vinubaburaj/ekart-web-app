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
import {MdOutlineAccountCircle} from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, invalidateAuth} = useAuth();
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
    if (searchTerm) {
      if (isSeller) {
        navigate(`/Products/seller/search/${searchTerm}`);
      } else {
        dispatch(setCurrentUser({...user, prevSearch: searchTerm}));
        navigate(`/Products/search/${searchTerm}`);
      }
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
          <div className={'row w-100 align-items-center'}>
            <div className={'d-none d-md-block col-md-1 px-0'}>
              <Typography variant="h5" component="div" className="wd-title">
                E-Kart
              </Typography>
            </div>
            <div className={'d-flex d-md-none col-1 px-2'}>
              <Link to={'/Home'}>
                <Typography variant="h5" component="div" className="wd-title"
                            color={'white'}>
                  E
                </Typography>
              </Link>
            </div>

            <div className={'d-none d-md-flex col-md-1 px-0'}>
              <Link to={`/Home`} className="wd-td-none wd-fg-white">
                <Typography variant="h6" component="div"
                            className="wd-title ms-5">
                  Home
                </Typography>
              </Link>
            </div>

            <div className={'col-8 col-md-4 col-lg-5 col-xl-4 offset-md-1'
                + ' offset-xl-2'}>
              {/* Search Bar in the middle */}
              <div className="d-flex flex-grow-1 justify-content-center ms-3">
                <InputBase
                    placeholder={searchPlaceholder}
                    inputProps={{"aria-label": "search"}}
                    className="wd-search-input"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }}
                />
                <IconButton
                    tabIndex={0}
                    className="wd-search-icon wd-fg-white"
                    aria-label="search"
                    onClick={search}
                >
                  <SearchIcon/>
                </IconButton>
              </div>
            </div>

            <div className={`${isUserLoggedIn ? "d-flex"
                : "d-none d-md-flex"} col-1 col-md-2 col-xl-1 px-0 ${isUserLoggedIn
                ? "offset-md-1 offset-lg-0 offset-xl-2" : "offset-xl-1"}`}>
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
                      <p className={"d-none d-md-flex fs-6 mb-0"}>Hello, {user?.firstName}</p>
                  )}
                </Typography>
                <div className="dropdown d-flex justify-content-center">
                  <div
                      className="d-none d-md-flex btn btn-outline-light border-0 dropdown-toggle fs-5 py-0"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                    Account
                  </div>
                  <div className={'d-flex d-md-none dropdown-toggle'}
                       role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                    <MdOutlineAccountCircle size={30}/>
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/Account/Profile"} className="dropdown-item">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      {!isSeller && <Link to={"/Account/Orders"}
                                          className="dropdown-item">
                        My Orders
                      </Link>}
                    </li>
                    <li>
                      {!isSeller && <Link to={"/Account/Wishlist"}
                                          className="dropdown-item">
                        Wishlist
                      </Link>}
                    </li>
                    {isUserLoggedIn && (
                        <>
                          <li>
                            <hr className={"dropdown-divider"}/>
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
            </div>

            {!isUserLoggedIn && (
                <div className={`col-3 col-md-1 justify-content-end px-0`}>
                  <Link to={`/Login`} className="wd-td-none wd-fg-white">
                    <Typography variant="h6" component="div"
                                className="wd-title">
                      Sign In
                    </Typography>
                  </Link>
                </div>
            )}


            {role !== Roles.ADMIN && !isSeller && (
                <div className={`${isUserLoggedIn ? "d-flex"
                        : "d-none d-md-flex"}  ${isUserLoggedIn ? "col-md-2" :
                        "col-md-1"} col-2 col-xl-1 px-0`
                    + ' justify-content-end'}>
                  <Link to={`/Cart`} className="wd-td-none wd-fg-white">
                    <Typography component="div"
                                className="wd-title">
                      <FaShoppingCart className={"me-1"} size={25}/>
                      <div
                          className={'d-none d-md-flex'}>Cart: {cartItemsFromReducer
                          ? cartItemsFromReducer.length
                          : 0}</div>
                    </Typography>
                  </Link>
                </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
