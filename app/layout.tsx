import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MedicalProvider } from "@/contexts/medical-context"
import Header from "@/components/header"
import Footer from "@/components/footer"


export const metadata: Metadata = {
  title: "MediSuivi - Carnet de suivi médical",
  description: "Votre carnet de suivi médical digitalisé",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={` bg-gray-50 min-h-screen flex flex-col`}>
        <MedicalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MedicalProvider>
      </body>
    </html>
  )
}
