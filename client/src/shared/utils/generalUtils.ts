export const isEmptyObj = (obj: object): boolean => {
    return obj == null || Object.keys(obj).length === 0;
};
