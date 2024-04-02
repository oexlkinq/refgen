import { RefBase, field } from "./refBase";

export class Otbaldy extends RefBase {
    static type = [
        'Otbaldy',
    ];

    static fields = {
        title: {
            title: 'Название',
            hint: 'Ченить более подробное про название',
            required: true,
        } satisfies field,
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
        public title: string,
        public author: string,
        public url: string,
    ) {
        super();
    }

    toString(): string {
        return `${this.title} - ${this.author} // ${this.url}`;
    }
}