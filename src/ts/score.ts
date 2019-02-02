

export class Score {

  points: number;
  total: number;

  constructor( ) {
    this.points = 0;
    this.total = 0;
  }

  public getProgress(): number {
    return Math.floor(this.points / this.total * 100);
  }

  public updateProgress(points: number): number {
    this.points +=  points;
    return this.getProgress();
  }

}
