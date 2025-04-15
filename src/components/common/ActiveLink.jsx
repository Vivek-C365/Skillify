import { Link, useLocation } from "react-router-dom";

function ActiveLink({ children, to, className, activeClassName }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`${className} ${isActive ? activeClassName : ""}`}>
      {children}
    </Link>
  );
}

export default ActiveLink;
