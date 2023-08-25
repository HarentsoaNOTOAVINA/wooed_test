import Home from '@/components/Icon/Home.vue';
import Immobilier from '@/components/Icon/Immobilier.vue';
import Finance from '@/components/Icon/Finance.vue';
import Transport from '@/components/Icon/Transport.vue';
import Setting from '@/components/Icon/Setting.vue';
import ArtHome from '@/components/Icon/ArtHome.vue';
import Search from '@/components/Icon/Search.vue';
import Community from '@/components/Icon/Community.vue';
import Local from '@/components/Icon/Local.vue';
import Mobility from '@/components/Icon/Mobility.vue';
import WorkIcon from '@/components/Icon/WorkIcon.vue';
interface Menu {
    label: string;
    path: string;
    view?: string;
    icon?: object;
    submenu?: Array<{
        label: string;
        path: string;
        view?: string;
    }>;
}

export const dataMenu: Menu[] | any = [
    {
        label: 'Accueil',
        view: 'all',
        path: '/',
        icon: Home,
    },
    {
        // label: 'Immobilier',
        label: 'W-Immo',
        view: 'all',
        path: '#',
        icon: Immobilier,
        submenu: [
            {
                label: 'Vendre un bien',
                path: '/ajouter-bien',
                // path: '/ajouter',
            },
            {
                label: 'Woo-deal',
                path: '/liste-produit/sale',
            },
            {
                label: 'Mettre un bien en location',
                path: '/ajouter-location', //temporaire pour livrable début novembre
                //location basique
            },
            // {
            //     label: 'Service  à proximité',
            //     path: '/service-approximite',
            //     view: 'ROLE_PREST',
            // },
            {
                label: 'Louer un bien',
                path: '/trouver-un-bien-en-location',
            },
            {
                label: 'Echanger un bien',
                path: '/echanger_un_bien',
            },
            {
                label: 'ImmoGo',
                path: '/',
            },
            
            {
                label: 'Gérer mon bien',
                path: '/manage-property',
            },
            {
                label: "Information relative à un bien déterminé",
                path: "/information_relative"
            }
        ],
    },
    {
        label: 'W-Finance',
        view: 'all',
        path: '/finance-index',
        icon: Finance,
    },
    {
        label: 'W-Travaux',
        view: 'all',
        path: '/travaux',
        icon: WorkIcon,
    },
    {
        label: 'W-Local',
        view: 'all',
        path: '#',
        icon: Local,
        submenu: [
            {
                label: 'Urbanisme',
                path: '/urbanisme',
            },
            {
                label: 'Environnement',
                path: '/environnement',
            },
            {
                label: 'Education',
                path: '/community/categorie?type=Education',
            },
            {
                label: 'Sécurité',
                path: '/manage-property',
            },
            {
                label: 'Consultation',
                path: '/community/categorie?type=Consultation',
            },
            {
                label: 'Comités de quartier',
                path: '/community/categorie?type=quarterCommittee',
            },
            {
                label: 'Woo-bike',
                path: '/mobilite/velos',
            },
            {
                label: 'Patrimoine',
                path: '/patrimoine',
            },
            {
                label: 'Service à proximité',
                path: '/service-approximite',
                view: 'ROLE_PREST',
            },
        ],
    },
    // {
    //     label: 'Travaux',
    //     path: '#',
    //     view: 'all',
    //     icon: Setting,
    //     submenu: [
    //         {
    //             label: 'Vendre un bien',
    //             path: '/',
    //         },
    //         {
    //             label: 'Acquérir un bien',
    //             path: '/',
    //         },
    //         {
    //             label: 'Mettre un bien en location',
    //             path: '/',
    //         },
    //         {
    //             label: 'Louer un bien',
    //             path: '/',
    //         },
    //         {
    //             label: 'ImmoGo',
    //             path: '/',
    //         },
    //     ],
    // },
    {
        label: 'W-Transport',
        path: '/transport',
        view: 'all',
        icon: Transport,
    },

    {
        label: 'W-Art’home',
        path: '#',
        view: 'all',
        icon: ArtHome,
        submenu: [
            {
                label: 'Relooker mon bien',
                path: '/mes-biens',
            },
            {
                label: 'Acquérir un meuble/une œuvre d’art',
                path: '/mes-biens',
            },
            {
                label: 'Proposer mes services',
                path: '/mes-biens'
            },]
    },
    {
        label: 'W-Communauté',
        path: '/community',
        view: 'all',
        icon: Community,
    },
    {
        label: 'Mobilité',
        path: '/mobilite',
        view: 'all',
        icon: Mobility,
    },
    {
        label: 'Recherche',
        view: 'mobile',
        path: '/recherche-bien',
        icon: Search,
    },
    // 
];
