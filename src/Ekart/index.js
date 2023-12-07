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
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Account/Wishlist" element={<Wishlist/>}/>
          <Route path="/Seller/AddProduct" element={<AddProduct/>}/>
        </Routes>
      </div>
  )
}

export default Ekart;