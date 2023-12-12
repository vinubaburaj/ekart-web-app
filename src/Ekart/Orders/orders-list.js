import { useDispatch, useSelector } from "react-redux";
import { findAllOrders, cancelOrder } from "./service";
import { useState, useEffect } from "react";
import OrderCard from "./order-card";
import { Grid } from "@mui/material";

const OrdersList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.currentUser);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const fetchedOrders = await findAllOrders();
    setOrders(fetchedOrders);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    await cancelOrder(orderId);

    fetchAllOrders();
  };

  return (
    <Grid container spacing={2}>
      {orders.map((order) => (
        <Grid item key={order._id} xs={12} sm={6} md={6} lg={4}>
          <OrderCard
            order={order}
            onCancel={() => handleCancelOrder(order._id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default OrdersList;
