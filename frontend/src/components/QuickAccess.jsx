import Link from "next/link";
import IconBadge from "./IconBadge";
import { quickAccessLinks } from "@/lib/mockData";

export default function QuickAccess() {
  return (
    <section className="quick-section section">
      <div className="container">
        <h2>Quick Access</h2>
        <div className="quick-grid">
          {quickAccessLinks.map((item) => (
            <Link className="quick-card" href={item.href} key={item.title}>
              <IconBadge icon={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
