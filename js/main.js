import Background from './runtime/bg.js'
import Music from './runtime/music.js'
import Plane from './player/index.js'
import Bullet from './player/bullet.js'
import Pool from './base/pool.js'
import DataBus from './databus.js'
import BaseInfo from './utils/user_config.js'
import Enemy from './npc/enemy.js'
import GameInfo from '../js/runtime/gameInfo.js'

let gameinfo = new GameInfo()
let pool = new Pool()
let databus = new DataBus()
const ctx = canvas.getContext('2d')

export default class Main{
  constructor() {
    // 创建背景实例
    this.bg = new Background()
    // 声音
    this.music = new Music()
    // 创建飞机实例
    this.plane = new Plane()
    // 创建敌机
    this.enemy = new Enemy()
    this.id = 0
  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 绘制动态背景
    this.bg.render(ctx)
    // 绘制子弹和敌机
    databus.bullets.forEach(item => {
      if(item.isShow) {
        item.drawToCanvas(ctx)
      }
    })
    databus.enemys.forEach(item => {
      if(item.isShow) {
        item.drawToCanvas(ctx)
      }
    })
    // console.log(databus.animations.length)
    databus.enemys.forEach(item => {
      if(item.isPlaying) {
        item.drawExplosion(ctx)
      }
    })

    // 绘制飞机
    this.plane.drawToCanvas(ctx)

    // 绘制分数
    gameinfo.drawInfo(ctx)

  }
  update() {
    if (databus.gameover) {
      return
    }
    this.bg.update()
    // 创建子弹
    if (databus.frame % BaseInfo.density == 0) {
      this.music.playBiu()
      this.plane.shoot() 
    }
    // 创建敌机
    if (databus.frame % BaseInfo.enemyDensity == 0) {
      let enemyObj = pool.hasPoolObj('enemy', Enemy)
      enemyObj.init()
      databus.enemys.push(enemyObj)
    }

    databus.bullets.forEach((item, index) => {
      item.updata(index)
    })
    databus.enemys.forEach((item, index) => {
      item.updata(index)
    })

  }
  // 全局碰撞检测
  bang() {
    // 子弹敌机碰撞检测
    databus.bullets.forEach((item, index) => {
      databus.enemys.forEach((i, idx) => {
        let isBang = i.getIsBang(item)
        if(isBang) {
          // console.log('pengdaole ')
          i.isShow = false
          item.isShow = false
          i.playExplosion(ctx)
          this.music.playBoom()
          //记分
          databus.score++
        }
      })
    })

    // 敌机和玩家碰撞检测
    databus.enemys.forEach(item => {
      let isFinished = item.getIsBang(this.plane)
      if(isFinished) {
        this.gameOver()
        
      }
    })
  }
  gameOver() {
    databus.gameover = true
    databus.planeCanMove = false
    gameinfo.drawFinish(ctx)
    this.addRestartTouch()

    
  }
  // 重新开始
  reStart() {
    databus.restart()
    canvas.removeEventListener('touchstart', this.beginRestart)
    this.plane.init()

    // 清空上一次动画
    window.cancelAnimationFrame(this.id)
    this.loop()
  }

  beginRestart(e) {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let posXY = gameinfo.posXY


    if (x > posXY.startX && x < posXY.endX && y > posXY.startY && y < posXY.endY) {
      this.reStart()
    }
  }
  // 添加重新开始的点击事件
  addRestartTouch() {
    canvas.addEventListener('touchstart', this.beginRestart.bind(this))
  }

  

  loop() {
    databus.frame++
    this.id = window.requestAnimationFrame(() => {
      this.render()
      this.update()
      this.bang()
      this.loop()
    })
  }
}