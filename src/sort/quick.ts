import Comparator from '@/types/helper/Comparator'

class Quick<T> {

  constructor(
    private comparator: Comparator<T>
  ) { }

  // 将 [lo, hi] 之间的数组排序
  sort(arr: T[], lo: number, hi: number) {
    if (hi <= lo) { return }
    // 切分，并返回基准点下标
    const pivot = this.partition(arr, lo, hi)
    this.sort(arr, lo, pivot - 1)
    this.sort(arr, pivot + 1, hi)
  }

  // 将 [lo, hi] 之间以 arr[lo] 为基准点进行切分，并返回基准点最终的下标
  partition(arr: T[], lo: number, hi: number) {
    const { comparator } = this
    let i = lo, j = hi + 1
    const v = arr[lo]
    while (true) {
      while (comparator(arr[++i], v) < 0) {
        if (i == hi) {
          break
        }
      }
      while (comparator(v, arr[--j]) < 0) {
        if (j == lo) {
          break
        }
      }
      if (i >= j) {
        break
      }
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    [arr[lo], arr[j]] = [arr[j], arr[lo]]
    return j
  }

  static sort<T>(arr: T[], comparator: Comparator<T>) {
    const quick = new Quick(comparator)
    quick.sort(arr, 0, arr.length - 1)
  }
}

const quickSort = Quick.sort

export default quickSort

