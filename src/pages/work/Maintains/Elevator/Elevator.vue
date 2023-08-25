<template>
    <div class="consumer__container">
        <component
            :is="activeComp[activeComp.length - 1]"
            @component="changeComponent"
            @prev="handlePrev"
        />
    </div>
</template>

<script lang="ts" setup>
    import ElevatorMenu from './ElevatorMenu.vue';
    import { ref, watch } from 'vue';

    const activeComp = ref<Array<any>>([ElevatorMenu]);

    watch(
        () => activeComp.value,
        (value) => {
            activeComp.value = value;
        },
        { immediate: true, deep: true }
    );

    function changeComponent(component: any) {
        activeComp.value = [...activeComp.value, component];
    }

    function handlePrev() {
        activeComp.value.pop();
    }
</script>

<style lang="scss" scoped>
    .consumer {
        &__container {
            @apply flex-1;
        }
    }
</style>
