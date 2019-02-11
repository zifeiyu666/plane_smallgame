import Sprite from '../../js/base/sprite.js'
import Pool from '../../js/base/pool.js'
import Bullet from '../../js/player/bullet.js'
import DataBus from '../../js/databus.js'


const imgSrc = 'images/hero.png'
const imgW = 80
const imgH = 80
const screenW = window.innerWidth
const screenH = window.innerHeight

let pool = new Pool()
let databus = new DataBus()

export default class Plane extends Sprite {
  constructor() {
    super({ imgSrc, imgW, imgH })
    this.init()
    this.initEvent()
    this.isTouched = false // 是否触摸到飞机
  }
  // 初始化飞机的位置
  init() {
    this.x = (screenW - imgW) / 2 
    this.y = screenH - imgH - 20
  }
  // 初始化飞机交互事件
  initEvent() {
    canvas.addEventListener('touchstart', (e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (x > this.x && x < this.x + this.imgW && y > this.y && y < this.y + this.imgH) {
        this.isTouched = true
        if (databus.planeCanMove) {
          this.setCenterPoint(x, y)
        }
      }
    })
    
    canvas.addEventListener('touchmove', (e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (this.isTouched && databus.planeCanMove) {
        this.setCenterPoint(x, y)
      }
    })
  }
  // 将飞机置于中心位置
  setCenterPoint(x, y) {
    this.x = x - this.imgW / 2
    this.y = y - this.imgH / 2 + 10
    if(this.x < 0) {
      this.x = 0
    }
    if(this.x > screenW - this.imgW) {
      this.x = screenW - this.imgW
    }
    if(this.y < 0) {
      this.y = 0
    }
    if(this.y > screenH - this.imgH) {
      this.y = screenH - this.imgH
    }
  }
  // 发射子弹
  shoot() {
    let bullet = pool.hasPoolObj('bullet', Bullet)
    bullet.init(this.x, this.y, this.imgW, this.imgH)
    databus.bullets.push(bullet)
  }

}