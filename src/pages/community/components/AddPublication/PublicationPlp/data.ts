export interface DataElement {
    title?: string;
    label?: string;
    selectValue?: string;
    description?: string;
    type?: string;
    contentFlex?: Array<ContentFields>;
    content?: Array<Cotent>
    textarea?: Array<ContentFields>
    creationRaison?: Array<object>
    other?: object | string,
    select?: object,
    id?: number | string 
}

interface ContentFields {
    placeholder: string;
    name: string;
    type?: string
}

interface Cotent {
    inputField?: Array<ContentFields>
    textarea?: Array<ContentFields>
    label?: string
    contentChild?: Array<ContentChild>
}

interface ContentChild {
    id?: number,
    label?: string,
    select?: Array<object>,
    other?: string,
    selectValue?: string,
    textarea?:Array<ContentFields>
}

export const elementPartner: DataElement[] = [
    {
        contentFlex: [
            {
                placeholder: 'Plp',
                name: 'plp',
            },
            {
                placeholder: 'Nom',
                name: 'name',
            },
        ],
    },
    {
        title: 'A.	Données administratives',
        content: [
            {
                inputField: [
                    {
                        placeholder: 'Nom du Plp',
                        name: 'namePlp',
                    },
                    {
                        placeholder: 'Commune ',
                        name: 'municipality',
                    },
                    {
                        placeholder: 'Zone de Police',
                        name: 'policeArea',
                    },
                ],
            },
        ],
    },
    {
        title: 'B.	Données géographiques du PLP :',
        label: '-	Quelles sont les rues, le quartier, le zoning industriel, la profession visées par le PLP ? (Eventuellement ajouter une annexe, …) ',
        textarea: [
            {
                placeholder: 'rues, le quartier, etc...',
                name: 'geographicalData',
            },
        ],
    },
    {
        title: 'C.	Raisons de la création du  PLP :',
        creationRaison: [
            {
                value: 'Augmentation du sentiment d’insécurité',
            },
            {
                value: 'Renforcement de la cohésion sociale',
            },
            {
                value: 'Faire de la prévention (contrôle de la criminalité)',
            },
            {
                value: 'L’encouragement de mesures de sécurité',
            },
            {
                value: 'Prendre l’initiative sur les problématiques de sécurité',
            },
            {
                value: 'Augmenter la propension à déclarer certains faits',
            },
            {
                value: 'Améliorer le contact, la communication entre la police et les citoyens',
            },
            {
                value: 'Diminution de la criminalité',
            },
        ],
        other: {
            label: 'autres',
            name: 'creationReasons',
        },
    },
    {
        id: 4,
        title: 'D.	Initiative du PLP :',
        select: [
            {
                value: '-	Initiative citoyenne',
            },
            {
                value: '-	Initiative policière',
            },
            {
                value: '-	Initiative des autorités communales',
            },
            {
                value: 'autre',
            },
            // '-	Initiative citoyenne',
            // '-	Initiative policière',
            // '-	Initiative des autorités communales',
            // 'autre',
        ],
        other: 'initiativeOther',
        selectValue: 'initiative',
    },
    {
        title: 'E.	Identification des membres du PLP',
        content: [
            {
                label: 'i.	Pour les citoyens',
                textarea: [
                    {
                        placeholder:
                            '-	Cordonnées du coordinateur (nom/ prénom/adresse/téléphone/mail)',
                        name: 'coordinatorContact',
                    },
                    {
                        placeholder:
                            '-	Eventuellement cordonnées du coordinateur adjoint  (nom/prénom/téléphone/mail)',
                        name: 'assistantCoordinatorContact',
                    },
                    {
                        placeholder:
                            '-	Eventuellement cordonnées de l’association professionnelle ',
                        name: 'professionalAssociationContact',
                    },
                ],
                inputField: [
                    {
                        placeholder: '-	Combien de membres composent le PLP  ? ',
                        name: 'numberOfMembers',
                        type: 'Number',
                    },
                ],
            },
            {
                label: 'ii.	Pour la police',
                textarea: [
                    {
                        placeholder:
                            '-	Coordonnées du policier mandaté (nom/prénom/téléphone/mail) : ',
                        name: 'policeContact',
                    },
                ],
            },
            {
                label: 'iii.	Pour les autorités administratives',
                textarea: [
                    {
                        placeholder:
                            '-	Coordonnées du bourgmestre (nom/prénom/téléphone/mail) ',
                        name: 'mayorContact',
                    },
                ],
            },
        ],
    },
    {
        description: `En cas de changement des données de la personne de contact, 
    du coordinateur du PLP ou du fonctionnaire de police mandaté, 
    cette modification doit être signalée aux autorités locales et fédérales`,
    },
    {
        title: `F.	Communication au sein du PLP (au sein du PLP, il importe de développer un système de communication efficace.
       Nous vous demandons donc de décrire le système de communication développé dans votre PLP).`,
        content: [
            {
                label: 'i.	Communication du citoyen vers la police :',
                contentChild: [
                    {
                        id: 6,
                        label: 'I.	Type de communication : ',
                        select: [
                            {
                                value: '-	Téléphone (Numéro du commissariat, 101)',
                            },
                            {
                                value: '-	SMS',
                            },
                            {
                                value: '-	Mail',
                            },
                            {
                                value: 'Autre',
                            },
                        ],
                        other: 'communicationCitizenPoliceOther',
                        selectValue: 'communicationCitizenPolice',
                    },
                ],
            },
            {
                label: 'ii.	Communication de la police vers le PLP',
                contentChild: [
                    {
                        label: 'I.	Communication à 1 niveau (vers l’ensemble du PLP)',
                    },
                    {
                        label: 'II.	Communication à 2 niveaux  (police vers le coordinateur et coordinateur vers les membres du PLP)',
                    },
                    {
                        id: 7,
                        label: 'III.	Communication utilisée',
                        select: [
                            {
                                value: '-	Téléphone (si système pyramidal, mettre le schéma de diffusion de l’information en annexe)',
                            },
                            {
                                value: '-	SMS',
                            },
                            {
                                value: '-	Mail',
                            },
                            {
                                value: 'autre',
                            },
                        ],
                        other: 'communicationPolicePlpOther',
                        selectValue: 'communicationPolicePlp',
                    },
                    {
                        label: 'iii.	L’échange d’informations : description de l’échange d’informations au sein du PLP et du plan de communication du PLP : ',
                        textarea: [
                            {
                                placeholder: 'Description',
                                name: 'dataExchange',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: 'G.	Réunions',
        label: `Le PLP se réunit périodiquement. Le coordinateur du PLP et le mandaté PLP de la Police participeront à cette réunion. 
    Les responsables du PLP se réunissent sur demande d’ une des parties. `,
    },
    {
        title: 'H.	Coût',
        content: [
            {
                label: 'i.	Coût du PLP pour les citoyens : quelle est le coût de la participation d’un citoyen à ce PLP ',
                inputField: [
                    {
                        placeholder: 'Coût',
                        name: 'participationCost',
                    },
                ],
            },
            {
                label: 'ii.	Soutien du PLP : Le PLP bénéficie-t-il de soutiens :',
                textarea: [
                    {
                        placeholder:
                            '-	de la part des autorités communales (financiers ou autres) OUI/NON,  si oui lesquels ?',
                        name: 'authoritySupport',
                    },
                    {
                        placeholder:
                            '-	de la part d’autres instances OUI/ NON, si oui lesquels',
                        name: 'otherSupport',
                    },
                ],
            },
            {
                label: 'III. Evaluation du fonctionnement du PLP ',
                textarea: [
                    {
                        placeholder:
                            '- un système d’évaluation est-il prévu et quels sont les critères d’évaluation du PLP ? ',
                        name: 'evaluation',
                    },
                ],
            },
        ],
    },
    {
        description: ` (Dans le cas où le PLP cesse ses activités, le SPF Intérieur doit également être informé. 
      Vous pouvez le déclarer en envoyant un mail à binplp@ibz.fgov.be)`,
    },
    {
        title: 'I.	Règlement d’Ordre intérieur (ROI). ',
        textarea: [
            {
                placeholder: 'À ajouter à la charte',
                name: 'roi',
            },
        ],
    },
    {
        title: `Signature de l’engagement à un partenariat dans le cadre du Réseau d’information de quartier de..........`,
        textarea: [
            {
                placeholder: 'Réseau d’information de quartier de....',
                name: 'neighborhood',
            },
        ],
    },
    {
        title: `Ces membres s’engagent à respecter la circulaire du...........relative aux réseaux d’information de quartier`,
        textarea: [
            {
                placeholder:
                    'Ces membres s’engagent à respecter la circulaire du....',
                name: 'circular',
            },
        ],
    },
    {
        type: 'signature',
        title: 'La charte est conclue entre :',
        content: [
            {
                label: '-	Les membres du PLP, représenté par la/ le coordinateur : ',
                inputField: [
                    {
                        placeholder: 'Mme/Mr',
                        name: 'representingName',
                    },
                    {
                        placeholder: 'boulevard, rue, allée ',
                        name: 'representingStreetName',
                    },
                    {
                        placeholder: 'N°',
                        name: 'representingStreetNumber',
                    },
                    {
                        placeholder: 'Code Postal',
                        name: 'representingZipCode',
                    },
                    {
                        placeholder: 'Commune',
                        name: 'representingMunicipality',
                    },
                ],
            },
            {
                label: '-	Les autorités locales ',
                inputField: [
                    {
                        placeholder: 'ville/ commune ',
                        name: 'authorityMunicpality',
                    },
                    {
                        placeholder: 'représentées par la/ le bourgmestre, ',
                        name: 'mayor',
                    },
                ],
            },
            {
                label: '- Le chef de corps de la police locale ',
                inputField: [
                    {
                        placeholder: 'Mme/ Mr',
                        name: 'localPoliceName',
                    },
                ],
            },
            {
                label: '-	Le représentant de l’association',
                inputField: [
                    {
                        placeholder:
                            'le représentant de l’association professionnelle ',
                        name: 'professionalAssociationRepresentingName',
                    },
                    {
                        placeholder: 'représentée par Mme/Mr',
                        name: 'professionalAssociationName',
                    },
                ],
            },
        ],
    },
];
