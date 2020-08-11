import {tamagotchi} from './tamagotchi'

const s = new tamagotchi.Statistic();

console.log(s)

import {StreamQuery} from "./stream/streamquery";
async function main(){
    const streamQuery = new StreamQuery(process.stdin, process.stdout);
    const response = await streamQuery.question("Hey\n");
}
void main();

/**
 *
 * David is talking about
 *
 **/

