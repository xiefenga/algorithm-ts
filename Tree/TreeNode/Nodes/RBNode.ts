import TreeNode from './TreeNode'

enum NodeColor {
  BLACK = 0,
  RED = 1
}

class RBNode<T> extends TreeNode<T> {

  private _color: NodeColor;
  public right: RBNode<T> | null = null;
  public left: RBNode<T> | null = null;
  public parent: RBNode<T> | null = null;

  constructor(val: T);
  constructor(val: T, color: NodeColor);
  constructor(val: T, color = NodeColor.RED) {
    super(val);
    this._color = color;
  }

  public get color(): NodeColor {
    return this._color;
  }

  public black(): void {
    this._color = NodeColor.BLACK;
  }

  public red(): void {
    this._color = NodeColor.RED;
  }

  public isBlack(): boolean {
    return this._color === NodeColor.BLACK;
  }

  public isRed(): boolean {
    return this._color === NodeColor.RED;
  }

  public isLeftChild(): boolean {
    return this.parent?.left === this;
  }

  public isRightChild(): boolean {
    return this.parent?.right === this;
  }

  public sibling(): RBNode<T> | null {
    if (this.parent) {
      return this.isLeftChild()
        ? this.parent.right
        : this.parent.left;
    }
    return null;
  }
  public hasRedChild(): boolean {
    if (this.isLeave()) {
      return false;
    }
    if (this.left && this.left.isRed()) {
      return true;
    } else if (this.right && this.right.isRed()) {
      return true;
    }
    return false;
  }
}

export default RBNode;

export { NodeColor }