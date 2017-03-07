import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    create () {

	this.background = this.game.add.sprite(0, 0, 'menuBackground')

	var title = this.game.add.sprite(-300, 50, 'title')
	title.anchor.setTo(0.5)
	this.game.add.tween(title).to({ x: 660}, 1000 + Math.random() * 3000, Phaser.Easing.Bounce.Out, true)

	this.playBtn = this.game.add.button(game.world.centerX-20,
					    this.game.world.centerY + 100,
					    'play_button',
					    this.playPressed,
					    this,
					    0,
					    1,
					    2);
	this.playBtn.anchor.setTo(0.5)

	this.menuGrp = this.add.group()
	this.menuGrp.add(title)
	this.menuGrp.add(this.playBtn)
    }

    playPressed () {
	this.state.start('Game');
    }
}
