import { Work_Sans } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

// Initialize Work Sans
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "lendsqr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={workSans.className}>
      <body className={workSans.className}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#fbfbfb",
            fontFamily: "var(--font-work-sans)",
          }}
        >
          <Navbar />
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "20px", overflow: "auto" }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
