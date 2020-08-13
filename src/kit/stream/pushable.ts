export interface Pushable {
    push(chunk: any, encoding?: string): boolean;
}