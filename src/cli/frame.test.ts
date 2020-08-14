import {Frame} from "@tamagotchi/cli/frame";
import assert = require("assert");

describe("Frame base class", ()=>{
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    afterEach(()=>{
        consoleSpy.mockClear()
    });

    it("Should log", ()=>{
        const title = 'Hello';
        const lines = ['world'];
        const f = new Frame(title, lines);
        f.print();

        // prints every two lines
        assert(consoleSpy.mock.calls[0][0].includes(title));
        assert(consoleSpy.mock.calls[2][0].includes(lines[0]))

    });

    it("Should log for many lines", ()=>{
        const title = 'Hello';
        const lines = ['world', 'im', 'here'];

        const f = new Frame(title, lines);
        f.print();
        assert(consoleSpy.mock.calls[0][0].includes(title));
        for(let l in lines){
            const n = parseInt(l);
            assert(consoleSpy.mock.calls[n+2][0].includes(lines[n]))
        }
    });

});