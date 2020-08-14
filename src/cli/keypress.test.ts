import {instance, mock, verify} from 'ts-mockito'
import {onKeyPressListener, keyPress} from './keypress'
import {createReadStream} from "@kit/stream/readstream";
import {stream} from "@kit/stream";

describe('Key Press', ()=>{

    it('Should push to stream when keypress event called', ()=>{
        const key = 'f';
        const pushStreamMock = mock<stream.Pushable>();
        const pushStream = instance(pushStreamMock);

        const keyPress: stream.KeyPresser = createReadStream();

        onKeyPressListener(pushStream, keyPress);
        keyPress.emit("keypress", key);

        verify(pushStreamMock.push(key)).called();
    })

    it("should press key",()=>{
        const pusher: stream.Pushable = {push : jest.fn()};
        keyPress(pusher)("hello")
        expect(pusher.push).toBeCalledWith("hello")
    })

    it("should press keys",()=>{
        const pusher: stream.Pushable = {push : jest.fn()};
        keyPress(pusher)("")
    })

});