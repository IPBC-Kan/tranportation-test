import { QuickLogger } from './quick-logger';

export class QuickConsoleLogger extends QuickLogger {
    private logger: Console;

    constructor(public readonly loggerName: string) {
        super();

        this.logger = console;
    }

    private createLogginObject(message: string, additionalData?: any) {
        if (additionalData instanceof Error) {
            additionalData = {
                stack: additionalData.stack,
                errorMessage: additionalData.message
            };
        }

        return {
            message: {
                message,
                time: new Date(),
                sender: this.loggerName,
                ...additionalData
            }
        };
    }

    public verbose(message: string, additionalData?: any) {
        this.logger.log(this.createLogginObject(message, additionalData));
    }

    public debug(message: string, additionalData?: any) {
        this.logger.debug(this.createLogginObject(message, additionalData));
    }

    public info(message: string, additionalData?: any) {
        this.logger.info(this.createLogginObject(message, additionalData));
    }

    public warn(message: string, additionalData?: any) {
        this.logger.warn(this.createLogginObject(message, additionalData));
    }

    public error(message: string, additionalData?: any) {
        this.logger.error(this.createLogginObject(message, additionalData));
    }
}
