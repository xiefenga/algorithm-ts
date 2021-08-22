import Map from '@/types/interface/Map'
import BinaryTree from '@/tree/BinaryTree'
import AVLTree from '@/tree/AVLTree'
import { hashCode, INTENAL_ID } from '@/hash/hashCode'


class Node<K, V> {

  constructor(
    public key: K,
    public value?: V
  ) { }

}


class HashMap<K, V> implements Map<K, V> {

  private bucket: AVLTree<Node<K, V>>[]

  public constructor() {
    this.bucket = new Array<null>(16)
      .fill(null)
      .map(() => new AVLTree((a, b) => {
        if (a.key === b.key) {
          return 0
        } else if (typeof a.key === 'number' && typeof b.key === 'number') {
          return a.key - b.key
        } else if (typeof a.key === 'bigint' && typeof b.key === 'bigint') {
          return Number(a.key - b.key)
        } else {
          const str1 = JSON.stringify(a.key), str2 = JSON.stringify(b.key)
          if (str1 === str2) {
            return Reflect.get(a.key as Object, INTENAL_ID) - Reflect.get(b.key as Object, INTENAL_ID)
          } else if (str1 < str2) {
            return -1
          } else {
            return 1
          }
        }
      }))
  }

  public clear(): void {
    this.bucket.forEach(tree => tree.clear())
  }

  public delete(key: K): void {
    const index = hashCode(key) % 16
    this.bucket[index].remove(new Node(key))
  }

  public get(key: K): V | undefined {
    let value: V | undefined = undefined
    const index = hashCode(key) % 16
    BinaryTree.levelOrderTraversal(this.bucket[index], treeNode => {
      if (treeNode.val.key === key) {
        value = treeNode.val.value
        return true
      }
    })
    return value
  }


  public has(key: K): boolean {
    let has = false
    const index = hashCode(key) % 16
    BinaryTree.levelOrderTraversal(this.bucket[index], treeNode => {
      if (treeNode.val.key === key) {
        has = true
        return true
      }
    })
    return has
  }

  public set(key: K, value: V): void {
    const index = hashCode(key) % 16
    this.bucket[index].insert(new Node(key, value))
  }

  public size(): number {
    return this.bucket.reduce((sum, tree) => sum + tree.size(), 0)
  }

}

export default HashMap