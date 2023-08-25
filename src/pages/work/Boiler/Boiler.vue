<template>
    <div class="boiler__container">
        <component
            :is="activeComp[activeComp.length - 1]"
            @component="changeComp"
            @prev="handlePrev"
        />
    </div>
</template>

<script setup lang="ts">
    import MenuBoiler from './index.vue';
    import { ref, watch } from 'vue';

    let activeComp = ref<Array<any>>([MenuBoiler]);

    watch(
        () => activeComp.value,
        (value) => {
            activeComp.value = value;
        },
        { immediate: true, deep: true }
    );

    function changeComp(component: any) {
        activeComp.value = [...activeComp.value, component];
    }

    function handlePrev() {
        activeComp.value.pop();
    }
</script>

<style scoped lang="scss"></style>
