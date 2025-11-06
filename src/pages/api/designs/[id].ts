import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id } } = req;
  const example = {
    id: String(id),
    title: `تصميم رقم ${id}`,
    imageUrl: "https://picsum.photos/1280/800",
    progress: Math.floor(Math.random() * 101),
  };
  res.status(200).json(example);
}
