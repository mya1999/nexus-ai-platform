'use client';

import { ButtonAdvanced } from '@/components/ui/button-advanced';
import Modal from '@/components/ui/modal';
import { useChatStore } from '@/store/chat-store';
import { useState } from 'react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

type TabId = 'general' | 'appearance' | 'chat' | 'models';

function TabButton({
  label,
  active,
  onClick,
}: Readonly<{ id: TabId; label: string; active: boolean; onClick: () => void }>) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${active ? 'from-brand-primary to-brand-accent bg-gradient-to-r text-white shadow-glow-purple' : 'bg-white/5 text-gray-300 hover:bg-white/10'} `}
      aria-current={active ? 'true' : undefined}
    >
      {label}
    </button>
  );
}

export function SettingsModal({ open, onClose }: Readonly<SettingsModalProps>) {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const { uiPrefs, setReduceMotion, setFontScale, setDensity } = useChatStore();

  return (
    <Modal isOpen={open} onClose={onClose} title="الإعدادات" size="xl">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          <TabButton
            id="general"
            label="عام"
            active={activeTab === 'general'}
            onClick={() => setActiveTab('general')}
          />
          <TabButton
            id="appearance"
            label="المظهر"
            active={activeTab === 'appearance'}
            onClick={() => setActiveTab('appearance')}
          />
          <TabButton
            id="chat"
            label="المحادثة"
            active={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
          />
          <TabButton
            id="models"
            label="النماذج"
            active={activeTab === 'models'}
            onClick={() => setActiveTab('models')}
          />
        </div>

        {/* Content */}
        <div className="min-h-[260px] rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          {activeTab === 'general' && (
            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="mb-2 text-lg font-semibold text-white">الإعدادات العامة</h3>
              <p className="text-gray-300">هنا ستكون إعدادات اللغة، السلوك، والحفظ التلقائي.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="mb-1 text-xs text-gray-400">وضع الحفظ</p>
                  <p className="font-medium text-white">تلقائي</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="mb-1 text-xs text-gray-400">الوضع الحالي</p>
                  <p className="font-medium text-white">تجريبي</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="mb-2 text-lg font-semibold text-white">المظهر و التخصيص العصبي</h3>
              <p className="text-sm text-gray-300">
                تحكم في الحركة، حجم النص، و كثافة الواجهة لتقليل الحمل المعرفي وتحسين التركيز.
              </p>

              {/* Reduce Motion */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
                <div>
                  <p className="mb-1 text-sm font-medium text-white">تقليل الحركة</p>
                  <p className="text-xs text-gray-400">
                    تعطيل أو تخفيف الحركات والانتقالات الطويلة.
                  </p>
                </div>
                <ButtonAdvanced
                  variant={uiPrefs.reduceMotion ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setReduceMotion(!uiPrefs.reduceMotion)}
                  role="switch"
                  aria-checked={uiPrefs.reduceMotion}
                >
                  {uiPrefs.reduceMotion ? 'مفعل' : 'غير مفعل'}
                </ButtonAdvanced>
              </div>

              {/* Font Scale */}
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="mb-1 text-sm font-medium text-white">حجم الخط</p>
                <p className="text-xs text-gray-400">التحكم في مقياس الخط العام (0.85 - 1.50).</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0.85}
                    max={1.5}
                    step={0.01}
                    value={uiPrefs.fontScale}
                    onChange={e => setFontScale(Number.parseFloat(e.target.value))}
                    aria-label="تغيير حجم الخط"
                    className="accent-brand-primary flex-1"
                  />
                  <span className="w-12 text-end text-xs tabular-nums text-gray-300">
                    {uiPrefs.fontScale.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Density */}
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="mb-1 text-sm font-medium text-white">الكثافة</p>
                <p className="text-xs text-gray-400">
                  اختيار تباعد الرسائل والعناصر لإدارة مجال الانتباه.
                </p>
                <fieldset className="flex gap-2" aria-label="اختيار الكثافة">
                  <legend className="sr-only">الكثافة</legend>
                  {(['comfortable', 'compact'] as const).map(d => {
                    const checked = uiPrefs.density === d;
                    return (
                      <label
                        key={d}
                        className={`cursor-pointer rounded-md border px-3 py-2 text-xs font-medium transition-all ${checked ? 'from-brand-primary to-brand-accent border-brand-primary/50 bg-gradient-to-r text-white' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'}`}
                      >
                        <input
                          type="radio"
                          name="density"
                          value={d}
                          checked={checked}
                          onChange={() => setDensity(d)}
                          className="sr-only"
                        />
                        {d === 'comfortable' ? 'مريح' : 'مكدّس'}
                      </label>
                    );
                  })}
                </fieldset>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-4">
              <h3 className="mb-2 text-lg font-semibold text-white">المحادثة</h3>
              <p className="text-sm text-gray-300">
                إعدادات النبرة، سرعة الاستجابة، وتنسيق الرسائل.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {['سريع', 'متوازن', 'دقيق'].map(mode => (
                  <button
                    key={mode}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white transition-all hover:bg-white/10"
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-4">
              <h3 className="mb-2 text-lg font-semibold text-white">النماذج</h3>
              <p className="text-sm text-gray-300">
                سيتم إضافة إدارة النماذج، المفاتيح، وتخصيص الأوزان لاحقاً.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {['GPT-4 Turbo', 'Claude 3', 'Gemini', 'Llama 3'].map(m => (
                  <div
                    key={m}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4"
                  >
                    <span className="text-sm text-white">{m}</span>
                    <span className="rounded bg-white/10 px-2 py-1 text-[10px] text-gray-300">
                      مفعل
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <ButtonAdvanced variant="ghost" size="sm" onClick={onClose}>
            إغلاق
          </ButtonAdvanced>
          <ButtonAdvanced variant="primary" size="sm">
            حفظ التغييرات
          </ButtonAdvanced>
        </div>
      </div>
    </Modal>
  );
}
