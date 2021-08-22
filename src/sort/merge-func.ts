import Comparator from '@/types/helper/Comparator'

function mergeSort<T>(arr: T[], comparator: Comparator<T>) {

  const aux = new Array<T>(arr.length)

  sort(0, arr.length - 1, arr, aux, comparator)
}

// 将 [lo, hi] 之间的数据排序
function sort<T>(lo: number, hi: number, arr: T[], aux: T[], comparator: Comparator<T>) {
  if (hi <= lo) {
    return
  }
  const mid = lo + Math.floor((hi - lo) / 2)
  sort(lo, mid, arr, aux, comparator)
  sort(mid + 1, hi, arr, aux, comparator)
  merge(lo, mid, hi, arr, aux, comparator)
}

// 将 [lo, mid] [mid+1, hi] 之间的数据归并
function merge<T>(lo: number, mid: number, hi: number, arr: T[], aux: T[], comparator: Comparator<T>) {
  // i 为左半边下标， j 为右半边下标
  // i 的取值范围[lo, mid]  j 的取值范围[mid+1, hi]，超出即为该半边的数据已经合并完
  let i = lo, j = mid + 1
  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k]
  }
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      arr[k] = aux[j++]
    } else if (j > hi) {
      arr[k] = aux[i++]
    } else if (comparator(aux[j], aux[i]) < 0) {
      arr[k] = aux[j++]
    } else {
      arr[k] = aux[i++]
    }
  }
}

export default mergeSort
