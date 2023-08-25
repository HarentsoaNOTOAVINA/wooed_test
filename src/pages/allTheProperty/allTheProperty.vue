<script lang="ts" setup>
    import ListProduct from '@/components/section/ListProducts/ListProducts.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { onMounted, ref } from 'vue';
    import { useStore, Store } from 'vuex';

    const store: Store<any> = useStore();
    const listProperty = ref<any>([]);
    const loading = ref<boolean>(true);

    onMounted(() => {
        getTheList();
    });

    async function getTheList() {
        try {
            loading.value = true;

            const data = store.getters['AddProductModule/getAllTheProperty'];
            if (data.length <= 0) {
                await getInTheBack();
            }
            listProperty.value =
                store.getters['AddProductModule/getAllTheProperty'];
        } finally {
            loading.value = false;
        }
    }

    async function getInTheBack() {
        await store.dispatch('AddProductModule/getAllTheProperty');
    }
</script>

<template>
    <div class="md:container property__container">
        <Loader v-if="loading" />
        <ListProduct
            v-else
            class="property__content"
            :DataCard="listProperty.data"
            :isBordered="true"
            :isParentHandled="true"
        />
    </div>
</template>

<style lang="scss" scoped>
    .property {
        &__container {
            @apply my-[12px] md:flex justify-center gap-[20px] md:gap-[10px] min-h-[calc(100vh_-_250px)] md:min-h-[calc(100vh_-_70px)] w-[100%];
        }
        &__content {
            position: relative;
            @apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] lg:w-[1024px] mt-[10px] md:mt-[0px] md:h-[calc(100vh_-_100px)] overflow-y-auto grid md:grid-cols-3 sm:grid-cols-2 gap-4;

            &:deep() {
                .card {
                    @apply h-fit;
                }
            }
        }
    }
</style>
