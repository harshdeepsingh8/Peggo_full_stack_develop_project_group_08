import type { Request, Response } from 'express';
import { favouriteRoutesService } from '../services/favouriteRoutesService';

export const getFavouriteRoutes = async (req: Request, res: Response) => {
  const routes = await favouriteRoutesService.getAll();
  res.json(routes);
};

export const getFavouriteRoute = async (req: Request, res: Response) => {
  const route = await favouriteRoutesService.getById(Number(req.params.id));

  if (!route) {
    res.status(404).json({ message: 'Route not found' });
    return;
  }

  res.json(route);
};

export const createFavouriteRoute = async (req: Request, res: Response) => {
  const route = await favouriteRoutesService.create(req.body.routeName);
  res.status(201).json(route);
};

export const updateFavouriteRoute = async (req: Request, res: Response) => {
  const route = await favouriteRoutesService.update(
    Number(req.params.id),
    req.body.routeName
  );

  res.json(route);
};

export const deleteFavouriteRoute = async (req: Request, res: Response) => {
  await favouriteRoutesService.delete(Number(req.params.id));
  res.status(204).send();
};