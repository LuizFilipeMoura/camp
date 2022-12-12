// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { workouts } from '../workouts';
import { Workout } from '../../../src/models/workout';
import { WorkoutDetails } from '../../workout/[id]';

export default function handler(req: NextApiRequest, res: NextApiResponse<WorkoutDetails>) {
  const { id } = req.query;
  const workout = workouts.find((_workout) => _workout.id === id) as Workout;
  const sameLevels = workouts.filter((_workout) => _workout.levelTag === workout.levelTag);
  const sameImpacts = workouts.filter((_workout) => _workout.impactTag === workout.impactTag);


  res.status(200).json({
    workout,
    sameLevels,
    sameImpacts,
  });
}
