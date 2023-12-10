import "./App.css";
import {HashRouter, Route, Routes} from "react-router-dom";
import Ekart from "./Ekart";
import {AuthProvider} from "./AuthContext";
import {useDispatch, useSelector} from "react-redux";
import * as authServices from "./Ekart/Auth/authService";
import {setCurrentUser, setRole} from "./Ekart/Auth/userReducer";
import {useEffect, useState} from "react";
import {Roles} from "./Constants/roles";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.userReducer.role);
  const [isSeller, setIsSeller] = useState(role === Roles.SELLER);
  const checkAuth = async () => {
    const response = await authServices.checkAuth();
    if (response?.authenticated) {
      dispatch(setCurrentUser(response.user));
      dispatch(setRole(response.user.role));
      setIsSeller(response.user.role === Roles.SELLER);
    } else {
      dispatch(setCurrentUser(null));
      dispatch(setRole(Roles.ANON));
    }
  }

  const getTheme = () => {
    if (isSeller) {
      document.querySelector(':root').style.setProperty('--primary-color',
          '#3e9a89');
      document.querySelector(':root').style.setProperty('--secondary-color',
          '#d7fcfb');
      return createTheme({
        palette: {
          primary: {
            main: '#3e9a89',
          },
          secondary: {
            main: '#d7fcfb',
          },
        },
      })
    } else {
      document.querySelector(':root').style.setProperty('--primary-color',
          '#3e849a');
      document.querySelector(':root').style.setProperty('--secondary-color',
          '#d7e3fc');
      return createTheme({
        palette: {
          primary: {
            main: '#3e849a',
          },
          secondary: {
            main: '#d7e3fc',
          },
        },
      });
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    setIsSeller(role === Roles.SELLER);
  }, [role]);
  return (
      <div>
        <ThemeProvider theme={getTheme}>
          <AuthProvider>
            <HashRouter>
              <Routes>
                <Route path="*" element={<Ekart/>}/>
              </Routes>
            </HashRouter>
          </AuthProvider>
        </ThemeProvider>
      </div>
  );
}

export default App;