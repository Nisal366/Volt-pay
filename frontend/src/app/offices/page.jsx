import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { officeLocations } from "@/lib/mockData";

export default function OfficesPage() {
  return (
    <>
      <main className="plain-page">
        <Header />
        <section className="container page-panel">
          <p className="eyebrow">Customer Service</p>
          <h1>CEB Office Location</h1>
          <p className="page-intro">Find nearby customer service centres and area offices.</p>

          <div className="list-grid">
            {officeLocations.map((office) => (
              <article className="info-card" key={office.name}>
                <h2>{office.name}</h2>
                <p>{office.address}</p>
                <span>{office.hours}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
