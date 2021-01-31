interface BinaryTreeInfo {
  getRoot(): Object | null
  getLeft(node: Object): Object | null
  getRight(node: Object): Object | null
  getValue(node: Object): any
}

export default BinaryTreeInfo;