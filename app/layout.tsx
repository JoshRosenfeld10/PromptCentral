import "@styles/globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Central",
  description: "Discover & Share AI Prompts",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
