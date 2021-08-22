
// [0, max]
export const indexCheck = (index: number, max: number): void | never => {
  if (!Number.isInteger(index)) {
    throw new TypeError('index must be intger')
  } if (index > max || index < 0) {
    throw new RangeError('index is out of size')
  }
}