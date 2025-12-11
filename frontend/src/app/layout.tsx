import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Application",
  description: "A simple full-stack e-commerce order management system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full w-full bg-slate-100'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full w-full bg-slate-100 text-gray-900 antialiased`}
      >
        <div className='min-h-screen w-full bg-slate-100 flex flex-col'>
          <main className='flex-1 w-full'>{children}</main>
          <Toaster position='top-right' />
        </div>
      </body>
    </html>
  );
}
