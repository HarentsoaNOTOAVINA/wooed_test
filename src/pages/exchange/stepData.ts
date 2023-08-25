import Duration from './Step/Duration.vue';
import ChooseMyProperty from './Step/ChooseMyProperty.vue';
import NavigationComponent from '@/components/Display/NavigationComponent/NavigationComponent.vue';
import OwnerPropertyList from './Step/OwnerPropertyList.vue';
import OtherPropertyHandling from './Step/OtherPropertyHandling.vue';
import SearchExchangableProperty from './Step/SearchExchangableProperty.vue';
import OtherPropertyList from './Step/OtherPropertyList.vue';
import SearchSimpleProperty from './Step/SearchSimpleProperty.vue';

interface Data {
    label: string;
    name: string;
    query: string;
    component: object
}

export const stepData: Data[] = [
    {
        label: 'Durée',
        name: 'duration',
        query: 'duree',
        component: Duration,
    }, {
        label: 'Identifier le bien que je souhaite échanger',
        name: 'choicePropOwner',
        query: 'identifier-le-bien',
        component: ChooseMyProperty,
    },
    {
        label: "Sélectionner l’un de « mes biens »",
        name: 'choseOwnerProperty',
        query: 'selectionner',
        component: OwnerPropertyList,
    },
    {
        label: 'Identifier le bien contre lequel je souhaite échanger mon bien',
        name: 'choicePropOther',
        query: 'identifier-le-bien-contre',
        component: OtherPropertyHandling,
    },
    {
        label: 'Rechercher le bien à échanger',
        name: 'simpleSearchProperty',
        query: 'rechercher-le-bien-echanger',
        component: SearchExchangableProperty,
    },
    {
        label: 'Resultat des biens disponible',
        name: 'exchangablePropertyResult',
        query: 'resultat-des-biens-disponible',
        component: OtherPropertyList,
    },
    {
        label: 'Rechercher des biens au alentours',
        name: 'mapSearchProperty',
        query: 'rechercher-des-biens-au-alentours',
        component: SearchSimpleProperty,
    },
]