import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
  }

  preload () {
    // Should these really be here?
    this.load.image('tnsLogo', './assets/images/tns-logo.png')
    this.load.image('playBtn', './assets/images/play-button.png')
    this.load.image('menuBackground', './assets/images/menu-background.png')
    this.load.image('baseCorridor', './assets/images/base-corridor.png')
    this.load.image('prideCorridor', './assets/images/pride-corridor.png')
    this.load.image('kkkCorridor', './assets/images/kkk-corridor.png')
    this.load.image('elevator', './assets/images/elevator.png')
    this.load.image('elevator-door', './assets/images/elevator-door.png')

    this.load.spritesheet('trump', './assets/images/trump.png', 17, 32)

    this.load.audio('suffer', './assets/sounds/i_just_want_them_to_suffer.mp3')
    this.load.audio('elevatorBing', './assets/sounds/elevator_bing.mp3')
  }

  create () {
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tnsLogo')
    this.logo.anchor.setTo(0.5)
    this.logo.alpha = 0

    // Start fade in of TNS logo
    let fadeInTween = this.game.add.tween(this.logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true)
    fadeInTween.onComplete.add(()=>{
      // Wait one second with full alpha
      this.game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
        // Start to fade out
        let fadeOutTween = this.game.add.tween(this.logo).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true)
        fadeOutTween.onComplete.add(()=>{
              this.state.start('MainMenu')
        }, this)
      }, this)
    })

    this.game.input.onDown.add(()=>{
          this.state.start('MainMenu')
    }, this)
  }
}