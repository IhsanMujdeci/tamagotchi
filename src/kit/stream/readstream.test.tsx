import {createReadStream} from "@kit/stream/readstream";

describe('create read stream abstraction',()=>{
    it('Should create readstream', (done)=>{

        const rs = createReadStream({read:(n)=>{
                done()
            }});
        rs.push("test")

    })

    it('Should create readstream with no read fn', ()=>{

        const rs = createReadStream();
        rs.push("test")

    })
})