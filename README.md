# API Documentation

## Base URL
- Your local host (`8080`);

## Authentication

### Register a New User
- **Endpoint:** `/auth/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "securePassword"
  }
  ```
- **Response:**
  - **Success:** `201 Created`
    ```json
    {
      "status": "success",
      "message": "Registration successful"
    }
    ```
  - **Error:** `400 Bad Request`
    ```json
    {
      "errors": [...]
    }
    ```

### Login
- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword"
  }
  ```
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "status": "success",
      "message": "Login successful.",
      "token": "jwtToken",
      "user_id": "userId"
    }
    ```
  - **Error:** `401 Unauthorized`
    ```json
    {
      "status": "error",
      "message": "User not found."
    }
    ```

## User Management

### Get User Information
- **Endpoint:** `/auth/getUser`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer jwtToken`
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "status": "success",
      "message": "User fetched successfully",
      "user": { ... }
    }
    ```
  - **Error:** `404 Not Found`
    ```json
    {
      "status": "error",
      "message": "User id not found!"
    }
    ```

## Friends

### Add Friend
- **Endpoint:** `/friends/addFriend`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer jwtToken`
- **Request Body:**
  ```json
  {
    "friend_name": "friendUsername"
  }
  ```
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "status": "success",
      "message": "Friend added successfully",
      "friend": { ... }
    }
    ```
  - **Error:** `404 Not Found`
    ```json
    {
      "status": "error",
      "message": "Friend not found."
    }
    ```

### Get Friends List
- **Endpoint:** `/friends/getFriendsList`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer jwtToken`
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "status": "success",
      "message": "Friends list fetched successfully",
      "friends": [ ... ]
    }
    ```

## Messages

### Get Messages
- **Endpoint:** `/messages`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer jwtToken`
- **Query Parameters:**
  - `senderId`: ID of the sender
  - `receiverId`: ID of the receiver
- **Response:**
  - **Success:** `200 OK`
    ```json
    [
      {
        "senderId": "user1",
        "receiverId": "user2",
        "text": "Hello!",
        "timestamp": "2024-11-24T12:00:00Z"
      },
      ...
    ]
    ```

---
