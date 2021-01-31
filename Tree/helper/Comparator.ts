interface Comparator<T> {
  compare(val1: T, val2: T): number
}

const defaultComparator = {
  compare(a: any, b: any) {
    return a - b;
  }
}

export default Comparator;

export { defaultComparator };