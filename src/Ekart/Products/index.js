import ProductsList from "./products-list";
import './index.css';
import {useSelector} from "react-redux";
import {Roles} from "../../Constants/roles";
import SellerProductsList from "../Seller/seller-products-list";

function Products() {
  const role = useSelector((state) => state.userReducer.role);
  return (
      <>
        <div className="ms-4">
          <div id="wd-product-list-header">
            {role === Roles.SELLER && <div className={'fs-4'}>Products listed by you</div>}
            {role !== Roles.SELLER && <div className={'fs-4'}>Products</div>}
          </div>
          <hr/>
          {role !== Roles.SELLER && <ProductsList/>}
          {role === Roles.SELLER && <SellerProductsList/>}
        </div>
      </>
  );
}

export default Products;
