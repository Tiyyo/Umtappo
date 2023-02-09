const { sign, verify } = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();

const createTokens = (user) => {
  const accesToken = sign(
    { username: user.username, email: user.email, id: user.id },
    process.env.TOKEN_KEY,
    { expiresIn: "24h" }
  );

  return accesToken;
};

const validateToken = asyncHandler((req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = { createTokens, validateToken };
