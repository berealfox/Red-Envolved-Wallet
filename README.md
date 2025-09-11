# Red Envelope Wallet

[![Expo](https://img.shields.io/badge/Built%20with-Expo-000020.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-61DAFB.svg)](https://reactnative.dev/)
[![License](https://img.shields.io/badge/License-BSD--0-blue.svg)](LICENSE)

A modern, feature-rich cryptocurrency wallet built for the AQY blockchain (Sui fork) with innovative reward-driven theming and F2C eCommerce integration.

## 🚀 Features

### 🔐 Wallet Core
- **Secure Key Management**: ED25519 keypair generation with mnemonic backup
- **Multi-Token Support**: Native AQY, USDC, and GC token management
- **Send & Receive**: Seamless transaction flows with QR code support
- **Portfolio View**: Real-time balance tracking and transaction history

### 🎨 Dynamic Theming
- **Reward-Driven Colors**: Background dynamically shifts from pink → red → purple based on seller reward percentage (3%-100%)
- **Custom Theme System**: Built-in light/dark mode with customizable color palettes
- **Modern UI**: Clean, responsive design optimized for mobile experience

### 💱 DEX Integration (Planned)
- **Token Swaps**: AQY ↔ USDC and AQY ↔ GC trading pairs
- **Slippage Control**: Configurable slippage protection (0.1%-5%)
- **Price Impact**: Real-time market data and transaction cost estimation

### 🛒 F2C eCommerce Integration (Planned)
- **Seller QR Generation**: Create signed QR codes with reward schemes
- **Buyer Scan & Pay**: Camera-based QR scanning for instant payments
- **Reward Schemes**: Multiple distribution models for seller incentives
- **Smart Contract Integration**: Direct integration with F2C eCommerce contracts

### 🔧 Additional Features
- **Settings Management**: Network configuration, theme customization, security settings
- **Explorer Integration**: Deep linking to AQY blockchain explorer
- **Secure Storage**: Encrypted wallet data with biometric protection
- **Responsive Design**: Optimized for both mobile and desktop experiences

## ✅ Implemented So Far (Current Sprint)

- Buy/Sell modal with pinned coins and theme-aware actions
- Send Method modal from Home: choose Direct wallet or Claimable Slush link
- Swap screen created and refined
  - Pill-shaped token selectors with icon, symbol, arrow
  - Fixed layout issues (no stretched arrows, correct grouping)
  - Bottom settings container: slippage, fees, Swap CTA; responsive and anchored
- Receive screen
  - Tab bar: "Receive SUI" and "Scan code"
  - Clean QR view: QR card only; name and short address in a separate section
  - Fixed bottom "Copy Address" button
  - Camera-based QR scanning using Expo Camera (CameraView) with permission flow
- Icons and fixes
  - Centralized SVG icons; resolved stray text in `SuiIcon.js`
- Styles refactor
  - Extracted component styles into `src/styles/*` files for maintainability

## 📱 Screenshots

*Screenshots will be added as development progresses*

## 🛠 Technology Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript
- **UI Libraries**: React Native SVG, Custom component system
- **Crypto**: Noble cryptography libraries (@noble/ed25519, @noble/hashes)
- **Storage**: Expo SecureStore, AsyncStorage
- **Navigation**: Custom tab-based navigation
- **State Management**: React Context API

## 🏗 Project Structure

```
Red-Envelope-Wallet/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── icons/                     # Custom SVG icons
│   │   │   ├── SuiIcon.js
│   │   │   └── index.js               # Icon exports (ArrowLeft, ArrowRight, etc.)
│   │   ├── BuySellModal.js            # Buy/Sell pinned coins modal
│   │   └── SendMethodModal.js         # "Direct wallet" or "Claimable link"
│   ├── context/
│   │   └── WalletContext.js           # Wallet state management
│   ├── screens/                       # Application screens
│   │   ├── HomeScreen.js              # Dashboard with actions (Send/Receive/Swap)
│   │   ├── SendScreen.js              # Send tokens flow
│   │   ├── ReceiveScreen.js           # QR (receive) + Camera scanning tabs
│   │   ├── SwapScreen.js              # Swap UI (selectors, slippage, fees)
│   │   ├── SettingsScreen.js          # App configuration
│   │   ├── SearchCoinsScreen.js       # (if present) Token search
│   │   └── ManageAccountsScreen.js    # (if present) Account management
│   ├── styles/                        # Component/screen styles (StyleSheet)
│   │   ├── BuySellModal.styles.js
│   │   ├── ReceiveScreen.styles.js
│   │   ├── SendMethodModal.styles.js
│   │   └── SwapScreen.styles.js
│   ├── theme/
│   │   ├── ThemeContext.js            # Theme provider and hook
│   │   └── colors.js                  # Theme tokens
│   └── constants/                     # App constants
├── assets/                            # Images, logos (e.g., red-wallet-logo.jpg)
├── App.js                             # App entry
├── app.json                           # Expo app config
└── package.json                       # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/red-envelope-wallet.git
   cd red-envelope-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS Simulator
   npm run ios

   # Android Emulator
   npm run android

   # Web Browser
   npm run web
   ```

### Development Setup

1. **Environment Configuration**
   - Copy `.env.example` to `.env` (when available)
   - Configure network endpoints and API keys

2. **Running Tests**
   ```bash
   npm test
   ```

3. **Building for Production**
   ```bash
   expo build:android
   expo build:ios
   ```

## 🗺 Development Roadmap

### ✅ Milestone 1 - Wallet Core & Foundations (Current)
- [x] Project scaffold with Expo/React Native
- [x] Wallet key generation and import functionality
- [x] Basic UI with custom theming system
- [x] Portfolio screen with balance display
- [x] Send/Receive token flows
- [x] Settings and navigation structure

### 🔄 Milestone 2 - Seller QR & Buyer Scan (In Progress)
- [ ] Seller reward percentage slider (3%-100%)
- [ ] Dynamic background color mapping (pink→red→purple)
- [ ] QR code generation with signed payloads
- [ ] Camera-based QR scanning for buyers
- [ ] Mock F2C contract integration

### 🔜 Milestone 3 - DEX Integration
- [ ] Token swap interface (AQY ↔ USDC, AQY ↔ GC)
- [ ] DEX adapter integration
- [ ] Slippage protection and price impact display
- [ ] Transaction status and explorer linking

### 🔮 Milestone 4 - F2C Contract Full Integration
- [ ] Live smart contract integration
- [ ] Multiple reward schemes implementation
- [ ] Signature verification and security
- [ ] Payment confirmation flows

### 🎯 Milestone 5 - AQY Explorer & Extended Features
- [ ] Deep linking to AQY blockchain explorer
- [ ] Advanced seller settings and scheme persistence
- [ ] Configurable token lists and RPC endpoints
- [ ] Enhanced theme customization

### 🚀 Milestone 6 - Production Ready
- [ ] Comprehensive security implementation
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Internationalization support
- [ ] Performance optimization and testing

## 🤝 Contributing

We welcome contributions to the Red Envelope Wallet! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the BSD Zero Clause License (0BSD) - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Project Documentation**: [PROJECT.md](PROJECT.md)
- **AQY Blockchain**: [Official Website](#) *(Coming Soon)*
- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev/)
- **React Native Guide**: [reactnative.dev](https://reactnative.dev/)

## 📞 Support

For support, questions, or contributions:

- Create an issue in this repository
- Join our Discord community *(Coming Soon)*
- Check the FAQ section *(Coming Soon)*

## 🙏 Acknowledgments

- Inspired by Slush Wallet UX design patterns
- Built with the Expo and React Native ecosystems
- Powered by the AQY blockchain technology
- Noble cryptography libraries for secure operations

---

**⚠️ Disclaimer**: This wallet is currently in active development. Use at your own risk and never store significant funds until the production release with full security audits.

