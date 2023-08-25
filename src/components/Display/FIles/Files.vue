<template>
    <a-upload v-model:file-list="filesList" name="file" class="files">
        <template #itemRender="{ file, actions }">
            <div v-if="simpleFile" class="files__container">
                <a
                    href="javascript:;"
                    @click="actions.download"
                    class="files__download"
                    title=""
                >
                    <Icon :icon-name="iconFiles" />
                    <span class="files__button">{{ file.name }}</span>
                </a>
            </div>
            <div v-else class="files__container">
                <span class="files__label">{{ file.name }}</span>
                <a
                    href="javascript:;"
                    @click="actions.download"
                    class="files__download"
                    title="Télécharger"
                >
                    <Icon :icon-name="iconFiles" />
                    <span class="files__button">Télécharger</span>
                </a>
            </div>
        </template>
    </a-upload>
</template>
<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Upload as AUpload } from 'ant-design-vue';
    import { ref } from 'vue';

    const props = defineProps({
        simpleFile: {
            type: Boolean,
            default: false,
        },
        iconFiles: {
            type: String,
            default: 'AdobeReaderIcon'

        }
    });

    const filesList = ref<any>();
</script>
<style lang="scss" scoped>
    .files {
        &__container {
            @apply flex flex-col gap-[8px] w-max;
        }
        &__label {
            @apply text-[12px] font-[300] text-grayIcon;
        }
        &__download {
            @apply flex items-center gap-[8px] w-max text-secondary;
            &:hover {
                @apply text-primary;
            }
        }
        &__button {
            @apply text-[12px] font-[600];
        }
        &:deep() {
            .icon {
                svg {
                    @apply w-[18px] h-[18px];
                }
            }
            .ant-upload-list {
                @apply flex flex-col gap-[8px];
            }
        }
    }
</style>
