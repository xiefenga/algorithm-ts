import List from '@/types/interface/List'
import Node from '@/types/helper/ListNode'
import { indexCheck } from '@/util/helper'
import { ELEMENT_NOT_FOUNT } from '@/types/helper/constants'

class LinkedList<T> implements List<T> {

	private len: number = 0;

	private head: Node<T> | null = null;

	private tail: Node<T> | null = null;

	public size(): number {
		return this.len
	}

	public isEmpty(): boolean {
		return this.len === 0
	}

	public add(val: T): void;
	public add(index: number, val: T): void;
	public add(...args: [T] | [number, T]): void {
		const [index, val] = args.length === 1 ? [this.len, args[0]] : args
		indexCheck(index, this.len)
		if (this.len === 0) {
			this.head = this.tail = new Node(val)
		} else if (index === this.len) {
			this.tail = this.tail!.next = new Node(val)
		} else {
			const node = this.getElement(index)
			const newNode = new Node(node.val, node.next)
			node.val = val
			node.next = newNode
			if (index === this.len - 1) {
				this.tail = newNode
			}
		}
		this.len++
	}

	public indexOf(val: T): number {
		let node = this.head
		for (let i = 0; i < this.len; i++) {
			if (node!.val === val) {
				return i
			}
			node = node!.next
		}
		return ELEMENT_NOT_FOUNT
	}

	public contains(val: T): boolean {
		let node = this.head
		while (node !== null) {
			if (node.val === val) {
				return true
			}
			node = node.next
		}
		return false
	}

	public get(index: number): T {
		return this.getElement(index).val
	}

	public set(index: number, val: T): T {
		const node = this.getElement(index)
		const oldVal = node.val
		node.val = val
		return oldVal
	}

	public remove(index: number): T {
		indexCheck(index, this.len - 1)
		this.len--
		if (index === 0) {
			const val = this.head!.val
			this.head = this.head!.next
			if (this.len === 0) {
				this.tail = null
			}
			return val
		}
		let node = this.head!
		for (let i = 1; i < index; i++) {
			node = node.next!
		}
		const next = node.next!
		node.next = next.next
		return next.val
	}

	private getElement(index: number): Node<T> {
		indexCheck(index, this.len - 1)
		let node = this.head
		for (let i = 1; i <= index; i++) {
			node = node!.next
		}
		return node!
	}

	public clear(): void {
		this.tail = this.head = null
		this.len = 0
	}

	public toArray(): T[] {
		const arr: T[] = []
		let node = this.head
		while (node !== null) {
			arr.push(node.val)
			node = node.next
		}
		return arr
	}

}

export default LinkedList