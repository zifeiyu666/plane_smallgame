import Sprite from '../base/sprite.js'
import DataBus from '../databus.js'
// const imgSrc=

let databus = new DataBus()

let timer = Symbol('timer')
export default class Animation extends Sprite{
  constructor({ imgSrc, imgW, imgH }) {
    super({ imgSrc, imgW, imgH })
    this.imgList = []
    // this.count = 0
    this.index = 0
    this.timer= null
    this.isPlaying = false
    databus.animations.push(this)
  }
  initImgSamp(srcList) {
    srcList.forEach(item => {
      let img = new Image()
      img.src = item
      img.imgW = 32
      img.imgH = 24
      this.imgList.push(img)
    })
  }
  playAnimation(ctx, x, y) {
    let that = this
    this.isPlaying = true
    this.timer = setInterval(() => {
      // console.log(that.index)
      this.index++
      if (this.index == 18) {
        this.isPlaying = false
        this.index = 0
        clearInterval(this.timer)
      }
    }, 1000/60)
    
  }
  drawExplosion(ctx) {
    ctx.drawImage(this.imgList[this.index], this.x, this.y, 64, 48 )
  }
} 