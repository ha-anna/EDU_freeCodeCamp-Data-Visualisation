import * as d3 from "https://cdn.skypack.dev/d3@7.8.2";
import * as topojson from "https://cdn.skypack.dev/topojson-client@3.1.0";

const urls = [
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
];

Promise.all(urls.map((url) => fetch(url)))
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((data) => displayData(data[0], data[1]));

const displayData = async (edu, map) => {
  const eduData = edu;
  const mapData = map;

  const w = 1100;
  const h = 820;
  const p = 30;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "map");

  // text

  svg
    .append("text")
    .text("United States Educational Attainment")
    .attr("x", w / 2 - 230)
    .attr("y", 20)
    .attr("font-size", 20)
    .attr("id", "title");

  svg
    .append("text")
    .text(
      " Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
    )
    .attr("x", 250)
    .attr("y", 45)
    .attr("font-size", 12)
    .attr("id", "description");

  svg
    .append("text")
    .html(
      `Source: <a href="https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx" target="_blank" class="link">USDA Economic Research Service</a>`
    )
    .attr("x", w - 360)
    .attr("y", h - 100)
    .attr("font-size", 12)
    .attr("id", "source");

  // legend

  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", "translate(" + (w - 194) + "," + (h - 260) + ")")
    .attr("fill", "black");

  legend
    .append("text")
    .attr("font-size", "12px")
    .text("15% or less ")
    .attr("y", -50);
  legend
    .append("text")
    .attr("font-size", "12px")
    .text("25% or less")
    .attr("y", -30);
  legend
    .append("text")
    .attr("font-size", "12px")
    .text("35% or less")
    .attr("y", -10);
  legend
    .append("text")
    .attr("font-size", "12px")
    .text("45% or less")
    .attr("y", 10);
  legend
    .append("text")
    .attr("font-size", "12px")
    .text("more than 45%")
    .attr("y", 30);

  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "#97DCE1")
    .attr("y", -61)
    .attr("x", -15);
  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "#70CED5")
    .attr("y", -41)
    .attr("x", -15);
  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "#4AC0C9")
    .attr("y", -21)
    .attr("x", -15);
  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "#35A2AB")
    .attr("y", -1)
    .attr("x", -15);
  legend
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", "#2A7D83")
    .attr("y", 20)
    .attr("x", -15);

  //tooltip

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  // map

  svg
    .append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(mapData, mapData.objects.counties).features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("cursor", "pointer")
    .attr("data-fips", (d) => {
      return d.id;
    })
    .attr("alt", (d) => {
      let fips = d.id;
      let county = eduData.find((county) => {
        return county.fips === fips;
      });
      return `${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`;
    })
    .attr("data-education", (d) => {
      let fips = d.id;
      let county = eduData.find((county) => {
        return county.fips === fips;
      });
      let percentage = county.bachelorsOrHigher;
      return percentage;
    })
    .attr("fill", (d) => {
      let fips = d.id;
      let county = eduData.find((county) => {
        return county.fips === fips;
      });
      let percentage = county.bachelorsOrHigher;
      if (percentage <= 15) {
        return "#97DCE1";
      } else if (percentage <= 25) {
        return "#70CED5";
      } else if (percentage <= 35) {
        return "#4AC0C9";
      } else if (percentage <= 45) {
        return "#35A2AB";
      } else {
        return "#2A7D83";
      }
    })
    .on("mouseover", function (e) {
      const info = this.getAttribute("alt");
      const percent = this.getAttribute("data-education");

      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(info);
      tooltip
        .style("left", e.clientX - 50 + "px")
        .style("top", e.clientY + "px")
        .style("transform", "translateX(60px)")
        .attr("data-education", percent);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(400).style("opacity", 0);
    });
};
