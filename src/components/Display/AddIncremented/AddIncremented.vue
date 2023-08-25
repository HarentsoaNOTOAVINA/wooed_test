<template>
    <div class="addIncremented">
        <label v-if="label" class="addIncremented__title">
            <span> {{ label }} </span>
        </label>
        <div class="addIncremented__container">
            <template v-for="(item, index) in itemsData" :key="item.id">
                <div class="addIncremented__form">
                    <Input
                        v-if="incrementType === 'input'"
                        :placeholder="placeholder"
                        :name-input="(name ? name : 'input') + index"
                        :inputType="inputType"
                    />
                    <InputDate
                        v-else-if="incrementType === 'inputDate'"
                        :placeholder="placeholder ? placeholder : newDate"
                        :name="(name ? name : 'inputDate') + index"
                    />
                    <Select
                        v-else-if="incrementType === 'select'"
                        :name="(name ? name : 'select') + index"
                        :placeholder="placeholder ? placeholder : 'Select'"
                        :options="selectData"
                    />
                    <TimePicker
                        v-else-if="incrementType === 'timePicker'"
                        :placeholder="placeholder ? placeholder : '00:00:00'"
                        :name="(name ? name : 'timePicker') + index"
                    />
                    <div class="agenda__elements" v-else-if="incrementType === 'agenda'">
                        <InputDate
                            class="agenda__date"
                            :placeholder="placeholder ? placeholder : newDate"
                            :name="`inputDate${item.id}`"
                            @handle-date-format-en="handleChange"
                        />
                        <TimePicker
                            class="agenda__time"
                            :placeholder="placeholder ? placeholder : '00:00:00'"
                            :name="`timePicker${item.id}`"
                            @change="handleChange"
                        />
                    </div>
                    <slot v-else name="increment" />
                    <button v-if="index === 0" class="addIncremented__btn" @click="handleAdd">
                        <Icon icon-name="AddIcon" />
                    </button>
                    <button v-else
                        class="addIncremented__btn"
                        @click="deleteItem(item.id)"
                    >
                        <Icon icon-name="deleteRoudedBG" />
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
import { fieldList } from '@/pages/Environment/components/register/data';
    import { ref, PropType, onMounted } from 'vue';

    interface ItemsData {
        id?: number | string;
        name?: string | any;
    }

    const numberDefault = ref<number>(0);
    const itemsData = ref<ItemsData[]>([]);

    const emit = defineEmits(["change", "remove"]);

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        incrementType: {
            type: String as PropType<
                'default' | 'input' | 'inputDate' | 'select' | 'timePicker' | 'agenda'
            >,
            default: 'default',
        },
        inputType: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        selectData: {
            type: Array<object>,
            default: [],
        },
    });

    const newDate = new Date().toLocaleDateString();

    onMounted(() => itemsData.value = [{ id: numberDefault.value, name: `field_${numberDefault.value}`}])

    function handleAdd() {
        numberDefault.value = numberDefault.value + 1
        itemsData.value = [ ...itemsData.value, { id: `${numberDefault.value}`, name: `field_${numberDefault.value}` } ];
    }

    function handleChange(value: any) {
        emit('change', value);
    }

    function deleteItem(id: any) {
        itemsData.value = itemsData.value.filter((item: any) => {
            return item.id !== id;
        });
        emit('remove', { [props.name]: id });
    }

</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .addIncremented {
        @apply flex flex-col gap-[10px];
        &__title {
            @apply font-[600];
        }
        &__container {
            @apply flex flex-col gap-[14px];
        }
        &__form {
            @apply w-full flex items-center gap-[14px];
        }
        &__btn {
            @apply h-[22px] w-[22px] flex justify-center items-center rounded-full bg-gray;
            @include hoverButtonDark;
        }
        .agenda__elements {
            @apply flex flex-col gap-2;
            @screen md {
                @apply flex-row items-end;
            }
            
            .agenda {
                &__date {
                    @apply w-full;
                    @screen md {
                        @apply w-2/3;
                    }
                }

                &__time {
                    @apply w-full;
                    @screen md {
                        @apply w-1/3;
                    }
                }
            }
        }
        &:deep() {
            .addIncremented__form {
                div {
                    @apply w-full;
                }
                & > div {
                    width: calc(100% - 36px);
                }
            }
            .custom-input__fields {
                @apply mb-0;
            }
            .custom-select__wrapper {
                @apply mb-0;
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
