import Header from "@/components/Header";
import QuickAccess from "@/components/QuickAccess";
import NewsSection from "@/components/NewsSection";
import AppPromo from "@/components/AppPromo";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main className="home-page">
        <section className="hero">
          <Header />
          <div className="hero-content container">
            <div className="hero-text">
              <p className="eyebrow">CEB Digital Service</p>
              <h1>Manage electricity usage, meters, and bills in one place.</h1>
              <p>
                VOLTPAY helps customers connect smart meters, monitor monthly
                consumption, report service issues, and access CEB updates.
              </p>
              <div className="hero-actions">
                <a href="/login" className="primary-btn">Get Started</a>
                <a href="/easy-pay" className="secondary-btn">Easy Pay</a>
              </div>
            </div>
            <div className="slider-dots" aria-label="Carousel indicators">
              <span className="active" />
              <span />
              <span />
            </div>
          </div>
        </section>

        <QuickAccess />
        <NewsSection />
        <AppPromo />
      </main>
      <Footer />
    </>
  );
}
