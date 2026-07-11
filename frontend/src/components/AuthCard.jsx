import { VoltIcon } from "./Logo";

export default function AuthCard({ heading, children }) {
  return (
    <div className="auth-card">
      <div className="auth-card-brand">
        <VoltIcon size={62} />
        <h2>{heading || "VOLTPAY"}</h2>
      </div>
      {children}
    </div>
  );
}
