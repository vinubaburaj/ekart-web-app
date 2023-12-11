function ErrorPage({status, message}) {
  return (
      <div>
        <h1>Oops! An error occured</h1>
        <h1>{status}</h1>
        <p>{message}</p>
      </div>
  );
}

export default ErrorPage;