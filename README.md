# Digital Wealth Partners (DWP) - Client Dashboard

A professional React-based dashboard application for Digital Wealth Partners, providing clients with comprehensive portfolio management and cryptocurrency investment tracking.

## 🚀 Features

### 📊 Dashboard
- **Portfolio Overview**: Real-time portfolio performance and asset allocation
- **Investment Tracking**: XRP and XLM cryptocurrency holdings with live price data
- **Transaction History**: Complete transaction logs with filtering and search
- **Performance Analytics**: Monthly returns and portfolio growth charts
- **Withdrawal Requests**: Secure withdrawal system with admin notifications

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure user authentication and session management
- **Protected Routes**: Dashboard access restricted to authenticated users
- **Offline Support**: Firebase offline persistence for improved user experience
- **Error Handling**: Comprehensive error states with recovery options

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes (desktop, tablet, mobile)
- **Mobile Navigation**: Clean hamburger menu for mobile dashboard access
- **Responsive Charts**: Full-width chart layouts optimized for mobile viewing
- **Touch-Friendly**: Proper spacing and touch targets for mobile devices

### 🎨 Modern UI/UX
- **Clean Design**: Professional interface with consistent styling
- **Interactive Charts**: Recharts integration for beautiful data visualization
- **Loading States**: Skeleton loaders and empty states for better UX
- **Accessibility**: WCAG compliant with proper semantic markup

## 🛠 Tech Stack

- **Frontend**: React 19.1.1
- **Routing**: React Router DOM 7.8.1
- **Authentication**: Firebase 12.2.1
- **Charts**: Recharts 3.1.2
- **Styling**: CSS3 with CSS Variables
- **Build Tool**: Create React App 5.0.1
- **Icons**: FontAwesome & React Icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dwp-dashboard.git
   cd dwp-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm start` - Runs development server
- `npm run build` - Creates production build
- `npm test` - Runs test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop `build` folder
- **Vercel**: Connect GitHub repo for auto-deployment
- **Firebase Hosting**: Use `firebase deploy`
- **AWS S3**: Upload build folder to S3 bucket

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MobileNav.js    # Mobile navigation component
│   ├── ChartEmptyState.js
│   └── ProtectedRoute.js
├── pages/              # Page components
│   ├── dashboard.js    # Main dashboard
│   ├── login.js        # Authentication
│   ├── home.js         # Landing page
│   └── ...
├── hooks/              # Custom React hooks
│   └── useAuth.js      # Authentication hook
├── scripts/            # Admin utility scripts
│   ├── createUser.js   # User creation script
│   └── updateUser.js   # User data management
└── firebase.js         # Firebase configuration
```

## 🔐 Environment Variables

Create `.env.production` for production deployment:
```
GENERATE_SOURCEMAP=false
REACT_APP_VERSION=$npm_package_version
```

Firebase configuration is included in `src/firebase.js`.

## 📊 Features Overview

### User Dashboard
- **Portfolio Overview**: Balance cards, crypto holdings, performance metrics
- **Investment Management**: XRP/XLM investment tracking with live prices
- **Transaction History**: Comprehensive transaction logs with filtering
- **Withdrawal System**: Secure withdrawal requests with email notifications

### Admin Features (Scripts)
- **User Management**: Create and update user accounts
- **Portfolio Management**: Set up user portfolios and transactions
- **Withdrawal Processing**: Handle withdrawal requests

## 🔒 Security Features

- Firebase Authentication with email/password
- Protected routes for dashboard access
- Secure API calls with authentication tokens
- Input validation and sanitization
- Error boundary components

## 📱 Mobile Optimization

- Responsive breakpoints: 1024px, 768px, 480px
- Mobile-specific navigation with hamburger menu
- Touch-optimized chart interactions
- Optimized loading states for mobile

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is proprietary software developed for Digital Wealth Partners.

## 🤝 Contributing

This is a private project. For internal development inquiries, please contact the development team.

## 📞 Support

For technical support or questions, please contact:
- Email: support@dwp.com
- Phone: (555) 123-4567

---

**Digital Wealth Partners** - Professional Cryptocurrency Portfolio Management
