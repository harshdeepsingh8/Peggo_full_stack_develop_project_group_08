import type { Request, Response, NextFunction } from 'express';
import { favouriteRouteSchema } from './validations/favouriteRouteSchema';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!favouriteRouteSchema.validate(req.body)) {
    res.status(400).json({ message: 'Invalid route name' });
    return;
  }

  next();
};