import React from "react";
import "./Legend.css";

export const Legend = ({ labels, colorScale, setContinent, continent }) => {
  return (
    <div className="legend-container">
      {labels.map((label) => (
        <div
          key={label}
          style={{ fontWeight: continent === label ? "bold" : "normal" }}
          className="legend-row"
          onClick={() => setContinent(label)}
        >
          <div
            style={{ backgroundColor: colorScale(label) }}
            className="legend-marker"
          ></div>
          <p className="legend-label">{label}</p>
        </div>
      ))}
    </div>
  );
};
