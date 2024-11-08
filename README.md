```markdown
# Task Manager API

This is a Task Manager API built using Node.js, Express, and MongoDB. The API allows users to create, read, update, and delete tasks, as well as mark tasks as completed or incomplete. Additionally, it includes user authentication, allowing users to sign up, log in, and manage their own tasks.

## Features

- **CRUD Operations for Tasks**: Create, read, update, and delete tasks.
- **Task Status Management**: Mark tasks as completed or incomplete.
- **Task Filtering**: Filter tasks by their status (e.g., completed, incomplete).
- **User Authentication**: Sign up, log in, and manage tasks for authenticated users.
- **API Documentation**: Swagger documentation for the API.

## Setup Instructions

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
```

### Installation

```
1. Clone the repository
```

```
2. Install dependencies:
    npm install
```

```
3. Create a `.env` file in the root directory and add the following environment variables:
```

    PORT=4000
    MONGO_URI=your_mongodb_connection_string
    JWTPRIVATEKEY=your_jwt_private_key

```
4. Start the server:
    npm run restart
```

```
5. The server will be running on `http://localhost:4000`. Swagger documentation is available at `http://localhost:4000/api-docs`.
```

```
6. First, install ts-node and typescript if you haven't already:
   "npm install -g ts-node typescript"
```

```
7. Compile TypeScript to JavaScript:tsc
```

```
8. Run the compiled JavaScript file
   "node dist/index.js"
```

### Docker Setup:

1.Build and run the Docker container

```
   docker build -t taskmanager .
```

```
Docker run -d --name taskmanagerContainer -v $(pwd)/src:/app/src --env-file .env -p 4000:4000 taskmanager
```

## API Endpoints

### Authentication

- **POST /auth/signup**: Sign up a new user.
- **POST /auth/login**: Log in an existing user.

### Tasks

- **GET /api/task**: Get all tasks for the authenticated user.
- **GET /api/task/status**: Filter tasks by status for the authenticated user.
- **POST /api/task**: Create a new task for the authenticated user.
- **PUT /api/task/:id**: Update a task for the authenticated user.
- **DELETE /api/task/:id**: Delete a task for the authenticated user.

## Project Structure

```
➜  TaskManager git:(master) ✗ struct
├── .dockerignore
├── .env
├── .gitignore
├── .vscode
│  └── settings.json
├── dist
│  ├── controller
│  │  ├── auth
│  │  │  ├── 1-signup.js
│  │  │  └── 2-login.js
│  │  └── tasks
│  │    └── tasks.js
│  ├── db
│  │  ├── db.js
│  │  └── models
│  │    ├── task.js
│  │    └── user.js
│  ├── index.js
│  ├── middlewares
│  │  ├── auth
│  │  │  ├── generateToken.js
│  │  │  └── verifyTokenWithOptionalRole.js
│  │  ├── Err
│  │  │  └── GlobalErrorHandlerMiddleware.js
│  │  ├── log
│  │  │  └── loggerMiddleware.js
│  │  ├── routes
│  │  │  └── mainRoutesMiddleware.js
│  │  └── validation
│  │    └── validatorMiddleware.js
│  ├── Routes
│  │  ├── Auth
│  │  │  ├── 1-signup.js
│  │  │  └── 2-login.js
│  │  ├── MainRoutes
│  │  │  └── serverRoute.js
│  │  └── TaskManager
│  │    └── task.js
│  ├── swaggerConfig.js
│  └── utils
│    ├── err
│    │  ├── ApiErrorHandler.js
│    │  ├── handleMongoseerror.js
│    │  └── unhandledRejection.js
│    ├── HassingPasswordFunction
│    │  └── hashPassword.js
│    ├── Types
│    │  └── request
│    │    ├── request.js
│    │    └── types.js
│    └── Validations
│      ├── loginValidation.js
│      ├── signUpValidation.js
│      └── taskValidation.js
├── dockerfile
├── nodemon.json
├── package-lock.json
├── package.json
├── README.md
├── restart.sh
├── src
│  ├── .DS_Store
│  ├── controller
│  │  ├── auth
│  │  │  ├── .DS_Store
│  │  │  ├── 1-signup.ts
│  │  │  └── 2-login.ts
│  │  └── tasks
│  │    └── tasks.ts
│  ├── db
│  │  ├── db.ts
│  │  └── models
│  │    ├── task.ts
│  │    └── user.ts
│  ├── index.ts
│  ├── middlewares
│  │  ├── auth
│  │  │  ├── generateToken.ts
│  │  │  └── verifyTokenWithOptionalRole.ts
│  │  ├── Err
│  │  │  └── GlobalErrorHandlerMiddleware.ts
│  │  ├── log
│  │  │  └── loggerMiddleware.ts
│  │  ├── routes
│  │  │  └── mainRoutesMiddleware.ts
│  │  └── validation
│  │    └── validatorMiddleware.ts
│  ├── Routes
│  │  ├── Auth
│  │  │  ├── 1-signup.ts
│  │  │  └── 2-login.ts
│  │  ├── MainRoutes
│  │  │  └── serverRoute.ts
│  │  └── TaskManager
│  │    └── task.ts
│  ├── swaggerConfig.ts
│  └── utils
│    ├── err
│    │  ├── ApiErrorHandler.ts
│    │  ├── handleMongoseerror.ts
│    │  └── unhandledRejection.ts
│    ├── HassingPasswordFunction
│    │  └── hashPassword.ts
│    ├── Types
│    │  └── request
│    │    ├── request.ts
│    │    └── types.ts
│    └── Validations
│      ├── loginValidation.ts
│      ├── signUpValidation.ts
│      └── taskValidation.ts
└── tsconfig.json

```

## Approach

1. **Architecture**: The project is structured with a clear separation of concerns. Controllers handle the business logic, routes define the API endpoints, middlewares handle request validation and authentication, and models define the data schema.

2. **Authentication**: JWT (JSON Web Token) is used for user authentication. The `generateToken` middleware generates a token upon successful login or signup, and the `verifyTokenWithOptionalRole` middleware verifies the token for protected routes.

3. **Data Validation**: `express-validator` is used for validating request data. Custom validation middlewares are created for different endpoints to ensure data integrity.

4. **Error Handling**: Centralized error handling is implemented using a global error handler middleware. Custom error classes are used to handle different types of errors.

5. **API Documentation**: Swagger is used for API documentation. The `swaggerConfig.ts` file defines the Swagger configuration, and the documentation is served at `/api-docs`.

## Special Features

- **Logging**: Request logging middleware logs request details and response times.
- **Environment Configuration**: Environment variables are managed using the `.env` file.
- **Modular Code**: The code is modular and organized into separate files and folders for better maintainability.

## License

This project is licensed under the MIT License.

```

```
