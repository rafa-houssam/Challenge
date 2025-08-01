"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Calendar, FileText, Lightbulb } from "lucide-react"
import { useMedical } from "@/contexts/medical-context"

export default function Header() {
  const pathname = usePathname()
  const { patient } = useMedical()

  const navigation = [
    { name: "Accueil", href: "/", icon: Heart },
    { name: "Rendez-vous", href: "/rendez-vous", icon: Calendar },
    { name: "Dossier médical", href: "/dossier", icon: FileText },
    { name: "Recommandations", href: "/recommandations", icon: Lightbulb },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">MediSuivi</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {patient && (
            <div className="text-sm text-gray-700">
              Bonjour, <span className="font-medium">{patient.prenom}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
