import {MdErrorOutline} from "react-icons/md";

function ErrorPage({status, message}) {
  return (
      <div className={'mt-3'}>
        <div className={'fs-1 d-flex justify-content-center'}>Oops! An error occurred</div>
        <div className={'fs-3 d-flex justify-content-center'}>Please try again later</div>
        <div className={'d-flex justify-content-center mt-3'}>
          <MdErrorOutline style={{color: 'red'}} size={300}/>
        </div>
      </div>
  );
}

export default ErrorPage;