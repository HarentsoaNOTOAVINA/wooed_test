<template>
    <Loader v-if="loading" />
    <div v-else-if="dataCard.length == 0">
        <a-empty description="Aucun offre..." />
    </div>
    <div v-else class="md:container seller">
        <ProductCards
            :DataCard="dataCard"
            :isBordered="true"
            :fromWhere="fromWhere"
            @on-handle-product="gotoDetail"
        />
    </div>
</template>

<script lang="ts" setup>
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    // import dataCard from './data/dataCard';
    import { onMounted, ref, computed } from 'vue';
    import { Store, useStore } from 'vuex';
    import Loader from '@/components/Common/Loader/Loader.vue';
    // import router from '@/routes';
    import { useRoute, useRouter } from 'vue-router';
    import { Empty as AEmpty } from 'ant-design-vue';
    import ProductCards from '@/components/section/ListProducts/ListProducts.vue';

    const route = useRoute();
    const router = useRouter();
    let dataCard = ref<any>([]);
    let loading = ref<boolean>(true);
    const store: Store<any> = useStore();

    onMounted(async () => {
        propertiesList();
        console.log('route fulpath:', dataCard);
    });
    const fromWhere = ref<string>(route.fullPath);
    const propertiesList = async () => {
        loading.value = true;
        try {
            await store.dispatch('SellerModule/setPropertiesList');
            const data = computed(
                () => store.getters['SellerModule/getPropertiesList']
            );

            dataCard.value = [...data.value.data];
            console.log('id:', dataCard.value);
        } catch (error) {
            console.log('error when calling properties list', error);
        } finally {
            loading.value = false;
        }
    };
    const gotoDetail = (id: number) => {
        console.log('goto detail', id);
        // const data:number = 1
        // router.push({path: `detail/${id}`,query:{type: "offer"}});
        router.push({
            name: 'detail',
            params: { id },
            query: { type: 'offer' },
        });
    };
</script>

<style lang="scss" scoped>
    .seller {
        &:deep() {
            .product-card {
                @apply flex flex-col items-center gap-[10px];
                //responsive
                @screen lg {
                    @apply grid grid-cols-2;
                }
                @screen md {
                    @apply grid grid-cols-2 gap-[10px];
                }
            }
        }
    }
</style>
