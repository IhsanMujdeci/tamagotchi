import { tamagotchi } from './tamagotchi'
import { cli } from './cli'
import { stream } from "./stream";
import { onKeyPressListener } from "./cli/keypress";
import { time } from "./time";
import { string } from "./string";

const myTamagotchi = tamagotchi.newTamagotchi();

let clock = new time.Clock();
let name = "";

void async function start() {
    cli.clearConsole();

    const start = new cli.Start();
    let startFrame = new cli.Frame("Tamagotchi", ['', start.render(), '']);
    startFrame.print();

    const q = new stream.Query(process.stdin, process.stdout);
    name = await q.question("");

    const keyInputStream = stream.createReadStream();

    onKeyPressListener(keyInputStream);
    setIntervalClock(keyInputStream);

    for await (const chunk of keyInputStream) {
        cli.clearConsole();
        draw(chunk.toString())
    }
}();

function setIntervalClock(keyInputStream: stream.Pushable) {
    setInterval(()=>{
        clock.incrementHour(6);
        keyInputStream.push(Buffer.from("blank"));
    }, 500);
}

enum UserInputs {
    FEED = "f",
    CLEAR = "c",
    SlEEP = "b",
    POOP = "p",
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

    userInputHandler(inputString);
    myTamagotchi.tick();
    const drawFrame = new cli.Frame(`Tamagotchi ${name} | Age ${myTamagotchi.getAge()}`, [
        `${clock}`,
        `Life Cycle: ${myTamagotchi.getLifeCycle()} | Health: ${myTamagotchi.health.getValue()} | Weight: ${myTamagotchi.weight.getValue()}`,
        `Happiness : ${string.doubleDigitFill(myTamagotchi.happiness.getValue())}  | Hunger: ${string.doubleDigitFill(myTamagotchi.hunger.getValue())}`,
        `Sleepiness: ${string.doubleDigitFill(myTamagotchi.sleepiness.getValue())}  | Poop  : ${string.doubleDigitFill(myTamagotchi.poopLevel.getValue())}`,
        '',
        `Events`,
        '------',
        ...myTamagotchi.getEvents()
    ]);
    drawFrame.print();
    logCommands();

}

function logCommands(){
    console.log('[f] to feed');
    console.log('[b] to put to bed');
    console.log('[p] prompt poop time');
    console.log('[c] clear events');
}
