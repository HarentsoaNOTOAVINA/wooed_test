import { typeField, Parent } from '../../data.energy';

export const data: Parent = {
    title: 'Type de chauffage',
    content: [
        {
            label: 'Type de chauffage',
            name: 'boilerType',
            placeholder: 'Selectionner',
            type: typeField.select,
            options: [
                {
                    label: 'Mazout',
                    value: 'Mazout',
                },
                {
                    label: 'Gaz',
                    value: 'Gaz',
                },
                {
                    label: 'Pompe à chaleur',
                    value: 'Pompe à chaleur',
                },
                {
                    label: 'Autre',
                    value: 'Autre',
                },
            ],
        },
        {
            label: 'Année d’installation',
            name: 'boilerInstallationTime',
            type: typeField.date,
        },
    ],
};
