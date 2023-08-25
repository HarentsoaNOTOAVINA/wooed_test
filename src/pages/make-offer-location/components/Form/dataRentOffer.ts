import Input from '@/components/Common/Input/Input.vue';
import TextArea from '@/components/Common/TextArea/TextArea.vue';
import Switch from '@/components/Common/Switch/Switch.vue';
import Upload from '@/components/Display/UploadImage/UploadImage.vue';

interface IButtonList {
    label : string,
    icon: string,
    routeName: string
}

interface IInputAttributes {
    label : string,
    unity: any,
    inputKeyName: string,
    required: boolean,
    placeHolder: string,
    component: any
}

export const inputAttributes : IInputAttributes[] = [
    {
        label: 'Montant du louer',
        unity: '€',
        inputKeyName: 'prices',
        required: true,
        placeHolder: '',
        component: Input
    },
    {
        label: 'Durée',
        unity: 'mois',
        inputKeyName: 'rentalDuration',
        required: true,
        placeHolder: '',
        component: Input
    },
    {
        label: 'Modalités particulières',
        unity: null,
        inputKeyName: 'specialModality',
        required: false,
        placeHolder: '',
        component: TextArea
    },
    // {
    //     label: 'Garantie locative',
    //     unity: null,
    //     inputKeyName: 'warranty',
    //     required: true,
    //     placeHolder: '',
    //     component: Upload
    // },
    // {
    //     label: 'Je suis une agence immobilière sociale',
    //     unity: null,
    //     inputKeyName: 'isAgency',
    //     required: false,
    //     placeHolder: '',
    //     component: Switch
    // }
]