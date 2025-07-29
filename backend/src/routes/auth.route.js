const { Router } = require("express");
const { getErrorMessage } = require("../utils/error.utils");
const { loginUser, signupUser } = require("../services/auth.services");
const jwt = require("jsonwebtoken");
const { ok, badRequest, serverError, conflict, unauthorized } = require("../utils/http.utils");
require("dotenv").config();

const AuthRouter = Router();
const secrete = process.env.JWT_SECRET_KEY;

AuthRouter.post("/signup", async (req, res) => {
  try {
    const user = req.body;
    if (user === null || user === undefined) {
      badRequest(res);
      return;
    }

    const {first_name, last_name, email, password} = user;
    const result = await signupUser(first_name, last_name, email, password);
   
    ok(res, result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User already exits") {
        conflict(res, "User already Exist");
        return;
      }
    }
    serverError(res, getErrorMessage(error));
  }
});

AuthRouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const credentials = { password, email };
    const result = await loginUser(credentials);
    
    if (!result) {
      badRequest(res);
      return;
    }
    
    const token = jwt.sign(
      {
        id: result.id
      },
      secrete,
      { expiresIn: "26hr" }
    );
    
    ok(res, token);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid email" || error.message === "Invalid password") {
        unauthorized(res, "invalid credentials");
        return;
      }
    }
    serverError(res, getErrorMessage(error));
  }
});


// AuthRouter.post("/logout", async (req, res) => {
//   try {
    
//     //logout logic
    
//     ok(res, null, "Logged out successfully");
//   } catch (error) {
//     serverError(res, getErrorMessage(error));
//   }
// }); WILL BE HANDLED BY FRONT END

module.exports = AuthRouter;