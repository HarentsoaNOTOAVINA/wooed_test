<template>
    <div class="add-connection">
        <div class="add-connection__file">
            <UploadImage
                @upload="($event) => handleUpload($event, 'files')"
                name="file"
                :needBase64="false"
            />
        </div>
        <Button type-button="primary" @click="handleAddConnection"
            ><LoadingButton v-if="isLoadSubmitBill" size="xs" />Enregistrer
        </Button>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import SupplierServices from '@/services/supplierService';
    import { ref } from 'vue';
    import { notification } from 'ant-design-vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    const route = useRoute();
    const store = useStore();

    const params = ref<any>({
        theProperty: route.params.id,
        files: [],
        energyType: store.getters['SupplierModule/getEnergyType'],
    });

    const isLoadSubmitBill = ref<boolean>(false);

    function handleUpload(pdf: any, name: string) {
        params.value = {
            ...params.value,
            [name]: pdf,
        };
    }

    async function handleAddConnection() {
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
                // emit('on-get-document-result', true);
                return;
            }
            // emit('on-get-document-result', true);
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
    .add-connection {
        @apply flex flex-col gap-[18px] items-end;
        &__file {
            width: 100%;
        }
    }
</style>
