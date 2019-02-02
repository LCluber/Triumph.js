import { Achievement } from './achievement';

export class Reward {

  name: String;
  title: String;
  description: String;
  relatedAchv: Achievement;
  image: string;
  date: number;

  constructor( name: String, title: String, description: string, image: string ) {

    this.name = name;
    this.title = title;
    this.description = description;
    this.image = image;
    this.date = 0;
  }

  public isActive(): boolean {
    return this.date ? true : false;
  }

  public activate(timestamp: number): boolean {
    if (!this.isActive()) {
      this.date = timestamp;
      return true;
    }
    return false;
  }


}
