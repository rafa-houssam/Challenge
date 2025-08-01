import { Calendar, Clock, MapPin, User } from "lucide-react"

interface AppointmentCardProps {
  medecin: string
  specialite: string
  date: string
  heure: string
  lieu: string
  statut: "passe" | "a_venir"|string
  notes?: string
}

export default function AppointmentCard({
  medecin,
  specialite,
  date,
  heure,
  lieu,
  statut,
  notes,
}: AppointmentCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isUpcoming = statut === "a_venir"

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-6 ${
        isUpcoming ? "border-l-4 border-l-blue-500" : "border-l-4 border-l-gray-300"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{medecin}</h3>
            <span
              className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                isUpcoming ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {isUpcoming ? "À venir" : "Passé"}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{specialite}</p>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(date)}
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="h-4 w-4 mr-2" />
              {heure}
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="h-4 w-4 mr-2" />
              {lieu}
            </div>
          </div>

          {notes && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
