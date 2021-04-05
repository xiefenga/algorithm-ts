import Node from './Node'

class Stack<T> {

    private top: Node<T> | null = null;

    private N: number = 0;

    public push(val: T): void {
        this.top = new Node(val, this.top);
        this.N++;
    }

    public pop(): T | undefined {
        if (this.top) {
            const top = this.top;
            this.top = top.next;
            this.N--;
            return top.val;
        }
        return undefined;
    }

    public peek(): T | undefined {
        return this.top ? this.top.val : undefined
    }

    public isEmpty(): boolean {
        return this.top === null;
    }

    public get size(): number {
        return this.N;
    }
}


export default Stack;