import Level from './level'
import Opponent from './opponent'

export default class PrideParty extends Level {
  constructor(game) {
    super(game)
    this.background = 'prideCorridor'
    this.opponent = new Opponent(game);
  }

  doWalk() {
    this.trump.doDebateWalk();
    this.trump.onReadyForDebate.addOnce(()=>{
      this.startDebate()
    }, this)
  }
}
