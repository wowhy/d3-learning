import * as d3 from 'd3'
import 'assets/css/chart1.css'

window.d3 = d3

let delays = 0
let data = [5, 4, 1, 7, 8, 10, 3, 2, 9]
let scaleY = d3.scaleLinear().domain([0, d3.max(data)]).range([0, 100])

window.btnInit.onclick = init
window.btnBubble.onclick = bubblesort
window.btnMerge.onclick = mergesort

d3.select('div#chart').selectAll('div')
  .data(data, (d, i) => i)
  .enter()
  .append('div')
  .style('height', d => scaleY(d) + 'px')

function init() {
  data = [5, 4, 1, 7, 8, 10, 3, 2, 9];
  scaleY = d3.scaleLinear().domain([0, d3.max(data)]).range([0, 100]);
  render(0);
}

function bubblesort() {
  delays = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      if (data[i] > data[j]) {
        let tmp = data[i]
        data[i] = data[j]
        data[j] = tmp

        render(delays++ * 800)
      }
    }
  }
}

function mergesort(m, n) {
  if (typeof m !== 'number') {
    m = 0
    n = data.length - 1
    delays = 0
  }

  if (m < n) {
    let q = Math.floor((m + n) / 2)

    mergesort(m, q)
    mergesort(q + 1, n)
    merge(m, q, n)
  }
}

function merge(m, q, n) {
  // merge [m..q] , [q+1..n]
  console.log('merge [%d..%d], [%d, %d]', m, q, q + 1, n)

  let len1 = q - m + 1
  let len2 = n - q

  let i, j

  let l = [],
    r = [];
  for (i = 0; i < len1; i++) {
    l.push(data[m + i])
  }

  for (j = 0; j < len2; j++) {
    r.push(data[q + 1 + j])
  }

  l.push(Number.POSITIVE_INFINITY)
  r.push(Number.POSITIVE_INFINITY)

  i = j = 0
  for (let k = m; k <= n; k++) {
    if (l[i] <= r[j]) {
      data[k] = l[i]
      i++
    } else {
      data[k] = r[j]
      j++
    }
  }

  render(delays++ * 800)
}

function render(delay) {
  d3.select('div#chart').selectAll('div')
    .data(data, (d, i) => i)
    .transition()
    .delay(delay)
    .duration(200)
    .style('height', d => scaleY(d) + 'px')
}
