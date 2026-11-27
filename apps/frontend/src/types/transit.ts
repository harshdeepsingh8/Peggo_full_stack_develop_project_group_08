export type BusRoute = {
  id: number
  name: string
}

export type FavouriteRoute = {
  id: number
  name: string
}

export type ResourceKind = 'routes' | 'favourites'
export type TransitRecord = BusRoute | FavouriteRoute