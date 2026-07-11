export function CebLogo({ className = "" }) {
  return (
    <img
      src="/images/ceb-logo.png"
      alt="Ceylon Electricity Board"
      className={`ceb-logo ${className}`}
    />
  );
}

export function VoltpayLogo({ className = "" }) {
  return (
    <img
      src="/images/voltpay-logo.png"
      alt="VOLTPAY"
      className={`voltpay-logo ${className}`}
    />
  );
}

export function VoltIcon({ size = 54 }) {
  return (
    <span className="volt-icon" style={{ width: size, height: size }}>
      <span>ϟ</span>
    </span>
  );
}
