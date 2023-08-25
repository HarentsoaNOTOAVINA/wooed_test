<template>
    <div class="signal__container">
        <div class="signal__items-wrap">
            <div class="signal__form-item">
                <label>
                    <span> Type de signal </span>
                </label>
                <Input
                    class="signal__form"
                    placeholder="Type de signal"
                    name-input="sgnalType"
                    @input="handleChange"
                />
            </div>
            <div class="signal__form-item">
                <label>
                    <span> Indiquez la rue </span>
                </label>
                <Input
                    class="signal__form"
                    placeholder="Indiquez la rue"
                    name-input="place"
                    id="address"
                    @input="handleChange"
                />
            </div>
            <div class="signal__map-container">
                <div class="signal__map-item">
                    <Map />
                </div>
            </div>
            <div class="signal__form-item-wrap">
                <div class="signal__form-item">
                    <label>
                        <span> Date de début </span>
                    </label>
                    <InputDate
                        class="signal__form"
                        placeholder="Date de début du signal"
                        name="startDate"
                        @handle-date-format="handleChange"
                    />
                </div>
                <div class="signal__form-item">
                    <label>
                        <span> Date de fin </span>
                    </label>
                    <InputDate
                        class="signal__form"
                        placeholder="Date de fin du signal"
                        name="endDate"
                        @handle-date-format="handleChange"
                    />
                </div>
            </div>
            <div class="signal__form-item">
                <label>
                    <span> Ajouter une image </span>
                </label>
                <UploadImage 
                    name="file"
                    :type-image="true"
                    @upload-single-with-name="handleChange"
                />
            </div>
            <div class="signal__form-item">
                <label>
                    <span> Commentaire </span>
                </label>
                <TextArea
                    :rows="4"
                    placeholder="Votre commentaire..."
                    name-input="remark"
                    class="signal__form"
                    @handle-change="handleChange"
                />
            </div>
        </div>
        <div class="signal__button">
            <Button @click="handlePostAlert"> 
                <LoadingButton size="xs" v-if="loading"/>
                Ajouter 
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Map from '@/components/section/map/index.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import { watch, ref } from 'vue';
    import TextArea  from "@/components/Common/TextArea/TextArea.vue";
    import { useStore } from 'vuex';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const { autocompleteResult } = useAutoComptetion('address');

    const store = useStore()
    const loading = ref<boolean>(false)
    const params = ref<any>({
        files : []
    })
    const emit = defineEmits(['closeModal', 'onAdd']);

    watch(
        () => autocompleteResult,
        (data) => {
            params.value = {
                ...params.value,
                place: data.value?.address,
                latitude: data.value?.lat,
                longitude: data.value?.lng,
            };
        },
        { immediate: true, deep : true }
    );
    watch(() => params.value, (value) =>{
        console.log("Value\n", value);
        
    },  {immediate : true});

    function handleChange(item : any){
        for(let i in item){
            if(i === 'file'){
                params.value = {
                    ...params.value,
                    files : [
                        ...params.value.files,
                        item
                    ]
                }
            }else{
                params.value = {
                    ...params.value,
                    ...item
                }
            }
        }
        
    }

    async function handlePostAlert(){
        console.log("###########\n", params.value);
        loading.value = true;
        await store.dispatch('MobilityModule/addAlert', params.value)
        emit('closeModal');
        emit('onAdd');
        loading.value = false;
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .signal {
        &__items-wrap {
            @apply flex flex-col gap-y-[25px] pb-[20px];
            @screen md {
                @apply px-[14px] -mx-[14px];
                max-height: calc(100vh - 286px);
                @apply overflow-y-auto;
                @include scrollbar;
            }
        }
        &__form-item-wrap {
            @apply flex flex-col gap-[12px];
            @screen sm {
                @apply grid grid-cols-2;
            }
        }
        &__form-item {
            label {
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                @apply text-black flex items-center mb-[10px] gap-x-[12px];
            }
            &:deep() {
                .custom-input__label-icon {
                    @apply hidden;
                }
            }
        }
        &__form {
            @apply mb-0;
            &:hover, &:focus {
                @apply border-primary shadow-none;
            }
        }
        &__map-item {
            max-height: 300px;
            @apply h-[300px] w-full bg-gray;
        }
        &__button {
            box-shadow: 0 -4px 3px -6px;
            @apply relative flex justify-end pt-[25px];
        }
    }
</style>
