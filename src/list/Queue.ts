import LinkedList from './LinkedList'
import Testable from '@/types/helper/Testable'

class Queue<T> implements Testable<T> {

	private list: LinkedList<T> = new LinkedList()

	public size(): number {
		return this.list.size()
	}

	public isEmpty(): boolean {
		return this.list.isEmpty()
	}

	public enqueue(val: T): void {
		this.list.add(val)
	}

	public dequeue(): T {
		return this.list.remove(0)
	}

	public peek(): T {
		return this.list.get(0)
	}

	public toArray(): T[] {
		return this.list.toArray()
	}
}

export default Queue