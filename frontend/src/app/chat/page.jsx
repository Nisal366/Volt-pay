import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ChatPage() {
  return (
    <>
      <main className="plain-page">
        <Header />
        <section className="container page-panel">
          <p className="eyebrow">Help Desk</p>
          <h1>Chat With Us</h1>
          <p className="page-intro">Frontend chat mockup for quick customer support.</p>

          <div className="chat-box">
            <div className="chat-message bot">Hello, how can VOLTPAY help you today?</div>
            <div className="chat-message user">I want to check my smart meter connection.</div>
            <div className="chat-message bot">Please enter your account number or premises ID.</div>
            <div className="chat-input">
              <input placeholder="Type your message" />
              <button className="yellow-btn">Send</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
