import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <main className="plain-page">
        <Header />
        <section className="container page-panel">
          <p className="eyebrow">Support</p>
          <h1>Contact Us</h1>
          <p className="page-intro">
            Reach CEB customer support for billing, outages, smart meter assistance, and service requests.
          </p>

          <div className="contact-grid">
            <div className="info-card">
              <h2>Hotline</h2>
              <p>1987</p>
            </div>
            <div className="info-card">
              <h2>Email</h2>
              <p>support@voltpay.lk</p>
            </div>
            <div className="info-card">
              <h2>Working Hours</h2>
              <p>8:30 AM - 4:15 PM</p>
            </div>
          </div>

          <form className="service-form">
            <label>
              Name
              <input placeholder="Your name" />
            </label>
            <label>
              Message
              <textarea placeholder="Write your message" />
            </label>
            <button className="gradient-btn" type="button">Submit Message</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
