import React, { useState } from "react";
import "./App.css";
import Circles from "./Circles";
import { Legend } from "./Legend";
import data from "./gapminder_data.json";
import { scaleOrdinal, schemeTableau10 } from "d3";
import Slider from "react-input-slider";

const width = 960;
const height = 500;

function App() {
  const [year, setYear] = useState({ x: 1957 });
  const [selectedContinent, setSelectedContinent] = useState("all");
  const continents = [...new Set(data.map((d) => d.continent))];
  const colors = scaleOrdinal().domain(continents).range(schemeTableau10);

  const handelLeendClick = (continent) => {
    setSelectedContinent((state) => (state === continent ? "all" : continent));
  };
  return (
    <div className="App">
      <h1 className="header">Gapminder Chart</h1>
      <div className="slider">
        <p>{year.x}</p>
        <Slider
          axis="x"
          xmin={1957}
          xmax={2007}
          xstep={5}
          x={year.x}
          onChange={({ x }) => setYear((state) => ({ ...state, x }))}
        />
        <Legend
          labels={continents}
          colorScale={colors}
          continent={selectedContinent}
          setContinent={handelLeendClick}
        />
      </div>
      <div className="chart">
        <Circles
          year={year.x}
          width={width}
          height={height}
          colorScale={colors}
          selectedContinent={selectedContinent}
        />
      </div>
    </div>
  );
}

export default App;
