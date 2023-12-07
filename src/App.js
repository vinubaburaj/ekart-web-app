import "./App.css";
import {HashRouter, Route, Routes} from "react-router-dom";
import Ekart from "./Ekart";
import {AuthProvider} from "./AuthContext";
import {useDispatch} from "react-redux";
import * as authServices from "./Ekart/Auth/authService";
import {setCurrentUser, setRole} from "./Ekart/Auth/userReducer";
import {useEffect} from "react";

function App() {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    const response = await authServices.checkAuth();
    if (response?.authenticated) {
      dispatch(setCurrentUser(response.user));
      dispatch(setRole(response.user.role));
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="*" element={<Ekart />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
