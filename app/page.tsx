"use client"

import { useMedical } from "@/contexts/medical-context"
import { Calendar, Heart, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"


export default function HomePage() {
  const { patient, rendezVous, recommandations, loading } = useMedical()

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const prochainRendezVous = rendezVous!
    .filter((rdv) => rdv.statut === "a_venir")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  const dernierRendezVous = rendezVous!
    .filter((rdv) => rdv.statut === "passe")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

  const recommandationDuJour =
    Array.isArray(recommandations)
      ? recommandations.filter((rec: any) => rec.priorite === "haute")[0] || recommandations[0]
      : undefined

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour {patient?.prenom} ! 👋</h1>
        <p className="text-gray-600">Voici un aperçu de votre suivi médical</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="ml-2 text-lg font-semibold text-gray-900">Prochain rendez-vous</h2>
          </div>
          {prochainRendezVous ? (
            <div>
              <p className="font-medium text-gray-900">{prochainRendezVous.medecin}</p>
              <p className="text-sm text-gray-600">{prochainRendezVous.specialite}</p>
              <p className="text-sm text-gray-600 mt-2">
                {new Date(prochainRendezVous.date).toLocaleDateString("fr-FR")} à {prochainRendezVous.heure}
              </p>
              <Link
                href="/rendez-vous"
                className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Voir tous les rendez-vous →
              </Link>
            </div>
          ) : (
            <p className="text-gray-500">Aucun rendez-vous programmé</p>
          )}
        </div>

        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-green-600" />
            <h2 className="ml-2 text-lg font-semibold text-gray-900">Dernier rendez-vous</h2>
          </div>
          {dernierRendezVous ? (
            <div>
              <p className="font-medium text-gray-900">{dernierRendezVous.medecin}</p>
              <p className="text-sm text-gray-600">{dernierRendezVous.specialite}</p>
              <p className="text-sm text-gray-600 mt-2">
                {new Date(dernierRendezVous.date).toLocaleDateString("fr-FR")}
              </p>
              {dernierRendezVous.notes && (
                <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">{dernierRendezVous.notes}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Aucun rendez-vous passé</p>
          )}
        </div>

        {/* Recommandation du jour */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Lightbulb className="h-6 w-6 text-yellow-600" />
            <h2 className="ml-2 text-lg font-semibold text-gray-900">Conseil du jour</h2>
          </div>
          {recommandationDuJour ? (
            <div>
              <p className="font-medium text-gray-900 mb-2">{recommandationDuJour.titre}</p>
              <p className="text-sm text-gray-700">{recommandationDuJour.description}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {recommandationDuJour.categorie}
              </span>
              <Link
                href="/recommandations"
                className="block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Voir toutes les recommandations →
              </Link>
            </div>
          ) : (
            <p className="text-gray-500">Aucune recommandation disponible</p>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/rendez-vous"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Mes rendez-vous</p>
              <p className="text-sm text-gray-600">Gérer mes consultations</p>
            </div>
          </Link>

          <Link href="/dossier" className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <Heart className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Dossier médical</p>
              <p className="text-sm text-gray-600">Consulter mon historique</p>
            </div>
          </Link>

          <Link
            href="/recommandations"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Lightbulb className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Recommandations</p>
              <p className="text-sm text-gray-600">Conseils personnalisés</p>
            </div>
          </Link>

          
        </div>
      </div>
    </div>
  )
}
