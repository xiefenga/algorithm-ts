import should from 'should'
import LinkedList from '@/list/LinkedList'

describe('LinkedList', () => {

  describe('#add()', () => {
    it('can add to last', () => {
      const list = new LinkedList<number>()
      should(list.toArray()).deepEqual([])
      list.add(1)
      should(list.toArray()).deepEqual([1])
      list.add(10)
      should(list.toArray()).deepEqual([1, 10])
      list.add(6)
      list.add(8)
      list.add(2)
      should(list.toArray()).deepEqual([1, 10, 6, 8, 2])
    })

    it('can add to a fixed pos', () => {
      const list = new LinkedList<number>()
      should(list.toArray()).deepEqual([])
      list.add(1)
      should(list.toArray()).deepEqual([1])
      list.add(0, 10)
      should(list.toArray()).deepEqual([10, 1])
      list.add(1, 5)
      list.add(8)
      should(list.toArray()).deepEqual([10, 5, 1, 8])
      should(() => list.add(-1, 10)).throw()
    })
  })

  describe('#set()', () => {
    it('should return old val', () => {
      const list = new LinkedList<string>();
      ['a', 'b', 'c', 'd', 'e'].forEach(c => {
        list.add(c)
      });
      list.set(0, 'f').should.eql('a')
    })

    it('can not add last element', () => {
      const list = new LinkedList<string>();
      ['a', 'b', 'c', 'd', 'e'].forEach(c => {
        list.add(c)
      });
      should(() => list.set(5, 'f')).throw()
    })

    it('should throw when index error', () => {
      const list = new LinkedList<string>();
      ['a', 'b', 'c', 'd', 'e'].forEach(c => {
        list.add(c)
      });
      should(() => list.set(-1, 'f')).throw()
    })
  })

  describe('#indexOf', () => {
    const arr = ['a', 'b', 'a', 'c', 'd']
    it('return first index', () => {
      const list = new LinkedList<string>()
      arr.forEach(c => {
        list.add(c)
      });
      list.indexOf('a').should.eql(0)
      list.indexOf('d').should.eql(4)
    })
    it('return -1 when elment is not existed', () => {
      const list = new LinkedList<string>()
      list.add('b')
      list.add('b')
      list.indexOf('a').should.eql(-1)
    })
  })

  describe('#get()', () => {
    const list = new LinkedList<number>()
    it('should return index value', () => {
      list.add(10)
      list.add(3)
      list.get(0).should.eql(10)
      list.add(9)
      list.add(4)
      list.add(0)
      list.get(4).should.eql(0)
    })
    it('should throw error when index illegal', () => {
      should(() => list.get(-1)).throw()
      should(() => list.get(6)).throw()
    })
  })

  describe('#remove', () => {
    it('should remove the element of index', () => {
      const list = new LinkedList<number>()
      should(list.toArray()).deepEqual([])
      list.add(1)
      should(list.toArray()).deepEqual([1])
      list.add(10)
      list.add(5)
      list.add(6)
      should(list.toArray()).deepEqual([1, 10, 5, 6])
      list.remove(0)
      should(list.toArray()).deepEqual([10, 5, 6])
      list.remove(0)
      should(list.toArray()).deepEqual([5, 6])
      list.remove(0)
      should(list.toArray()).deepEqual([6])
      list.remove(0)
      should(list.toArray()).deepEqual([])
    })
    it('should throw error when remove illegal index', () => {
      const list = new LinkedList<number>()
      should(() => list.remove(0)).throw()
      list.add(10)
      should(() => list.remove(1)).throw()
    })
  })

  describe('#contains', () => {
    it('reutrn true when contains', () => {
      const list = new LinkedList<number>()
      list.contains(1).should.eql(false)
      list.add(1)
      list.contains(1).should.eql(true)
      list.add(10)
      list.remove(0)
      list.contains(1).should.eql(false)
    })
  })

  describe('#size()', () => {
    it('must has correct size', () => {
      const list = new LinkedList<number>()
      list.add(1)
      list.add(2)
      should(list.size()).eql(2)
      list.add(1, 1)
      list.add(1, 1)
      list.add(1, 1)
      list.add(1, 1)
      should(list.size()).eql(6)
      list.remove(3)
      list.remove(2)
      list.remove(1)
      should(list.size()).eql(3)
    })
  })

  describe('#clear()', () => {
    it('should clear the list', () => {
      const list = new LinkedList<number>()
      list.add(1)
      list.add(2)
      list.clear()
      list.size().should.eql(0)
    })
  })

  describe('#isEmpty()', () => {
    it('shoud has correct value', () => {
      const list = new LinkedList<number>()
      should(list.isEmpty()).eql(true)
      list.add(1)
      list.add(2)
      should(list.isEmpty()).eql(false)
      list.clear()
      should(list.isEmpty()).eql(true)
    })
  })
})