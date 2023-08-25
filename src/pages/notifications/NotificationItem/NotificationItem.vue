<template>
    <div
        class="notification__item"
        :class="{ 'notification__item--seen': notification.view }"
    >
        <div class="notification__item__desc">
            <div class="notification__item__desc__icon">
                <component :is="IconType"></component>
            </div>
            <div class="notification__item__desc__content">
                <div class="notification__item__desc__content__title">
                    <Title type="h5" :label="type" />
                    <Paragraphe
                        class="notification__item__desc__content__title__subtitle"
                        >{{ subtype }}</Paragraphe
                    >
                </div>
                <div class="notification__item__desc__content_msg">
                    <Paragraphe>{{ notification.message }}</Paragraphe>
                </div>
            </div>
        </div>
        <div class="notification__item__date">
            <span>{{ notification.created }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import House from '@/components/Icon/ProfilAccount/House.vue';
    import { computed, shallowRef, onMounted, watch } from 'vue';
    

    interface TypesNotification {
        created: string;
        id: number;
        message: string;
        subtype: string | null;
        thePropertyId: number | null;
        type: string;
        view: boolean;
    }

    const props = defineProps<{
        notification: TypesNotification;
    }>();

    const IconType = shallowRef<any>(null)

    const type = computed(() => standardType(props.notification.type));
    const subtype = computed(() =>
        standardSubtype(props.notification.subtype as string)
    );

    watch(props.notification ,(v) => {
        if (v) {
            IconType.value = House
        }
    }, {immediate: true})

    /**
     * ADD ADDITIONAL PARAMS ACCORDING TO DATA FROM BACK
     */
    function standardType(type: string) {
        switch (type) {
            case 'property':
                return 'Bien';
            default:
                return 'Notification';
        }
    }
    function standardSubtype(subtype: string) {
        switch (subtype) {
            case 'offer':
                return 'Offre';
            case 'counter_offer':
                return 'Contre-offre'
            default:
                return '';
        }
    }
</script>

<style lang="scss" scoped>
    .notification__item {
        @apply flex flex-col md:justify-between md:flex-row gap-y-[10px] p-[20px];
        background-color: #f7f7f7;
        &:not(:last-child) {
            border-bottom: 1px solid #fff;
        }
        &:hover {
            cursor: pointer;
        }
        &--seen {
            background-color: #fff;
            &:not(:last-child),
            &:is(:first-child) {
                border-bottom: 1px solid var(--color-gray);
            }
        }
        &__desc {
            @apply flex gap-[20px];
            &__content {
                @apply flex flex-col gap-[15px];
                &__title {
                    @apply flex flex-col gap-[10px];
                    &:deep() {
                        h5 {
                            font-weight: 600;
                            line-height: 14px;
                            font-size: 20px;
                        }
                    }
                    &__subtitle {
                        color: var(--color-stroke-gray);
                    }
                }
                &__msg {
                    &:deep() {
                        p {
                            color: var(--color-gray-icon);
                        }
                    }
                }
            }
        }
        &__date {
            span {
                @apply flex justify-end;
            }
            color: var(--color-stroke-gray);
        }
    }
</style>
