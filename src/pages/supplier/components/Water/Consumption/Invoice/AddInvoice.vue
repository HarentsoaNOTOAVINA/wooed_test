<template>
    <div class="add-invoice">
        <div class="add-invoice__file">
            <UploadImage
                name="invoice"
                :needBase64="false"
                @upload="handleFiles"
            />
        </div>
        <Button
            type-button="primary"
            @click="handleAddInvoice"
            :disabled="!isEnableSubmit"
            ><LoadingButton v-if="isLoadSubmitInvoice" size="xs" />Enregistrer
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
        energyType: store.getters['SupplierModule/getEnergyType'],
    });

    const emit = defineEmits(['getIncommingInvoice']);

    const isLoadSubmitInvoice = ref<boolean>(false);
    const isEnableSubmit = ref<boolean>(false);
    const incomingInvoice = ref<any>(null);

    function handleFiles(fileList: any[]) {
        params.value = {
            ...params.value,
            files: fileList,
        };
        isEnableSubmit.value = !!fileList.length;
    }

    async function handleAddInvoice() {
        isLoadSubmitInvoice.value = true;
        const formData = new FormData();
        try {
            Object.keys(params.value).forEach((key) => {
                if (key === 'files') {
                    params.value[key].forEach((file: any, index: number) => {
                        formData.append(`files[${index}]`, file.originFileObj);
                    });
                } else {
                    formData.append(key, params.value[key]);
                }
            });
            const { data } = await SupplierServices.postBill(formData);
            incomingInvoice.value = data.data;
            emit('getIncommingInvoice', incomingInvoice.value);
            notification.success({
                message: 'Votre facture a été enregistré',
            });
        } finally {
            isLoadSubmitInvoice.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .add-invoice {
        @apply flex flex-col gap-[18px] items-end;
        &__file {
            width: 100%;
        }
    }
</style>
