interface IOption {
    value: number,
    label: string
}

export const formatFilterOptions : IOption[] = [
    {
        value: 1,
        label: "S - telephone, cles, doudou ...",
    },
    {
        value: 2,
        label: "M - ordinateur, caisse de vin ...",
    },
    {
        value: 3,
        label: "L - television, lit parapluie ...",
    },
    {
        value: 4,
        label: "XL - commode, fauteuil ...",
    },
    {
        value: 5,
        label: "XXL - scooter, canape, lit ...",
    },
    {
        value: 6,
        label: "XXXL - superieur a 2m3",
    },
];

export const possibleDetourOptions : IOption[] = [
    {
        value: 5,
        label: "Detour possible < 5 km",
    },
    {
        value: 10,
        label: "Detour possible < 10 km",
    },
    {
        value: 20,
        label: "Detour possible < 20 km",
    },
    {
        value: 50,
        label: "Detour possible < 50 km",
    },
    {
        value: 100,
        label: "Detour possible < 100 km",
    },
    {
        value: 150,
        label: "Detour possible < 150 km",
    },
    {
        value: 300,
        label: "Detour possible < 300 km",
    },
];
