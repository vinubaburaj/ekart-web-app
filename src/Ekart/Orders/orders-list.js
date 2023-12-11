import { useDispatch, useSelector } from "react-redux";
import { findAllOrders } from "./service";
import { useState, useEffect } from "react";


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

  return <>Hello!</>;
};

export default OrdersList;
