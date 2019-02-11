import Sprite from '../base/sprite.js'
import Pool from '../base/pool.js'
import DataBus from '../databus.js'
import Animation from './animation.js'

let pool = new Pool()
let databus = new DataBus()

const imgSrc = 'images/enemy.png'
const imgW = 50
const imgH = 50

const speed = Symbol('speed')
export default class Enemy extends Animation{
  constructor() {
    super({imgSrc, imgW, imgH})
    // this.init()
    this.initExplosion()
  }
  rdm(start, end) {
    return Math.floor(Math.random() * (end -start) + start)
  }
  init() {
    this.isShow = true
    this.x = this.rdm(0, window.innerWidth - imgW)
    this.y = -imgH
    this[speed] = 10
    this.isBang = false
  }
  initExplosion() {
    let imgSrcList = []
    let count = 18
    for (let i = 0; i <= count; i++) {
      let imgSrc = 'images/explosion' + (i + 1) + '.png'
      imgSrcList.push(imgSrc)
    }
    this.initImgSamp(imgSrcList)
  }
  playExplosion(ctx) {
    this.playAnimation(ctx, this.x, this.y)
  }
  updata(index) {
    this.y += this[speed]
    if(this.y > window.innerHeight) {
      this.isShow = false
      databus.enemys.shift()
      pool.collectObj('enemy', this)
    }
  }
}