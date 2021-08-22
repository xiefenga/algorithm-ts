import BinaryTree from './BinaryTree'
import TreeNode from '@/types/helper/TreeNode'
import Comparator from '@/types/helper/Comparator'


class BinarySearchTree<T> extends BinaryTree<T> {

  protected compare: Comparator<T>

  public constructor(comparator: Comparator<T>) {
    super()
    this.compare = comparator
  }

  protected createNode(val: T): TreeNode<T> {
    return new TreeNode<T>(val)
  }

  public insert(val: T): void {
    this.root = this.add(this.root, val)
  }

  public remove(val: T): void {
    this.root = this.delete(this.root, val)
  }

  // 向某棵树添加 val，返回添加之后树的根节点
  protected add(root: TreeNode<T> | null, val: T): TreeNode<T> {
    if (root === null) {
      root = this.createNode(val)
      this.nodes++
    } else if (this.compare(val, root.val) < 0) {
      root.left = this.add(root.left, val)
      root.left.parent = root
    } else if (this.compare(val, root.val) > 0) {
      root.right = this.add(root.right, val)
      root.right.parent = root
    }
    return root
  }

  // 删除某棵树的某个节点，返回删除之后树的根节点
  protected delete(root: TreeNode<T> | null, val: T): TreeNode<T> | null {
    if (root) {
      if (this.compare(val, root.val) < 0) {
        root.left = this.delete(root.left, val)
      } else if (this.compare(val, root.val) > 0) {
        root.right = this.delete(root.right, val)
      } else {
        // 度为0，直接删除自己
        if (root.isLeave()) {
          root = null
          // 度为2，找前驱或者后继节点
        } else if (root.right && root.left) {
          root.val = (<TreeNode<T>>this.successor(root)).val
          root.right = this.delete(root.right, root.val)
          // 度为1，直接用子节点代替
        } else {
          if (root.left) {
            root.left.parent = root.parent
            root = root.left
          }
          if (root.right) {
            root.right.parent = root.parent
            root = root.right
          }
        }
        this.nodes--
      }
    }
    return root
  }
}

export default BinarySearchTree