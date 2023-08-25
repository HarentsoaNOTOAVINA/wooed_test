import { typeField, Parent } from '../../data.energy';

export const data: Parent = {
    title: 'Chaudière',
    content: [
        {
            label: 'Mentionner ici si la chaudière est conforme',
            name: 'isBoilerConforme',
            type: typeField.radio,
            options: [
                {
                    label: 'Attestation conforme',
                    value: true,
                },
                {
                    label: 'Attestation non conforme',
                    value: false,
                },
            ],
        },
        {
            label: 'Insérer ici le dernier certificat de contrôle de la chaudière',
            type: typeField.file,
            name: 'lastControlBoiler',
        },
        {
            label: 'Coût annuel du contrôle',
            type: typeField.number,
            placeholder: 'Coût annuel',
            name: 'boilerCost',
            unity: '€',
        },
    ],
}