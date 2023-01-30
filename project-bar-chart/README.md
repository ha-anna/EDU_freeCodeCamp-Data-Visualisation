# Bar Chart [30 Jan 2023]

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview



**Objective:** Build an app that is functionally similar to this: https://bar-chart.freecodecamp.rocks.

Fulfill the below user stories and get all of the tests to pass. 

**User Story #1:** My chart should have a title with a corresponding id="title". <br>
**User Story #2:** My chart should have a g element x-axis with a corresponding id="x-axis". <br>
**User Story #3:** My chart should have a g element y-axis with a corresponding id="y-axis". <br>
**User Story #4:** Both axes should contain multiple tick labels, each with a corresponding class="tick". <br>
**User Story #5:** My chart should have a rect element for each data point with a corresponding class="bar" displaying the data. <br>
**User Story #6:** Each bar should have the properties data-date and data-gdp containing date and GDP values. <br>
**User Story #7:** The bar elements' data-date properties should match the order of the provided data. <br>
**User Story #8:** The bar elements' data-gdp properties should match the order of the provided data. <br>
**User Story #9:** Each bar element's height should accurately represent the data's corresponding GDP. <br>
**User Story #10:** The data-date attribute and its corresponding bar element should align with the corresponding value on the x-axis. <br>
**User Story #11:** The data-gdp attribute and its corresponding bar element should align with the corresponding value on the y-axis. <br>
**User Story #12:** I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area. <br>
**User Story #13:** My tooltip should have a data-date property that corresponds to the data-date of the active area. <br>

Here is the dataset you will need to complete this project: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json


### Screenshot

![Gif of the project](./gif_barchart.gif)

### Links

[Codepen](https://codepen.io/haanna/pen/VwBBWaG)

## My process

I started from writing a basic HTML structure and choosing a design style and fonts. Then I fetched the data, and coded the chart.

### Built with

- HTML
- CSS
- Vanilla JavaScript
- D3.js

### What I learned

How to create bar charts in D3.js, how to use scales, text, and assign various attributes.

### Useful resources

- [Free Code Camp](https://www.freecodecamp.org/learn)

## Author

- Website - [Ha Anna](https://haanna.com)
- Codepen - [haanna](https://codepen.io/haanna)

## Acknowledgments

Thank you, Free Code Camp for creating this course and making it free and accessible to everyone.

