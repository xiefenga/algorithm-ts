export default interface Heap<T> {
  readonly size: number
  isEmpty(): boolean
  clear(): void
  add(ele: T): void
  peek(): T | null
  removeTop(): T | null
  replace(ele: T): T | null
}

