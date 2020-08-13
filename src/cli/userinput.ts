export enum UserInputs {
    FEED = "f",
    CLEAR = "c",
    SlEEP = "b",
    POOP = "p",
}

export class Command{
    constructor(
        private key: string,
        private description: string
    ) {
    }

    toString(){
        return `[${this.key}] ${this.description}`
    }
}

export class Commands{
    private commands: Command[];
    constructor(...commands: Command[]) {
        this.commands = commands
    }

    log(){
        for(const c of this.commands){
            console.log(c.toString())
        }
    }
}
