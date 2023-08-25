<template>
    <div class="work">
        <Paragraphe fontSize="16px">{{ info }}</Paragraphe>
        <UploadImage @uploadFileList="handleUpload" />
        <div class="work__btnContainer">
            <Button
                @on-click="emit('closeModalSaveDoc')"
                typeButton="primary-cancel"
                >{{ btnTextCancel }}</Button
            >
            <Button @on-click="saveDoc"
                ><LoadingButton size="xs" v-if="btnLoad" />{{
                    btnTextSend
                }}</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { btnTextCancel, btnTextSend } from '../data';
    import { info } from './data';
    import { Store, useStore } from 'vuex';
    import { createFormData } from '@/utils/formdata/formData';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { computed, ref } from 'vue';

    const store: Store<any> = useStore();
    const docToSave = ref<any>();
    let btnLoad = ref<boolean>(false);

    const emit = defineEmits(['closeModalSaveDoc']);

    const saveDoc = async () => {
        btnLoad.value = true;
        let req = createFormData(docToSave.value);
        console.log('req:', req);
        try {
            await store.dispatch('WorksModule/setSaveWork', req);
            const data = computed(
                () => store.getters['WorksModule/getSaveWork']
            );
            let status = data.value.data.code;
            if (status === 200) {
                notification['success']({
                    message: 'Votre document a bien été enregistrer',
                });
                btnLoad.value = false;
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoad.value = false;
        }
        emit('closeModalSaveDoc');
    };

    const handleUpload = (value: any) => {
        docToSave.value = value;
        console.log('uuuup', docToSave.value);
    };
</script>

<style lang="scss" scoped>
    .work {
        @apply flex flex-col gap-[14px];

        &__btnContainer {
            @apply flex justify-end gap-[14px];
        }
    }
</style>
