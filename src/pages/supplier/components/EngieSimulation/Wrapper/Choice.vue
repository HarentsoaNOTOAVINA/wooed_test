<template>
    <wrapper :hasRefresh="true" :title="title" @on-back="$emit('on-back')">
        <div class="choice-main">
            <div class="choice-list" v-if="type === 'classic'">
                <div
                    v-for="(choice, index) in choices"
                    :key="index"
                    class="choice-item"
                >
                    <div
                        @click="$emit('on-get-choice', choice)"
                        class="choice-item__icon"
                    >
                        <Icon :icon-name="(icon as any)[index]" />
                    </div>
                    <div class="choice-item__desc">
                        <span>{{ choice }}</span>
                        <div v-if="label">
                            <hr />
                            <Paragraphe class="choice-item__desc-info">
                                {{ label[index] }}
                            </Paragraphe>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-[20px] transition-all" v-if="hasExclusiveNight">
                <transition name="fade-appear" mode="out-in" appear>
                    <div v-if="displayExclusifInfo">
                        <Info
                            @click="displayExclusifInfo = !displayExclusifInfo"
                            class="hover:cursor-pointer"
                        />
                        <Paragraphe
                            >Un compteur exclusif nuit est un compteur séparé
                            qui alimente certains appareils électriques en
                            électricité durant la nuit (comme des appareils de
                            chauffage par accumulation ou des boilers
                            électriques). Un compteur exclusif nuit est toujours
                            combiné à un compteur normal ou un compteur
                            bihoraire.</Paragraphe
                        >
                        <hr class="my-[10px]" />
                    </div>
                </transition>
                <div class="flex gap-[10px] items-center">
                    <Info
                        v-if="!displayExclusifInfo"
                        @click="displayExclusifInfo = !displayExclusifInfo"
                        class="hover:cursor-pointer"
                    />
                    <Switch
                        name="tarifNuit"
                        item-label="J'ai également un compteur exclusif nuit"
                        @handle-switch="handleSwitch"
                    />
                </div>
            </div>
        </div>
        <div class="choice-list choice-input" v-if="type === 'simple-input'">
            <Input
                v-if="isSolarPannel"
                input-type="number"
                label="Panneaux solaires"
                placeholder="Nombre de kVA"
                :icon-field="true"
                icon-name-field="ArrowBack"
                @on-click-icon="handleSingleInput"
                @input="handleInput"
                name-input="solarPannel"
            />
            <div class="w-full" v-else>
                <div
                    v-for="(input, index) in inputList"
                    :key="index"
                    class="flex flex-col w-full items-center justify-center"
                >
                    <Input
                        v-if="input.active"
                        input-type="number"
                        :label="input.label"
                        :placeholder="input.placeholder"
                        :name-input="input.name"
                        @input="handleInput"
                    />
                    <Button
                        :disabled="!checkMultipleInputValidation"
                        @click="
                            checkMultipleInputValidation
                                ? handleMultipleInput()
                                : () => {}
                        "
                        class="flex justify-end w-1/2 mt-[20px]"
                        v-if="index === inputList.length - 1"
                        type-button="border"
                        >Suivant <Icon icon-name="ArrowBack"
                    /></Button>
                </div>
            </div>
        </div>
    </wrapper>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Wrapper from './Wrapper.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { ref, onMounted, computed } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Info from '@/components/Icon/Info.vue';
    import Button from '@/components/Common/Button/Button.vue';

    const props = defineProps<{
        title: string;
        choices?: string[];
        icon?: string[];
        desc?: string[];
        label?: string[];
        wrapperType?: string;
        inputLabel?: string[];
        inputTitle?: string[];
        params?: any;
        isSolarPannel?: boolean;
        hasExclusiveNight?: boolean;
        hasNotRefresh?: boolean;
    }>();

    const emit = defineEmits<{
        (fn: 'on-get-choice', v: any): void;
        (fn: 'on-handle-switch', v: any): void;
    }>();

    const type = ref<string>('');
    const solarPannelValue = ref<number>(0);
    const displayExclusifInfo = ref<boolean>(false);
    const inputList = ref<any[]>([
        {
            label: 'ÉLECTRICITÉ (Normal)',
            name: 'electricite',
            placeholder: 'Normal (kWh)',
            active: false,
        },
        {
            label: 'ÉLECTRICITÉ (Creuse)',
            name: 'electriciteCreuse',
            placeholder: 'Creuse (kWh)',
            active: false,
        },
        {
            label: 'GAZ',
            name: 'gaz',
            placeholder: 'Normal (kWh)',
            active: false,
        },
    ]);
    const inputListValue = ref<any>({});

    onMounted(() => {
        if (props.wrapperType) {
            type.value = props.wrapperType;
            handleConditionnalStep();
        } else {
            type.value = 'classic';
        }
    });

    const checkMultipleInputValidation = computed(() => {
        let isValidate = false;
        const isActiveInputLength = inputList.value.filter(
            (item) => item.active
        ).length;
        if (
            isActiveInputLength === Object.values(inputListValue.value).length
        ) {
            isValidate = Object.values(inputListValue.value).every((v) => !!v);
        }
        return isValidate;
    });

    function handleInput(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        if (k === 'solarPannel') {
            solarPannelValue.value = v;
        } else {
            inputListValue.value = {
                ...inputListValue.value,
                ...obj,
            };
        }
    }
    function handleSingleInput() {
        solarPannelValue.value && emit('on-get-choice', solarPannelValue.value);
    }
    function handleMultipleInput() {
        emit('on-get-choice', inputListValue.value);
    }

    function handleSwitch(obj: any) {
        const [k, v] = Object.entries(obj)[0];
        emit('on-handle-switch', { [k]: v ? 'Oui' : 'Non' });
    }

    function handleConditionnalStep() {
        const equipement = props.params['equipement'];
        const counterType = props.params['typeCompteur'];
        if (equipement === 'Gaz') {
            inputList.value = assignArrayValue(inputList.value, 'gaz');
        } else if (equipement === 'Électricité') {
            inputList.value = assignArrayValue(inputList.value, 'electricite');
            if (counterType === 'Bihoraire') {
                inputList.value = assignArrayValue(
                    inputList.value,
                    'electriciteCreuse'
                );
            }
        } else if (equipement === 'Électricité et Gaz') {
            inputList.value = assignArrayValue(inputList.value, 'electricite');
            inputList.value = assignArrayValue(inputList.value, 'gaz');
            if (counterType === 'Bihoraire') {
                inputList.value = assignArrayValue(
                    inputList.value,
                    'electriciteCreuse'
                );
            }
        }
    }

    function assignArrayValue(arr: any[], condition: string) {
        return [
            ...arr.map((item) => {
                if (item.name === condition) {
                    return {
                        ...item,
                        active: true,
                    };
                } else {
                    return item;
                }
            }),
        ];
    }
</script>
<style lang="scss" scoped>
    .fade-appear-enter-active,
    .fade-appear-leave-active {
        @apply transition-all;
    }
    .fade-appear-enter-from,
    .fade-appear-leave-to {
        @apply translate-y-[-100px] opacity-0;
    }
    .wrapper-card {
        @apply rounded-[20px] w-full;
        min-height: calc(100vh - 62px - 40px);
        &__header {
            @apply p-[20px] bg-[#fafafa] flex justify-between items-center;
            border-radius: 20px 20px 0 0;
            &:deep() {
                button {
                    @apply flex items-center;
                }
            }
            &__title {
                @apply text-secondary text-[22px];
            }
        }
        &__body {
            @apply md:p-[30px] p-[10px] bg-red md:min-h-[784px] flex justify-center items-center;
            hr {
                @apply text-[var(--color-stroke-gray)];
            }
            .input-list {
                @apply w-full flex justify-center;
            }
            .choice {
                &-main {
                    @apply flex flex-col items-center gap-[50px];
                }
                &-input {
                    &:deep() {
                        .custom-input__fields {
                            @apply w-full md:w-1/2;
                        }
                        input {
                            @apply h-[55px] text-[18px];
                        }
                        .icon {
                            @apply p-[15px] m-[-15px];
                            &:hover {
                                @apply cursor-pointer;
                            }
                        }
                        svg {
                            @apply transform rotate-180 h-[20px] w-[20px];
                        }
                    }
                }
                &-item {
                    @apply flex flex-col justify-center gap-[20px] w-full md:px-0 px-[20px] md:w-[200px] items-center;
                    &__icon {
                        .icon {
                            @apply transition-all;
                        }
                        @apply bg-primary h-[100px] w-[100px] flex justify-center items-center rounded-[50%] hover:cursor-pointer;
                        &:hover .icon {
                            @apply scale-[1.2];
                        }
                    }
                    &__desc {
                        @apply flex justify-center flex-col items-center;
                        span {
                            @apply font-semibold text-[20px] text-secondary uppercase;
                        }
                        &-info {
                            @apply text-[var(--color-gray-icon)];
                        }
                    }
                    &:deep() {
                        svg {
                            @apply w-[50px] h-[50px] transition-all;
                            path {
                                @apply fill-white;
                            }
                        }
                    }
                }
                &-list {
                    @apply w-full flex flex-row flex-wrap  gap-[50px] justify-center items-baseline;
                }
            }
        }
    }
</style>
