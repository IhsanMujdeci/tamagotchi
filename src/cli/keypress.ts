import {stream} from "@kit/stream";

export function onKeyPressListener(stream: stream.Pushable, keyPressStream: stream.KeyPresser){
    return keyPressStream.on('keypress', keyPress(stream));
}

export function keyPress(stream: stream.Pushable){
    return function(str: string, key?: stream.key)  {
        if(str){
            console.log('hello')
            stream.push(str)
        }
    }
}


