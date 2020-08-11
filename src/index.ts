import { tamagotchi } from './tamagotchi'
import { cli } from './cli'
import { createReadStream } from "./stream/event-asyc-itterator";
import { onKey } from "./cli/keypress";
import {time} from "./time";

const myTamagotchi = tamagotchi.newTamagotchi();

const start = new cli.Start();
let frame = new cli.Frame("Tamagotchi", ['', start.render(), '']);
let clock = new time.Clock();
let day = 0;

void async function start() {

    cli.clearConsole();
    frame.print();

    await cli.awaitKeyPress();

    const keyInputStream = createReadStream();
    onKey(keyInputStream);

    setInterval(()=>{
        const additionalDay = clock.incrementMinute(15);
        day += additionalDay;
        keyInputStream.push(Buffer.from("empty"));
    }, 250);

    for await (const chunk of keyInputStream) {
        cli.clearConsole();
        draw(chunk.toString())
    }

}();

function draw(inputString: string = ""){

    // make thing to map character to function
    if(inputString === "f"){
        myTamagotchi.feed()
    }

    frame = new cli.Frame("Tamagotchi", [
        `Day: ${day} | Time ${clock.toString()}`,
        `Happiness: ${myTamagotchi.happiness.getValue()} | Weight: ${myTamagotchi.weight.getValue()} | Hunger ${myTamagotchi.hunger.getValue()}`
    ]);
    frame.print();
    console.log('press f to feed');
}
