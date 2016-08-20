import * as d3 from 'd3'
import 'assets/css/linechart1.css'

let width = 500,
  height = 250,
  margin = { top: 30, right: 20, bottom: 20, left: 50 },
  bodyWidth = width - margin.left - margin.right,
  bodyHeight = height - margin.top - margin.bottom

let data = [1, 3, 5, 7, 8, 4, 3, 7]
let xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, bodyWidth]),
  yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([bodyHeight, 0])

let line = d3.line()
  .x((d, i) => xScale(i))
  .y(d => yScale(d))
  .curve(d3.curveCardinal)
let xAxis = d3.axisBottom().scale(xScale),
  yAxis = d3.axisLeft().scale(yScale)

let svg = d3.select('#container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

let g = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

g.append('path')
  .attr('d', line(data))

g.append('g')
  .call(xAxis)
  .attr('transform', 'translate(0, ' + bodyHeight + ')')

g.append('g')
  .call(yAxis)

g.append('text')
  .text('Price($)')
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'end')
  .attr('dy', '1em')
