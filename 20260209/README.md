# Personal Finance Tracker - Full Stack Application

A modern, full-stack Personal Finance Tracker application built with React (frontend) and Node.js/Express (backend). The application displays financial dashboard metrics including total income, total expenses, and balance with dynamic data fetching from a backend API.

## Project Structure

```
F:\fullstack2026\20260209\
├── backend/          # Node.js/Express API server
│   ├── package.json
│   └── server.js
└── frontend/         # React application
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── Dashboard.jsx
        ├── Dashboard.css
        └── index.css
```

## Features

✅ **Dynamic Data Fetching** - Loads financial data from backend API using fetch()  
✅ **Loading States** - Shows loading message while data is being fetched  
✅ **Error Handling** - Displays error messages if API calls fail with retry option  
✅ **Refresh Functionality** - Refresh dashboard data without page reload  
✅ **Currency Formatting** - Properly formatted currency values (USD)  
✅ **Responsive Design** - Mobile-friendly dashboard interface  
✅ **Real-time Updates** - Displays last updated timestamp  
✅ **Status Indicators** - Visual indicators for positive/negative balance  

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## Installation & Setup

### Backend Setup

```bash
cd F:\fullstack2026\20260209\backend
npm install
```

### Frontend Setup

```bash
cd F:\fullstack2026\20260209\frontend
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd F:\fullstack2026\20260209\backend
npm start
```

Backend will run on **http://localhost:5000**

Expected output:
```
✅ Backend server is running on http://localhost:5000
📊 Dashboard API: http://localhost:5000/api/dashboard
```

### Start the Frontend Development Server (in a new terminal)

```bash
cd F:\fullstack2026\20260209\frontend
npm run dev
```

Frontend will run on **http://localhost:3000**

Open your browser and navigate to **http://localhost:3000** to see the dashboard.

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns: `{ status: 'Backend is running!' }`

### Dashboard Summary
- **GET** `/api/dashboard`
- Returns:
```json
{
  "success": true,
  "data": {
    "totalIncome": 3500.00,
    "totalExpenses": 1100.00,
    "balance": 2400.00,
    "currency": "USD",
    "lastUpdated": "2026-02-09T10:30:00.000Z"
  }
}
```

### Get All Transactions
- **GET** `/api/transactions`
- Returns: Array of all transactions with type (income/expense), amount, category, and date

## Technologies Used

### Backend
- **Express.js** - Web framework for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware
- **Node.js** - JavaScript runtime

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern gradients and animations

## Key Features Explained

### 1. API Integration
The Dashboard component uses React's `useEffect()` hook to fetch data from the backend `/api/dashboard` endpoint on component mount.

```javascript
useEffect(() => {
  fetchDashboardData();
}, []);
```

### 2. Loading States
Shows "Loading your financial summary..." message while data is being fetched.

### 3. Error Handling
Displays user-friendly error messages if the API call fails with a "Try Again" button for retry.

### 4. Refresh Functionality
Users can click the "🔄 Refresh" button to reload dashboard data without page refresh. Button shows "⏳ Refreshing..." during the fetch operation.

### 5. Currency Formatting
Uses JavaScript's `Intl.NumberFormat` API to format values as USD currency:
```javascript
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
```

### 6. Responsive Design
The dashboard adapts to different screen sizes with CSS Grid and media queries for optimal viewing on mobile, tablet, and desktop devices.

## UI Components

### Dashboard Cards
Three main cards display:
- **Total Income** (Green) - Total amount earned
- **Total Expenses** (Red) - Total amount spent
- **Balance** (Yellow/Green/Red) - Remaining balance with status indicator

Each card includes:
- Icon emoji for visual identification
- Formatted currency value
- Descriptive metadata
- Hover effects for better interactivity

## Development

### Run Backend in Watch Mode
```bash
cd backend
npm run dev
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

## Customization

### Add More Transactions
Edit the `financialData` object in [backend/server.js](backend/server.js) to add more transactions:

```javascript
const financialData = {
  transactions: [
    { id: 1, type: 'income', amount: 3000, category: 'Salary', date: '2026-02-01' },
    // Add more transactions here
  ]
};
```

### Change API Port
Modify the `PORT` variable in [backend/server.js](backend/server.js):
```javascript
const PORT = 5000; // Change to desired port
```

Also update the proxy in [frontend/vite.config.js](frontend/vite.config.js) if using a different port.

## Bonus Enhancements

The project includes all bonus requirements:
- ✅ Refresh dashboard data without reloading the page
- ✅ Properly formatted currency values (USD)
- ✅ Responsive design for mobile and desktop
- ✅ Real-time last updated timestamp
- ✅ Visual status indicators (positive/negative balance)

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
- Backend: Change PORT in server.js
- Frontend: Modify port in vite.config.js (server.port)

### CORS Errors
Ensure both servers are running and the frontend vite.config.js proxy is correctly configured.

### Module Not Found Errors
Make sure to run `npm install` in both backend and frontend directories.

## License

ISC
