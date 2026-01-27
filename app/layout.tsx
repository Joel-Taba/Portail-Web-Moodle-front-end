import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ENSPY Admin Portal - Gestion des cours",
  description: "Portail d'administration pour la gestion des cours en ligne de l'École Nationale Supérieure Polytechnique de Yaoundé",
  keywords: ["ENSPY", "cours", "administration", "formation", "Yaoundé", "polytechnique"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.variable}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
