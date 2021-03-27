import Heap from './Heap'
import { Comparator, defaultComparator } from '../types'

abstract class BinaryHeap<T> implements Heap<T> {

  protected heap: T[] = [];

  protected comparator: Comparator<T>;

  constructor();
  constructor(comparator: Comparator<T>);
  constructor(comparator: Comparator<T> = defaultComparator) {
    this.comparator = comparator;
  }

  public add(ele: T): void {
    this.heap.push(ele);
    this.siftUp(this.size - 1);
  }

  public removeTop(): T | null {
    const N = this.size;
    if (N === 0) {
      return null;
    } else if (N === 1) {
      return <T>this.heap.pop();
    }
    const top = this.heap[0];
    this.heap[0] = <T>this.heap.pop();
    this.siftDown(0);
    return top;
  }

  public replace(ele: T): T | null {
    const N = this.size;
    if (N === 0) {
      return null;
    }
    const old = this.heap[0];
    this.heap[0] = ele;
    this.siftDown(0);
    return old;
  }

  // 上滤调整，k：开始调整的索引
  private siftUp(k: number) {
    while (k > 0 && this.compare(k, (k - 1) >> 1)) {
      this.swap((k - 1) >> 1, k);
      k = (k - 1) >> 1;
    }
  }

  // 下沉调整，k：开始下沉的索引
  private siftDown(k: number) {
    const N = this.size;
    let j;
    while ((j = (k << 1) + 1) < N) {
      if (j < N - 1 && this.compare(j + 1, j)) {
        j++;
      }
      if (!this.compare(j, k)) {
        return;
      }
      this.swap(k, j);
      k = j;
    }
  }

  protected heapify(data: T[]) {
    this.heap = data;
    const start = (this.size >> 1) - 1;
    for (let i = start; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  protected abstract compare(i: number, j: number): boolean;

  private swap(i: number, j: number): void {
    const len = this.size;
    if (i < 0 || j < 0 || i >= len || j >= len) {
      throw new RangeError('index is outof range')
    }
    const heap = this.heap;
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }


  public peek(): T | null {
    return this.isEmpty() ? null : this.heap[0];
  }

  public get size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }
  public clear(): void {
    this.heap = [];
  }
}

export default BinaryHeap