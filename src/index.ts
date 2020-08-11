import { tamagotchi } from './tamagotchi'
import { cli } from './cli'
import { createReadStream } from "./stream/event-asyc-itterator";
import { onKey } from "./cli/keypress";

const myTamagotchi = tamagotchi.newTamagotchi();

const start = new cli.Start();
let frame = new cli.Frame("Tamagotchi", ['', start.render(), '']);

void async function start() {
    cli.clearConsole();
    frame.print();

    await cli.awaitKeyPress();

    const keyInputStream = createReadStream();
    onKey(keyInputStream);
    draw();

    for await (const chunk of keyInputStream) {
        draw(chunk.toString())
    }

}();

function draw(inputString: string = ""){
    cli.clearConsole();

    if(inputString === "f"){
        myTamagotchi.feed()
    }

    frame = new cli.Frame("Tamagotchi", [
        `Happiness: ${myTamagotchi.happiness.getValue()}, Weight: ${myTamagotchi.weight.getValue()}, Hunger ${myTamagotchi.hunger.getValue()}`
    ]);
    frame.print();
    console.log('press f to feed');
}
