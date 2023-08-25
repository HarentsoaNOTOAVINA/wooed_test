interface IUserField {
    id?: string;
    name: string;
    label: string;
    required: boolean;
    placeholder: string;
    type?: string;
    value: string;
    errorMsg?: string;
    unity?: string,
    defaultValue?: string,
}

interface IErrorRegistrationFields {
    name: string;
    firstname: string;
    agencyName?: string;
    agencyNumber?: string;
    agencyAddress?: string;
    agencyTva?: string;
    approvals?: string;
    address: string;
    email: string;
    telephone: string;
    tva?: string;
    password: string;
    confirmPassword: string;
    typeRole?: any;
}

interface IAgenciesServices {
    roadWorks: string;
    status: boolean;
    id: number;
}
