REWARDS = new Triumph.Rewards();
REWARDS.add('dbg0', '2 guns', 'Start with 2 guns', 2, 'dbg', 'fighter-jet');
REWARDS.add('dbg1', '3 guns', 'Start with 3 guns', 3, 'dbg', 'fighter-jet');
REWARDS.add('emp', 'EMP Boost', 'EMP are 20% bigger', 1.2, null, 'bomb');

ACHIEVEMENTS = new Triumph.Achievements();

var subAchv = new Triumph.Achievements();
subAchv.add( "a", "Score novice", "Score 1 000 000 points", 1000000, null, 'crown', null);
subAchv.add( "b", "Score hobbyist", "Score 10 000 000 points", 10000000, null, 'crown', null);
subAchv.add( "c", "Score adventurer", "Score 20 000 000 points", 20000000, null, 'crown', REWARDS.getByName('emp'));

ACHIEVEMENTS.add("pgm", "PGM", "Make high scores", 0, subAchv, 'crown', null);

subAchv2 = new Triumph.Achievements();
subAchv2.add( "a", "Survivor novice", "Survive 1 minute", 1, null, 'heartbeat', REWARDS.getByName('dbg0'));
subAchv2.add( "b", "Survivor hobbyist", "Survive 2 minutes", 2, null, 'heartbeat', null);
subAchv2.add( "c", "Survivor adventurer", "Survive 3 minutes", 3, null, 'heartbeat', REWARDS.getByName('dbg1'));

ACHIEVEMENTS.add("svv", "Immortal", "Survive as long as possible", 0, subAchv2, 'heartbeat', null);

console.log(ACHIEVEMENTS.try("svv", 1, 1549105106266));
console.log(ACHIEVEMENTS.try("svv", 2, null));
// console.log(ACHIEVEMENTS.export());
// console.log(ACHIEVEMENTS);
// console.log(REWARDS);

console.log(REWARDS.getByGroup('dbg'));
console.log(REWARDS.getGrouped());
