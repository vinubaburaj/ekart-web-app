import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { deleteUser, getAllUsers } from "./service";

function AdminUsersTable({ shouldRefreshUsers }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    // Fetch the list of users from the backend when the component mounts
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };

    fetchUsers();
  }, [user, shouldRefreshUsers]);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUserId);
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u._id !== selectedUserId)
      );
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteButtonClick = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="m-3">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{ color: "white", background: "#3e849a" }}
              >
                First Name
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "white", background: "#3e849a" }}
              >
                Last Name
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "white", background: "#3e849a" }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "white", background: "#3e849a" }}
              >
                Role
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "white", background: "#3e849a" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDeleteButtonClick(user._id)}
                    color="secondary"
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminUsersTable;
