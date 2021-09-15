import Comparator from '@/types/helper/Comparator'

function heapSort<T>(arr: T[], comparator: Comparator<T>) {
  heapify(arr, comparator)
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]]
    siftDown(arr, 0, i - 1, comparator)
  }
}

// 最大堆 下沉操作
function siftDown<T>(arr: T[], lo: number, hi: number, comparator: Comparator<T>) {
  let j: number
  // k << 1 + 1 左子树 索引
  while ((j = (lo << 1) + 1) < hi) {
    if (comparator(arr[j + 1], arr[j]) > 0) {
      j++
    }
    if (comparator(arr[j], arr[lo]) <= 0) {
      return
    }
    [arr[lo], arr[j]] = [arr[j], arr[lo]]
    lo = j
  }
}

function heapify<T>(data: T[], comparator: Comparator<T>) {
  const start = (data.length >> 1) - 1
  for (let i = start; i >= 0; i--) {
    siftDown(data, i, data.length - 1, comparator)
  }
}

export default heapSort