import {TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function Register() {
  return (
      <div className={'row'}>
        <div className={'col p-5'}>
          <div
              className={'d-flex flex-column justify-content-center align-items-center'}>
            <Link to={'/'} className={'fs-1'}>E-kart</Link>
            <div className={'fs-2'}>The best electronics, all in one place.
            </div>
            <img
                src={'https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png'}
                className={'mt-3'}
                width={'400px'}
                height={'400px'}
                alt={'store-img'}/>
          </div>
        </div>
        <div className={'col pe-5'}>
          <h3 className={'mt-3'}>Sign up</h3>
          <div className={'row'}>
            <div className={'col-12'}>
              <TextField
                  id="first-name"
                  label="First Name"
                  variant="outlined"
                  className="mt-3 w-50"/>
            </div>
            <div className={'col-12'}>
              <TextField
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  className="mt-3 w-50"/>
            </div>
            <div className={'col-12'}>
              <TextField
                  type={"email"}
                  id="email-id"
                  label="Email ID"
                  variant="outlined"
                  className="mt-3 w-50"/>
            </div>
            <div className={'col-12'}>
              <TextField
                  type={"password"}
                  id="password"
                  label="Password"
                  variant="outlined"
                  className="mt-3 w-50"/>
            </div>
            <div className={'col-12'}>
              <TextField
                  type={"password"}
                  id="confirm-password"
                  label="Confirm Password"
                  variant="outlined"
                  className="mt-3 w-50"/>
            </div>
            <div className={'col'}>
              <button className={'btn btn-primary mt-3'}>Sign up</button>
            </div>
            <Typography variant="body2" className="mt-3">
              Already have an account? <Link to={'/Login'}>Log
              in</Link></Typography>
          </div>
        </div>
      </div>
  )
}

export default Register;