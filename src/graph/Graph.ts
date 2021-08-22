
type Visitor<T> = (vertex: T, neighbors: Set<T>) => void

class Edge<V, W> {

	public constructor(
		public from: V,
		public to: V,
		public weight: W
	) { }

	public equals(edge: Edge<V, W>, dircted: boolean) {
		const { from, to, weight } = edge
		const flag = dircted
			? this.from == from && this.to == to
			: (this.from == from && this.to == to) ||
			(this.to == from && this.from == to)

		return flag && this.weight == weight
	}
}

class Graph<V> {

	protected vertices = new Set<V>()

	protected adj = new Map<V, Set<V>>()

	#isDirected: boolean

	public constructor()
	public constructor(directed: boolean)
	public constructor(directed: boolean = false) {
		this.#isDirected = directed
	}

	public isDirected(): boolean {
		return this.#isDirected
	}

	public addVertex(v: V): void {
		if (!this.vertices.has(v)) {
			this.vertices.add(v)
			this.adj.set(v, new Set<V>())
		}
	}

	public addEdge(from: V, to: V): void {

		this.addVertex(from)

		this.addVertex(to)

		const neighbours = this.adj.get(from)!

		if (!neighbours.has(to)) {
			neighbours.add(to)
			if (!this.#isDirected) {
				this.adj.get(to)!.add(from)
			}
		}
	}

	public removeVertice(v: V): void {
		this.vertices.delete(v)
		this.adj.delete(v)
		for (const [, neighbours] of this.adj) {
			neighbours.delete(v)
		}
	}

	public removeEdge(from: V, to: V): void {
		if (this.vertices.has(from) && this.vertices.has(to)) {
			this.adj.get(from)!.delete(to)
			if (!this.#isDirected) {
				this.adj.get(to)!.delete(from)
			}
		}
	}

	public bfs(root: V, visitor: Visitor<V>): void {
		Graph.bfs(this, root, visitor)
	}

	public dfs(root: V, visitor: Visitor<V>): void {
		if (this.vertices.has(root)) {
			const marked: V[] = []
			this.depthFirstSearch(root, marked, visitor)
		}
	}

	private depthFirstSearch(v: V, marked: V[], visitor: Visitor<V>): void {
		marked.push(v)
		const neighours = this.adj.get(v)!
		visitor(v, neighours)
		for (const n of neighours) {
			if (!marked.includes(n)) {
				this.depthFirstSearch(n, marked, visitor)
			}
		}
	}

	public static dfs<V>(G: Graph<V>, root: V, visitor: Visitor<V>): void {
		G.dfs(root, visitor)
	}

	public static bfs<V>(G: Graph<V>, root: V, visitor: Visitor<V>): void {
		if (G.vertices.has(root)) {
			const queue: V[] = []
			const marked: V[] = []
			queue.unshift(root)
			marked.push(root)
			while (queue.length) {
				const vertex = queue.pop()!
				const neighours = G.adj.get(vertex)!
				visitor(vertex, neighours)
				for (const neighour of neighours) {
					if (!marked.includes(neighour)) {
						queue.unshift(neighour)
						marked.push(neighour)
					}
				}
			}
		}
	}

	public static topologicalSortByBFS<V>(G: Graph<V>): V[] {
		// 入度
		const inDegrees = new Map<V, number>()

		for (const v of G.adj) {
			const num = inDegrees.get(v[0]) ?? 0
			inDegrees.set(v[0], num)
			for (const n of v[1]) {
				const num = inDegrees.get(n) ?? 0
				inDegrees.set(n, num + 1)
			}
		}

		const queue: V[] = []

		for (const [v, inNum] of inDegrees) {
			if (inNum === 0) {
				queue.unshift(v)
			}
		}

		const res: V[] = []

		while (queue.length) {
			const v = queue.pop()!
			res.push(v)
			inDegrees.delete(v)
			const neighbours = G.adj.get(v)!
			for (const n of neighbours) {
				const num = inDegrees.get(n)!
				inDegrees.set(n, num - 1)
				if (num - 1 === 0) {
					queue.unshift(n)
				}
			}
		}
		if (res.length !== G.vertices.size) {
			throw new Error('Graph must be DAG')
		}
		return res
	}

	public static topologicalSortByDFS<V>(G: Graph<V>): V[] {

		if (!G.isDirected()) {
			// DAG 有向无环图
			throw new Error('Graph must be DAG')
		}

		const marked: V[] = []

		const reversePost: V[] = []

		for (const v of G.vertices) {
			if (!marked.includes(v)) {
				this.topologicalSortDFS(G, v, marked, reversePost)
			}
		}

		return reversePost
	}

	private static topologicalSortDFS<V>(G: Graph<V>, root: V, marked: V[], reversePost: V[]) {
		marked.push(root)
		const neighbors = G.adj.get(root)!.values()
		for (const v of neighbors) {
			if (!marked.includes(v)) {
				this.topologicalSortDFS(G, v, marked, reversePost)
			}
		}
		reversePost.push(root)
	}


	public toString(): string {
		const strs: string[] = []
		for (const vertex of this.vertices) {
			const neighbours = Array.from(this.adj.get(vertex)!.values())
			strs.push(
				`${vertex} -> [ ${neighbours.join(' , ')} ]`
			)
		}
		return strs.join('\n')
	}
}

export default Graph



