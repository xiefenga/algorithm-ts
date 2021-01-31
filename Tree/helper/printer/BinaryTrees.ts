import BinaryTreeInfo from "./BinaryTreeInfo";

class BinaryTrees {
  static print(tree: BinaryTreeInfo) {
    const res = levelOrder(tree).slice(0, -1);

    // console.log(Math.max(...res.map(level => level.length)))
    // res.forEach((level, k) => {
    //   if (k < res.length - 1) {
    //     level.forEach((n, i) => {
    //       if (n === null) {
    //         res[k + 1].splice(k * 2, 0, null, null);
    //       }
    //     })
    //   }
    // });
    res.forEach(level => {
      level.forEach(n => {
        if (n) {
          process.stdout.write(`${n} `)
        }
      })
      console.log();
    })
  }
}


function levelOrder(tree: BinaryTreeInfo) {
  const queue: any[][] = [];
  const dfs = (root: any, k: number = 0) => {
    if (!queue[k]) {
      queue[k] = [];
    }
    if (!root) {
      queue[k].push(null);
      return;
    }
    queue[k].push(tree.getValue(root));
    dfs(tree.getLeft(root), k + 1);
    dfs(tree.getRight(root), k + 1);
  }
  dfs(tree.getRoot());
  return queue;
}


export default BinaryTrees;