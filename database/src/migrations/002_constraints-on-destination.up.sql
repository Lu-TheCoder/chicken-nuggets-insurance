ALTER TABLE monitored_destinations 
ADD CONSTRAINT monitored_constaints UNIQUE (user_id, location, risk_level);
