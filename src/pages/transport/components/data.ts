interface IOptionItem {
    value: boolean | number,
    label: string,
    inputValue ?: string
}
interface IInputItem {
    label : string;
    nameInput : string;
    extraClass ?: string;
    options ?: IOptionItem[]
}

export const departureAddressInputs : IInputItem[] = [
    {
        label: "Etage",
        nameInput: 'departureFloor', // to switch to departureFloor if expediteur is the setted UserRole
        extraClass: 'grouped-input',
        options: [
            {
                value: 0,
                label: 'RDC'
            },
            {
                value: 1,
                label: '1er'
            },
            {
                value: 2,
                label: '2eme'
            },
            {
                value: 3,
                label: '3eme'
            },
            {
                value: 4,
                label: '4eme'
            },
            {
                value: 5,
                label: '5eme'
            },
            {
                value: 6,
                label: '6eme'
            },
            {
                value: 7,
                label: '7eme'
            },
            {
                value: 8,
                label: '7eme et plus'
            }
        ]
    },
    {
        label: "Y a-t-il un assenceur ?",
        nameInput: 'isDepartureHaveElevator', // to switch to isDepartureHaveElevator if expedieur is the setted UserRole
        extraClass: 'grouped-input',
        options: [
            {
                value: true,
                label: 'Oui',
            },
            {
                value: false,
                label: 'Non',
            }
        ]
    },
    {
        label: "Monte-Meubles necessaire ?",
        nameInput: 'isDepartureFurnitureLift', // to switch to isDepartureFurnitureLift if expediteur is the setted UserRole
        extraClass: 'single-input',
        options: [
            {
                value: true,
                label: 'Oui',
            },
            {
                value: false,
                label: 'Non',
            }
        ]
    }
]

export const arrivalAddressInputs : IInputItem[] = [
    {
        label: "Etage",
        nameInput: 'arrivalFloor', // to switch to departureFloor if expediteur is the setted UserRole
        extraClass: 'grouped-input',
        options: [
            {
                value: 0,
                label: 'RDC'
            },
            {
                value: 1,
                label: '1er'
            },
            {
                value: 2,
                label: '2eme'
            },
            {
                value: 3,
                label: '3eme'
            },
            {
                value: 4,
                label: '4eme'
            },
            {
                value: 5,
                label: '5eme'
            },
            {
                value: 6,
                label: '6eme'
            },
            {
                value: 7,
                label: '7eme'
            },
            {
                value: 8,
                label: '7eme et plus'
            }
        ]
    },
    {
        label: "Y a-t-il un assenceur ?",
        nameInput: 'isArrivalHaveElevator', // to switch to isDepartureHaveElevator if expedieur is the setted UserRole
        extraClass: 'grouped-input',
        options: [
            {
                value: true,
                label: 'Oui',
            },
            {
                value: false,
                label: 'Non',
            }
        ]
    },
    {
        label: "Monte-Meubles necessaire ?",
        nameInput: 'isArrivalFurnitureLift', // to switch to isDepartureFurnitureLift if expediteur is the setted UserRole
        extraClass: 'single-input',
        options: [
            {
                value: true,
                label: 'Oui',
            },
            {
                value: false,
                label: 'Non',
            }
        ]
    }
]