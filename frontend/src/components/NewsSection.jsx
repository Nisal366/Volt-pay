export default function NewsSection() {
  return (
    <section className="news-section section">
      <div className="container">
        <div className="section-title-row">
          <h2>Latest News</h2>
          <button className="text-button">View All</button>
        </div>

        <div className="news-card">
          <img
            src="/images/solar-banner.png"
            alt="CEB introduces new solar tariffs to support small installations"
          />
        </div>
      </div>
    </section>
  );
}
