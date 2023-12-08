import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AdminUsersTable from "./adminUsersTable";

function AdminHome() {
  const user = useSelector((state) => state.userReducer.currentUser);
  console.log(user);
  return (
    <div className={"m-3"}>
      <div className={"fs-1 d-flex justify-content-center"}>
        Welcome, {user?.firstName}!
      </div>
      <div className={"fs-3 d-flex justify-content-center"}>
        Since you are an admin user, you can manage the following users of
        Ekart.
      </div>
      <AdminUsersTable />
    </div>
  );
}

export default AdminHome;
