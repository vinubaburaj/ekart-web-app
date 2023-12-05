import session from "express-session";

const sessionMiddleware = session({
  secret: "sessionSecretKeyABCDE",
  resave: false,
  saveUninitialized: false
});


export default sessionMiddleware;
