import Image from 'next/image';
import React from 'react';

type Props = {
  imageUrl: string;
  title?: string;
  progress: number; // 0 - 100
  onClick?: () => void;
};

export default function DesignPreview({ imageUrl, title, progress, onClick }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  return (
    <div className="max-w-md bg-white rounded-lg shadow p-4">
      {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
      <div
        className="w-full h-64 bg-gray-100 rounded overflow-hidden mb-3 cursor-pointer"
        role="button"
        onClick={onClick}
      >
        <Image
          src={imageUrl}
          alt={title || 'Design preview'}
          width={720}
          height={480}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">نسبة الاكتمال</span>
        <span className="text-sm font-medium">{pct}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
    </div>
  );
}
