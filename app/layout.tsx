import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Portal",
  description: "Secure employee portal powered by Next.js & Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
