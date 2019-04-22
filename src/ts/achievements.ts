import { Logger } from '@lcluber/mouettejs';
import { Achievement } from './achievement';
import { Reward } from './reward';
import { Score } from './score';

export class Achievements {

  list: Array<Achievement>;
  progress: number;
  score: Score;
  // newAchv: boolean;

  constructor() {

    this.list = [];
    this.progress = 0;
    this.score = new Score();
  }

  public add( name: string,
              title: string,
              description: string,
              value: number,
              children: Achievements | null,
              image: string,
              reward: Reward
            ): boolean {

    if (!this.get(name)) {
      this.list.push(new Achievement(name, title, description, value, children, image, reward));
      this.score.total++;
      if (children) {
        this.score.total += children.score.total;
      }
      return true;
    }
    Logger.warn('Achievement name already exists.');
    return false;
  }

  public getPoints(): number {
    return this.score.points;
  }

  public getTotalPoints(): number {
    return this.score.total;
  }

  public get(name: string): Achievement | undefined {
    return this.list.filter(achievement => achievement.name === name).shift();
  }

  public length(): number {
    return this.list.length;
  }

  public try(name: string|null, value: number, timestamp: number): string | null {
    let lastMessage = null;
    if (this.progress < 100) {
      if (name) {
        let achv = this.get(name);
        if (achv) {
          lastMessage = this.test(achv, value, timestamp);
        }
      } else {
        for(let achv of this.list) {
          let msg = this.test(achv, value, timestamp);
          if (msg){
            lastMessage = msg;
          }
        }
      }
    }
    return lastMessage;
  }

  public export(name:string): Array<Pick<Achievement, 'name' | 'value' | 'date'>>|false {
    let achvs: Array<Array<Pick<Achievement, 'name' | 'value' | 'date'>>> = [];
    for (let achv of this.list) {
      let exp = achv.export(name);
      if (exp) {
        achvs.push(exp);
      }
    }
    if (achvs.length) {
      return [].concat.apply([],achvs);
    }
    return false;
  }

  private test(achievement: Achievement, value: number, timestamp: number): string | null {
    let achv = achievement.try(value, timestamp);
    if (achv && achv.points) {
      this.progress = this.score.updateProgress(achv.points);
      return achv.message;
    }
    return null;
  }


}
