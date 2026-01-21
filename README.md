# 🛒 Store Location Finder - Delivery App

A modern, responsive web application for delivery personnel to find and navigate to store locations. Admins can upload store data via CSV, and delivery boys can search and navigate to stores using Google Maps.

## 🚀 Live Demo

Deployed on Vercel: [Your App URL](https://your-app.vercel.app)

## ✨ Features

### For Admins
- 📤 **CSV Upload** - Drag & drop or browse to upload store locations
- 🔍 **Duplicate Detection** - Automatically skips duplicate entries
- 📊 **Upload Summary** - View total rows, inserted, and skipped counts
- 📋 **Store Management** - View, filter, and delete stores
- 🏷️ **Filter by Beat/Salesman** - Organize and search stores easily
- 📝 **Sample Data** - Load sample data for testing

### For Delivery Boys
- 🔎 **Smart Search** - Autocomplete as you type store names
- 📍 **Recent Searches** - Quick access to previously searched stores
- 🗺️ **One-Tap Navigation** - Opens Google Maps directly
- 📱 **Mobile-First Design** - Optimized for on-the-go use
- 🎯 **Beat Filtering** - Filter stores by assigned beat/area

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

## 🛠️ Installation

### Option 1: Deploy to Vercel (Recommended)

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/yourusername/store-location-finder.git
   cd store-location-finder
   ```

2. **Push to GitHub**

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Click "Deploy"

4. **Your app is live!** 🎉

### Option 2: Manual Deployment

1. **Download the files**
   - Download `index.html` and `vercel.json`

2. **Deploy to any static hosting**
   - Netlify
   - GitHub Pages
   - Cloudflare Pages
   - Any web server

### Option 3: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/store-location-finder.git
   cd store-location-finder
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Open http://localhost:8000**

## 📄 CSV Format

### Required Headers
```csv
shop,latitude,longitude,salesman,beat
```

### Sample CSV File
```csv
shop,latitude,longitude,salesman,beat
Rajasthan General Store,28.6139,77.2090,Rahul Sharma,North Zone
Mahalaxmi Traders,28.6128,77.2294,Amit Verma,North Zone
Krishna Provision Store,28.6328,77.2197,Rahul Sharma,Central Zone
New Delhi Mart,28.6234,77.2103,Priya Singh,South Zone
City Supermarket,28.6412,77.2389,Amit Verma,East Zone
Goyal Kirana Store,28.6089,77.2345,Priya Singh,South Zone
```

### Field Descriptions
- **shop**: Store/Shop name (required)
- **latitude**: Latitude coordinate (required, numeric)
- **longitude**: Longitude coordinate (required, numeric)
- **salesman**: Assigned salesman name
- **beat**: Beat/area assignment

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in your project root (for future backend integration):

```env
# App Configuration
APP_NAME=Store Location Finder
APP_ENV=production

# For future backend integration
DATABASE_URL=mysql://user:password@localhost:3306/store_locator
JWT_SECRET=your-secret-key-here
```

## 📱 Usage Guide

### Admin Workflow
1. **Login** - Click "Admin" role
2. **Upload CSV** - Drag & drop or click "Select File"
3. **Review Upload** - Check upload summary
4. **Manage Stores** - View, filter, or delete stores
5. **Logout** when done

### Delivery Boy Workflow
1. **Login** - Click "Delivery" role
2. **Search Store** - Type store name in search box
3. **Select Store** - Click from autocomplete or results
4. **Navigate** - Tap the navigation button to open Google Maps
5. **Filter** (Optional) - Filter by beat or salesman

## 🗂️ Project Structure

```
store-location-finder/
├── index.html          # Main application file
├── vercel.json         # Vercel configuration
├── README.md           # Documentation
├── .gitignore          # Git ignore rules
└── .env.example        # Environment variables template
```

## 🔐 Authentication

This is a demo application with simple role-based access:
- **Admin**: Can upload and manage stores
- **Delivery**: Can search and navigate to stores

For production, implement proper authentication with JWT tokens.

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Data Storage

**Current Implementation**: Uses browser `localStorage` for data persistence.

**Future Enhancements**:
- Backend API with Node.js + Express
- MySQL database with Prisma ORM
- Real-time data synchronization

## 🚀 Deployment Platforms

This app can be deployed to any static hosting service:

| Platform | Deploy Time | Custom Domain |
|----------|-------------|---------------|
| Vercel | ⚡ 30s | ✅ Free |
| Netlify | ⚡ 30s | ✅ Free |
| GitHub Pages | ⚡ 1min | ✅ Free |
| Cloudflare Pages | ⚡ 30s | ✅ Free |

## 🔄 Updates & Maintenance

### Updating the App
1. Make changes to `index.html`
2. Commit and push to GitHub
3. Vercel auto-deploys on push

### Clearing Data
- Users can clear their browser data to reset
- Admin can clear all stores via "Clear All" button

## 🐛 Troubleshooting

### CSV Not Uploading
- Ensure file format is `.csv`
- Check headers match: `shop,latitude,longitude,salesman,beat`
- Verify latitude/longitude are numeric values

### Stores Not Showing
- Check browser localStorage is enabled
- Try refreshing the page
- Clear cache and reload

### Maps Not Opening
- Ensure internet connection is active
- Check if Google Maps is accessible in your region
- Verify coordinates are valid

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@yourdomain.com

## 🎯 Roadmap

- [ ] User authentication with backend
- [ ] Real-time location tracking
- [ ] Offline PWA support
- [ ] Multi-language support
- [ ] Export stores to CSV
- [ ] Print delivery routes
- [ ] Analytics dashboard

---

Made with ❤️ for Delivery Teams
