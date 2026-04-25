import { Link, useNavigate, useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

  .sidebar {
    width: 220px;
    min-width: 220px;
    height: 100vh;
    background: #0a0a0a;
    border-right: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px 0 32px;
    position: sticky;
    top: 0;
    z-index: 10;
    font-family: 'DM Mono', monospace;
  }

  /* ── LOGO ── */
  .sidebar-logo {
    padding: 0 28px;
    margin-bottom: 44px;
  }

  .sidebar-logo-eyebrow {
    font-size: 8px;
    letter-spacing: 0.25em;
    color: rgba(212,175,55,0.4);
    text-transform: uppercase;
    margin: 0 0 6px;
  }

  .sidebar-logo-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    color: #f5f0e8;
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1;
  }

  .sidebar-logo-name span {
    color: rgba(212,175,55,0.8);
  }

  /* ── DIVIDER ── */
  .sidebar-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(212,175,55,0.2), transparent);
    margin: 0 28px 32px;
  }

  /* ── NAV ── */
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 16px;
  }

  .sidebar-nav-label {
    font-size: 8px;
    letter-spacing: 0.22em;
    color: rgba(255,255,255,0.18);
    text-transform: uppercase;
    padding: 0 12px;
    margin-bottom: 10px;
  }

  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 12px;
    text-decoration: none;
    color: rgba(255,255,255,0.35);
    font-size: 11px;
    letter-spacing: 0.08em;
    position: relative;
    transition: color 0.2s, background 0.2s;
    border-left: 2px solid transparent;
  }

  .sidebar-link:hover {
    color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.03);
    border-left-color: rgba(212,175,55,0.2);
  }

  .sidebar-link.active {
    color: rgba(212,175,55,0.9);
    background: rgba(212,175,55,0.05);
    border-left-color: rgba(212,175,55,0.6);
  }

  .sidebar-link-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    opacity: 0.6;
  }

  .sidebar-link.active .sidebar-link-icon { opacity: 1; }

  /* ── BOTTOM ── */
  .sidebar-bottom {
    padding: 0 16px;
  }

  .sidebar-bottom-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 0 12px 20px;
  }

  .sidebar-logout {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 11px 12px;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: rgba(200,80,80,0.45);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: color 0.2s, background 0.2s, border-left-color 0.2s;
    text-align: left;
  }

  .sidebar-logout:hover {
    color: rgba(220,100,100,0.8);
    background: rgba(220,60,60,0.05);
    border-left-color: rgba(220,60,60,0.3);
  }
`;

// SVG icons — propres, pas d'emojis
const IconDashboard = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <rect x="1" y="1" width="5" height="5" rx="1"/>
    <rect x="8" y="1" width="5" height="5" rx="1"/>
    <rect x="1" y="8" width="5" height="5" rx="1"/>
    <rect x="8" y="8" width="5" height="5" rx="1"/>
  </svg>
);

const IconAnalytics = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,11 4,7 7,9 10,4 13,6"/>
    <line x1="1" y1="13" x2="13" y2="13"/>
  </svg>
);

const IconSettings = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="7" r="2"/>
    <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.1 1.1M10 10l1.1 1.1M2.9 11.1L4 10M10 4l1.1-1.1"/>
  </svg>
);

const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3"/>
    <polyline points="10,10 13,7 10,4"/>
    <line x1="13" y1="7" x2="5" y2="7"/>
  </svg>
);

const navItems = [
  { to: "/profile",   label: "Dashboard",  Icon: IconDashboard  },
  { to: "/analytics", label: "Analytics",  Icon: IconAnalytics  },
  { to: "/settings",  label: "Settings",   Icon: IconSettings   },
];

export default function Sidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sidebar">

        {/* LOGO */}
        <div>
        
          <div className="sidebar-divider" />

          <nav className="sidebar-nav">
            <p className="sidebar-nav-label">Menu</p>
            {navItems.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                className={`sidebar-link${location.pathname === to ? " active" : ""}`}
              >
                <span className="sidebar-link-icon"><Icon /></span>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="sidebar-bottom">
          <div className="sidebar-bottom-divider" />
          <button className="sidebar-logout" onClick={logout}>
            <span className="sidebar-link-icon"><IconLogout /></span>
            Déconnexion
          </button>
        </div>

      </div>
    </>
  );
}