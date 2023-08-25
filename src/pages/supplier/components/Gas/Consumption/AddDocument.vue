<template>
    <div class="addDocument">
        <Paragraphe class="text-grayIcon" v-if="energyType === 'GAZ'">
            Ma rue est bien raccordée au gaz de la ville
        </Paragraphe>
        <Paragraphe class="text-grayIcon" v-if="energyType === 'electricity'">
            Ma rue est bien raccordée à l'électricité de la ville
        </Paragraphe>
        <div class="addDocument__items">
            <SupplierName />
            <div class="addDocument__form-upload">
                <label>
                    <span class="font-[600]">
                        Ajouter un document justificatif venant de votre
                        fournisseur
                    </span>
                </label>
                <UploadImage
                    @upload="($event) => handlePdf($event, 'files')"
                    name="file"
                    :needBase64="false"
                />
                <div class="addDocument__operation">
                    <Button
                        :disabled="!isAllowSubmit"
                        @click="submitDocumentProof"
                        class="addDocument__operation__btn"
                        ><LoadingButton v-if="isLoadSubmitBill" size="xs" />
                        Soumettre le document</Button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import SupplierName from '../../SupplierNameInfo.vue';
    import SupplierServices from '@/services/supplierService';
    import { ref, watch } from 'vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from 'ant-design-vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const emit = defineEmits<{
        (fn: 'on-get-document-result', v: boolean): void;
    }>();

    const props = defineProps<{
        energyType: string;
    }>();

    const isAllowSubmit = ref<boolean>(false);
    const params = ref<any>({
        theProperty: route.params.id,
        energyType: props.energyType,
    });

    const isLoadSubmitBill = ref<boolean>(false);

    watch(
        () => params.value,
        (v) => {
            isAllowSubmit.value = !!v.files && v.files.length;
        },
        { immediate: true, deep: true }
    );

    function handlePdf(pdf: any, name: string) {
        params.value = {
            ...params.value,
            [name]: pdf,
        };
    }

    async function submitDocumentProof() {
        isLoadSubmitBill.value = true;
        try {
            const formData = new FormData();
            Object.keys(params.value).forEach((key) => {
                if (Array.isArray(params.value[key])) {
                    (params.value[key] as any[]).forEach((file, fileIdx) => {
                        console.log(file);
                        formData.append(
                            `${key}[${fileIdx}]`,
                            file.originFileObj
                        );
                    });
                } else {
                    formData.append(key, params.value[key]);
                }
            });
            const { data } = await SupplierServices.postSupplierDocProof(
                formData
            );
            const { code } = data;
            if (code !== 200 && code !== 201) {
                console.error('error', code);
                notification.error({
                    message: 'Une erreur est survenue. Veuillez réessayez',
                });
                emit('on-get-document-result', true);
                return;
            }
            emit('on-get-document-result', true);
        } catch (error) {
            notification.error({
                message: 'Une erreur est survenue. Veuillez réessayez',
            });
        } finally {
            isLoadSubmitBill.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .addDocument {
        @apply flex flex-col gap-[18px];
        &__items {
            @apply flex flex-col gap-[18px];
        }
        &__form-upload {
            @apply flex flex-col gap-[18px];
            &:deep() {
                .ant-upload-select {
                    @apply w-full;
                }
            }
        }
        &__operation {
            @apply flex justify-end;
            &:deep {
                button,
                div {
                    @apply w-full;
                }
                div {
                    @apply md:w-auto;
                }
            }
        }
    }
</style>
