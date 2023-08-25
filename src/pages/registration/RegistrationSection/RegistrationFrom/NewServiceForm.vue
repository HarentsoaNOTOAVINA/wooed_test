<template>
    <div class="new-service__form">
        <Input 
            name-input="roadWorks"
            input-type="text"
            class="mb-4"
            @change="handleChange"
        />
        <div class="new-service__btn-container">
            <Button 
                @click="hideModal"
                type-button="primary-cancel"
            >
                Annuler
            </Button>
            <Button 
                @click="confirmCreate"
            >
                Créer
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Input from '@/components/Common/Input/Input.vue';
import Button from '@/components/Common/Button/Button.vue';

const payload = ref<any>({ roadWorks: '', status: true })
const emit = defineEmits(['hide-modal', 'confirm']);

function handleChange(value: any) {
    payload.value = { ...payload.value, ...value };
}

function confirmCreate() {
    emit('confirm', payload.value)
}

function hideModal() {
    emit('hide-modal');
}
</script>
<style lang="scss" scoped>
.new-service {
    &__form {
        @apply flex flex-col;
    }
    &__btn-container {
        @apply flex flex-row gap-2 justify-center;
    }
}
</style>