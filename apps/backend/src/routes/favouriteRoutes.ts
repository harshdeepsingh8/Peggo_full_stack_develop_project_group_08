import { Router } from 'express';
import { validateRequest } from '../validate';
import {
  getFavouriteRoutes,
  getFavouriteRoute,
  createFavouriteRoute,
  updateFavouriteRoute,
  deleteFavouriteRoute
} from '../controllers/favouriteRoutesController';

const router = Router();

router.get('/', getFavouriteRoutes);
router.get('/:id', getFavouriteRoute);
router.post('/', validateRequest, createFavouriteRoute);
router.put('/:id', validateRequest, updateFavouriteRoute);
router.delete('/:id', deleteFavouriteRoute);

export default router;