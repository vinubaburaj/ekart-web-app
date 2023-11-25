import {Paper, TextField, Typography} from "@mui/material";
import './index.css';
import {Link} from "react-router-dom";

function Login() {
  return (
      <div
          className={'d-flex flex-column justify-content-center align-items-center'}>
        <Link to={'/'} className={'fs-1 mt-4'}>E-kart</Link>
        <Paper elevation={3} className="wd-login-container mt-3">
          <h3>Sign in</h3>
          <TextField
              fullWidth
              type={"email"}
              id="email-id"
              label="Email ID"
              variant="outlined"
              className="mt-3"/>
          <TextField
              fullWidth
              type={"password"}
              id="password"
              label="Password"
              variant="outlined"
              className="mt-3"/>
          <button className={'btn btn-primary mt-3'}>Sign in</button>
          <Typography variant="body2" className="mt-3">
            Don't have an account? <Link to={'/Register'}>Register
            now</Link></Typography>
        </Paper>
      </div>
  );
}

export default Login;