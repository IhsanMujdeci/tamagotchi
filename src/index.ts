import { tamagotchi } from './tamagotchi'
import { cli } from './cli'
import { stream } from "./kit/stream";
import { time } from "./time";
import { string } from "@kit/string";

const myTamagotchi = tamagotchi.createTamagotchi();
const gameTicker = new tamagotchi.Tick();

let clock = new time.Clock();
let Console: cli.Consoler = console;

async function start() {
    Console.clear();

    let startFrame = new cli.Frame("Tamagotchi", ['', "Welcome to tamagotchi, enter in your tamagotchi's name!", '']);
    startFrame.print();

    const q = new stream.Query(process.stdin, process.stdout);
    myTamagotchi.setName(await q.question(""));

    const keyInputStream = stream.createReadStream();

    //@ts-ignore
    process.stdin.setRawMode(true);
    cli.onKeyPressListener(keyInputStream, process.stdin);
    setIntervalClock(keyInputStream);

    for await (const chunk of keyInputStream) {
        Console.clear();
        draw(chunk.toString())
    }
}
start();


function setIntervalClock(keyInputStream: stream.Pushable) {
    setInterval(()=>{
        clock.incrementHour(6);
        keyInputStream.push(Buffer.from("blank"));
    }, 500);
}

function draw(inputString: cli.UserInputs){

    userInputHandler(inputString);
    gameTicker.tick(myTamagotchi);

    const drawFrame = new cli.Frame(
        `Tamagotchi ${myTamagotchi.getName()} | Age ${myTamagotchi.getAge()}`,
        [
            `${clock}`,
            `Life Cycle: ${myTamagotchi.getLifeCycle()} | Health: ${myTamagotchi.health.getValue()} | Weight: ${string.doubleDigitFill(myTamagotchi.weight.getValue())}`,
            `Happiness : ${string.doubleDigitFill(myTamagotchi.happiness.getValue())}  | Hunger: ${string.doubleDigitFill(myTamagotchi.hunger.getValue())}`,
            `Sleepiness: ${string.doubleDigitFill(myTamagotchi.sleepiness.getValue())}  | Poop  : ${string.doubleDigitFill(myTamagotchi.poopLevel.getValue())}`,
            '',
            `Events`,
            '------',
            ...myTamagotchi.getEvents()
        ]
    );
    drawFrame.print();

    logCommands();
}

function logCommands(){
    const feedCommand = new cli.Command('f','to feed');
    const bedCommand = new cli.Command('b','to put to bed');
    const poopCommand = new cli.Command('p','prompt poop time');
    const clearCommand = new cli.Command('c','clear events');
    const commands = new cli.Commands(feedCommand, bedCommand, poopCommand, clearCommand);
    commands.log();
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
