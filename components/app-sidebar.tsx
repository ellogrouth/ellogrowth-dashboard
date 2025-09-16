"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  BookTemplate as FileTemplate,
  Users,
  Bot,
  LogOut,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Chats",
    icon: MessageCircle,
    href: "/chats",
  },
  {
    title: "Relatórios",
    icon: FileText,
    href: "/relatorios",
  },
  {
    title: "Templates",
    icon: FileTemplate,
    href: "/templates",
  },
  {
    title: "CRM",
    icon: Users,
    href: "/crm",
  },
  {
    title: "Agentes I.A",
    icon: Bot,
    href: "/agentes",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarContent className="px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 px-2">
            <Link href="/">
              <Image
                src="ellogrowth_logo.svg"
                alt="ElloGrowth Logo"
                width={400}
                height={100}
  
              />
            </Link>
          </div>
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={`w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
