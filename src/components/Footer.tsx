import Link from "next/link";
import BridgeBirdLogo from "./BridgeBirdLogo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <BridgeBirdLogo />
          <span className="footer-title">Bridge Bird</span>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/" className="footer-link">
            Home
          </Link>
          <Link href="/analyze" className="footer-link">
            Analyze
          </Link>
          <Link href="/resources" className="footer-link">
            Resources
          </Link>
        </nav>
        <p className="footer-disclaimer">
          Bridge Bird provides informational guidance and does not replace
          official school advice.
        </p>
        <p className="footer-pilot">
          Demo pilot using sample Diablo Valley College resource data.
        </p>
      </div>
    </footer>
  );
}
