import DocumentIcon from '@/components/Icon/Document.vue';
import LiveIcon from '@/components/Icon/Live.vue';
import FileIcon from '@/components/Icon/File.vue';
import HeadPhoneIcon from '@/components/Icon/HeadPhone.vue';
import VisiteIcon from '@/components/Icon/Visite.vue';
import LocationIcon from '@/components/Icon/Location.vue';
import RelocationIcon from '@/components/Icon/Relocation.vue';
import FinanceIcon from '@/components/Icon/Finance.vue';

interface BtnList {
    id: number;
    label: string;
    icon?: any;
    case?: string;
    showBtn?: boolean;
}

const btnList: BtnList[] = [
    {
        id: 1,
        label: 'Information détaillées',
        icon: DocumentIcon,
        case: 'DetailedInfo',
    },
    {
        id: 2,
        label: 'Vidéo live',
        icon: LiveIcon,
        case: 'LiveVideo',
    },
    {
        id: 3,
        label: 'Document relatifs',
        icon: FileIcon,
        case: 'RelateDocument',
    },
    {
        id: 4,
        label: 'Services à proximité',
        icon: HeadPhoneIcon,
        case: 'service-nearby'
    },
    {
        id: 5,
        label: 'Visites',
        icon: VisiteIcon,
    },
    {
        id: 6,
        label: 'Localisation',
        icon: LocationIcon,
        case: 'location',
    },
    {
        id: 7,
        label: 'Déménagement',
        icon: RelocationIcon,
        case: 'moving',
        showBtn: false
    },
    {
        id: 8,
        label: 'Finance',
        icon: FinanceIcon,
        case: "AddServicesModal"
    },
];

export default btnList;
