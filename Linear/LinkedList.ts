import Node from './Node'

class LinkedList<T> {
  private header: Node<T> | null = null;
  private tail: Node<T> | null = null;

  public add(val: T): void {
    if (this.isEmpty()) {
      this.header = this.tail = new Node(val);
    } else {
      this.tail = new Node(val, this.tail);
    }
  }

  public isEmpty(): boolean {
    return this.header === null;
  }

}

export default LinkedList;