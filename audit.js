import fs from 'fs';
import path from 'path';

// Let's import the file
const content = fs.readFileSync('src/lib/challenges.js', 'utf-8');

// I'll extract descriptions, starterCode, and expectedOutputs using regex or just require it.
// Since it's an ES module or just a JS object, let's parse it using regex or eval.
// It is a JS file starting with `const challenges = {` and ending with `}; export default challenges;`.
const code = content.replace('export default challenges;', 'return challenges;');
const getChallenges = new Function(code);
const challenges = getChallenges();

for (const topicKey of Object.keys(challenges)) {
    const topic = challenges[topicKey];
    for (const tierKey of Object.keys(topic.tiers)) {
        const tier = topic.tiers[tierKey];
        console.log(`\n=== ${tier.id} ===`);
        console.log(`DESC: ${tier.description}`);
        console.log(`EXPECTED:\n${tier.expectedOutput}`);
    }
}
