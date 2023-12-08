import {Paper, TextField, Typography} from "@mui/material";
import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as authServices from "../authService";
import {useDispatch} from "react-redux";
import {setCurrentUser, setRole} from "../userReducer";
import {emailValidator} from "../../Validators";
import {useAuth} from "../../../AuthContext";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setInitialAuth } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [pwdErr, setPwdErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");

  const checkAuth = async () => {
    const response = await authServices.checkAuth();
    if (response?.authenticated) {
      dispatch(setCurrentUser(response.user));
      navigate("/Home");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    console.log(user);
    if (user.email === "" && user.password === "") {
      if (user.email === "") {
        setEmailErrMsg("Enter email");
        setEmailErr(true);
      }
      if (user.password === "") {
        setPwdErrMsg("Enter password");
        setPwdErr(true);
      }
      return;
    }
    const response = await authServices.login(user);
    if (response?.status === 401) {
      setPwdErrMsg(response.data.message);
      setPwdErr(true);
    } else if (response?.status === 404) {
      setEmailErrMsg(response.data.message);
      setEmailErr(true);
    } else {
      setInitialAuth(response);
      dispatch(setCurrentUser(response));
      dispatch(setRole(response?.role));
      navigate("/Home");
    }
    console.log(response);
  };

  const checkEmailFormat = () => {
    if (user.email && !emailValidator(user.email)) {
      setEmailErrMsg("Invalid email");
      setEmailErr(true);
    }
  };

  return (
    <div
      className={"d-flex flex-column justify-content-center align-items-center"}
    >
      <Link to={"/"} className={"fs-1 mt-4"}>
        E-kart
      </Link>
      <Paper elevation={3} className="wd-login-container mt-3">
        <h3>Sign in</h3>
        <TextField
          error={emailErr}
          helperText={emailErr ? emailErrMsg : ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onFocus={() => setEmailErr(false)}
          onBlur={checkEmailFormat}
          fullWidth
          type={"email"}
          id="email-id"
          label="Email ID"
          variant="outlined"
          className="mt-3"
        />
        <TextField
          error={pwdErr}
          helperText={pwdErr ? pwdErrMsg : ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onFocus={() => setPwdErr(false)}
          fullWidth
          type={"password"}
          id="password"
          label="Password"
          variant="outlined"
          className="mt-3"
        />
        <button className={"btn btn-primary mt-3"} onClick={login}>
          Sign in
        </button>
        <Typography variant="body2" className="mt-3">
          Don't have an account? <Link to={"/Register"}>Register now</Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default Login;
