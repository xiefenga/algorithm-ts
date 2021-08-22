import RBNode from '@/types/helper/RBNode'
import BinarySearchTree from './BinarySearchTree'

class RedBlackTree<T> extends BinarySearchTree<T> {

	protected root: RBNode<T> | null = null

	protected createNode(val: T): RBNode<T> {
		return new RBNode<T>(val)
	}

	public insert(val: T): void {
		if (!this.root) {
			this.root = new RBNode(val)
			this.root.black()
			this.nodes++
			return
		}
		let node: RBNode<T> | null = this.root
		let prev: RBNode<T> = <RBNode<T>>node
		while (node) {
			prev = node
			if (this.compare(val, node.val) < 0) {
				node = node.left
			} else if (this.compare(val, node.val) > 0) {
				node = node.right
			} else {
				return
			}
		}
		node = new RBNode(val)
		node.parent = prev
		this.compare(val, prev.val) < 0
			? prev.left = node
			: prev.right = node
		this.nodes++
		this.fixAdd(node)
	}

	// 修复红黑树
	private fixAdd(node: RBNode<T>): void {
		const parent = node.parent
		// 上溢到根节点的情况
		if (!parent) {
			node.black()
			return
		}
		if (parent.isBlack()) {
			return
		}
		const uncle = parent.sibling()
		const grand = <RBNode<T>>parent.parent
		if (!uncle || uncle.isBlack()) {
			if (parent.isLeftChild()) { // L
				if (node.isLeftChild()) { // LL 
					parent.black() // parent 染黑
					grand.red()
					this.rotateRight(grand) // grand 右单旋
				} else {  // LR
					node.black()
					grand.red()
					this.rotateLeft(parent)
					this.rotateRight(grand)
				}
			} else { // R
				if (node.isRightChild()) { // RR  parent 左旋转
					parent.black() // parent 染黑
					grand.red()
					this.rotateLeft(grand) // grand 右单旋
				} else { // RL
					node.black()
					grand.red()
					this.rotateRight(parent)
					this.rotateLeft(grand)
				}
			}
		} else if (uncle.isRed()) {
			parent.black()
			uncle.black()
			grand.red()
			this.fixAdd(grand)
		}
	}

	public remove(val: T): void {
		if (!this.root) {
			return
		}
		let node: RBNode<T> | null = this.root
		while (node) {
			if (this.compare(val, node.val) < 0) {
				node = node.left
			} else if (this.compare(val, node.val) > 0) {
				node = node.right
			} else {
				this.nodes--
				if (node.right && node.left) {  // 度为2，找后继节点
					node.val = (<RBNode<T>>this.successor(node)).val
					val = node.val
					node = node.right
				} else if (node.isLeave()) { // 度为 0
					if (!node.parent) {
						this.root = null
						return
					}
					const parent = node.parent
					this.fixRemove(node)
					node.isLeftChild()
						? parent.left = null
						: parent.right = null
					return
				} else { // 度为1
					if (node.left) {
						node.left.parent = node.parent
						if (!node.parent) {
							this.root = node.left
						} else {
							node.isLeftChild()
								? node.parent.left = node.left
								: node.parent.right = node.left
						}
						node.left.black()
					}
					if (node.right) {
						node.right.parent = node.parent
						if (!node.parent) {
							this.root = node.right
						} else {
							node.isLeftChild()
								? node.parent.left = node.right
								: node.parent.right = node.right
						}
						node.right.black()
					}
					return
				}
			}
		}
	}

	private fixRemove(node: RBNode<T>): void {
		if (node.isRed()) {
			return
		}
		const parent = <RBNode<T>>node.parent
		if (!parent) { // 说明到上溢到了顶部
			return
		}
		const sibling = <RBNode<T>>node.sibling()
		if (sibling.isBlack()) {
			if (sibling.hasRedChild()) { // 兄弟节点有红色子节点
				if (node.isRightChild()) {
					if (sibling.left) {
						this.rotateRight(parent)
						parent.isBlack()
							? sibling.black()
							: sibling.red()
						sibling.left && sibling.left.black()
						sibling.right && sibling.right.black()
					} else if (sibling.right) {
						parent.isBlack()
							? sibling.right.black()
							: sibling.right.red()
						this.rotateLeft(sibling)
						this.rotateRight(parent)
						parent.black()
					}
				} else {
					if (sibling.right) {
						this.rotateLeft(parent)
						parent.isBlack()
							? sibling.black()
							: sibling.red()
						sibling.left && sibling.left.black()
						sibling.right && sibling.right.black()
					} else if (sibling.left) {
						parent.isBlack()
							? sibling.left.black()
							: sibling.left.red()
						this.rotateRight(sibling)
						this.rotateLeft(parent)
						parent.black()
					}
				}
			} else {
				sibling.red()
				if (parent.isBlack()) {
					this.fixRemove(parent)
					return
				}
				parent.black()
			}
		} else {
			sibling.black()
			parent.red()
			this.rotateRight(parent)
			this.fixRemove(node)
		}
	}

	// LL 右单旋
	private rotateRight(root: RBNode<T>): void {
		const left = <RBNode<T>>root.left
		const leftRight = left.right
		const parent = root.parent
		if (parent) {
			root.isLeftChild()
				? parent.left = left
				: parent.right = left
		}
		// 旋转
		left.right = root
		root.left = leftRight
		// 更新parent
		left.parent = parent
		leftRight && (leftRight.parent = root)
		root.parent = left
		// 如果传进来的 root 是根节点，旋转之后根节点需要改变
		this.root === root && (this.root = left)
	}

	// RR  左单旋
	private rotateLeft(root: RBNode<T>): void {
		const right = <RBNode<T>>root.right
		const rightLeft = right.left
		const parent = root.parent
		if (parent) {
			root.isLeftChild()
				? parent.left = right
				: parent.right = right
		}
		// 旋转
		right.left = root
		root.right = rightLeft
		// 更新 parent
		right.parent = parent
		rightLeft && (rightLeft.parent = root)
		root.parent = right
		// 如果传进来的 root 是根节点，旋转之后根节点需要改变
		this.root === root && (this.root = right)
	}

}

export default RedBlackTree