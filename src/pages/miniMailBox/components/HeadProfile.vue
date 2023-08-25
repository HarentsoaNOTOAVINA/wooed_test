<template>
    <div class="headProfile" v-if="dataProfile">
        <!-- <avatar src="https://i.pravatar.cc/300" :size="40" /> -->
        <div class="headProfile__wrap">
            <div class="headProfile__content">
                <Title
                    type="h4"
                    :label="dataProfile.subject"
                    weight="bold"
                    class="headProfile__title"
                />
                <span class="flex flex-col items-end">
                    <span class="headProfile__date">
                        {{ moment(dataProfile.updated).format('DD/MM/YYYY') }}
                    </span>
                    <span class="headProfile__date">
                        {{ moment(dataProfile.updated).format('HH:mm') }}
                    </span>
                </span>
            </div>
            <span v-if="dataProfile.type === 'RECEIVED'">
                De: {{ dataProfile.mailFromName && dataProfile.mailFromName }}
            </span>
            <span v-else> À: {{ dataProfile.emailTo }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import avatar from 'ant-design-vue/lib/avatar';
    import moment from 'moment';

    const props = defineProps({
        // sourceImage: {
        //     type: String,
        //     default: '',
        // },
        dataProfile: {
            type: Object,
        },
        // nameLabel: {
        //     type: String,
        //     default: '',
        // },
        // dateLabel: {
        //     type: String,
        //     default: '',
        // },
        // hourLabel: {
        //     type: String,
        //     default: '',
        // },
        // functionLabel: {
        //     type: String,
        //     default: '',
        // },
    });
</script>

<style lang="scss" scoped>
    .headProfile {
        @apply flex gap-[25px];
        &__wrap {
            width: calc(100% - 44px);
            @apply text-grayBlack text-[12px] italic w-full;
        }
        &__title {
            @apply text-[18px] not-italic;
        }
        &__content {
            @apply flex justify-between gap-[25px] w-full;
        }
        &__date {
            @apply block text-[12px] italic mt-[5px];
        }
        &:deep() {
            .ant-avatar-image {
                @apply bg-strokeGray;
            }
        }
    }
</style>
