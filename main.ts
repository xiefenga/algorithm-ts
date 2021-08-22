// import 'mocha/mocha.css'
// import 'mocha/mocha.js'

import SkipList from '@/list/SkipList'
import HashMap from '@/map/HashMap'
import TreeMap from '@/map/TreeMap'
import AVLTree from '@/tree/AVLTree'
import BinaryTree from '@/tree/BinaryTree'
import RedBlackTree from '@/tree/RedBlackTree'
import Map from '@/types/interface/Map'

const list = new SkipList<number, number>(
  (key1, key2) => key1 - key2
)

const map = new HashMap<number, number>()

const count = 100_0000

const delta = 10


function test(map: Map<number, number>, count: number, delta: number, msg: string) {
  console.time(msg)
  for (let i = 0; i < count; i++) {
    map.set(i, i + delta)
  }

  for (let i = 10; i < 30; i++) {
    console.assert(map.get(i) == i + delta)
  }

  // console.assert(map.size() == count)

  for (let i = 50; i < 70; i++) {
    map.delete(i)
  }
  // console.assert(map.size() == 0)
  console.timeEnd(msg)
}

test(list, count, delta, 'skip-list')

test(map, count, delta, 'tree-map')




// mocha.setup('bdd');
// mocha.checkLeaks();

// const tests = []

// const modules = import.meta.glob('./test/*.test.ts')

// for (const path in modules) {
//   tests.push(modules[path]())
// }

// await Promise.all(tests)

// mocha.run();



// const arr = [
//   19, 33, 63, 48, 70, 50, 37, 9, 22, 3, 90, 6, 96, 59, 79, 17, 40, 66, 85, 89, 16, 61, 75, 57, 87, 43, 67, 26, 31, 35, 28, 76, 98, 82, 56, 4, 81, 65, 53, 34, 46, 62, 30, 78, 80, 47, 91, 58, 38, 12, 94, 10, 68, 97, 83, 54, 14, 95, 7, 41, 25, 86, 8, 74, 71, 88, 93, 24, 49, 99, 77, 2, 55, 1, 64, 36, 60, 92, 20
// ]

// const tree = new AVLTree<number>((a, b) => a - b)
// const tree = new RedBlackTree<number>((a, b) => a - b)

// arr.forEach(num => tree.insert(num))

// const test = (tree: BinaryTree<number>) => {
//   console.time()
//   for (let i = 0; i < count; i++) {
//     tree.insert(i)
//   }

//   console.log(tree)

//   console.assert(tree.size === count)

//   for (let i = 0; i < count; i++) {
//     tree.remove(i)
//   }
//   console.assert(tree.size == 0)
//   console.timeEnd()
// }

// test(tree)

// console.log(tree)
