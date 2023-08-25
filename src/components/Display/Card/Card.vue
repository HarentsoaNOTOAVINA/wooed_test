<template>
    <div class="card-container" @click="handleClick">
        <slot/>
    </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['click']);
function handleClick() {
    emit('click');
}
</script>
<style lang="scss" scoped>
    .card-container {
        background-color: #fff;
        border-radius: 8px;
        padding: 14px;
    }
</style>