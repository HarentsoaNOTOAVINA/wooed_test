interface Peb {
    id: number;
    label: string;
    color?: string;
    min: number;
}

export const data: Peb[] = [
    {
        id: 0,
        label: 'A+',
        color: '#0F8841',
        min: 0,
    },
    {
        id: 1,
        label: 'A',
        color: '#18B357',
        min: 46,
    },
    {
        id: 2,
        label: 'B',
        color: '#35CA34',
        min: 86,
    },
    {
        id: 3,
        label: 'C',
        color: '#68FB33',
        min: 171,
    },
    {
        id: 4,
        label: 'D',
        min: 256,
        color: '#CDFD38',
    },
    {
        id: 5,
        label: 'E',
        min: 341,
        color: '#FFE556',
    },
    {
        id: 6,
        label: 'F',
        color: '#FEC601',
        min: 426,
    },
    {
        id: 7,
        label: 'G',
        color: '#FF9935',
        min: 511,
    },
];