import * as d3 from 'd3'

let width = 300,
  height = 300,
  rectHeight = 25,
  margin = { left: 20, top: 0, right: 20, bottom: 20 },
  bodyWidth = width - margin.left - margin.right

let data = [10, 4, 8, 6, 2]

let svg = d3.select('body')
  .append('svg')
  .attr("width", width)
  .attr("height", height)

let scale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, bodyWidth])

let axis = d3.axisBottom().scale(scale)

let bars = svg.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', (d, i) => {
    return 'translate(0, ' + (i * (rectHeight + 4) + margin.top) + ')'
  })

bars.append('rect')
  .attr('width', (d) => {
    return scale(d)
  })
  .attr('height', rectHeight)
  .attr('fill', 'steelblue')
  .attr('x', margin.left)

bars.append('text')
  .text(d => d)
  .attr('fill', '#333')
  .attr('x', d => scale(d) + margin.left)
  .attr('y', rectHeight / 2 + 4)

bars.append('text')
  .text((d, i) => i)
  .attr('fill', '#333')
  .attr('y', rectHeight / 2 + 4)


svg.append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + (data.length * (rectHeight + 4) + margin.top) + ')')
  .call(axis)
