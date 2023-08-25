<script lang="ts" setup>
    import { ref, reactive, onMounted, computed } from 'vue';
    import { useStore } from 'vuex';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import RadioGroup from '@/pages/transport/components/RadioGroup.vue';
    import RadioGroupButton from '@/pages/transport/components/RadioGroupButton.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Trash from '@/components/Icon/Trash.vue';
    import { RadioOptions } from './data';
    const store = useStore();

    interface IObjectData {
        name: string;
        quantity: number;
        length: string;
        weight: string;
        width: string;
        height: string;
        volume: number;
        size: string;
    }

    interface IWeightItem {
        label: string;
        value: number;
    }

    const props = defineProps({
        label: {
            type: String,
            default:
                'Indiquez le plus grand format que vous pouvez transporter',
        },
    });


    const predifinedSize = computed(
        () => store.getters['TransportModule/getPredifinedSizes']
    );

    const hiddenFields = ref<boolean>(true);
    const dimensionKnown = ref<boolean>(true);

    const dimensionValueSet = ref<boolean>(false);

    const objectProperty = ref<IObjectData>({
        name: '',
        quantity: 1,
        length: '',
        width: '',
        height: '',
        volume: 0,
        size: '',
        weight: '',
    });

    let payload : any = {
      volume : null,
      size: "",
      weight : 0,
    }

    const emit = defineEmits<{
      (e : "change", payload : any) : void;
    }>()

    //handlers

    function handleSwitcher(value: any) {
        dimensionKnown.value = value.dimensionKnown;
    }
    function handleChange(value: any) {
        objectProperty.value = { ...objectProperty.value, ...value };
        const dimensionKeys = ['size', 'height'];
        const fieldKey = Object.keys(value)[0];
        dimensionValueSet.value = dimensionKeys.includes(fieldKey);
        payload.volume = null; 
        payload = { ...payload, ...value};
        emit('change', payload);

    }
    function handleSelect($event: any) {
        emit('change', payload);
    }
    function handleInputChange($event: any) {
        const key : string = Object.keys($event)[0];
        if(key === 'volume') {
            payload.weight = 0;
        }
        payload = { ...payload, ...{[key] : parseInt($event[key]) }};
        emit('change', payload);

    }
</script>

<template>
    <Transition appear name="fadeHeight" mode="out-in">
        <div class="more-details">
            <Paragraph :font-size="'14px'" 
            class="card-title">
                {{ props.label }}
            </Paragraph>
            <div class="input-wrapper__dimension-details gray-left-border">
                <div class="dimension-details__switcher">
                    <!-- <div class="switcher__on-mobile">
                        <Switch
                            checked-name="Oui"
                            unchecked-name="Non"
                            item-label="Je ne connais pas les dimension de l’objet"
                            name="dimensionKnown"
                            @switch-value="handleSwitcher"
                            :switch-value="dimensionKnown"
                        />
                    </div> -->
                    <div class="switcher__on-desktop">
                        <RadioGroup
                            :options="RadioOptions"
                            @select-option="handleSwitcher"
                            :name-input="'dimensionKnown'"
                            :default-value="dimensionKnown"
                        />
                    </div>
                </div>
                <div v-if="dimensionKnown" class="dimension-details">
                    <div class="dimension-details__input-group">
                        <Input
                            label="Volume disponible en m³"
                            name-input="volume"
                            input-type="number"
                            @input="handleInputChange"
                            class="dimension-details__input-element"
                        />
                    </div>
                </div>

                <RadioGroupButton
                    v-else
                    :options="predifinedSize"
                    @select-option="handleChange"
                    :name-input="'size'"
                />
                <!-- <Select class="dimension-details__select" :label="'Poids'" name="weight" :options="PredifinedWeight"
              @change-select="handleSelect" /> -->
                <Input 
                    label="Poids"
                    name-input="weight"
                    input-type="number"
                    @input="handleInputChange"
                    />
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
    .card{
        &-title {
            font-size : 14px;
            color: var(--color-gray-icon);
            font-weight: 500;
        }
    }
    .grouped-input {
        @apply flex gap-x-4 items-center;

        &__quantity-input {
            @apply w-1/3;
        }

        &__name-input {
            @apply w-2/3;
        }
    }

    .dimension-details {
        &__input-group {
            @apply flex flex-row gap-x-2.5;
        }

        &__input-element {
            @apply w-full;
        }

        &__switcher {
            .switcher {
                &__on-mobile {
                    @apply mb-4;

                    @screen md {
                        @apply hidden;
                    }
                }

                &__on-desktop {
                    @apply flex-col;

                    @screen md {
                        @apply flex-row;
                    }
                }
            }
        }
    }

    .input-wrapper {
        &__dimension-details {
            @apply pl-2.5 mt-2.5;

            .gray-left-border {
                @apply border-l-2;
                border-color: var(--color-primary);
            }
        }

        &__input-element {
            @apply w-full;
        }
    }

    .delete-field-button {
        @apply inline-flex items-center justify-center w-12 h-9 rounded-full;
        background-color: var(--color-primary);

        @screen md {
            @apply w-10 h-9;
        }
    }

    .icon {
        @apply w-6 h-6 mx-auto;
    }

    .gray-border {
        border-color: var(--color-primary);
    }

    .gray-left-border {
        @apply border-l-2;
        border-color: var(--color-primary);
    }

    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 1000px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
