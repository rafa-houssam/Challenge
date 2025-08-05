"use client"

import { useMedical } from "@/contexts/medical-context"
import { AlertTriangle, Pill, FileText, Calendar } from "lucide-react"

export default function DossierPage() {
  const { dossier, loading } = useMedical()

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!dossier) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500">Impossible de charger le dossier médical</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon dossier médical</h1>
        <p className="text-gray-600">Consultez votre historique médical complet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Antécédents médicaux */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">Antécédents médicaux</h2>
            </div>  
            {/* antecedants */}
          </div>
          <div className="p-6">
            {dossier.antecedents.length > 0 ? (
              <div className="space-y-4">
                {dossier.antecedents.map((antecedent) => (
                  <div key={antecedent.id} className="border-l-4 border-l-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-blue-600">{antecedent.type}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(antecedent.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <p className="text-gray-900">{antecedent.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Aucun antécédent médical</p>
            )}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">Allergies</h2>
            </div>
          </div>
          <div className="p-6">
            {dossier.allergies.length > 0 ? (
              <div className="space-y-4">
                {dossier.allergies.map((allergie) => (
                  <div key={allergie.id} className="border-l-4 border-l-red-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{allergie.nom}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          allergie.severite === "Élevée" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {allergie.severite}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{allergie.reaction}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Aucune allergie connue</p>
            )}
          </div>
        </div>

        {/* Traitements en cours */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <Pill className="h-6 w-6 text-green-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">Traitements</h2>
            </div>
          </div>
          <div className="p-6">
            {dossier.traitements.length > 0 ? (
              <div className="space-y-4">
                {dossier.traitements.map((traitement) => (
                  <div
                    key={traitement.id}
                    className={`border-l-4 pl-4 py-2 ${traitement.fin ? "border-l-gray-400" : "border-l-green-500"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{traitement.medicament}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          traitement.fin ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {traitement.fin ? "Terminé" : "En cours"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{traitement.posologie}</p>
                    <div className="text-xs text-gray-500">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Début: {new Date(traitement.debut).toLocaleDateString("fr-FR")}
                      </div>
                      {traitement.fin && (
                        <div className="flex items-center mb-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Fin: {new Date(traitement.fin).toLocaleDateString("fr-FR")}
                        </div>
                      )}
                      <p>Prescrit par: {traitement.prescripteur}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Aucun traitement en cours</p>
            )}
          </div>
        </div>
      </div>

      
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Résumé du dossier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{dossier.antecedents.length}</div>
            <div className="text-sm text-gray-600">Antécédents médicaux</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{dossier.allergies.length}</div>
            <div className="text-sm text-gray-600">Allergies connues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{dossier.traitements.filter((t) => !t.fin).length}</div>
            <div className="text-sm text-gray-600">Traitements en cours</div>
          </div>
        </div>
      </div>
    </div>
  )
}
