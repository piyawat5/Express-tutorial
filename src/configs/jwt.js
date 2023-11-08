const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const privateKey = fs.readFileSync(
  path.join(__dirname, "../../s4t", "private.key")
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../../s4t", "public.key")
);

const signOptions = {
  issuer: "jamePiyawat",
  audience: "All",
  algorithm: "RS256",
};

const generateToken = (payload) =>
  jwt.sign(payload, privateKey, { ...signOptions, expiresIn: "30d" });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json();
    return;
  }

  jwt.verify(token, publicKey, signOptions, (err, decode) => {
    if (err) {
      res.status(401).json();
      return;
    }
    req.sub = decode.sub;
    req.role = decode.role;
    next();
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
