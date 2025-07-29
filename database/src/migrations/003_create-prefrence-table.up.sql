CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_threshold INTEGER DEFAULT 5,
    email_notifications BOOLEAN DEFAULT true,
    risk_alert_level VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high'
    auto_check_frequency INTEGER DEFAULT 24, -- hours
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);