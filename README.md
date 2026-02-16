# 🔧 BillSense AI - Backend API

RESTful API backend for BillSense AI invoice management system, built with Node.js, Express, MongoDB, and Google Gemini AI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

---

## 🎯 Overview

The BillSense AI backend provides a robust API for managing invoices, user authentication, and AI-powered features. It handles all business logic, data persistence, and integration with Google Gemini AI for intelligent invoice generation and insights.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **AI Integration**: Google Gemini API
- **Testing**: Jest + Supertest
- **Environment Config**: dotenv
- **CORS**: cors middleware
- **Security**: helmet, express-rate-limit

---

## ✨ Features

### 🔐 Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes with middleware
- Profile management

### 🧾 Invoice Management
- Create, read, update, delete invoices
- Filter invoices by status
- Auto-generate invoice numbers
- Track payment status
- Calculate totals with tax

### 🤖 AI-Powered Features
- **AI Invoice Generation**: Parse unstructured text into structured invoice data
- **Payment Reminders**: Generate personalized reminder emails
- **Dashboard Insights**: AI-powered financial summaries and recommendations

### 🔒 Security
- JWT-based authentication
- Password encryption
- Input validation
- CORS protection
- Rate limiting on sensitive endpoints

---

## 📂 Project Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection configuration
├── controllers/
│   ├── aiController.js          # AI features (Gemini integration)
│   ├── authController.js        # Authentication logic
│   └── invoiceController.js     # Invoice CRUD operations
├── middlewares/
│   └── authMiddleware.js        # JWT verification middleware
├── models/
│   ├── Invoice.js               # Invoice schema & model
│   └── User.js                  # User schema & model
├── routes/
│   ├── aiRoutes.js              # AI endpoints
│   ├── authRoutes.js            # Authentication endpoints
│   └── invoiceRoutes.js         # Invoice endpoints
├── tests/
│   └── auth.test.js             # Unit tests for authentication
├── .dockerignore                # Docker ignore file
├── .env                         # Environment variables (not in git)
├── Dockerfile                   # Docker configuration
├── jest.config.cjs              # Jest testing configuration
├── package.json                 # Dependencies and scripts
├── server.js                    # Express server entry point
└── README.md                    # This file
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Google Gemini API key

### Steps

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env` file** (see [Environment Variables](#environment-variables))

4. **Start the server**:

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:8000`

---

## 🔑 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=8000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/billsense

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# AI Integration
GEMINI_API_KEY=your_google_gemini_api_key
```

### How to Get API Keys

**MongoDB Atlas**:
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string

**Google Gemini API**:
1. Visit [ai.google.dev](https://ai.google.dev)
2. Sign in with Google account
3. Generate an API key

**JWT Secret**:
- Generate a random string (at least 32 characters)
- You can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Invoice Routes (`/api/invoices`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/invoices` | Get all user invoices | Yes |
| GET | `/api/invoices/:id` | Get single invoice | Yes |
| POST | `/api/invoices` | Create new invoice | Yes |
| PUT | `/api/invoices/:id` | Update invoice | Yes |
| DELETE | `/api/invoices/:id` | Delete invoice | Yes |

### AI Routes (`/api/ai`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/generate-invoice` | Generate invoice from text | Yes |
| POST | `/api/ai/generate-reminder` | Generate payment reminder | Yes |
| GET | `/api/ai/dashboard-summary` | Get AI insights | Yes |

---

## 📝 API Request Examples

### Register User
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Create Invoice
```bash
POST /api/invoices
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "invoiceNumber": "INV-001",
  "invoiceDate": "2024-01-15",
  "dueDate": "2024-02-15",
  "billFrom": {
    "businessName": "My Company LLC",
    "email": "company@example.com",
    "address": "123 Business St",
    "phone": "555-0100"
  },
  "billTo": {
    "clientName": "Client Corp",
    "email": "client@example.com",
    "address": "456 Client Ave",
    "phone": "555-0200"
  },
  "items": [
    {
      "name": "Web Development",
      "quantity": 1,
      "unitPrice": 1500,
      "taxPercent": 10,
      "total": 1650
    }
  ],
  "subtotal": 1500,
  "taxTotal": 150,
  "total": 1650,
  "status": "Pending",
  "notes": "Payment due within 30 days",
  "paymentTerms": "Net 30"
}
```

### Generate Invoice with AI
```bash
POST /api/ai/generate-invoice
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "text": "Invoice for web development project for Acme Corp. 40 hours at $75/hour. Client email: acme@example.com, address: 789 Corporate Blvd"
}
```

---

## 🧪 Testing

The backend includes comprehensive unit tests using Jest.

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage
```bash
npm run test:coverage
```

### Current Test Coverage
- ✅ User registration
- ✅ User login
- ✅ JWT authentication
- ✅ Invoice CRUD operations
- ✅ AI generation (mocked)

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t billsense-backend .
```

### Run Container
```bash
docker run -p 8000:8000 --env-file .env billsense-backend
```

### Using Docker Compose
```bash
# From project root
docker-compose up backend
```

---

## 🌐 Production Deployment

### Deploy to Render

1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all from `.env`
5. Deploy

### Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Create new project
3. Add MongoDB plugin
4. Deploy from GitHub
5. Add environment variables
6. Deploy

### Deploy to Heroku

```bash
heroku create billsense-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set GEMINI_API_KEY=your_gemini_key
git push heroku main
```

---

## 🔒 Security Best Practices

- ✅ Never commit `.env` file to version control
- ✅ Use strong JWT secrets (32+ characters)
- ✅ Implement rate limiting on authentication endpoints
- ✅ Validate and sanitize all user inputs
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Use environment variables for all secrets
- ✅ Implement proper error handling

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  businessName: String,
  address: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Invoice Model
```javascript
{
  user: ObjectId (ref: User),
  invoiceNumber: String (required, unique),
  invoiceDate: Date (required),
  dueDate: Date (required),
  billFrom: {
    businessName: String,
    email: String,
    address: String,
    phone: String
  },
  billTo: {
    clientName: String (required),
    email: String,
    address: String,
    phone: String
  },
  items: [{
    name: String (required),
    quantity: Number (required),
    unitPrice: Number (required),
    taxPercent: Number,
    total: Number (required)
  }],
  subtotal: Number (required),
  taxTotal: Number,
  total: Number (required),
  status: String (enum: ['Paid', 'Pending', 'Unpaid']),
  notes: String,
  paymentTerms: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Hanzala Yasin**



## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using Node.js and Express**
