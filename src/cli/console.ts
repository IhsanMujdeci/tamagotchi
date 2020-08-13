export interface Logger {
    log(message?: any, ...optionalParams: any[]): void
}

export interface Clearer {
    clear(): void
}

export interface Consoler extends  Logger, Clearer{}