import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";

// 🔒 ROUTE PRIVÉE
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 🌐 ROUTE PUBLIQUE
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined") {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>

      {/* ✅ Navbar visible partout */}
      <Navbar />

      <Routes>

        {/* 🔁 REDIRECTION PAR DÉFAUT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🌐 ROUTES PUBLIQUES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* 🔒 ROUTES PRIVÉES */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* ❌ ROUTE INCONNUE */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </Router>
  );
}

export default App;