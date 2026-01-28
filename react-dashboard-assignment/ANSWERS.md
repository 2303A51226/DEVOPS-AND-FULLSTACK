# React Assignment Questions & Answers

## 1. How would you set up a new React project using tools like Create React App or Vite?

### Using Vite (Recommended)
Vite is a modern build tool that provides a faster and leaner development experience.
```bash
# syntax: npm create vite@latest [project-name] -- --template [template]
npm create vite@latest my-dashboard -- --template react
cd my-dashboard
npm install
npm run dev
```

### Using Create React App (CRA)
CRA is the classic way to bootstrap React apps, though currently less favored than Vite due to performance.
```bash
npx create-react-app my-dashboard
cd my-dashboard
npm start
```

---

## 2. What is the role of package.json in a React project?
The `package.json` file is the manifest for the project. Its key roles include:
- **Dependencies**: Lists libraries the project needs (e.g., `react`, `react-dom`) in `dependencies` and build tools (e.g., `vite`, `eslint`) in `devDependencies`.
- **Scripts**: Defines command shortcuts for running the app, building for production, linting, etc. (e.g., `npm run dev`, `npm run build`).
- **Metadata**: Contains project info like name, version, and author.
- **Configuration**: Can hold config for tools like ESLint or Browserslist.

---

## 3. How do you create a functional component in React?
A functional component is a JavaScript function that returns JSX.

```jsx
// WelcomeMessage.jsx
import React from 'react';

function WelcomeMessage(props) {
  return (
    <div className="welcome-container">
      <h1>Hello, {props.name}!</h1>
      <p>Welcome to the Student Dashboard.</p>
    </div>
  );
}

export default WelcomeMessage;
```

---

## 4. How are components rendered inside the main App component?
Components are imported and used as JSX tags inside the `App` component's return statement.

```jsx
// App.jsx
import WelcomeMessage from './WelcomeMessage';
import CourseDetails from './CourseDetails';

function App() {
  return (
    <div className="App">
      {/* Rendering the components */}
      <WelcomeMessage name="Student" />
      <CourseDetails />
    </div>
  );
}

export default App;
```

---

## 5. What are the benefits of breaking the UI into small reusable components?
- **Reusability**: Write code once and use it in multiple places (e.g., a Button component).
- **Maintainability**: Easier to debug and update small, isolated chunks of code than one massive file.
- **Readability**: Code structure reflects the UI structure, making it easier for developers to understand.
- **Separation of Concerns**: Each component handles its own logic and styling.
- **Collaboration**: Different team members can work on different components simultaneously.
