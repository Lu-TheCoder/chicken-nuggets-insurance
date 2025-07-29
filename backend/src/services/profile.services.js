const { query } = require("../utils/db.utils");
const bcrypt = require("bcrypt"); // Assuming you're using bcrypt for password hashing

const getUserProfile = async (userId) => {
  const result = await query(
    `SELECT
         id,
         name,
         email,
         created_at,
         updated_at
         FROM users WHERE id=$1`,
    [userId]
  );
  if(!(result.length > 0)) {
    throw new Error("User does not exist");
  }
  return result[0];
};

const updateUserProfile = async (userId, name, email, password) => {
  // Get current user data
  const currentUser = await getUserProfile(userId);
  
  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, process.env.BCRYPT-SALT_ROUNDS);
  }
  
  const result = await query(
    `UPDATE users
            SET
            name = $1,
            email = $2,
            password = COALESCE($3, password),
            updated_at = CURRENT_TIMESTAMP
            WHERE
            id = $4 RETURNING id, name, email, created_at, updated_at;`,
    [
      name || currentUser.name, 
      email || currentUser.email, 
      hashedPassword,
      userId
    ]
  );
  
  if(!(result.length > 0)) {
    throw new Error("Failed to update user profile");
  }
  
  return result[0];
};

const getUserPreferences = async (userId) => {
  // First check if preferences exist, if not create default ones
  let result = await query(
    `SELECT
         id,
         notification_threshold,
         email_notifications,
         risk_alert_level,
         auto_check_frequency,
         created_at,
         updated_at
         FROM user_preferences WHERE user_id=$1`,
    [userId]
  );
  
  // If no preferences exist, create default ones
  if(!(result.length > 0)) {
    result = await query(
      `INSERT INTO user_preferences (user_id)
              VALUES ($1)
              RETURNING 
              id,
              notification_threshold,
              email_notifications,
              risk_alert_level,
              auto_check_frequency,
              created_at,
              updated_at;`,
      [userId]
    );
  }
  
  return result[0];
};

const updateUserPreferences = async (userId, notificationThreshold, emailNotifications, riskAlertLevel, autoCheckFrequency) => {
  // Ensure preferences record exists
  await getUserPreferences(userId);
  
  const result = await query(
    `UPDATE user_preferences
            SET
            notification_threshold = COALESCE($1, notification_threshold),
            email_notifications = COALESCE($2, email_notifications),
            risk_alert_level = COALESCE($3, risk_alert_level),
            auto_check_frequency = COALESCE($4, auto_check_frequency),
            updated_at = CURRENT_TIMESTAMP
            WHERE
            user_id = $5 
            RETURNING 
            id,
            notification_threshold,
            email_notifications,
            risk_alert_level,
            auto_check_frequency,
            created_at,
            updated_at;`,
    [
      notificationThreshold,
      emailNotifications,
      riskAlertLevel,
      autoCheckFrequency,
      userId
    ]
  );
  
  if(!(result.length > 0)) {
    throw new Error("Failed to update user preferences");
  }
  
  return result[0];
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences
};