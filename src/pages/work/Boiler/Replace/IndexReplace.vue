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
    import MenuReplace from './MenuReplace.vue';
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const router = useRoute();
    let activeComp = ref<Array<any>>([MenuReplace]);

    const dataBreadCrumb = ref<Array<any>>([
        {
            label: 'Menu',
            url: `/travaux/chaudiere/${router.params.id}`,
        },
        {
            label: 'Remplacer la chaudière',
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
