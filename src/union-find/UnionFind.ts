import IUnionFind from '@/types/interface/UnionFind'

class UnionFind<T> implements IUnionFind<T> {

  private nodes: Map<T, Node<T>> = new Map()

  public constructor(vals: T[]) {
    vals.forEach(val => this.makeSet(val))
  }

  public makeSet(val: T): void {
    if (!this.nodes.has(val)) {
      this.nodes.set(val, new Node(val))
    }
  }

  public find(val: T): T | undefined {
    const node = this.findNode(val)
    return node?.value
  }

  public union(val1: T, val2: T): void {
    const p1 = this.findNode(val1)
    const p2 = this.findNode(val2)
    if (p1 !== null && p2 !== null) {
      if (p1.rank < p2.rank) {
        p1.parent = p2
      } else if (p1.rank > p2.rank) {
        p2.parent = p1
      } else {
        p1.parent = p2
        p2.rank += 1
      }
    }
  }

  public isSame(val1: T, val2: T): boolean {
    return this.find(val1) === this.find(val2)
  }

  private findNode(val: T): Node<T> | null {
    let node = this.nodes.get(val)
    if (node !== undefined) {
      while (node.value !== node.parent.value) {
        node.parent = node.parent.parent
        node = node.parent
      }
      return node
    }
    return null
  }

}

class Node<T> {

  public value: T

  public rank: number

  public parent: Node<T>

  public constructor(value: T) {
    this.value = value
    this.parent = this
    this.rank = 1
  }
}

export default UnionFind