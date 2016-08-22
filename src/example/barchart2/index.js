import * as d3 from 'd3'

let width = 400,
  height = 400,
  padding = { left: 30, right: 30, top: 20, bottom: 20 },
  rectWidth = 25,
  rectPadding = 4

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)

let data = [10, 20, 30, 40, 33, 24, 12, 5],
  maxData = 50

let scaleX = d3.scaleLinear()
  .domain([0, maxData])
  .range([0, width - padding.left - padding.right])

let scaleY = d3.scaleLinear()
  .domain([0, maxData])
  .range([height - padding.top - padding.bottom, 0])

let axisX = null
let axisY = d3.axisLeft().scale(scaleY)

let bars = svg.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', (d, i) => {
    return 'translate(' + (padding.left + (rectWidth + rectPadding) * i) + ', ' + padding.top + ')'
  })

bars.append('rect')
  .attr('width', rectWidth)
  .attr('height', d => height - padding.top - padding.bottom - scaleY(d))
  .attr('y', d => scaleY(d))
  .attr('fill', 'steelblue')

bars.append('text')
  .attr('fill', '#333')
  .attr('x', 3)
  .attr('y', d => scaleY(d) - 2)
  .text(d => d)

svg.append('g')
  .call(axisY)
  .attr('transform', 'translate(' + (padding.left - 5) + ', ' + padding.top + ')')
