# User API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Module

### Register User
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Description**: Register a new user

#### Request Body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "role": "customer"
}
```

#### Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer"
  },
  "token": "jwt_token"
}
```

### Login User
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Description**: Authenticate user and return JWT token

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer"
  },
  "token": "jwt_token"
}
```

---

## Profile Module

### Get User Profile
- **Endpoint**: `GET /api/users/profile`
- **Access**: Private (Customer/Admin)
- **Description**: Get authenticated user's profile information

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer",
    "dob": "1990-01-01",
    "address": {
      "houseNumber": "",
      "street": "",
      "city": "",
      "state": "",
      "pincode": ""
    }
  }
}
```

### Update User Profile
- **Endpoint**: `PUT /api/users/profile`
- **Access**: Private (Customer/Admin)
- **Description**: Update authenticated user's profile information

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "fullName": "John Smith",
  "email": "johnsmith@example.com",
  "phone": "+1234567891",
  "dob": "1990-01-01",
  "address": {
    "houseNumber": "123",
    "street": "Main Street",
    "city": "New York",
    "state": "NY",
    "pincode": "10001"
  }
}
```

#### Response:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id",
    "fullName": "John Smith",
    "email": "johnsmith@example.com",
    "phone": "+1234567891",
    "role": "customer",
    "dob": "1990-01-01",
    "address": {
      "houseNumber": "123",
      "street": "Main Street",
      "city": "New York",
      "state": "NY",
      "pincode": "10001"
    }
  }
}
```

---

## Loan Services Module

### Get All Loans
- **Endpoint**: `GET /api/loans`
- **Access**: Public
- **Description**: Get all active loans with pagination

#### Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for title/description
- `type` (optional): Filter by loan type

#### Response:
```json
{
  "success": true,
  "count": 5,
  "total": 10,
  "page": 1,
  "totalPages": 2,
  "data": [
    {
      "_id": "loan_id",
      "title": "Home Loan",
      "slug": "home-loan",
      "description": "Low interest home loan",
      "interestRate": 7.5,
      "processingFee": 1,
      "maxAmount": 5000000,
      "minAmount": 500000,
      "tenureOptions": [5, 10, 15, 20, 25, 30],
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Loan by ID
- **Endpoint**: `GET /api/loans/:id`
- **Access**: Public
- **Description**: Get a specific loan by ID

#### Response:
```json
{
  "success": true,
  "data": {
    "_id": "loan_id",
    "title": "Home Loan",
    "slug": "home-loan",
    "description": "Low interest home loan",
    "interestRate": 7.5,
    "processingFee": 1,
    "maxAmount": 5000000,
    "minAmount": 500000,
    "tenureOptions": [5, 10, 15, 20, 25, 30],
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

---

## Contact Form Module

### Submit Contact Form
- **Endpoint**: `POST /api/contact`
- **Access**: Public
- **Description**: Submit a contact form

#### Request Body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I have a question about your services"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "contact_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "I have a question about your services",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

---

## Get Loan Quote Module

### Submit Quote Request
- **Endpoint**: `POST /api/quotes`
- **Access**: Public
- **Description**: Submit a loan quote request

#### Request Body:
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "loanAmount": 100000,
  "loanType": "Home Loan"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "data": {
    "_id": "quote_id",
    "name": "John Doe",
    "phone": "+1234567890",
    "loanAmount": 100000,
    "loanType": "Home Loan",
    "status": "pending",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

---

## Apply Now Module

### Apply for Loan
- **Endpoint**: `POST /api/applications`
- **Access**: Private (Customer/Admin)
- **Description**: Submit a loan application

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "loanAmount": 500000,
  "loanType": "Home Loan",
  "tenureYears": 20,
  "monthlyIncome": 80000,
  "fullName": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "dob": "1990-01-01",
  "address": {
    "houseNumber": "123",
    "street": "Main Street",
    "city": "New York",
    "state": "NY",
    "pincode": "10001"
  }
}
```

#### Response:
```json
{
  "success": true,
  "message": "Loan application submitted successfully",
  "data": {
    "_id": "application_id",
    "user": "user_id",
    "loanAmount": 500000,
    "loanType": "Home Loan",
    "tenureYears": 20,
    "monthlyIncome": 80000,
    "fullName": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "dob": "1990-01-01",
    "address": {
      "houseNumber": "123",
      "street": "Main Street",
      "city": "New York",
      "state": "NY",
      "pincode": "10001"
    },
    "status": "pending",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Get User's Applications
- **Endpoint**: `GET /api/applications/my`
- **Access**: Private (Customer/Admin)
- **Description**: Get all loan applications submitted by the authenticated user

#### Headers:
```
Authorization: Bearer <token>
```

#### Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

#### Response:
```json
{
  "success": true,
  "count": 2,
  "total": 2,
  "page": 1,
  "totalPages": 1,
  "data": [
    {
      "_id": "application_id",
      "user": "user_id",
      "loanAmount": 500000,
      "loanType": "Home Loan",
      "tenureYears": 20,
      "monthlyIncome": 80000,
      "fullName": "John Doe",
      "phone": "+1234567890",
      "email": "john@example.com",
      "dob": "1990-01-01",
      "address": {
        "houseNumber": "123",
        "street": "Main Street",
        "city": "New York",
        "state": "NY",
        "pincode": "10001"
      },
      "status": "pending",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

For validation errors:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "value": "",
      "msg": "Full name is required",
      "param": "fullName",
      "location": "body"
    }
  ]
}
```