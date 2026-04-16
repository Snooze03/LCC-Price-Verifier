// src/components/Sidebar.jsx
import { Link, useLocation } from "@tanstack/react-router";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside>
      {/* Logo */}
      <div>
        <p>Your App Name</p>
      </div>

      {/* Nav */}
      <nav>
        <Link to="/admin" className={pathname === "/admin" ? "active" : ""}>
          Link 1
        </Link>
        <Link
          to="/admin/settings"
          className={pathname === "/admin/settings" ? "active" : ""}
        >
          Link 2
        </Link>
      </nav>

      {/* Bottom */}
      <div>
        <button>asda</button>
      </div>
    </aside>
  );
}
