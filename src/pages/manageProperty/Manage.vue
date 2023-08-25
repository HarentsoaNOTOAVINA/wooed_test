<script lang="ts" setup>
    import Header from '@/pages/manageProperty/components/Header.vue';
    import MyProperty from '@/pages/manageProperty/myProperty/MyProperty.vue';
    import Interested from '@/pages/manageProperty/interested/Interested.vue';
    import { useRouter } from 'vue-router';
    import { shallowRef, watch, ref } from 'vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';

    const router = useRouter();
    const activeComp = ref<Array<any>>([MyProperty]);

    // watch(() => activeComp.value, (value) => {
    //     activeComp.value = value;
    // }, {immediate : true, deep : true});

    function handleAdd() {
        router.push('/manage-property/ajouter');
    }

    function handleInterested() {
        activeComp.value = [...activeComp.value, Interested];
    }

    function handleBack() {
        activeComp.value.pop();
    }
</script>

<template>
    <MainContainer class="manage__container">
        <Header @handle-add="handleAdd" @handle-interested="handleInterested" />
        <component
            :is="activeComp[activeComp.length - 1]"
            @handleBack="handleBack"
        />
    </MainContainer>
</template>

<style lang="scss" scoped>
    .manage {
        &__container {
            @apply place-content-18px;
        }
    }
</style>
