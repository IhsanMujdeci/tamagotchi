import * as stream from "stream";

export function createReadStream(){
    return new stream.Readable({
        read(size:number) {}
    });
}
