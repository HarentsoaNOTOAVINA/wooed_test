<template>
    <Paragraphe
        class="content"
        >{{ costWork }} €
        <template v-if="!hasSelectedWork || (hasSelectedWork && !isActiveWork)">
            <Button
                type-button="border"
                class="button"
                @click="
                    $emit('on-chose-work', {
                        costWork,
                        caracteristicWork,
                        idx,
                    })
                "
                ><LoadingButton
                    theme="dark"
                    size="xs"
                    v-if="isLoadWork && isActiveWork"
                /><Download
                    v-if="
                        (hasSelectedWork && !isActiveWork) || !hasSelectedWork
                    "
                />
            </Button>
        </template>
        <Check size="xs" v-if="hasSelectedWork && isActiveWork" />
    </Paragraphe>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Check from '@/components/Icon/Check.vue';
    import Download from '@/components/Icon/Download.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    defineProps<{
        costWork: string;
        isActiveWork: boolean;
        hasSelectedWork: boolean;
        caracteristicWork: string;
        idx?: number;
        isLoadWork: boolean;
    }>();
</script>
<style lang="scss" scoped>
    @import '@/assets/style/supplier.scss';
    .content {
        .button {
            @apply flex justify-center items-center;
        }
        @apply flex flex-col items-center;
    }
</style>
