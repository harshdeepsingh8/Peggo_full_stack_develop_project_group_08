export const favouriteRouteSchema = {
  validate(data: unknown): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const route = data as { routeName?: unknown };

    return (
      typeof route.routeName === 'string' &&
      route.routeName.trim().length > 0
    );
  }
};