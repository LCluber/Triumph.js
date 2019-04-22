

export class Reward {

  name: String;
  title: String;
  description: String;
  amount: number;
  group: string;
  image: string;
  date: number;

  constructor( name: String, title: String, description: string, amount:number, group: string, image: string/*, level: number*/ ) {

    this.name = name;
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.group = group;
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
