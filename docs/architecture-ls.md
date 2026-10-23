# Sprint 3 Architecture Documentation

Name:    Lovedeep Singh  
Project: PeGGo – Group 08  
Feature: Favourite Bus Routes

## Custom Hook = useFavouriteRoutes

I created this hook to manage the favourite routes and error messages. It also helps to add, remove, update, and refresh routes. I used a hook because our notes say hooks are for UI state and reusable logic. I used it in FavouriteBusRoutes.tsx. It returns favouriteRoutes, errorMessage, addFavourite, removeFavourite, updateFavourite, and refreshRoutes to manage the page.

## Service = favouriteRouteService

I created this service to check if a route name is empty or already saved. It also handles adding, removing, and updating routes through the repository. I used a service because our notes say business logic belongs in the services. It is called by useFavouriteRoutes.ts.

## Repository = favouriteRouteRepo

I created this repository to manage the favourite routes data. It has Create, Read, Update, and Delete methods. I used a repository because our notes say data access belongs in this layer. The service calls it whenever route data is needed.

## TypeScript Type and Test Data

I created FavouriteRoute.ts with an ID and route name. I also added 10 sample routes in favouriteRoutes.ts. The repository uses this data for testing.

## FavouriteBusRoutes Component

I updated this component to show the saved routes and allow users to add, select, and remove favourites. I kept the page display in the component and moved the other logic into the hook, service, and repository. This component is used in App.tsx.

## How It Works

When a user adds a favourite route, the component calls the hook, the hook calls the service, and the service uses the repository to save the route.
