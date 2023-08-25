<template>
    <div class="postApplication">
        <Title
            type="h3"
            label="solliciter des candidatures pour le projet"
            class="postApplication__title"
        />
        <hr class="__hr" />
        <div class="postApplication__form">
            <TextArea
                label="Annonce du candidature"
                :autoSize="rows"
                placeholder="Je souhaite solliciter des candidatures pour le projet"
                nameInput="content"
                @handleChange="handleTextArea"
            />
            <div class="postApplication__form-wrap">
                <label>
                    <span>Mon annonce sera visible entre</span>
                </label>
                <div class="postApplication__form-item">
                    <InputDate
                        label="Le"
                        :name="'postDateStart'"
                        :placeholder="newDate"
                        @handleDateFormatFr="handleDateChange"
                    />
                    <InputDate
                        label="Et le"
                        :name="'postDateEnd'"
                        :placeholder="newDate"
                        @handleDateFormatFr="handleDateChange"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-end">
            <Button
                class="flex-1"
                :width="'100%'"
                :disabled="disablePostButton"
                @click="postSollicitation">
                Solliciter des candidatures
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import  {useStore} from 'vuex';
    import { notification } from 'ant-design-vue';
    import {createFormData} from "@/utils/formdata/formData";
    import { ref } from 'vue';

    interface payloadI{
        type?: string;
        content ?: string;
        files ?: any;
        latitude ?: number;
        longitude ?: number;
        postDateStart ?: string,
        postDateEnd ?: string,
    }

    const store = useStore();
    const rows = { minRows: 4, maxRows: 8 };
    const newDate = new Date().toLocaleDateString();
    let payload : payloadI = {
        type : "Solicitation",
    };
    const disablePostButton = ref<boolean>(true);
    function handleTextArea($event :  any){
        payload  = {...payload, ...$event}
    }

    function handleDateChange($event : any){
        payload  = {...payload, ...$event}
        if (!!payload.postDateStart && !!payload.postDateEnd) {
            disablePostButton.value  = false;
        }
    }
    function callback(){
        notification.success({message : "Votre sollicitation a bien été publié"})        
    }
    
    function postSollicitation(){
        
        const formData  = createFormData(payload);
        if( !disablePostButton.value && payload.content){
            store.dispatch('CollectiveGardenModule/postSollicitation', {data : formData, callback})
        }
    }
</script>

<style lang="scss" scoped>
    .postApplication {
        @apply flex flex-col gap-[24px];
        &__title {
            @media (max-width: 575px) {
                @apply hidden;
            }
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[24px];
        }
        &__form {
            @apply flex flex-col gap-[24px];
            &:deep() {
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
                .date__space {
                    gap: 0 !important;
                }
                .date__label {
                    @apply mb-[10px];
                }
                label {
                    @apply font-[600] text-black;
                }
            }
            &-item {
                @apply grid grid-cols-1 gap-[14px];
                @screen lg {
                    @apply grid-cols-2;
                }
            }
            &-wrap {
                @apply flex flex-col gap-[18px];
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
