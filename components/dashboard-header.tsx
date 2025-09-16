import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Bom dia, User</span>
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
