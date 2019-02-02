import { Logger } from '@lcluber/mouettejs';
import { Reward } from './reward';
// import { Score } from './score';

export class Rewards {

  list: Array<Reward>;
  // progress: number;
  // score: Score;

  constructor(  ) {

    this.list = [];
    // this.progress = 0;
    // this.score = new Score();
  }

  public add( name: string,
              title: String,
              description: string,
              image: string //,
              // relatedAchv: Achievement
            ): boolean {

    if (!this.get(name)) {
      this.list.push(new Reward(name, title, description, image));
      // this.score.total++;
      return true;
    }
    Logger.warn('Reward name already exists.');
    return false;
  }

  public get(name: string): Reward|false {
    for (let reward of this.list) {
      if (reward.name === name) {
        return reward;
      }
    }
    return false;
  }

  public length(){
    return this.list.length;
  }

  // public activate(name: string, timestamp: number): boolean{
  //   // if (this.progress < 100) {
  //     if (name) {
  //       let reward = this.get(name);
  //       if (reward) {
  //         if (reward.activate(timestamp)){
  //           // this.progress = this.score.updateProgress();
  //           return true;
  //         };
  //       }
  //     }
  //   // }
  //   return false;
  // }

}
