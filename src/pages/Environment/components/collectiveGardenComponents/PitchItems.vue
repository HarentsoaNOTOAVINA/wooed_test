<template>
    <div class="pitch__items">
        <div class="pitch__map--item">
            <Map idMap="pitch" />
        </div>
        <div class="pitch__wrap">
            <template v-for="(item, index) in itemsData" :key="index">
                <CardWrapper class="pitch__wrap-item">
                    <Title type="h4" :label="item.title" class="pitch__title" />
                    <hr class="__hr" />
                    <div class="pitch__checkbox">
                        <RadioGroup 
                            name-input="choosenGarden"
                            @select-option="setValue"
                            :options="item.checkBoxData"
                        />
                    </div>
                </CardWrapper>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
import RadioGroup from '@/pages/Environment/components/RadioGroup.vue';
import Title from '@/components/Common/Title/Title.vue';
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import Map from '@/components/section/map/index.vue';

import { PropType } from 'vue';

interface CheckBoxData {
    labelTitle: string;
    name: string;
    labelName: string;
}

interface IElementData {
    title: string;
    value: string;
    checkBoxData: CheckBoxData[];
}

const emit = defineEmits(["set-value"])

const props = defineProps({
    itemsData: {
        type: Array as PropType<IElementData[]>,
        default: [],
    },
});

function setValue(value: any) {
    emit("set-value", value);
}
</script>

<style lang="scss" scoped>
.pitch {
    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__items {
        @apply flex flex-col gap-[14px];
    }

    &__map {
        &--item {
            max-height: 179px;
            @apply h-[179px] w-full;

            @screen sm {
                max-height: 300px;
                @apply h-[300px];
            }

            @screen md {
                max-height: calc(100vh - 275px);
                @apply h-[325px];
            }
        }
    }

    &__wrap {
        @apply grid grid-cols-1 gap-[14px];

        @screen sm {
            @apply grid-cols-2;
        }

        @screen md {
            @apply grid-cols-1;
        }

        @screen lg {
            @apply grid-cols-2;
        }

        &-item {
            @apply flex flex-col gap-[18px];
        }
    }

    &__checkbox {
        @apply flex flex-col gap-[10px];

        &-content {
            @apply flex flex-col;
        }

        &:deep() {
            .checkbox__container {
                .ant-checkbox-wrapper {
                    @apply items-center;
                }

                span {
                    @apply text-black font-[400];
                }

                .label-name {
                    @apply font-[300];
                }
            }
        }
    }
}

.__hr {
    @apply text-gray w-full;
}
</style>
