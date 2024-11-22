import { Header } from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Week8 Talker",
  description: "Talker in next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
