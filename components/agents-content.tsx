"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTemplateConfiguration } from "@/lib/hooks/use-template-configuration"
import { templateService } from "@/lib/services/template-service"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Plus,
  Settings,
  Play,
  Pause,
  Bot,
  Brain,
  Zap,
  TrendingUp,
  MessageSquare,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockAgents = [
  {
    id: "1",
    name: "Assistente de Vendas",
    description: "Especializado em qualificação de leads e follow-up de propostas",
    status: "active",
    performance: 92,
    conversations: 156,
    conversions: 23,
    specialization: ["Vendas", "Lead Qualification", "Follow-up"],
    lastActive: "2024-01-15T10:30:00",
    model: "GPT-4",
    temperature: 0.7,
    maxTokens: 1000,
  },
  {
    id: "2",
    name: "Suporte Técnico",
    description: "Resolve dúvidas técnicas e problemas de primeiro nível",
    status: "active",
    performance: 88,
    conversations: 234,
    conversions: 0,
    specialization: ["Suporte", "Troubleshooting", "FAQ"],
    lastActive: "2024-01-15T09:45:00",
    model: "GPT-3.5",
    temperature: 0.3,
    maxTokens: 800,
  },
  {
    id: "3",
    name: "Onboarding Assistant",
    description: "Guia novos clientes através do processo de configuração",
    status: "inactive",
    performance: 95,
    conversations: 89,
    conversions: 67,
    specialization: ["Onboarding", "Tutorial", "Setup"],
    lastActive: "2024-01-14T16:20:00",
    temperature: 0.5,
    maxTokens: 1200,
  },
]


const specializationOptions = [
  "Vendas",
  "Suporte",
  "Marketing",
  "Onboarding",
  "Lead Qualification",
  "Follow-up",
  "Troubleshooting",
  "FAQ",
  "Tutorial",
  "Setup",
]


export function AgentsContent() {
  const [agents, setAgents] = useState(mockAgents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAgent, setNewAgent] = useState({
    name: "",
    description: "",
    temperature: 0.7,
    specialization: "",
    templateId: "",
    productDataFile: null as File | null,
  })

  // Hook para gerenciar configuração de templates (Dependency Inversion Principle)
  const {
    templates,
    selectedTemplate,
    isConfigureDialogOpen,
    selectedAgentId,
    agentTemplate,
    setSelectedTemplate,
    openConfigureDialog,
    closeConfigureDialog,
    saveTemplateConfiguration,
  } = useTemplateConfiguration()

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleAgentStatus = (agentId: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === agentId ? { ...agent, status: agent.status === "active" ? "inactive" : "active" } : agent,
      ),
    )
  }

  const handleCreateAgent = () => {
    const agent = {
      id: Date.now().toString(),
      name: newAgent.name,
      description: newAgent.description,
      temperature: newAgent.temperature,
      specialization: [newAgent.specialization], // Converte string para array para compatibilidade
      status: "inactive" as const,
      performance: 0,
      conversations: 0,
      conversions: 0,
      lastActive: new Date().toISOString(),
      model: "gpt-3.5", // Modelo padrão
      maxTokens: 1000, // Valor padrão
    }
    
    // Configurar template se selecionado
    if (newAgent.templateId) {
      templateService.configureAgentTemplate(agent.id, newAgent.templateId)
    }
    
    setAgents([agent, ...agents])
    setNewAgent({
      name: "",
      description: "",
      temperature: 0.7,
      specialization: "",
      templateId: "",
      productDataFile: null,
    })
    setIsCreateDialogOpen(false)
  }


  const activeAgents = agents.filter((a) => a.status === "active").length
  const totalConversations = agents.reduce((sum, agent) => sum + agent.conversations, 0)
  const avgPerformance = agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Agentes I.A</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Agente I.A</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nome do Agente</label>
                <Input
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="Ex: Assistente de Vendas"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Descrição</label>
                <Textarea
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  placeholder="Descreva a função e especialidade do agente..."
                  className="min-h-20 w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Temperature: {newAgent.temperature}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={newAgent.temperature}
                  onChange={(e) => setNewAgent({ ...newAgent, temperature: Number.parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Conservador</span>
                  <span>Criativo</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Dados de Produtos (Excel)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setNewAgent({ ...newAgent, productDataFile: file });
                    }}
                    className="hidden"
                    id="product-data-file"
                  />
                  <label htmlFor="product-data-file" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-gray-600 mb-1">
                        {newAgent.productDataFile ? newAgent.productDataFile.name : "Clique para importar arquivo Excel"}
                      </p>
                      <p className="text-xs text-gray-500">Formatos aceitos: .xlsx, .xls</p>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Especialização</label>
                <Select value={newAgent.specialization} onValueChange={(value) => setNewAgent({ ...newAgent, specialization: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma especialização" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializationOptions.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Template</label>
                <Select value={newAgent.templateId} onValueChange={(value) => setNewAgent({ ...newAgent, templateId: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um template (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{template.name}</span>
                          <span className="text-xs text-gray-500">{template.category} • {template.type}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {newAgent.templateId && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Preview:</strong> {templates.find(t => t.id === newAgent.templateId)?.content}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleCreateAgent} 
                  disabled={!newAgent.name || !newAgent.description}
                  className="w-full sm:w-auto"
                >
                  Criar Agente
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Configuração de Template */}
        <Dialog open={isConfigureDialogOpen} onOpenChange={closeConfigureDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configurar Template do Agente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Selecionar Template</label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Escolha um template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{template.name}</span>
                          <span className="text-xs text-gray-500">{template.category} • {template.type}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedTemplate && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">Preview do Template</h4>
                  <p className="text-sm text-gray-600">
                    {templates.find(t => t.id === selectedTemplate)?.content}
                  </p>
                </div>
              )}

              {agentTemplate && (
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium mb-2 text-blue-800">Template Atual</h4>
                  <p className="text-sm text-blue-600">
                    {agentTemplate.name} ({agentTemplate.category})
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={closeConfigureDialog}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={saveTemplateConfiguration}
                  disabled={!selectedTemplate}
                  className="w-full sm:w-auto"
                >
                  Salvar Configuração
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agentes Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{activeAgents}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversas Totais</p>
                <p className="text-2xl font-bold text-gray-900">{totalConversations}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Performance Média</p>
                <p className="text-2xl font-bold text-gray-900">{avgPerformance.toFixed(0)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Economia Mensal</p>
                <p className="text-2xl font-bold text-gray-900">R$ 12.5k</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar agentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`/ai-robot-.jpg?height=48&width=48&query=AI robot ${agent.name}`} />
                    <AvatarFallback>
                      <Bot className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                        {agent.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => openConfigureDialog(agent.id)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar Template
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Brain className="w-4 h-4 mr-2" />
                      Treinar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                      {agent.status === "active" ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Ativar
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{agent.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span>{agent.performance}%</span>
                </div>
                <Progress value={agent.performance} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Conversas</p>
                  <p className="font-semibold">{agent.conversations}</p>
                </div>
                <div>
                  <p className="text-gray-500">Conversões</p>
                  <p className="font-semibold">{agent.conversions}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Especializações</p>
                <div className="flex flex-wrap gap-1">
                  {agent.specialization.slice(0, 3).map((spec) => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {agent.specialization.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.specialization.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-gray-500">
                  Última atividade: {new Date(agent.lastActive).toLocaleDateString("pt-BR")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Status:</span>
                  <Switch
                    checked={agent.status === "active"}
                    onCheckedChange={() => toggleAgentStatus(agent.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <Bot className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum agente encontrado</p>
        </div>
      )}
    </div>
  )
}
