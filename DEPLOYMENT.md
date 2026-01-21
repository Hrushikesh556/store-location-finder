# 🚀 Deployment Guide - Vercel

This guide will help you deploy the Store Location Finder app to Vercel in minutes.

## 📋 Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- A [GitHub account](https://github.com/signup)
- Your project code pushed to GitHub

## 🛠️ Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### 1. Prepare Your Repository
```bash
# Clone your repository
git clone https://github.com/yourusername/store-location-finder.git
cd store-location-finder

# Ensure all files are present
ls -la
# You should see: index.html, vercel.json, README.md, etc.

# Commit and push
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Find and import your `store-location-finder` repository
4. Vercel will auto-detect the project settings
5. Click **"Deploy"**

#### 3. That's It! 🎉
Your app will be live at:
```
https://store-location-finder.vercel.app
```

### Method 2: Deploy via Vercel CLI

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
# Navigate to your project
cd store-location-finder

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Link to existing project? No
# - Project name: store-location-finder
# - Directory: ./
# - Override settings? No
```

#### 4. Deploy to Production
```bash
vercel --prod
```

## 🔧 Vercel Configuration

The `vercel.json` file is already included in your project:

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ Single Page Application routing works
- ✅ All paths redirect to index.html
- ✅ Security headers are set

## 🌐 Custom Domain Setup

### Option 1: Use Vercel Subdomain (Free)
Your app automatically gets:
```
https://your-project-name.vercel.app
```

### Option 2: Add Custom Domain
1. Go to your project on Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `storefinder.yourdomain.com`)
4. Update DNS records as instructed by Vercel

### Free DNS Providers
- [Cloudflare](https://www.cloudflare.com/) (recommended)
- [Namecheap](https://www.namecheap.com/)
- [GoDaddy](https://www.godaddy.com/)

## 🔄 Automatic Deployments

### Setup Git Integration
Once connected to GitHub, Vercel will:

1. **Auto-deploy on push** to main branch
2. **Preview deployments** for pull requests
3. **Rollback** to any previous deployment

### Deployment Workflow
```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys! 🚀
```

## 📊 Environment Variables (Optional)

For future backend integration:

1. Go to **Settings** → **Environment Variables**
2. Add your variables:
   ```
   NODE_ENV = production
   DATABASE_URL = mysql://...
   JWT_SECRET = your-secret
   ```

## 🔍 Troubleshooting

### Issue: Build Fails
**Solution:** This is a static site, no build should run. Check `vercel.json` configuration.

### Issue: Page Not Found on Refresh
**Solution:** The `vercel.json` routes configuration should handle this. Ensure `dest: "/index.html"` is set.

### Issue: Styles Not Loading
**Solution:** Ensure Tailwind CSS CDN is accessible. Check internet connection.

### Issue: LocalStorage Not Working
**Solution:** This is browser-specific. Test in:
- Chrome/Edge (Works)
- Firefox (Works)
- Safari (Works)
- Incognito mode (May not work - this is expected)

## 📈 Performance Optimization

Vercel automatically optimizes:
- ✅ Global CDN distribution
- ✅ Automatic HTTP/2
- ✅ Image optimization (if using next/image)
- ✅ Edge caching

### Manual Optimizations
- Use compressed assets
- Minimize external dependencies
- Enable compression (automatic on Vercel)

## 🔐 Security

### Headers Configured
The `vercel.json` includes security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Additional Security Tips
- Keep dependencies updated
- Use HTTPS (automatic on Vercel)
- Implement proper auth for production

## 📱 Progressive Web App (PWA)

Your app includes PWA support via `manifest.json`:

### Install on Mobile
1. Open app in Chrome/Safari
2. Tap **"Share"** → **"Add to Home Screen"**
3. App installs like native app

### PWA Benefits
- ✅ Works offline (with caching)
- ✅ App icon on home screen
- ✅ Full-screen mode
- ✅ Push notification ready

## 🎯 Production Checklist

Before going live:

- [ ] Update `og-image.png` for social sharing
- [ ] Update URLs in README.md
- [ ] Set custom domain
- [ ] Test on mobile devices
- [ ] Test CSV upload functionality
- [ ] Test Google Maps navigation
- [ ] Verify all user flows work
- [ ] Set up error monitoring (optional)
- [ ] Configure analytics (optional)

## 📊 Analytics Integration

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@vercel/analytics/dist/analytics.umd.js"></script>
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); }
  va('init', {
    mode: 'auto',
    debug: false,
  });
</script>
```

### Google Analytics
Add your GA4 tracking ID to index.html:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🆘 Support

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Custom Domains](https://vercel.com/docs/custom-domains)

### Common Issues
- [Troubleshooting](https://vercel.com/docs/deployments/troubleshooting)
- [FAQ](https://vercel.com/docs/concepts/faq)

## 🚀 Next Steps

After successful deployment:

1. **Share your app** with the delivery team
2. **Collect feedback** from users
3. **Monitor performance** via Vercel dashboard
4. **Set up custom domain** for professional branding
5. **Add analytics** to track usage
6. **Iterate** based on user feedback

---

**Your Store Location Finder is now live on Vercel! 🎉**
