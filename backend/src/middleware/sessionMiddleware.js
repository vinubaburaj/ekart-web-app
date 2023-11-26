import session from "express-session";

const sessionMiddleware = session({
  secret: "sessionSecretKeyABCDE", // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
});

export default sessionMiddleware;
