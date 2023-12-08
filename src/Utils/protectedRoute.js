import {useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import {useSelector} from "react-redux";

const ProtectedRoute = ({children}) => {
  let location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer.currentUser);
  //const {user} = useAuth();

  useEffect(() => {
    console.log("PROTECTED ROUTE: ", user);
    if (!user) {
      //return <Navigate to="/Login" state={{from: location}} replace/>
      navigate("/Login", {state: {from: location}});
    }
  }, [user]);

  /*if (!user) {
    return <Navigate to="/Login" state={{from: location}} replace/>
  }*/

  return children;
};

export default ProtectedRoute;