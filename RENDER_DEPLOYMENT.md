# 🚀 Render Deployment Guide - Leave Management System

This guide will help you deploy the Leave Management System to Render.com.

## 📋 Prerequisites

1. **Render Account**: Create account at [render.com](https://render.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Email Credentials**: Gmail with App Password for notifications

## 🔧 Deployment Steps

### Step 1: Backend Deployment (Web Service)

1. **Connect GitHub Repository**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the Leave-Management repository

2. **Service Configuration**
   ```
   Name: leave-management-backend
   Environment: Node
   Region: Oregon (US West) or closest to you
   Branch: main (or your main branch)
   Root Directory: Leave-Management
   Build Command: npm install
   Start Command: npm run backend
   ```

3. **Environment Variables** (Add these in Render dashboard)
   ```
   NODE_ENV=production
   PORT=5001
   JWT_SECRET=your-super-secure-jwt-secret-min-32-characters
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   CORS_ORIGIN=https://your-frontend-app-name.onrender.com
   ```

   **⚠️ Important Notes:**
   - Replace `your-frontend-app-name` with your actual frontend URL
   - Use a strong JWT_SECRET (at least 32 characters)
   - Use your Gmail App Password (not regular password)

### Step 2: Frontend Deployment (Static Site)

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect same GitHub repository

2. **Site Configuration**
   ```
   Name: leave-management-frontend
   Environment: Static Site
   Branch: main
   Root Directory: Leave-Management/client
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Environment Variables** (Add these)
   ```
   REACT_APP_API_URL=https://your-backend-app-name.onrender.com
   ```

   **⚠️ Replace `your-backend-app-name` with actual backend URL**

### Step 3: Update CORS Configuration

After both services are deployed, update the backend environment variables:

1. **Go to your backend service in Render**
2. **Update Environment Variables**:
   ```
   CORS_ORIGIN=https://your-actual-frontend-url.onrender.com
   ```
3. **Redeploy** the backend service

## 🔐 Security Configuration

### JWT Secret Generation
Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Email Setup
1. **Enable 2-Factor Authentication** on Gmail
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
   - Use this 16-character password as EMAIL_PASS

## 📁 File Storage Considerations

**Important**: Render's free tier uses ephemeral storage, meaning files are lost on restart.

### Option 1: Accept Data Loss (Development)
- Current setup uses local JSON files
- Data will reset on every deployment
- Good for testing/demo purposes

### Option 2: Add Database (Production)
Consider adding a database for persistent storage:
- **PostgreSQL** (free tier available on Render)
- **MongoDB Atlas** (free tier available)

## 🌐 Custom Domain (Optional)

1. **Add Custom Domain** in Render dashboard
2. **Update Environment Variables** to use your domain
3. **Configure DNS** with your domain provider

## 📝 Environment Variables Summary

### Backend (.env)
```env
NODE_ENV=production
PORT=5001
JWT_SECRET=your-generated-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## 🔍 Testing Deployment

1. **Check Backend**: Visit `https://your-backend-url.onrender.com/api/health`
2. **Check Frontend**: Visit your frontend URL
3. **Test Features**:
   - User registration
   - Login/logout
   - Leave applications
   - Email notifications
   - Real-time notifications

## 🚨 Common Issues & Solutions

### 1. CORS Errors
- Ensure CORS_ORIGIN matches your frontend URL exactly
- Include https:// in the URL

### 2. Email Not Working
- Verify Gmail App Password (not regular password)
- Check email credentials in environment variables

### 3. Build Failures
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json

### 4. 404 Errors on Refresh
- Add `_redirects` file in client/public:
  ```
  /*    /index.html   200
  ```

## 📱 Post-Deployment Steps

1. **Test all functionality**
2. **Set up monitoring** (Render provides basic monitoring)
3. **Configure alerts** for service downtime
4. **Document your URLs** for team access

## 🔧 Maintenance

### Updating the Application
1. **Push changes** to GitHub
2. **Render automatically redeploys** (if auto-deploy is enabled)
3. **Monitor logs** for any issues

### Scaling (Paid Plans)
- Upgrade to paid plans for:
  - Persistent storage
  - Better performance
  - Custom domains
  - SSL certificates

---

**🎉 Your Leave Management System should now be live on Render!**

**Frontend URL**: `https://your-frontend-name.onrender.com`
**Backend URL**: `https://your-backend-name.onrender.com`

Need help? Check the [Render Documentation](https://render.com/docs) or create an issue in your repository. 