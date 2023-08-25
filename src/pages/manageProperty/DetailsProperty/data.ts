interface Menu {
    id ?: number,
    label : string,
    path : string,
    name : string,
    icon : string
}


export const dataMenu : Menu[] = [
    {
        id : 0,
        label : "Finances",
        path : '/financial-help/',
        name : "finance",
        icon : 'Finance',
    },
    {
        id : 2,
        label : "Travaux",
        path : '/travaux/',
        name : "work",
        icon : 'WorkIcon',

    },
    {
        id : 3,
        label : "Fournisseur",
        path : '/fournisseur/',
        name : "fournisseur",
        icon : 'Provider',

    },
    {
        id : 4,
        label : "Urbanisme",
        path : '/urbanisme/',
        name : "urbanisme",
        icon : 'Urbanism',

    },
    {
        id : 5,
        label : "Environnement",
        path : '/',
        name : "environment",
        icon : 'Environment',

    },
    {
        id : 6,
        label : "Education",
        path : '/',
        name : "education",
        icon : 'Educations',

    },
    {
        id : 7,
        label : "Copropriété",
        path : '/copropriete/',
        name : "coproperty",
        icon : 'Copropriete',

    },
    {
        id : 8,
        label : "Localiser mon bien",
        path : '/',
        name: 'localise',
        icon : 'Maps',

    },
    {
        id : 9,
        label : "Primes",
        path : '/primes/',
        name: 'prime',
        icon : 'Primes',

    },
    {
        id : 10,
        label : "Securités",
        path : '/security/',
        name: 'security',
        icon : 'Security',

    },
    {
        id : 11,
        label : "Assurances",
        path : '/assurance/',
        name : 'assurance',
        icon : 'Assurance',

    },
    {
        id : 11,
        label : "Préparer mon déménagement",
        path : '/demenagement/',
        name : 'moving',
        icon : 'Transport',

    },
    {
        id : 12,
        label : "Gestion location",
        path : '/gestion-location/',
        name : 'rentalManagment',
        icon : 'Chemine',

    },
]