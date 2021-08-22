export default interface List<T> {

  clear(): void;

  size(): number;

  isEmpty(): boolean;

  contains(val: T): boolean;

  add(val: T): void;

  add(index: number, val: T): void;

  get(index: number): T;

  set(index: number, val: T): T;

  remove(index: number): T;

  indexOf(val: T): number
}
