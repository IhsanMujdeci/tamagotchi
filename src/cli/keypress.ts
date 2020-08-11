import * as stream from "stream";

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);

type key = {
    sequence: string,
    name: string,
    ctrl: boolean,
    meta: boolean,
    shift: boolean
}
type KeypressCallback = (str: string, key: key) => void

export function createOnKeyPress(callback?: KeypressCallback){
    // @ts-ignore
    process.stdin.setRawMode(true);
    return process.stdin.on('keypress', (str: string, key: key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        }
        if(callback){
            callback(str, key)
        }
    });
}

export function onKey(stream: stream.Readable){
    // @ts-ignore
    process.stdin.setRawMode(true);
    return process.stdin.on('keypress', (str: string, key: key) => {
        if(str){
            stream.push(str)
        }
    });
}

export async function awaitKeyPress(): Promise<{str: string, key: key}>{
    return new Promise(resolve=>{
        createOnKeyPress((str, key)=>{
            resolve({str, key})
        })
    })
}