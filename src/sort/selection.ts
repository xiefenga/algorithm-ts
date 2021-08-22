import Comparator from '@/types/helper/Comparator'

function selectionSort<T>(arr: T[], comparator: Comparator<T>) {
  const len = arr.length
  let minIndex
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (comparator(arr[minIndex], arr[j]) > 0) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
}

export default selectionSort