
# Farm Fencing E-Commerce Mobile App

A modern, responsive e-commerce mobile application built with React, Capacitor, and TypeScript. Features a complete shopping experience with product browsing, detailed views, and cart management.

## Demo

📱 **Watch the App in Action**: [YouTube Demo Video](https://youtu.be/tA5dyLq0mok)

*The demo showcases key features including responsive design, cart functionality, haptic feedback, and cross-device compatibility.*
## Setup Instructions

1. **Clone the repository**
```bash
   git clone <https://github.com/spiism/farm-fencing-app>
   cd farm-fencing-app
```

2. **Install dependencies
```bash
   npm install
```

3. **Install Capacitor CLI (if not already installed)**
```bash
  npm install -g @capacitor/cli
```

4. **Build the web app**
```bash
   npm run build
```

5. **Sync Capacitor**
```bash
   npx cap sync
```

## Architecture Overview

### The application follows a modern React architecture with the following key principles:
- **Component-based Architecture**: Modular, reusable components with clear separation of concerns
- **Redux Toolkit State Management**: Centralized state management with RTK for cart state and user preferences
- **Responsive Design**: Mobile-first approach with Tailwind CSS for flexible layouts supporting all screen sizes
- **Simulated API Layer**: Realistic API simulation with configurable delays and error handling
- **Progressive Enhancement**: Works as PWA with native mobile capabilities through Capacitor

### Key Architectural Decisions

- **Redux Toolkit**: Chosen for global state management due to excellent TypeScript support and built-in best practices
- **Capacitor Preferences**: Used for cart persistence to maintain data across app sessions
- **Tailwind CSS**: Utility-first CSS framework for rapid, consistent styling
- **TypeScript**: Provides type safety and better development experience
- **Vite**: Fast build tool optimized for modern web development with HMR
- **Vitest**: Modern testing framework with excellent Vite integration

## Features Implemented
### Core Features

- [x]  Product Listing View with grid/list display
- [x]  Search and filter functionality with Redux state management
- [x]  Loading states and empty states
- [x]  Product Details View with comprehensive information
- [x]  Quantity selector with validation
- [x]  Add to Cart functionality with haptic feedback
- [x]  Back navigation support
- [x]  Shopping Cart with full CRUD operations
- [x]  Cart persistence across app sessions using Capacitor Preferences
- [x]  Clear cart functionality

### Technical Requirements

- [x]  Redux Toolkit for global state management
- [x]  JSON-based product data with 10 farm-related products
- [x]  Simulated API calls with 1-second realistic delays
- [x]  Comprehensive error handling for data fetching
- [x]  Infinite scroll support
- [x]  React Router navigation with deep linking
- [x]  Mobile-first responsive design (mobile to ultrawide desktop)
- [x]  Pull-to-refresh functionality
- [x]  Haptic feedback for cart interactions using Capacitor Haptics
- [x]  Unit test coverage with Vitest

### Bonus Features

- [x]  **Discount Pricing**: Added 20% discount display alongside regular prices
- [x]  **Cross-device Responsiveness**: Optimized for all screen sizes from mobile to ultrawide using Tailwind CSS
- [x]  **iOS Compatibility**: Fixed header overlay issues with iOS content inset configuration
- [x]  **Enhanced UX**: Haptic feedback for all cart interactions (add/remove/quantity changes)
- [x]  **Material Design Icons**: Consistent iconography throughout the app
- [x]  **Configurable API Delay**: Easily adjustable simulation delay in `api.ts`
- [x]  **Ionic Components**: Enhanced mobile UI components for better native feel

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Mobile Framework**: Capacitor 7
- **Build Tool**: Vite 7
- **Routing**: React Router v7
- **State Management**: Redux Toolkit with React Redux
- **Styling**: Tailwind CSS v4
- **UI Components**: Ionic React
- **Icons**: Material Icons
- **Testing**: Vitest + React Testing Library
- **Storage**: Capacitor Preferences API
- **Haptics**: Capacitor Haptics API
- **Development**: Hot Module Replacement (HMR)

## Running the App

### Development Mode
```bash
#CurrentMonthlyBillStart development server
npm run dev

# Run on mobile device/emulator
npm run build
npx cap sync
npx cap run ios    # For iOS
npx cap run android # For Android
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile Development
```bash
# Add platforms
npx cap add ios
npx cap add android

# Open in native IDEs
npx cap open ios
npx cap open android
```

## Testing

The application includes comprehensive unit tests covering critical functionality:
### Test Coverage

**API Layer Tests (`fetchProducts.test.ts`)**:

- ✅ Successful fetch and parsing of product data
- ✅ HTTP error response handling (500, 404, etc.)
- ✅ Network failure and fetch rejection handling
- ✅ JSON parsing error scenarios

**Component Tests (`ErrorMessage.test.tsx`)**:

- ✅ Basic rendering with required and optional props
- ✅ Conditional retry button rendering
- ✅ Click event handling and function execution
- ✅ CSS class application and styling verification
- ✅ Edge cases (long messages, empty strings, special characters)
- ✅ Accessibility compliance
- ✅ Component structure validation
### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Configuration

### API Delay Configuration

Adjust the API simulation delay in `src/api/api.ts`:
```bash
const API_DELAY = 1000; // Change to desired delay in milliseconds
```

### Tailwind Configuration

The app uses Tailwind CSS v4 with Vite plugin for optimal performance and development experience.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── store/              # Redux store configuration and slices
├── pages/              # Route components
├── services/           # Service layer for external integrations
│   ├── api.ts         # API simulation and data fetching
│   └── haptics.ts     # Haptic feedback service
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── assets/             # Static assets
```

## Future Improvements

Given more time, the following enhancements would be valuable:
### Performance Optimizations

- [ ]  **React Query Integration**: Replace current API layer with React Query for better caching, background updates, and optimistic updates
- [ ]  **Offline Support**: Implement service worker with cache-first strategy for products and offline cart management
### Enhanced UI/UX

- [ ]  **Better/Friendlier UI**: Implement modern design system with improved visual hierarchy and micro-interactions
- [ ] **Enhanced Gestures**: Add swipe-to-delete for cart items and pull-to-refresh improvements

## References

This project was built using modern React and Capacitor best practices. The following resources were referenced during development:
### Documentation & Guidelines

- React Documentation
- Redux Toolkit Documentation
- Capacitor Documentation
- Tailwind CSS Documentation
- Ionic React Documentation
- Material Design Guidelines
- MDN Web Docs for web APIs

### AI Assistance

- **ChatGPT**: Used for assistance with README.md documentation structure and formatting
- **Claude AI**: Utilized for help with unit test implementation and debugging, project structure recommendations

No external code was copied directly, though standard patterns and documentation examples were referenced from official sources.
