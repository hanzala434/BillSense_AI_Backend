# Vercel Deployment Guide for BillSense AI Backend

## ✅ Changes Made for Vercel Compatibility

1. **Converted to ES Modules** - Changed from CommonJS (`require`) to ES modules (`import/export`)
2. **Added vercel.json** - Configuration file for Vercel deployment
3. **Updated package.json** - Changed `"type": "commonjs"` to `"type": "module"`

## 🚀 Deployment Steps

### 1. Push to GitHub

Make sure all changes are committed and pushed:

```bash
git add .
git commit -m "Convert to ES modules for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Node.js project
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (or leave blank if backend is in root)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### 3. Add Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

- `MONGODB_URI` = your_mongodb_connection_string
- `JWT_SECRET` = your_jwt_secret_key
- `GEMINI_API_KEY` = your_google_gemini_api_key
- `NODE_ENV` = production

### 4. Redeploy

After adding environment variables, trigger a new deployment:
- Go to Deployments tab
- Click "Redeploy" on the latest deployment

## 📝 Important Notes

- Vercel runs each request as a serverless function
- Cold starts may occur (first request might be slower)
- MongoDB connection is established on each request
- Free tier has limitations on execution time (10 seconds)

## 🔗 API Endpoint

After deployment, your API will be available at:
```
https://your-project-name.vercel.app/api/...
```

Update your frontend `.env` file:
```
VITE_API_URL=https://your-project-name.vercel.app
```

## ✅ Testing

Test your deployed API:

```bash
# Health check
curl https://your-project-name.vercel.app/

# Login
curl -X POST https://your-project-name.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

### Error: ERR_REQUIRE_ESM
- ✅ Fixed by converting to ES modules

### Error: Cannot find module
- Make sure all imports have `.js` extension
- Example: `import User from './models/User.js'`

### MongoDB Connection Issues
- Verify `MONGODB_URI` is set in Vercel environment variables
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Function Timeout
- Vercel free tier: 10 second limit
- Upgrade to Pro for 60 seconds
- Or use Render/Railway for longer timeouts

## 🎉 Success!

Your backend should now be live on Vercel!
