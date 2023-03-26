import {
  scaleSqrt,
  scaleLog,
  extent,
  scaleLinear,
  axisLeft,
  axisBottom,
} from "d3"

export function drawChart(
  SVG,
  chartData,
  data,
  height,
  width,
  margin,
  colorScale,
  selectedContinent
) {
  // scales
  let maxRadius = 40
  let xScale = scaleLog()
    .domain(extent(data, (d) => d.gdp_cap))
    .range([margin.left, width - margin.right])
  let yScale = scaleLinear()
    .domain(extent(data, (d) => d.life_exp))
    .range([height - margin.bottom, margin.top])
  let rScale = scaleSqrt()
    .domain(extent(data, (d) => d.population))
    .range([1, maxRadius])

  // circles
  SVG.selectAll("circle")
    .data(chartData)
    .transition()
    .duration(500)
    .attr("cx", (d) => xScale(d.gdp_cap))
    .attr("cy", (d) => yScale(d.life_exp))
    .attr("r", (d) => rScale(d.population))
    .attr("opacity", 1)
    .style("fill", (d) => colorScale(d.continent))

  SVG.append("g")
    .call(axisLeft(yScale).ticks(5))
    .attr("transform", `translate(${margin.left},0)`)
    .call((g) => g.select(".domain").remove())
  SVG.append("g")
    .call(axisBottom(xScale).ticks(5))
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call((g) => g.select(".domain").remove())
}
