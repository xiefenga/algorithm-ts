const depthFirstSearch = Symbol('depthFirstSearch')
const topologicalSortByBFS = Symbol('topologicalSortByBFS')
const topologicalSortByDFS = Symbol('topologicalSortByDFS')
class Graph {
    #vertices = [];
    #adj = new Map();

    constructor(directed = false) {
        this.isDirected = directed
    }
    addVertex(v) {
        if (this.#vertices.includes(v)) return
        this.#vertices.push(v)
        this.#adj.set(v, [])
    }

    addEdge(v, w) {
        if (!this.#adj.get(v)) this.addVertex(v)
        if (!this.#adj.get(w)) this.addVertex(w)
        const neighbours = this.#adj.get(v)
        if (!neighbours.includes(w)) {
            neighbours.push(w)
            if (!this.isDirected) this.#adj.get(w).push(v)
        }
    }

    removeVertice(v) {
        const index = this.#vertices.indexOf(v)
        if (index === -1) return
        this.#vertices.splice(index, 1)
        this.#adj.delete(v)
        for (const adj of this.#adj) {
            const neighbours = adj[1]
            const index = neighbours.indexOf(v)
            if (index !== -1) {
                neighbours.splice(index, 1)
            }
        }
    }

    removeEdge(v, w) {
        const neighbours = this.#adj.get(v)
        const index = neighbours.indexOf(w)
        if (index === -1) return
        neighbours.splice(index, 1)
        if (!this.isDirected) {
            const neighbours = this.#adj.get(w)
            const index = neighbours.indexOf(v)
            neighbours.splice(index, 1)
        }
    }

    bfs(v, callback) {
        const queue = []
        const marked = []
        queue.unshift(v)
        marked.push(v)
        callback && callback(v, null)
        while (queue.length !== 0) {
            const vertex = queue.pop()
            const neighours = this.#adj.get(vertex)
            for (const n of neighours) {
                if (!marked.includes(n)) {
                    queue.unshift(n)
                    marked.push(n)
                    callback && callback(n, vertex)
                }
            }
        }
    }

    dfs(v, callback) {
        const marked = []
        this[depthFirstSearch](v, callback, marked)
    }

    [depthFirstSearch](v, callback, marked) {
        marked.push(v)
        const neighours = this.#adj.get(v)
        callback && callback(v, neighours)
        for (const n of neighours) {
            if (!marked.includes(n)) {
                this[depthFirstSearch](n, callback, marked)
            }
        }
    }

    getPath(v, w) {
        const edgeTo = new Map()
        this.bfs(v, (cur, prev) => {
            edgeTo.set(cur, prev)
        })
        if (edgeTo.get(w) != null) {
            const path = []
            while (w !== null) {
                path.push(w)
                w = edgeTo.get(w)
            }
            return path.reverse()
        }
        return null
    }

    topologicalSort(method = 'BFS') {
        return method == 'BFS' ? this[topologicalSortByBFS]() : this[topologicalSortByDFS]()
    }

    [topologicalSortByBFS]() {
        if (!this.isDirected) {
            throw new Error('Graph must be DAG')
        }
        const inDegrees = new Map()
        for (const v of this.#adj) {
            const num = inDegrees.get(v[0]) || 0
            inDegrees.set(v[0], num)
            for (const n of v[1]) {
                const num = inDegrees.get(n) || 0
                inDegrees.set(n, num + 1)
            }
        }
        const queue = []
        for (const inEdge of inDegrees) {
            const v = inEdge[0]
            const inNum = inEdge[1]
            if (inNum == 0) {
                queue.unshift(v)
            }
        }
        const res = []
        while (queue.length != 0) {
            const v = queue.pop()
            console.log(v)
            res.push(v)
            inDegrees.delete(v)
            const neighbours = this.#adj.get(v)
            for (const n of neighbours) {
                const num = inDegrees.get(n)
                inDegrees.set(n, num - 1)
                if (num - 1 == 0) {
                    queue.unshift(n)
                }
            }
        }
        if (res.length != this.#vertices.length) {
            throw new Error('Graph must be DAG')
        }
        return res
    }

    [topologicalSortByDFS]() {
        return null
    }

    getVertices() {
        return this.#vertices
    }

    getAdj() {
        return this.#adj
    }

    toString() {
        let s = ''
        for (let i = 0; i < this.#vertices.length; i++) {
            s += `${this.#vertices[i]} -> `
            const neighbors = this.#adj.get(this.#vertices[i])
            s += `[${neighbors.join(' , ')}] \n`
        }
        return s
    }
}

export default Graph



