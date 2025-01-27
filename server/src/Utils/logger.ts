class Logger {
    private static instance: Logger;

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string, attributes: string | number | any[] | any = ""): void {
        console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
        console.log (attributes);
    }
    public error(message: string, attributes: string | number | any[] | any = ""): void {
        console.error(`[LOG] ${new Date().toISOString()} - ${message}`);
        console.error (attributes);
    }
    public info(message: string, attributes: string | number | any[] | any = ""): void {
        console.log(`[LOG] ${new Date().toISOString()} - ${message}`, attributes);
    }
    public debug(message: string, attributes: string | number | any[] | any = ""): void {
        console.debug(`[LOG] ${new Date().toISOString()} - ${message}`);
        console.debug (attributes);
    }
}

export const logger = Logger.getInstance();