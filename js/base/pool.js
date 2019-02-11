let instance
const poolDic = Symbol('poolDic')
export default class Pool{
  constructor() {
    if(instance) {
      return instance
    }
    instance = this
    this[poolDic] = {}
  }
  hasPool(name) {
    return this[poolDic][name] || (this[poolDic][name] = [])
  }
  hasPoolObj(name, PoolObj) {
    let pool = this.hasPool(name)
    if (pool.length) {
      return pool.shift()
    } else {
      console.log('创建新对象')
      return new PoolObj()
    }
  }
  collectObj(name, PoolObj) {
    this[poolDic][name].push(PoolObj)
  }
}