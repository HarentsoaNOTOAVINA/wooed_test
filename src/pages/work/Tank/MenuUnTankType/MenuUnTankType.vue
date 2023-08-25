<template>
    <div>
        <MenuTanksWork
            :dataTankMenu="dataMenu"
            @changeComponent="changeComponent"
        />
    </div>
</template>

<script setup lang="ts">
    import MenuTanksWork from '../MenuTanksWork/MenuTanksWork.vue';
    import { dataMenu } from './data';

    const emit = defineEmits(['changeCompUntank']);
    const props = defineProps(['params']);

    const changeComponent = (value: any) => {
        emit('changeCompUntank', value);
    };
</script>

<style lang="scss" scoped></style>
