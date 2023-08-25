<template>
    <div class="work">
        <span class="work__title">{{ title }}</span>
        <div class="work__textContainer">
            <span class="work__text">
                {{ mailText }}
            </span>
        </div>

        <div class="work__upload">
            <Paragraphe>{{ uploadText1 }}</Paragraphe>
            <span class="work__textInfo">{{ uploadText2 }}</span> <br />
            <span class="work__textInfo">{{ uploadText3 }}</span>
            <UploadImage @uploadFileList="handleUpload" :typeImage="true" />
        </div>
        <div class="work__btnContainer">
            <!-- <Button typeButton="primary-cancel" @on-click="onCancel">{{
                btnTextCancel
            }}</Button> -->
            <Button @on-click="sendMail"
                ><LoadingButton size="xs" v-if="btnLoad" />{{
                    btnTextSend
                }}</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        title,
        mailText,
        uploadText1,
        uploadText2,
        uploadText3,
    } from './data';
    import { btnTextCancel, btnTextSend } from '../data';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref, watch } from 'vue';

    const props = defineProps({
        btnLoadingExpert: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits<{
        (event: 'handleUploadExpert', value: any): void;
        (event: 'sendMailExpert'): void;
        (event: 'onCancelMailExpert'): void;
    }>();

    const onCancel = () => {
        emit('onCancelMailExpert');
    };

    const sendMail = () => {
        emit('sendMailExpert');
    };

    const handleUpload = (value: any) => {
        console.log("value:", value)
        emit('handleUploadExpert', value[0]);
    };

    let btnLoad = ref<boolean>(props.btnLoadingExpert);
    watch(
        () => props.btnLoadingExpert,
        (value) => {
            btnLoad.value = value;
        },
        { immediate: true, deep: true }
    );
</script>

<style lang="scss" scoped>
    .work {
        &__title {
        }
        &__textContainer {
            border: 1px solid var(--color-stroke-gray);
            @apply rounded p-[10px] mt-[10px] mb-[18px];
        }

        &__text {
            color: var(--color-primary);
        }

        &__upload {
            @apply mt-[18px];
        }

        &__textInfo {
            @apply text-[12px];
        }

        &__btnContainer {
            @apply flex  gap-[14px];
        }
    }
</style>
