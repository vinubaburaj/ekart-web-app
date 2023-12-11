import {FaSkullCrossbones} from "react-icons/fa";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function UnauthorizedPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/Home');
    }, 3000);
  }, []);
  return (
      <div>
        <div className={'fs-1 d-flex justify-content-center mt-4'}>You are not
          authorized to view this page!
        </div>
        <div className={'d-flex justify-content-center fs-1'}>
          <FaSkullCrossbones style={{color: "red"}}/>
        </div>
        <div className={'fs-3 d-flex justify-content-center mt-4'}>Redirecting
          to Home...
        </div>
      </div>
  );
}

export default UnauthorizedPage;