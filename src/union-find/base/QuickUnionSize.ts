import QuickUnion from './QuickUnion'

class QuickUnionSize extends QuickUnion {

  private size: number[]

  public constructor(capacity: number) {
    super(capacity)
    this.size = new Array<number>(capacity).fill(1)
  }

  public override union(v1: number, v2: number): void {
    const p1 = this.find(v1)
    const p2 = this.find(v2)
    if (p1 !== p2) {
      const size1 = this.size[v1]
      const size2 = this.size[v2]
      if (size1 < size2) {
        this.parents[p1] = p2
        this.size[p2] += size1
      } else {
        this.parents[p2] = p1
        this.size[p1] += size2
      }
    }
  }
}


export default QuickUnionSize