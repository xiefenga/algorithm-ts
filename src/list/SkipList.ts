import Map from '@/types/interface/Map'
import Comparator from '@/types/helper/Comparator'

class SkipList<K, V> implements Map<K, V> {

  private static MAX_LEVEL: number = 32

  private static P: number = 0.25

  private compare: Comparator<K>

  /* 头节点具有 MAX_LEVEL 层 */
  private head: Node<K, V>

  private keys: number = 0

  /* 当前最高的层数，有效层数 */
  private level: number = 0

  public constructor(comparator: Comparator<K>) {
    this.compare = comparator
    this.head = new Node(SkipList.MAX_LEVEL)
  }

  public size(): number {
    return this.keys
  }

  public clear(): void {
    this.head = new Node(SkipList.MAX_LEVEL)
  }

  public set(key: K, value: V): void {
    let node = this.head
    const prevs = new Array<Node<K, V>>(this.level)
    for (let i = this.level - 1; i >= 0; i--) {
      let cmp = -1
      while (
        node.nexts[i] !== null &&
        (cmp = this.compare(key, node.nexts[i]!.key!)) > 0
      ) {
        node = node.nexts[i]!
      }
      // 记录前驱节点
      prevs[i] = node
      if (cmp === 0) { // 节点是存在的
        return
      }
    }

    const newLevel = this.randomLevel()

    const newNode = new Node<K, V>(key, value, newLevel)
    // 设置前驱和后继
    for (let i = 0; i < newLevel; i++) {
      if (i >= this.level) {
        this.head.nexts[i] = newNode
      } else {
        newNode.nexts[i] = prevs[i].nexts[i]
        prevs[i].nexts[i] = newNode
      }
    }

    this.keys++

    this.level = Math.max(this.level, newLevel)
  }

  public delete(key: K): void {
    let node = this.head
    const prevs = new Array<Node<K, V>>(this.level)
    let exist = false
    for (let i = this.level - 1; i >= 0; i--) {
      let cmp = -1
      while (node.nexts[i] !== null &&
        (cmp = this.compare(key, node.nexts[i]!.key!)) > 0
      ) {
        node = node.nexts[i]!
      }
      // 记录前驱节点
      prevs[i] = node
      if (cmp === 0) {
        exist = true
      }
    }
    if (!exist) {
      return
    }
    const removedNode = node.nexts[0]!
    // 设置后继
    for (let i = 0; i < removedNode.nexts.length; i++) {
      prevs[i].nexts[i] = removedNode.nexts[i]
    }
    this.keys--

    // 更新跳表的层数
    let newLevel = this.level
    while (--newLevel >= 0 && this.head.nexts[newLevel] === null) {
      this.level = newLevel
    }
  }

  public get(key: K): V | undefined {
    return this.getNode(key)?.value!
  }

  public has(key: K): boolean {
    return !!this.getNode(key)
  }

  private getNode(key: K): Node<K, V> | undefined {
    let node = this.head
    for (let i = this.level - 1; i >= 0; i--) {
      let cmp = -1
      while (node.nexts[i] !== null &&
        (cmp = this.compare(key, node.nexts[i]!.key!)) > 0
      ) {
        node = node.nexts[i]!
      }
      // node.nexts[i].key >= key
      if (cmp === 0) {
        return node.nexts[i]!
      }
    }
  }

  private randomLevel(): number {
    let level = 1
    const { P, MAX_LEVEL } = SkipList
    while (Math.random() < P && level < MAX_LEVEL) {
      level++
    }
    return level
  }

}


class Node<K, V> {

  public key: K | null
  public value: V | null
  public nexts: Array<Node<K, V> | null>

  public constructor(level: number)
  public constructor(key: K, value: V, level: number)
  public constructor(...args: [number] | [K, V, number]) {
    const [key, value, level] = args.length === 3 ? args : [null, null, args[0]]
    this.key = key
    this.value = value
    this.nexts = new Array(level).fill(null)
  }
}

export default SkipList