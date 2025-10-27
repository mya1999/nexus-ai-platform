// AI Models Configuration & Management System
// تكوين وإدارة نماذج الذكاء الاصطناعي المتعددة

export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google';
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
    provider: 'openai',
    model: 'gpt-4-turbo-preview',
    description: 'أقوى نموذج من OpenAI - متعدد المهام',
    maxTokens: 128000,
    pricing: { input: 10, output: 30 },
    capabilities: ['نص', 'كود', 'تحليل', 'إبداع'],
    icon: '🤖',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    model: 'gpt-4',
    description: 'النموذج الأساسي - دقيق ومتوازن',
    maxTokens: 8192,
    pricing: { input: 30, output: 60 },
    capabilities: ['نص', 'كود', 'منطق'],
    icon: '🧠',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    description: 'سريع واقتصادي - للمهام اليومية',
    maxTokens: 16385,
    pricing: { input: 0.5, output: 1.5 },
    capabilities: ['نص', 'محادثة سريعة'],
    icon: '⚡',
    color: 'from-gray-500 to-slate-600',
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    model: 'claude-3-opus-20240229',
    description: 'الأكثر ذكاءً من Anthropic - تحليل عميق',
    maxTokens: 200000,
    pricing: { input: 15, output: 75 },
    capabilities: ['نص', 'كود', 'تحليل معقد', 'بحث'],
    icon: '🎭',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'anthropic',
    model: 'claude-3-sonnet-20240229',
    description: 'متوازن - سرعة ودقة',
    maxTokens: 200000,
    pricing: { input: 3, output: 15 },
    capabilities: ['نص', 'كود', 'محادثة'],
    icon: '🎨',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    model: 'gemini-pro',
    description: 'من Google - متعدد الوسائط',
    maxTokens: 32000,
    pricing: { input: 0.5, output: 1.5 },
    capabilities: ['نص', 'صور', 'فيديو', 'كود'],
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

export function estimateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): number {
  const model = getModelById(modelId);
  if (!model) return 0;
  
  return (
    (inputTokens / 1000000) * model.pricing.input +
    (outputTokens / 1000000) * model.pricing.output
  );
}
