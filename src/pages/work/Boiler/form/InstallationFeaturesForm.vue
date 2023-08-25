<template>
    <div class="boilerFeatInstallation__add">
        <div class="boilerFeatInstallation__input">
            <Input
                label="Marque​"
                placeholder="Marque du Chaudière"
                name-input="brand"
                @input="hadleInput"
            />
            <Input
                label="Type​"
                placeholder="Type​ du Chaudière"
                name-input="type"
                @input="hadleInput"
            />
            <Input
                label="Puissance"
                placeholder="0"
                unity="KW"
                input-type="number"
                name-input="power"
                @input="hadleInput"
            />
            <Radio
                label="Combustible"
                :element="dataRadio"
                align="horizontal"
                @handleChangeRadio="hadleInput"
                name="fuel"
            />
        </div>
        <div class="boilerFeatInstallation__button">
            <Button
                type-button="secondary"
                :disabled="disabled"
                @on-click="addCaracteristic"
                ><LoadingButton size="xs" v-if="loadingBtn" /> Ajouter</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref } from 'vue';

    const props = defineProps({
        loadingBtn: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'hadleInput', value: object): void;
        (e: 'handleValid', value: object): void;
    }>();

    let dataToPostCaracteristicInstallation = ref<any>({
        fuel: 'Gaz',
        brand: '',
        power: '',
        type: '',
    });

    let disabled = ref<boolean>(true);

    let dataRadio = ref<Array<any>>([
        {
            label: 'Gaz',
            value: 'Gaz',
        },
        {
            label: 'Mazout',
            value: 'Mazout',
        },
    ]);

    function hadleInput(value: object) {
        dataToPostCaracteristicInstallation.value = {
            ...dataToPostCaracteristicInstallation.value,
            ...value,
        };
        dataToPostCaracteristicInstallation.value.brand != '' &&
        dataToPostCaracteristicInstallation.value.power != '' &&
        dataToPostCaracteristicInstallation.value.type != ''
            ? (disabled.value = false)
            : (disabled.value = true);

        console.log(disabled.value, 'DATA Spread spread');

        emit('hadleInput', value);
    }
    function addCaracteristic() {
        emit('handleValid', dataToPostCaracteristicInstallation.value);
    }
</script>

<style scoped lang="scss">
    .boilerFeatInstallation {
        &__add {
        }
        &__button {
            @apply fixed bottom-[10px] w-[90%];

            @screen md {
                @apply right-[5%] w-[112px];
            }

            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }
</style>
