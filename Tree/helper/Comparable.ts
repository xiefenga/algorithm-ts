interface Comparable<T> {
  compareTo(val: T): number
}

function instanceofComparable(val: any): val is Comparable<any> {
  return val && val.compareTo && typeof val.compareTo(val) === 'number';
}

export default Comparable;

export { instanceofComparable };