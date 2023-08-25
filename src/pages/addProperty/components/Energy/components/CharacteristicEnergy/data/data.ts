import { typeField, Parent } from '../../../data.energy';


export const data: Parent = {
    title: "Intégrer les caractéristiques du PEB dans votre annonce",
    content: [
        {
            label: 'Demander à l’appli d’intégrer les caractéristiques du PEB dans l’annonce : 29 €',
            name: 'isAppIntegrateCaracteristicPeb',
            type: typeField.switch,
        },
        {
            label: 'Cértificat énergetique du bien',
            name: 'licenceEnergy',
            type: typeField.file,
        },
        {
            label: 'Test d’étanchéité à l’air',
            name: 'airTightness',
            type: typeField.file,
        },
    ]
}