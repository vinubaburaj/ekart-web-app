import { useParams } from "react-router";
import db from "../Database";
import Navbar from "../Navbar";
import staticImage from '../Database/product-img.avif'
import { Button } from "@mui/material";

function ProductDetails() {
  const { productId } = useParams();
  console.log(productId);
  const product = db.products.find((p) => p._id === parseInt(productId));

  return (
    <>
    <Navbar />
    <div id="wd-product-list-header">
        <h4>Products Details</h4>
      </div>
      <hr />
       <img src={staticImage} width={250} height={250} />
      <h4 className="mt-2">{product.name}</h4>
      <h5 className="mt-2">{product.price}</h5>
      <Button className="mb-2" variant="outlined" size="small" color="primary">
        Add to Cart
      </Button>
    </>
  );
}

export default ProductDetails;
