import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-app",
});

export const metadata: Metadata = {
  title: "Court Click Notarise",
  description: "Court Click notarisation flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
