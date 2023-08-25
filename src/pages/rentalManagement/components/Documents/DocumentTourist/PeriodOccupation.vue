<template>
    <div class="periodOccupation__items-container">
        <div class="periodOccupation__items-wrap">
            <ContentValue
                v-if="startPeriod"
                label="Date du début du période"
                :value="startPeriod"
            >
                <Icon icon-name="CalendarDate" />
            </ContentValue>
            <ContentValue
                v-if="endPeriod"
                label="Date de fin du période"
                :value="endPeriod"
            >
                <Icon icon-name="CalendarDate" />
            </ContentValue>
        </div>
        <div class="periodOccupation__items">
            <label class="periodOccupation__label">Contrat</label>
            <div class="documents__files">
                <FilePreview :file-name="file.name" :file-path="file.path" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import FilePreview from '@/components/Display/FIlePreview/FilePreview.vue';
    import { ref } from 'vue';
    import ContentValue from '@/components/Display/ContentValue/ContentValue.vue';

    interface DocumentFiles {
        name: string;
        path: string;
    }

    const props = defineProps({
        startPeriod: {
            type: String,
            Default: '',
        },
        endPeriod: {
            type: String,
            Default: '',
        },
        documentFiles: {
            type: Object,
            default: {},
        },
    });

    const file = ref<DocumentFiles | any>(props.documentFiles);
</script>

<style lang="scss" scoped>
    .periodOccupation {
        &__items {
            @apply place-content-14px;
            label {
                @apply font-[600] text-secondary;
            }
        }
        &__items-container {
            @apply place-content-14px;
        }
        &__items-wrap {
            @apply place-content-14px;
            @screen sm {
                @apply flex-row;
            }
            @screen md {
                @apply flex-col;
            }
            @screen lg {
                @apply flex-row;
            }
        }
    }
</style>
