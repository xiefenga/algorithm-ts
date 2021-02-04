class TreeNode<T> {
  public val: T;
  public right: TreeNode<T> | null = null;
  public left: TreeNode<T> | null = null;
  public parent: TreeNode<T> | null = null;
  constructor(val: T) {
    this.val = val;
  }

  isLeave() {
    return this.left === null && this.right === null;
  }
}

export default TreeNode;

