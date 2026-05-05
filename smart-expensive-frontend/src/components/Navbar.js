import { Link, useNavigate } from "react-router-dom";

const styles = `
.navbar-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(8,8,8,0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(212,175,55,0.1);
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  font-family: 'DM Mono', monospace;
}

.navbar-logo {
  font-size: 13px;
  letter-spacing: 0.2em;
  color: rgba(212,175,55,0.8);
  text-transform: uppercase;
}

.navbar-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.navbar-link {
  font-size: 11px;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s;
}

.navbar-link:hover {
  color: rgba(212,175,55,0.9);
}

.logout-btn {
  border: 1px solid rgba(212,175,55,0.3);
  padding: 8px 14px;
  font-size: 10px;
  letter-spacing: 0.2em;
  background: transparent;
  color: rgba(212,175,55,0.7);
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(212,175,55,0.1);
  color: rgba(212,175,55,1);
}
`;

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>{styles}</style>

      <div className="navbar-root">
        <div className="navbar-logo">
          Smart Expensive
        </div>

        <div className="navbar-links">

          {!token && (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}

          {token && (
            <>
              <Link to="/profile" className="navbar-link">Profile</Link>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}