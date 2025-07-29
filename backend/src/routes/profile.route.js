const { Router } = require("express");
const AuthMiddleware = require("../middleware/auth.middleware");
const { serverError, ok, notFound } = require("../utils/http.utils");
const { getErrorMessage } = require("../utils/error.utils");
const {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
} = require("../services/profile.services");

const ProfileRouter = Router();
const Middleware = [AuthMiddleware]; //*purpose: if there are more 'guard' middleware*

//*GET*
//*/GET USER PROFILE*
ProfileRouter.get("/", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await getUserProfile(userId);
    ok(res, profile);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//*/GET USER PREFERENCES*
ProfileRouter.get("/preferences", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = await getUserPreferences(userId);
    ok(res, preferences);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//*PATCH*
//*/UPDATE USER PROFILE*
ProfileRouter.patch("/", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    const updatedProfile = await updateUserProfile(userId, name, email, password);
    ok(res, updatedProfile);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//*/UPDATE USER PREFERENCES*
ProfileRouter.patch("/preferences", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      notification_threshold, 
      email_notifications, 
      risk_alert_level, 
      auto_check_frequency 
    } = req.body;
    
    const updatedPreferences = await updateUserPreferences(
      userId, 
      notification_threshold, 
      email_notifications, 
      risk_alert_level, 
      auto_check_frequency
    );
    ok(res, updatedPreferences);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

module.exports = {
    ProfileRouter
}