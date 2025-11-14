// AI Models Configuration & Management System
// تكوين وإدارة نماذج الذكاء الاصطناعي المتعددة

export interface AIModel {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google';
  model: string;
  description: string;
  maxTokens: number;
  pricing: {
    input: number;
    output: number;
  };
  capabilities: string[];
  icon: string;
  color: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    model: 'gpt-4-turbo-preview',
    description: 'Most powerful OpenAI model - Multi-task',
    maxTokens: 128000,
    pricing: { input: 10, output: 30 },
    capabilities: ['Text', 'Code', 'Analysis', 'Creative'],
    icon: '🤖',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    model: 'gpt-4',
    description: 'Base model - Accurate and balanced',
    maxTokens: 8192,
    pricing: { input: 30, output: 60 },
    capabilities: ['Text', 'Code', 'Logic'],
    icon: '🧠',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    model: 'gpt-3.5-turbo',
    description: 'Fast and economical - For everyday tasks',
    maxTokens: 16385,
    pricing: { input: 0.5, output: 1.5 },
    capabilities: ['Text', 'Quick chat'],
    icon: '⚡',
    color: 'from-gray-500 to-slate-600',
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    model: 'claude-3-opus-20240229',
    description: 'Most intelligent from Anthropic - Deep analysis',
    maxTokens: 200000,
    pricing: { input: 15, output: 75 },
    capabilities: ['Text', 'Code', 'Complex analysis', 'Research'],
    icon: '🎭',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    model: 'claude-3-sonnet-20240229',
    description: 'Balanced - Speed and accuracy',
    maxTokens: 200000,
    pricing: { input: 3, output: 15 },
    capabilities: ['Text', 'Code', 'Chat'],
    icon: '🎨',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    model: 'gemini-pro',
    description: 'From Google - Multimodal',
    maxTokens: 32000,
    pricing: { input: 0.5, output: 1.5 },
    capabilities: ['Text', 'Images', 'Video', 'Code'],
    icon: '✨',
    color: 'from-yellow-500 to-orange-600',
  },
];

export const DEFAULT_MODEL = 'gpt-4-turbo';

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find(model => model.id === id);
}

export function getModelsByProvider(provider: string): AIModel[] {
  return AI_MODELS.filter(model => model.provider === provider);
}

export function estimateCost(modelId: string, inputTokens: number, outputTokens: number): number {
  const model = getModelById(modelId);
  if (!model) return 0;

  return (
    (inputTokens / 1000000) * model.pricing.input + (outputTokens / 1000000) * model.pricing.output
  );
}
