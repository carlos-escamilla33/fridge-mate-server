# Fridge Mate API

A full-stack RESTful API for managing kitchen inventory, tracking food expiration dates, and reducing food waste. Built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **User Authentication** - JWT-based authentication with access and refresh tokens
- **Account Management** - User registration, login, password reset, and profile management
- **Inventory Tracking** - Create, read, update, and delete food items
- **Expiration Monitoring** - Track expiration dates to reduce food waste
- **Profile Management** - User profiles with customizable settings
- **Email Notifications** - Password reset functionality with Nodemailer
- **Secure API** - Protected routes with JWT middleware

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Validation:** Joi
- **Testing:** Jest, Supertest
- **Email Service:** Nodemailer (with Mailtrap for development)
- **Deployment:** Render

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/carlos-escamilla33/fridge-mate-api.git
   cd fridge-mate-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE fridge_mate_app;
   ```

4. **Create environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fridge_mate_app
   DB_USER=your_username
   DB_PASSWORD=your_password

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # JWT Secrets
   JWT_SECRET=your_jwt_secret_here
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

   # Email Service (Mailtrap for development)
   EMAIL=sandbox.smtp.mailtrap.io
   EMAIL_USER=your_mailtrap_user
   EMAIL_PASSWORD=your_mailtrap_password

   # App Settings
   NOTIFICATION_CLEANUP_DAYS=3
   DEFAULT_EXPIRATION_WARNING_DAYS=2
   ```

5. **Run database migrations**
   
   Execute the SQL schema to create tables (you'll need your schema.sql file)
   ```bash
   psql -U your_username -d fridge_mate_app < schema.sql
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Server will run on `http://localhost:3000`

### Production Mode
```bash
npm start
```

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run model tests only
```bash
npm run test:models
```

### Run route tests only
```bash
npm run test:routes
```

**Note:** Tests use a separate test database. Create `.env.test` for test configuration.

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login user | No |
| POST | `/forgot-password` | Request password reset email | No |
| POST | `/reset-password` | Reset password with token | No |
| POST | `/refresh` | Refresh access token | No |
| POST | `/change-password` | Change user password | Yes |

### Account Routes (`/api/accounts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register-profile` | Create a new profile for account | Yes |
| GET | `/me` | Get current account and profile info | Yes |
| PUT | `/me` | Update current account information | Yes |
| DELETE | `/me` | Delete entire account | Yes |

### Profile Routes (`/api/profiles`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all profiles for account | Yes |
| GET | `/:id` | Get profile by ID | Yes |
| PUT | `/:id` | Update profile name | Yes |
| DELETE | `/:id` | Delete profile | Yes |
| PATCH | `/:id/notifications` | Update notification settings | Yes |

### Item Routes (`/api/items`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all items for account | Yes |
| POST | `/` | Create a new item | Yes |
| GET | `/:id` | Get item by ID | Yes |
| PUT | `/:id` | Update item | Yes |
| DELETE | `/:id` | Delete item | Yes |
| GET | `/expiring/:days` | Get items expiring within X days | Yes |
| GET | `/list/expired` | Get all expired items | Yes |

## 🔐 Authentication

The API uses JWT for authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

**Token Lifespan:**
- Access Token: 15 minutes
- Refresh Token: 30 days

## 📦 Project Structure


```
fridge-mate-api/
├── src/
│   ├── controllers/
│   │   ├── accountsController.js   # Account management logic
│   │   ├── authController.js       # Authentication logic
│   │   ├── itemsController.js      # Items management logic
│   │   └── profilesController.js   # Profile management logic
│   ├── database/
│   │   ├── config/                 # Database configuration
│   │   ├── models/                 # Database models
│   │   └── schema.sql              # Database schema
│   ├── middleware/
│   │   └── authToken.js            # JWT authentication middleware
│   ├── routes/
│   │   ├── accountRoutes.js        # Account routes
│   │   ├── authRoutes.js           # Authentication routes
│   │   ├── itemsRouter.js          # Items routes
│   │   └── profileRouter.js        # Profile routes
│   ├── utils/
│   │   └── sendResetEmail.js       # Email utility functions
│   └── api.js                      # API router configuration
├── tests/
│   ├── models/
│   │   ├── accountModel.test.js    # Account model tests
│   │   ├── database.test.js        # Database connection tests
│   │   └── profileModel.test.js    # Profile model tests
│   └── routes/
│       └── authRoutes.test.js      # Authentication route tests
├── media/                          # Media assets
├── app.js                          # Express app configuration
├── server.js                       # Server entry point
├── package.json                    # Dependencies and scripts
├── .env                            # Environment variables (not in repo)
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation

```

## 🌐 Deployment

The API is deployed on [Render](https://render.com).

**Production URL:** `https://your-app.onrender.com`

### Deployment Steps:

1. Push code to GitHub
2. Connect Render to your repository
3. Create PostgreSQL database on Render
4. Set environment variables in Render dashboard
5. Deploy

**Important:** Update `DATABASE_URL` and `NODE_ENV=production` in Render environment variables.

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT authentication for protected routes
- Input validation with Joi
- SQL injection protection with parameterized queries
- CORS enabled for cross-origin requests
- Environment variables for sensitive data

## 🐛 Common Issues

### Database Connection Errors
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database exists

### JWT Errors
- Ensure JWT_SECRET and REFRESH_TOKEN_SECRET are set
- Check token expiration
- Verify Authorization header format

### Test Failures
- Ensure test database is created
- Check that `.env.test` is configured
- Verify all tables are created in test database

## 📝 Future Enhancements

- [ ] Real-time notifications for expiring items
- [ ] Recipe suggestions based on available ingredients
- [ ] Barcode scanning for quick item entry
- [ ] Shopping list generation
- [ ] Multiple fridge/pantry support
- [ ] Meal planning integration

## 👨‍💻 Developer

**Carlos Escamilla**
- GitHub: [@carlos-escamilla33](https://github.com/carlos-escamilla33)
- Email: Rileyrolls1@gmail.com

**Built by Carlos Escamilla**