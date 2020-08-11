const readline = require('readline');
readline.emitKeypressEvents(process.stdin);

type key = {
    sequence: string,
    name: string,
    ctrl: boolean,
    meta: boolean,
    shift: boolean
}

interface Pushable {
    push(chunk: any, encoding?: string): boolean;
}

export function onKeyPressListener(stream: Pushable){
    // @ts-ignore
    process.stdin.setRawMode(true);
    return process.stdin.on('keypress', (str: string, key: key) => {
        if(str){
            stream.push(str)
        }
    });
}