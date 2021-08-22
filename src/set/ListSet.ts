import Set from '@/types/interface/Set'

class ListSet<T> implements Set<T> {

  private list: T[] = []

  public size(): number {
    return this.list.length
  }

  public add(value: T): void {
    if (!this.list.includes(value)) {
      this.list.push(value)
    }
  }

  public clear(): void {
    this.list = []
  }

  public delete(value: T): void {
    this.list = this.list.filter(val => val !== value)
  }

  public has(value: T): boolean {
    return this.list.includes(value)
  }

}

export default ListSet