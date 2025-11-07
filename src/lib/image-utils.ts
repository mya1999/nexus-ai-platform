export const getImageSizes = (_width: number): { sizes: string; className: string } => {
  // تكوين أحجام مختلفة للصور بناءً على عرض الشاشة
  const sizes = [
    '(max-width: 640px) 90vw',
    '(max-width: 768px) 80vw',
    '(max-width: 1024px) 70vw',
    '(max-width: 1280px) 60vw',
    '50vw'
  ].join(', ');

  // الفئات المناسبة للصورة
  const className = [
    'w-full',
    'h-auto',
    'object-cover',
    'transition-opacity',
    'duration-300',
    'rounded-xl'
  ].join(' ');

  return { sizes, className };
};

// تكوين التحميل المتأخر للصور
export const getBlurDataURL = async (_src: string): Promise<string> => {
  // في الإنتاج، يمكنك استخدام خدمة تحويل الصور مثل Cloudinary أو ImageKit
  // هذا مثال بسيط للتطوير المحلي
  return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23cccccc"/></svg>`;
};

export const imageDefaults = {
  loading: 'lazy' as const,
  quality: 90,
  formats: ['image/avif', 'image/webp'],
};
