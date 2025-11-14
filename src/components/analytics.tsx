export const Analytics = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Plausible Analytics - يحترم الخصوصية */}
      <script defer data-domain="nexusai.dev" src="https://plausible.io/js/script.js" />

      {/* إعدادات تحسين الأداء */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // تحسين Web Vitals
            window.addEventListener('load', function() {
              // تأجيل تحميل الموارد غير الهامة
              const deferredElements = document.querySelectorAll('[data-defer]');
              deferredElements.forEach(element => {
                requestIdleCallback(() => {
                  if (element instanceof HTMLImageElement) {
                    element.src = element.dataset.src || '';
                  } else if (element instanceof HTMLScriptElement) {
                    element.src = element.dataset.src || '';
                  }
                });
              });
            });

            // مراقبة Core Web Vitals
            if ('performance' in window) {
              let cls = 0;
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (!entry.hadRecentInput) {
                    cls += entry.value;
                  }
                }
              }).observe({entryTypes: ['layout-shift']});
            }
          `,
        }}
      />
    </>
  );
};
