<template>
    <div class="sale-content">
        <Input
            label="Montant de crédit"
            name-input="creditAmount"
            input-type="number"
            :required="true"
            placeholder="0.00 €"
            @input="handleInput"
        />
        <Input
            label="Inscription hypothécaire"
            name-input="hypotecaireRegitration"
            input-type="number"
            :required="true"
            placeholder="0.00 €"
            @input="handleInput"
        />
    </div>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';

    const emit = defineEmits(['input']);

    function handleInput(value: any) {
        console.log(value);
        
        emit('input', value);
    }
</script>

<style scoped lang="scss">
    @import '@/assets/style/calcul_sale.scss';
</style>
