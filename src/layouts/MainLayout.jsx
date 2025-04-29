import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const MainLayout = ({ children }) => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    toast.info("Logged out");
  };

  return (
    <>
      <header className="main-header">
        {/* Left - User Info */}
        <div className="user-info">
          {user ? user.email : "Hello Guest"}
        </div>

        {/* Center - Navigation */}
        <nav className="nav-center">
          <Link to="/">Home</Link>
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              {user.role === "business" && (
                <>
                  <Link to="/my-cards">My Cards</Link>
                  <Link to="/create-card">New Card</Link>
                </>
              )}
              {(user.role === "user" || user.role === "business") && (
                <Link to="/favorites">Favorites</Link>
              )}
              {user.role === "admin" && <Link to="/admin">Admin Panel</Link>}
              <div style={{ flexShrink: 0 }}>
                <button onClick={handleLogout} className="nav-button">
                  Logout
                </button>
              </div>
            </>
          )}
          {!user && <Link to="/favorites">Favorites</Link>}
        </nav>

        {/* Right - Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer style={{ textAlign: "center", padding: "1rem" }}>
        <p>© 2025 The Project of TEG</p>
      </footer>
    </>
  );
};

export default MainLayout;
