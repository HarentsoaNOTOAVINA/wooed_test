import CounterProposal from "@/pages/make-offer-location/components/Form/CounterProposalForm.vue";
// import AcceptOffer from "@/pages/make-offer-location/components/Form/AcceptOffer.vue";
import AcceptOffer from "@/pages/lease/offer/sign.vue";
interface ISideMenu{
    label : string;
    name : string;
    icon ?: string
    component ?: object
}

interface ISubDocumentGroup {
    documentLabel: string,
    fileName: string
}


interface IDocumentGroup {
    groupLabel: string,
    groupElements: ISubDocumentGroup[]
}

export const dataSideMenu : ISideMenu[] = [
    {
        label : "Accepter l'offre du bailleur",
        name : "accept-offer",
        icon : "DollarFolder",
        component : AcceptOffer
    },
    {
        label : "Faire une contre proposition",
        name : "submit-counter-proposal",
        icon : "YenCare",
        component : CounterProposal
    },
    // {
    //     label : "Je souhaite m’associer à un autre offrant",
    //     name : "want-association",
    //     icon : "Users",
    //     component : CounterProposal
    // }
]

export const documentList : IDocumentGroup [] = [
    {
        groupLabel: "Modèle bail classique",
        groupElements: [
            {
                documentLabel: "Modèle bail classique droit commun",
                fileName: "20220524_modele_bail_classique_droit_commun_FR"
            },
            {
                documentLabel: "Modèle bail classique résidence principale",
                fileName: "20220524_modele_bail_classique_residence_principale_FR"
            }
        ]
    },
    {
        groupLabel: "Modèle bail colocation",
        groupElements: [
            {
                documentLabel: "Modèle bail colocation droit commun",
                fileName: "20220524_modele_bail_colocation_droit_commun_FR"
            },
            {
                documentLabel: "Modèle bail colocation résidence principale",
                fileName: "20220524_modele_bail_colocation_residence_principale_FR"
            }
        ]
    },
    {
        groupLabel: "Modèle bail étudiant",
        groupElements: [
            {
                documentLabel: "Modèle bail étudiant droit commun",
                fileName: "20220524_modele_bail_etudiant_droit_commun_FR"
            },
            {
                documentLabel: "Modèle bail étudiant résidence principale",
                fileName: "20220524_modele_bail_etudiant_residence_principale_FR"
            }
        ]
    }
]