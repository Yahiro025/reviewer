import { Orbitron, Fira_Code } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata = {
  title: "C Practice Platform",
  description: "Web-based educational platform for C programming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${firaCode.variable}`}>
      <body>{children}</body>
    </html>
  );
}
