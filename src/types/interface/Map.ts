export default interface Map<K, V> {
  clear(): void
  delete(key: K): void
  get(key: K): V | undefined
  has(key: K): boolean
  set(key: K, value: V): void
  size(): number
}

