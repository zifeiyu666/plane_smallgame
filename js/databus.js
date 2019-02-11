// 单例模式
let instance

export default class DataBus{
  constructor() {
    if(instance) {
      return instance
    }
    instance = this
    // 子弹库
    this.bullets = []
    // 敌机库
    this.enemys = []
    // 动画
    this.animations = []

    this.frame = 0

    this.score = 0

    this.planeCanMove = true
  }
  // 对象回收
  removeObj(name, index) {
    this[name].splice(index, 1)
  }
  // 重新开始，重置参数
  restart() {
    this.bullets = []
    this.enemys = []
    this.animations = []
    this.frame = 0
    this.score = 0
    this.planeCanMove = true
    this.gameover = false
  }
}