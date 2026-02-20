# Admin API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All admin routes require a JWT token with admin role in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Admin Dashboard

### Get Admin Dashboard Analytics
- **Endpoint**: `GET /api/admin/dashboard`
- **Access**: Private/Admin
- **Description**: Get analytics and statistics for admin panel

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "success": true,
  "data": {
    "totalUsers": 15,
    "totalLoans": 8,
    "totalApplications": 25,
    "totalApproved": 18,
    "totalPending": 5
  }
}
```

---

## User Management

### Get All Users
- **Endpoint**: `GET /api/admin/users`
- **Access**: Private/Admin
- **Description**: Get all users with pagination

#### Headers:
```
Authorization: Bearer <token>
```

#### Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for name/email

#### Response:
```json
{
  "success": true,
  "count": 10,
  "total": 15,
  "page": 1,
  "totalPages": 2,
  "data": [
    {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "customer",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Loan Management

### Create Loan
- **Endpoint**: `POST /api/loans`
- **Access**: Private/Admin
- **Description**: Create a new loan type

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "title": "Business Loan",
  "description": "Flexible business loan with competitive rates",
  "interestRate": 12.5,
  "processingFee": 2,
  "maxAmount": 10000000,
  "minAmount": 100000,
  "tenureOptions": [1, 3, 5, 7, 10]
}
```

#### Response:
```json
{
  "success": true,
  "message": "Loan created successfully",
  "data": {
    "_id": "loan_id",
    "title": "Business Loan",
    "slug": "business-loan",
    "description": "Flexible business loan with competitive rates",
    "interestRate": 12.5,
    "processingFee": 2,
    "maxAmount": 10000000,
    "minAmount": 100000,
    "tenureOptions": [1, 3, 5, 7, 10],
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update Loan
- **Endpoint**: `PUT /api/loans/:id`
- **Access**: Private/Admin
- **Description**: Update an existing loan

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "title": "Updated Business Loan",
  "description": "Updated description",
  "interestRate": 11.5
}
```

#### Response:
```json
{
  "success": true,
  "message": "Loan updated successfully",
  "data": {
    "_id": "loan_id",
    "title": "Updated Business Loan",
    "slug": "updated-business-loan",
    "description": "Updated description",
    "interestRate": 11.5,
    "processingFee": 2,
    "maxAmount": 10000000,
    "minAmount": 100000,
    "tenureOptions": [1, 3, 5, 7, 10],
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
}
```

### Delete Loan
- **Endpoint**: `DELETE /api/loans/:id`
- **Access**: Private/Admin
- **Description**: Delete a loan

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "success": true,
  "message": "Loan deleted successfully"
}
```

### Toggle Loan Status
- **Endpoint**: `PUT /api/loans/toggle/:id`
- **Access**: Private/Admin
- **Description**: Activate or deactivate a loan

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "success": true,
  "message": "Loan activated/deactivated successfully",
  "data": {
    "_id": "loan_id",
    "title": "Business Loan",
    "slug": "business-loan",
    "description": "Flexible business loan with competitive rates",
    "interestRate": 12.5,
    "processingFee": 2,
    "maxAmount": 10000000,
    "minAmount": 100000,
    "tenureOptions": [1, 3, 5, 7, 10],
    "isActive": false,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
}
```

---

## Contact Management

### Get All Contacts
- **Endpoint**: `GET /api/contact`
- **Access**: Private/Admin
- **Description**: Get all contact form submissions

#### Headers:
```
Authorization: Bearer <token>
```

#### Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for name/email/message

#### Response:
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "page": 1,
  "totalPages": 3,
  "data": [
    {
      "_id": "contact_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "message": "I have a question about your services",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Delete Contact
- **Endpoint**: `DELETE /api/contact/:id`
- **Access**: Private/Admin
- **Description**: Delete a contact form submission

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## Quote Management

### Get All Quote Requests
- **Endpoint**: `GET /api/quotes`
- **Access**: Private/Admin
- **Description**: Get all quote requests

#### Headers:
```
Authorization: Bearer <token>
```

#### Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for name/phone/loanType
- `status` (optional): Filter by status (pending, contacted, approved, rejected)

#### Response:
```json
{
  "success": true,
  "count": 8,
  "total": 15,
  "page": 1,
  "totalPages": 2,
  "data": [
    {
      "_id": "quote_id",
      "name": "John Doe",
      "phone": "+1234567890",
      "loanAmount": 100000,
      "loanType": "Home Loan",
      "status": "pending",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Update Quote Status
- **Endpoint**: `PUT /api/quotes/:id`
- **Access**: Private/Admin
- **Description**: Update the status of a quote request

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "status": "contacted"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Quote status updated successfully",
  "data": {
    "_id": "quote_id",
    "name": "John Doe",
    "phone": "+1234567890",
    "loanAmount": 100000,
    "loanType": "Home Loan",
    "status": "contacted",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
}
```

---

## Application Management

### Get All Applications
- **Endpoint**: `GET /api/applications`
- **Access**: Private/Admin
- **Description**: Get all loan applications

#### Headers:
```
Authorization: Bearer <token>
```

#### Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for name/phone/email/loanType
- `status` (optional): Filter by status (pending, approved, rejected, under-review)
- `loanType` (optional): Filter by loan type

#### Response:
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "data": [
    {
      "_id": "application_id",
      "user": {
        "_id": "user_id",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
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

### Get Application by ID
- **Endpoint**: `GET /api/applications/:id`
- **Access**: Private/Admin
- **Description**: Get a specific loan application by ID

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "success": true,
  "data": {
    "_id": "application_id",
    "user": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
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

### Update Application Status
- **Endpoint**: `PUT /api/applications/:id`
- **Access**: Private/Admin
- **Description**: Update the status of a loan application

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "status": "approved"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Application status updated successfully",
  "data": {
    "_id": "application_id",
    "user": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
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
    "status": "approved",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
}
```

### Delete Application
- **Endpoint**: `DELETE /api/applications/:id`
- **Access**: Private/Admin
- **Description**: Delete a loan application

#### Headers:
```
Authorization: Bearer <token>
```

#### Response:
```json
{
  "success": true,
  "message": "Application deleted successfully"
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

For unauthorized access:
```json
{
  "success": false,
  "message": "Access denied. Authentication required."
}
```

For forbidden access:
```json
{
  "success": false,
  "message": "Access denied. Role 'customer' is not authorized to perform this action."
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
      "msg": "Loan amount is required",
      "param": "loanAmount",
      "location": "body"
    }
  ]
}
```