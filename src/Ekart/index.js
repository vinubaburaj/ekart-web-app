import {Route, Routes, useLocation} from "react-router";
import Home from "./Home";
import Login from "./Login";
import Products from "./Products";
import ProductDetails from "./Products/product-details";
import {Navigate} from "react-router-dom";
import Navbar from "./Navbar";
import './index.css';
import Register from "./Register";

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
        </Routes>
      </div>
  )
}

export default Ekart;