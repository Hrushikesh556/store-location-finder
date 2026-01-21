# 🚀 Backend Setup Guide - Store Location Finder

This guide will help you set up the backend with Vercel Serverless Functions and a MySQL database using Prisma ORM.

## 📋 Prerequisites

- Node.js 18+ installed
- A MySQL database (see options below)
- Vercel account (free)
- GitHub account

## 🗄️ Database Options (Choose One)

### Option 1: PlanetScale (Recommended - Free Tier)

1. **Create Account**: Go to [planetscale.com](https://planetscale.com) and sign up
2. **Create Database**: 
   - Click "New Database"
   - Name: `store_locator`
   - Region: Choose closest to you
3. **Get Connection String**:
   - Go to Settings → Connect
   - Select "Prisma"
   - Copy the DATABASE_URL

### Option 2: Neon MySQL (Free Tier)

1. **Create Account**: Go to [neon.tech](https://neon.tech) and sign up
2. **Create Project**: 
   - Click "New Project"
   - Select MySQL
   - Name: `store_locator`
3. **Get Connection String**: Copy from dashboard

### Option 3: Railway (Free Tier Available)

1. **Create Account**: Go to [railway.app](https://railway.app) and sign up
2. **New Project** → Add MySQL
3. **Get Connection String**: From MySQL service

### Option 4: Local MySQL (Development Only)

```bash
# Install MySQL
# Windows: Download from mysql.com
# Mac: brew install mysql
# Linux: sudo apt install mysql-server

# Create database
mysql -u root -p
CREATE DATABASE store_locator;
EXIT;
```

Connection string: `mysql://root:password@localhost:3306/store_locator`

## 🔧 Setup Steps

### Step 1: Clone and Install Dependencies

```bash
# Clone repository
git clone https://github.com/yourusername/store-location-finder.git
cd store-location-finder

# Install dependencies
npm install
```

### Step 2: Set Environment Variables

1. **Copy the example file**:
```bash
cp .env.example .env
```

2. **Edit `.env`** and add your DATABASE_URL:
```env
DATABASE_URL="mysql://user:password@host:port/store_locator?sslaccept=strict"
```

### Step 3: Set Up Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### Step 4: Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Option B: Deploy via Vercel Dashboard

1. **Push to GitHub**:
```bash
git add .
git commit -m "Add backend with Prisma"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository
   - Add Environment Variables:
     - `DATABASE_URL` = Your MySQL connection string
     - `ADMIN_USERNAME` = `Harshil`
     - `ADMIN_PASSWORD` = `Harshil@2003`
   - Click "Deploy"

### Step 5: Configure Environment Variables in Vercel

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `DATABASE_URL` | Your MySQL connection string | Production, Preview, Development |
| `ADMIN_USERNAME` | `Harshil` | Production |
| `ADMIN_PASSWORD` | `Harshil@2003` | Production |

### Step 6: Redeploy After Adding Environment Variables

1. Go to **Deployments** in Vercel
2. Click the three dots on latest deployment
3. Click **Redeploy**

## 🧪 Test the API

After deployment, test the API endpoints:

### Get Stores
```bash
curl https://your-app.vercel.app/api/stores
```

### Get Settings
```bash
curl https://your-app.vercel.app/api/settings
```

### Upload CSV (from frontend)
- Login as admin
- Upload CSV file
- Check upload summary

## 📁 Project Structure

```
store-location-finder/
├── api/                          # Vercel Serverless Functions
│   ├── stores.js                 # Store CRUD operations
│   ├── upload-csv.js             # CSV upload handler
│   └── settings.js               # Settings management
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.js                   # Optional seed data
├── index.html                    # Frontend
├── package.json                  # Dependencies
├── vercel.json                   # Vercel config
└── .env                          # Environment variables (don't commit)
```

## 🔄 How It Works

### Admin Upload Flow
```
Admin uploads CSV 
    → upload-csv API processes
    → Prisma validates & stores in MySQL
    → Returns summary (inserted/skipped)
    → Data persists in Vercel database
```

### Delivery Boy Access Flow
```
Delivery boy opens app
    → Stores API checks dataVisibility setting
    → Returns stores if visible
    → Shows error if hidden
```

## 🗄️ Database Schema

```sql
stores
├── id (Primary Key)
├── shop
├── store_name
├── latitude
├── longitude
├── salesman_id (Foreign Key)
├── beat_id (Foreign Key)
├── salesman_name
├── beat_name
└── created_at

salesmen
├── id
├── name
├── email
└── phone

beats
├── id
├── name
└── description

settings
├── id
├── key
├── value
└── updated_at
```

## 🐛 Troubleshooting

### Issue: Prisma Client Error

**Solution**: Regenerate Prisma Client
```bash
npx prisma generate
```

### Issue: Database Connection Failed

**Solution**: 
1. Verify DATABASE_URL is correct
2. Check if database allows remote connections
3. For PlanetScale, enable SSL: add `?sslaccept=strict`

### Issue: API Returns 404

**Solution**:
1. Ensure `api/` folder is at root level
2. Check `vercel.json` has correct routes
3. Redeploy on Vercel

### Issue: Environment Variables Not Working

**Solution**:
1. Add variables in Vercel Dashboard → Settings → Environment Variables
2. Redeploy the project
3. Don't use `.env` file in production

## 📊 Monitoring

### View Database
```bash
npx prisma studio
```

### Check Vercel Logs
1. Go to Vercel Dashboard
2. Click your project
3. View logs in "Functions" tab

## 🔒 Security

- Admin credentials stored as environment variables
- Database uses SSL connection
- API endpoints are public (add auth for production)
- Rate limiting can be added with Vercel Edge Middleware

## 🚀 Production Checklist

- [ ] Database URL added to environment variables
- [ ] Admin credentials set
- [ ] SSL enabled on database
- [ ] Test all API endpoints
- [ ] Test CSV upload
- [ ] Test data visibility toggle
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify database connection
3. Test API endpoints with curl
4. Open an issue on GitHub

## 🎯 Next Steps

After setup is complete:
1. Upload sample CSV data
2. Test delivery boy access
3. Toggle data visibility
4. Deploy to production

---

**Your backend is now ready! 🎉**
