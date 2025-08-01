import { Lightbulb, AlertCircle, Info } from "lucide-react"

interface HealthTipCardProps {
  titre: string
  description: string
  categorie: "Sommeil" | "Nutrition" | "Activité physique"|string
  priorite: "haute" | "moyenne" | "basse"|string
  dateAjout: string
}

export default function HealthTipCard({ titre, description, categorie, priorite, dateAjout }: HealthTipCardProps) {
  const getPriorityIcon = () => {
    switch (priorite) {
      case "haute":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "moyenne":
        return <Info className="h-5 w-5 text-yellow-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-green-500" />
    }
  }

  const getPriorityColor = () => {
    switch (priorite) {
      case "haute":
        return "border-l-red-500 bg-red-50"
      case "moyenne":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-green-500 bg-green-50"
    }
  }

  const getCategoryColor = () => {
    switch (categorie) {
      case "Sommeil":
        return "bg-purple-100 text-purple-800"
      case "Nutrition":
        return "bg-green-100 text-green-800"
      case "Activité physique":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-l-4 p-6 ${getPriorityColor()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          {getPriorityIcon()}
          <h3 className="ml-2 text-lg font-semibold text-gray-900">{titre}</h3>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor()}`}>{categorie}</span>
      </div>

      <p className="text-gray-700 mb-3">{description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Priorité: {priorite}</span>
        <span>Ajouté le {new Date(dateAjout).toLocaleDateString("fr-FR")}</span>
      </div>
    </div>
  )
}
