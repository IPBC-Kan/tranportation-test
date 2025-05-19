export abstract class QuickLogger {
    public abstract verbose(message: string, additionalData?: any): void;

    public abstract debug(message: string, additionalData?: any): void;

    public abstract info(message: string, additionalData?: any): void;

    public abstract warn(message: string, additionalData?: any): void;

    public abstract error(message: string, additionalData?: any): void;
}
