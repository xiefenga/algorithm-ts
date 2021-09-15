import Comparator from '@/types/helper/Comparator'

function quickSort<T>(arr: T[], comparator: Comparator<T>) {
  sort(arr, 0, arr.length - 1, comparator)
}


const sort = <T>(arr: T[], lo: number, hi: number, comparator: Comparator<T>) => {
  if (hi <= lo) {
    return
  }
  const pivot = partition(arr, lo, hi, comparator)
  sort(arr, lo, pivot - 1, comparator)
  sort(arr, pivot + 1, hi, comparator)
}

const partition = <T>(arr: T[], lo: number, hi: number, comparator: Comparator<T>): number => {
  let i = lo, j = hi + 1
  const v = arr[lo]
  while (true) {
    while (comparator(arr[++i], v) < 0 && i !== hi);
    while (comparator(v, arr[--j]) < 0 && j !== lo);
    if (i >= j) {
      break
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  [arr[lo], arr[j]] = [arr[j], arr[lo]]
  return j
}

export default quickSort

