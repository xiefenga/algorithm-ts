import Comparator from '@/types/helper/Comparator'

class Merge<T> {

  private aux: T[];

  constructor(
    len: number,
    private comparator: Comparator<T>
  ) {
    this.aux = new Array<T>(len)
  }

  // 将 [lo, hi] 之间的数据排序
  private sort(arr: T[], lo: number, hi: number) {
    if (hi <= lo) {
      return
    }
    const mid = lo + Math.floor((hi - lo) / 2)
    this.sort(arr, lo, mid)
    this.sort(arr, mid + 1, hi)
    this.merge(arr, lo, mid, hi)
  }

  // 将 [lo, mid] [mid+1, hi] 之间的数据归并
  private merge(arr: T[], lo: number, mid: number, hi: number) {
    // i 为左半边下标， j 为右半边下标
    // i 的取值范围[lo, mid]  j 的取值范围[mid+1, hi]，超出即为该半边的数据已经合并完
    let i = lo, j = mid + 1
    const { aux, comparator } = this
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

  static sort<T>(arr: T[], comparator: Comparator<T>) {
    const len = arr.length
    const merge = new Merge<T>(len, comparator)
    merge.sort(arr, 0, len - 1)
  }
}

const mergeSort = Merge.sort

export default mergeSort
