import { AVLNode } from '../TreeNode'
import BinarySearchTree from './BinarySearchTree'

class AVLTree<T> extends BinarySearchTree<T> {

  protected root: AVLNode<T> | null = null;

  protected createNode(val: T): AVLNode<T> {
    return new AVLNode(val);
  }

  protected add(root: AVLNode<T> | null, val: T): AVLNode<T> {
    root = <AVLNode<T>>super.add(root, val);
    this.updateHeight(root);
    root = this.checkBalance(root);
    return root;
  }

  protected delete(root: AVLNode<T> | null, val: T): AVLNode<T> | null {
    root = <AVLNode<T>>super.delete(root, val);
    if (root) {
      this.updateHeight(root);
      root = this.checkBalance(root);
    }
    return root;
  }

  private checkBalance(root: AVLNode<T>) {
    const factor = root.balanceFactor;
    if (factor > 1) { // L
      const left = <AVLNode<T>>root.left;
      const leftFactor = left.balanceFactor;
      if (leftFactor > 0) { // LL
        root = this.rotateRight(root);
      } else {  // LR
        root.left = this.rotateLeft(left);
        root = this.rotateRight(root);
      }
    } else if (factor < -1) { // R
      const right = <AVLNode<T>>root.right;
      const rightFactor = right.balanceFactor;
      if (rightFactor < 0) { // RR
        root = this.rotateLeft(root);
      } else {  // RL
        root.right = this.rotateRight(right);
        root = this.rotateLeft(root);
      }
    }
    return root;
  }

  /**
   * LL 右单旋
   *
   *  对节点进行右旋转操作，返回右旋转之后新的根节点
   *         y                            x
   *        / \                         /   \
   *       x   T4     向右旋转(y)       z     y
   *      / \       -------------->  / \   /  \
   *     z  T3                      T1 T2 T3  T4
   *    / \
   *   T1 T2
   */
  private rotateRight(root: AVLNode<T>): AVLNode<T> {
    const left = <AVLNode<T>>root.left;
    const leftRight = left.right;
    // 旋转
    left.right = root;
    root.left = leftRight;
    // 更新parent属性
    // left.parent = root.parent;
    // leftRight && (leftRight.parent = root);
    // root.parent = left;
    this.updateParent(left, root, leftRight);
    // 更新树高
    this.updateHeight(root);
    this.updateHeight(left);
    // 返回新的根节点
    return left;
  }

  /**
   *  RR  左单旋
   * 
   *  对节点进行左旋转操作，返回左旋转之后新的根节点
   *          y                             x
   *        /  \                          /  \
   *       T1  x     向右旋转(y)         y     z
   *          / \    -------------->  / \   / \
   *        T2  z                   T1 T2 T3 T4
   *           / \
   *          T3 T4
   */
  private rotateLeft(root: AVLNode<T>): AVLNode<T> {
    const right = <AVLNode<T>>root.right;
    const rightLeft = right.left;
    // 旋转
    right.left = root;
    root.right = rightLeft;
    // 更新 parent
    // right.parent = root.parent; 
    // rightLeft && (rightLeft.parent = root);
    // root.parent = right;
    this.updateParent(right, root, rightLeft);
    // 更新高度
    this.updateHeight(root);
    this.updateHeight(right);
    // 返回新的根节点
    return right;
  }

  // LR RR + LL 左子节点左单旋 根节点右单旋
  // rotateLeft(root.left) + rotateRight(root) 

  // RL  LL + RR 右子节点右单旋 根节点左单旋
  // rotateRight(root.right) + rotateLeft(root) 


  private updateParent(newGrand: AVLNode<T>, newParent: AVLNode<T>, newSon: AVLNode<T> | null) {
    newGrand.parent = newParent.parent;
    newSon && (newSon.parent = newParent);
    newParent.parent = newGrand;
  }

  private updateHeight(root: AVLNode<T>): void {
    root.height = Math.max(root.right?.height || 0, root.left?.height || 0) + 1;
  }
}

export default AVLTree;