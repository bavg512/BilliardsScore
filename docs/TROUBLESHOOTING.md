# Troubleshooting Guide

Common issues and solutions for the Billiards Score Tracker app.

## Table of Contents
1. [Installation Issues](#installation-issues)
2. [Firebase Issues](#firebase-issues)
3. [Authentication Issues](#authentication-issues)
4. [Development Server Issues](#development-server-issues)
5. [Build and Runtime Errors](#build-and-runtime-errors)
6. [Device/Simulator Issues](#devicesimulator-issues)
7. [Network Issues](#network-issues)

---

## Installation Issues

### Issue: `npm install` fails with errors

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Use legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Check Node.js version:**
   ```bash
   node --version  # Should be v18 or higher
   ```
   Update Node.js if needed: [https://nodejs.org/](https://nodejs.org/)

4. **Check npm version:**
   ```bash
   npm --version  # Should be v8 or higher
   npm install -g npm@latest
   ```

---

### Issue: "Permission denied" errors during installation

**Symptoms:**
```
EACCES: permission denied
```

**Solutions:**

**macOS/Linux:**
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

**Alternative (use nvm):**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js via nvm
nvm install 18
nvm use 18
```

---

### Issue: Module not found after installation

**Symptoms:**
```
Error: Cannot find module 'firebase'
```

**Solutions:**

1. **Verify installation:**
   ```bash
   npm list firebase
   ```

2. **Reinstall specific package:**
   ```bash
   npm install firebase@10.13.0
   ```

3. **Clean install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Firebase Issues

### Issue: "Firebase: Error (auth/api-key-not-valid)"

**Symptoms:**
- Can't log in or register
- Firebase operations fail immediately

**Solutions:**

1. **Check API key in `app.json`:**
   ```json
   "extra": {
     "FIREBASE_API_KEY": "AIzaSy..." // Should start with AIzaSy
   }
   ```

2. **Verify Firebase project settings:**
   - Go to Firebase Console → Project Settings
   - Compare API key with `app.json`

3. **Restart development server:**
   ```bash
   npm start --reset-cache
   ```

---

### Issue: "Missing or insufficient permissions"

**Symptoms:**
```
FirebaseError: Missing or insufficient permissions.
```

**Solutions:**

1. **Check Firestore security rules:**
   - Go to Firebase Console → Firestore Database → Rules
   - Verify rules allow authenticated users

2. **Update security rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null &&
                              request.auth.uid == userId;
       }
     }
   }
   ```

3. **Publish rules** and wait 1-2 minutes for propagation

---

### Issue: "Network request failed"

**Symptoms:**
```
Firebase: Error (auth/network-request-failed)
```

**Solutions:**

1. **Check internet connection**

2. **Check Firebase project status:**
   - Visit [Firebase Status Dashboard](https://status.firebase.google.com/)

3. **Verify firebaseConfig:**
   ```javascript
   // In src/services/firebase.js
   console.log('Firebase config:', firebaseConfig);
   ```

4. **Check for proxy/firewall:**
   - Disable VPN temporarily
   - Check corporate firewall settings

---

### Issue: User created but not in Firestore

**Symptoms:**
- User appears in Authentication
- User document missing from Firestore

**Solutions:**

1. **Check Firestore rules** (may be blocking writes)

2. **Verify user creation code:**
   ```javascript
   // In src/services/authService.js
   await setDoc(doc(db, 'users', user.uid), {
     email: user.email,
     displayName: displayName,
     createdAt: serverTimestamp(),
   });
   ```

3. **Check console for errors:**
   - Look for Firestore write errors
   - Check network tab in debugger

---

## Authentication Issues

### Issue: "Email already in use"

**Symptoms:**
```
Firebase: Error (auth/email-already-in-use)
```

**Solutions:**

1. **Use a different email** for testing

2. **Delete existing user:**
   - Firebase Console → Authentication → Users
   - Find user and click delete

3. **Implement proper error handling:**
   - Check if error is expected
   - Show user-friendly message

---

### Issue: "Weak password"

**Symptoms:**
```
Firebase: Error (auth/weak-password)
```

**Solutions:**

1. **Use stronger password:**
   - Minimum 6 characters required by Firebase
   - Recommend 8+ characters with mix of types

2. **Update validation:**
   ```javascript
   if (password.length < 6) {
     setError('Password must be at least 6 characters');
     return false;
   }
   ```

---

### Issue: User stays logged out after app restart

**Symptoms:**
- User must log in every time
- Session not persisting

**Solutions:**

1. **Verify AsyncStorage persistence:**
   ```javascript
   // In src/services/firebase.js
   import { getReactNativePersistence } from 'firebase/auth';
   import AsyncStorage from '@react-native-async-storage/async-storage';

   initializeAuth(app, {
     persistence: getReactNativePersistence(AsyncStorage),
   });
   ```

2. **Check AsyncStorage permissions:**
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

3. **Clear AsyncStorage and test again:**
   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   AsyncStorage.clear();
   ```

---

## Development Server Issues

### Issue: "Port 19000 already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::19000
```

**Solutions:**

1. **Kill process on port:**
   ```bash
   # macOS/Linux
   lsof -ti:19000 | xargs kill -9

   # Windows
   netstat -ano | findstr :19000
   taskkill /PID <PID> /F
   ```

2. **Use different port:**
   ```bash
   npm start -- --port 19001
   ```

---

### Issue: Metro bundler stuck at "Loading..."

**Symptoms:**
- Bundle never finishes loading
- Progress bar stuck

**Solutions:**

1. **Clear Metro cache:**
   ```bash
   npm start --reset-cache
   ```

2. **Clear watchman cache (macOS):**
   ```bash
   watchman watch-del-all
   ```

3. **Restart your computer** (last resort)

---

### Issue: Changes not reflecting in app

**Symptoms:**
- Save files but app doesn't update
- Old code still running

**Solutions:**

1. **Enable Fast Refresh:**
   - Shake device → Enable Fast Refresh

2. **Manual reload:**
   - Press `r` in terminal
   - Or shake device → Reload

3. **Clear cache and restart:**
   ```bash
   npm start --reset-cache
   ```

---

## Build and Runtime Errors

### Issue: "Cannot find module 'react-native-gesture-handler'"

**Symptoms:**
```
Error: Cannot find module 'react-native-gesture-handler'
```

**Solutions:**

1. **Import at top of App.js:**
   ```javascript
   import 'react-native-gesture-handler';
   // ... other imports
   ```

2. **Verify installation:**
   ```bash
   npm install react-native-gesture-handler
   ```

3. **Restart development server:**
   ```bash
   npm start --reset-cache
   ```

---

### Issue: "Invariant Violation: requireNativeComponent"

**Symptoms:**
```
Invariant Violation: requireNativeComponent: "RNSScreen" was not found
```

**Solutions:**

1. **Install missing dependencies:**
   ```bash
   npx expo install react-native-screens react-native-safe-area-context
   ```

2. **Clear cache and rebuild:**
   ```bash
   npm start --reset-cache
   ```

---

### Issue: "undefined is not an object (evaluating 'auth.currentUser')"

**Symptoms:**
- App crashes on startup
- Firebase auth errors

**Solutions:**

1. **Check Firebase initialization:**
   ```javascript
   // Ensure firebase.js is imported before use
   import { auth } from './src/services/firebase';
   ```

2. **Add null checks:**
   ```javascript
   const user = auth?.currentUser;
   if (user) {
     // Use user
   }
   ```

3. **Wait for auth to initialize:**
   ```javascript
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       setUser(user);
       setLoading(false);
     });
     return unsubscribe;
   }, []);
   ```

---

## Device/Simulator Issues

### Issue: Can't connect to Expo Go on device

**Symptoms:**
- QR code scanned but app won't open
- "Unable to connect to server"

**Solutions:**

1. **Ensure same network:**
   - Computer and phone on same WiFi
   - Disable VPN on both devices

2. **Use tunnel connection:**
   ```bash
   npm start -- --tunnel
   ```

3. **Check firewall:**
   - Allow Expo ports (19000-19001)
   - Disable firewall temporarily to test

---

### Issue: iOS Simulator won't launch

**Symptoms:**
```
Error: No simulator available
```

**Solutions:**

1. **Install Xcode Command Line Tools:**
   ```bash
   xcode-select --install
   ```

2. **Open Xcode and accept license:**
   ```bash
   sudo xcodebuild -license accept
   ```

3. **Create simulator:**
   - Open Xcode
   - Window → Devices and Simulators
   - Click + to add simulator

---

### Issue: Android emulator not detected

**Symptoms:**
```
Error: No Android devices connected
```

**Solutions:**

1. **Start emulator from Android Studio:**
   - Tools → AVD Manager
   - Click ▶️ on emulator

2. **Check adb connection:**
   ```bash
   adb devices
   ```

3. **Restart adb server:**
   ```bash
   adb kill-server
   adb start-server
   ```

---

## Network Issues

### Issue: "Network request failed" for all operations

**Symptoms:**
- All Firebase operations fail
- Can't load data

**Solutions:**

1. **Check internet connection:**
   ```bash
   ping google.com
   ```

2. **Try different network:**
   - Switch WiFi networks
   - Use mobile hotspot
   - Disable VPN

3. **Check DNS:**
   ```bash
   # Flush DNS cache
   # macOS
   sudo dscacheutil -flushcache

   # Windows
   ipconfig /flushdns
   ```

---

### Issue: Slow loading times

**Symptoms:**
- App takes long to start
- Screens load slowly

**Solutions:**

1. **Check network speed:**
   - Use speed test tool
   - Try different network

2. **Optimize Firebase queries:**
   ```javascript
   // Add indexes in Firestore
   // Limit query results
   const q = query(collection(db, 'sessions'), limit(20));
   ```

3. **Enable persistence:**
   ```javascript
   // Already enabled in firebase.js
   persistence: getReactNativePersistence(AsyncStorage)
   ```

---

## Getting More Help

### Collect Debug Information

Before asking for help, collect:

1. **Error message:**
   - Full error stack trace
   - Screenshot if possible

2. **Environment:**
   ```bash
   node --version
   npm --version
   npx expo-env-info
   ```

3. **Steps to reproduce:**
   - What did you do?
   - What did you expect?
   - What actually happened?

### Where to Get Help

1. **Project Issues:**
   - GitHub Issues: [github.com/yourusername/BilliardsScore/issues](https://github.com)

2. **Expo Issues:**
   - Expo Forums: [forums.expo.dev](https://forums.expo.dev)
   - Expo Discord: [chat.expo.dev](https://chat.expo.dev)

3. **Firebase Issues:**
   - Firebase Support: [firebase.google.com/support](https://firebase.google.com/support)
   - Stack Overflow: Tag `firebase` + `react-native`

4. **React Native Issues:**
   - React Native Discussions: [github.com/facebook/react-native/discussions](https://github.com/facebook/react-native/discussions)
   - Stack Overflow: Tag `react-native`

---

## Still Having Issues?

If you've tried everything and still have problems:

1. **Create a fresh install:**
   ```bash
   # Backup your changes first!
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   npm start --reset-cache
   ```

2. **Test on different device/simulator**

3. **Check for known issues:**
   - [Expo Known Issues](https://docs.expo.dev/workflow/known-issues/)
   - [React Native Issues](https://github.com/facebook/react-native/issues)

4. **File an issue:**
   - Include debug information
   - List steps to reproduce
   - Mention what you've already tried

---

**Last Updated:** 2025-10-22
**Maintained By:** Development Team
