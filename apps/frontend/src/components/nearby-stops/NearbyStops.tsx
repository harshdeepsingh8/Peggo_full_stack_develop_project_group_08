function NearbyStops() {
  const stops = [
    "Main Street at Portage Avenue",
    "Portage Avenue at Fort Street",
    "Graham Avenue at Smith Street",
    "Main Street at Graham Avenue",
  ]

  return (
    <section className="nearby-stops">
      <h2>Nearby Stops</h2>
      <p>Bus stops near you:</p>

      <ul>
        {stops.map((stop) => (
          <li key={stop}>{stop}</li>
        ))}
      </ul>
    </section>
  )
}

export default NearbyStops