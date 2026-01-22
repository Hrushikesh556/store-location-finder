# 🚀 Netlify Deployment Guide - Store Location Finder

Complete guide to deploy the Store Location Finder App to Netlify with backend persistence.

## 📋 Overview

**What you're deploying:**
- ✅ Frontend: Single-page HTML application
- ✅ Backend: Netlify Serverless Functions
- ✅ Database: MySQL with Prisma ORM (PlanetScale recommended)
- ✅ CSV Upload: Persists to database
- ✅ Data Visibility: Admin toggle control

---

## 🗄️ Step 1: Set Up Free Database (PlanetScale)

### Why PlanetScale?
- ✅ Completely FREE tier available
- ✅ Serverless MySQL database
- ✅ Auto-scaling
- ✅ Netlify optimized

### Create PlanetScale Account
1. Go to [planetscale.com](https://planetscale.com) and sign up (use GitHub)
2. Verify your email

### Create Database
1. After login, click **"New database"**
2. Fill in:
   - **Database Name**: `store_locator`
   - **Region**: Select closest to you
3. Click **"Create database"**

### Get Connection String
1. Click on your new database
2. Go to **Settings** → **Connect**
3. Select **"Prisma"** from the dropdown
4. Copy the **DATABASE_URL** - it looks like:
   ```
   mysql://xxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/store_locator?sslaccept=strict
   ```
5. **Save this URL** - you'll need it for Netlify

---

## 📤 Step 2: Push Code to GitHub

### 2.1 Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit - Store Location Finder App"
```

### 2.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Name: `store-location-finder`
4. Click **"Create repository"**

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/store-location-finder.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy to Netlify

### 3.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign Up" (use GitHub for easy setup)
3. Authorize Netlify to access your GitHub

### 3.2 Import Project
1. On Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
2. Find and select `store-location-finder` repository
3. Click **"Import site"**

### 3.3 Configure Build Settings

**Build command**: `npm install && npx prisma generate`

**Publish directory**: `.` (root)

**Base directory**: Leave empty

### 3.4 Add Environment Variables (CRITICAL!)

Scroll down to "Environment variables" and add:

| Key | Value | Scope |
|-----|-------|-------|
| `DATABASE_URL` | (Your PlanetScale connection string) | All |
| `ADMIN_USERNAME` | `Harshil` | All |
| `ADMIN_PASSWORD` | `Harshil@2003` | All |

**Important**: 
- For `DATABASE_URL`, use the one you copied from PlanetScale
- Include `?sslaccept=strict` at the end
- Scope should be "All" (Development, Deploy Preview, Production)

### 3.5 Deploy
1. Click **"Deploy site"**
2. Wait for deployment to complete (2-5 minutes)
3. Your app is live! 🎉

---

## 🗄️ Step 4: Initialize Database

After first deployment, create the database tables:

### Option A: Using Prisma CLI
```bash
# Install dependencies locally
npm install

# Create .env file locally
echo "DATABASE_URL=your_planetscale_url" > .env

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### Option B: Using Netlify CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Link to your site
netlify link

# Pull environment variables
netlify env:pull .env

# Push schema
npx prisma db push
```

This creates:
- ✅ `stores` table
- ✅ `settings` table
- ✅ All indexes

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test API Endpoints
```bash
# Test stores endpoint
curl https://your-site.netlify.app/.netlify/functions/stores

# Test settings endpoint
curl https://your-site.netlify.app/.netlify/functions/settings
```

Expected response:
```json
{
  "success": true,
  "dataVisible": true,
  "stores": [],
  "pagination": { "total": 0, "page": 1, "totalPages": 0 }
}
```

### 5.2 Test Admin Features
1. Visit: `https://your-site.netlify.app/#/admin`
2. Login with `Harshil` / `Harshil@2003`
3. Upload the provided `sample-stores.csv`
4. Verify upload summary shows inserted stores

### 5.3 Test Delivery Features
1. Visit: `https://your-site.netlify.app/`
2. Click "Delivery Boy Login"
3. Search for stores
4. Click navigation button to open Google Maps

---

## 🎨 Step 6: Custom Domain (Optional)

### Add Custom Domain on Netlify
1. Go to **Site configuration** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `store.yourdomain.com`)
4. Netlify will show DNS records to add

### Update DNS at Your Registrar
Go to your domain provider (Namecheap, GoDaddy, Cloudflare) and add:

| Type | Name | Value |
|------|------|-------|
| CNAME | store | your-site-name.netlify.app |

---

## 📊 Database Management

### View Database with Prisma Studio
```bash
npx prisma studio
```
Opens at `http://localhost:5555`

### Connect External Tools
- **MySQL Workbench**: Use PlanetScale connection details
- **TablePlus**: Import PlanetScale connection
- **VS Code**: Install MySQL extension

---

## 🔄 Updating Your App

### Make Changes
```bash
# Make your changes
# ... edit files ...

# Commit
git add .
git commit -m "Your change description"
git push origin main
```

**Netlify auto-deploys on push!** 🚀

### Update Database Schema
```bash
# Edit prisma/schema.prisma
# Then:
npx prisma generate
npx prisma db push
git add .
git commit -m "Update database schema"
git push
```

---

## 🐛 Troubleshooting

### Deployment Fails - "Prisma Client not found"
**Solution**: `package.json` already has `"postinstall": "prisma generate"`

### Database Connection Error
**Solution**: 
1. Verify `DATABASE_URL` in Netlify environment variables
2. Ensure it includes `?sslaccept=strict` for PlanetScale
3. Check database branch is "main"

### Function Returns 404
**Solution**:
1. Ensure `netlify/functions/` folder is at repository root
2. Check files were pushed to GitHub
3. Check `netlify.toml` has correct redirect rules

### Data Not Persisting
**Solution**:
1. Check browser console for API errors
2. View Netlify function logs (Functions tab)
3. Test API with curl
4. Verify database has tables with `npx prisma studio`

### Environment Variables Not Working
**Solution**:
1. Go to Site configuration → Environment variables
2. Add variables for All environments
3. Redeploy from Deployments tab

---

## 📈 Monitoring

### Netlify Dashboard
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

## 🔒 Security Best Practices

- ✅ Database uses SSL connections
- ✅ Admin credentials stored as environment variables
- ✅ No hardcoded secrets in code
- ✅ CORS properly configured
- ✅ Input validation on all endpoints

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| **Netlify** | Free | **$0/month** | 100GB bandwidth, 125k invocations/month |
| **PlanetScale** | Scaler Pro | **$0/month** | 5GB storage, 1B reads/month |
| **Total** | - | **$0/month** | - |

### When to Upgrade

**Netlify Pro** ($19/month):
- 400GB bandwidth
- 1000k invocations
- Unlimited team members

**PlanetScale Pro** ($29/month):
- More storage
- More reads/writes
- Higher connection limits

---

## 📞 Support & Resources

- [Netlify Docs](https://docs.netlify.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [PlanetScale Docs](https://docs.planetscale.com)
- [Open an Issue](https://github.com/yourusername/store-location-finder/issues)

---

## ✅ Production Checklist

Before going live:

- [ ] Database set up and accessible
- [ ] `DATABASE_URL` added to Netlify environment
- [ ] Admin credentials set in environment
- [ ] Prisma schema pushed to database
- [ ] API endpoints tested
- [ ] CSV upload tested
- [ ] Data visibility toggle tested
- [ ] Delivery boy access tested
- [ ] Mobile responsiveness tested
- [ ] Custom domain configured (optional)
- [ ] Error monitoring set up (optional)

---

## 🎉 Your App is Live!

**Public URLs:**
- 🏠 Main App: `https://your-site.netlify.app/`
- 👨‍💼 Admin: `https://your-site.netlify.app/#/admin`
- 📱 Delivery: `https://your-site.netlify.app/`

**Admin Credentials:**
- Username: `Harshil`
- Password: `Harshil@2003`

**API Endpoints:**
- Stores: `/.netlify/functions/stores`
- Upload CSV: `/.netlify/functions/upload-csv`
- Settings: `/.netlify/functions/settings`

---

Happy delivering! 🛵📦
