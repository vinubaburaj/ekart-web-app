import ProductCard from "./product-card";
import db from "../Database";

function ProductsList() {
  const products = db.products;

  return (
    <>
      <div className="row">
        {products.map((product) => (
          <div className="col col-sm-6 col-md-4 col-lg-3 mb-3" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsList;
