const { Router } = require("express");
const { getErrorMessage } = require("../utils/error.utils");
const { loginUser, signupUser } = require("../services/auth.services");
const jwt = require("jsonwebtoken");
const { ok, badRequest, serverError, conflict, unauthorized } = require("../utils/http.utils");
require("dotenv").config();

const AuthRouter = Router();
const secret = process.env.JWT_SECRET_KEY || 'your-secret-key';

AuthRouter.post("/signup", async (req, res) => {
  try {
    const user = req.body;
    if (!user || !user.name || !user.email || !user.password) {
      badRequest(res, "Missing required fields");
      return;
    }

    const { name, email, password } = user;
    const result = await signupUser(name, email, password);
   
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
    
    if (!email || !password) {
      badRequest(res, "Email and password are required");
      return;
    }
    
    const result = await loginUser(email, password);
    
    if (!result) {
      unauthorized(res, "Invalid credentials");
      return;
    }
    
    const token = jwt.sign(
      {
        id: result.id
      },
      secret,
      { expiresIn: "26hr" }
    );
    
    ok(res, { token, user: result });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid credentials") {
        unauthorized(res, "Invalid credentials");
        return;
      }
    }
    serverError(res, getErrorMessage(error));
  }
});

AuthRouter.post("/logout", async (req, res) => {
  try {
    //logout logic
    
    ok(res, null, "Logged out successfully");
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

module.exports = AuthRouter;