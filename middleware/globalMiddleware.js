// const jwt = require('jsonwebtoken');
// const secret_key = process.env.SECRET_KEY;

const globalMiddleware1 = (req, res, next) => {
  console.log("success globalMiddleware...1");
  next();
};


const globalMiddleware2 = (req, res, next) => {
  console.log("success globalMiddleware...2");
  next();
};

const globalMiddleware3 = (req, res, next) => {
  console.log("success globalMiddleware...3");
  next();
};

const globalMiddleware4 = (req, res, next) => {
  console.log("success globalMiddleware...4");
  next();
};

const globalMiddleware5 = (req, res, next) => {
  console.log("success globalMiddleware...5");
  next();
};


// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers["authorization"];
//     const token = bearerHeader && bearerHeader.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ message: "No token provided!!" });
//     }
//     jwt.verify(token, secret_key, (err, userData) => {
//       if (err) {
//         return res.status(403).json({ message: "Invalid token!!" });
//       }
//       req.userData = userData;
//       console.log("valid token ...");
//       next();
//     });
//   };

module.exports = {
  globalMiddleware1,
  globalMiddleware2,
  globalMiddleware3,
  globalMiddleware4,
  globalMiddleware5,
//   verifyToken
};
