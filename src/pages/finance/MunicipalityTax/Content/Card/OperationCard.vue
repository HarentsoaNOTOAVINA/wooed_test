<template>
    <div class="card-operation">
        <div class="card-operation__title">
            <Title type="h4" :label="taxItem.title" />
            <Info v-if="taxItem.triggerEvent" size="xs" @click="isShowInfo = !isShowInfo" />
        </div>
        <div class="card-operation__body">
            <transition appear mode="out-in" name="fade-slide">
                <paragraphe v-if="isShowInfo" class="trigger-evt"
                    ><span class="flex items-center gap-x-[10px]"
                        ><u><i>Fait déclencheur:</i></u></span
                    >
                    <span class="text-[var(--color-primary)]"
                        >- {{ taxItem.triggerEvent }}</span
                    ></paragraphe
                >
            </transition>
            <Select
                @change-select="handleSelect"
                placeholder="Selectionnez"
                name="selectedValue"
                :options="optionsSelect"
                :disabled="isSelectedTax"
            />
            <paragraphe
                v-if="params"
                class="p-[10px] rounded-[8px] my-[10px] bg-gray"
                >{{ params['selectedValue'].title }} |
                <b>{{ params['selectedValue'].value }}</b>
                {{ params['selectedValue'].unit }}</paragraphe
            >
            <template v-if="unitsFound.length">
                <Input
                    v-for="(item, index) in unitsFound"
                    :key="index"
                    :placeholder="item"
                    :label="`Nombre (${item})`"
                    :name-input="item"
                    :disabled="isSelectedTax"
                    input-type="number"
                    @input="handleInput"
                />
            </template>
        </div>
        <div class="card-operation__footer">
            <a :href="taxItem.link" target="_blank"
                ><Button :type-button="'border'">Plus d'informations</Button></a
            >
            <Button
                :disabled="!(params && isAllowedToSelectTax)"
                type-button="secondary"
                :class="{ selected: isSelectedTax }"
                @click="selectTaxe"
            >
                <transition name="fade-selected" mode="out-in">
                    <span
                        v-if="isSelectedTax"
                        class="flex justify-center gap-[10px]"
                        ><Check size="xs" /> OK</span
                    >
                    <span v-else>Choisir</span>
                </transition>
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Info from '@/components/Icon/Info.vue';
    import Check from '@/components/Icon/Check.vue';
    import { computed, ref } from 'vue';
    import { notification } from 'ant-design-vue';
    import Input from '@/components/Common/Input/Input.vue';

    interface TypesTaxItem {
        id: number;
        title: string;
        type: string;
        triggerEvent: string;
        link: string;
        taxValues: [
            {
                id: number;
                title: string;
                value: number;
                unit: string;
            }
        ];
        selectedValue?: {
            id: number;
            title: string;
            value: number;
            unit: string;
        };
    }

    const props = defineProps<{
        taxItem: TypesTaxItem;
    }>();
    const emit = defineEmits<{ (fn: 'on-choose-tax', v: any): void }>();

    const selectedTax = ref<TypesTaxItem>();
    const optionsSelect = computed(() =>
        props.taxItem.taxValues.map((item) => ({
            label: item.title,
            value: JSON.stringify(item),
        }))
    );
    const params = ref<any>(null);
    const inputParams = ref<any>(null);
    const paramsAfterComputing = ref<any>(null);
    const unitsFound = ref<string[]>([]);
    const isAllowedToSelectTax = ref<boolean>(false);
    const isSelectedTax = ref<boolean>(false);
    const isShowInfo = ref<boolean>(false);

    function selectTaxe() {
        if (params.value && isAllowedToSelectTax.value) {
            isSelectedTax.value = !isSelectedTax.value;
            const objToAppend = paramsAfterComputing.value
                ? paramsAfterComputing.value
                : params.value;
            selectedTax.value = {
                title: props.taxItem.title,
                ...objToAppend,
            };
            emit('on-choose-tax', selectedTax.value);
        } else {
            notification.info({
                message: 'Vous devez choisir le tax',
            });
        }
    }

    function handleSelect(evt: any) {
        const [k, v] = Object.entries(evt)[0];
        params.value = {
            [k]: JSON.parse(v as string),
        };
        console.log(v);
        checkValuePerUnit(JSON.parse(v as string));
    }

    function handleInput(evt: any) {
        const [_, v] = Object.entries(evt)[0] as any;
        inputParams.value = {
            ...inputParams.value,
            ...evt,
        };
        console.log(Object.values(inputParams.value));

        /**
         * product of all input value (all existing units)
         */
        const productUnit = Object.values(inputParams.value)
            .map((item: any) => (item === '' ? 1 : +item))
            .reduce((cum, curr) => cum * curr, 1);
        paramsAfterComputing.value = {
            ...params.value,
            selectedValue: {
                ...params.value['selectedValue'],
                value: +params.value['selectedValue'].value * productUnit,
            },
        };

        /**
         * check if input match to units number
         */
        isAllowedToSelectTax.value =
            Object.values(inputParams.value).length === unitsFound.value.length;
        console.log(isAllowedToSelectTax.value, inputParams.value, 'nbr');
    }

    function checkValuePerUnit(v: {
        title: string;
        value: number;
        unit: string;
    }) {
        const rawUnit = v.unit
            .toLowerCase()
            .replaceAll('par ', '/')
            .replaceAll(' /', '/')
            .replaceAll('/ ', '/')
            .replaceAll(' / ', '/');
        /**
         * IN CASE CONDITION IS IN TITLE SECTION 
         */
        // const rawTitle = v.title
        //     .toLowerCase()
        //     .replaceAll('par ', '/')
        //     .replaceAll(' /', '/')
        //     .replaceAll('/ ', '/')
        //     .replaceAll(' / ', '/');
        if (rawUnit.includes('m²')) {
            unitsFound.value = ['m²'];
        } else {
            unitsFound.value = rawUnit.split('/').slice(1);
        }

        /**
         * NO ADDITIONAL PARAMS FOUND
         */
        if (!unitsFound.value.length) {
            isAllowedToSelectTax.value = true;
        }
    }
</script>
<style lang="scss" scoped>
    .card-operation {
        @apply w-full overflow-hidden rounded-[10px] border border-[var(--color-primary)] h-full flex flex-col justify-between;
        &__title {
            border-radius: 10px 10px 0px 0px;
            @apply px-[10px] py-[20px] bg-gray text-center flex flex-col justify-center items-center;
            &:deep() {
                h4 {
                    @apply font-semibold text-[var(--color-secondary)];
                }
                svg {
                    &:hover {
                        @apply cursor-pointer;
                    }
                }
            }
        }
        &__body,
        &__footer {
            @apply p-[10px];
        }
        &__body {
            .fade-slide-enter-active,
            .fade-slide-leave-active {
                @apply transition-all;
            }

            .fade-slide-enter-from,
            .fade-slide-leave-to {
                @apply translate-x-1/2;
            }
            &:deep() {
                .trigger-evt {
                    @apply py-[10px] border-b border-b-[var(--color-stroke-gray)] mb-[10px];
                }
            }
        }
        &__footer {
            @apply flex gap-[10px] flex-col;
            &:deep() {
                button {
                    @apply w-full transition-all;
                }
            }
            .selected {
                &:deep() {
                    button {
                        @apply bg-green;
                    }
                    path {
                        @apply fill-[#FFF];
                    }
                }
            }
            .fade-selected-enter-active,
            .fade-selected-leave-active {
                @apply transition-all;
            }

            .fade-selected-enter-from,
            .fade-selected-leave-to {
                @apply scale-0;
            }
        }
    }
</style>
