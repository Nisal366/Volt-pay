import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EasyPayPage() {
  return (
    <>
      <main className="plain-page">
        <Header />
        <section className="container page-panel">
          <p className="eyebrow">Fast Payment</p>
          <h1>Easy Pay</h1>
          <p className="page-intro">
            Pay your electricity bill using account number, premises ID, or a connected smart meter.
          </p>

          <form className="service-form">
            <label>
              Account Number
              <input placeholder="Enter CEB account number" />
            </label>
            <label>
              Mobile Number
              <input placeholder="Enter mobile number" />
            </label>
            <label>
              Amount
              <input placeholder="LKR 0.00" />
            </label>
            <button className="yellow-btn" type="button">Continue Payment</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
