import { reactive } from 'vue';

interface IDataInput {
    id: string;
    placeholder: string;
    type?: string;
    label: string;
    unitMesure?: string;
    maxLength?: number;
    showAlign?: boolean;
    unity? : string;
}

interface IDataRadio {
    label: string;
    value: string;
}

interface IElementOffer {
    title?: string;
    name?: Array<string>;
    hasAdd?: Boolean;
    dataInput?: IDataInput[];
    dataRadio: IDataRadio[];
    hasInputFull?: Boolean;
    hasListCondition?: Boolean;
    checkGroup?: string;
    hasRadio?: Boolean;
    hasCheckBox?: Boolean;
    showInputRadio?: Boolean;
    class?: string;
    align?: string;
    titleInput?: string;
    hasConditionShowing?: Boolean;
    conditionShowingSuspens?: Boolean;
    isDateFormat?: Boolean;
    hasTextArea?: Boolean;
    dataArea?: Array<IDataInput>;
    hasSelect?: Boolean;
    dataSelect?: Array<any>;
}

export const elementOffer: Array<IElementOffer> = reactive([
    {
        conditionShowingSuspens: true,
        title: "Emetteur de l'offre",
        name: [],
        hasAdd: true,
        dataInput: [
            {
                id: 'name',
                placeholder: 'Votre nom',
                type: 'text',
                label: '',
                unitMesure: '',
            },
        ],
        dataRadio: [],
    },
    {
        conditionShowingSuspens: true,
        hasInputFull: true,
        title: 'Prix offert',
        dataInput: [
            {
                id: 'prices',
                placeholder: '0',
                type: 'number',
                label: '',
                unitMesure: '',
            },
        ],
        dataRadio: [],
    },
    {
        conditionShowingSuspens: true,
        title: 'Conditions particulières',
        hasListCondition: true,
        hasTextArea: true,
        hasAdd: true,
        dataArea: [
            {
                id: 'conditions',
                placeholder: 'Ajouter votre condition',
                type: 'text',
                label: '',
                unitMesure: '',
            },
        ],
        dataRadio: [],
    },
    {
        conditionShowingSuspens: true,
        title: 'Condition suspensive de l’obtention d’un crédit bancaire',
        checkGroup: 'conditionSuspens',
        hasRadio: true,
        showInputRadio: true,
        class: 'flex flex-row items-center gap-6 mb-1',
        align: 'horizontal',
        dataRadio: [
            {
                label: 'Oui',
                value: 'withCondition',
            },
            {
                label: 'Non',
                value: 'noCondition',
            },
        ],
        hasConditionShowing: true,
        dataInput: [
            {
                id: 'credit',
                label: 'Montant du crédit sollicité ',
                placeholder: '0',
                type: 'number',
                unitMesure: '',
                unity: "€"
            },
            {
                id: 'delay',
                label: 'Durée de la condition',
                placeholder: '0',
                unitMesure: 'semaine(s)',
                type: 'number',
            },
        ],
    },

    {
        conditionShowingSuspens: true,
        // title: "Validité de l'offre",
        hasInputFull: false,
        isDateFormat: true,
        dataInput: [
            {
                id: 'validityDate',
                placeholder: 'Select Date',
                type: 'datetime-local',
                label: '',
                unitMesure: '',
            },
        ],
        dataRadio: [],
    },
    {
        conditionShowingSuspens: true,
        hasSelect: true,
        dataInput: [
            {
                id: 'paymentRule',
                label: 'Acompte-garantie',
                placeholder: '0%',
                unitMesure: '%',
                type: 'number',
                maxLength: 3,
            },
            // {
            //     id: "signatureNotary",
            //     label: "Notaire",
            //     placeholder: "0",
            //     unitMesure: ''
            // }
        ],
        dataSelect: [
            {
                value: 'Sitraka',
                label: 'Sitraka',
            },
            {
                value: 'Tino',
                label: 'Tino',
            },
            {
                value: 'Pareto',
                label: 'Pareto',
            },
            {
                value: 'Yiminghe',
                label: 'Yiminghe',
            },
        ],
        dataRadio: [],
    },
    {
        conditionShowingSuspens: true,
        titleInput: 'Détail du document',
        dataInput: [
            {
                id: 'city',
                label: 'Fait à ',
                placeholder: 'Lieu',
                unitMesure: '',
            },
            {
                showAlign: true,
                id: 'datedAt',
                label: 'Le ',
                placeholder: '22/10/2022',
                type: 'date',
                unitMesure: '',
            },
        ],
        dataRadio: [],
    },

    {
        titleInput: 'Que voulez-vous faire de cette offre ? ',
        checkGroup: 'destination',
        hasCheckBox: true,
        dataRadio: [
            {
                label: "L’envoyer sur votre boîte mail ",
                value: 'client',
            },
            {
                label: 'La soumettre à votre notaire',
                value: 'notary',
            },
            {
                label: 'La signer et l’adresser au vendeur',
                value: 'seller',
            },
        ],
    },
    {
        titleInput: 'Signature ',
        checkGroup: 'signatureOffered',
        hasRadio: true,
        dataRadio: [
            {
                label: 'Signature simple',
                value: 'signatureSimple',
            },
            {
                label: 'Signature qualifiée  ',
                value: 'signatureElectronic',
            },
        ],
    },
]);

export const params = Object.fromEntries(
    elementOffer
        .map((item) =>
            !!item.dataInput
                ? item.dataInput.map((subitem) => subitem.id)
                : null
        )
        .flat()
        .filter((item) => item)
        .map((item) => [item, ''])
);
