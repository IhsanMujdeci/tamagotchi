import * as stream from "stream";

export function createReadStream(opts?:{read(size: number): void}){
    return new stream.Readable({
        read(size:number) {
            if(opts?.read){
                opts.read(size)
            }
        }
    });
}
