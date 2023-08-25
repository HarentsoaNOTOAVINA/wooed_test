<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import DataProps from '@/components/Display/productCard/CardType';
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import { computed, onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    let dataCard = ref<any>([]);
    let loadingProduct = ref(false);

    const emit = defineEmits<{
        (e: 'on-emit-id', v: number): void;
    }>();

    let makeRequest = computed(
        () => store.getters['MakeOfferModule/getStatusRequested']
    );

    console.log(makeRequest.value, 'MakeREquest');

    onMounted(async () => {
        let data = computed(
            () => store.getters['MakeOfferModule/getMyListOffers']
        );

        if (data.value && makeRequest.value === false) {
            dataCard.value = [...data.value];
            console.log('dans store pas de requesat', dataCard.value);
        } else {
            try {
                loadingProduct.value = true;
                await store.dispatch('MakeOfferModule/setMyListOffer');
                data = computed(
                    () => store.getters['MakeOfferModule/getMyListOffers']
                );
                dataCard.value = [...data.value];
                console.log(dataCard.value);
                store.dispatch('MakeOfferModule/setStatusRequest', false);
            } catch (error) {
                console.log(error);
            } finally {
                loadingProduct.value = false;
            }
        }
    });

    function handleClicked(id: number) {
        emit('on-emit-id', id);
    }
</script>

<template>
    <div>
        <div class="purchase__number-purche">
            <Paragraphe v-if="!loadingProduct"
                ><strong>{{ dataCard.length }}</strong>
                {{
                    dataCard.length <= 1 ? 'Publication' : 'Publications'
                }}</Paragraphe
            >
        </div>

        <div v-if="loadingProduct">
            <Loader />
        </div>

        <div class="purchase__my-list">
            <TransitionComponent v-if="dataCard.length > 0">
                <ListProducts
                    :DataCard="dataCard"
                    :isBordered="true"
                    @on-handle-product="handleClicked"
                />
            </TransitionComponent>
        </div>

        <div v-if="!loadingProduct && !dataCard.length">
            <a-empty
                description="Vous n'avez pas encore de bien avec une offre"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .purchase {
        &__number-purche {
            @apply mb-3.5;
        }

        &__my-list {
            @apply flex flex-row flex-wrap gap-3.5;
            align-items: normal;

            &:deep() {
                .card {
                    @screen md {
                        @apply max-w-[380px];
                    }
                }

                .product-card {
                    @apply flex flex-row flex-wrap justify-center gap-3.5;
                    align-items: normal;
                }
            }
        }
    }
</style>
