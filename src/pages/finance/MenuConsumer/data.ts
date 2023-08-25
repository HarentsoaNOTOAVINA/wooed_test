import Citerne from '@/components/Icon/Citerne.vue';
import Fire from '@/components/Icon/Fire.vue';
import ElectricIcon from '@/components/Icon/ElectricIcon.vue';
import WaterIcon from '@/components/Icon/WaterIcon.vue';

interface IConsumer{
    id : number,
    name : string,
    label : string,
    icon ?: Object
}

export const consumerMenu : IConsumer[] | any = [
    {
        id : 0,
        name : "water",
        label : "Consommation d'eau",
        icon : WaterIcon,
    },
    {
        id : 1,
        name : "electric",
        label : "Consommation électrique",
        icon : ElectricIcon,
    },
    {
        id : 2,
        name : "gaz",
        label : "Consommation de gaz",
        icon : Fire,
    },
    {
        id : 3,
        name : "citerne",
        label : "Citerne",
        icon : ElectricIcon,
    }
]