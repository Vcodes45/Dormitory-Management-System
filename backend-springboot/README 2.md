# Dormitory Management System - Spring Boot Backend

## Overview
This is a Spring Boot backend for the Dormitory Management System with JWT authentication.

## Features
- JWT-based authentication
- User management with roles (ADMIN, USER)
- H2 in-memory database for development
- RESTful API endpoints
- CORS enabled for React frontend

## Default Users
When the application starts, it creates two default users:

1. **Admin User**
   - Username: `admin`
   - Password: `admin123`
   - Role: `ADMIN`

2. **Test User**
   - Username: `testuser`
   - Password: `test123`
   - Role: `USER`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/test` - Test endpoint

### Example Login Request
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Example Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "username": "admin",
  "role": "ADMIN",
  "message": "Login successful"
}
```

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Steps
1. Navigate to the backend-springboot directory:
   ```bash
   cd backend-springboot
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   Or build and run:
   ```bash
   mvn clean package
   java -jar target/dormitory-backend-1.0.0.jar
   ```

3. The application will start on `http://localhost:8080`

### Accessing H2 Database Console (Development)
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:dormitory`
- Username: `admin`
- Password: `password`

## Testing the API
You can test the API using curl or any API testing tool:

```bash
# Test connection
curl http://localhost:8080/api/auth/test

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Configuration
The application configuration can be found in `src/main/resources/application.properties`:
- Server port: 8080
- Database: H2 in-memory
- JWT secret and expiration settings
- CORS configuration for React frontend (localhost:5174)
