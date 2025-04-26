
import { create } from 'zustand';

interface Assistant {
  id: string;
  name: string;
  description: string;
  firstMessage: string;
  provider: string;
  model: string;
}

interface AssistantStore {
  selectedAssistant: Assistant | null;
  assistants: Assistant[];
  setSelectedAssistant: (assistant: Assistant) => void;
  addAssistant: (assistant: Assistant) => void;
  updateAssistant: (id: string, updates: Partial<Assistant>) => void;
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  selectedAssistant: {
    id: "c139d93-7a62-4c6b-8bd4-ab59603f15f4",
    name: "Riley",
    description: "Elliot",
    firstMessage: "Thank you for calling Wellness Partners. This is Riley, your scheduling assistant.",
    provider: "openai",
    model: "gpt-4",
  },
  assistants: [{
    id: "c139d93-7a62-4c6b-8bd4-ab59603f15f4",
    name: "Riley",
    description: "Elliot",
    firstMessage: "Thank you for calling Wellness Partners. This is Riley, your scheduling assistant.",
    provider: "openai",
    model: "gpt-4",
  }],
  setSelectedAssistant: (assistant) => set({ selectedAssistant: assistant }),
  addAssistant: (assistant) => set((state) => ({ 
    assistants: [...state.assistants, assistant] 
  })),
  updateAssistant: (id, updates) => set((state) => ({
    assistants: state.assistants.map(a => 
      a.id === id ? { ...a, ...updates } : a
    ),
    selectedAssistant: state.selectedAssistant?.id === id ? 
      { ...state.selectedAssistant, ...updates } : 
      state.selectedAssistant
  })),
}));
