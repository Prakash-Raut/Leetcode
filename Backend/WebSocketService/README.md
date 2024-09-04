# Socket Service

This is a Node.js server application that provides socket communication using Socket.IO and Redis.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- Redis

## Installation

Clone the repository:

``` git
git clone https://github.com/your-username/your-repo.git
```

Install dependencies:

``` npm
npm install
```

Start the server:

``` npm
npm start
```

## Usage

Once the server is running, you can connect to it using a socket client. The server provides the following functionality:

- Setting user ID and socket ID in Redis
- Getting connection ID from Redis
- Sending payload to a specific user

## API Endpoints

### Set User ID and Socket ID

``` postman
POST /setUserId
```

Set the user ID and socket ID in Redis.

Request Body:

```json
{
    "userId": "user123",
    "socketId": "socket456"
}
```

### Get Connection ID

```postman
GET /getConnectionId/:userId
```

Get the connection ID for a specific user from Redis.

### Send Payload

```postman
POST /sendPayload
```

Send a payload to a specific user.

Request Body:

```json
{
    "userId": "user123",
    "payload": "Hello, world!"
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
