const screenW = window.innerWidth
const screenH = window.innerHeight
export default class Sprite{
  // 利用函数参数的结构赋值，即利用了参数的默认值；又可以灵活决定单独传哪几个参数而不必要理会参数顺序问题。
  constructor({ x = 0, y = 0, imgSrc = '', imgW = 0, imgH = 0}) {
    this.img = new Image()
    this.img.src = imgSrc
    this.x = x
    this.y = y
    this.imgW = imgW
    this.imgH = imgH
    this.isShow = true
  }
  drawToCanvas(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.imgW, this.imgH)
  }
  getIsBang(sp) {
    let centerX = sp.x + sp.imgW/2
    let centerY = sp.y + sp.imgH/2
    if(!this.isShow || !sp.isShow) {
      return false
    }
    if(
      centerX > this.x 
      && centerX < this.x + this.imgW
      && centerY > this.y
      && centerY < this.y + this.imgH
    ) {
      return true
    }
    return false
  }
}