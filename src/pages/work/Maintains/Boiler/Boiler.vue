<template>
    <div class="tank__container">
        <component
            :is="activeComp[activeComp.length - 1]"
            @component="changeComponent"
            @prev="handlePrev"
        />
    </div>
</template>

<script lang="ts" setup>
    import BoilerMenu from './BoilerMenu.vue';
    import { ref, watch } from 'vue';

    const activeComp = ref<Array<any>>([BoilerMenu]);

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
    .tank {
        &__container {
            @apply flex-1 min-h-[89vh] bg-white p-[14px] rounded-[8px] min-h-[89vh];
        }
    }
</style>
