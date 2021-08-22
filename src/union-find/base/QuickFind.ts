import UnionFind from './UnionFind'

class QuickFind extends UnionFind {

	public find(v: number): number {
		this.checkIndex(v)
		return this.parents[v]
	}

	public union(v1: number, v2: number): void {
		const p1 = this.find(v1)
		const p2 = this.find(v2)
		if (p1 !== p2) {
			this.parents = this.parents.map(p => p === p1 ? p2 : p)
		}
	}
}

export default QuickFind

