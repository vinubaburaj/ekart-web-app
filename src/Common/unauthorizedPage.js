import {FaSkullCrossbones} from "react-icons/fa";

function UnauthorizedPage() {
  return (
      <div>
        <div className={'fs-1 d-flex justify-content-center mt-4'}>You are not
          authorized to view this page!
        </div>
        <div className={'d-flex justify-content-center fs-1'}>
          <FaSkullCrossbones style={{color: "red"}}/>
        </div>
      </div>
  );
}

export default UnauthorizedPage;