<template>
    <div>
        <MainCard
            :button="true"
            labelButton="Enregistrer"
            :dataBreadcrumbs="breadcrumbListsData"
            :disable-submit-button="false"
            class="register"
            :borderBottom="true"
            @on-click="handleSaveData"
        >
            <div class="register__container">
                <div
                    v-for="(field, key) in fieldList"
                    :key="key"
                    class="register__form-upload"
                >
                    <label>
                        <span class="font-[600]">
                            {{ field.label }}
                        </span>
                    </label>
                    <UploadImage
                        :name="field.name"
                        :needBase64="false"
                        :type-image="false"
                        @upload-single-with-name="uploadHandler"
                    />
                </div>

                <div class="register__form">
                    <Title
                        type="h2"
                        label="Modifications des installations"
                        class="register__form-title"
                    />
                    <form method="post" class="register__form-wrap">
                        <Input
                            label="Nr de la modification"
                            name-input="number"
                        />
                        <Input
                            label="Objet de la modification"
                            name-input="object"
                        />
                        <InputDate
                            label="Date de fin de chantier"
                            placeholder="10/12/22"
                            name="endDate"
                        />
                        <div class="register__form-upload">
                            <label>
                                <span class="font-[600]"> Documents </span>
                            </label>
                            <UploadImage name="document" :needBase64="false" />
                        </div>
                        <Button> Envoyer </Button>
                    </form>
                </div>
                <div class="register__form-upload">
                    <label>
                        <span class="font-[600]">
                            Envoyer une copie du Registre
                        </span>
                    </label>
                    <UploadImage 
                        name="copie du Registre"
                        :needBase64="false"
                        @upload-single-with-name="uploadHandler"
                    />
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import { fieldList } from './data';
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { createFormData } from '@/utils/formdata/formData';
import { notification } from 'ant-design-vue';
    import { useStore } from 'vuex';
    import {useRouter, useRoute} from "vue-router";

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const breadcrumbListsData = [
        {
            label: 'Registre',
        },
    ];
    interface payloadType {
        register : {[key : string] : any}[];
    }
    let payload : payloadType = {register : []};
    function uploadHandler($event: { [key: string]: any }) {
        payload.register.push( {
            label : Object.keys($event)[0],
            file : Object.values($event)[0]
        });
    }
    function callback(){
        notification.success({message : "Les documents ont bien été enregistrer"})        
        router.push({name : "environment-detail"});
    }
    function handleSaveData(){
        
        const result = createFormData(payload);
        store.dispatch("EnvironmentModule/postRegisterData", {payload : result, callback});
    }
</script>

<style lang="scss" scoped>
    .register {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
        }
        &__form-upload {
            @apply flex flex-col gap-[10px];
        }
        &__form {
            @apply flex flex-col gap-[18px];
            &-title {
                @apply text-grayIcon font-[600] text-[16px];
            }
            &-wrap {
                @apply flex flex-col gap-[18px] ml-[20px] relative pl-[20px];
                &:before {
                    content: '';
                    @apply absolute top-0 left-0 w-[1px] h-full bg-gray;
                }
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
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
