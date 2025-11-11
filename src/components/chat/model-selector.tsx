'use client';

import { AI_MODELS } from '@/lib/ai-models';
import { useState } from 'react';
import Badge from '../ui/badge';
import Card from '../ui/card';

interface ModelSelectorProps {
  readonly selectedModelId: string;
  readonly onSelectModel: (modelId: string) => void;
}

export default function ModelSelector({ selectedModelId, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedModel = AI_MODELS.find(m => m.id === selectedModelId) || AI_MODELS[0];

  // أيقونات واقعية احترافية لكل نموذج
  const modelIcons: Record<string, string> = {
    'gpt-4': '🧠',
    'gpt-3.5-turbo': '⚡',
    'claude-3-opus': '🎯',
    'claude-3-sonnet': '🎨',
    'gemini-pro': '💎',
  };

  return (
    <div className="relative w-full">
      {/* زر الاختيار المدمج - تصميم مينيمال احترافي */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-full flex items-center justify-between gap-3
                   px-4 py-2.5 bg-gradient-to-r from-slate-900/95 to-slate-800/95
                   border border-slate-700/50 rounded-lg
                   hover:border-slate-500/80 hover:shadow-lg hover:shadow-slate-500/20
                   transition-all duration-300 ease-out
                   backdrop-blur-sm"
      >
        {/* الأيقونة والنص */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {/* أيقونة احترافية */}
          <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center
                          bg-gradient-to-br from-blue-500/20 to-purple-500/20
                          rounded-lg border border-blue-400/30
                          group-hover:border-blue-400/50 group-hover:shadow-md group-hover:shadow-blue-400/20
                          transition-all duration-300">
            <span className="text-base">{modelIcons[selectedModel.id] || '🤖'}</span>
          </div>

          {/* اسم النموذج */}
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-semibold text-slate-100 truncate">
              {selectedModel.name}
            </div>
          </div>
        </div>

        {/* سهم القائمة المنسدلة */}
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0
                     ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>


      {/* القائمة المنسدلة - تصميم احترافي عالي الدقة */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            aria-label="Close model selector"
          />

          {/* القائمة */}
          <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <Card
              variant="glass"
              padding="sm"
              className="max-h-[420px] overflow-y-auto shadow-2xl shadow-slate-900/50
                         border-slate-700/50 backdrop-blur-xl bg-slate-900/98
                         scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/50"
            >
              <div className="grid gap-2 p-2">
                {AI_MODELS.map((model) => {
                  const isSelected = model.id === selectedModelId;

                  return (
                    <button
                      key={model.id}
                      onClick={() => {
                        onSelectModel(model.id);
                        setIsOpen(false);
                      }}
                      className={`
                        group relative w-full text-left
                        px-3 py-2.5 rounded-lg
                        transition-all duration-200 ease-out
                        ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/10'
                            : 'bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/70 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="flex items-start gap-2.5">
                        {/* الأيقونة */}
                        <div className={`
                          flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                          transition-all duration-200
                          ${
                            isSelected
                              ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-400/40 shadow-md shadow-blue-400/20'
                              : 'bg-slate-700/30 border border-slate-600/30 group-hover:border-slate-500/50'
                          }
                        `}>
                          <span className="text-base">{modelIcons[model.id] || '🤖'}</span>
                        </div>

                        {/* المحتوى */}
                        <div className="flex-1 min-w-0">
                          {/* الاسم والشارة */}
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className={`text-sm font-semibold truncate ${
                              isSelected ? 'text-blue-100' : 'text-slate-100'
                            }`}>
                              {model.name}
                            </h4>

                            {isSelected && (
                              <Badge variant="success" size="sm" className="flex-shrink-0">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </Badge>
                            )}
                          </div>

                          {/* الوصف */}
                          <p className="text-[11px] text-slate-400 mb-1.5 line-clamp-1 leading-snug">
                            {model.description}
                          </p>

                          {/* القدرات */}
                          <div className="flex flex-wrap gap-1 mb-1.5">
                            {model.capabilities.slice(0, 3).map((cap) => (
                              <Badge
                                key={cap}
                                variant="neutral"
                                size="sm"
                                className="text-[9px] px-1.5 py-0.5 leading-none"
                              >
                                {cap}
                              </Badge>
                            ))}
                          </div>

                          {/* المعلومات */}
                          <div className="flex items-center gap-2.5 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              {(model.maxTokens / 1000).toFixed(0)}K
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              ${model.pricing.input}/1M
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
