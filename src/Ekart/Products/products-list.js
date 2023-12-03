import ProductCard from "./product-card";
import * as service from "./service";
import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";

function ProductsList() {
  // const products = db.products;

  const [products, setProducts] = useState([]);


  const { searchTerm } = useParams(null);

  const searchProducts = async(searchTerm) => {
    const fetchedProducts = await service.searchProductsByTitle(searchTerm);
    setProducts(fetchedProducts);
  }

  const fetchAllProducts = async() => {
    const fetchedProducts = await service.findAllProducts();
    setProducts(fetchedProducts);
  }

  useEffect(() => {
    if (searchTerm) {
      searchProducts(searchTerm)
    } else {
     fetchAllProducts();
    }
  }, [searchTerm]);

  return (
    <>
      {products && (
        <div className="row">
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
