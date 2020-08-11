import { tamagotchi } from './tamagotchi'
import { cli } from './cli'
import { stream } from "./stream";
import { onKey } from "./cli/keypress";
import {time} from "./time";

const myTamagotchi = tamagotchi.newTamagotchi();

const start = new cli.Start();
let frame = new cli.Frame("Tamagotchi", ['', start.render(), '']);
let clock = new time.Clock();
let day = 0;
let name = "";

void async function start() {

    cli.clearConsole();
    frame.print();

    await cli.awaitKeyPress();

    const q = new stream.Query(process.stdin, process.stdout);
    name = await q.question("");

    const keyInputStream = stream.createReadStream();
    onKey(keyInputStream);

    setInterval(()=>{
        const additionalDay = clock.incrementHour(6);
        day += additionalDay;
        keyInputStream.push(Buffer.from("time"));
    }, 500);

    for await (const chunk of keyInputStream) {
        cli.clearConsole();
        draw(chunk.toString())
    }

}();

// can inject like a date stamp and find out last time it was checked
// pretty easy insert a timestamp and get second diff, make each second do a thing

enum UserInputs {
    FEED = "f",
    CLEAR = "c",
    SlEEP = "b",
    POOP = "p"
}

function userInputHandler(input: UserInputs) {
    if(input === UserInputs.FEED){
        myTamagotchi.feed()
    }
    if(input === UserInputs.CLEAR){
        myTamagotchi.clearEvents()
    }
    if(input === UserInputs.SlEEP){
        myTamagotchi.sleep()
    }
    if(input === UserInputs.POOP){
        myTamagotchi.poop()
    }
}

function draw(inputString: UserInputs){

    // make thing to map character to function
    userInputHandler(inputString);
    myTamagotchi.tick();
    frame = new cli.Frame(`Tamagotchi ${name} | Age ${myTamagotchi.getAge()}`, [
        `Day: ${day} | Time ${clock}`,
        `Life Cycle: ${myTamagotchi.getLifeCycle()}`,
        `Health: ${myTamagotchi.health.getValue()}`,
        `Happiness: ${myTamagotchi.happiness.getValue()} | Weight: ${myTamagotchi.weight.getValue()} | Hunger ${myTamagotchi.hunger.getValue()} | Sleepiness ${myTamagotchi.sleepiness.getValue()} | Poop ${myTamagotchi.poopLevel.getValue()}`,
        '',
        `Events`,
        '------',
        ...myTamagotchi.getEvents()
    ]);
    frame.print();
    logCommands();
    console.log(myTamagotchi.tick());

}

function logCommands(){
    console.log('[f] to feed');
    console.log('[b] to put to bed');
    console.log('[p] prompt poop time');
    console.log('[c] clear events');
}
