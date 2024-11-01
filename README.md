# Lendsqr Frontend Assessment

This project is a React-based admin dashboard built with Next.js and TypeScript, implementing Lendsqr's design system for user management and analytics.

## 🚀 Live Demo

[View Live Demo](https://michael-olowe-lendsqr-fe-test.vercel.app/)

## 📋 Features

- User authentication (Login/Signup)
- Dashboard with analytics cards
- User management interface
- Detailed user profiles
- Responsive design for all screen sizes
- Filter functionality
- Local storage for user session management

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** SCSS
- **Testing:** Jest + React Testing Library
- **State Management:** React Hooks
- **Data Storage:** Local Storage
- **API Mocking:** GitHub-hosted JSON

## 📁 Project Structure

```
📦Root
 ┣ 📂app                    # Next.js app directory
 ┃ ┣ 📂(authentication)     # Authentication routes
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┗ 📂signup
 ┃ ┣ 📂(user-routes)       # Protected user routes
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂users
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂components          # Reusable UI components
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂navbar
 ┃ ┃ ┣ 📂sidebar
 ┃ ┃ ┣ 📂userFilter
 ┃ ┃ ┗ 📂usersTable
 ┃ ┗ 📂fonts               # Custom fonts
 ┣ 📂styles                # SCSS modules and global styles
 ┣ 📂tests                 # Test suites
 ┣ 📂types                 # TypeScript type definitions
 ┣ 📂utils                 # Helper functions and utilities
 ┗ 📂mocks                 # Mock data and API responses
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/maiqel1/lendsqr-fe-test.git
cd lendsqr-fe-test
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 📱 Responsive Design

The application is fully responsive with breakpoints at:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Authentication

- Uses local storage for session management
- Login credentials for testing:
  - Email: `user@lendsqr.com`
  - Password: `password123`

## 🎨 Styling

- SCSS modules for component-level styling
- Global styles in `app/globals.css`
- Responsive design using mobile-first approach

## 📈 Performance Optimizations

- Route grouping for better code splitting
- Image optimization with Next.js Image component
- Component-level code splitting

## 🌐 API Integration

- Mock API data hosted on GitHub
- Implements error handling and loading states
- Pagination implementation for user data
- Filter functionality

## 🧰 Available Scripts

- `npm run dev`: Starts development server
- `npm run build`: Creates production build
- `npm start`: Runs production server
- `npm test`: Runs test suite
- `npm run lint`: Runs ESLint

## 📝 Future Improvements

- Implement more sophisticated authentication
- Add more interactive dashboard features
- Enhance mobile user experience
- Add data export functionality

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of a technical assessment and is not licensed for public use.
