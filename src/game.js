/* globals __DEV__ */
import Phaser from 'phaser'
import Trump from './trump'
import PrideParty from './prideparty'
import KkkMeeting from './kkkmeeting'
import ChurchMeeting from './churchMeeting'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {

    this.trump = new Trump(this.game)

    // 1. Create list with all corridors
    // 2. Run lobby scene
    // 3. Pick a corridor
    // 4. Start corridor scene
    // 5. Wait for corridor scene to complete
    // 6. Pick new corridor
    // 7. IF more corridors Goto 4 ELSE Goto 8
    // 8. Run final scene

    this.levels = []
    this.levels.push(new KkkMeeting(this.game, this.trump))
    this.levels.push(new ChurchMeeting(this.game, this.trump))
    this.levels.push(new PrideParty(this.game, this.trump))
    this.nextLevel()
  }

  nextLevel () {
    if (this.levels.length > 0) {
      this.level = this.levels.pop()

      this.level.onLevelComplete.addOnce(()=>{
        this.nextLevel()
      })

      this.level.start()
    }
    else {
        this.state.start('GameOverMenu')
    }
  }

  update () {
    if(this.level)
      this.level.update();
  }

  render () {
//    if (__DEV__) {
//    }
  }
}
