# CRM Management System

A full-stack **Customer Relationship Management (CRM)** web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. This application helps organizations manage customers, leads, deals, meetings, documents, and users through a secure role-based system.

---

# Project Overview

The CRM Management System is designed to simplify sales and customer relationship management by providing a centralized platform where organizations can:

- Manage customer leads
- Track sales deals
- Schedule meetings
- Store documents
- Analyze sales performance
- Manage employees using role-based access

The system provides separate access for:

- Admin
- Sales Manager
- Sales Representative

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Forgot Password Page
- Change Password
- Protected Routes
- Role-Based Authorization

---

## Dashboard

- Welcome Dashboard
- Total Users
- Total Leads
- Total Deals
- Total Interactions
- Total Documents
- Lead Status Chart
- Deal Stage Chart
- Monthly Sales Chart
- Interaction Analytics
- Upcoming Meetings
- Recent Activities

---

## Lead Management

- Add Lead
- Edit Lead
- Delete Lead
- View Lead Details
- Search Leads
- Filter Leads by Status

---

## Deal Management

- Create Deal
- Update Deal
- Delete Deal
- Deal Status Tracking
- Deal Pipeline (Kanban Board)

---

## Interaction Management

- Add Meetings
- Phone Calls
- Emails
- Customer Notes
- View Upcoming Meetings

---

## Document Management

- Upload Documents
- View Documents
- Delete Documents

---

## User Management

(Admin Only)

- Add Users
- Update Users
- Delete Users
- Assign Roles

---

## Profile Management

- View Profile
- Update Profile
- Change Password

---

# User Roles

## Admin

- Manage Users
- Manage Leads
- Manage Deals
- Manage Documents
- View Dashboard
- Manage Reports

---

## Sales Manager

- Assign Leads
- Manage Team Deals
- Monitor Sales
- View Reports
- Manage Meetings

---

## Sales Representative

- Manage Assigned Leads
- Manage Deals
- Schedule Meetings
- Upload Documents

---

# Technologies Used

## Frontend

- React.js
- React Router DOM
- Bootstrap 5
- Axios
- Chart.js
- React ChartJS 2
- React Icons
- CSS3

---

## Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Multer

---

## Database

- MongoDB
- Mongoose

---

# Folder Structure

```
CRM-Management-System
│
├── client
│   ├── public
│   ├── src
│   │
│   ├── components
│   │     ├── charts
│   │     ├── Layout.jsx
│   │     ├── Navbar.jsx
│   │     ├── ProtectedRoute.jsx
│   │     └── Sidebar.jsx
│   │
│   ├── pages
│   │     ├── Home.jsx
│   │     ├── Login.jsx
│   │     ├── Register.jsx
│   │     ├── ForgotPassword.jsx
│   │     ├── Dashboard.jsx
│   │     ├── Leads.jsx
│   │     ├── Deals.jsx
│   │     ├── DealPipeline.jsx
│   │     ├── Interactions.jsx
│   │     ├── Documents.jsx
│   │     ├── Users.jsx
│   │     ├── Profile.jsx
│   │     └── ChangePassword.jsx
│   │
│   ├── services
│   │
│   ├── styles
│   │
│   ├── utils
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Database Collections

- Users
- Leads
- Deals
- Interactions
- Documents

---

# API Endpoints

## Authentication

```
POST /api/auth/login
POST /api/users/register
```

---

## Users

```
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

---

## Leads

```
GET    /api/leads
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
```

---

## Deals

```
GET    /api/deals
POST   /api/deals
PUT    /api/deals/:id
DELETE /api/deals/:id
```

---

## Interactions

```
GET    /api/interactions
POST   /api/interactions
PUT    /api/interactions/:id
DELETE /api/interactions/:id
```

---

## Documents

```
GET    /api/documents
POST   /api/documents
DELETE /api/documents/:id
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/crm-management-system.git
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Role-Based Access Control
- Middleware Authorization
- Secure REST APIs

---

# Project Modules

- Home Page
- Login
- Register
- Forgot Password
- Dashboard
- Users
- Leads
- Deals
- Deal Pipeline
- Interactions
- Documents
- Profile
- Change Password

---

# Future Enhancements

- OTP-based Password Reset
- Email Notifications
- Audit Logs
- Export Reports (PDF/Excel)
- Drag & Drop Deal Pipeline
- Dark Mode
- Cloud Deployment
- Mobile Responsive Improvements

---

# Screenshots

Add screenshots of the following pages:

- Home Page
- Login Page
- Register Page
- Dashboard
- Leads
- Deals
- Deal Pipeline
- Interactions
- Documents
- Users
- Profile

---

# Learning Outcomes

This project demonstrates:

- Full Stack Web Development
- REST API Development
- JWT Authentication
- CRUD Operations
- MongoDB Database Design
- MVC Architecture
- Role-Based Authorization
- React Component Architecture
- Chart Visualization
- File Upload using Multer
- Responsive UI Design

---

# Author

## **Anusha**

**B.Tech Student**

**Full Stack Web Developer**

---

# License

This project is developed for educational and learning purposes.

© 2026 Anusha. All Rights Reserved.