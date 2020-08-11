import { tamagotchi } from './tamagotchi'
import { cli } from './cli'
import { createReadStream } from "./stream/event-asyc-itterator";
import { onKey } from "./cli/keypress";
import {time} from "./time";
import {StreamQuery} from "./stream/streamquery";

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

    const q = new StreamQuery(process.stdin, process.stdout);
    name = await q.question("");

    const keyInputStream = createReadStream();
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

function draw(inputString: string = ""){

    // make thing to map character to function
    if(inputString === "f"){
        myTamagotchi.feed()
    }
    if(inputString === "c"){
        myTamagotchi.clearEvents()
    }
    if(inputString === "b"){
        myTamagotchi.sleep()
    }
    if(inputString === "p"){
        myTamagotchi.poop()
    }
    myTamagotchi.tick();

    frame = new cli.Frame(`Tamagotchi ${name} | Age ${myTamagotchi.getAge()}`, [
        `Day: ${day} | Time ${clock}`,
        `Life Cycle: ${myTamagotchi.getLifeCycle()}`,
        `Health: ${myTamagotchi.health.getValue()}`,
        `Happiness: ${myTamagotchi.happiness.getValue()} | Weight: ${myTamagotchi.weight.getValue()} | Hunger ${myTamagotchi.hunger.getValue()} | Sleepiness ${myTamagotchi.sleepiness.getValue()} | Poop ${myTamagotchi.poopLevel.getValue()}`,
        `Status: Happy`,
        '',
        `Events`,
        '------',
        ...myTamagotchi.getEvents()
    ]);
    frame.print();
    console.log('[f] to feed');
    console.log('[b] to put to bed');
    console.log('[p] prompt poop time');
    console.log('[c] clear events');
    console.log(myTamagotchi.tick());

}
