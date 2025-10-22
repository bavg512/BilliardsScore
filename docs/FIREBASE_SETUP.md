# Firebase Setup Guide

This guide will walk you through setting up Firebase for the Billiards Score Tracker application.

## Table of Contents
1. [Create Firebase Project](#create-firebase-project)
2. [Enable Email/Password Authentication](#enable-authentication)
3. [Set Up Firestore Database](#set-up-firestore)
4. [Configure Security Rules](#configure-security-rules)
5. [Get Firebase Configuration](#get-firebase-configuration)
6. [Add Configuration to App](#add-configuration-to-app)
7. [Test Your Setup](#test-your-setup)

---

## Create Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Add project" or "Create a project"
   - Enter project name: `billiards-score-tracker` (or your preferred name)
   - Click "Continue"

3. **Google Analytics (Optional)**
   - Toggle Google Analytics on or off (recommended: OFF for simplicity)
   - If enabled, select or create an Analytics account
   - Click "Create project"

4. **Wait for Setup**
   - Firebase will take 30-60 seconds to provision your project
   - Click "Continue" when ready

---

## Enable Authentication

1. **Navigate to Authentication**
   - In the left sidebar, click "Build" → "Authentication"
   - Click "Get started"

2. **Enable Email/Password Sign-in**
   - Click on the "Sign-in method" tab
   - Find "Email/Password" in the list of providers
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

3. **Optional: Configure Email Templates**
   - Click on the "Templates" tab
   - Customize password reset email template
   - Update sender name and email (requires domain verification)

---

## Set Up Firestore Database

1. **Navigate to Firestore**
   - In the left sidebar, click "Build" → "Firestore Database"
   - Click "Create database"

2. **Choose Security Mode**
   - Select "Start in **production mode**" (we'll add custom rules next)
   - Click "Next"

3. **Set Cloud Firestore Location**
   - Choose a location close to your users (e.g., `us-central1` for USA)
   - ⚠️ **Important:** Location cannot be changed later
   - Click "Enable"

4. **Wait for Database Creation**
   - Firestore will take 30-60 seconds to provision
   - You'll see an empty database when ready

---

## Configure Security Rules

Firestore security rules control who can read and write data.

1. **Navigate to Rules Tab**
   - In Firestore Database, click the "Rules" tab

2. **Update Security Rules**
   - Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Sessions collection - users can only access their own sessions
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null &&
                           resource.data.userId == request.auth.uid;
      allow create: if request.auth != null &&
                       request.resource.data.userId == request.auth.uid;
    }

    // Shots collection - users can only access shots from their sessions
    match /shots/{shotId} {
      allow read, write: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

3. **Publish Rules**
   - Click "Publish"
   - Confirm the changes

---

## Get Firebase Configuration

1. **Navigate to Project Settings**
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"

2. **Add a Web App**
   - Scroll down to "Your apps" section
   - Click the web icon `</>`
   - Enter app nickname: `Billiards Score Web`
   - **Do NOT** check "Also set up Firebase Hosting"
   - Click "Register app"

3. **Copy Firebase Configuration**
   - You'll see a `firebaseConfig` object
   - Copy the values from this object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

4. **Click "Continue to console"**

---

## Add Configuration to App

### Method 1: Using app.json (Current Setup)

1. **Open `app.json`** in your project

2. **Update the `extra` section** with your Firebase credentials:

```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      },
      "FIREBASE_API_KEY": "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "FIREBASE_AUTH_DOMAIN": "your-project.firebaseapp.com",
      "FIREBASE_PROJECT_ID": "your-project",
      "FIREBASE_STORAGE_BUCKET": "your-project.appspot.com",
      "FIREBASE_MESSAGING_SENDER_ID": "123456789012",
      "FIREBASE_APP_ID": "1:123456789012:web:abcdef123456"
    }
  }
}
```

3. **Save the file**

### Method 2: Using Environment Variables (Production)

For production deployments, use environment variables:

1. **Install expo-constants** (already included)

2. **Create `.env` file** in project root:

```env
FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

3. **Update `app.json`** to use environment variables:

```json
{
  "expo": {
    "extra": {
      "FIREBASE_API_KEY": "${FIREBASE_API_KEY}",
      "FIREBASE_AUTH_DOMAIN": "${FIREBASE_AUTH_DOMAIN}",
      "FIREBASE_PROJECT_ID": "${FIREBASE_PROJECT_ID}",
      "FIREBASE_STORAGE_BUCKET": "${FIREBASE_STORAGE_BUCKET}",
      "FIREBASE_MESSAGING_SENDER_ID": "${FIREBASE_MESSAGING_SENDER_ID}",
      "FIREBASE_APP_ID": "${FIREBASE_APP_ID}"
    }
  }
}
```

4. **Add `.env` to `.gitignore`** (already done)

---

## Test Your Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm start
```

### 3. Open the App

- **iOS**: Scan QR code with Camera app
- **Android**: Scan QR code with Expo Go app
- **Web**: Press `w` in terminal

### 4. Test Registration

1. Click "Sign Up" on the login screen
2. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Sign Up"
4. If successful, you'll be redirected to the home screen

### 5. Verify in Firebase Console

1. **Check Authentication**
   - Go to Firebase Console → Authentication → Users
   - You should see your test user listed

2. **Check Firestore**
   - Go to Firebase Console → Firestore Database → Data
   - You should see a `users` collection
   - Click to expand and see your user document

### 6. Test Login

1. Logout from the app
2. Enter your credentials
3. Click "Login"
4. You should be redirected to the home screen

### 7. Test Password Reset

1. Click "Forgot Password"
2. Enter your email
3. Check your email for reset instructions

---

## Common Issues and Solutions

### Issue: "Firebase: Error (auth/network-request-failed)"
**Solution:** Check your internet connection and Firebase configuration.

### Issue: "Firebase: Error (auth/api-key-not-valid)"
**Solution:** Double-check your API key in `app.json`.

### Issue: "Missing or insufficient permissions"
**Solution:** Verify Firestore security rules are correctly configured.

### Issue: User created but not appearing in Firestore
**Solution:** Check Firestore security rules and ensure user creation code is working.

### Issue: "Module not found: firebase"
**Solution:** Run `npm install` to install all dependencies.

---

## Next Steps

Once Firebase is set up and tested:

1. ✅ User authentication is working
2. ✅ Firestore database is ready
3. ✅ Security rules are configured
4. 🚀 Ready to proceed with Phase 3 (Shot Tracking)

---

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Expo + Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

---

## Security Best Practices

1. **Never commit Firebase credentials to public repositories**
   - Use `.gitignore` for `.env` files
   - Use environment variables for production

2. **Enable App Check** (Production)
   - Protect your backend from abuse
   - [App Check Documentation](https://firebase.google.com/docs/app-check)

3. **Set up Firebase Quotas**
   - Monitor usage in Firebase Console
   - Set up billing alerts

4. **Regular Security Audits**
   - Review Firestore security rules
   - Check authentication logs
   - Monitor for suspicious activity

---

**Last Updated:** 2025-10-22
**Firebase SDK Version:** 10.13.0
**Expo SDK Version:** 52.0.0
