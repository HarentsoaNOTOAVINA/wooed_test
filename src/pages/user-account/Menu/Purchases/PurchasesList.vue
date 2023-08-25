<script setup lang="ts">

    import ListeMyBien from '@/pages/user-account/Menu/Purchases/Buyer/components/ListBien.vue';
    import Menu from '@/pages/user-account/Menu/Purchases/Buyer/components/MenuPurchaseProperty.vue';


    const emit = defineEmits<{
        (
            e: 'on-change-cmp',
            v: { label: string; value: any; active: boolean; emittedValue?: any }
        ): void;
    }>();
    function handleId(id: number) {
        emit('on-change-cmp', {
            label: 'Menu',
            value: Menu,
            active: true,
            emittedValue: { label: 'id', value: id },
        });
    }
</script>

<template>
    <div>
        <ListeMyBien @on-emit-id="handleId" />
       <!-- <StatusOffer />-->
    </div>
</template>

<style scoped lang="scss"></style>
