import * as d3 from 'd3'
import 'assets/css/linechart1.css'

let chart = d3.select('#container')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')


chart.append('g')
  .attr('transform', 'translate(50, 30)')
