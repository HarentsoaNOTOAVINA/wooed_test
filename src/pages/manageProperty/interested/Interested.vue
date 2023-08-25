<script lang="ts" setup>
import BackButton from '@/components/Common/BackButton/BackButton.vue';

const emit = defineEmits(['handleBack']);

function handleBack(){
    emit('handleBack');
}

</script>

<template>
    <div>
        <BackButton @click="handleBack"/>
        Interested
    </div>
</template>

<style lang="scss" scoed>

</style>