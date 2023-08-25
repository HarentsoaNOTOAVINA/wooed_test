const formParams: Array<IUserField> = [
    // {
    //     name: 'agencyId',
    //     label: "Nom de l'entreprise",
    //     placeholder: "Nom de l'entreprise",
    //     required: true,
    //     value: '',
    // },
    {
        id: 'agencyName',
        name: 'agencyName',
        label: "Nom de l'entreprise",
        placeholder: "Nom de l'entreprise",
        required: true,
        value: '',
    },
    // {
    //     id: 'agencyNumber',
    //     name: 'agencyNumber',
    //     label: "Numero de l'entreprise",
    //     placeholder: "Nom de l'entreprise",
    //     required: true,
    //     value: '',
    // },
    {
        id: 'agencyTva',
        name: 'agencyTva',
        label: "TVA de l'entreprise",
        placeholder: "TVA de l'entreprise",
        required: true,
        value: '',
        unity: '%'
    },
    {
        id: 'iti',
        name: 'iti',
        label: "ITI de l'entreprise",
        placeholder: "ITI de l'entreprise",
        required: false,
        value: '',
    },
    {
        id: 'name',
        name: 'name',
        label: 'Nom',
        placeholder: 'Nom',
        required: true,
        value: '',
        errorMsg: 'Le nom est obligatoire',
    },
    {
        id: 'firstname',
        name: 'firstname',
        label: 'Prénom',
        placeholder: 'Prénom',
        required: true,
        value: '',
        errorMsg: 'Le prenom est obligatoire',
    },

    {
        id: 'gm_address',
        name: 'address',
        label: 'Adresse',
        placeholder: 'Lieu ou adresse personnel',
        required: true,
        value: '',
    },
    {
        id: 'houseNumber',
        name: 'houseNumber',
        label: 'Numero du logement',
        placeholder: 'Numero de votre logement',
        required: false,
        value: '',
    },
    {
        id: 'houseAddition',
        name: 'houseAddition',
        label: 'Ajout dans le logement',
        placeholder: 'Ajouter un ajout',
        required: false,
        value: '',
    },
    {
        id: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'Adresse éléctronique',
        required: true,
        value: '',
        defaultValue: '',
    },
    {
        id: 'telephone',
        name: 'telephone',
        label: 'Tel',
        placeholder: 'Numero de téléphone',
        required: true,
        type: 'number',
        value: '',
    },
    // {
    //     id: 'tva',
    //     name: 'tva',
    //     label: 'TVA',
    //     placeholder: 'TVA personnel',
    //     required: true,
    //     value: '',
    // },

    {
        id: 'password',
        name: 'password',
        label: 'Mot de passe',
        placeholder: 'Mot de passe',
        required: true,
        type: 'password',
        value: '',
    },
    {
        id: 'confirmPassword',
        name: 'confirmPassword',
        label: 'Confimer le mot de passe',
        placeholder: 'Confirmer votre mot de passe',
        required: true,
        type: 'password',
        value: '',
    },
];

const errorFields: IErrorRegistrationFields = {
    name: 'Le nom est obligatoire',
    firstname: 'Le prénom est obligation',
    agencyName: "Le nom de l'entreprise est obligation",
    approvals: 'Vous devez ajouter un/des service(s)',
    // agencyAddress: "L'addrèsse est obligation",
    agencyTva: 'Le TVA est obligation',
    address: "L'addrèsse est obligation",
    email: "L'email est obligation",
    telephone: 'Le numero de téléphone est obligation',
    // tva: 'Le TVA est obligation',
    password: 'Le mot de passe est obligation',
    confirmPassword: 'Ce champ est obligation',
    typeRole: 'Vous devez choisir au moin 1 type',
};

// FIELD
export const particularUserForm: Array<IUserField> = [
    ...formParams
        .filter((field) => field.name !== 'agencyName')
        // .filter((field) => field.name !== 'approvals')
        // .filter((field) => field.name !== 'agencyAddress')
        .filter((field) => field.name !== 'agencyTva')
        .filter((field) => field.name !== 'iti'),
];
export const professionnalUserForm: Array<IUserField> = [
    ...formParams.filter((field) => field.name !== 'tva'),
];

export const professionnalUserFormWithAgencies: Array<IUserField> = [
    ...formParams
        .filter((field) => field.name !== 'tva')
        .filter((field) => field.name !== 'agencyName')
        // .filter((field) => field.name !== 'approvals')
        .filter((field) => field.name !== 'iti')
        .filter((field) => field.name !== 'agencyTva'),
];

// ERROR
const {
    agencyName,
    // agencyNumber,
    approvals,
    agencyTva,
    typeRole,
    ...restPart
} = errorFields;
const { tva, ...restPro } = errorFields;
export const professsionnalErrorFieldsWithAgencies = {
    ...filterProWithAgency(restPro),
};
export const particularErrorFields: IErrorRegistrationFields = { ...restPart };
export const professsionnalErrorFields: IErrorRegistrationFields = {
    ...restPro,
};

function filterProWithAgency(fields: Object) {
    let obj: any;
    Object.keys(fields)
        .filter((item) => item !== 'agencyName')
        // .filter((item) => item !== 'approvals')
        .filter((item) => item !== 'iti')
        .filter((item) => item !== 'agencyTva')
        .forEach((key) => {
            obj = { ...obj, [key]: (fields as any)[key] };
        });
    return obj;
}