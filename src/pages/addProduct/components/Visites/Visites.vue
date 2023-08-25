<template>
    <div class="visite__loader" v-if="isLoading">
        <LoadingB theme="dark" size="xl" />
    </div>
    <div class="container" v-else>

        <div class="container">
            <div class="" v-for="(item, index) in visit" :key="index">
                <Select 
                    :name="item.name"
                    :label="item.label"
                    :options="item.subOption"
                    @change-select="changeHandler"
                />
            </div>
    
            <div class="" v-for="(item, index) in visit" :key="index">
                <!-- Eto le choix n° 1 -->
                <div class="container__card" v-if="item.subOption && paramsData.visitType  === item.subOption[0]['value']">
                    <div class="visite__item" v-for="(visitType, idVisitType) in mySelfData" :key="idVisitType">
                        <Switch
                            v-if="visitType.type === 'switch'"
                            :name="visitType.name"
                            :item-label="visitType.label"
                            @handle-switch="changeHandler"
                        />
                        <template v-if="visitType.subItem && paramsData[visitType.name]">
                            <div class="" v-for="(sub, idSub) in visitType.subItem" :key="idSub">
                                <Input 
                                    v-if="sub.type === 'number' || sub.type === 'text'"
                                    :name-input="sub.name"
                                    :label="sub.label"
                                    :input-type="sub.type"
                                    @input="changeHandler"
                                />
                                <Select 
                                    v-if="sub.type === 'select'"
                                    :name="sub.name"
                                    :label="sub.label"
                                    :options="sub.options"
                                    @change-select="changeHandler"
                                />
                            </div>
                          
                        </template>
                    </div>
                </div>
    
                <!-- Eto le choix n° 2 -->
                <div class="container__card" v-if="item.subOption && paramsData.visitType  === item.subOption[1]['value']">
                    <div class="visite__item" v-for="(visitType, idVisitType) in toAnotherMemberData" :key="idVisitType">
                        <Switch
                            v-if="visitType.type === 'switch'"
                            :name="visitType.name"
                            :item-label="visitType.label"
                            @handle-switch="changeHandler"
                        />
                        <template v-if="paramsData.isDetermineVisitHour">
                            <div class="" v-for="(sub, idSub) in visitType.subItem" :key="idSub">
                                <Select 
                                    v-if="sub.type === 'select'"
                                    :name="sub.name"
                                    :label="sub.label"
                                    :options="sub.options"                                
                                />
                                <Switch 
                                    v-if="sub.type === 'switch'"
                                    :name="sub.name"
                                    :item-label="sub.label"
                                />
                                <Radio 
                                    v-if="sub.type === 'radio'"
                                    :name="sub.name"
                                    :element="sub.options"
                                    @handle-change-radio="changeHandler"
                                />
                            </div>
                        </template>
                    </div>
                </div>
    
                <!-- Eto le choix n° 3 -->
                <div class="container__card" v-if="item.subOption && paramsData.visitType  === item.subOption[2]['value']">
                    <div class="visite__item" v-for="(visitType, idVisitType) in freeVisitData" :key="idVisitType">
                        <Switch
                            v-if="visitType.type === 'switch'"
                            :name="visitType.name"
                            :item-label="visitType.label"
                            @handle-switch="changeHandler"
                        />
                        <template v-if="visitType.subItem && paramsData.isOrderSecureKeyBox">
                            <div class="" v-for="(sub, idSub) in visitType.subItem" :key="idSub">
                                <Radio 
                                    v-if="sub.type === 'radio'"
                                    :name="sub.name"
                                    :element="sub.options"
                                    @handle-change-radio="changeHandler"
                                />
                                <Switch
                                    v-else-if="sub.type === 'switch'"
                                    :name="sub.name"
                                    :item-label="sub.label"
                                    @handle-switch="changeHandler"
                                />
                            </div>
                            <template v-if="paramsData.isWithPlace">
                                <div 
                                    class=""
                                    v-for="(placementItem, idPlacement) in withPlacement" 
                                    :key="idPlacement"
                                >
                                    <!-- <Radio 
                                        v-if="placementItem.type === 'radio'"
                                        :element="placementItem.options"
                                        :name="placementItem.name"
                                        @handle-change-radio="changeHandler"
                                    /> -->
                                    <Switch 
                                        v-if="placementItem.type === 'switch'"
                                        :name="placementItem.name"
                                        :item-label="placementItem.label"
                                        @handle-switch="changeHandler"
                                    />
                                    <template v-if="placementItem.subItem">
                                        <div 
                                            class="" 
                                            v-for="(subOpt, idSubOpt) in placementItem.subItem" 
                                            :key="idSubOpt"
                                        >
                                            <Input
                                                v-if="placementItem.name === 'isWithSurveillanceWebcam' && paramsData.isWithSurveillanceWebcam"
                                                :input-type="subOpt.type"
                                                :name-input="subOpt.name"
                                                :label="subOpt.label"
                                                @input="changeHandler"
                                                placeholder="€"
                                            />
                                            <Input
                                                v-if="placementItem.name === 'soundSonsor' && paramsData.soundSonsor"
                                                :input-type="subOpt.type"
                                                :name-input="subOpt.name"
                                                :label="subOpt.label"
                                                @input="changeHandler"
                                                placeholder="€"
                                            />
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
            <!-- Eto manomboka ilay selectionner dates et semaines -->
            <div 
                    class="visite__date-container"
                    v-if="(
                        paramsData.typeOfShedule &&  
                        mySelfData[1].subItem && 
                        paramsData.typeOfShedule === mySelfData[1].subItem[0].options[0].value
                        ) || 
                        ( 
                        toAnotherMemberData[0].subItem && 
                        paramsData.providerVisitingHour === toAnotherMemberData[0].subItem[1].options[1].value) ||
                        (
                        visit[0].subOption &&
                        paramsData.visitType === visit[0].subOption[2].value &&  
                        paramsData.isDetermineVisitHour)
                    "
                >
                    <!-- <AddFile class="container__add-icon" @click="increment" />
                    <div class="visite__content">
                        <div v-for="nb in numberInstance" :key="nb" class="container__card visite__date">
                            <div v-for="(item, key) in dates" :key="key" :class="item.class">
                                <Input
                                    v-if="item.type === 'number'"
                                    :label="item.label"
                                    :name-input="item.name"
                                    placeholder="0"
                                    :input-type="item.type"
                                    @input="handleChange($event, nb)"
                                />
                                <div v-else-if="item.type === 'date'" class="date-container">
                                    <TimePicker
                                        v-for="(sub, idSub) in item.subItem"
                                        :key="idSub"
                                        :label="sub.label"
                                        :name="sub.name"
                                        @change="handleChange($event, nb)"
                                    />
                                </div>
                                <Select
                                    v-else-if="item.type === 'select'"
                                    :label="item.label"
                                    :name="item.name"
                                    :options="item.options"
                                    mode="multiple"
                                    @change-select="handleChange($event, nb)"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Input
                            v-if="
                                saleLinkRedirection.type === 'input' &&
                                transactionType === text.publicSale
                            "
                            :name-input="saleLinkRedirection.name"
                            :label="saleLinkRedirection.label"
                            :input-type="saleLinkRedirection.type"
                            :placeholder="saleLinkRedirection.placeholder"
                        />
                    </div> -->
                    <Agenda />
            </div>
            <!-- Eto mifarana ny selectionner heures et date de rendez-vous -->
    
            <!-- <AddFile class="container__add-icon" @click="increment" />
            <div v-for="nb in numberInstance" :key="nb" class="container__card">
                <div v-for="(item, key) in dates" :key="key" :class="item.class">
                    <Input
                        v-if="item.type === 'number'"
                        :label="item.label"
                        :name-input="item.name"
                        placeholder="0"
                        :input-type="item.type"
                        @input="handleChange($event, nb)"
                    />
                    <div v-else-if="item.type === 'date'" class="date-container">
                        <TimePicker
                            v-for="(sub, idSub) in item.subItem"
                            :key="idSub"
                            :label="sub.label"
                            :name="sub.name"
                            @change="handleChange($event, nb)"
                        />
                    </div>
                    <SelectInput
                        v-else-if="item.type === 'select'"
                        :label="item.label"
                        :name="item.name"
                        :options="item.options"
                        @change-select="handleChange($event, nb)"
                    />
                </div>
            </div>
            <div>
                <Input
                    v-if="
                        saleLinkRedirection.type === 'input' &&
                        transactionType === text.publicSale
                    "
                    :name-input="saleLinkRedirection.name"
                    :label="saleLinkRedirection.label"
                    :input-type="saleLinkRedirection.type"
                    :placeholder="saleLinkRedirection.placeholder"
                />
            </div>
    
            <Modal
                v-model:visible="isVisible"
                :title="text.modal.title"
                :footer="null"
                class="modal-wrapper"
            >
                <div class="modal-container">
                    <div class="modal-icon-success">
                        <CheckIcon />
                    </div>
                    <div class="modal-text-header">
                        {{ text.modal.header }}
                    </div>
                    <div class="modal-text-content">
                        {{ text.modal.content }}
                    </div>
                    <div class="modal-action">
                        <Button class="info__my-btn" type="border">
                            {{ text.modal.action }}
                        </Button>
                    </div>
                </div>
            </Modal> -->
        </div>
    
        <div class="container">
            <div class="visite__header">
                <P class="visite__title">Publicités</P>
                <hr class="visite__divider">
            </div>
    
            <div class="visite__body">
                <Select
                    :options="publicity"
                    name="publicityType"
                    label="Choisir le type de publicité"
                    @change-select="changeHandler"
                />
                <div class="" v-if="paramsData.publicityType && paramsData.publicityType === publicity[0].value">
                    <Input 
                        input-type="number"
                        label="Nombre de panneaux"
                        name="numberOfPanels"
                        @input="changeHandler"
                    />
                    <Switch
                        item-label="Utilisé l'adresse du bien?"
                        name="isUsePropertyAddress"
                        @handle-switch="changeHandler"
                    />
                    <div class="" v-if="isAutocompleteAdress">
                        <Input 
                            name-input="otherAddressPublicity"
                            label="Adresse de livraison"
                            id="otherAddressPublicity"
                            @input="changeHandler"
                        />
                    </div>
                    <div class="" v-else>
                        <span class="visite__location">
                            <Icon icon-name="Map" />
                            {{allData.detailLocation.address}}
                        </span>
                    </div>
                    <div class="visite__link">
                        <Icon icon-name="Link"/>
                        <a href="">Suivie de la livraison</a>
                    </div>
                </div>
    
                <div class="" v-if="paramsData.publicityType && paramsData.publicityType === publicity[1].value">
                    <div class="visite__link">
                        <Icon icon-name="Link"/>
                        <a href="">Facebook</a>
                    </div>
                    <div class="visite__link">
                        <Icon icon-name="Link"/>
                        <a href="">Instagram</a>
                    </div>
                </div>
                <div class="" v-if="paramsData.publicityType && paramsData.publicityType === publicity[2].value">
                    <Select
                        label="Selectionner un influencer"
                        name="publicityIfluencer"
                        @change-select="changeHandler"
                    />
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { publicity, dates, days, saleLinkRedirection, visit, freeVisitData, toAnotherMemberData, mySelfData, withPlacement } from './data';
    import AddFile from '@/components/Icon/AddFile.vue';
    import { computed, reactive, ref, watch, onMounted } from 'vue';
    import { Store, storeKey, useStore } from 'vuex';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import CheckIcon from '@/components/Icon/Check.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import useAutoComptetion from "@/composables/useAutoComplete";
    import Icon from '@/components/Common/Icon/Icon.vue';
    import LoadingB from '@/components/Icon/LoadingButton.vue';
    import Agenda from '@/components/Display/Agenda/Agenda.vue';


    const isVisible = ref<boolean>(false);
    const text = reactive({
        publicSale: 'Vente public volontaire',
        modal: {
            title: 'Modéle 3D',
            header: 'Publication reussi !',
            content: 'Voulez vous faire la modélisation 3D du bien?',
            action: 'Continuer',
        },
    });
    const transactionType = computed(
        () => store.getters['AddProductModule/getTransactionType']
    );
    const paramsData = ref<any>({
        visitType : null,
        isWithPlace : true
    });
    const idOfTypeToShow = ref<any>(null);
    const isAutocompleteAdress = ref<boolean>(false);
    const isLoading = ref<boolean>(false);


    const props = defineProps({
        isFinished: {
            type: Boolean,
            default: false,
        },
    });
    const store: Store<any> = useStore();
    const numberInstance = ref<number>(1);
    const params = ref<any>({
        visitingHours: [
            {
                availabilityDay: null,
                availabilityHourMin: null,
                availabilityHourMax: null,
                weekNumber: null,
            },
        ],
    });
    const {  autocompleteResult } = useAutoComptetion('otherAddressPublicity', isAutocompleteAdress.value, isLoading.value);
    const allData = computed(() => store.getters['AddProductModule/getAddPropertyData']);
    
    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    onMounted(() => {
        getUserInfluencer();
    })

    watch(() => autocompleteResult.value, (value) => {
        console.log('fafafafafafa\n', value);
        
    }, {immediate : true, deep : true});

    watch(() => paramsData.visitType, (value) => {

    }, {immediate : true, deep : true});

    watch(
        () => props.isFinished,
        (newVal) => {
            if (newVal) {
                isVisible.value = !isVisible.value;
            }
        }
    );
    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
            });
        },
        { immediate: true, deep: true }
    );

    watch(() => paramsData.value, (value) => {
        if(!value.isDetermineVisitSchedule){
            paramsData.value.typeOfShedule = "";
            numberInstance.value = 1;
        }
        if(!value.isDetermineVisitHour){
            paramsData.value.providerVisitingHour = "";
            numberInstance.value = 1;
        }
        
    }, {immediate : true, deep : true});

    watch(() => paramsData.value, (value) => {
        if(value.publicityType && value.publicityType === publicity[0].value && !value.isUsePropertyAddress){
            isAutocompleteAdress.value = true;
            console.log("zaaaaaaaaaaaaa\n", isAutocompleteAdress.value);
        }else{
            isAutocompleteAdress.value = false;

        }
    }, {immediate : true, deep : true});

    const increment = () => {
        numberInstance.value += 1;
    };

    const handleChange = (e: any, nb: number) => {
        // for (let i in e) {
        //     if (params.value.visitingHours.length <= nb - 1) {
        //         params.value.visitingHours = [
        //             ...params.value.visitingHours,
        //             {
        //                 availabilityDay: null,
        //                 availabilityHourMin: '',
        //                 availabilityHourMax: '',
        //                 weekNumber: 0,
        //             },
        //         ];
        //     }
        //     params.value.visitingHours[+nb - 1][i] = e[i];
        // }
    };


    /**
     * new version
     */
    function changeHandler(value : any){
        console.log("Value\n", value);
        if(Object.keys(value)[0] === 'visitType'){
            paramsData.value = {
                visitType : null,
            };
        }
        paramsData.value = {
            ...paramsData.value,
            ...value
        };

        console.log("Ito le params\n", paramsData.value);
    }

    async function getUserInfluencer(){
        try {
            isLoading.value = true;
            await store.dispatch('AddProductModule/getUserInfluencer');
        } catch (error) {
            
        }finally{
            isLoading.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        @apply flex w-full flex-col gap-[10px];

        &__card {
            @apply border rounded-[8px] flex gap-[20px] flex-col border-slate-200 p-[20px];
        }
        &__add-icon {
            @apply cursor-pointer ;
        }
    }
    .content-50 {
        @apply w-[50%];
    }
    .date {
        &-container {
            @apply flex flex-row w-full justify-between;
            color: var(--color-gray-icon);
        }
        &-item {
            @apply w-[50%] p-5;
            border-radius: 8px;
        }
    }
    .content-100 {
        @apply w-[100%];
    }
    .modal {
        &-wrapper {
            border-radius: 8px;
        }
        &-container {
            @apply w-full flex-col;
            border-radius: 8px;
        }
        &-icon-success,
        &-text-header,
        &-text-content,
        &-action {
            @apply w-full flex;
            place-content: center;
        }
        &-text-header {
            @apply text-lg;
            font-weight: bold;
        }
        &-action {
            @apply mt-5;
        }
    }

    .visite{
        &__item{
            @apply flex gap-[20px] flex-col;
        }

        // &__date-container{
        //     @apply flex flex-row-reverse;
        // }

        &__date{
            @apply flex-1 mr-[20px];
        }

        &__content{
            @apply flex-1 flex flex-col gap-[10px];
        }

        &__divider{
            @apply text-slate-300;
        }

        &__header{  
            @apply flex flex-col gap-[20px] mt-[20px];
        }

        &__title{
            @apply font-semibold;
        }

        &__body{

        }
        &__location{
            @apply flex gap-[20px] mt-[20px];
        }
        &__link{
            @apply flex gap-[5px] text-blue-500 mt-[20px] italic;

        }

        &__loader{
            @apply w-full h-full flex justify-center items-center;
        }
    }
</style>
