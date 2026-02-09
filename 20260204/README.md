# Student Dashboard - React Router SPA

A modern, single-page application (SPA) built with React Router that demonstrates multi-page navigation without page reloads. This Student Dashboard includes three main pages: Dashboard, Courses, and Profile.

## Features

✅ **React Router Integration** - Smooth navigation between pages without full page refresh  
✅ **Active Link Highlighting** - NavLink components highlight the current route  
✅ **Route Redirects** - Unknown routes automatically redirect to the Dashboard  
✅ **Responsive Design** - Mobile-friendly layout with CSS Grid and Flexbox  
✅ **Multiple Pages**:
  - 📊 **Dashboard** - Overview of student performance, GPA, attendance, and grades
  - 📚 **Courses** - List of enrolled courses with progress tracking
  - 👤 **Profile** - Personal and academic information with edit functionality

## Project Structure

```
F:\fullstack2026\20260204\
├── src/
│   ├── components/
│   │   ├── NavBar.jsx          # Navigation with active link highlighting
│   │   └── NavBar.css
│   ├── pages/
│   │   ├── Dashboard.jsx       # Performance overview and stats
│   │   ├── Dashboard.css
│   │   ├── Courses.jsx         # Enrolled courses with progress
│   │   ├── Courses.css
│   │   ├── Profile.jsx         # Editable student profile
│   │   └── Profile.css
│   ├── App.jsx                 # Main app with BrowserRouter & Routes
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Install Dependencies

```bash
cd F:\fullstack2026\20260204
npm install
```

This installs:
- **react** - UI library
- **react-dom** - React DOM bindings
- **react-router-dom** - Client-side routing
- **vite** - Fast build tool and dev server
- **@vitejs/plugin-react** - React support for Vite

## Running the Application

```bash
cd F:\fullstack2026\20260204
npm run dev
```

The application will start at **http://localhost:3001** (or the next available port)

## Routing Implementation

### BrowserRouter Setup
The app is wrapped with `<BrowserRouter>` in `App.jsx`:

```javascript
<BrowserRouter>
  <div className="app">
    <NavBar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
</BrowserRouter>
```

### Active Link Highlighting
Uses `NavLink` with `isActive` check in NavBar.jsx:

```javascript
<NavLink 
  to="/" 
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  📊 Dashboard
</NavLink>
```

CSS styling for active state:
```css
.nav-link.active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid #ffd700;
  font-weight: 600;
}
```

### Route Redirect
Unknown routes are handled with `<Navigate>`:
```javascript
<Route path="*" element={<Navigate to="/" replace />} />
```

## Page Details

### Dashboard Page
- **GPA Display** - Shows overall GPA (3.9)
- **Attendance Rate** - Visual stat card (97%)
- **Assignment Progress** - Completed assignments tracking
- **Class Rank** - Current rank in class
- **Performance Table** - Recent subject performance with grades
- **Color-coded Grades** - Visual indicators (A, B+, etc.)

### Courses Page
- **Course Statistics** - Total courses, credits, and in-progress count
- **Course Cards** - Grid layout of all enrolled courses
- **Progress Tracking** - Visual progress bars for in-progress courses
- **Course Details** - Code, instructor, semester, and credits
- **Status Indicators** - Shows course status (In Progress/Completed)
- **Action Buttons** - "Continue Course" or "View Details" options

### Profile Page
- **Profile Avatar** - Visual student avatar (emoji)
- **Student Information** - Name, ID, email, phone, DOB, address
- **Academic Info** - Major, minor, academic year, enrollment date
- **Edit Mode** - Toggle between view and edit modes
- **Quick Stats** - Sidebar with GPA, completed courses, and achievements
- **Achievements** - Display of student achievements and awards
- **Form Validation** - Disabled fields for non-editable data

## Navigation Experience

### No Page Reloads
- Click navigation links to switch between pages
- URL updates but page doesn't reload (SPA behavior)
- Seamless transitions with fade-in animations

### Active Route Indication
- Current page link is highlighted with:
  - Different background color
  - Gold bottom border
  - Higher font weight
  - Box shadow effect

### Responsive Navigation
- Desktop: Horizontal navbar with 3 navigation links
- Mobile: Stacked layout with flexible navigation

## Styling Features

- **Dark Theme** - Modern gradient background (#0f0f1e → #1a1a2e)
- **Purple-Blue Accent** - Primary colors #667eea and #764ba2
- **Gold Highlights** - #ffd700 for important elements
- **Smooth Transitions** - All interactive elements have 0.3s transitions
- **Hover Effects** - Cards lift and glow on hover
- **Responsive Grid** - Auto-fit columns for responsive layouts

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| React 18 | UI library |
| React Router 6 | Client-side routing |
| Vite 4 | Build tool & dev server |
| CSS3 | Styling with gradients and animations |

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Bonus Features Implemented

✅ **Active Link Highlighting** - NavLinks are highlighted based on current route  
✅ **Route Redirect** - Unknown routes redirect to Dashboard using `<Navigate>`  
✅ **Smooth Navigation** - No page reloads during navigation  
✅ **Page Transitions** - Fade-in animations on page load  
✅ **Responsive Design** - Works on mobile, tablet, and desktop  
✅ **Editable Profile** - Toggle edit mode to modify profile information  
✅ **Course Progress** - Visual progress bars for courses  
✅ **Performance Table** - Detailed academic performance metrics  

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview
```

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is in use, Vite will automatically try the next available port.

### Module Not Found Errors
Make sure to run `npm install` in the project directory.

### React Router Not Working
Ensure `<BrowserRouter>` wraps your Routes component in App.jsx.

### Active Link Not Highlighting
Check that `NavLink` (not `Link`) is used and className function is properly defined.

## Future Enhancements

- Add backend API integration
- Database for storing profile and course data
- Authentication system
- Grade analysis and GPA calculator
- Course schedule/calendar
- Assignment submission tracker
- Peer comparison and class statistics

## License

MIT License - feel free to use this as a learning resource!
