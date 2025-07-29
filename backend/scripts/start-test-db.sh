#!/bin/bash

echo "Starting test database..."
docker-compose up -d postgres-test

echo "Waiting for database to be ready..."
sleep 5

echo "Test database is ready on port 5434"
echo "Database: chicken_nuggets_insurance_test"
echo "User: postgres"
echo "Password: postgres" 