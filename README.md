

### `README.md`


# Vouchers Purchase System

This project is a REST API-based system for managing the purchase of vouchers. The system allows users to register, log in, purchase vouchers, and view their purchased vouchers. The system distinguishes between regular users and administrative users, with administrative users having additional capabilities, such as creating new vouchers.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (admin vs. regular users)
- Voucher creation (admin only)
- Voucher purchase
- MongoDB for data persistence

## Getting Started

### Prerequisites

- Node.js v22.5.1 or later
- MongoDB installed locally or accessible via a URI
- Docker (for containerization)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vouchers-purchase-system.git
   cd vouchers-purchase-system/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `backend` directory and add your environment variables:
   ```bash
   MONGO_URI=mongodb://localhost:27017/NODE
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

The backend server will start on `http://localhost:3002`.

## API Endpoints

### User Management

#### Register Admin

```bash
curl -X POST http://localhost:3002/users -H "Content-Type: application/json" -d "{\"name\": \"Jane Admin\", \"username\": \"janeadmin\", \"email\": \"janeadmin@example.com\", \"password\": \"adminpassword\", \"balance\": 2000, \"isAdminAssistant\": true, \"userType\": \"executive\"}"
```

This endpoint registers a new admin user with a specified balance and userType.

#### Register Regular User

```bash
curl -X POST http://localhost:3002/users -H "Content-Type: application/json" -d "{\"name\": \"John Doe\", \"username\": \"johndoe\", \"email\": \"johndoe@example.com\", \"password\": \"password123\", \"balance\": 1000, \"isAdminAssistant\": false, \"userType\": \"ordinary\"}"
```

This endpoint registers a new regular user.

#### User Login

- **Regular User Login:**
  ```bash
  curl -X POST http://localhost:3002/users/login -H "Content-Type: application/json" -d "{\"usernameOrEmail\": \"johndoe\", \"password\": \"password123\"}"
  ```

- **Admin Login:**
  ```bash
  curl -X POST http://localhost:3002/users/login -H "Content-Type: application/json" -d "{\"usernameOrEmail\": \"janeadmin@example.com\", \"password\": \"adminpassword\"}"
  ```

This endpoint logs in a user and returns a JWT for authentication.

### Voucher Management

#### Create Voucher (Admin Only)

```bash
curl -X POST http://localhost:3002/vouchers ^
-H "Authorization: Bearer <your_admin_jwt>" ^
-H "Content-Type: application/json" ^
-d "{\"amount\":100,\"cost\":50,\"company\":\"CompanyName\"}"
```

This endpoint allows an admin user to create a new voucher.

### Purchase Management

#### Purchase Voucher

```bash
curl -X POST http://localhost:3002/purchase ^
-H "Authorization: Bearer <your_user_jwt>" ^
-H "Content-Type: application/json" ^
-d "{\"userId\":\"<user_id>\", \"voucherId\":\"<voucher_id>\"}"
```

This endpoint allows a user to purchase a voucher if they have sufficient balance. The user's balance will be deducted, and the voucher will be added to their purchased vouchers list.

## Code Structure

- `controllers/`: Handles incoming requests and interacts with services to process data.
- `models/`: Mongoose models for MongoDB collections.
- `services/`: Contains business logic and interacts with the database models.
- `routes/`: Defines API routes and maps them to controller methods.

## Dockerization

To containerize the application using Docker, follow these steps:

### Create a `Dockerfile`

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3002

# Command to run the app
CMD ["npm", "start"]
```

### Build and Run the Docker Container

1. Build the Docker image:
   ```bash
   docker build -t vouchers-purchase-system .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3002:3002 --env-file .env vouchers-purchase-system
   ```

The backend server will be accessible on `http://localhost:3002` within the Docker container.

## Conclusion

This system is a simple yet powerful way to manage users and voucher purchases. It can be easily extended and customized to suit more complex business logic or requirements. Contributions and suggestions for improvements are welcome!
