import Node from "./Node";

class Stack<T> {

    private top: Node<T> | null = null;

    private size: number = 0;

    public push(val: T): void {
        this.top = new Node(val, this.top);
        this.size++;
    }

    public pop(): T {
        if (!this.isEmpty()) {
            const top = <Node<T>>this.top;
            this.top = top.next;
            this.size--;
            return top.val;
        }
        throw new Error('stack is empty');
    }

    public peek(): T {
        if (this.isEmpty()) {
            throw new Error('stack is empty');
        }
        return (<Node<T>>this.top).val;
    }

    public isEmpty() {
        return this.top === null;
    }

    public getSize() {
        return this.size;
    }
}


export default Stack;