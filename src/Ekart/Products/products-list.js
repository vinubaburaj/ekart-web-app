import ProductCard from "./product-card";
import db from "../Database";

function ProductsList() {
  const products = db.products;

  return (
    <>
      <div className="row">
        {products.map((product) => (
          <div className="col" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsList;
