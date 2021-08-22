import MinHeap from '../heap/MinHeap.js'
import { QuickFind } from '../unionfind/UnionFind.js'

const Prim = Symbol.for('Prim')
const Kruskal = Symbol.for('Kruskal')
const Dijkstra = Symbol('Dijkstra')
const bellmanFord = Symbol('bellman-Ford')
const getMinPath = Symbol('getMinPath')

class Edge {
    constructor(from, to, weight) {
        this.from = from
        this.to = to
        this.weight = weight
    }
    equals(edge, dircted) {
        const { from, to, weight } = edge
        const flag = dircted ? this.from == from && this.to == to : (this.from == from && this.to == to) || (this.to == from && this.from == to)
        if (flag && this.weight == weight) {
            return true
        }
        return false
    }
}

class WeightGraph {
    #adj = new Map();
    #vertices = [];
    #edges = [];

    constructor(directed = false) {
        this.isDirected = directed
    }

    addVertex(v) {
        if (this.#vertices.includes(v)) return
        this.#vertices.push(v)
        this.#adj.set(v, [])
    }

    addEdge(v, w, weight) {
        const adj = this.#adj
        if (!adj.get(v)) this.addVertex(v)
        if (!adj.get(w)) this.addVertex(w)
        const neighbours = adj.get(v)
        let flag = false
        const edge = new Edge(v, w, weight)
        neighbours.forEach(item => {
            if (item.equals(edge, this.isDirected)) flag = true
        })
        if (!flag) {
            neighbours.push(edge)
            this.#edges.push(edge)
            if (!this.isDirected) {
                adj.get(w).push(new Edge(w, v, weight))
            }
        }
    }

    mst(type = 'Prim') {
        if (this.isDirected) {
            throw new Error('only undirected graph has mst')
        }
        type = type.charAt(0).toUpperCase() + type.slice(1)
        if (!type.includes('Prim') && !type.includes('Kruskal')) {
            throw new Error('only support Prim or Kruskal, do not implement algorithm that you assigned')
        }
        return this[Symbol.for(type)]()
    }

    [Prim]() {
        const marked = [] // 已经切分过的最小生成树的顶点
        const mst = []  //  最小生成树的边
        const vertices = this.#vertices
        const adj = this.#adj
        const len = vertices.length
        const v = vertices[0]
        marked.push(v)
        const neigubours = adj.get(v)
        const heap = new MinHeap(neigubours, (i, j) => i.weight - j.weight)  // 横切边

        while (!heap.isEmpty() && mst.length < len - 1) {
            const edge = heap.delMin()
            const { from, to, weight } = edge
            // ！！！ 忽略多余的边（顶点都是已经成为 mst 的一部分，
            // 但是边依旧在堆中而且比其他的边小，但是边无效）
            if (marked.includes(from) && marked.includes(to)) {
                continue
            }
            mst.push(edge)
            marked.push(to)
            const neigubours = adj.get(to)
            for (const neigubour of neigubours) {
                if (!marked.includes(neigubour.to)) {
                    heap.add(neigubour)
                }
            }
        }
        return mst
    }

    [Kruskal]() {
        // 将所有的边入堆
        const heap = new MinHeap(this.#edges, (i, j) => i.weight - j.weight)
        const mst = []  //  最小生成树的边
        const uf = new QuickFind(this.#vertices)
        const len = this.#vertices.length
        while (!heap.isEmpty() && mst.length < len - 1) {
            const minEdge = heap.delMin()
            if (mst.length > 2) {
                if (uf.isSame(minEdge.from, minEdge.to)) {
                    continue
                }
            }
            mst.push(minEdge)
            uf.union(minEdge.from, minEdge.to)
        }
        return mst
    }

    shortestPath(v) {
        return this[bellmanFord](v)
    }
    shortPath(v) {
        return this[Dijkstra](v)
    }

    [Dijkstra](v) {
        if (!this.#vertices.includes(v)) return null
        const adj = this.#adj
        const paths = new Map()
        const minPath = new Map()  // 存放已经确定的顶点（已经离开桌面）

        // 初始化 paths (用起点的outEdges) {
        for (const edge of adj.get(v)) {
            const { to: vertex, weight } = edge
            paths.set(vertex, {
                path: [v, vertex],
                weight
            })
        }

        while (paths.size) {
            const [vertex, pathInfo] = this[getMinPath](paths)
            minPath.set(vertex, pathInfo)
            paths.delete(vertex)
            // 对该顶点的outEdges 进行松弛操作
            for (const edge of adj.get(vertex)) {
                const { to, weight } = edge
                // 如果 to顶点已经离开桌面 / 是开始顶点，就没必要进行松弛操作
                if (to == v || minPath.has(to)) continue
                const toPathInfo = paths.get(to)
                if (toPathInfo == null || toPathInfo.weight > pathInfo.weight + weight) {
                    paths.set(to, {
                        path: [...pathInfo.path, to],
                        weight: pathInfo.weight + weight
                    })
                }
            }
        }
        return minPath
    }

    [bellmanFord](v) {
        if (!this.#vertices.includes(v)) return null
        const minPath = new Map()
        minPath.set(v, { path: [v], weight: 0 })
        const edges = this.#edges
        const len = this.#vertices.length
        for (let i = 0; i < len - 1; i++) {
            for (const edge of edges) {
                const { from, to, weight } = edge
                this.relax(minPath, from, to, weight)
                if (!this.isDirected) {
                    this.relax(minPath, to, from, weight)
                }
            }
        }
        minPath.delete(v)
        return minPath
    }

    relax(minPath, from, to, edgeWeight) {
        const fromPathInfo = minPath.get(from)
        const toPathInfo = minPath.get(to)
        if (fromPathInfo == null || toPathInfo && fromPathInfo.weight + edgeWeight > toPathInfo.weight) {
            return false
        } else {
            let path = [...fromPathInfo.path, to]
            const weight = fromPathInfo.weight + edgeWeight
            minPath.set(to, {
                path,
                weight
            })
        }
        return true
    }

    [getMinPath](paths) {
        let minPath = null
        for (const path of paths) {
            if (minPath == null || minPath[1].weight > path[1].weight) {
                minPath = path
            }
        }
        return minPath
    }




    toString() {
        let s = ''
        for (let i = 0; i < this.#vertices.length; i++) {
            s += `${this.#vertices[i]} -> `
            const neighbors = this.#adj.get(this.#vertices[i])
            if (!neighbors.length) {
                s += 'null'
            }
            neighbors.forEach(item => {
                s += `${item.to}(weight:${item.weight.toString().padStart(2, ' ')})  `
            })
            s += '\n'
        }
        return s
    }
}

export default WeightGraph
