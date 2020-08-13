import {stream} from "@kit/stream";

export function onKeyPressListener(stream: stream.Pushable, keyPressStream: stream.KeyPresser){
    return keyPressStream.on('keypress', (str, key) => {
        if(str){
            stream.push(str)
        }
    });
}