import List from '@/types/interface/List'
import { indexCheck } from '@/util/helper'
import Testable from '@/types/helper/Testable'

class ArrayList<T> implements List<T>, Testable<T> {

  private list: T[] = []

  public clear(): void {
    this.list = []
  }

  public size(): number {
    return this.list.length
  }

  public isEmpty(): boolean {
    return this.size() === 0
  }

  public contains(val: T): boolean {
    return this.list.includes(val)
  }

  public add(val: T): void
  public add(index: number, val: T): void
  public add(...args: [T] | [number, T]): void {
    const [index, val] = args.length === 1 ? [this.size(), args[0]] : args
    indexCheck(index, this.size())
    this.list.splice(index, 0, val)
  }

  public get(index: number): T {
    indexCheck(index, this.size() - 1)
    return this.list[index]
  }

  public set(index: number, val: T): T {
    indexCheck(index, this.size() - 1)
    const oldVal = this.list[index]
    this.list[index] = val
    return oldVal
  }

  public remove(index: number): T {
    indexCheck(index, this.size() - 1)
    return this.list.splice(index, 1)[0]
  }

  public indexOf(val: T): number {
    return this.list.indexOf(val)
  }

  public toArray(): T[] {
    return [...this.list]
  }

}

export default ArrayList
