import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  color: string
  progress?: number
}

export function MetricCard({ title, value, color, progress }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${progress || 100}%` }}></div>
        </div>
      </CardContent>
    </Card>
  )
}
