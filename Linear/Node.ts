class Node<T> {

    public val: T;
    public next: Node<T> | null;

    constructor(val: T);
    constructor(val: T, next: Node<T> | null);
    constructor(val: T, next: Node<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}


export default Node;