import * as log from "cli-block";

import {Printer} from "./start";

export class Frame implements Printer {
    constructor(private title: string, private lines: string[]) {
    }

    print(): void {
        log.BLOCK_START(this.title);
        this.lines.forEach(s=>log.BLOCK_LINE(s));
        log.BLOCK_END();
    }
}