export default function AppPromo() {
  return (
    <section className="app-promo section">
      <div className="container app-promo-inner">
        <div>
          <p className="eyebrow">Mobile Experience</p>
          <h2>Smart Electricity Management App</h2>
          <p>
            Track usage, connect your smart meter, manage bills, and receive
            service updates through VOLTPAY.
          </p>

          <div className="store-row">
            <span className="store-badge">
              <span>▶</span>
              Google Play
            </span>
            <span className="store-badge">
              <span>▣</span>
              App Store
            </span>
          </div>
        </div>

        <div className="phone-stack" aria-label="VOLTPAY app preview">
          <div className="phone active-phone">
            <div className="phone-notch" />
            <img src="/images/voltpay-logo.png" alt="" />
            <p>Welcome</p>
            <span className="phone-button">Get Started</span>
          </div>
          <div className="phone">
            <div className="phone-notch" />
            <h4>Usage</h4>
            <div className="mini-bars">
              <span style={{ height: "35%" }} />
              <span style={{ height: "58%" }} />
              <span style={{ height: "45%" }} />
              <span style={{ height: "75%" }} />
            </div>
          </div>
          <div className="phone">
            <div className="phone-notch" />
            <h4>Bill</h4>
            <p className="phone-amount">LKR 4,280</p>
            <span className="phone-button">Pay Now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
