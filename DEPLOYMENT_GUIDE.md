# 🚀 Complete Deployment Guide - Vercel + MySQL Backend

This guide will help you deploy the complete Store Location Finder app with backend persistence to Vercel.

## 📋 Overview

**What you're deploying:**
- ✅ Frontend: Single-page HTML application
- ✅ Backend: Vercel Serverless Functions
- ✅ Database: MySQL with Prisma ORM
- ✅ CSV Upload: Persists to database
- ✅ Data Visibility: Admin toggle control

## 🎯 Deployment Options

### Option 1: Free Plan (PlanetScale + Vercel) - RECOMMENDED

**Total Cost: $0/month**

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| Vercel | Hobby | Free | 100GB bandwidth, 6k minutes serverless |
| PlanetScale | Scaler Pro (Free) | Free | 5GB storage, 1B reads/month |

### Option 2: Paid Plans

| Database | Starting Price |
|----------|---------------|
| PlanetScale Pro | $29/month |
| Neon Serverless | $19/month |
| Railway | $5/month |

---

## 📝 Step-by-Step Deployment

### Step 1: Set Up Database (PlanetScale - Free)

#### 1.1 Create PlanetScale Account
1. Go to [planetscale.com](https://planetscale.com)
2. Click "Sign Up" (use GitHub for quick setup)
3. Verify your email

#### 1.2 Create Database
1. After login, click **"New database"**
2. Fill in:
   - **Database Name**: `store_locator`
   - **Region**: Select closest to you
3. Click **"Create database"**

#### 1.3 Get Connection String
1. Click on your database
2. Go to **Settings** → **Connect**
3. Select **"Prisma"** from the dropdown
4. Copy the **DATABASE_URL** - it looks like:
   ```
   mysql://xxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/store_locator?sslaccept=strict
   ```
5. **Save this URL** - you'll need it for Vercel

#### 1.4 Enable Branch Protection (Optional but Recommended)
1. Go to **Settings** → **Branches**
2. Enable "Protect main branch"

---

### Step 2: Push Code to GitHub

#### 2.1 Prepare Your Repository

```bash
# Clone the repository (if you haven't)
git clone https://github.com/yourusername/store-location-finder.git
cd store-location-finder

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push --force-reset
```

#### 2.2 Commit and Push

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add backend with Prisma and Vercel API"

# Push to GitHub
git push origin main
```

**Make sure your repository is public or you've connected Vercel to private GitHub.**

---

### Step 3: Deploy to Vercel

#### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" (use GitHub)
3. Complete setup

#### 3.2 Import Project
1. On Vercel dashboard, click **"Add New"** → **"Project"**
2. Find and select `store-location-finder` repository
3. Click **"Import"**

#### 3.3 Configure Project
1. **Framework Preset**: Select "Other"
2. **Root Directory**: `./` (default)
3. **Build Command**: Leave empty
4. **Output Directory**: Leave empty

#### 3.4 Add Environment Variables (CRITICAL!)

In the "Environment Variables" section, add:

| Key | Value | Environments |
|-----|-------|--------------|
| `DATABASE_URL` | (Your PlanetScale connection string) | All (Production, Preview, Development) |
| `ADMIN_USERNAME` | `Harshil` | Production |
| `ADMIN_PASSWORD` | `Harshil@2003` | Production |

**Important**: For `DATABASE_URL`, use the one you copied from PlanetScale including `?sslaccept=strict`

#### 3.5 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (1-2 minutes)
3. Your app is live! 🎉

---

### Step 4: Post-Deployment Setup

#### 4.1 Initialize Database

After first deployment, you need to create the tables:

```bash
# Locally, run:
npx prisma db push

# This creates all tables: stores, salesmen, beats, settings
```

**Alternative**: You can also run this via Vercel CLI:
```bash
vercel env pull .env
npx prisma db push
```

#### 4.2 Verify API Endpoints

Test these URLs in your browser or with curl:

```bash
# Get stores
curl https://your-app.vercel.app/api/stores

# Get settings
curl https://your-app.vercel.app/api/settings
```

Expected response:
```json
{
  "success": true,
  "dataVisible": true,
  "stores": [],
  "pagination": {...}
}
```

#### 4.3 Test CSV Upload

1. Visit your app: `https://your-app.vercel.app`
2. Go to admin: `https://your-app.vercel.app/#/admin`
3. Login with `Harshil` / `Harshil@2003`
4. Upload the sample CSV file
5. Verify upload summary shows inserted stores

---

### Step 5: Configure Custom Domain (Optional)

#### 5.1 Add Domain on Vercel
1. Go to project **Settings** → **Domains**
2. Add your domain (e.g., `store.yourdomain.com`)
3. Vercel will show DNS records to add

#### 5.2 Update DNS
Go to your domain registrar (Namecheap, GoDaddy, Cloudflare) and add:

| Type | Name | Value |
|------|------|-------|
| CNAME | store | cname.vercel-dns.com |

---

## 🔧 Local Development Setup

To develop locally with the backend:

```bash
# Install dependencies
npm install

# Copy .env.example to .env
cp .env.example .env

# Edit .env and add your DATABASE_URL
# DATABASE_URL="mysql://user:pass@host:3306/store_locator"

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Start local development server
npm run dev
```

Your app will be available at `http://localhost:3000`

---

## 📊 Database Management

### View Database with Prisma Studio

```bash
npx prisma studio
```

This opens a GUI to view and edit your database tables at `http://localhost:5555`

### Connect External Tools

For your PlanetScale database:

1. **MySQL Workbench / TablePlus**:
   - Host: from PlanetScale Connect page
   - Username: from PlanetScale
   - Password: from PlanetScale

2. **VS Code Extension**:
   - Install "MySQL" extension
   - Use connection string from PlanetScale

---

## 🔄 Update & Redeploy

### When You Make Changes

```bash
# Make your changes
# ... edit files ...

# Install new dependencies if any
npm install

# Regenerate Prisma Client if schema changed
npx prisma generate

# Commit
git add .
git commit -m "Your commit message"
git push origin main
```

**Vercel will auto-deploy on push!** 🚀

### When You Update Database Schema

```bash
# After editing prisma/schema.prisma
npx prisma generate
npx prisma db push
git add .
git commit -m "Update database schema"
git push
```

---

## 🐛 Troubleshooting

### Issue: Deployment Fails - "Prisma Client not found"

**Solution**:
1. Add `"postinstall": "prisma generate"` to `package.json` scripts
2. Push to GitHub
3. Redeploy on Vercel

### Issue: Database Connection Error

**Solution**:
1. Verify `DATABASE_URL` is correct in Vercel environment variables
2. Make sure it includes `?sslaccept=strict` for PlanetScale
3. Check if your database branch is "main"

### Issue: API Returns 404

**Solution**:
1. Ensure `api/` folder is at repository root
2. Check `vercel.json` has correct routes configuration
3. Verify files were pushed to GitHub

### Issue: Data Not Persisting

**Solution**:
1. Check browser console for API errors
2. Verify Vercel function logs
3. Test API endpoints directly with curl
4. Check database has tables (use Prisma Studio)

### Issue: "Environment variable not set"

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `DATABASE_URL` and other variables
3. Redeploy from Deployments tab

---

## 📈 Scaling & Performance

### Vercel Limits (Free Tier)
- 100 GB bandwidth per month
- 6,000 minutes of serverless execution
- 100 GB-Hours of serverless function execution

### When to Upgrade

**Upgrade when**:
- You hit bandwidth limits (many users)
- API execution time exceeds limits
- You need advanced features

**Vercel Pro**: $20/month
- 1 TB bandwidth
- Unlimited serverless execution
- Faster builds

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` to git
- ✅ Use different values for production/development
- ✅ Rotate credentials regularly

### 2. Database
- ✅ Use SSL connections (Planetscale requires it)
- ✅ Limit database user permissions
- ✅ Enable branch protection

### 3. API
- ✅ Add rate limiting (Vercel Edge Middleware)
- ✅ Implement proper authentication for production
- ✅ Validate all inputs

### 4. Frontend
- ✅ Use HTTPS (automatic on Vercel)
- ✅ Implement Content Security Policy
- ✅ Sanitize user inputs

---

## 📊 Monitoring

### Vercel Dashboard
- View real-time logs
- Monitor function execution time
- Check bandwidth usage
- Set up alerts

### PlanetScale Dashboard
- Monitor queries per second
- View storage usage
- Check connection metrics
- Enable query insights

---

## 🎯 Production Checklist

Before going live:

- [ ] Database set up and accessible
- [ ] `DATABASE_URL` added to Vercel environment
- [ ] Admin credentials set in environment
- [ ] Prisma schema pushed to database
- [ ] API endpoints tested
- [ ] CSV upload tested
- [ ] Data visibility toggle tested
- [ ] Delivery boy access tested
- [ ] Custom domain configured (optional)
- [ ] Error monitoring set up (optional)
- [ ] Analytics configured (optional)

---

## 📞 Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [PlanetScale Docs](https://docs.planetscale.com)

### Help & Support
- [Vercel Support](https://vercel.com/support)
- [Prisma Discord](https://discord.gg/prisma)
- [PlanetScale Discord](https://discord.gg/planetscale)

---

## 🎉 You're Live!

Your Store Location Finder app is now deployed with:

✅ Persistent database storage  
✅ Admin CSV upload functionality  
✅ Data visibility toggle  
✅ Delivery boy search and navigation  
✅ Auto-scaling with Vercel  
✅ Free hosting with PlanetScale  

**Admin URL**: `https://your-app.vercel.app/#/admin`  
**Delivery URL**: `https://your-app.vercel.app`

Happy delivering! 🛵📦
