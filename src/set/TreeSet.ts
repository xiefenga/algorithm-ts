import Set from '@/types/interface/Set'
import BinaryTree from '../tree/BinaryTree'
import RedBlackTree from '../tree/RedBlackTree'
import Comparator from '@/types/helper/Comparator'

class TreeSet<T> implements Set<T> {

	private tree: RedBlackTree<T>

	public constructor(comparator: Comparator<T>) {
		this.tree = new RedBlackTree(comparator)
	}

	public add(value: T): this {
		this.tree.insert(value)
		return this
	}

	public delete(value: T): boolean {
		this.tree.remove(value)
		return true
	}

	public has(value: T): boolean {
		let has = false
		BinaryTree.postorderTraversal(this.tree, val => {
			if (val.val === value) {
				has = true
				return true
			}
		})
		return has
	}

	public clear(): void {
		this.tree.clear()
	}

	public isEmpty(): boolean {
		return this.size() === 0
	}

	public size(): number {
		return this.tree.#size
	}
}


export default TreeSet