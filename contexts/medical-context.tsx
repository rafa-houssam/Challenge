"use client"

import RendezVousPage from "@/app/rendez-vous/page"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

//definition of the attributes of the main element of the app

interface Patient {
  id: number
  prenom: string
  nom: string
  dateNaissance: string
  email: string
  telephone: string
}

interface RendezVous {
  id: number
  medecin: string
  specialite: string
  date: string
  heure: string
  lieu: string
  statut: "passe" | "a_venir"|string
  notes: string
}

interface Antecedent {
  id: number
  type: string
  description: string
  date: string
}

interface Allergie {
  id: number
  nom: string
  severite: string
  reaction: string
}

interface Traitement {
  id: number
  medicament: string
  posologie: string
  debut: string
  fin: string | null
  prescripteur: string
}

interface DossierMedical {
  antecedents: Antecedent[]
  allergies: Allergie[]
  traitements: Traitement[]
}

 export interface Recommandation {
  id: number
  titre: string
  description: string
  categorie: "Sommeil" | "Nutrition" | "Activité physique"| string
  priorite: "haute" | "moyenne" | "basse"| string
  dateAjout: string
}

interface MedicalContextType {
  patient: Patient | null
  rendezVous: RendezVous[]|null
  dossier: DossierMedical | null
  recommandations: Recommandation[]|string|any
  loading: boolean
}

const MedicalContext = createContext<MedicalContextType | undefined>(undefined)
// 	encapsuler
export function MedicalProvider({ children }: { children: ReactNode }) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([])
  const [dossier, setDossier] = useState<DossierMedical | null>(null)
  const [recommandations, setRecommandations] = useState<Recommandation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientRes, rendezVousRes, dossierRes, recommandationsRes] = await Promise.all([
          import("@/data/patient.json"),
          import("@/data/rendezvous.json"),
          import("@/data/dossier.json"),
          import("@/data/recommandations.json"),
        ])

        setPatient(patientRes.default)
        setRendezVous(rendezVousRes.default)
        setDossier(dossierRes.default)
        setRecommandations(recommandationsRes.default)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <MedicalContext.Provider
      value={{
        patient,
        rendezVous,
        dossier,
        recommandations,
        loading,
      }}
    >
      {children}
    </MedicalContext.Provider>
  )
}

export function useMedical() {
  const context = useContext(MedicalContext)
  if (context === undefined) {
    throw new Error("")
  }
  return context
}
