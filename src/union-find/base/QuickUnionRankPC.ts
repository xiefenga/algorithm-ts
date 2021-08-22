import QuickUnionRank from './QuickUnionRank'


class QuickUnionRankPC extends QuickUnionRank {

  public override find(v: number): number {
    this.checkIndex(v)

    if (this.parents[v] !== v) {
      this.parents[v] = this.find(this.parents[v])
    }
    return this.parents[v]
  }

}

export default QuickUnionRankPC
