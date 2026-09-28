import "./BusServices.css";

function BusServices() {
  const services = [
    "Peggo Card",
    "Reload Peggo Card",
    "Lost and Found",
    "Accessible Transit"
  ];

  return (
    <section className="bus-services">
      <h2>Bus Services</h2>
      <p>Find useful services for Winnipeg bus riders.</p>

      <ul>
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </section>
  );
}

export default BusServices;