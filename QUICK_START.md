# ⚡ Quick Start Guide

Get the Store Location Finder app running in under 5 minutes!

## 🚀 Option 1: Try It Now (Fastest)

1. **Download the files**
   - Download `index.html`
   - Open it in your browser

That's it! 🎉

---

## 🌐 Option 2: Deploy to Vercel (Recommended)

### Step 1: Push to GitHub (2 minutes)
```bash
git clone <your-repo-url>
cd store-location-finder
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy to Vercel (1 minute)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your repository
4. Click "Deploy"

✅ Your app is now live!

---

## 📱 How to Use

### For Admins
1. **Login** → Click "Admin" button
2. **Upload CSV** → Use the sample CSV or upload your own
3. **Test** → Click "Load Sample Data" to see it in action

### For Delivery Boys
1. **Login** → Click "Delivery" button
2. **Search** → Type any store name
3. **Navigate** → Click the green navigation button

---

## 📄 Sample CSV Data

Use the included `sample-stores.csv` file or create your own:

```csv
shop,latitude,longitude,salesman,beat
My Store,28.6139,77.2090,John Doe,North Zone
```

---

## 🔧 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Page not loading | Check internet connection for CDN |
| CSV not uploading | Verify headers: `shop,latitude,longitude,salesman,beat` |
| Maps not opening | Ensure Google Maps is accessible |
| Data not saving | Enable localStorage in browser |

---

## 📚 Full Documentation

- **[README.md](README.md)** - Complete documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment guide
- **[LICENSE](LICENSE)** - MIT License

---

## 💡 Pro Tips

1. **Mobile-First**: Works great on phones!
2. **Offline Ready**: Data saves locally
3. **No API Keys**: Uses free Google Maps URLs
4. **Instant Search**: Results appear as you type

---

**Need Help?** Check the [README.md](README.md) or open an issue on GitHub.

Happy Delivering! 🛵📦
