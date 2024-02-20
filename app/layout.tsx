import "@styles/globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Session } from "next-auth";

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
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
