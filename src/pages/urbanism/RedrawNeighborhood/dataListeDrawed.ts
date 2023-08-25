interface IMenu {
    id: number;
    img: string;
    name: string;
    label: string;
}

export const liste: IMenu[] = [
    {
        id: 0,
        img: 'Redraw',
        name: 'Redraw',
        label: 'Label numero 1',
    },
    {
        id: 1,
        img: 'ListBullet',
        name: 'Liste',
        label: 'Label numero 2',
    },
    {
        id: 2,
        img: 'image_3',
        name: 'image',
        label: 'Label numero 3',
    },
];
