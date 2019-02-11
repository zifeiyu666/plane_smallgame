import Sprite from '../../js/base/sprite.js'
import DataBus from '../../js/databus.js'
import Pool from '../../js/base/pool.js'
import BaseInfo from '../../js/utils/user_config.js'

let databus = new DataBus()
let pool = new Pool()

const imgSrc = 'images/bullet.png'
const imgW = 20
const imgH = 36
export default class Bullet extends Sprite{
  constructor() {
    super({imgSrc, imgH, imgW})
  }
  init(x, y, planeX, planeY) {
    this.x = x + planeX/2 - imgW/2
    this.y = y + 20
    this.isShow = true
  }
  updata(index) {
    this.y -= BaseInfo.speed
    if(this.y < -this.imgH) {
      databus.removeObj('bullets', index)
      pool.collectObj('bullet', this)
      this.isShow = false
    }
  }
}