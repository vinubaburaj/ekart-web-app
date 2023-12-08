import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { TextField } from "@mui/material";
import { useAuth } from "../../AuthContext";
import * as service from "./service";
import { emailValidator, checkPassword } from "../Validators";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Profile = () => {
  const { user } = useAuth();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState();
  const [reviewsByUser, setReviewsByUser] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(currentUser?.password);
  const [confirmPwdErr, setConfirmPwdErr] = useState(false);
  const [confirmPwdErrMsg, setConfirmPwdErrMsg] = useState("");

  const getUserProfile = async (id) => {
    try {
      const response = await service.getProfile(id);
      setProfileData(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getReviewsByUser = async (id) => {
    const response = await service.getReviewsByUser(id);
    setReviewsByUser(response);
  };

  //   useEffect to determine how much access to give to user
  // (especially the option to edit and view email/password)
  // and to fetch user info
  useEffect(() => {
    if (currentUser) {
      /*
        Condition 1: User is admin
        Condition 2: /profileId matches the current user id
        Condition 3: User is viewing his own profile after clicking it from account(without profileId)
         */
      if (
        currentUser.role === "ADMIN" ||
        currentUser._id === profileId ||
        !profileId
      ) {
        setHasFullAccess(true);
      }
    }

    // Fetching user info by profileId if another user is viewing it.
    // Or by currentUser id if the user is viewing their own profile
    const fetchById = profileId ? profileId : currentUser?._id;
    getUserProfile(fetchById);
    getReviewsByUser(fetchById);
  }, [currentUser, profileId]);

  const handleEdit = () => {
    // If profile is being edited, display a confirm password input field
    // whose initial value is the same as current password
    setConfirmPassword(profileData.password);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!profileId) {
      // User is updating their own profile, hence no profile id
      const response = await service.updateProfile(user._id, profileData);
      setProfileData(response);
    } else {
      // Admin is updating a user's profile
      const response = await service.updateProfile(profileId, profileData);
      setProfileData(response);
    }

    setEditing(false);
  };

  const checkEmailFormat = () => {
    if (profileData.email && !emailValidator(profileData.email)) {
      setEmailErrMsg("Invalid email");
      setEmailErr(true);
    }
  };

  const checkPasswordsMatch = () => {
    if (!checkPassword(profileData.password, confirmPassword)) {
      setConfirmPwdErrMsg("Passwords do not match");
      setConfirmPwdErr(true);
    }
  };

  const invalidFields = () => {
    if (emailErr || confirmPwdErr) {
      return true;
    }
    return false;
  };

  return (
    <>
      {profileData && (
        <Container className="mt-4">
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              {hasFullAccess && isEditing && (
                <Alert variant="info">You are currently editing profile.</Alert>
              )}
              <Form>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {hasFullAccess && (
                  <>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="email"
                        error={emailErr}
                        helperText={emailErr ? emailErrMsg : ""}
                        onFocus={() => {
                          setEmailErr(false);
                        }}
                        onBlur={checkEmailFormat}
                        disabled={!isEditing}
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        type="password"
                        value={profileData.password}
                        error={confirmPwdErr}
                        helperText={confirmPwdErr ? confirmPwdErrMsg : ""}
                        onFocus={() => setConfirmPwdErr(false)}
                        onBlur={checkPasswordsMatch}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            password: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    {isEditing && (
                      <Form.Group
                        className="mb-3"
                        controlId="formConfirmPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          disabled={!isEditing}
                          type="password"
                          value={confirmPassword}
                          error={confirmPwdErr}
                          helperText={confirmPwdErr ? confirmPwdErrMsg : ""}
                          onFocus={() => setConfirmPwdErr(false)}
                          onBlur={checkPasswordsMatch}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Group>
                    )}
                  </>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Buyer"
                      id="roleBuyer"
                      value="BUYER"
                      checked={profileData.role === "BUYER"}
                      onChange={(e) =>
                        setProfileData({ ...profileData, role: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                    <Form.Check
                      type="radio"
                      label="Seller"
                      id="roleSeller"
                      value="SELLER"
                      checked={profileData.role === "SELLER"}
                      onChange={(e) =>
                        setProfileData({ ...profileData, role: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </Form.Group>

                {hasFullAccess ? (
                  <Button
                    variant="primary"
                    disabled={isEditing && invalidFields()}
                    onClick={isEditing ? handleSave : handleEdit}
                  >
                    {isEditing ? "Save" : "Edit Profile"}
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Viewing Profile
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )}
      {reviewsByUser.length > 0 && (
        <Container className="mt-4 mb-2">
          <h5 className="mb-3">Reviews Made By User:</h5>
          <ul className="list-group">
            {reviewsByUser.map((review) => (
              <li key={review._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/Products/${review.productId.id}`}>
                    <h6>{review.productId.title}</h6>
                  </Link>
                  <span className="badge bg-primary">
                    {review.productId.category}
                  </span>
                </div>
                <p className="mb-0 ">"{review.review}"</p>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </>
  );
};

export default Profile;
