import { TreeNode } from "./TreeNode";
import { Queue, Stack } from "../Linear";
import Visitor, { defalutVisitor } from "./helper/Visitor";
import BinaryTreeInfo from "./helper/printer/BinaryTreeInfo";




abstract class BinaryTree<T> implements BinaryTreeInfo {

  protected size: number = 0;
  protected visitor: Visitor<TreeNode<T>>;
  protected root: TreeNode<T> | null = null;

  constructor();
  constructor(visitor: Visitor<TreeNode<T>>);
  constructor(visitor = defalutVisitor) {
    this.visitor = visitor;
  }

  public abstract insert(val: T): void;

  public abstract remove(val: T): void;

  protected abstract createNode(val: T): TreeNode<T>

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  // 前驱节点，中序遍历时的前一个节点
  protected predecessor(root: TreeNode<T> | null): TreeNode<T> | null {
    if (!root) {
      return null;
    }
    // 存在左子节点，找 root.left.right.right.……
    if (root.left) {
      let node = root.left;
      while (node.right) {
        node = node.right;
      }
      return node;
    }
    // 没有左子节点但是存在父节点的情况，找向左的分叉
    while (root.parent && root === root.parent.left) {
      root = root.parent;
    }
    return root.parent;
  }

  // 后继节点，中序遍历时的后一个节点
  protected successor(root: TreeNode<T> | null): TreeNode<T> | null {
    if (!root) {
      return null;
    }
    if (root.right) {
      let node = root.right;
      while (node.left) {
        node = node.left;
      }
      return node;
    }
    // 没有右子节点但是存在父节点的情况，找向右的分叉
    while (root.parent && root === root.parent.right) {
      root = root.parent;
    }
    return root.parent;
  }

  public preorderTraversal(visitor = this.visitor, root = this.root): void {
    if (root) {
      const stack = new Stack<TreeNode<T>>();
      stack.push(root);
      while (!stack.isEmpty()) {
        const node = stack.pop();
        visitor.visit(node);
        node.right && stack.push(node.right);
        node.left && stack.push(node.left);
      }
    }
  }

  public inorderTraversal(visitor = this.visitor, root = this.root): void {
    if (root) {
      const stack = new Stack<TreeNode<T>>();
      let node: TreeNode<T> | null = root;
      while (node || !stack.isEmpty()) {
        while (node) {
          stack.push(node);
          node = node.left;
        }
        node = stack.pop();
        visitor.visit(node);
        node = node.right;
      }
    }
  }

  public postorderTraversal(visitor = this.visitor, root = this.root): void {
    if (root) {
      const stack = new Stack<TreeNode<T>>();
      stack.push(root);
      let prev: TreeNode<T> = root; // 前一个弹出的元素
      while (!stack.isEmpty()) {
        const top = stack.peek();
        if (top.isLeave() || (top.left === prev || top.right === prev)) {
          visitor.visit(prev = stack.pop());
        } else {
          top.right && stack.push(top.right);
          top.left && stack.push(top.left);
        }
      }
    }
  }

  public levelOrderTraversal(visitor = this.visitor, root = this.root) {
    if (root) {
      const queue = new Queue<TreeNode<T>>();
      queue.enqueue(root);
      while (!queue.isEmpty()) {
        const node = queue.dequeue();
        visitor.visit(node);
        node.left && queue.enqueue(node.left);
        node.right && queue.enqueue(node.right);
      }
    }
  }

  public getRoot(): TreeNode<T> | null {
    return this.root;
  }
  public getLeft(node: TreeNode<T>): TreeNode<T> | null {
    return node.left;
  }
  public getRight(node: TreeNode<T>): TreeNode<T> | null {
    return node.right;
  }
  public getValue(node: TreeNode<T>): any {
    return node.val;
  }
}

export default BinaryTree;