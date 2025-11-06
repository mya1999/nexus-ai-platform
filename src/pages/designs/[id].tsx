import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DesignPreview from "../../components/DesignPreview";

type DesignData = {
  id: string;
  title?: string;
  imageUrl: string;
  progress: number;
};

export default function DesignPage() {
  const router = useRouter();
  const { id } = router.query;
  const [design, setDesign] = useState<DesignData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/designs/${id}`)
      .then((r) => { if (!r.ok) throw new Error("Failed"); return r.json(); })
      .then((data) => setDesign(data))
      .catch(() => setDesign(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{padding:16}}>جارٍ التحميل...</div>;
  if (!design) return <div style={{padding:16}}>التصميم غير موجود</div>;

  return (
    <div style={{padding:16}}>
      <DesignPreview imageUrl={design.imageUrl} title={design.title} progress={design.progress} onClick={() => {}} />
    </div>
  );
}
