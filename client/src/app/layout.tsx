import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Rent",
  description: "Car Renting Application",
};


export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(options);

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
