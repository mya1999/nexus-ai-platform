"use client";

import { ButtonAdvanced } from '@/components/ui/button-advanced';
import Modal from '@/components/ui/modal';
import { useChatStore } from '@/store/chat-store';
import { useState } from 'react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

type TabId = 'general' | 'appearance' | 'chat' | 'models';

function TabButton({ id, label, active, onClick }: Readonly<{ id: TabId; label: string; active: boolean; onClick: () => void }>) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative
        ${active ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-glow-purple' : 'bg-white/5 hover:bg-white/10 text-gray-300'}
      `}
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
          <TabButton id="general" label="عام" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
          <TabButton id="appearance" label="المظهر" active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} />
          <TabButton id="chat" label="المحادثة" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <TabButton id="models" label="النماذج" active={activeTab === 'models'} onClick={() => setActiveTab('models')} />
        </div>

        {/* Content */}
        <div className="min-h-[260px] border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xl">
          {activeTab === 'general' && (
            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="text-lg font-semibold text-white mb-2">الإعدادات العامة</h3>
              <p className="text-gray-300">هنا ستكون إعدادات اللغة، السلوك، والحفظ التلقائي.</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">وضع الحفظ</p>
                  <p className="text-white font-medium">تلقائي</p>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">الوضع الحالي</p>
                  <p className="text-white font-medium">تجريبي</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-2">المظهر و التخصيص العصبي</h3>
              <p className="text-gray-300 text-sm">تحكم في الحركة، حجم النص، و كثافة الواجهة لتقليل الحمل المعرفي وتحسين التركيز.</p>

              {/* Reduce Motion */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-black/30 border border-white/10">
                <div>
                  <p className="text-sm font-medium text-white mb-1">تقليل الحركة</p>
                  <p className="text-xs text-gray-400">تعطيل أو تخفيف الحركات والانتقالات الطويلة.</p>
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
              <div className="space-y-3 p-4 rounded-xl bg-black/30 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">حجم الخط</p>
                <p className="text-xs text-gray-400">التحكم في مقياس الخط العام (0.85 - 1.50).</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0.85}
                    max={1.5}
                    step={0.01}
                    value={uiPrefs.fontScale}
                    onChange={(e) => setFontScale(Number.parseFloat(e.target.value))}
                    aria-label="تغيير حجم الخط"
                    className="flex-1 accent-brand-primary"
                  />
                  <span className="text-xs text-gray-300 w-12 text-end tabular-nums">{uiPrefs.fontScale.toFixed(2)}</span>
                </div>
              </div>

              {/* Density */}
              <div className="space-y-3 p-4 rounded-xl bg-black/30 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">الكثافة</p>
                <p className="text-xs text-gray-400">اختيار تباعد الرسائل والعناصر لإدارة مجال الانتباه.</p>
                <fieldset className="flex gap-2" aria-label="اختيار الكثافة">
                  <legend className="sr-only">الكثافة</legend>
                  {(['comfortable','compact'] as const).map(d => {
                    const checked = uiPrefs.density === d;
                    return (
                      <label key={d} className={`cursor-pointer px-3 py-2 rounded-md text-xs font-medium transition-all border ${checked ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white border-brand-primary/50' : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'}`}>
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
              <h3 className="text-lg font-semibold text-white mb-2">المحادثة</h3>
              <p className="text-gray-300 text-sm">إعدادات النبرة، سرعة الاستجابة، وتنسيق الرسائل.</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {['سريع','متوازن','دقيق'].map(mode => (
                  <button key={mode} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm border border-white/10 transition-all">
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-2">النماذج</h3>
              <p className="text-gray-300 text-sm">سيتم إضافة إدارة النماذج، المفاتيح، وتخصيص الأوزان لاحقاً.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {['GPT-4 Turbo','Claude 3','Gemini','Llama 3'].map(m => (
                  <div key={m} className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between">
                    <span className="text-white text-sm">{m}</span>
                    <span className="px-2 py-1 text-[10px] rounded bg-white/10 text-gray-300">مفعل</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <ButtonAdvanced variant="ghost" size="sm" onClick={onClose}>إغلاق</ButtonAdvanced>
          <ButtonAdvanced variant="primary" size="sm">حفظ التغييرات</ButtonAdvanced>
        </div>
      </div>
    </Modal>
  );
}
