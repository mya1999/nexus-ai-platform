import Image from "next/image";
import React from "react";

type Props = {
  imageUrl: string;
  title?: string;
  progress: number; // 0 - 100
  onClick?: () => void;
};

export default function DesignPreview({ imageUrl, title, progress, onClick }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  return (
    <div style={{maxWidth: 720, margin: '0 auto', padding: 16}}>
      {title && <h3 style={{fontSize: 20, marginBottom: 12}}>{title}</h3>}
      <div style={{width: '100%', height: 360, background: '#eee', marginBottom: 12}}>
        <Image src={imageUrl} alt={title || 'Design preview'} width={720} height={480} style={{objectFit: 'cover', width: '100%', height: '100%'}} />
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
        <span style={{color:'#666'}}>نسبة الاكتمال</span>
        <span style={{fontWeight:600}}>{pct}%</span>
      </div>
      <div style={{width:'100%', background:'#e5e7eb', height:10, borderRadius:999}}>
        <div style={{width: `${pct}%`, height: '100%', background:'#0891b2', borderRadius:999}} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} role="progressbar" />
      </div>
    </div>
  );
}
