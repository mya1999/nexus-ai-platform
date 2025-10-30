'use client';

import { AI_MODELS } from '@/lib/ai-models';
import { useState } from 'react';
import Card from '../ui/card';
import Badge from '../ui/badge';

interface ModelSelectorProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
}

export default function ModelSelector({ selectedModelId, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedModel = AI_MODELS.find(m => m.id === selectedModelId) || AI_MODELS[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3 bg-black/50 border border-white/20 rounded-xl
                   hover:bg-black/70 hover:border-white
                   transition-all duration-300 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 flex-1">
          <span className="text-3xl">{selectedModel.icon}</span>
          <div className="text-right flex-1">
            <div className="font-semibold text-white">{selectedModel.name}</div>
            <div className="text-xs text-gray-400">{selectedModel.description}</div>
          </div>
        </div>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card variant="glass" padding="sm" className="max-h-[70vh] overflow-y-auto luxury-scrollbar">
            <div className="grid gap-2">
              {AI_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onSelectModel(model.id);
                    setIsOpen(false);
                  }}
                  className={`
                    p-4 rounded-xl text-right transition-all duration-300
                    ${
                      model.id === selectedModelId
                        ? 'bg-white/10 border-2 border-white'
                        : 'bg-black/30 border border-white/20 hover:bg-black/50 hover:border-white/40'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{model.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">{model.name}</h4>
                        {model.id === selectedModelId && (
                          <Badge variant="success" size="sm">✓ محدد</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{model.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {model.capabilities.map((cap, i) => (
                          <Badge key={i} variant="neutral" size="sm">
                            {cap}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>📥 {model.pricing.input}$/1M</span>
                        <span>📤 {model.pricing.output}$/1M</span>
                        <span>📊 {(model.maxTokens / 1000).toFixed(0)}K tokens</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
      
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
