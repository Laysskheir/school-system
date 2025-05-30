# School Management System

A comprehensive school management system built with Next.js and NestJS.

## Getting Started

## Default Admin Account

- **Email:** admin@gmail.com
- **Password:** admin

### Installation and Database Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd school-system
   ```

2. Install dependencies:

   ```bash
   # Install frontend and backend dependencies
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up the PostgreSQL database (!! Very Important !!):

   - Create a `.env` file in the `backend` directory with the following content:

     ```
     DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<db_name>"
     ```

   - Run database migrations and seed the database:

   ```bash
   cd backend
   npx prisma migrate dev
   npm run seed
   ```

4. Start the development servers:

   ```bash
   # Start backend server
   cd backend
   npm start:dev

   # Start frontend server (in a new terminal)
   cd frontend
   npm run dev
   ```

For testing and initial setup, use the following admin credentials:

```

```

#   s c h o o l - s y s t e m 
 
 
