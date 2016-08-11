import * as d3 from 'd3'
import topojson from 'topojson'

var width = 900,
  height = 900;

var projection = d3.geoOrthographic()
  .scale(width / 2 - 5)
  .translate([width / 2, height / 2])
  .clipAngle(90)
  .precision(.1);

var path = d3.geoPath()
  .projection(projection);

var graticule = d3.geoGraticule();

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

svg.append('defs').append('path')
  .datum({ type: 'Sphere' })
  .attr('id', 'sphere')
  .attr('d', path);

svg.append('use')
  .attr('class', 'stroke')
  .attr('xlink:href', '#sphere');

svg.append('use')
  .attr('class', 'fill')
  .attr('xlink:href', '#sphere');

svg.append('path')
  .datum(graticule)
  .attr('class', 'graticule')
  .attr('d', path);

require(['assets/json/world-50m.json'], function(world) {
  svg.insert('path', '.graticule')
    .datum(topojson.feature(world, world.objects.land))
    .attr('class', 'land')
    .attr('d', path);

  svg.insert('path', '.graticule')
    .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
      return a !== b;
    }))
    .attr('class', 'boundary')
    .attr('d', path);
})

// d3.json('/assets/json/world-50m.json', function(error, world) {
//   if (error) throw error;
// });

d3.select(self.frameElement).style('height', height + 'px');
