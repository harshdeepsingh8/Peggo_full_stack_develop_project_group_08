import "./BusRoutes.css";

function BusRoutes() {
  const routes = [
    "Route 11 - Portage",
    "Route 18 - North Main",
    "Route 21 - Portage Express",
    "Route 47 - Transcona"
  ];

  return (
    <section className="bus-routes">
      <h2>Bus Routes</h2>
      <p>Explore popular Winnipeg bus routes.</p>

      <ul>
        {routes.map((route) => (
          <li key={route}>{route}</li>
        ))}
      </ul>
    </section>
  );
}

export default BusRoutes;