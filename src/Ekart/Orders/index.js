import OrdersList from "./orders-list";
import { useSelector } from "react-redux";
import { Roles } from "../../Constants/roles";
import { useNavigate } from "react-router";
import "./index.css";

function Orders() {
  const navigate = useNavigate();
  const role = useSelector((state) => state.userReducer.role);
  return (
    <>
      {role === Roles.BUYER && (
        <>
          <div className="ms-4">
            <div id="wd-order-list-header">
              <div className={"fs-4"}>Orders</div>
            </div>
            <hr />
            <OrdersList />
          </div>
        </>
      )}
      {role !== Roles.BUYER && navigate("/Unauthorized")}
    </>
  );
}

export default Orders;
