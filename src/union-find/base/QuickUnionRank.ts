import QuickUnion from './QuickUnion'

export class QuickUnionRank extends QuickUnion {

  private rank: number[]

  public constructor(capacity: number) {
    super(capacity)
    this.rank = new Array<number>(capacity).fill(1)
  }

  public override union(v1: number, v2: number): void {
    const p1 = this.find(v1)
    const p2 = this.find(v2)
    if (p1 !== p2) {
      const rank1 = this.rank[v1]
      const rank2 = this.rank[v2]
      if (rank1 < rank2) {
        this.parents[p1] = p2
      } else if (rank1 > rank2) {
        this.parents[p2] = p1
      } else {
        this.parents[p1] = p2
        this.rank[p2] = rank2 + 1
      }
    }
  }
}

export default QuickUnionRank
