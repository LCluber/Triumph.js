REWARDS = new Triumph.Rewards();
REWARDS.add('dbg', 'DOUBLE guns!', 'Start with double gun', 'fighter-jet');
REWARDS.add('emp', 'EMP Boost', 'EMP are 20% bigger','bomb');

ACHIEVEMENTS = new Triumph.Achievements();

var subAchv = new Triumph.Achievements();
subAchv.add( "a", "Score novice", "Score 1 000 000 points", 1000000, null, 'crown', null);
subAchv.add( "b", "Score hobbyist", "Score 10 000 000 points", 10000000, null, 'crown', null);
subAchv.add( "c", "Score adventurer", "Score 20 000 000 points", 20000000, null, 'crown', null);

ACHIEVEMENTS.add("pgm", "PGM", "Make high scores", 0, subAchv, 'crown', REWARDS.get('emp'));

subAchv2 = new Triumph.Achievements();
subAchv2.add( "a", "Survivor novice", "Survive 1 minute", 1, null, 'heartbeat', null);
subAchv2.add( "b", "Survivor hobbyist", "Survive 2 minutes", 2, null, 'heartbeat', null);
subAchv2.add( "c", "Survivor adventurer", "Survive 3 minutes", 3, null, 'heartbeat', null);

ACHIEVEMENTS.add("svv", "Immortal", "Survive as long as possible", 0, subAchv2, 'heartbeat', REWARDS.get('dbg'));

ACHIEVEMENTS.try("svv", 1, 1287507239);
ACHIEVEMENTS.try("svv", 3, null);
console.log(ACHIEVEMENTS.export());
console.log(ACHIEVEMENTS);
console.log(REWARDS);
