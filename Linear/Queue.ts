class Queue<T> {
  private queue: T[] = [];

  public get size(): number {
    return this.queue.length;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public enqueue(val: T): void {
    this.queue.push(val);
  }

  public dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('queue is empty');
    }
    return <T>this.queue.shift();
  }
}

export default Queue;