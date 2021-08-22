import IUnionFind from '@/types/interface/UnionFind'

abstract class UnionFind implements IUnionFind<number> {

  protected parents: number[]

  public constructor(capacity: number) {
    if (capacity < 0 || !Number.isInteger(capacity)) {
      throw new TypeError('capacity must be positive integer')
    }
    // 开始每个人自己自成一派
    this.parents = new Array<number>(capacity)
    for (let i = 0; i < capacity; i++) {
      this.parents[i] = i
    }
  }

  protected checkIndex(index: number) {
    if (
      index < 0 ||
      !Number.isInteger(index) ||
      (this.parents && index > this.parents.length)
    ) {
      throw new TypeError('index must be right')
    }
  }

  public abstract find(v: number): number

  public abstract union(v: number, w: number): void

}

export default UnionFind