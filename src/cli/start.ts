
export interface Scene {
   render(): string
}

export interface Printer {
    print(): void
}

export class Start implements Scene{

    render(): string {
        return "Welcome to tamagotchi, press any button to continue";
    }

}
