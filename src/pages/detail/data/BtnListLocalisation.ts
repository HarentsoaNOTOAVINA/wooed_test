import CadastreIcon from '@/components/Icon/Cadastre.vue';
import DistanceFrom from '@/components/Icon/DistanceFrom.vue';
import ApproxServices from '@/components/Icon/ApproxServices.vue';
import {useRoute,useRouter} from "vue-router";
interface BtnLocalisation {
    id: number;
    label: string;
    icon?: any;
    case: string;
    url?: string;
}

const btnLocalisation: BtnLocalisation[] = [
    {
        id: 1,
        label: 'Parcelle cadastrale',
        icon: CadastreIcon,
        case: 'parcelleCadastrale',
        url: '/detail/localisation/',
    },
    // {
    //     id: 2,
    //     label: 'Distance par rapport au burreau',
    //     icon: DistanceFrom,
    //     case: 'distance',
    // },
    // {
    //     id: 3,
    //     label: 'Services à proximité',
    //     icon: ApproxServices,
    //     case: 'DetailedInfo',
    // },
    {
        id: 4,
    label: 'Localiser le bien sur Street View',
        icon: CadastreIcon,
        case: 'googleStreetView',

    },
    {
        id: 5,
        label: 'Localiser le bien sur Google Earth',
        icon: CadastreIcon,
        case: 'googleEarth',
        url: 'https://earth.google.com/web/search/',

    },
];

export default btnLocalisation;
