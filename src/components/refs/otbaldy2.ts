import { RefBase, field } from "./refBase";

export class Otbaldy2 extends RefBase {
    static type = RefBase.type.concat([
        'Otbaldy2',
    ]);

    static fields = {
        author: {
            title: 'Автор',
            hint: 'Автор. Формат: Фамилия И.О.',
            required: true,
        } satisfies field,
        url: {
            title: 'Ссылка',
            hint: 'Ссылка на источник',
            required: true,
        } satisfies field,
    };

    constructor(
        public author: string,
        public url: string,
    ) {
        super();
    }

    toString(): string {
        return `${this.author} // ${this.url}`;
    }
}