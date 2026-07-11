import Link from "next/link";
import { CebLogo, VoltpayLogo } from "./Logo";

export default function AuthShell({ title, children }) {
  return (
    <main className="auth-shell">
      <div className="auth-topbar">
        <Link href="/">
          <CebLogo />
        </Link>
        <Link href="/">
          <VoltpayLogo />
        </Link>
      </div>

      <section className="auth-layout">
        <div className="auth-copy">
          <h1>{title}</h1>
        </div>
        {children}
      </section>
    </main>
  );
}
