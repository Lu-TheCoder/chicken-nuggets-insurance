# Chicken Nuggets Insurance Backend

## Dependencies

Install the dependencies locally in the `/backend` folder:

```bash
cd backend
npm install
```

## Running the Server

```bash
node src/main.js
```

You should see:

```bash
🚀 Server is running on port 3000
📱 Health check: http://localhost:3000/health
🌐 API base: http://localhost:3000/api
DATABASE connected
```

## API Endpoints

### GET /alerts/user/:userID

Description:
Fetch all alerts associated with a specific user, identified by their `userID`.

Returns:

```json
[
  {
    "id": "338969a4-0034-4cb3-8672-0b9d715c8a1b",
    "timestamp": "2025-07-29T13:53:39.163Z",
    "title": "Your policy is active and in good standing.",
    "status": "info"
  },
  {
    "id": "f864bb9e-2587-49db-872f-e316e55be2c8",
    "timestamp": "2025-07-29T13:53:39.163Z",
    "title": "Travel advisory for your destination.",
    "status": "warning"
  }
]

```

### GET /monitored/user/:userId

Description:
Get all monitored destinations for the given user.

Returns: An array of monitored destination objects

Returns:

```json
[
  {
    "id": "uuid",
    "user_id": "userID",
    "location": "Location Name",
    "risk_level": "Risk Level",
    "last_checked_at": "timestamp",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
  ...
]
```

### GET /monitored/user/:userId/:id

Description:
Get all monitored destinations for the given user by its ID.

Returns: A single monitored destination object or 404 if not found.

### GET /monitored/user/:userId/search?location=&riskLevel=

Description:
Search monitored destinations for the given user, filtering optionally by location and/or risk level.

Query Parameters:
`location` (optional): Filter results by location (case-insensitive).
`riskLevel`(optional): Filter results by risk level (case-insensitive).

Returns:
Array of filtered monitored destination objects.
