import TreeNode from './TreeNode'

class AVLNode<T> extends TreeNode<T> {
  public height: number = 1;

  public right: AVLNode<T> | null = null;
  public left: AVLNode<T> | null = null;
  public parent: AVLNode<T> | null = null;

  // > 0 左边高    < 0 右边高
  public get balanceFactor() {
    const left = this.left?.height || 0;
    const right = this.right?.height || 0;
    return left - right;
  }

}

export default AVLNode;