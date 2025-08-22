import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  jwt.verify(req.headers.token, "key", (err, decoded) => {
    if (err) return res.json({ Message: "invalid token" });
    req.decoded = decoded;
    next();
  });
};
