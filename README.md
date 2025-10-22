# Billiards Score Tracker

A comprehensive mobile application for tracking solo billiards practice sessions. Track shots, analyze performance, and improve your game.

## Features

- **Shot-by-Shot Tracking**: Log every shot as Make, Miss, Foul, or Defense
- **Multi-Game Support**: 8-ball, 9-ball, 10-ball, straight pool, and more
- **Player Turn Management**: Automatically track both sides of solo practice
- **Performance Analytics**: Visualize your improvement over time
- **Session History**: Review past practice sessions
- **Offline Support**: Practice tracking works without internet connection

## Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation
- **UI Components**: React Native Paper
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: React Context API + Hooks
- **Icons**: React Native Vector Icons

## Quick Start

### 📚 Complete Setup Guides

For detailed setup instructions, see our comprehensive documentation:

- **[Development Environment Setup](./docs/DEVELOPMENT_SETUP.md)** - Install prerequisites, clone repo, run the app
- **[Firebase Configuration](./docs/FIREBASE_SETUP.md)** - Set up authentication and database (required)
- **[Troubleshooting Guide](./docs/TROUBLESHOOTING.md)** - Solutions to common issues

### ⚡ Quick Installation

If you're experienced with React Native and Expo:

1. **Clone and install**
   ```bash
   git clone https://github.com/yourusername/BilliardsScore.git
   cd BilliardsScore
   npm install
   ```

2. **Configure Firebase**
   - Follow [Firebase Setup Guide](./docs/FIREBASE_SETUP.md)
   - Update `app.json` with your Firebase credentials

3. **Run the app**
   ```bash
   npm start
   ```

4. **Open on device**
   - Scan QR code with Expo Go app (iOS/Android)

## Project Structure

```
BilliardsScore/
├── assets/              # Images, fonts, and other static assets
├── docs/                # Documentation files
│   ├── DEVELOPMENT_SETUP.md
│   ├── FIREBASE_SETUP.md
│   └── TROUBLESHOOTING.md
├── src/
│   ├── components/      # Reusable UI components (Button, Input)
│   ├── screens/         # Full-screen views (Login, Register, Home)
│   ├── navigation/      # Navigation configuration (Auth, Main, Root)
│   ├── services/        # Firebase and external services
│   ├── context/         # React Context providers (AuthContext)
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── constants/       # App-wide constants
├── App.js               # Application entry point
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── PROJECT_ROADMAP.md   # Development roadmap
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Open on Android emulator/device
- `npm run ios` - Open on iOS simulator/device
- `npm run web` - Open in web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code
   - Test on device
   - Run linter

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

4. **Create a pull request**

## Firebase Setup

**📖 See [Complete Firebase Setup Guide](./docs/FIREBASE_SETUP.md)** for detailed instructions.

**Quick steps:**
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Create Firestore database with security rules
4. Add Firebase configuration to `app.json`

**Configuration:**

Update the `extra` section in `app.json` with your Firebase credentials:

```json
{
  "expo": {
    "extra": {
      "FIREBASE_API_KEY": "your-api-key",
      "FIREBASE_AUTH_DOMAIN": "your-project.firebaseapp.com",
      "FIREBASE_PROJECT_ID": "your-project-id",
      "FIREBASE_STORAGE_BUCKET": "your-project.appspot.com",
      "FIREBASE_MESSAGING_SENDER_ID": "your-sender-id",
      "FIREBASE_APP_ID": "your-app-id"
    }
  }
}
```

## Roadmap

See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for the complete development plan.

### ✅ Phase 1: Project Foundation (Complete)
- [x] Project initialization with React Native + Expo
- [x] Folder structure and organization
- [x] Core dependencies and configuration
- [x] ESLint and Prettier setup

### ✅ Phase 2: User Authentication (Complete)
- [x] Firebase integration with AsyncStorage persistence
- [x] Login/Register/Forgot Password screens
- [x] AuthContext for global state management
- [x] Protected route navigation
- [x] Session persistence

### 🚀 Next: Phase 3 - Core Shot Tracking
- [ ] Game type selection screen
- [ ] Shot tracking interface (Make, Miss, Foul, Defense)
- [ ] Player turn management
- [ ] Real-time statistics display
- [ ] Shot history timeline

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## Code Style

This project uses ESLint and Prettier for code formatting:

- Run `npm run lint` to check for issues
- Run `npm run format` to auto-format code
- Configure your editor to format on save

## Testing

Coming soon in Phase 8.

## License

MIT License - see LICENSE file for details

## Documentation

Complete documentation is available in the [docs](./docs/) directory:

- **[Development Setup](./docs/DEVELOPMENT_SETUP.md)** - Complete environment setup guide
- **[Firebase Setup](./docs/FIREBASE_SETUP.md)** - Firebase configuration walkthrough
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Solutions to common issues

## Support

For issues and questions:
- **Bug reports**: Create an issue on GitHub
- **Setup help**: Check [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- **Feature requests**: See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md)

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components from [React Native Paper](https://callstack.github.io/react-native-paper/)
- Backend powered by [Firebase](https://firebase.google.com/)

---

**Status**: Phase 2 Complete - Authentication System Ready 🎱

**Last Updated:** 2025-10-22
