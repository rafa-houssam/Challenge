"use client"

import { useState } from "react"
import { useMedical } from "@/contexts/medical-context"
import AppointmentCard from "@/components/appointment-card"
import FilterTabs from "@/components/filter-tabs"

export default function RendezVousPage() {
  const { rendezVous, loading } = useMedical() //react hook
  const [activeFilter, setActiveFilter] = useState("Tous")

  const filters = ["Tous", "À venir", "Passés"]

  const filteredRendezVous = rendezVous!
    .filter((rdv) => {
      if (activeFilter === "À venir") return rdv.statut === "a_venir"
      if (activeFilter === "Passés") return rdv.statut === "passe"
      return true
    })
    .sort((a, b) => {
      // Trier par date décroissante (plus récent en premier)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes rendez-vous</h1>
        <p className="text-gray-600">Consultez vos rendez-vous passés et à venir</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <FilterTabs filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="p-6">
          {filteredRendezVous.length > 0 ? (
            <div className="space-y-6">
              {filteredRendezVous.map((rdv) => (
                <AppointmentCard
                  key={rdv.id}
                  medecin={rdv.medecin}
                  specialite={rdv.specialite}
                  date={rdv.date}
                  heure={rdv.heure}
                  lieu={rdv.lieu}
                  statut={rdv.statut}
                  notes={rdv.notes}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {activeFilter === "À venir" && "Aucun rendez-vous à venir"}
                {activeFilter === "Passés" && "Aucun rendez-vous passé"}
                {activeFilter === "Tous" && "Aucun rendez-vous trouvé"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Statistiques */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {rendezVous!.filter((rdv) => rdv.statut === "a_venir").length}
          </div>
          <div className="text-sm text-gray-600">Rendez-vous à venir</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {rendezVous!.filter((rdv) => rdv.statut === "passe").length}
          </div>
          <div className="text-sm text-gray-600">Rendez-vous passés</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(rendezVous!.map((rdv) => rdv.specialite)).size}
          </div>
          <div className="text-sm text-gray-600">Spécialités consultées</div>
        </div>
      </div>
    </div>
  )
}
