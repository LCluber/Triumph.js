/** MIT License
* 
* Copyright (c) 2018 Ludovic CLUBER 
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* http://triumphjs.lcluber.com
*/


export declare class Achievement {
    name: string;
    title: string;
    description: string;
    children: Achievements;
    value: number;
    date: number;
    image: string;
    reward: Reward;
    constructor(name: string, title: string, description: string, value: number, children: Achievements, image: string, reward: Reward);
    isActive(): boolean;
    private activate;
    try(value: number, timestamp: number): number;
    export(name: string): Array<Pick<Achievement, 'name' | 'value' | 'date'>> | false;
}



export declare class Achievements {
    list: Array<Achievement>;
    progress: number;
    score: Score;
    newAchv: boolean;
    constructor();
    add(name: string, title: string, description: string, value: number, children: Achievements | null, image: string, reward: Reward): boolean;
    getPoints(): number;
    getTotalPoints(): number;
    get(name: string): Achievement | false;
    length(): number;
    try(name: string, value: number, timestamp: number): void;
    export(name: string): Array<Pick<Achievement, 'name' | 'value' | 'date'>> | false;
    private test;
}
export interface Level {
    id: number;
    name: string;
}

export declare class Reward {
    name: String;
    title: String;
    description: String;
    relatedAchv: Achievement;
    image: string;
    date: number;
    constructor(name: String, title: String, description: string, image: string);
    isActive(): boolean;
    activate(timestamp: number): boolean;
}

export declare class Rewards {
    list: Array<Reward>;
    constructor();
    add(name: string, title: String, description: string, image: string): boolean;
    get(name: string): Reward | false;
    length(): number;
}
export declare class Score {
    points: number;
    total: number;
    constructor();
    getProgress(): number;
    updateProgress(points: number): number;
}


