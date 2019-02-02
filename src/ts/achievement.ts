import { Logger } from '@lcluber/mouettejs';
import { Achievements } from './triumph';
import { Reward } from './reward';

export class Achievement {

  name: string;
  title: string;
  description: string;
  children: Achievements;
  value: number;
  date: number;
  image: string;
  reward: Reward;

  constructor(  name: string,
                title: string,
                description: string,
                value: number,
                children: Achievements,
                image: string,
                reward: Reward ) {

    this.name = name;
    this.title = title;
    this.description = description;
    this.children = children || new Achievements();
    this.value = children ? 0 : value;
    this.date = 0;
    this.image = image;
    this.reward = reward;
  }

  public isActive(): boolean {
    return this.date ? true : false;
  }

  private activate(timestamp: number): number {
    this.date = timestamp ? timestamp : Date.now();
    if (this.reward) {
      this.reward.activate(this.date);
    }
    return this.children.score.points || 1;
  }

  //returns the quantity of new points earned
  public try(value: number, timestamp: number): number {
    if (!this.isActive()) { //not earned yet
      if (this.children.length()) { //has children
        let childrenPoints = this.children.score.points;
        this.children.try(null, value, timestamp);
        if (this.children.progress === 100) {
          return this.activate(timestamp);
        } else if (this.children.score.points > childrenPoints) {
          return this.children.score.points - childrenPoints;
        }
      } else if(this.value <= value) {
        return this.activate(timestamp);
      }
    }
    return 0;
  }

  public export(name:string): Array<Pick<Achievement, 'name' | 'value' | 'date'>>|false {
    name = name ? name : this.name;
    if (this.children.length()) { //has children
      return this.children.export(name);
    } else if (this.isActive()) {
      return [{
        name : name,
        value : this.value,
        date : this.date
      }]
    }
    return false;
  }

}
