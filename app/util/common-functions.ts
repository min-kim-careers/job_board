export const toCamelCase = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(item => toCamelCase(item)) as unknown as T;
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc: Record<string, unknown>, key) => {
            const camelCaseKey = key.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
            acc[camelCaseKey] = toCamelCase((obj as Record<string, unknown>)[key]);
            return acc;
        }, {}) as T;
    }
    return obj;
};

export const handleError = (error: string) => {
    console.error(error);
    throw error;
}