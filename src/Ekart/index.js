import {Route, Routes, useLocation} from "react-router";
import Home from "./Home";
import Login from "./Auth/Login";
import Products from "./Products";
import ProductDetails from "./Products/product-details";
import {Navigate} from "react-router-dom";
import Navbar from "./Navbar";
import Cart from "./Cart";
import './index.css';
import Register from "./Auth/Register";
import Wishlist from "./Wishlist";
import ProductsList from "./Products/products-list";
import AddProduct from "./Seller/addProduct";
import Profile from "./Profile";
import SellerProductsList from "./Seller/seller-products-list";
import ErrorPage from "../Common/errorPage";
import ProtectedRoute from "./Utils/protectedRoutes";
import UnauthorizedPage from "../Common/unauthorizedPage";

function Ekart() {
  const path = useLocation().pathname;
  let showNavbar = false;
  const hideNavbarPaths = ["/Login", "/Register"];
  showNavbar = !hideNavbarPaths.includes(path);
  return (
      <div className={'container-fluid px-0 mx-0'}>
        {showNavbar && <Navbar/>}
        <Routes>
          <Route path="/" element={<Navigate to={"/Home"}/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Products" element={<Products/>}/>
          <Route path="/Products/:productId" element={<ProductDetails/>}/>
          <Route path="/Products/search/:searchTerm" element={<ProductsList/>}/>
          <Route path="/Products/seller/search/:searchTerm" element={
            <ProtectedRoute><SellerProductsList/></ProtectedRoute>}/>
          <Route path="/Cart"
                 element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
          <Route path="/Account/Wishlist"
                 element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
          <Route path="/AddProduct"
                 element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
          <Route path="/EditProduct/:productId"
                 element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
          <Route path={"/Account/Wishlist"}
                 element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
          {/* To fetch the profile of the user who is currently logged in (according to requirement) */}
          <Route path={"/Account/Profile"} exact
                 element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          {/* To fetch the profile of another user using their userId */}
          <Route path={"/Account/Profile/:profileId"}
                 element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/Error" element={<ErrorPage/>}/>
          <Route path="/Unauthorized" element={<UnauthorizedPage/>}/>
        </Routes>
      </div>
  )
}

export default Ekart;