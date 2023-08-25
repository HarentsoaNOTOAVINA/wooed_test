<template>
    <div class="custom-steps">
        <a-steps :current="current" :responsive="false" :direction="isTitle ? 'vertical': 'horizontal'">
            <a-step v-for="item in dataItem" :key="item.id" :title="isTitle && item.name" />
        </a-steps>
        <div class="details__content-items">
            <div>
                <Paragraphe type="bold">{{
                   dataItem && dataItem[current].name
                }}</Paragraphe>
                <div class="container-items">
                    <div v-for="f in dataItem?.[current].fields" :key="f.id">
                        <div class="wrap-value" v-if="f.value">
                            <Paragraphe>{{ f.name }}</Paragraphe>
                            <Paragraphe 
                                type="bold" 
                                class="item-value"
                                v-if="(typeof f.value) === 'string'"
                            >
                                {{formatDateFr(f.value)}}
                            </Paragraphe>
                            <a class="custom-steps__link" v-else :href="baseUri+f.value">
                                <Icon icon-name="Link" />
                                <span class="custom-steps__link-text">Fichier <span class="custom-steps__link-download">(Télécharger)</span></span>
                            </a>
                        </div>
                        <div 
                            v-else
                            class=""
                        >
                            <InputDate 
                                v-if="f.type === 'date'"
                                :name="'values['+f.id+']'"
                                :placeholder="f.name"
                                @handle-date-eng="handleChange"
                            />
                            <div 
                                class=""
                                v-else-if="f.type === 'file'"
                            >
                                <p class="details__label">{{ f.name }}</p>
                                <UploadImage 
                                    :name="'values['+f.id+'][]'"
                                    @upload-single-with-name="handleChange"
                                />
                            </div>
                            <Input
                                v-else
                                :name-input="'values['+f.id+']'"
                                :placeholder="f.name ?? ''"
                                @input="handleChange"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="details__btn" v-if="dataItem">
                <Button
                    type-button="border"
                    @on-click="handlePrev"
                    v-if="current > 0"
                    >Précedent</Button
                >
                <Button 
                    type-button="secondary" 
                    @on-click="handleNext"
                    v-if="dataItem.length > current+1"
                >Suivant</Button>
                <Button 
                    type-button="border" 
                    :disabled="!disableSave" 
                    @click="handleSave"
                    v-if="showSave"
                >
                    <LoadingButton size="xs" v-if="loadingAdd" theme="dark"/>
                    Enregistrer
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { Steps as ASteps, Step as AStep, notification } from 'ant-design-vue';
    import { onMounted, ref, watch, computed } from 'vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { useStore } from "vuex";
    import { formatDateFr } from '@/utils/date/format';
    import Icon from '@/components/Common/Icon/Icon.vue';

    interface Data {
        id?: any;
        name?: string;
        fields?: fieldData[];
    }

    interface fieldData {
        id?: any;
        name?: string;
        type?: any;
        value?: any;
    }

    const props = defineProps<{
        data: Data[];
        isTitle: boolean
    }>();

    const store = useStore();
    const current = ref<number>(0);
    const dataItem = ref<any>(props.data);
    const disableSave = ref<boolean>(false);
    const params = ref<any>({});
    const loadingAdd = ref<boolean>(false);
    const baseUri = import.meta.env.VITE_API_ROOT_URL;
    const showSave = ref<boolean>(false);

    onMounted(() => {
        getDefaultValue();
        handleShowSave();
    })

    watch(
        () => props.data,
        (value: any) => {
            dataItem.value = value;
        },
        { immediate: true, deep : true }
    );

    watch(() => current.value, (value) => {
        handleCheckDisable();
    }, {immediate : true, deep : true})

    watch(() => params.value, (value) => {
        handleCheckDisable();
    }, {immediate : true, deep : true})

    const getDefaultValue = () => {
        const detailsProcedure = store.getters['PrimesModule/getDetailsProcedure'];

        params.value = {
            ...params.value,
            process : detailsProcedure?.id,
            prime : detailsProcedure?.prime?.id,
        }
    }
    const handleNext = function () {
        current.value++;
        handleShowSave();
        reinitialiseParams();
    };
    const handlePrev = function () {
        current.value--;
        handleShowSave();
        reinitialiseParams();
    };

    function handleChange(e : any){
        params.value = {
            ...params.value,
            ...e
        }
    }

    function handleCheckDisable(){
        let found = false;
        if(props.data){
            props.data[current.value].fields?.forEach((item : any) => {
                for(let i in params.value){
                    if(!found){
                        if(i === 'values['+item.id+']' || i === 'values['+item.id+'][]'){
                            disableSave.value = true;
                            found = true;
                            return;
                        }else{
                            disableSave.value = false;
                        }
                    }
                }
            })
        }
        console.log(params.value);
        
    }

    async function handleSave(){
        console.log(params.value);
        loadingAdd.value = true;
        await store.dispatch('PrimesModule/postProcedure', params.value)
        .then(res => {
            console.log("&&&&&&&&&&&&&&&&&&&&&\n", res);
            notification['success']({
                message : "Succés",
                description : "Sauvegardé avec succés"
            })
            dataItem.value = res;
            showSave.value = false;
        })
        .catch(err => {
            notification['error']({
                message : "Erreur",
                description : "Une erreur s'est produite, veuillez réessayer."
            })
        })
        .finally(() => {
            loadingAdd.value = false;
        })
    }

    function handleShowSave(){
        dataItem.value?.[current.value].fields.forEach((item : any) => item.value ? showSave.value = false : showSave.value = true)
    }
    
    function reinitialiseParams(){
        params.value = {};
        getDefaultValue();
    }
</script>

<style scoped lang="scss">
    .custom-steps {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        height: 100%;
        @screen lg {
            @apply flex-row gap-[30px]
        }

        &__link{
            @apply flex gap-[10px] justify-center cursor-pointer;
        }

        &__link-text{
            @apply text-blue-400;
        }

        &__link-download{
            @apply italic text-[12px];
        }

        &:deep() {
            .ant-steps-item-process
                > .ant-steps-item-container
                > .ant-steps-item-icon {
                background-color: var(--color-primary);
                border-color: transparent;
            }
            .ant-steps-item-wait .ant-steps-item-icon {
                border-color: transparent;
                background-color: var(--color-gray);
            }
            .ant-steps-item-icon {
                width: 20px;
                height: 20px;
                margin: 0;
            }
            .ant-steps-icon {
                display: none;
            }
            .ant-steps-item-title::after {
                top: 10px;
                height: 2px;
                left: 5px;
            }
            // .ant-steps-item-title {
            //     display: none;
            // }
            .ant-steps-item-container {
                position: relative;
                @screen lg {
                    position: initial;
                }
            }
            .ant-steps-horizontal:not(.ant-steps-label-vertical)
                .ant-steps-item {
                padding-left: 5px;
            }
            .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
                display: inline-flex;
                position: absolute;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
                top: 0; 
                left: 0;
                font-size: 9px;
                color: #fff;
            }
            .ant-steps-item-icon {
                position: relative;
            }
            .ant-steps-item-finish .ant-steps-item-icon {
                background-color: var(--color-primary);
                border-color: #fff;
            }
            .ant-steps-item-finish
                > .ant-steps-item-container
                > .ant-steps-item-content
                > .ant-steps-item-title::after {
                background-color: var(--color-primary);
            }
            .ant-steps-item-title {
                // display: none;
            }
            .ant-steps-vertical {
                flex: 0 0 calc(35% - 10px);
                border: 1px solid var(--color-gray);
                border-radius: 8px;
                padding: 20px;
            }
            .ant-steps-vertical > .ant-steps-item > .ant-steps-item-container > .ant-steps-item-tail {
                left: 10px;
                padding-top: 24px;
                &::after {
                    width: 2px;
                }
            }
            .ant-steps-vertical > .ant-steps-item {
                flex: none;
                .ant-steps-item-title {
                    margin-left: 25px;
                    font-size: 14px;
                    line-height: 18px;
                }
            } 
            .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
                background-color: var(--color-primary);
            }
            .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title, .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
                font-weight: 500;
            }
        }
    }
    .details {
        &__content-items {
            height: 100%;
            background-color: var(--color-gray);
            @apply rounded-[8px] p-[14px] mt-[15px] flex justify-between flex-col;
            @screen lg { 
                flex: 0 0 calc(65% - 10px);
                margin-top: 0;
            }
        }
        &__btn {
            @apply flex gap-[15px];
        }

        &__label{
            @apply capitalize font-semibold;
        }
    }
    .item-value {
        background-color: rgba(244, 67, 54, 0.2);
        border-radius: 4px;
        padding: 6px 12px;
    }
    .wrap-value {
        @apply flex justify-between;
    }
    .container-items {
        @apply mt-[25px] flex flex-col gap-[20px];
    }
</style>
