# Full-Stack Authentication System

A full-stack authentication system built with **Node.js/Express** (backend), **Angular** (frontend), and **MySQL** (database). Features include user registration, email verification, login, JWT authentication, password reset, and an admin panel.

## 🌐 Live Demo

- **Frontend:** https://gorgeous-starburst-95592e.netlify.app
- **Backend API:** https://auth-system-backend-944b.onrender.com
- **API Docs (Swagger):** https://auth-system-backend-944b.onrender.com/api-docs

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, Bootstrap 5 |
| Backend | Node.js, Express.js |
| Database | MySQL (Sequelize ORM) |
| Auth | JWT + Refresh Tokens |
| Email | Resend (SMTP) |
| Hosting | Netlify (frontend), Render (backend), Railway (database) |

---

## 📁 Project Structure

```
Full-Stack-Authentication-System-Deployment/
├── frontend/                   # Angular frontend
│   └── src/app/
│       ├── account/            # Login, Register, Forgot Password
│       ├── admin/              # Admin panel
│       ├── home/               # Home page
│       ├── _helpers/           # Interceptors, guards
│       ├── _models/            # TypeScript models
│       └── _services/          # API services
├── src/                        # Node.js backend
│   ├── controllers/            # Auth & user controllers
│   ├── middleware/             # JWT authorize, error handler
│   ├── models/                 # Sequelize models
│   ├── routes/                 # API routes
│   └── _helpers/               # DB, email, swagger helpers
├── server.js                   # Entry point
└── render.yaml                 # Render deployment config
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) (v18 or higher)
- [XAMPP](https://www.apachefriends.org) (for local MySQL)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- [Git](https://git-scm.com)

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/TabigueKB/Full-Stack-Authentication-System-Deployment.git
cd Full-Stack-Authentication-System-Deployment
```

### 2. Set up the database

1. Open **XAMPP Control Panel** and start **MySQL**
2. Go to `http://localhost/phpmyadmin`
3. Create a new database named `auth_system_db`

### 3. Set up environment variables

Create a `.env` file in the root folder:

```env
PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=auth_system_db
DB_USER=root
DB_PASS=

JWT_SECRET=your-super-secret-jwt-key-change-this

EMAIL_FROM=noreply@authsystem.com
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

CORS_ORIGIN=http://localhost:4200
```

> 💡 For local testing, get free SMTP credentials at [ethereal.email](https://ethereal.email)

### 4. Install backend dependencies and start the server

```bash
npm install
npm start
```

The backend will run at `http://localhost:4000`
Swagger docs at `http://localhost:4000/api-docs`

### 5. Install frontend dependencies and start the app

```bash
cd frontend
npm install
ng serve
```

The frontend will run at `http://localhost:4200`

---

## 🌍 Deploying to Production

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New → Blueprint**
3. Connect your GitHub repository
4. Fill in the environment variables in Render dashboard:

| Key | Value |
|---|---|
| `DB_HOST` | Your Railway MySQL host |
| `DB_PORT` | Your Railway MySQL port |
| `DB_NAME` | Your Railway database name |
| `DB_USER` | Your Railway MySQL user |
| `DB_PASS` | Your Railway MySQL password |
| `JWT_SECRET` | A random secret string |
| `SMTP_HOST` | `smtp.resend.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `resend` |
| `SMTP_PASS` | Your Resend API key |
| `EMAIL_FROM` | `onboarding@resend.dev` |
| `CORS_ORIGIN` | Your Netlify frontend URL |
| `NODE_ENV` | `production` |

### Database → Railway

1. Go to [railway.app](https://railway.app) → **New Project → MySQL**
2. Go to **Settings → Networking** → enable **Public Networking**
3. Copy the public host and port for Render environment variables

### Frontend → Netlify

1. Update `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
    production: true,
    apiUrl: 'https://your-backend.onrender.com/api'
};
```

2. Build the frontend:
```bash
cd frontend
ng build --configuration production
```

3. Go to [netlify.com](https://netlify.com) → drag and drop the `dist/auth-system-frontend/browser` folder

---

## 🔑 Features

- ✅ User registration with email verification
- ✅ Login with JWT authentication
- ✅ Refresh token rotation
- ✅ Forgot password / Reset password
- ✅ Role-based access (Admin / User)
- ✅ Admin panel — view, add, edit, delete accounts
- ✅ Swagger API documentation

---

## 👤 Default Test Accounts

After deploying, manually verify accounts in the database:

```sql
-- Verify and set as Admin
UPDATE Accounts SET verified = NOW(), verificationToken = NULL, role = 'Admin' WHERE email = 'admin@example.com';

-- Verify as regular User
UPDATE Accounts SET verified = NOW(), verificationToken = NULL WHERE email = 'user@example.com';
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/accounts/register` | Register new account |
| POST | `/api/accounts/verify-email` | Verify email |
| POST | `/api/accounts/authenticate` | Login |
| POST | `/api/accounts/refresh-token` | Refresh JWT |
| POST | `/api/accounts/revoke-token` | Logout |
| POST | `/api/accounts/forgot-password` | Request password reset |
| POST | `/api/accounts/reset-password` | Reset password |
| GET | `/api/accounts` | Get all accounts (Admin only) |
| GET | `/api/accounts/:id` | Get account by ID |
| PUT | `/api/accounts/:id` | Update account |
| DELETE | `/api/accounts/:id` | Delete account |

---

## 🔧 Keep Backend Awake (Free Tier)

Render's free plan sleeps after 15 minutes of inactivity. To keep it awake:

1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add new monitor → HTTP(s)
3. URL: `https://your-backend.onrender.com/health`
4. Interval: **5 minutes**

---

## 📝 License

This project is for educational purposes.
