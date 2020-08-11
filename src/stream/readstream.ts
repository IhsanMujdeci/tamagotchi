import * as stream from "stream";

export interface Pushable {
    push(chunk: any, encoding?: string): boolean;
}

export function createReadStream(){
    return new stream.Readable({
        read(size:number) {}
    });
}
