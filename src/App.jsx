import { useEffect, useState } from "react";
import MapComponent from "./Components/MapComponent";

function App() {
  const center = [38.7749, -100.4194]; // Set your initial coordinates
  const [coords, setCoords] = useState({});
  const [populations, setPopulations] = useState({});

  const fetchCoordinates = async () => {
    const apicall = await fetch("/src/assets/coordinates.json");
    const data = await apicall.json();
    setCoords(data);
  };
  const fetchPopulations = async () => {
    const apicall = await fetch("/src/assets/population.json");
    const data = await apicall.json();
    setPopulations(data);
  };

  useEffect(() => {
    fetchCoordinates();
    fetchPopulations();
  }, []);

  return (
    <div>
      <div className="w-[75vw] mx-auto mt-[15vh] rounded-md overflow-hidden">
        <h1 className=" text-3xl text-[#be3207] mb-2">
          American States with population
        </h1>
      </div>
      <div className="w-[75vw] h-[70vh] mx-auto rounded-md overflow-hidden">
        {Object.keys(coords).length && Object.keys(populations).length ? (
          <MapComponent
            center={center}
            usStatesCoords={coords}
            populations={populations}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
