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

import { Logger } from '@lcluber/mouettejs';

class Achievement {
    constructor(name, title, description, value, children, image, reward) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.children = children || new Achievements();
        this.value = children ? 0 : value;
        this.date = 0;
        this.image = image;
        this.reward = reward;
    }
    isActive() {
        return this.date ? true : false;
    }
    activate(timestamp) {
        this.date = timestamp ? timestamp : Date.now();
        if (this.reward) {
            this.reward.activate(this.date);
        }
        return this.children.score.points || 1;
    }
    try(value, timestamp) {
        if (!this.isActive()) {
            if (this.children.length()) {
                let childrenPoints = this.children.score.points;
                let message = this.children.try(null, value, timestamp);
                if (this.children.progress === 100) {
                    return {
                        message: message,
                        points: this.activate(timestamp)
                    };
                }
                else if (this.children.score.points > childrenPoints) {
                    return {
                        message: message,
                        points: this.children.score.points - childrenPoints
                    };
                }
            }
            else if (this.value <= value) {
                return {
                    message: this.title,
                    points: this.activate(timestamp)
                };
            }
        }
        return false;
    }
    export(name) {
        name = name ? name : this.name;
        if (this.children.length()) {
            return this.children.export(name);
        }
        else if (this.isActive()) {
            return [{
                    name: name,
                    value: this.value,
                    date: this.date
                }];
        }
        return false;
    }
}

class Score {
    constructor() {
        this.points = 0;
        this.total = 0;
    }
    getProgress() {
        return Math.floor(this.points / this.total * 100);
    }
    updateProgress(points) {
        this.points += points;
        return this.getProgress();
    }
}

class Achievements {
    constructor() {
        this.list = [];
        this.progress = 0;
        this.score = new Score();
    }
    add(name, title, description, value, children, image, reward) {
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
    getPoints() {
        return this.score.points;
    }
    getTotalPoints() {
        return this.score.total;
    }
    get(name) {
        for (let achievement of this.list) {
            if (achievement.name === name) {
                return achievement;
            }
        }
        return null;
    }
    length() {
        return this.list.length;
    }
    try(name, value, timestamp) {
        let lastMessage = null;
        if (this.progress < 100) {
            if (name) {
                let achv = this.get(name);
                if (achv) {
                    lastMessage = this.test(achv, value, timestamp);
                }
            }
            else {
                for (let achv of this.list) {
                    let msg = this.test(achv, value, timestamp);
                    if (msg) {
                        lastMessage = msg;
                    }
                }
            }
        }
        return lastMessage;
    }
    export(name) {
        let achvs = [];
        for (let achv of this.list) {
            let exp = achv.export(name);
            if (exp) {
                achvs.push(exp);
            }
        }
        if (achvs.length) {
            return [].concat.apply([], achvs);
        }
        return false;
    }
    test(achievement, value, timestamp) {
        let achv = achievement.try(value, timestamp);
        if (achv && achv.points) {
            this.progress = this.score.updateProgress(achv.points);
            return achv.message;
        }
        return null;
    }
}

class Reward {
    constructor(name, title, description, image) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.image = image;
        this.date = 0;
    }
    isActive() {
        return this.date ? true : false;
    }
    activate(timestamp) {
        if (!this.isActive()) {
            this.date = timestamp;
            return true;
        }
        return false;
    }
}

class Rewards {
    constructor() {
        this.list = [];
    }
    add(name, title, description, image) {
        if (!this.get(name)) {
            this.list.push(new Reward(name, title, description, image));
            return true;
        }
        Logger.warn('Reward name already exists.');
        return false;
    }
    get(name) {
        for (let reward of this.list) {
            if (reward.name === name) {
                return reward;
            }
        }
        return null;
    }
    length() {
        return this.list.length;
    }
}

export { Achievements, Rewards };
