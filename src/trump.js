import Phaser from 'phaser'
import Quote from './quote'
import HealthBar from './healthbar.js'
import Bubble from './bubble'

export default class Trump extends Phaser.Sprite {
    constructor(game, x = 0, y = 0) {
	super(game, x, y, 'trump')
	this.anchor.setTo(0.5, 1);

	this.frame = 2;
	this.animations.add('north', [4, 5, 6, 7, 8, 9, 10, 11], 15, true);
	this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
	this.animations.add('south', [20, 21, 22, 23, 24, 25, 26, 27], 15, true);
	this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);
	this.animations.add('talk', [36, 37, 38, 39], 15, true);

	this.hurt_sound = game.add.audio('hurt')

	this.onCallingElevator = new Phaser.Signal()
	this.onReadyForDebate = new Phaser.Signal()
	this.onDead = new Phaser.Signal()
	this.walkTween = this.game.add.tween(this);

	this.healthbar = new HealthBar(this.game, {x: this.game.world.centerX+10, y: 40, width: 182, height: 32, bgImage: 'health_frame'})
	this.bubble = new Bubble(this.game, this.x, this.y, 'left')
	this.confidence = 100

	this.createQuotes()
    }

    game_over(){
	this.loadTexture('trump_game_over', 0);
	this.animations.add('explode');
	this.animations.add('fissle', [31, 32, 33, 34])
	this.animations.play('explode', 10);

	this.events.onAnimationComplete.add(function(){
	    this.play('fissle', 10, true)
	    this.onDead.dispatch()
	}, this);
    }

    desolve(){
	this.loadTexture('trump_desolves', 0);
	this.animations.add('desolve');

	this.animations.play('desolve', 5);
    }

    // Initialize Trump for a new level
    initLevel(point) {
	this.frame = 2
	this.position.setTo(point.x, point.y - 10)
	this.healthbar.draw()
    }

    // walks trump in a direction with the animation running
    walkDirection(dx, dy){
	let time = Math.max(Math.abs(dx), Math.abs(dy))*7.5;

	this.walkTween = this.game.add.tween(this).to({x: this.x+dx,y: this.y+dy}, time, Phaser.Easing.Linear.None, true);
	this.walkTween.onComplete.add(()=>{
	    switch( this.animations.name ){
	    case 'north':
		this.frame = 0
		break;
	    case 'east':
		this.frame = 3
		break;
	    case 'south':
		this.frame = 2
		break;
	    case 'west':
		this.frame = 1
		break;
	    }
	    this.animations.stop()
	}, this)

	if( dx == 0 && dy == 0 ) this.animations.stop()
	else if( dx > 0 ) this.animations.play('east')
	else if( dy > 0 ) this.animations.play('south')
	else if( dx < 0 ) this.animations.play('west')
	else if( dy < 0 ) this.animations.play('north')

	return this.walkTween;
    }

    addQuote(quote){
	this.quotes.push(new Quote(game, quote.split(" ")))
    }

    createQuotes () {
	this.quotes = []
	this.addQuote("You have to take out their families.")
	this.addQuote("Grab them by the pussy.")
	this.addQuote("That's fake news!")
	this.addQuote("Build that wall!")
	this.addQuote("My IQ is one of the highest.")
	this.addQuote("I love Neil Young and he loves me!")
	this.addQuote("I know words, I have the best words.")
	this.addQuote("If Ivanka weren't my daughter, perhaps I'd be dating her.")
	this.addQuote("All women on the Apprentice flirted with me.")
	this.addQuote("I have a great relationship with the blacks.")
	this.addQuote("No, I’m not into anal.")
	this.addQuote("Well, someone’s doing the raping, Don!")
	this.addQuote("With the proper woman you don't need Viagra.")
	this.addQuote("I will be the greatest jobs president God ever created!")
	this.addQuote("Bing bing, bong bong, bing bing bing.")
	this.addQuote("Listen, you motherfuckers, we're going to tax you 25%!")
	this.addQuote("Global warming was created by and for the Chinese.")
	this.addQuote("We’ve just launched 59 missiles, heading to Iraq.")
	// this.addQuote("AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA AAAAA")

	Phaser.ArrayUtils.shuffle(this.quotes)
    }

    show_thought_bubble(words){
	this.bubble.create_thought(this.x, this.y, words)
    }

    remove_thought_bubble(){
	this.bubble.remove()
    }
    talk(text, target)
    {
	//console.log("REALLY: " + target)
    	this.bubble.create_speach(this.x, this.y, text, target)
	this.animations.play('talk')
    }

    shut_up(){
	this.animations.stop()
	this.frame = 3
	this.bubble.remove()
    }

    getQuotes (difficulty) {
	// TODO: Add more quotes and sort with difficulties
	return this.quotes
    }

    incrementConfidence () {
	this.confidence += 30
	this.healthbar.setPercent(this.confidence);
    }

    decrementConfidence () {
	this.confidence -= 34
	this.healthbar.setPercent(this.confidence);
	var hurttween = this.game.add.tween(this).to({y: '-5'}, 20, Phaser.Easing.Linear.None, true, 0, 3, true);
	this.hurt_sound.play()

	if( this.confidence <= 0)
	    this.game_over()
    }

    // walks from elevator to elevator
    doFullWalk() {
	this.walkDirection(0, 120).onComplete.addOnce(()=>{
	    this.walkDirection(690, 0).onComplete.addOnce(()=>{
		this.walkDirection(0, -90).onComplete.addOnce(()=>{
		    this.onCallingElevator.dispatch();
		}, this)
	    }, this)
	}, this)
    }

    // walks from elevator to level middle
    doDebateWalk() {
	this.walkDirection(0, 120).onComplete.addOnce(()=>{
	    this.walkDirection(345, 0).onComplete.addOnce(()=>{
		this.onReadyForDebate.dispatch();
	    }, this)
	}, this)
    }

    // walks from middle to end elevator
    doRestOfWalk() {
	this.walkDirection(345, 0).onComplete.addOnce(()=>{
	    this.walkDirection(0, -90).onComplete.addOnce(()=>{
		this.onCallingElevator.dispatch();
	    }, this)
	}, this)
    }
}
