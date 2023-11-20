import Navbar from "../Navbar";
import ProductsList from "./products-list";
import './index.css';
import ProductDetails from "./product-details";
import { Routes, Route } from "react-router";

function Products() {


  return (
    <>
      <div className="ms-4">
      <div id="wd-product-list-header">
        <h4>Products</h4>
      </div>
      <hr />
      <ProductsList />
      </div>
      {/* <Routes>
        <Route path="/:productId" element={< ProductDetails />} />
      </Routes> */}
    </>
  );
}

export default Products;
