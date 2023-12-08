import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Roles } from "../../Constants/roles";
import axios from "axios";
import { createUser } from "./service";

const AdminCreateUser = ({ isOpen, onClose, onUserCreated }) => {
  const user = useSelector((state) => state.userReducer.currentUser);
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: Roles.BUYER,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      const response = await createUser(newUserData);

      // Close the modal and reset the form
      onClose();
      setNewUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: Roles.BUYER,
      });

      // Notify the parent component that the user has been created
      onUserCreated();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="modal-container"
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div className="modal-content">
          <Typography variant="h6" component="div" className="mb-2">
            Create User
          </Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={newUserData.firstName}
            onChange={handleInputChange}
            fullWidth
            required
            className="mb-2"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newUserData.lastName}
            onChange={handleInputChange}
            fullWidth
            required
            className="mb-2"
          />
          <TextField
            label="Email"
            name="email"
            value={newUserData.email}
            onChange={handleInputChange}
            fullWidth
            required
            className="mb-2"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={newUserData.password}
            onChange={handleInputChange}
            fullWidth
            required
            className="mb-2"
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={newUserData.confirmPassword}
            onChange={handleInputChange}
            fullWidth
            required
            className="mb-2"
          />
          <FormControl fullWidth required className="mb-2">
            <InputLabel id="role-label" style={{ marginBottom: "8px" }}>
              Role
            </InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={newUserData.role}
              onChange={handleInputChange}
              variant="outlined"
              style={{ marginTop: "8px" }} // Adjust this value to increase the gap
            >
              {Object.values(Roles).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="d-flex justify-content-between mt-2">
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateUser}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminCreateUser;
