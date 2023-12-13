import ProductsList from "./products-list";
import './index.css';
import {useSelector} from "react-redux";
import {Roles} from "../../Constants/roles";
import SellerProductsList from "../Seller/seller-products-list";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import SnackbarComponent from "../../Common/snackbar";
import {useEffect, useState} from "react";

function Products() {
  const role = useSelector((state) => state.userReducer.role);
  const navigate = useNavigate();
  const location = useLocation();
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  }
  useEffect(() => {
    if (location.state?.message) {
      setSnackBarMsg(location.state.message);
      setSeverity("success");
      setSnackBarOpen(true);
    }
  }, [location.state?.message]);
  return (
      <>
        <div className="ms-4 pt-2">
          <div id="wd-product-list-header">
            {role === Roles.SELLER &&
                <div className={'d-flex flex-row'}>
                  <div className={'fs-4'}>Products listed by you</div>
                  <Button variant="contained" color="primary"
                          className={'ms-3'}
                          onClick={() => navigate('/AddProduct')}>Add a new
                    product</Button>
                </div>
            }
            {role !== Roles.SELLER && <div className={'fs-4'}>Products</div>}
          </div>
          <hr/>
          {role !== Roles.SELLER && <ProductsList/>}
          {role === Roles.SELLER && <SellerProductsList/>}
          <SnackbarComponent snackbarOpen={snackbarOpen}
                             snackbarMsg={snackbarMsg}
                             severity={severity} horizontal="center"
                             vertical="top" handleClose={handleSnackbarClose}/>
        </div>
      </>
  );
}

export default Products;
