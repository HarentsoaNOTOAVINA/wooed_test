<template>
    <div class="addNextControl">
        <label v-if="disabled" class="addNextControl__label-info">
            * veullez remplir tous les 2 champs</label
        >
        <Select
            :options="typeControl"
            name="typeControls"
            placeholder="Type de contrôle"
            label="Type de contrôle"
            @change-select="handleSelect"
        />

        <InputDate
            :min="true"
            label="Date de contrôle"
            name="dateControls"
            @handleDateFormatFr="handleDate"
        />

        <div class="addNextControl__validation">
            <Button @on-click="handleAddControl" :disabled="disabled"
                ><LoadingButton size="xs" v-if="loadignBtnNextControl" />
                Ajouter next contrôle</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { PropType, watch } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        disabled: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        loadignBtnNextControl: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'handleSelect', a: object): void;
        (e: 'handleDate', a: object): void;
        (e: 'handleAddNextControl'): void;
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

    let typeControl = [
        {
            label: 'Contrôle limité',
            value: 'Contrôle limité',
        },
        {
            label: 'Contrôle général',
            value: 'Contrôle général',
        },
    ];

    let dataRadio = [
        {
            label: 'Mauvais',
            value: 'Mauvais',
        },
        {
            label: 'Moyenne',
            value: 'Moyenne',
        },
        {
            label: 'Bien',
            value: 'Bien',
        },
    ];

    function handleSelect(value: any) {
        console.log(value, 'VAlue anay  ');
        emit('handleSelect', value);
    }
    function handleDate(value: any) {
        console.log(value, 'Value date  ');
        emit('handleDate', value);
    }

    function handleAddControl() {
        console.log('Add Control');
        emit('handleAddNextControl');
    }
</script>

<style scoped lang="scss">
    .addNextControl {
        &__label-info {
            @apply mb-[5px] mb-[10px] block text-[var(--color-border-warn)] text-[13px] italic;
        }

        &__validation {
            @apply text-right mt-[10px];
        }
    }
</style>
