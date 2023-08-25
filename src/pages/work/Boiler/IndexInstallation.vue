<template>
    <div class="container boiler__container">
        <div class="breadCrumb-nav"><BreadCrumb :items="dataBreadCrumb" /></div>
        <component
            :is="activeComp[activeComp.length - 1]"
            @component="changeComp"
            @prev="handlePrev"
        />
    </div>
</template>

<script setup lang="ts">
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import MenuInstallation from './MenuInstallation.vue';
    import { computed, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const router = useRoute();
    let activeComp = ref<Array<any>>([MenuInstallation]);

    const dataBreadCrumb = ref<Array<any>>([
        {
            label: 'Menu',
            url: `/travaux/chaudiere/${router.params.id}`,
        },
        {
            label: 'Travaux d’installation',
        },
    ]);

    watch(
        () => activeComp.value,
        (value) => {
            activeComp.value = value;
        },
        { immediate: true, deep: true }
    );

    function changeComp(component: any) {
        activeComp.value = [...activeComp.value, component];
        console.log(activeComp.value, 'ACTIVE COMP');
    }

    function handlePrev() {
        activeComp.value.pop();
    }
</script>

<style scoped lang="scss">
    .breadCrumb-nav {
        @apply my-[10px];
    }
</style>
