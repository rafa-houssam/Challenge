"use client"

import { useState } from "react"
import { Recommandation, useMedical } from "@/contexts/medical-context"
import HealthTipCard from "@/components/health-tip-card"
import FilterTabs from "@/components/filter-tabs"

export default function RecommandationsPage() {
  const { recommandations, loading } = useMedical()
  const [activeFilter, setActiveFilter] = useState("Toutes")

  const categories = ["Toutes", "Sommeil", "Nutrition", "Activité physique"]

  const filteredRecommandations = recommandations
    .filter((rec:Recommandation) => {
      if (activeFilter === "Toutes") return true
      return rec.categorie === activeFilter
    })
    .sort((a:Recommandation, b:Recommandation) => {
      // Trier par priorité puis par date
      const priorityOrder = { "haute": 3, "moyenne": 2, "basse": 1 }
      if (priorityOrder[a.priorite as keyof typeof priorityOrder] !== priorityOrder[b.priorite as keyof typeof priorityOrder]) {
        return priorityOrder[b.priorite as keyof typeof priorityOrder] - priorityOrder[a.priorite as keyof typeof priorityOrder]
      }
      return new Date(b.dateAjout).getTime() - new Date(a.dateAjout).getTime()
    })

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recommandations santé</h1>
        <p className="text-gray-600">Découvrez des conseils personnalisés pour améliorer votre bien-être</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <FilterTabs filters={categories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="p-6">
          {filteredRecommandations.length > 0 ? (
            <div className="space-y-6">
              {filteredRecommandations.map((rec:Recommandation) => (
                <HealthTipCard
                  key={rec.id}
                  titre={rec.titre}
                  description={rec.description}
                  categorie={rec.categorie}
                  priorite={rec.priorite}
                  dateAjout={rec.dateAjout}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune recommandation trouvée pour cette catégorie</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistiques par catégorie */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{recommandations.length}</div>
          <div className="text-sm text-gray-600">Total recommandations</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {recommandations.filter((r:Recommandation) => r.categorie === "Sommeil").length}
          </div>
          <div className="text-sm text-gray-600">Sommeil</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {recommandations.filter((r:Recommandation) => r.categorie === "Nutrition").length}
          </div>
          <div className="text-sm text-gray-600">Nutrition</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {recommandations.filter((r:Recommandation) => r.categorie === "Activité physique").length}
          </div>
          <div className="text-sm text-gray-600">Activité physique</div>
        </div>
      </div>

      {/* Conseils par priorité */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Répartition par priorité</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {recommandations.filter((r:Recommandation) => r.priorite === "haute").length}
            </div>
            <div className="text-sm text-gray-600">Priorité haute</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {recommandations.filter((r:Recommandation) => r.priorite === "moyenne").length}
            </div>
            <div className="text-sm text-gray-600">Priorité moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {recommandations.filter((r:Recommandation) => r.priorite === "basse").length}
            </div>
            <div className="text-sm text-gray-600">Priorité basse</div>
          </div>
        </div>
      </div>
    </div>
  )
}
