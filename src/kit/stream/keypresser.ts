export type key = {
    sequence: string,
    name: string,
    ctrl: boolean,
    meta: boolean,
    shift: boolean
}
type keyPressCb = (str: string, key: key) => void

export interface KeyPresser {
    on(s: 'keypress', cb: keyPressCb): void,
    emit(s: 'keypress', str: string, key?: key): boolean,
}
