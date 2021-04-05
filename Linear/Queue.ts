import Node from './Node'

class Queue<T> {

  private head: Node<T> | null = null;

  private tail: Node<T> | null = null;

  private N: number = 0;

  public get size(): number {
    return this.N;
  }

  public isEmpty(): boolean {
    return this.N === 0;
  }

  public enqueue(val: T): T {
    if (this.tail === null) {
      this.head = this.tail = new Node(val);
    } else {
      this.tail.next = new Node(val);
      this.tail = this.tail.next;
    }
    this.N++;
    return val;
  }

  public dequeue(): T | undefined {
    if (this.head) {
      const node = this.head;
      this.head = this.head.next;
      node.next = null;
      if (this.N === 1) {
        this.tail = null;
      }
      this.N--;
      return node.val;
    }
    return undefined;
  }

  public peek(): T | undefined {
    return this.head ? this.head.val : undefined;
  }
}

export default Queue;