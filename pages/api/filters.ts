// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { workouts } from './workouts';

type Data = {
  impacts: string[];
  levels: string[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const impacts = Array.from(new Set(workouts.map((item) => item.impactTag)));
  const levels = Array.from(new Set(workouts.map((item) => item.levelTag)));
  res.status(200).json({
    impacts,
    levels,
  });
}
