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

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **npm**: v8 or higher (comes with Node.js)
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Mobile Device**: iOS or Android phone with Expo Go app installed
  - [Expo Go for iOS](https://apps.apple.com/app/expo-go/id982107779)
  - [Expo Go for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BilliardsScore.git
   cd BilliardsScore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go app (Android)
   - Scan the QR code with Camera app (iOS)

## Project Structure

```
BilliardsScore/
├── assets/              # Images, fonts, and other static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Full-screen views
│   ├── navigation/      # Navigation configuration
│   ├── services/        # Firebase and external services
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── constants/       # App-wide constants
├── App.js               # Application entry point
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
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

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Follow the setup wizard

2. **Enable Authentication**
   - Navigate to Authentication > Sign-in method
   - Enable Email/Password provider

3. **Create Firestore Database**
   - Navigate to Firestore Database
   - Create database in production mode
   - Set up security rules

4. **Get configuration**
   - Project Settings > General
   - Scroll to "Your apps" section
   - Add a web app and copy configuration
   - Add credentials to `.env` file

## Environment Variables

Create a `.env` file in the root directory:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## Roadmap

See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for the complete development plan.

### Current Phase: Phase 1 - Project Foundation ✅
- [x] Project initialization
- [x] Folder structure setup
- [x] Core dependencies
- [x] Configuration files

### Next Phase: Phase 2 - User Authentication
- [ ] Firebase setup
- [ ] Login/Register screens
- [ ] Authentication flow

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

## Support

For issues and questions:
- Create an issue on GitHub
- Check the [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for planned features

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components from [React Native Paper](https://callstack.github.io/react-native-paper/)
- Backend powered by [Firebase](https://firebase.google.com/)

---

**Status**: Phase 1 Complete - Foundation Established 🎱
