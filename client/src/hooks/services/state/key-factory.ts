export const createKeys = <T>(keysSuffix: string, keys: { [key: string]: string }): T => {
    return Object.entries(keys).reduce<{ [key: string]: string }>(
        (currentValue, [key, value]) => {
            currentValue[key] = `${value}_${keysSuffix}`;

            return currentValue;
        },
        {}
    ) as any;
};
