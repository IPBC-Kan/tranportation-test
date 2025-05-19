// Because the translationService is abstarct, the DI provider
// of the service should be the module who is using it
export abstract class QuickTranslationService {
    public abstract translate(key: string): string;

    public translatePrefix(key: string, prefix: string): string {
        if (!key || !key.length) {
            return '';
        }

        if (key[0] === '.') {
            return this.translate(prefix + key);
        }

        return this.translate(key);
    }

    public abstract isRtl(): boolean;
}
