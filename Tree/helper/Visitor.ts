interface Visitor<T> {
  visit: (val: T) => any
  print?: () => void
}

const defalutVisitor = {
  visit(val: any) {
    console.log(val);
  }
}

export default Visitor;

export { defalutVisitor };