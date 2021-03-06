import Phaser from 'phaser'

export default class Timer extends Phaser.Sprite {
    constructor(game, words) {
	super(game, game.width*0.5, 100, 'timer')
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(0.7)

	var minimum = 1
	var delay = (minimum + words*2) / this.animations.frameTotal

	this.frame = 0;
	this.game.time.events.loop(Phaser.Timer.SECOND * delay, this.tick, this)

	//this.tickSound = game.add.audio('timer').play()

	this.onTimeOut = new Phaser.Signal()
    }

    tick() {
	if (this.frame >= 16)
	    this.timeUp()
	else
	    this.frame += 1
    }

    timeUp() {
	//this.tickSound.stop()
	this.onTimeOut.dispatch()
    }
}
