import * as d3 from 'd3'

let width = 400,
  height = 400,
  padding = { left: 30, right: 30, top: 20, bottom: 30 },
  rectWidth = 30,
  rectPadding = 5,
  bodyHeight = height - padding.top - padding.bottom

let svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)

let data = [10, 20, 30, 40, 33, 24, 12, 5],
  maxData = 45

let scaleX = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([0, (rectWidth + rectPadding) * data.length + rectPadding])

let scaleY = d3.scaleLinear()
  .domain([0, maxData])
  .range([bodyHeight, 0])

let axisX = d3.axisBottom().scale(scaleX)
let axisY = d3.axisLeft().scale(scaleY)

let bars = svg.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', (d, i) => {
    return 'translate(' + (padding.left + (rectWidth + rectPadding) * i) + ', ' + padding.top + ')'
  })

bars.append('rect')
  .attr('y', 0)
  .attr('width', rectWidth)
  .attr('height', 0)
  .attr('fill', 'steelblue')
  .transition()
  .duration(2000)
  .ease(d3.easeBounce)
  .attr('y', d => scaleY(d))
  .attr('height', d => bodyHeight - scaleY(d))

bars.append('text')
  .attr('fill', '#333')
  .attr('x', 3)
  .attr('y', d => scaleY(d) - 2)
  .text(d => d)

svg.append('g')
  .call(axisY)
  .attr('transform', 'translate(' + (padding.left - rectPadding) + ', ' + padding.top + ')')

svg.append('g')
  .call(axisX)
  .attr('transform', 'translate(' + (padding.left - rectPadding) + ', ' + (height - padding.bottom) + ')')
