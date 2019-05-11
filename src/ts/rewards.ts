import { Logger } from '@lcluber/mouettejs';
import { Reward } from './reward';


export interface Groups {
  [key: string]: Reward[]
}

export class Rewards {

  list: Reward[];

  constructor( ) {
    this.list = [];
  }

  public add( name: string,
              title: String,
              description: string,
              amount: number,
              group: string | null,
              image: string
            ): boolean {

    if (!this.getByName(name)) {
      this.list.push(new Reward( name, title, description, amount, group || name, image ));
      return true;
    }
    Logger.warn('Reward name already exists.');
    return false;
  }

  public get(): Reward[] {
    return this.list;
  }

  public getGroups(): Groups | null {
    let array: Groups = {};
    for (let reward of this.list) {
      if (!array.hasOwnProperty(reward.group)){
        array[reward.group] = [];
      }
      array[reward.group].push(reward);
    }
    return array;
  }

  public getByName(name: string): Reward | undefined {
    return this.list.filter(reward => reward.name === name).shift();
  }

  public getByGroup(group: string): Reward | null {
    let list = this.list.filter(reward => reward.group === group);
    if (!list.length) {
      return null;
    }
    const reducer = (previousReward: Reward, currentReward: Reward) => currentReward.date /*&& currentReward.amount > previousReward.amount*/ ? currentReward : previousReward;
    return list.reduce(reducer);
  }

  public isRewardActive(name: string): Reward | null {
    let reward = this.getByName(name);
    if (!reward) {
      return null;
    }
    return reward.isActive() ? reward : null ;
  }

  public isGroupActive(group: string): Reward | null {
    let list = this.list.filter(reward => reward.group === group);
    if (!list.length) {
      return null;
    }
    const reducer = (previousReward: Reward, currentReward: Reward) => currentReward.date && currentReward.amount > previousReward.amount ? currentReward : previousReward;
    let reward = list.reduce(reducer);
    return reward.isActive() ? reward : null ;
  }

  public length(): number {
    return this.list.length;
  }

}
