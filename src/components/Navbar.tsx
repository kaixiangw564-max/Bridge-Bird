import Link from "next/link";
import BridgeBirdLogo from "./BridgeBirdLogo";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand" aria-label="Bridge Bird home">
          <BridgeBirdLogo />
          <span className="navbar-title">Bridge Bird</span>
        </Link>
        <div className="navbar-links">
          <Link href="/analyze" className="navbar-link">
            Analyze
          </Link>
          <Link href="/resources" className="navbar-link">
            Resources
          </Link>
        </div>
      </div>
    </nav>
  );
}
