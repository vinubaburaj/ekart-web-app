import {useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import {useSelector} from "react-redux";

const ProtectedRoute = ({children}) => {
  let location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer.currentUser);

  useEffect(() => {
    console.log("PROTECTED ROUTE: ", user);
    if (!user) {
      navigate("/Login", {state: {from: location}});
    }
  }, [user]);

  return children;
};

export default ProtectedRoute;