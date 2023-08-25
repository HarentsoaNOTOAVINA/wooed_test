<template>
    <div
        class="confirmation-detail"
        v-if="props.data.thepropertyFeatures || props.data.options"
    >
        <div
            class="confirmation-detail__container"
            v-if="
                props.data.thepropertyFeatures &&
                props.data.thepropertyFeatures.length
            "
        >
            <div
                class="confirmation-detail__level-container"
                v-for="(item, index) in props.data.thepropertyFeatures"
                :key="index"
            >
                <P class="confirmation-detail__title">Niveau {{ index + 1 }}</P>
                <div class="confirmation-detail__level">
                    <div
                        class="confirmation-detail__level-card"
                        v-for="(itemLevel, indexLevel) in item.features"
                        :key="indexLevel"
                    >
                        <div class="absolute right-2 top-2">
                            <a-popover placement="bottomLeft">
                                <Energy />
                                <template #title>
                                    <span>{{ itemLevel.name }}</span>
                                </template>
                                <template #content>
                                    <P>{{ itemLevel.wall }}</P>
                                </template>
                            </a-popover>
                        </div>
                        <div class="flex justify-center items-center">
                            <i
                                :class="
                                    getDetails(
                                        itemLevel.feature,
                                        features.data
                                    )['icon']
                                "
                            />
                            <span class="confirmation-detail__text">{{
                                getDetails(itemLevel.feature, features.data)[
                                    'name'
                                ]
                            }}</span>
                        </div>
                    </div>
                </div>
                <hr class="confirmation-detail__divider" />
            </div>
        </div>

        <div class="confirmation-detail__container" v-if="props.data.options">
            <P class="confirmation-detail__title">Autres options</P>
            <div class="confirmation-detail__options-container">
                <div
                    class="confirmation-detail__level-card"
                    v-for="(itemOption, indexOptions) in props.data.options"
                    :key="indexOptions"
                >
                    <i
                        :class="
                            getDetails(itemOption.optionId, options.data)[
                                'icon'
                            ]
                        "
                    />
                    <span class="confirmation-detail__text">{{
                        getDetails(itemOption.optionId, options.data)['name']
                    }}</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <Empty
            description="Aucun élément"
        />
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Energy from '@/components/Icon/Energy.vue';
    import APopover from 'ant-design-vue/lib/popover';
    import { Empty } from 'ant-design-vue';

    const props = defineProps({
        data: {
            type: Object,
            default: () => {},
        },
    });

    const store = useStore();
    const features = computed(
        () => store.getters['AddProductModule/getFeatures']
    );
    const options = computed(
        () => store.getters['AddProductModule/getOptions']
    );

    function getDetails(id: number, data: Array<any>) {
        return data.find((item) => item.id === id);
    }
</script>

<style lang="scss" scoped>
    .confirmation-detail {
        @apply flex flex-col gap-[10px] p-[10px];
        &__container {
            background-color: var(--color-gray);
            @apply p-[10px] rounded-[8px] flex flex-col gap-[20px];
        }

        &__level-container {
            @apply flex flex-col gap-[20px];
        }

        &__level {
            @apply flex gap-[18px] flex-wrap;
        }

        &__level-card {
            @apply bg-white rounded-[4px] h-[72px] w-[110px] cursor-pointer relative  flex justify-center items-center;
            border: 0.5px solid #14223c;
        }

        &__level-item {
            @apply flex flex-col justify-center items-center;
        }

        &__options {
            @apply flex flex-col justify-center items-center;
        }

        &__divider {
            @apply text-white;
        }

        &__title {
            @apply font-semibold;
        }

        &__text {
            @apply text-slate-400;
        }

        &__options-container {
            @apply flex gap-[18px] flex-wrap;
        }
    }
</style>
