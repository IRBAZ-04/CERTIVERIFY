# Certificate Verification System

Production-focused MERN system for certificate issuance, verification, and download.

## Core Features

- Role-based authentication (`SUPER_ADMIN`, `ORG_ADMIN`, `USER`)
- Secure password hashing (`bcryptjs`) and JWT-based auth
- Session invalidation with server-side session versioning
- Admin account management (create/list/update users)
- Bulk certificate upload via Excel (`.xlsx`, `.xls`)
- Strict upload validation with structured rejection reporting
- Certificate storage in MongoDB with clean schema
- Certificate generation and management
- Public certificate verification by unique certificate ID
- PDF download in printable layout

## Features Intentionally Disabled

These are out of current scope and are not exposed in main routes/navigation:

- OCR fraud scan
- Student portfolio
- Dashboard analytics endpoint
- Email sharing workflow

## Project Structure

```text
certificate-verification-system/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── utils/
└── server/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── utils/
```

## Environment Variables

### `server/.env`

```env
MONGO_URI=mongodb://localhost:27017/certificate_verification
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

```bash
# Terminal 1
cd server
npm install
npm run dev

# Terminal 2
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## API Reference

### Authentication

- `POST /api/auth/register` - Bootstrap first super admin only
- `POST /api/auth/login` - Login and get JWT
- `GET /api/auth/me` - Current authenticated profile
- `POST /api/auth/logout` - Invalidate current session token
- `GET /api/auth/users` - Admin list users
- `POST /api/auth/users` - Admin create user/admin
- `PATCH /api/auth/users/:id` - Admin update role/status/name

### Certificates

- `GET /api/certificates` - Admin list certificates
- `POST /api/certificates` - Admin create certificate
- `POST /api/certificates/upload` - Admin bulk upload via Excel
- `GET /api/certificates/verify/:id` - Public verification by certificate ID
- `PUT /api/certificates/:id` - Admin update/revoke certificate
- `DELETE /api/certificates/:id` - Admin delete certificate

## Excel Upload Format

Required headers:

- `Certificate ID`
- `Student Name`
- `Domain`
- `Start Date`
- `End Date`

The upload response includes:

- `summary.totalRows`
- `summary.inserted`
- `summary.rejected`
- `rejectedRows[]` with row number and rejection reasons
