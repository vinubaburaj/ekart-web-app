import ProductCard from "./product-card";
import db from "../Database";
import * as service from "./service";
import { useState, useEffect } from "react";

function ProductsList() {
  // const products = db.products;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    service
      .findAllProducts()
      .then((fetchedProducts) => setProducts(fetchedProducts));
  }, []);

  return (
    <>
      {products && (
        <div className="row">
          {/* {JSON.stringify(products)} */}
          {products.map((product) => (
            <div
              className="col col-sm-6 col-md-4 col-lg-3 mb-3"
              key={product._id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductsList;
