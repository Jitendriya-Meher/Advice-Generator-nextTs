import type { Metadata } from "next";
import { Inter,Manrope } from "next/font/google";
import "./globals.css";
import CustomProvider from "./CustomProvider";


const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] , variable:"--manrope"});

export const metadata: Metadata = {
  title: "Advice Generator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CustomProvider>
        <body className={manrope.variable}>{children}</body>
      </CustomProvider>
    </html>
  );
}
