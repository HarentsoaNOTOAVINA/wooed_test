<template>
    <div class="addNextControl">
        <label v-if="disabled" class="addNextControl__label-info">
            * veullez remplir la date</label
        >
        <InputDate
            :min="true"
            label="Date de prochaine contrôle"
            name="dateNextPebControls"
            @handleDateFormatFr="handleDatePEB"
        />

        <div class="addNextControl__validation">
            <Button @on-click="handleAddControl" :disabled="disabled"
                ><LoadingButton size="xs" v-if="loadignBtnNextControlPEB" />
                Ajouter next contrôle</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { PropType, watch } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        disabled: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        loadignBtnNextControlPEB: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'handleDatePeb', a: object): void;
        (e: 'handleAddNextControlPeb'): void;
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

    function handleDatePEB(value: any) {
        console.log(value, 'Value date  ');
        emit('handleDatePeb', value);
    }

    function handleAddControl() {
        console.log('Add Control');
        emit('handleAddNextControlPeb');
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
