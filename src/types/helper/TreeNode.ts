class TreeNode<T> {

  public val: T

  public right: TreeNode<T> | null = null
  public left: TreeNode<T> | null = null
  public parent: TreeNode<T> | null = null

  constructor(val: T) {
    this.val = val
  }

  public isLeave(): boolean {
    return !this.left && !this.right
  }
}

export default TreeNode

