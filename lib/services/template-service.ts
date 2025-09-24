// Interface para Template (Interface Segregation Principle)
export interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  type: 'chat' | 'email' | 'phone';
}

// Interface para configuração de agente (Dependency Inversion Principle)
export interface AgentTemplateConfiguration {
  agentId: string;
  templateId: string;
  configuredAt: Date;
}

// Classe de serviço para gerenciar templates (Single Responsibility Principle)
export class TemplateService {
  private templates: Template[] = [
    {
      id: "1",
      name: "Boas-vindas Novo Cliente",
      category: "Vendas",
      content: "Olá {nome}! Seja bem-vindo(a) à ElloGrowth. Estamos muito felizes em tê-lo(a) conosco...",
      type: "chat",
    },
    {
      id: "2",
      name: "Follow-up Proposta",
      category: "Vendas",
      content: "Oi {nome}, espero que esteja bem! Gostaria de saber se teve a oportunidade de analisar nossa proposta...",
      type: "email",
    },
    {
      id: "3",
      name: "Suporte Técnico Inicial",
      category: "Suporte",
      content: "Olá! Recebi sua solicitação de suporte. Vou analisar seu caso e retornar em breve com uma solução...",
      type: "chat",
    },
    {
      id: "4",
      name: "Agendamento de Reunião",
      category: "Vendas",
      content: "Olá {nome}, gostaria de agendar uma reunião para apresentar nossa solução. Quando seria um bom horário?",
      type: "phone",
    },
  ];

  private configurations: AgentTemplateConfiguration[] = [];

  // Método para obter todos os templates (Open/Closed Principle)
  public getAllTemplates(): Template[] {
    return [...this.templates];
  }

  // Método para obter template por ID
  public getTemplateById(id: string): Template | undefined {
    return this.templates.find(template => template.id === id);
  }

  // Método para filtrar templates por categoria
  public getTemplatesByCategory(category: string): Template[] {
    return this.templates.filter(template => template.category === category);
  }

  // Método para configurar template para um agente
  public configureAgentTemplate(agentId: string, templateId: string): void {
    // Remove configuração existente se houver
    this.configurations = this.configurations.filter(config => config.agentId !== agentId);
    
    // Adiciona nova configuração
    this.configurations.push({
      agentId,
      templateId,
      configuredAt: new Date()
    });
  }

  // Método para obter configuração de template de um agente
  public getAgentTemplateConfiguration(agentId: string): AgentTemplateConfiguration | undefined {
    return this.configurations.find(config => config.agentId === agentId);
  }

  // Método para obter template configurado para um agente
  public getAgentTemplate(agentId: string): Template | undefined {
    const configuration = this.getAgentTemplateConfiguration(agentId);
    if (!configuration) return undefined;
    
    return this.getTemplateById(configuration.templateId);
  }

  // Método para criar novo template (Open/Closed Principle)
  public createTemplate(template: Omit<Template, 'id'>): Template {
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(), // Gera ID único
    };
    
    this.templates.push(newTemplate);
    return newTemplate;
  }

  // Método para obter categorias disponíveis
  public getAvailableCategories(): string[] {
    const categories = new Set(this.templates.map(template => template.category));
    return Array.from(categories);
  }

  // Método para obter tipos disponíveis
  public getAvailableTypes(): string[] {
    const types = new Set(this.templates.map(template => template.type));
    return Array.from(types);
  }
}

// Instância singleton do serviço (Singleton Pattern)
export const templateService = new TemplateService();
