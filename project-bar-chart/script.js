import * as d3 from "https://cdn.skypack.dev/d3@7.8.2";

document.addEventListener("DOMContentLoaded", async () => {
  const dataset = [];
  const getData = async () => {
    try {
      await fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
      )
        .then((res) => res.json())
        .then((data) => addData(data));
    } catch (error) {
      console.error(error);
    }
  };

  const addData = (obj) => {
    dataset.push(obj);

    const numData = dataset[0].data.map((data) => {
      return data[1];
    });

    const yearData = dataset[0].data.map((data) => {
      return new Date(data[0]);
    });

    const w = 1500;
    const h = 900;

    const svg = d3
      .select("div")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "container");

    const gdpMax = d3.max(numData);

    let linearScale = d3
      .scaleLinear()
      .domain([0, gdpMax])
      .range([0, h - 100]);

    const scaledGDP = numData.map(function (item) {
      return linearScale(item);
    });

    const yAxisScale = d3
      .scaleLinear()
      .domain([0, gdpMax])
      .range([h - 50, 50]);

    const yAxis = d3.axisLeft(yAxisScale);

    const xScale = d3
      .scaleTime()
      .domain([yearData[0], yearData[yearData.length - 1]])
      .range([50, w - 50]);

    const xAxis = d3.axisBottom(xScale);

    let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0);

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -270)
      .attr("y", 80)
      .text("Gross Domestic Product")
      .attr("font-size", 10);

    svg
      .append("text")
      .attr("x", w / 2 - 250)
      .attr("y", 30)
      .text("United States GDP")
      .attr("id", "title")
      .attr("font-size", 30);

    svg
      .append("text")
      .attr("x", w - 665)
      .attr("y", h - 10)
      .attr("font-size", 10)
      .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
      .attr("class", "info");

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + 50 + ",0)")
      .style("font-family", "'Press Start 2P', monospace")
      .style("font-size", "7px")
      .call(yAxis);

    svg
      .append("g")
      .attr("transform", "translate(0," + (h - 50) + ")")
      .attr("id", "x-axis")
      .style("font-family", "'Press Start 2P', monospace")
      .style("font-size", "7px")
      .call(xAxis);

    svg
      .selectAll("rect")
      .data(scaledGDP)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(yearData[i]))
      .attr("y", (d, i) => h - d - 50)
      .attr("width", w / 275 - 1)
      .attr("height", (d, i) => d)
      .attr("fill", "#00bbf9")
      .attr("stroke", "black")
      .attr("index", (d, i) => i)
      .attr("data-date", (d, i) => dataset[0].data[i][0])
      .attr("data-gdp", (d, i) => dataset[0].data[i][1])
      .on("mouseover", function (e, d) {
        const i = this.getAttribute("index");
        const year = new Date(yearData[i]).getFullYear();
        const month = +new Date(yearData[i]).getMonth() + 1;
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(
          "Date: " +
            month +
            ", " +
            year +
            "<br> $" +
            dataset[0].data[i][1]
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+\.)/g, "$1,") +
            " Billion"
        );
        tooltip
          .attr("data-date", dataset[0].data[i][0])
          .style("left", e.clientX - 50 + "px")
          .style("top", e.clientY + "px")
          .style("transform", "translateX(60px)");
      })
      .on("mouseout", function (d) {
        tooltip.transition().duration(400).style("opacity", 0);
      });
  };

  getData();
});
