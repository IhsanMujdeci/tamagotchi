import * as stream from "stream";

const inputStream = new stream.Readable({
    read(size:number) {}
});

const outPutStream = new stream.Readable({
    read(size:number) {}
});

async function logChunks(readable:stream.Readable, fn: any) {
    for await (const chunk of readable) {
        fn(chunk)
    }
}

async function getUser(){
    const user = await getUserDB();
    outPutStream.push(user, 'utf8')
}

async function getUserDB(): Promise<string>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('userId ' + Math.round(Math.random()*100))
        }, 500)
    })

}

logChunks(inputStream,  function(data: any){
    console.log('getting user')
    getUser();
});

logChunks(outPutStream,  function (data: any) {
    console.log(data.toString())
});

inputStream.push("Push");



