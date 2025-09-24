import { useState, useCallback } from 'react';
import { templateService, Template, AgentTemplateConfiguration } from '@/lib/services/template-service';

// Interface para criação de template (Interface Segregation Principle)
export interface CreateTemplateData {
  name: string;
  category: string;
  content: string;
  type: 'chat' | 'email' | 'phone';
}

// Interface para o estado do hook (Interface Segregation Principle)
export interface UseTemplateConfigurationReturn {
  templates: Template[];
  selectedTemplate: string;
  isConfigureDialogOpen: boolean;
  selectedAgentId: string | null;
  agentTemplate: Template | undefined;
  setSelectedTemplate: (templateId: string) => void;
  openConfigureDialog: (agentId: string) => void;
  closeConfigureDialog: () => void;
  saveTemplateConfiguration: () => void;
  getTemplatesByCategory: (category: string) => Template[];
  createTemplate: (templateData: CreateTemplateData) => Template;
  getAvailableCategories: () => string[];
  getAvailableTypes: () => string[];
}

// Hook customizado para gerenciar configuração de templates (Single Responsibility Principle)
export const useTemplateConfiguration = (): UseTemplateConfigurationReturn => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState<boolean>(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  // Obter todos os templates
  const templates = templateService.getAllTemplates();

  // Obter template configurado para o agente selecionado
  const agentTemplate = selectedAgentId ? templateService.getAgentTemplate(selectedAgentId) : undefined;

  // Abrir modal de configuração (Open/Closed Principle)
  const openConfigureDialog = useCallback((agentId: string) => {
    setSelectedAgentId(agentId);
    setIsConfigureDialogOpen(true);
    
    // Pré-selecionar template atual se houver
    const currentTemplate = templateService.getAgentTemplate(agentId);
    if (currentTemplate) {
      setSelectedTemplate(currentTemplate.id);
    } else {
      setSelectedTemplate('');
    }
  }, []);

  // Fechar modal de configuração
  const closeConfigureDialog = useCallback(() => {
    setIsConfigureDialogOpen(false);
    setSelectedAgentId(null);
    setSelectedTemplate('');
  }, []);

  // Salvar configuração de template (Dependency Inversion Principle)
  const saveTemplateConfiguration = useCallback(() => {
    if (selectedAgentId && selectedTemplate) {
      templateService.configureAgentTemplate(selectedAgentId, selectedTemplate);
      closeConfigureDialog();
    }
  }, [selectedAgentId, selectedTemplate, closeConfigureDialog]);

  // Obter templates por categoria
  const getTemplatesByCategory = useCallback((category: string) => {
    return templateService.getTemplatesByCategory(category);
  }, []);

  // Criar novo template (Single Responsibility Principle)
  const createTemplate = useCallback((templateData: CreateTemplateData) => {
    return templateService.createTemplate(templateData);
  }, []);

  // Obter categorias disponíveis
  const getAvailableCategories = useCallback(() => {
    return templateService.getAvailableCategories();
  }, []);

  // Obter tipos disponíveis
  const getAvailableTypes = useCallback(() => {
    return templateService.getAvailableTypes();
  }, []);

  return {
    templates,
    selectedTemplate,
    isConfigureDialogOpen,
    selectedAgentId,
    agentTemplate,
    setSelectedTemplate,
    openConfigureDialog,
    closeConfigureDialog,
    saveTemplateConfiguration,
    getTemplatesByCategory,
    createTemplate,
    getAvailableCategories,
    getAvailableTypes,
  };
};
