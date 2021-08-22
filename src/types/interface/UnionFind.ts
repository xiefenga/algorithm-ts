export default interface UnionFind<T> {
  find(v: T): T | undefined
  union(v: T, w: T): void
}