// import 'mocha/mocha.css'
// import 'mocha/mocha.js'

import Graph from '@/graph/Graph'

const graph = new Graph<number>()

const vertices = [
  1, 4, 6, 7, 9, 23, 19, 34
]

vertices.forEach(v => graph.addVertex(v))

graph.addEdge(1, 4)
graph.addEdge(1, 9)
graph.addEdge(1, 34)

console.log(
  graph.toString()
)

