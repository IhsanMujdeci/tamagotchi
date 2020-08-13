import * as readLine from "readline";

interface StreamQueryer {
    question(query: string): Promise<string>
}

export class Query implements StreamQueryer{

    readLine: readLine.Interface;

    constructor(
        readStream: NodeJS.ReadStream,
        writeStream: NodeJS.WriteStream
    ) {
        this.readLine = readLine.createInterface({
            output: writeStream,
            input: readStream,
        });
    }

    question(query: string): Promise<string>{
        return new Promise((resolve)=>{
            this.readLine.question(query, function(response: string) {
                resolve(response)
            });
        })
    }
}