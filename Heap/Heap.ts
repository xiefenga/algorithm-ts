interface Heap<T> {
  size: number
  isEmpty(): boolean
  clear(): void
  add(ele: T): void
  peek(): T | null
  removeTop(): T | null
}

export default Heap