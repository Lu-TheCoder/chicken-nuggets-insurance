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
