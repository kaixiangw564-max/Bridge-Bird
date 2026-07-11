import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BridgeBirdLogo from "@/components/BridgeBirdLogo";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <section className="hero">
          <div className="hero__logo">
            <BridgeBirdLogo />
          </div>
          <h1 className="hero__headline">
            From confusing messages to clear next steps.
          </h1>
          <p className="hero__subtext">
            Bridge Bird turns complicated college communications into verified,
            step-by-step action plans. Built for international students,
            first-generation students, and anyone navigating campus systems for
            the first time.
          </p>
          <div className="hero__actions">
            <Link href="/analyze" className="btn btn--primary">
              Analyze a Message
            </Link>
            <Link href="/analyze?load=example" className="btn btn--secondary">
              Try an Example
            </Link>
          </div>
          <p className="demo-notice">
            Demo pilot using sample Diablo Valley College resource data.
          </p>
        </section>

        <section className="feature-grid">
          <div className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 7h18M3 12h18M3 17h12"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="feature-card__title">Understand the message</h2>
            <p className="feature-card__desc">
              Convert complicated school language into plain, clear
              explanations so you always know exactly what is being asked of
              you.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="7" r="4" stroke="var(--color-accent)" strokeWidth="2" />
                <path
                  d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="feature-card__title">Find the right office</h2>
            <p className="feature-card__desc">
              BirdCheck matches your issue to the correct verified campus
              department so you do not waste time contacting the wrong office.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  stroke="var(--color-success)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="var(--color-success)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="feature-card__title">Take the next step</h2>
            <p className="feature-card__desc">
              Generate personalized BirdPath action plans, ready-to-send
              emails, calendar reminders, and document checklists. Everything
              you need to move forward.
            </p>
          </div>
        </section>

        <section className="how-it-works">
          <h2 className="how-it-works__title">How it works</h2>
          <div className="how-it-works__steps">
            <div className="how-step">
              <div className="how-step__number">1</div>
              <h3 className="how-step__title">Paste a school message</h3>
              <p className="how-step__desc">
                Copy any confusing email, notice, or announcement from your
                school.
              </p>
            </div>
            <div className="how-step">
              <div className="how-step__number">2</div>
              <h3 className="how-step__title">Bridge Bird analyzes it</h3>
              <p className="how-step__desc">
                We extract deadlines, identify required documents, and match
                you with the right campus office.
              </p>
            </div>
            <div className="how-step">
              <div className="how-step__number">3</div>
              <h3 className="how-step__title">Follow your BirdPath</h3>
              <p className="how-step__desc">
                Use your personalized step-by-step action plan, generate
                emails, and add deadlines to your calendar.
              </p>
            </div>
          </div>
        </section>

        <section className="trust-section">
          <h2 className="trust-section__title">
            ChatGPT gives you an answer. Bridge Bird gives you a verified path
            forward.
          </h2>
          <ul className="trust-section__list">
            <li className="trust-section__item">
              <svg
                className="trust-section__icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 10l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              AI-generated interpretation and verified campus resource data are
              displayed separately, so you always know what is official.
            </li>
            <li className="trust-section__item">
              <svg
                className="trust-section__icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 10l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Every resource includes a verification status and last-reviewed
              date. Resources are clearly marked as official or
              community-informed.
            </li>
            <li className="trust-section__item">
              <svg
                className="trust-section__icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 10l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Students should always confirm critical deadlines, immigration
              status, and legal documents with the official campus office.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
