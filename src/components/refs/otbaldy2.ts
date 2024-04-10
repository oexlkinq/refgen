import { basicRefType } from "./refBase";

export const Otbaldy2 = {
    type: [
        'Otbaldy2',
    ],

    fields: {
        title: {
            title: 'Название',
            hint: 'Ченить более подробное про название источника',
            wiki: '/wiki/otbaldy#title_field',
            required: true,
        },
        author: {
            title: 'Автор',
            hint: 'Автор. Формат: Фамилия И.О.',
            wiki: '/wiki/otbaldy#author_field',
            required: true,
        },
    },

    toString(): string {
        return `${this.fields.title.value} - ${this.fields.author.value}`;
    }
} satisfies basicRefType;