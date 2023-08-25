<template>
    <div class="addControl">
        <label v-if="disabled" class="addControl__label-info">
            * veullez remplir tous les champs</label
        >
        <Select name="typeControls" :placeholder="typeControlLabel" disabled />

        <InputDate
            :max="true"
            label="Date de contrôle"
            name="datePebControls"
            @handleDateFormatFr="handleDate"
        />

        <div class="addControl__radio">
            <Radio
                label="Etat de contrôle"
                :element="dataRadio"
                class="radioElementClass"
                :radio-default-check="dataRadio[0].value"
                name="statePebControls"
                @handleChangeRadio="handleChangeRadio($event)"
            />
        </div>

        <div class="addControl__uploadFile">
            <label>Ajout du pdf</label>

            <UploadFile
                name="document"
                @uploadFileListWithName="handleUploadFile"
            />
        </div>

        <div class="addControl__cost">
            <Input
                inputType="number"
                name-input="costPebControls"
                label="Coût de contrôle"
                placeholder="0"
                unity="€"
                @input="handleCost"
            />
        </div>

        <div class="addControl__validation">
            <Button @on-click="handleAddControl" :disabled="disabled"
                ><LoadingButton size="xs" v-if="loadingBtnAd" /> Ajouter</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import UploadFile from '@/components/Display/UploadImage/UploadImage.vue';
    import { ref, PropType, watch } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        typeControlLabel: {
            type: String,
            default: 'Type de contrôle',
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        loadingBtnAd: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'handleDate', a: object): void;
        (e: 'handleChangeRadio', a: object): void;
        (e: 'handleUploadFile', a: object): void;
        (e: 'handleCost', a: object): void;
        (e: 'handleAddControl'): void;
    }>();

    watch(
        () => props.disabled,
        (newValue, oldValue) => {
            console.log(`disabilite de la bouton ${oldValue} to ${newValue}`);
        },
        {
            immediate: true,
        }
    );

    let dataRadio = [
        {
            label: 'Mauvais',
            value: 'Mauvais',
        },
        {
            label: 'Bien',
            value: 'Bien',
        },
    ];
    function handleDate(value: any) {
        emit('handleDate', value);
    }

    function handleChangeRadio(value: any) {
        emit('handleChangeRadio', value);
    }
    function handleUploadFile(value: any) {
        emit('handleUploadFile', value);
    }
    function handleCost(value: any) {
        emit('handleCost', value);
    }
    function handleAddControl() {
        emit('handleAddControl');
    }
</script>

<style scoped lang="scss">
    .addControl {
        &__label-info {
            @apply mb-[5px] mb-[10px] block text-[var(--color-border-warn)] text-[13px] italic;
        }
        &__radio {
            @apply mt-[18px];

            &:deep() {
                .app-radio-group .ant-radio-group {
                    @apply flex flex-wrap gap-[5px];

                    label {
                        @apply py-[8px] px-[14px] rounded-[14px];
                    }
                    .ant-radio-wrapper-checked {
                        @apply bg-[var(--color-gray)];
                    }
                }
            }
        }

        &__uploadFile {
            label {
                @apply text-sm font-medium text-[var(--color-gray-icon)] mb-[10px] block mt-[18px];
            }
        }

        &__cost {
            @apply mt-[18px];
        }

        &__validation {
            @apply text-right;
        }
    }
</style>
