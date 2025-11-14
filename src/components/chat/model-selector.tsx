'use client';

import { AI_MODELS } from '@/lib/ai-models';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Badge from '../ui/badge';
import Card from '../ui/card';

interface ModelSelectorProps {
  readonly selectedModelId: string;
  readonly onSelectModel: (modelId: string) => void;
}

export default function ModelSelector({ selectedModelId, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedModel = AI_MODELS.find(m => m.id === selectedModelId) || AI_MODELS[0];

  // تحديد اتجاه فتح القائمة (للأعلى أو للأسفل) وحساب موضع ثابت يمنع الانقصاص من الشاشة
  useEffect(() => {
    function positionMenu() {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // أبعاد القائمة المتوقعة
      const estimatedHeight = 420; // نفس max-height
      const gap = 8;

      const spaceBelow = viewportH - rect.bottom;
      const spaceAbove = rect.top;
      const shouldOpenUp = spaceBelow < 320 && spaceAbove > spaceBelow; // عتبة عملية
      setOpenUpward(shouldOpenUp);

      // العرض يطابق عرض الزر مع حد أدنى/أقصى منطقي
      const width = Math.min(Math.max(rect.width, 280), 520);

      // الموضع الأفقي: تأكد من عدم تجاوز الحافة اليمنى
      let left = rect.left;
      if (left + width > viewportW - 12) {
        left = Math.max(12, viewportW - width - 12);
      }

      // الموضع العمودي
      let top = shouldOpenUp
        ? rect.top - Math.min(estimatedHeight, spaceAbove - gap) - gap
        : rect.bottom + gap;
      // في حال الفتح للأسفل مع مساحة أقل من المقدرة، ارفع للأعلى ضمن المتاح
      if (!shouldOpenUp && top + estimatedHeight > viewportH - 12) {
        top = Math.max(gap, viewportH - estimatedHeight - 12);
      }

      setMenuStyle({
        position: 'fixed',
        top,
        left,
        width,
        zIndex: 9999,
      });
    }

    if (isOpen) {
      positionMenu();
      window.addEventListener('resize', positionMenu);
      window.addEventListener('scroll', positionMenu, true);
      return () => {
        window.removeEventListener('resize', positionMenu);
        window.removeEventListener('scroll', positionMenu, true);
      };
    }
  }, [isOpen]);

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
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex w-full items-center justify-between gap-3 rounded-lg border border-slate-700/50 bg-gradient-to-r from-slate-900/95 to-slate-800/95 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 ease-out hover:border-slate-500/80 hover:shadow-lg hover:shadow-slate-500/20"
      >
        {/* الأيقونة والنص */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {/* أيقونة احترافية */}
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-md group-hover:shadow-blue-400/20">
            <span className="text-base">{modelIcons[selectedModel.id] || '🤖'}</span>
          </div>

          {/* اسم النموذج */}
          <div className="min-w-0 flex-1 text-left">
            <div className="truncate text-sm font-semibold text-slate-100">
              {selectedModel.name}
            </div>
          </div>
        </div>

        {/* سهم القائمة المنسدلة */}
        <svg
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* القائمة المنسدلة - تصميم احترافي عالي الدقة (ببوابة + موضع ثابت) */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-[9998] cursor-default bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            onKeyDown={e => e.key === 'Escape' && setIsOpen(false)}
            aria-label="Close model selector"
          />

          {/* القائمة عبر بوابة لضمان عدم القص ضمن أي حاوية */}
          {menuStyle &&
            createPortal(
              <div
                style={menuStyle}
                className={`duration-200 animate-in fade-in ${openUpward ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2'}`}
              >
                <Card
                  variant="glass"
                  padding="sm"
                  className="bg-slate-900/98 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/50 max-h-[420px] overflow-y-auto border-slate-700/50 shadow-2xl shadow-slate-900/50 backdrop-blur-xl"
                >
                  <div className="grid gap-2 p-2">
                    {AI_MODELS.map(model => {
                      const isSelected = model.id === selectedModelId;

                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            onSelectModel(model.id);
                            setIsOpen(false);
                          }}
                          className={`group relative w-full rounded-lg px-3 py-2.5 text-left transition-all duration-200 ease-out ${
                            isSelected
                              ? 'border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/10'
                              : 'border border-slate-700/50 bg-slate-800/40 hover:border-slate-600/70 hover:bg-slate-800/70 hover:shadow-md'
                          } `}
                        >
                          <div className="flex items-start gap-2.5">
                            {/* الأيقونة */}
                            <div
                              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                                isSelected
                                  ? 'border border-blue-400/40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 shadow-md shadow-blue-400/20'
                                  : 'border border-slate-600/30 bg-slate-700/30 group-hover:border-slate-500/50'
                              } `}
                            >
                              <span className="text-base">{modelIcons[model.id] || '🤖'}</span>
                            </div>

                            {/* المحتوى */}
                            <div className="min-w-0 flex-1">
                              {/* الاسم والشارة */}
                              <div className="mb-1 flex items-center justify-between gap-2">
                                <h4
                                  className={`truncate text-sm font-semibold ${
                                    isSelected ? 'text-blue-100' : 'text-slate-100'
                                  }`}
                                >
                                  {model.name}
                                </h4>

                                {isSelected && (
                                  <Badge variant="success" size="sm" className="flex-shrink-0">
                                    <svg
                                      className="h-3 w-3"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </Badge>
                                )}
                              </div>

                              {/* الوصف */}
                              <p className="mb-1.5 line-clamp-1 text-[11px] leading-snug text-slate-400">
                                {model.description}
                              </p>

                              {/* القدرات */}
                              <div className="mb-1.5 flex flex-wrap gap-1">
                                {model.capabilities.slice(0, 3).map(cap => (
                                  <Badge
                                    key={cap}
                                    variant="neutral"
                                    size="sm"
                                    className="px-1.5 py-0.5 text-[9px] leading-none"
                                  >
                                    {cap}
                                  </Badge>
                                ))}
                              </div>

                              {/* المعلومات */}
                              <div className="flex items-center gap-2.5 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1">
                                  <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                  </svg>
                                  {(model.maxTokens / 1000).toFixed(0)}K
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
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
              </div>,
              document.body
            )}
        </>
      )}
    </div>
  );
}
