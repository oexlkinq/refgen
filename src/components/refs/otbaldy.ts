import { basicRefType } from "./refBase";

export const Otbaldy = {
    type: [
        'Otbaldy',
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
        url: {
            title: 'Ссылка',
            hint: 'Ссылка на источник',
            wiki: '/wiki/otbaldy#url_field',
            required: false,
        },
    },

    toString(): string {
        return `${this.fields.title.value} - ${this.fields.author.value}${(this.fields.url.value) ? ' // ' + this.fields.url.value : ''}`;
    }
} satisfies basicRefType;