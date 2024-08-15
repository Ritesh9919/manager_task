
## manager_task: Task Management API

This is a Node.js and Express-based REST API for managing tasks. It provides functionalities for user registration, login, and CRUD (Create, Read, Update, Delete) operations on tasks.

## Getting Started

Prerequisites:

Node.js and npm (or yarn) installed on your system.
Installation

Clone this repository:

Bash
git clone https://github.com/Ritesh9919/manager_task.git

Navigate to the project directory:

Bash
cd manager_task


Install dependencies:

Bash
npm install


(Optional) Environment Variables

Create a .env file in the project root to store sensitive information like database credentials:

DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key


Running the API Locally

Start the development server:

Bash
npm start
Use code with caution.

This will start the server on the default port (typically 3000). Access the API in your browser using http://localhost:3000/api/users/register or similar URLs.

## API Documentation

Authentication Endpoints

1. Register (POST /api/users/register)

Description: Registers a new user.
Request Body:
JSON
{
  "username": "your_username",
  "password": "your_password"
}


Response:
201 Created: User registered successfully.
400 Bad Request: Invalid request body.
409 Conflict: User already exists.
2. Login (POST /api/users/login)

Description: Logs in an existing user.
Request Body:
JSON
{
  "username": "your_username",
  "password": "your_password"
}
Use code with caution.

Response:
200 OK: User logged in successfully, with an authentication token in the response.
401 Unauthorized: Invalid credentials.
404 Not Found: User not found.
Authorization:

Authentication is required for all task-related API endpoints.
The API utilizes JWT (JSON Web Token) for authentication. After successful login, the server sends a JWT token in the response. You should include this token in the Authorization header of subsequent requests.
Task Endpoints

3. Create Task (POST /api/tasks)

Description: Creates a new task.
Request Body:
JSON
{
  "title": "Task title",
  "description": "Task description",
  // Add other task fields as needed (e.g., due_date, priority)
}
Use code with caution.

Response:
201 Created: Task created successfully.
400 Bad Request: Invalid request body.
401 Unauthorized: User not authenticated.
4. Get All Tasks (GET /api/tasks)

Description: Retrieves a list of all tasks for the authenticated user.
Response:
200 OK: List of tasks.
401 Unauthorized: User not authenticated.
5. Update Task (PUT /api/tasks/:taskId)

Description: Updates an existing task.
Request Body:
JSON
{
  "title": "Updated task title",
  "description": "Updated task description",
  // Add other task fields as needed (e.g., due_date, priority)
}


Response:
200 OK: Task updated successfully.
400 Bad Request: Invalid request body.
401 Unauthorized: User not authenticated.
404 Not Found: Task not found.
6. Delete Task (DELETE /api/tasks/:taskId)

Description: Deletes a task.
Response:
204 No Content: Task deleted successfully.
401 Unauthorized: User not authenticated.






