import TreeNode from './TreeNode'

class AVLNode<T> extends TreeNode<T> {

  public right: AVLNode<T> | null = null
  public left: AVLNode<T> | null = null
  public parent: AVLNode<T> | null = null

  // 以该节点为根节点的树的高度
  public height: number = 1

  // > 0 左边高    < 0 右边高
  public get balanceFactor(): number {
    const left = this.left?.height ?? 0
    const right = this.right?.height ?? 0
    return left - right
  }

}

export default AVLNode