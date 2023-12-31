const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/JwtService");

module.exports = function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Client ro'yhatdan o'tmagan" });
    }

    console.log(authorization);
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      return res
        .status(403)
        .json({ message: "Client ro'yhatdan o'tmagan (token berilmagan)" });
    }

    const decodedToken = jwt.verify(token, config.get("clientSecret"));
    console.log(decodedToken);

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .send({ message: "Client ro'yhatdan o'tmagan (token toto'g'ri)" });
  }
};
