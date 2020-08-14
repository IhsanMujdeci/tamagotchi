import {Command, Commands} from "@tamagotchi/cli/userinput";
import assert = require("assert");

describe("CLI user inputs", ()=>{

    it('Should create and log command', ()=>{
        const c = new Command('t', 'is testing')
        expect(c.toString()).toEqual('[t] is testing')
    })

    it('Should log commands', ()=>{
        const test = new Command('t', 'is testing')
        const repeat = new Command('r', 'is repeating test')

        const commands = new Commands(test, repeat);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        commands.log();

        assert(consoleSpy.mock.calls[0][0].includes('t'));
        assert(consoleSpy.mock.calls[0][0].includes('is testing'));
        assert(consoleSpy.mock.calls[1][0].includes('r'));
        assert(consoleSpy.mock.calls[1][0].includes('is repeating test'));
    })


});