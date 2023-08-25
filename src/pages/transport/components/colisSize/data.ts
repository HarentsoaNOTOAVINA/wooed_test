import Select from '@/components/Common/Select/Select.vue';
import RouteSuggestion from '@/pages/cocolis/RouteSuggestion/index.vue';
import SendReceivePackage from '@/pages/cocolis/SendReceivePackage/index.vue';
import Announcements from '@/pages/cocolis/Announcements/index.vue';
import AllObjectsForm from '@/pages/cocolis/SendReceivePackage/AllObjects/index.vue';
import MovingForm from '@/pages/cocolis/SendReceivePackage/Moving/index.vue';
import Input from '@/components/Common/Input/Input.vue';
import VolumeForm from '@/pages/cocolis/components/Form/VolumeForm.vue';
import UnknownVolumeForm from '@/pages/cocolis/components/Form/QuantityNameForm.vue';




interface IInputItem {
    label : string;
    nameInput : string;
    required ?: boolean;
    disabled ?: boolean;
    component : object;
    extraClass ?: string;
}

interface IRadioItem {
    label: string;
    value: number;
    inputValue: boolean;
}

interface ISizeItem {
    label : string;
    value: number;
    description : string;
    iconName: string
}

interface IForm {
    index: number;
    component: object
}

interface IWeightItem {
    label: string,
    value: number
}



export const RadioOptions : IRadioItem[] = [
     {
        label: 'Choisissez un format',
        value: 1,
        inputValue: false
    },
    {
        label: 'Je préfere indiquer le volume',
        value: 0,
        inputValue: true
    },
   
]

export const PredifinedWeight : IWeightItem[] = [
    {
        label: '-5kg',
        value: 0
    },
    {
        label: '5 à 30 kg',
        value: 1
    },
    {
        label: '30 à 100 kg',
        value: 2
    },
    {
        label: '+ 100kg',
        value: 3
    }
]



