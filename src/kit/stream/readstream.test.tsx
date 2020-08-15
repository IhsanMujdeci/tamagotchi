import {createReadStream, useReadIfExists} from "@kit/stream/readstream";

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
    it("Should useReadIfExists if no read fn", ()=>{
        useReadIfExists(1)
    })

    it("Should useReadIfExists if read fn", ()=>{
        const opts = {read: jest.fn()};
        useReadIfExists(1, opts);
        expect(opts.read).toBeCalledWith(1)
    })
})