import BinaryHeap from './BinaryHeap'
import Comparator from '@/types/helper/Comparator'

class MaxHeap<T> extends BinaryHeap<T> {
  protected compare(i: number, j: number): boolean {
    const heap = this.heap
    return this.comparator(heap[i], heap[j]) > 0
  }

  public static buildHeap<T>(data: T[], comparator: Comparator<T>) {
    new MaxHeap(comparator).heapify(data)
  }
}

export default MaxHeap