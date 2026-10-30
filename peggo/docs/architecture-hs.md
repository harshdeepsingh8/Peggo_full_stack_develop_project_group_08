# Sprint 3 Architecture — Harshdeep Singh

Project: PeGGo Transit Tracker, Group 08

Team: Harshdeep Singh and Lovedeep Singh

Resource responsibility: Bus routes

## busRouteRepository

### What does it do?
Provides create, read-all, read-by-ID, update and delete operations
for BusRoute records. Imports routeData, which contains ten premade
typed objects.

### Why does this logic belong here?
The repository owns data storage, ID allocation and change notifications.
The createRepository helper shares storage behavior between repositories.
Neither implementation contains React state or business validation.

### Where is it used?
transitService uses the repository for bus-route operations.
Components access it indirectly through useTransitRecords and the service.

## transitService

### What does it do?
Validates nonempty names and prevents case-insensitive duplicates during
creation and editing. Checks that a route exists before saving it as
a favourite. Delegates storage operations to repositories.

### Why does this logic belong here?
These are business rules that must apply regardless of the calling UI.
The service does not render controls or store React state.

### Where is it used?
useTransitRecords calls it for reads and CRUD actions.
FavouriteRoutePicker directly calls addRouteToFavourites.

## useTransitRecords

### What does it do?
Connects service snapshots and subscriptions to React rendering.
Returns records, create, update and remove, documented in its source.

### Why does this logic belong here?
React rendering integration is a presentation concern.
The hook delegates business validation and storage to lower layers.

### Where is it used?
ResourceManager, TransitSummary and FavouriteRoutePicker invoke it.
Bus-route changes appear in the favourites dropdown without resource props.

## useRecordForm

### What does it do?
Manages input values, editing state, feedback, starting edits and resetting.
Every returned value is documented in the source.

### Why does this logic belong here?
These are reusable presentation concerns.
The hook performs no business validation or data access.

### Where is it used?
ResourceManager and FavouriteRoutePicker both invoke it.

## Components

### What do they do?
ResourceManager displays CRUD forms and records.
TransitSummary displays current resource counts.
FavouriteRoutePicker saves an available route as a favourite.

### Why is this separation appropriate?
Components render the interface and handle browser events.
Hooks manage React presentation concerns.
Services enforce business rules.
Repositories provide data access.
Each active component includes an architecture comment block.

### Where are they used?
App.tsx composes the components under the routes and favourites pages.

## Shared page state

App.tsx no longer initializes shared resource arrays or passes setters
through page props. Shared data is queried and modified through the
hook-service-repository architecture.

Repository notifications update mounted consumers.
Form state remains local to its components.

## Limitations

Sample data is held in memory and resets on browser refresh.
No back-end, authentication or authorization is implemented.
Local persistence and third-party APIs are not implemented.

## Personal contribution

Before submission, record the exact files and changes personally
implemented or contributed to by Harshdeep Singh.