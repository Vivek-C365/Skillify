import { Link, useLocation } from "react-router-dom";

export default function ActiveLink({
  children,
  to,
  className,
  activeClassName,
  onClick,
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${className} ${isActive ? activeClassName : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function ActiveLink2({
  children,
  to,
  className,
  activeClassName,
  onClick,
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${className} ${isActive ? activeClassName : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
