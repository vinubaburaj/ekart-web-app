import {useSelector} from "react-redux";
import {useAuth} from "../../AuthContext";
import SellerHome from "../Seller/sellerHome";
import {Roles} from "../../Constants/roles";

function Home() {
  const {user} = useAuth();
  const role = useSelector((state) => state.userReducer.role);
  console.log('home', role);
  return (
      <>
        {user && role === Roles.SELLER && <SellerHome/>}
        {user && role === Roles.BUYER && <div>
          <h1>Buyer Home</h1>
        </div>}
        {!user && <div>
          <h1>Welcome to Ekart</h1>
        </div>}
      </>
  )
}

export default Home;