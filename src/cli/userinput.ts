export enum UserInputs {
    FEED = "f",
    CLEAR = "c",
    SlEEP = "b",
    POOP = "p",
}

export function logCommands(){
    console.log('[f] to feed');
    console.log('[b] to put to bed');
    console.log('[p] prompt poop time');
    console.log('[c] clear events');
}
