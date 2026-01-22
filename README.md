# 🛒 Store Location Finder - Netlify Ready

A complete, production-ready web application for delivery personnel to find and navigate to store locations. Admins can upload store data via CSV, and delivery boys can search and navigate using Google Maps.

**✅ Ready for Netlify deployment with serverless functions and MySQL database**

## ✨ Features

### For Admins
- 🔐 **Secure Admin Access** - Hidden `/admin` route with credentials
- 📤 **CSV Upload** - Drag & drop or browse to upload store locations
- 🔄 **Auto Duplicate Detection** - Automatically skips duplicate entries
- 📊 **Upload Summary** - View total rows, inserted, and skipped counts
- 📋 **Store Management** - View, filter, and delete stores
- 🏷️ **Filter by Beat/Salesman** - Organize and search stores easily
- 👁️ **Data Visibility Toggle** - Hide/show data to delivery boys with one click
- 💾 **Persistent Storage** - All data stored in MySQL database

### For Delivery Boys
- 🔎 **Smart Search** - Live autocomplete as you type store names
- 📍 **Recent Searches** - Quick access to previously searched stores
- 🗺️ **One-Tap Navigation** - Opens Google Maps directly
- 📱 **Mobile-First Design** - Perfect for on-the-go use
- 🎯 **Beat Filtering** - Filter stores by assigned beat/area
- 🌐 **Bilingual Support** - English and Marathi language

## 🚀 Quick Deploy - Netlify

**Fastest deployment option (5 minutes)**: See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for detailed guide.

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import to Netlify (netlify.com)
# 3. Add DATABASE_URL from PlanetScale
# 4. Deploy! 🚀
```

## 🚀 Live Demo

After deployment, your app will be live at Netlify!

## 📋 Prerequisites

- Node.js 18+ installed locally
- A GitHub account
- A Netlify account (FREE)
- A PlanetScale account (FREE tier) or any MySQL database

## 🛠️ Quick Start - Deploy in 10 Minutes

### 1. Set Up Free Database (PlanetScale)

```bash
# 1. Go to planetscale.com and sign up
# 2. Create new database: store_locator
# 3. Get connection string from Settings -> Connect -> Prisma
# 4. Copy the DATABASE_URL
```

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/store-location-finder.git
git push -u origin main
```

### 3. Deploy to Netlify

```bash
# 1. Go to netlify.com and sign up
# 2. Import your GitHub repository
# 3. Build command: npm install && npx prisma generate
# 4. Add Environment Variables:
#    DATABASE_URL = (your PlanetScale URL)
#    ADMIN_USERNAME = Harshil
#    ADMIN_PASSWORD = Harshil@2003
# 5. Click Deploy
```

### 4. Initialize Database

```bash
npm install
npx prisma db push
```

**That's it! Your app is live!** 🎉

## 📄 CSV Format

### Required Headers
```csv
shop,latitude,longitude,salesman,beat
```

### Sample CSV
```csv
shop,latitude,longitude,salesman,beat
Rajasthan General Store,28.6139,77.2090,Rahul Sharma,North Zone
Mahalaxmi Traders,28.6128,77.2294,Amit Verma,North Zone
Krishna Provision Store,28.6328,77.2197,Rahul Sharma,Central Zone
```

## 🔐 Admin Access

### URLs
- **Main App**: `https://your-app.vercel.app/`
- **Admin Panel**: `https://your-app.vercel.app/#/admin` (hidden)

### Credentials
- **Username**: `Harshil`
- **Password**: `Harshil@2003`

### Admin Features
1. Upload CSV files
2. View all stores with pagination
3. Filter by beat/salesman
4. Delete individual stores
5. Clear all stores
6. Toggle data visibility (hide/show from delivery boys)

## 📱 Delivery Boy Access

### URL
- **Delivery Dashboard**: `https://your-app.vercel.app/`

### Features
1. Search stores by name with autocomplete
2. Filter by beat/salesman
3. View recent searches
4. One-tap Google Maps navigation
5. Mobile-optimized interface

## 📁 Project Structure

```
store-location-finder/
├── index.html              # Main frontend application
├── netlify/
│   └── functions/         # Netlify Serverless Functions
│       ├── stores.js      # Store CRUD operations
│       ├── upload-csv.js  # CSV upload handler
│       └── settings.js    # Settings management
├── prisma/
│   └── schema.prisma      # Database schema
├── sample-stores.csv      # Sample data for testing
├── package.json           # Dependencies
├── netlify.toml           # Netlify configuration
├── .env.example           # Environment template
├── NETLIFY_DEPLOYMENT.md  # Netlify deployment guide
└── README.md              # This file
```

## 🗄️ Database Schema

### Stores Table
```sql
CREATE TABLE stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  shop VARCHAR(255),
  store_name VARCHAR(255),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  salesman VARCHAR(255),
  beat VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shop (shop, store_name),
  INDEX idx_coords (latitude, longitude),
  INDEX idx_salesman (salesman),
  INDEX idx_beat (beat)
);
```

### Settings Table
```sql
CREATE TABLE settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  key VARCHAR(255) UNIQUE,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔧 Local Development

### Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your DATABASE_URL
# DATABASE_URL="mysql://user:pass@host:3306/store_locator"

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Start development server
npm run dev
```

### Database Tools
```bash
# View database in GUI
npx prisma studio

# Reset database
npx prisma db push --force-reset
```

## 🌐 API Endpoints

### Stores
```bash
GET  /.netlify/functions/stores              # Get all stores
GET  /.netlify/functions/stores?q=query      # Search stores
GET  /.netlify/functions/stores?beat=X       # Filter by beat
GET  /.netlify/functions/stores?salesman=Y   # Filter by salesman
DELETE /.netlify/functions/stores?id=X       # Delete store
DELETE /.netlify/functions/stores?id=all     # Delete all stores
```

### CSV Upload
```bash
POST /.netlify/functions/upload-csv          # Upload CSV file
Body: { csvData: "..." }
```

### Settings
```bash
GET  /.netlify/functions/settings            # Get all settings
POST /.netlify/functions/settings            # Update setting
Body: { key: "dataVisibility", value: "visible" }
```

## 📊 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💰 Pricing

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| Vercel | Hobby | **FREE** | 100GB bandwidth, 6k minutes serverless |
| PlanetScale | Scaler Pro | **FREE** | 5GB storage, 1B reads/month |
| **Total** | - | **$0/month** | - |

## 🔒 Security

- ✅ Admin panel hidden from public URLs
- ✅ Secure admin authentication
- ✅ Database uses SSL connections
- ✅ No hardcoded secrets in code
- ✅ CORS properly configured
- ✅ Input validation on all endpoints

## 📈 Scaling

### Vercel Auto-Scales
- Automatic horizontal scaling
- CDN edge caching
- Global edge network

### PlanetScale Auto-Scales
- Serverless MySQL
- Automatic read replicas
- Connection pooling

## 🐛 Troubleshooting

### Issue: Deployment Fails
**Solution**: Verify `DATABASE_URL` is set in Vercel environment variables

### Issue: Data Not Persisting
**Solution**: 
1. Check API is responding: `curl /api/stores`
2. Verify database has tables: `npx prisma studio`
3. Check Vercel function logs

### Issue: Admin Panel Not Accessible
**Solution**: Access via `/#/admin` hash route

### See [DEPLOYMENT.md](DEPLOYMENT.md) for more troubleshooting

## 🔄 Updates & Maintenance

### Update the App
```bash
# Make changes
git add .
git commit -m "Update"
git push
# Vercel auto-deploys!
```

### Update Database
```bash
# Edit prisma/schema.prisma
npx prisma generate
npx prisma db push
git add .
git commit -m "Update schema"
git push
```

## 📞 Support

- 📖 [Deployment Guide](DEPLOYMENT.md)
- 📧 Open an issue on GitHub
- 📚 [Vercel Docs](https://vercel.com/docs)
- 📚 [Prisma Docs](https://www.prisma.io/docs)

## 🎯 Roadmap

- [ ] User authentication with JWT
- [ ] Real-time location tracking
- [ ] Offline PWA support
- [ ] Export stores to CSV
- [ ] Print delivery routes
- [ ] Analytics dashboard
- [ ] Push notifications

## 📝 License

MIT License - feel free to use this project!

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Made with ❤️ for Delivery Teams

**Production Ready** ✅ | **Zero Cost** 🆓 | **Mobile Optimized** 📱
