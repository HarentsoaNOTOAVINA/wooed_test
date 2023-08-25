<template>
    <div class="file">
        <Alert
            >Le nombre de certificat que vous allez inseré definira le nombre
            effectif</Alert
        >
        <label class="font-semibold text-grayIcon mb-[10px] mt-[10px] block"
            >Certificat (en forme pdf) *</label
        >
        <UploadImage
            name="files"
            @uploadWithName="
                ($event) => {
                    $emit('on-input', $event);
                }
            "
            :type-image="false"
        />
        <div class="file-expected">
            <span>Revenus générés</span>
            <strong>{{generalIncome}}</strong>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';

    defineProps<{
        generalIncome: string | number
    }>();
</script>
<style lang="scss" scoped>
    .file {
        &-expected {
            @apply w-full flex items-center justify-between p-[10px] rounded-[8px] bg-strokeGray mb-[10px];
        }
        &:deep() {
            .ant-upload-select {
                @apply w-full;
            }
        }
    }
</style>
