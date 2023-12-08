import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import AdminUsersTable from "./adminUsersTable";
import AdminCreateUser from "./adminCreateUser.js";

function AdminHome() {
  const user = useSelector((state) => state.userReducer.currentUser);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [shouldRefreshUsers, setShouldRefreshUsers] = useState(false);

  const handleUserCreated = () => {
    // Set the flag to true to indicate that users need to be refreshed
    setShouldRefreshUsers(true);
  };

  return (
    <div className={"m-3"}>
      <div className={"fs-1 d-flex justify-content-center"}>
        Welcome, {user?.firstName}!
      </div>
      <div className={"fs-3 d-flex justify-content-center"}>
        Since you are an admin user, you can manage the following users of
        Ekart.
      </div>

      {/* Button to open the Create User modal */}
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsCreateUserModalOpen(true)}
        >
          + Create User
        </Button>
      </div>

      {/* AdminCreateUser modal */}
      <AdminCreateUser
        isOpen={isCreateUserModalOpen}
        onClose={() => {
          setIsCreateUserModalOpen(false);
          // If the flag is set, refresh the users
          if (shouldRefreshUsers) {
            setShouldRefreshUsers(false);
          }
        }}
        onUserCreated={handleUserCreated}
      />

      <AdminUsersTable shouldRefreshUsers={shouldRefreshUsers} />
    </div>
  );
}

export default AdminHome;
