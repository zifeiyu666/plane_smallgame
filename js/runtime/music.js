export default class Music{
  constructor() {
    this.bgm = new Audio()
    this.bgm.src = 'audio/bgm.mp3'
    this.biu = new Audio()
    this.biu.src = 'audio/bullet.mp3'
    this.boom = new Audio()
    this.boom.src = 'audio/boom.mp3'
    this.playBgm()
  }
  playBgm() {
    this.bgm.play()
  }
  playBiu() {
    this.biu.currentTime = 0
    this.biu.play()
  }
  playBoom() {
    this.boom.currentTime = 0
    this.boom.play()
  }
}
