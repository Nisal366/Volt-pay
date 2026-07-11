import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { issueTypes } from "@/lib/mockData";

export default function ReportIssuePage() {
  return (
    <>
      <main className="plain-page">
        <Header />
        <section className="container page-panel">
          <p className="eyebrow">Service Request</p>
          <h1>Report an Issue</h1>
          <p className="page-intro">
            Use this form to report outages, meter faults, and billing problems.
          </p>

          <form className="service-form">
            <label>
              Issue Type
              <select defaultValue="">
                <option value="" disabled>Select issue type</option>
                {issueTypes.map((type) => (
                  <option value={type} key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              Account Number
              <input placeholder="Enter account number" />
            </label>
            <label>
              Description
              <textarea placeholder="Explain the issue" />
            </label>
            <button className="gradient-btn" type="button">Submit Report</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
