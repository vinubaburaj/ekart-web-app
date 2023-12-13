import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import * as authService from "../authService";
import SnackbarComponent from "../../../Common/snackbar";
import {checkPassword, emailValidator} from "../../Validators";

function Register() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [confirmPwdErr, setConfirmPwdErr] = useState(false);
  const [roleErr, setRoleErr] = useState(false);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [lastNameErrMsg, setLastNameErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');
  const [confirmPwdErrMsg, setConfirmPwdErrMsg] = useState('');
  const [roleErrMsg, setRoleErrMsg] = useState('');
  const [userExists, setUserExists] = useState(false);

  const register = async () => {
    console.log(user);
    let response;
    if (!checkAllFields()) {
      return;
    }
    if (!checkPassword(user.password, user.confirmPassword)) {
      setConfirmPwdErrMsg('Passwords do not match');
      setConfirmPwdErr(true);
      return;
    }
    response = await authService.register(user);
    if (response.status === 400) {
      setUserExists(true);
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      })
      return;
    }
    setSnackbarMsg("Successfully registered! Redirecting to login...");
    setSeverity("success");
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/Login');
    }, 4000)

    console.log(response);
  }

  const checkAllFields = () => {
    if (user.firstName === '' || user.lastName === '' || user.email === ''
        || user.password === '' || user.confirmPassword === '' || user.role
        === '') {
      if (user.firstName === '') {
        setFirstNameErrMsg('Enter first name');
        setFirstNameErr(true);
      }
      if (user.lastName === '') {
        setLastNameErrMsg('Enter last name');
        setLastNameErr(true);
      }
      if (user.email === '') {
        setEmailErrMsg('Enter email');
        setEmailErr(true);
      }
      if (user.password === '') {
        setPwdErrMsg('Enter password');
        setPwdErr(true);
      }
      if (user.confirmPassword === '') {
        setConfirmPwdErrMsg('Confirm password');
        setConfirmPwdErr(true);
      }
      if (user.role === '') {
        setRoleErrMsg('Select role');
        setRoleErr(true);
      }
      return false;
    }
    return true;
  }

  const checkEmailFormat = () => {
    if (user.email && !emailValidator(user.email)) {
      setEmailErrMsg('Invalid email');
      setEmailErr(true);
    }
  }

  return (
      <div className={'row'}>
        {userExists && <div className="alert alert-danger">User with this email
          already exists! Try <Link to={'/Login'}>logging in</Link> instead.
        </div>}
        <div className={'d-none d-md-flex col-md-6 p-5'}>
          <div
              className={'d-flex flex-column justify-content-center align-items-center'}>
            <Link to={'/'} className={'fs-1'}>E-kart</Link>
            <div className={'fs-2'}>The best products, all in one place.
            </div>
            <img
                src={'https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png'}
                className={'mt-3'}
                width="100%"
                height="100%"
                alt={'store-img'}/>
          </div>
        </div>
        <div className={'col-12 col-md-6 p-5'}>
          <div className={'d-flex flex-column d-md-none'}>
            <Link to={'/'} className={'fs-1'}>E-kart</Link>
            <div className={'fs-2'}>The best products, all in one place.
            </div>
          </div>
          <h3 className={'mt-3'}>Sign up</h3>
          <div className={'row'}>
            <div className={'col-12'}>
              <TextField
                  error={firstNameErr}
                  helperText={firstNameErr ? firstNameErrMsg : ''}
                  onFocus={() => {
                    setFirstNameErr(false)
                  }}
                  id="first-name"
                  label="First Name"
                  variant="outlined"
                  className="mt-3 w-100"
                  onChange={(e) => setUser(
                      {...user, firstName: e.target.value})}
              />
            </div>
            <div className={'col-12'}>
              <TextField
                  error={lastNameErr}
                  helperText={lastNameErr ? lastNameErrMsg : ''}
                  onFocus={() => {
                    setLastNameErr(false)
                  }}
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  className="mt-3 w-100"
                  onChange={(e) => setUser({...user, lastName: e.target.value})}
              />
            </div>
            <div className={'col-12'}>
              <TextField
                  error={emailErr}
                  helperText={emailErr ? emailErrMsg : ''}
                  onFocus={() => {
                    setEmailErr(false)
                  }}
                  onBlur={checkEmailFormat}
                  type={"email"}
                  id="email-id"
                  label="Email ID"
                  variant="outlined"
                  className="mt-3 w-100"
                  onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
            <div className={'col-12'}>
              <TextField
                  error={pwdErr}
                  helperText={pwdErr ? pwdErrMsg : ''}
                  onFocus={() => {
                    setPwdErr(false)
                  }}
                  type={"password"}
                  id="password"
                  label="Password"
                  variant="outlined"
                  className="mt-3 w-100"
                  onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </div>
            <div className={'col-12'}>
              <TextField
                  error={confirmPwdErr}
                  helperText={confirmPwdErr ? confirmPwdErrMsg : ''}
                  onFocus={() => {
                    setConfirmPwdErr(false)
                  }}
                  type={"password"}
                  id="confirm-password"
                  label="Confirm Password"
                  variant="outlined"
                  className="mt-3 w-100"
                  onChange={(e) => setUser(
                      {...user, confirmPassword: e.target.value})}
              />
            </div>
            <div className={'col-12 mt-3'}>
              <FormControl>
                <FormLabel
                    error={roleErr}
                    onFocus={() => {
                      setRoleErr(false)
                    }}
                    id="demo-row-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                  <FormControlLabel value="BUYER" control={<Radio/>}
                                    onFocus={() => {
                                      setRoleErr(false)
                                    }}
                                    label="Buyer"
                                    onChange={(e) => setUser(
                                        {...user, role: e.target.value})}/>
                  <FormControlLabel value="SELLER" control={<Radio/>}
                                    label="Seller"
                                    onFocus={() => {
                                      setRoleErr(false)
                                    }}
                                    onChange={(e) => setUser(
                                        {...user, role: e.target.value})}/>
                </RadioGroup>
                {roleErr && <p style={{color: "red"}}>{roleErrMsg}</p>}
              </FormControl>
            </div>
            <div className={'col'}>
              <button className={'btn btn-primary mt-3'} onClick={register}>Sign
                up
              </button>
            </div>
            <Typography variant="body2" className="mt-3">
              Already have an account? <Link to={'/Login'}>Log
              in</Link></Typography>
          </div>
        </div>
        <SnackbarComponent snackbarOpen={snackbarOpen} snackbarMsg={snackbarMsg}
                           severity={severity} horizontal="center"
                           vertical="top"/>
      </div>
  )
}

export default Register;