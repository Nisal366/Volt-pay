import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usageData } from "@/lib/mockData";

export default function UsagePage() {
  const maxUnits = Math.max(...usageData.map((item) => item.units));

  return (
    <>
      <main className="plain-page">
        <Header />
        <section className="container page-panel">
          <p className="eyebrow">Consumption</p>
          <h1>Electricity Usage</h1>
          <p className="page-intro">
            Frontend mockup for monthly smart-meter electricity usage.
          </p>

          <div className="info-card usage-chart-card">
            <div className="usage-chart large">
              {usageData.map((item) => (
                <div className="usage-bar" key={item.label}>
                  <span
                    className="bar"
                    style={{ height: `${(item.units / maxUnits) * 100}%` }}
                  />
                  <strong>{item.units}</strong>
                  <small>{item.label}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
