import Testable from '@/types/helper/Testable'

class Stack<T> implements Testable<T> {

	private list: T[] = []

	public push(val: T): void {
		this.list.push(val)
	}

	public pop(): T {
		if (this.size() === 0) {
			throw new RangeError('stack is empty')
		}
		return this.list.pop()!
	}

	public peek(): T {
		if (this.size() === 0) {
			throw new RangeError('stack is empty')
		}
		return this.list[this.size() - 1]
	}

	public isEmpty(): boolean {
		return this.size() === 0
	}

	public size(): number {
		return this.list.length
	}

	public toArray(): T[] {
		return [...this.list]
	}
}


export default Stack