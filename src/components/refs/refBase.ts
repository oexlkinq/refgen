export type field = {
    title: string,
    hint: string,
    wiki: string,
    required: boolean,
    value?: string,
};

export type fields = {
    [key: string]: field;
};

export type basicRefType = {
    type: string[],
    fields: fields,
    toString(): string,
};

export const basicRef = {
    type: [],
    fields: {},
    toString: () => '',
} as basicRefType;

/**
 * дополняет исходный объект ref типом и полями (fields) из дополненного basicRefType
 * @param ref исходный объект
 * @param augRef объект с требуемыми дополнениями
 */
export function extendRef(ref: basicRefType, augRef: basicRefType) {
    // для всех полей и из ref.fields, и из augRef.fields ...
    const keysOfFields = Object.keys(ref.fields).concat(Object.keys(augRef.fields));
    // ... будет либо взят исходный объект из augRef, либо создана копия соотв объекта из ref
    const extendedFieldsEntries = Object.keys(keysOfFields).map(fieldKey => [fieldKey, augRef.fields[fieldKey] ?? Object.assign({}, ref.fields[fieldKey])] as [string, field]);
    const extendedFields = Object.fromEntries(extendedFieldsEntries);

    return {
        type: ref.type.concat(augRef.type),
        fields: extendedFields,
        toString: augRef.toString,
    } as basicRefType;
}

export function makeInstanceOfRef(ref: basicRefType, valuesOfFields: {[key: string]: string}) {
    const instance = Object.assign({}, ref, {fields: Object.assign({}, ref.fields)});
    for(let fieldKey in instance.fields){
        if(!(fieldKey in valuesOfFields)){
            console.warn(`поле "${fieldKey}" отсутствует в инициализирующем объекте`);
        }

        const field = Object.assign({}, instance.fields[fieldKey], {value: valuesOfFields[fieldKey]});

        instance.fields[fieldKey] = field;
    }

    return instance;
}

export abstract class RefBase {
    static type: string[];
    static fields: {
        [key: string]: field,
    };

    abstract toString(): string;
}
