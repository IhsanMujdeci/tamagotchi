import * as stream from "stream";

type StreamRead = (size: number) => void;

export function createReadStream(opts?:{read: StreamRead}){
    return new stream.Readable({
        read(size:number) {
            useReadIfExists(size, opts)
        }
    });
}

export function useReadIfExists(size: number, opts?: {read: StreamRead}){
    opts?.read(size);
}