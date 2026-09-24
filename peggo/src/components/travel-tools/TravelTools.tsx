import "./TravelTools.css";

function TravelTools() {
  const tools = [
    "Trip Planner",
    "Bus Schedule",
    "Service Alerts",
    "Fare Information"
  ];

  return (
    <section className="travel-tools">
      <h2>Travel Tools</h2>
      <p>Helpful tools to make your bus trip easier.</p>

      <ul>
        {tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </section>
  );
}

export default TravelTools;