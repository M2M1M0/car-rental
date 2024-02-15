import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Rent",
  description: "Car Renting Application",
};

export default function RootLayout({
  children, session
}: Readonly<{
  children: React.ReactNode;
  session: any
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <main className="min-h-[80vh]">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
