# Development Environment Setup

Complete guide to set up your development environment for the Billiards Score Tracker app.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Project Setup](#project-setup)
4. [Running the App](#running-the-app)
5. [Development Tools](#development-tools)
6. [Code Quality](#code-quality)
7. [Debugging](#debugging)

---

## Prerequisites

### Required Software

#### 1. Node.js and npm
- **Version Required:** Node.js v18 or higher
- **Download:** [https://nodejs.org/](https://nodejs.org/)
- **Verify Installation:**
  ```bash
  node --version  # Should show v18.x.x or higher
  npm --version   # Should show v8.x.x or higher
  ```

#### 2. Git
- **Download:** [https://git-scm.com/](https://git-scm.com/)
- **Verify Installation:**
  ```bash
  git --version  # Should show version 2.x.x or higher
  ```

#### 3. Expo Go App (Mobile Testing)
- **iOS:** [Download from App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android:** [Download from Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Optional but Recommended

#### 1. Visual Studio Code
- **Download:** [https://code.visualstudio.com/](https://code.visualstudio.com/)
- **Recommended Extensions:**
  - ESLint
  - Prettier - Code formatter
  - React Native Tools
  - ES7+ React/Redux/React-Native snippets
  - GitLens

#### 2. iOS Simulator (macOS only)
- **Xcode:** [Download from Mac App Store](https://apps.apple.com/app/xcode/id497799835)
- Requires macOS 12 or later
- After installation, run: `xcode-select --install`

#### 3. Android Studio (Optional)
- **Download:** [https://developer.android.com/studio](https://developer.android.com/studio)
- For running Android emulator locally

---

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/BilliardsScore.git

# Navigate to project directory
cd BilliardsScore
```

### 2. Install Dependencies

```bash
# Install all npm packages
npm install
```

This will install:
- React Native and Expo
- Firebase SDK
- React Navigation
- React Native Paper
- All development dependencies

**Expected output:**
```
added 1234 packages in 45s
```

### 3. Verify Installation

```bash
# Check for any vulnerabilities
npm audit

# List installed packages
npm list --depth=0
```

---

## Project Setup

### 1. Configure Firebase

Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md) to:
1. Create a Firebase project
2. Enable authentication
3. Set up Firestore
4. Add credentials to `app.json`

### 2. Environment Configuration

The app uses `app.json` for configuration. Update the Firebase credentials:

```json
{
  "expo": {
    "extra": {
      "FIREBASE_API_KEY": "your-api-key-here",
      "FIREBASE_AUTH_DOMAIN": "your-project.firebaseapp.com",
      "FIREBASE_PROJECT_ID": "your-project-id",
      "FIREBASE_STORAGE_BUCKET": "your-project.appspot.com",
      "FIREBASE_MESSAGING_SENDER_ID": "your-sender-id",
      "FIREBASE_APP_ID": "your-app-id"
    }
  }
}
```

### 3. Verify Project Structure

Your project should look like this:

```
BilliardsScore/
├── assets/              # Images, fonts, icons
├── docs/                # Documentation
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation setup
│   ├── screens/         # App screens
│   ├── services/        # Firebase and API services
│   └── utils/           # Helper functions
├── App.js               # App entry point
├── package.json         # Dependencies
├── app.json             # Expo configuration
└── README.md            # Project documentation
```

---

## Running the App

### Start Development Server

```bash
npm start
```

This will:
1. Start the Expo development server
2. Open Expo DevTools in your browser
3. Display a QR code in the terminal

### Run on Different Platforms

#### Mobile Device (Recommended for testing)

**iOS:**
1. Open Camera app
2. Point at QR code
3. Tap the notification to open in Expo Go

**Android:**
1. Open Expo Go app
2. Tap "Scan QR Code"
3. Point at QR code

#### iOS Simulator (macOS only)

```bash
npm run ios
```

This will:
1. Build the app
2. Launch iOS Simulator
3. Install and run the app

#### Android Emulator

```bash
npm run android
```

Requirements:
- Android Studio installed
- Android emulator configured and running

#### Web Browser

```bash
npm run web
```

**Note:** Some features may not work on web (camera, native gestures, etc.)

---

## Development Tools

### Hot Reload

Expo supports hot reloading by default:
- Save any file to see changes instantly
- Press `r` in terminal to reload manually
- Shake device to open developer menu

### Developer Menu

**On Physical Device:**
- iOS: Shake device
- Android: Shake device or press hardware menu button

**In Simulator/Emulator:**
- iOS: Cmd + D (macOS) or Ctrl + D (Windows/Linux)
- Android: Cmd + M (macOS) or Ctrl + M (Windows/Linux)

**Developer Menu Options:**
- Reload
- Debug Remote JS
- Enable Fast Refresh
- Show Performance Monitor
- Toggle Inspector

### Remote Debugging

1. Open Developer Menu
2. Select "Debug Remote JS"
3. Opens Chrome DevTools
4. Use Console, Network, Sources tabs for debugging

### React Native Debugger (Advanced)

**Download:** [https://github.com/jhen0409/react-native-debugger](https://github.com/jhen0409/react-native-debugger)

Features:
- Redux DevTools integration
- React DevTools integration
- Network inspection
- AsyncStorage inspection

---

## Code Quality

### Linting

Run ESLint to check code quality:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Code Formatting

Format code with Prettier:

```bash
# Format all files
npm run format
```

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Pre-commit Hooks (Optional)

Install Husky for automatic linting:

```bash
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

---

## Debugging

### Common Console Commands

```javascript
// Basic logging
console.log('Debug message');
console.error('Error message');
console.warn('Warning message');

// Object inspection
console.log('User data:', JSON.stringify(user, null, 2));

// Timing operations
console.time('operation');
// ... code ...
console.timeEnd('operation');
```

### React Native Debugger Tips

1. **Component Inspection**
   - Select components in React DevTools
   - View props and state
   - Trace component hierarchy

2. **Network Monitoring**
   - View all API requests
   - Check request/response data
   - Monitor Firebase calls

3. **Performance Profiling**
   - Use Performance Monitor from dev menu
   - Check frame rate (should be 60 FPS)
   - Monitor memory usage

### Firebase Debugging

Enable Firebase debug logging:

```javascript
// In src/services/firebase.js (development only)
import { enableLogging } from 'firebase/database';
enableLogging(true);
```

### Common Issues

**Metro Bundler Cache Issues:**
```bash
# Clear cache and restart
npm start --reset-cache
```

**Port Already in Use:**
```bash
# Kill process on port 19000
npx kill-port 19000

# Or start on different port
npm start -- --port 19001
```

**Module Not Found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/new-feature-name
```

### 2. Make Changes

- Edit code in `src/` directory
- Test on device/simulator
- Check for errors in console

### 3. Test Your Changes

- Test on iOS and Android
- Check different screen sizes
- Test edge cases

### 4. Lint and Format

```bash
npm run lint:fix
npm run format
```

### 5. Commit Changes

```bash
git add .
git commit -m "Add new feature description"
```

### 6. Push and Create PR

```bash
git push origin feature/new-feature-name
```

---

## Useful Commands Reference

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Clear cache and restart
npm start --reset-cache

# Install a new package
npm install package-name

# Install a dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated
```

---

## Editor Configuration

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### VS Code Extensions

Install these extensions:
- **ESLint** - Microsoft
- **Prettier** - Prettier
- **React Native Tools** - Microsoft
- **ES7 React/Redux Snippets** - dsznajder
- **Auto Rename Tag** - Jun Han
- **GitLens** - GitKraken
- **Path Intellisense** - Christian Kohler

---

## Performance Tips

1. **Use Fast Refresh**
   - Enabled by default in Expo
   - Preserves component state during reloads

2. **Optimize Images**
   - Use appropriate image sizes
   - Consider using WebP format

3. **Minimize Re-renders**
   - Use React.memo for components
   - Use useCallback and useMemo hooks

4. **Lazy Load Screens**
   - Implement code splitting
   - Load screens on demand

---

## Next Steps

Once your development environment is set up:

1. ✅ Run the app on your device
2. ✅ Test user registration and login
3. ✅ Explore the code structure
4. 📚 Read the [Firebase Setup Guide](./FIREBASE_SETUP.md)
5. 📚 Review the [Troubleshooting Guide](./TROUBLESHOOTING.md)
6. 🚀 Start building features!

---

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnavigation.org/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase for React Native](https://rnfirebase.io/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

---

**Last Updated:** 2025-10-22
**Expo SDK Version:** 52.0.0
**React Native Version:** 0.76.5
