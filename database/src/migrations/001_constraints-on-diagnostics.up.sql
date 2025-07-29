ALTER TABLE diagnostic_tests 
ADD CONSTRAINT diagnostic_constaints UNIQUE (user_id, name, test_result);