<template>
    <div class="desiredAction">
        <Title type="h3" label="Action desirer" class="desiredAction__title" />
        <hr class="__hr" />

        <div class="desiredAction__items">  
            <Select
                :name="'actionName'"
                placeholder="Select"
                :options="actionTypes"
                @change-select="handleActionType"
            /> 
            <CardDesiredAction
                v-if="selectedType >= 0"
                :content="itemsData[selectedType]"
                @handleValue="handleAction"
            />
            <Switch
                v-if="selectedType >= 0"
                name="switch"
                itemLabel="Je souhaite que l’action envisagée fasse l’objet d’une consultation préalable"
                @handleSwitch="handleSwitch"
            />
            <Wish 
                v-if="selectedType >= 0"
                @checked="handleWishComponent"
            />
            <WishDate v-if="selectedType >= 0 && !whishStatus" @date-change="handleDateChange" />
            <div class="flex flex-row justify-end">
                <Button
                    class="flex-1"
                    :width="'100%'"
                    :disabled="disablePostButton"
                    @click="postAction">
                        {{ postBtnLabel }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Select from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Wish from  "./Wish.vue";
    import WishDate from  './WishDate.vue';
    import { computed, ref, watch } from 'vue';
    import CardDesiredAction from './CardDesiredAction.vue';
    import {useStore}  from  "vuex";
import { notification } from 'ant-design-vue';

    const store = useStore()

    interface ItemsData {
        title: string;
        name: string;
        select?: selectData;
    }

    interface optionData {
        value: string | number;
        label: string ;
    }

    interface selectData {
        labelName?: string;
        name?: string;
        labelTitle?: string;
        options: optionData[];
    }
    const actionTypes  = ref<optionData[]>([
        {
            label: 'Acquisition',
            value: 0, 
        },
        
        {
            label: 'Défrichage',
            value: 1,
        },
        {
            label: 'Plantation',
            value: 2,
        },
        {
            label: 'Installation de bacs de compostages',
            value: 3,
        },
        {
            label: 'Installation d’une citerne de collecte d’eau de pluie',
            value: 4,
        },
        {
            label: 'Installation d’un abri',
            value: 5,
        },
        
    ])
    const itemsData = ref<ItemsData[]>([  
        {
            title: 'Acquisition',
            name: 'acquisition',
            select: {
                name: 'acquisition',
                options: [
                    {
                        value: 'outils',
                        label: 'Outils',
                    },
                    {
                        value: 'plantations',
                        label: 'Plantations',
                    },
                    {
                        value: 'infrastructure',
                        label: 'Infrastructure',
                    },
                ],
            },
        },
        {
            title: 'Défrichage',
            name: 'clearing',
        },
        {
            title: 'Plantation',
            name: 'planting',
        },
        {
            title: 'Installation de bacs de compostages',
            name: 'compostBins',
        },
        {
            title: 'Installation d’une citerne de collecte d’eau de pluie',
            name: 'rainwaterCollection',
        },
        {
            title: 'Installation d’un abri',
            name: 'shelter',
        },
    ]);
    const collectiveGardenData =  computed(()=> store.getters["CollectiveGardenModule/getSelectedGarden"])

    let payload  : {[key : string]  : any}= {}
    const selectedType = ref<number>(-1);
    const whishStatus  = ref<boolean>(false);
    const showWishComponent = ref<boolean>(false);
    const disablePostButton = ref<boolean>(true);
    const postBtnLabel = ref<string>("Poster l'actions envisager");


    function handleAction($event : any){
        const key = Object.keys($event)[0];
        
        payload = {
            ...payload,
            ...$event[key]
        }
        if(collectiveGardenData.value && payload.actionName){
            disablePostButton.value  = false
        }
       
       
    }

    function handleActionType($event : any) {
        const key = Object.keys($event)[0];
        selectedType.value = Object.values($event)[0] as never
        payload = {
            ...payload,
            ...{[key] : itemsData.value[selectedType.value].name}
        } 
        if(collectiveGardenData.value && payload.actionName){
                disablePostButton.value  = false
            }
    }
    
    function handleSwitch($event : any){
        showWishComponent.value  = true;
        whishStatus.value = Object.values($event)[0] as never;
        if(whishStatus.value){
            postBtnLabel.value  = "Poster la consultation";
        }else{
            postBtnLabel.value  = "Poster l'actions envisager";
        }
        if(collectiveGardenData.value && payload.actionName){
                disablePostButton.value  = false
            }
    }
    function handleWishComponent($event : any){
        payload = {
            ...payload,
            ...$event
        }
        if(collectiveGardenData.value && payload.actionName){
                disablePostButton.value  = false
            }
    }

    function handleDateChange($event  : any){
        payload = {
            ...payload,
            ...$event
        }
        if(collectiveGardenData.value && payload.actionName){
                disablePostButton.value  = false
            }
    }
    function callback(){
        notification.success({message : "Votre sollicitation a bien été publié"})        
    }
    function postAction(){
        payload  = {
            ...payload,
            colectiveGarden : collectiveGardenData.value.id,
            typeOfManagement : collectiveGardenData.value.type
        }
        store.dispatch('CollectiveGardenModule/postActionData', { data : payload, callback})
    }
    watch(()=>payload,
        (v)=>{
            if(v.colectiveGarden && v.actionName){
                disablePostButton.value  = false
            }
        }
    )
</script>

<style lang="scss" scoped>
    .desiredAction {
        @apply flex flex-col gap-[14px];
        &__title {
            @apply text-[14px] text-secondary font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
        &:deep() {
            .switch__label {
                @apply font-[600];
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
