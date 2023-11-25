import ProductsList from "./products-list";
import './index.css';

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
