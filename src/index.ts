import { tamagotchi } from './tamagotchi'
import { cli } from './cli'
import { stream } from "./stream";
import { onKeyPressListener } from "./cli/keypress";
import { time } from "./time";
import { string } from "./string";

const myTamagotchi = tamagotchi.newTamagotchi();

let clock = new time.Clock();
let name = "";

function setIntervalClock(keyInputStream: stream.Pushable) {
    setInterval(()=>{
        clock.incrementHour(6);
        keyInputStream.push(Buffer.from("blank"));
    }, 500);
}

function userInputHandler(input: cli.UserInputs) {
    if(input === cli.UserInputs.FEED){
        myTamagotchi.feed()
    }
    if(input === cli.UserInputs.CLEAR){
        myTamagotchi.clearEvents()
    }
    if(input === cli.UserInputs.SlEEP){
        myTamagotchi.sleep()
    }
    if(input === cli.UserInputs.POOP){
        myTamagotchi.poop()
    }
}

function draw(inputString: cli.UserInputs){

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
    cli.logCommands();

}

async function start() {
    cli.clearConsole();

    let startFrame = new cli.Frame("Tamagotchi", ['', "Welcome to tamagotchi, enter in your tamagotchi's name!", '']);
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
}
start();
