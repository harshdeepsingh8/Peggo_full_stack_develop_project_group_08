import type { FavouriteRoute } from '../types/FavouriteRoute';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/favourite-routes`;

export const favouriteRouteRepo = {
  async getAll(): Promise<FavouriteRoute[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Unable to get routes');
    return response.json();
  },

  async getById(id: number): Promise<FavouriteRoute | undefined> {
    const response = await fetch(`${API_URL}/${id}`);
    if (response.status === 404) return undefined;
    if (!response.ok) throw new Error('Unable to get route');
    return response.json();
  },

  async create(route: FavouriteRoute): Promise<void> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routeName: route.routeName })
    });

    if (!response.ok) throw new Error('Unable to create route');
  },

  async update(route: FavouriteRoute): Promise<void> {
    const response = await fetch(`${API_URL}/${route.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routeName: route.routeName })
    });

    if (!response.ok) throw new Error('Unable to update route');
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Unable to delete route');
  }
};