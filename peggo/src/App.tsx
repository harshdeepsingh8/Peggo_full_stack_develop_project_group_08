import "./App.css";
import BusRoutes from "./components/bus-routes/BusRoutes";
import BusServices from "./components/bus-services/BusServices";
import TravelTools from "./components/travel-tools/TravelTools";

function App() {
  return (
    <>
      <header className="app-header">
        <h1>PegGo</h1>
        <p>Winnipeg Bus Service Guide</p>
      </header>

      <main>
        <div className="columns">
          <BusRoutes />
          <BusServices />
          <TravelTools />
        </div>
      </main>

      <footer className="app-footer">
        <p>Project Team: Jojanpreet Kaur | harshdeep singh | lovedeep singh </p>
      </footer>
    </>
  );
}

export default App;