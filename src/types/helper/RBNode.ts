import TreeNode from './TreeNode'

import { NodeColor } from '@/types/helper/enums'

class RBNode<T> extends TreeNode<T> {

	// 真 private
	#color: NodeColor

	public right: RBNode<T> | null = null
	public left: RBNode<T> | null = null
	public parent: RBNode<T> | null = null

	public constructor(val: T)
	public constructor(val: T, color: NodeColor)
	public constructor(val: T, color = NodeColor.RED) {
		super(val)
		this.#color = color
	}

	public get color(): NodeColor {
		return this.#color
	}

	public black(): void {
		this.#color = NodeColor.BLACK
	}

	public red(): void {
		this.#color = NodeColor.RED
	}

	public isBlack(): boolean {
		return this.#color === NodeColor.BLACK
	}

	public isRed(): boolean {
		return this.#color === NodeColor.RED
	}

	public isLeftChild(): boolean {
		return this.parent?.left === this
	}

	public isRightChild(): boolean {
		return this.parent?.right === this
	}

	public sibling(): RBNode<T> | null {
		if (this.parent) {
			return this.isLeftChild()
				? this.parent.right
				: this.parent.left
		}
		return null
	}

	public hasRedChild(): boolean {
		if (this.isLeave()) {
			return false
		} else if (this.left && this.left.isRed()) {
			return true
		} else if (this.right && this.right.isRed()) {
			return true
		}
		return false
	}
}

export default RBNode