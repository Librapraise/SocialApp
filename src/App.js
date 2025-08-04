import "./style.scss"
import LeftBar from "./components/leftbar/Leftbar";
import NavBar from "./components/navbar/Navbar";
import RightBar from "./components/rightbar/Rightbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkMode";
import { AuthContext } from "./context/authContext";

function App() {
  // Context values
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser, loading } = useContext(AuthContext);

  // Layout component for authenticated pages
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    // Show loading spinner while checking authentication
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      );
    }

    // Redirect to login if not authenticated
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  // Public Route component (redirects to home if already logged in)
  const PublicRoute = ({ children }) => {
    // Show loading spinner while checking authentication
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      );
    }

    // Redirect to home if already authenticated
    if (currentUser) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  // Router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      // Catch all route - redirect to home
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;