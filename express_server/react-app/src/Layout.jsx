import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link>
      </nav>
      <Outlet />
    </div>
  );
}
