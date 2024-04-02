/* на будущее, если потребуется более сложная структура данных для подсказки */
export type hint = string;

export type field = {
    title: string,
    hint: hint,
    required: boolean,
};

export type baseRefInstanceType = {
    toString(): string,
}

export type baseRefType = {
    type: string[],
    fields: {
        [key: string]: field,
    },
} & baseRefInstanceType;

export abstract class RefBase{
    static type: string[];
    static fields: {
        [key: string]: field,
    };

    abstract toString(): string;
}
