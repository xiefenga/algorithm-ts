import UnionFind from './UnionFind'

class QuickUnion extends UnionFind {

  public find(v: number): number {
    this.checkIndex(v)
    while (v !== this.parents[v]) {
      v = this.parents[v]
    }
    return v
  }

  public union(v1: number, v2: number): void {
    const p1 = this.find(v1)
    const p2 = this.find(v2)
    if (p1 !== p2) {
      this.parents[p1] = p2
    }
  }

}

export default QuickUnion