const littleEndian = (() => {
  const buffer = new ArrayBuffer(2)
  new DataView(buffer).setInt16(0, 256, true)
  return new Int16Array(buffer)[0] === 256
})()

const buff = new ArrayBuffer(8)

const view = new DataView(buff)

export const double2Int = (val: number): number => {
  view.setFloat64(0, val, littleEndian)
  const [hi, lo] = new Int32Array(buff)
  return hi ^ lo
}

export const bigInt2Int = (val: bigint): number => {
  view.setBigUint64(0, val, littleEndian)
  const [hi, lo] = new Int32Array(buff)
  return hi ^ lo
}
