import * as d3 from 'd3'
// import './assets/css/chart1.css'
// import './assets/css/chart2.css'
// import './assets/css/chart3.css'

window.d3 = d3

renderChart4()


function renderChart1() {
  let data = [4, 8, 15, 16, 23, 42]
  d3.select('body').append(d3.creator('div')).attr('id', 'chart')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .style('height', d => d + 'px')
}

function renderChart2() {
  let colorMap = d3.interpolateRgb(
    d3.rgb('#d6e685'),
    d3.rgb('#1e6823')
  )
  let data = [.2, .4, 0, 0, .13, .92]

  d3.select('body').append(d3.creator('div')).attr('id', 'chart')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .style('background-color', (d) => {
      return d === 0 ? '#eee' : colorMap(d)
    })
}

function helloSvg() {
  let chart = d3.select('body').append(d3.creator('svg')).attr('id', 'chart').attr('width', 200).attr('height', 200)
  let data = [
    { x: 100, y: 90 },
    { x: 150, y: 30 },
    { x: 50, y: 30 },
    { x: 100, y: 90 }
  ]

  chart.append('circle')
    .attr('fill', '#3E5693')
    .attr('cx', 50)
    .attr('cy', 120)
    .attr('r', 20)

  chart.append('text')
    .attr('x', 100)
    .attr('y', 100)
    .text('Hello SVG!')

  let line = d3.line()
    .x(d => d.x)
    .y(d => 100 - d.y)

  chart.append('path')
    .attr('fill', '#BEDBC3')
    .attr('stroke', '#539E91')
    .attr('stroke-width', 3)
    .attr('d', line(data))
}

function renderChart3() {
  let data = [{
    label: "7am",
    sales: 20
  }, {
    label: "8am",
    sales: 12
  }, {
    label: "9am",
    sales: 8
  }, {
    label: "10am",
    sales: 27
  }]

  let g = d3.select('body').append(d3.creator('svg')).attr('id', 'chart').attr('width', 250).attr('height', 100)
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')

  g.append('circle')
    .attr('cy', 40)
    .attr('cx', (d, i) => (i + 1) * 50)
    .attr('r', d => d.sales)

  g.append('text')
    .attr('y', 90)
    .attr('x', (d, i) => (i + 1) * 50)
    .text(d => d.label)
}

function renderChart4() {
  let data = [
    { x: 0, y: 30 },
    { x: 50, y: 20 },
    { x: 100, y: 40 },
    { x: 150, y: 80 },
    { x: 200, y: 95 }
  ]
  let height = window.innerHeight
  let width = window.innerWidth
  let padding = 20
  let xScale = d3.scaleLinear()
    .domain([0, 200])
    .range([padding, width - padding])
  let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - padding, padding])

  let line = d3.line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveLinear);

  let chart = d3.select('body').append(d3.creator('svg')).attr('id', 'chart').attr('width', width).attr('height', height)
  chart.append('path')
    .attr('fill', 'transparent')
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('d', line(data))
}
