# 🛡️ CertiVerify AI — AI-Powered Certificate Verification & Fraud Detection System

> A world-class, production-ready MERN platform for issuing, verifying, and protecting the integrity of digital credentials.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/) [![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/) [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/) [![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Feature List](#-feature-list)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Setup & Installation](#-setup--installation)
6. [Environment Variables](#-environment-variables)
7. [Running the Project](#-running-the-project)
8. [API Reference](#-api-reference)
9. [UI/UX Theme](#-uiux-theme)
10. [How to Modify Backend / DB](#-how-to-modify-backend--db)
11. [Deployment](#-deployment)

---

## 🎯 Project Overview

**CertiVerify AI** is a complete, full-stack MERN application that brings enterprise-level credential management to any organization. It combines:

- **Multi-tenant organization support** — each registered organization manages its own certificate ledger
- **AI-powered OCR fraud detection** — upload a scanned certificate image and the system cross-references every word against the immutable database record using Tesseract.js
- **Simulated blockchain hashing** — every certificate gets a SHA-256 hash stored at issuance, ensuring tamper-proof integrity
- **QR code verification** — each certificate carries a scannable QR code that opens the public verification page
- **Analytics dashboard** — real-time metrics on issuance trends, fraud attempts, and more
- **Student portfolio** — a public, URL-based page listing all certificates for a student

---

## ✨ Feature List

| Feature | Status |
|---|---|
| 🔐 JWT Authentication + RBAC (Super Admin / Org Admin) | ✅ |
| 🏢 Multi-Organization System | ✅ |
| 📄 Certificate Issuance (Bulk Excel + Single Form) | ✅ |
| 🔑 SHA-256 Blockchain Hash per Certificate | ✅ |
| 📱 QR Code generation (auto on every cert) | ✅ |
| 🔍 Public Verification by ID | ✅ |
| 🧠 AI OCR Fraud Detection (Tesseract.js) | ✅ |
| 📊 Analytics Dashboard (Recharts) | ✅ |
| 📬 Email Sharing (Nodemailer + Ethereal) | ✅ |
| 🧾 Certificate Version Control & Revoke | ✅ |
| 👤 Student Portfolio (Public) | ✅ |
| 📤 Copy/Share Certificate Links | ✅ |
| 🧠 Smart Fraud Rules (Duplicate Detection) | ✅ |
| 🌍 Multi-language (English + Hindi) | ✅ |
| 🎨 Aurora Neural Theme (Futuristic UI) | ✅ |
| 📱 Mobile Responsive | ✅ |

---

## 🛠 Tech Stack

### Frontend
| Tech | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 6 | Build tool |
| Tailwind CSS | v4 | Styling |
| Framer Motion | 12 | Animations |
| Recharts | 2 | Analytics charts |
| i18next | 24 | Multi-language |
| Lucide React | — | Icons |
| React Router | 7 | Client routing |

### Backend
| Tech | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4 | REST API |
| MongoDB (Mongoose) | 8 | Database |
| JWT + bcryptjs | — | Auth + Password hashing |
| Tesseract.js | 7 | OCR / AI Fraud Detection |
| QRCode | — | QR Code generation |
| Nodemailer | — | Email sharing |
| Multer | — | File upload handling |
| xlsx | — | Excel parsing |
| Helmet | — | Security headers |
| Morgan | — | HTTP request logging |

---

## 📁 Project Structure

```
certificate-verification-system/
├── client/                     # React (Vite) frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # Nav with mobile menu + language toggle
│   │   │   ├── Footer.jsx       # Footer with links + status
│   │   │   └── ui/              # ShadCN-style primitives
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── Card.jsx
│   │   │       └── Modal.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Marketing homepage
│   │   │   ├── LoginPage.jsx         # Auth page
│   │   │   ├── Dashboard.jsx         # Admin command center
│   │   │   ├── VerifyPage.jsx        # Public cert verification
│   │   │   ├── FraudScanPage.jsx     # AI OCR fraud scan
│   │   │   └── StudentPortfolioPage.jsx  # Public student certs
│   │   ├── services/
│   │   │   └── api.js           # Axios instance
│   │   ├── utils/
│   │   │   ├── cn.js            # Class merge utility
│   │   │   └── generatePDF.js   # Client-side PDF generation
│   │   ├── i18n/
│   │   │   └── index.js         # English + Hindi translations
│   │   ├── App.jsx              # Routes + AnimatePresence
│   │   └── main.jsx             # Entry point
│   ├── tailwind.config.js       # Aurora Neural theme tokens
│   └── .env                     # Frontend env vars
│
├── server/                     # Node.js + Express backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Register/Login
│   │   └── certificateController.js  # All cert operations
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT + RBAC
│   │   ├── uploadMiddleware.js  # Multer (Excel)
│   │   └── imageUploadMiddleware.js  # Multer (Image)
│   ├── models/
│   │   ├── User.js             # User / Organization schema
│   │   ├── Certificate.js      # Certificate + hash + QR schema
│   │   └── FraudLog.js        # OCR/Duplicate fraud logs
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── certificateRoutes.js
│   ├── server.js
│   └── .env                    # Server env vars
│
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** v18+  
- **npm** v9+  
- A **MongoDB Atlas** account (free tier works perfectly) or local MongoDB

### 1. Clone the project

```bash
git clone <your-repo-url>
cd certificate-verification-system
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/certiverify?retryWrites=true&w=majority

# JWT Secret (use a long, random string)
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_chars

# Server Port
PORT=5000

# Public URL of the frontend (for QR code links and email links)
FRONTEND_URL=http://localhost:5173

# Email (optional — leave blank to use Ethereal test sandbox)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@certiverify.ai
```

> **Note:** If `EMAIL_HOST` is not set, the system automatically uses [Ethereal](https://ethereal.email/) — a free fake SMTP service. Email preview links will be logged to the server console.

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Project

### Development (run both in separate terminals)

```bash
# Terminal 1 — Start the backend
cd server
npm run dev

# Terminal 2 — Start the frontend
cd client
npm run dev
```

The app will be live at: **http://localhost:5173**

### First-Time Setup

1. Navigate to `/login` and **register** your first admin account
2. Go to `/dashboard` to start issuing certificates
3. Use `/verify?id=YOUR_CERT_ID` to test public verification

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register organization admin |
| `POST` | `/api/auth/login` | Public | Login, returns JWT token |
| `GET` | `/api/auth/profile` | Private | Get current user profile |

### Certificates

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/certificates` | Private/Admin | List all certificates (scoped by org) |
| `POST` | `/api/certificates` | Private/Admin | Create single certificate |
| `POST` | `/api/certificates/upload` | Private/Admin | Bulk upload via Excel |
| `GET` | `/api/certificates/verify/:id` | **Public** | Verify certificate by ID |
| `GET` | `/api/certificates/student/:name` | **Public** | Get student portfolio |
| `POST` | `/api/certificates/ocr` | **Public** | AI OCR fraud detection |
| `GET` | `/api/certificates/analytics` | Private/Admin | Analytics data |
| `POST` | `/api/certificates/:id/share` | Private/Admin | Email share |
| `PUT` | `/api/certificates/:id` | Private/Admin | Update / Revoke certificate |
| `DELETE` | `/api/certificates/:id` | Private/Admin | Delete certificate |

#### Excel Upload Format

Your `.xlsx` file should have these column headers:

| Certificate ID | Student Name | Domain | Start Date | End Date |
|---|---|---|---|---|
| CERT-2026-001 | Jane Doe | Web Development | 2026-01-01 | 2026-12-31 |

---

## 🎨 UI/UX Theme

The project uses the **Aurora Neural Theme** — a futuristic, dark, glassmorphic design system.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Background | `#020617` | Page background |
| Primary (Cyan) | `#22D3EE` | Primary actions, highlights |
| Secondary (Violet) | `#A78BFA` | Secondary accents |
| Accent (Emerald) | `#34D399` | Success states |
| Text | `#F8FAFC` | Primary text |

### Glass Panel Style

```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

### Font Stack
- **Headings**: Poppins (display, font-black)
- **Body**: Inter (sans-serif)

---

## 🔧 How to Modify Backend / DB

### Adding a new field to Certificate

1. Open `server/models/Certificate.js`
2. Add your field to `certificateSchema` (e.g. `grade: { type: String }`)
3. If it needs to be returned in public verify, no change needed — it's all returned
4. If you need it in Excel upload, add parsing in `certificateController.js` → `uploadCertificates` loop

### Adding a new API endpoint

1. Write the controller function in `server/controllers/certificateController.js`
2. Export it at the bottom
3. Import + register it in `server/routes/certificateRoutes.js`
4. Add the `protect` middleware if it needs authentication

### Changing the database (MongoDB Atlas)

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster → get the connection string
3. Replace `MONGO_URI` in `server/.env`

### Resetting all data

Connect to your database and drop the `certificates` and `users` collections via MongoDB Atlas UI or Compass.

---

## 🌐 Deployment

### Frontend (Vercel)

```bash
cd client
npm run build
# Deploy the /dist folder to Vercel
```

Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Railway / Render)

1. Push your `server/` folder to GitHub
2. Connect to Railway or Render
3. Set all environment variables from `server/.env`
4. Start command: `npm start`

### Environment Checklist for Production

- [ ] `MONGO_URI` pointing to Atlas (not localhost)
- [ ] `JWT_SECRET` is a long, random, secret string
- [ ] `FRONTEND_URL` is your actual Vercel URL
- [ ] `EMAIL_HOST` / `EMAIL_PASS` configured if emails are needed
- [ ] CORS updated in `server.js` to only allow your frontend domain

---

## 📖 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — free for educational and commercial use.

---

*Built with ❤️ using the MERN stack, Tesseract.js OCR, and the Aurora Neural design system.*
