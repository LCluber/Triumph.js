## Synopsis

[Triumph.js](http://triumphjs.lcluber.com) is an open source achievements and rewards library written in TypeScript.

## Motivation

The purpose of this library is to provide a simple way to implement achievements and rewards in your app.

## Installation

```bash
$ npm install @lcluber/triumphjs
```
Or download it **[here](http://triumphjs.lcluber.com/#download)**.

## Usage

### ES6

```javascript
import { Achievements, Rewards } from '@lcluber/triumphjs';

REWARDS = new Rewards();
REWARDS.add('dbg', 'DOUBLE guns!', 'Start with double gun', 'fighter-jet');
REWARDS.add('emp', 'EMP Boost', 'EMP are 20% bigger','bomb');

ACHIEVEMENTS = new Achievements();

var subAchv = new Achievements();
subAchv.add( "a", "Score novice", "Score 1 000 000 points", 1000000, null, 'crown', null);
subAchv.add( "b", "Score hobbyist", "Score 10 000 000 points", 10000000, null, 'crown', null);
subAchv.add( "c", "Score adventurer", "Score 20 000 000 points", 20000000, null, 'crown', REWARDS.get('emp'));

ACHIEVEMENTS.add("pgm", "PGM", "Make high scores", 0, subAchv, 'crown', null);

subAchv2 = new Achievements();
subAchv2.add( "a", "Survivor novice", "Survive 1 minute", 1, null, 'heartbeat', null);
subAchv2.add( "b", "Survivor hobbyist", "Survive 2 minutes", 2, null, 'heartbeat', null);
subAchv2.add( "c", "Survivor adventurer", "Survive 3 minutes", 3, null, 'heartbeat', REWARDS.get('dbg');

ACHIEVEMENTS.add("svv", "Immortal", "Survive as long as possible", 0, subAchv2, 'heartbeat', null);

// activate achievements.
ACHIEVEMENTS.try("svv", 1, 1287507239);
ACHIEVEMENTS.try("svv", 3, null);

// Export for persistence
var userAchvs = ACHIEVEMENTS.export();

// Update achievements with previous Export
userAchvs.forEach(function(uAchv) {
  if (ACHIEVEMENTS.get(uAchv.name)) {
    ACHIEVEMENTS.try(uAchv.name, uAchv.value, uAchv.date);
  }
});

```

### ES5

```html
<script src="node-modules/@lcluber/triumphjs/dist/triumph.iife.min.js"></script>
```

```javascript
REWARDS = new Triumph.Rewards();
REWARDS.add('dbg', 'DOUBLE guns!', 'Start with double gun', 'fighter-jet');
REWARDS.add('emp', 'EMP Boost', 'EMP are 20% bigger','bomb');

ACHIEVEMENTS = new Triumph.Achievements();

var subAchv = new Triumph.Achievements();
subAchv.add( "a", "Score novice", "Score 1 000 000 points", 1000000, null, 'crown', null);
subAchv.add( "b", "Score hobbyist", "Score 10 000 000 points", 10000000, null, 'crown', null);
subAchv.add( "c", "Score adventurer", "Score 20 000 000 points", 20000000, null, 'crown', REWARDS.get('emp'));

ACHIEVEMENTS.add("pgm", "PGM", "Make high scores", 0, subAchv, 'crown', null);

subAchv2 = new Triumph.Achievements();
subAchv2.add( "a", "Survivor novice", "Survive 1 minute", 1, null, 'heartbeat', null);
subAchv2.add( "b", "Survivor hobbyist", "Survive 2 minutes", 2, null, 'heartbeat', null);
subAchv2.add( "c", "Survivor adventurer", "Survive 3 minutes", 3, null, 'heartbeat', REWARDS.get('dbg');

ACHIEVEMENTS.add("svv", "Immortal", "Survive as long as possible", 0, subAchv2, 'heartbeat', null);

// activate achievements.
ACHIEVEMENTS.try("svv", 1, 1287507239);
ACHIEVEMENTS.try("svv", 3, null);

// Export for persistence
var userAchvs = ACHIEVEMENTS.export();

// Update achievements with previous Export
userAchvs.forEach(function(uAchv) {
  if (ACHIEVEMENTS.get(uAchv.name)) {
    ACHIEVEMENTS.try(uAchv.name, uAchv.value, uAchv.date);
  }
});

```

## Demo

See a basic example **[here](http://triumphjs.lcluber.com/#example)**.

## API Reference

Read the documentation **[here](http://triumphjs.lcluber.com/doc/)**.

## Tests

No tests to run yet

## Contributors

Triumph.js is still in early development and I would be glad to get all the help you can provide for this project.
To contribute you can clone the project on **[GitHub](https://github.com/LCluber/Triumph.js)** and See **NOTICE.md** for detailed installation walkthrough.

## License

MIT License

Copyright (c) 2019 Ludovic CLUBER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
