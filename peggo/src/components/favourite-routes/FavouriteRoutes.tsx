import "./FavouriteRoutes.css";

function FavouriteRoutes() {
  const favouriteRoutes = [
    "Route 11 - Portage",
    "Route 18 - North Main",
    "Route 47 - Transcona",
    "Route 60 - Pembina"
  ];

  return (
    <section className="favourite-routes">
      <h2>Favourite Routes</h2>
      <p>View your saved Winnipeg Transit routes.</p>

      <ul>
        {favouriteRoutes.map((route) => (
          <li key={route}>{route}</li>
        ))}
      </ul>
    </section>
  );
}

export default FavouriteRoutes;