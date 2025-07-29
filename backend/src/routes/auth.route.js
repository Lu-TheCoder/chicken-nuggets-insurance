const { Router } = require("express");
const { getErrorMessage } = require("../utils/error.utils");
const { loginUser, signupUser } = require("../services/auth.services");
const jwt = require("jsonwebtoken");
const { ok, badRequest, serverError, conflict, unauthorized } = require("../utils/http.utils");
// Load environment variables quietly (only if not already loaded)
if (!process.env.JWT_SECRET_KEY) {
  require("dotenv").config({ silent: true });
}

const AuthRouter = Router();
const secret = process.env.JWT_SECRET_KEY || "saoiiohobnea234rhh";

AuthRouter.post("/signup", async (req, res) => {
  try {
    // Validate request body exists
    if (!req.body || typeof req.body !== 'object') {
      return badRequest(res, "Invalid request body");
    }

    const { first_name, last_name, email, password } = req.body;
    
    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return badRequest(res, "Missing required fields: first_name, last_name, email, password");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return badRequest(res, "Invalid email format");
    }

    // Validate password length
    if (password.length < 6) {
      return badRequest(res, "Password must be at least 6 characters long");
    }

    const result = await signupUser(first_name, last_name, email, password);
    ok(res, result);
  } catch (error) {
    // Only log errors in development or when not in test mode
    if (process.env.NODE_ENV !== 'test') {
      console.log(error);
    }
    
    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return conflict(res, "User already exists");
      }
    }
    serverError(res, getErrorMessage(error));
  }
});

AuthRouter.post("/login", async (req, res) => {
  try {
    // Validate request body exists
    if (!req.body || typeof req.body !== 'object') {
      return badRequest(res, "Invalid request body");
    }
    
    const { password, email } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return badRequest(res, "Missing required fields: email, password");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return badRequest(res, "Invalid email format");
    }

    const credentials = { password, email };
    const result = await loginUser(credentials);

    if (!result) {
      return badRequest(res, "Login failed");
    }

    const token = jwt.sign(
      {
        id: result.id,
        fname: result.first_name,
        lname: result.last_name,
        email: result.email
      },
      secret,
      { expiresIn: "26hr" }
    );

    ok(res, token);
  } catch (error) {
    // Only log errors in development or when not in test mode
    if (process.env.NODE_ENV !== 'test') {
      console.log(error);
    }
    
    if (error instanceof Error) {
      if (error.message === "Invalid email" || error.message === "Invalid password") {
        return unauthorized(res, "Invalid credentials");
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
