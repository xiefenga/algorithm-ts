import Map from '@/types/interface/Map'
import BinaryTree from '@/tree/BinaryTree'
import RedBlackTree from '@/tree/RedBlackTree'
import Comparator from '@/types/helper/Comparator'
import AVLTree from '@/tree/AVLTree'

class Node<K, V> {

	constructor(
		public key: K,
		public value?: V
	) { }
}

class TreeMap<K, V> implements Map<K, V> {

	private tree: AVLTree<Node<K, V>>

	public constructor(comparator: Comparator<K>) {
		this.tree = new AVLTree<Node<K, V>>((a, b) => comparator(a.key, b.key))
	}

	public clear(): void {
		this.tree.clear()
	}

	public delete(key: K): void {
		this.tree.remove(new Node(key))
	}

	public get(key: K): V | undefined {
		let value: V | undefined = undefined
		BinaryTree.preorderTraversal(this.tree, treeNode => {
			const node = treeNode.val
			if (node.key === key) {
				value = node.value
				return true
			}
		})
		return value
	}

	public has(key: K): boolean {
		let has = false
		BinaryTree.levelOrderTraversal(this.tree, treeNode => {
			if (treeNode.val.key === key) {
				has = true
				return true
			}
		})
		return has
	}

	public set(key: K, value: V): void {
		this.tree.insert(new Node(key, value))
	}

	public size(): number {
		return this.tree.#size
	}

}


export default TreeMap