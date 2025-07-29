const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { sendUnauthorized } = require("../utils/http.util");
const { unauthorized } = require("../utils/http.utils");

dotenv.config();

const AuthMiddleware = async (req, res, next) => {
    const secretKey = `${process.env.JWT_SECRET_KEY}`;
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        unauthorized(res, "Please log-in");
        return;
    }
    
    try{
      const userInfo = jwt.verify(token, secretKey);
      req.user = userInfo;
      
      next();
    }
    catch(error){
      sendUnauthorized(res, "invalid token");
    }
};

module.exports = AuthMiddleware;