import "./globals.css";

export const metadata = {
  title: "VOLTPAY | Ceylon Electricity Board",
  description: "Smart electricity management frontend for CEB users."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
