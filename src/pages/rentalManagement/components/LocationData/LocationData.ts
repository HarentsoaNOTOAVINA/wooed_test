interface SelectDateUltime {
    label: string;
    value: string;
}

interface DateUltime {
    label: string;
    selectDateUltime: SelectDateUltime[];
}

interface Options {
    label: string;
    value: string;
}

export interface LeaveData {
    title: string;
    name?: string;
    options: Options[];
    duration?: object | any;
    dateUltime?: object | any;
}

export const dataTabs = [
    {
        tabTitle: 'Janvier',
        tabName: '1',
        tabContent: {
            rentDue: '150',
            rentPaid: '160',
            provisionChargesDue: '10',
            provisionChargesPaid: '90',
            link: '/',
            differencePaid: '130',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Février',
        tabName: '2',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Mars',
        tabName: '3',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Avril',
        tabName: '4',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Mai',
        tabName: '5',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Juin',
        tabName: '6',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Juillet',
        tabName: '7',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Août',
        tabName: '8',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Septembre',
        tabName: '9',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Octobre',
        tabName: '10',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Novembre',
        tabName: '11',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
    {
        tabTitle: 'Décembre',
        tabName: '12',
        tabContent: {
            rentDue: '100',
            rentPaid: '100',
            provisionChargesDue: '100',
            provisionChargesPaid: '100',
            link: '/',
            differencePaid: '100',
            differenceRefunded: '70',
        },
        isRentPerMonthPaid: false
    },
];

export const leaveData: LeaveData[] = [
    {
        title: 'Donné par le bailleur',
        name: 'donatedLessor',
        options: [
            {
                label: 'Sans motif',
                value: 'Sans motif',
            },
            {
                label: 'Pour occupation personnelle',
                value: 'Pour occupation personnelle',
            },
            {
                label: 'Pour gros travaux',
                value: 'Pour gros travaux',
            },
        ],
        duration: {
            label: 'Durée',
            value: '6 mois',
        },
        dateUltime: {
            label: 'Date ultime pour l’envoi du congé',
            selectDateUltime: [
                {
                    label: 'Fin du triennat',
                    value: 'Fin du triennat',
                },
                {
                    label: 'À tout moment',
                    value: 'À tout moment',
                },
            ],
        },
    },
    {
        title: 'Donné par le bailleur',
        name: 'givenTaker',
        options: [
            {
                label: 'Sans motif',
                value: 'Sans motif',

            },
        ],
        duration: {
            label: 'Durée',
            value: '3 mois',
        },
        dateUltime: {
            label: 'Date ultime pour l’envoi du congé',
            selectDateUltime: [
                {
                    label: 'À tout moment',
                    value: 'À tout moment',
                },
            ],
        },
    },
];