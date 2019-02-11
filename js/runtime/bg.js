const clientW = window.innerWidth
const clientH = window.innerHeight
import Sprite from '../../js/base/sprite.js'

const imgSrc = 'images/bg.jpg'
export default class Background extends Sprite {
  constructor () {
    super({imgSrc})
    this.top = 0
  }
  render(ctx) {
    ctx.drawImage(this.img, 0, this.top, clientW, clientH)
    ctx.drawImage(this.img, 0, this.top - clientH, clientW, clientH)
  }
  update() {
    this.top++
    if (this.top > clientH) {
      this.top = 0
    }
  }
}