import MaxHeap from '../heap/MaxHeap'
import Comparator from '@/types/helper/Comparator'

function heapSort<T>(arr: T[], comparator: Comparator<T>) {
  MaxHeap.buildHeap(arr, comparator)
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]]
    siftDown(arr, 0, i, comparator)
  }
}

function siftDown<T>(arr: T[], k: number, N = arr.length, comparator: Comparator<T>) {
  let j
  while ((j = (k << 1) + 1) < N) {
    if (j < N - 1 && comparator(arr[j + 1], arr[j]) > 0) {
      j++
    }
    if (!(comparator(arr[j], arr[k]) > 0)) {
      return
    }
    [arr[k], arr[j]] = [arr[j], arr[k]]
    k = j
  }
}

export default heapSort