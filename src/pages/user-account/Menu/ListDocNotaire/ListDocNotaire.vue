<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { filterElement, radioElement } from './dataListNotaire';
    import NotaryCard from '../Purchases/Common/NotaryCard/NotaryCard.vue';
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import FilterIcon from '@/components/Icon/FilterIcon.vue';
    import { computed, onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    let dataCard = ref<any>([]);
    let loadingProduct = ref(false);

    const emit = defineEmits<{
        (e: 'on-emit-id', v: number): void;
        (
            e: 'on-change-cmp',
            v: {
                label: string;
                value: any;
                active: boolean;
                emittedValue?: any;
            }
        ): void;
    }>();

    onMounted(() => {
        getDocNotary();
    });

    async function getDocNotary() {
        try {
            loadingProduct.value = true;
            await store.dispatch('NotaryModule/setDocNotary');
            let data = computed(
                () => store.getters['NotaryModule/getDocNotary']
            );
            let d = [...data.value];
            dataCard.value = d.sort((recent: any, last: any) => {
                return last.id - recent.id;
            });
            console.log('datasss', dataCard.value);
        } catch (error) {
            console.log(error);
        } finally {
            loadingProduct.value = false;
        }
    }

    function sortByDate() {}

    function filterDate() {
        console.log('filter');
    }

    function handleClicked(idCard: number) {
        console.log('iidddd', idCard);

        dataCard.value = dataCard.value.filter((value: any) => {
            return value.id.toString().includes(idCard);
        });

        console.log('DATA FILTER', dataCard.value);

        emit('on-change-cmp', {
            label: 'Details docs',
            value: NotaryCard,
            active: true,
            emittedValue: { label: 'dataCard', value: dataCard },
        });
        // emit('on-emit-id', id);
    }

    function handleChangeRadio(value: any) {
        // console.log('value', value);
        let valFilter = value.Choose;
        // console.log("choose:", valFilter);
        //
        // let data = computed(() => store.getters['NotaryModule/getDocNotary']);

        let all: Array<any> = dataCard.value;
        console.log('data chooossss:', all);

        switch (valFilter) {
            case 'all':
                dataCard.value = [...all];
                console.log('lllllllll:', dataCard.value);
                break;
            default:
                dataCard.value = all.filter((value: any) => {
                    if (value.documentStatus !== null) {
                        return value.documentStatus.includes(valFilter);
                    }
                });
                console.log('default:', dataCard.value);
                break;
        }
        all = dataCard.value;

        console.log('Data card value filter', dataCard.value);
    }

    function handleChangeSub(value: any) {
        console.log(value, 'Vallllluuuueeeee');
    }
</script>

<template>
    <div>
        <div class="purchase__chooser" v-if="!loadingProduct">
            <!-- <label class="font-semibold"
                >Veuillez choisir entre ces options</label
            > -->
            <div class="purchase__filterContainer">
                <Select
                    placeholder="Veuillez choisir entre ces options"
                    :name="radioElement.name"
                    :options="radioElement.subChoose"
                    @change-select="handleChangeRadio($event)"
                />
                <!-- <FilterIcon @click="filterDate" /> -->
            </div>
        </div>
        <div v-if="loadingProduct">
            <Loader />
        </div>

        <div class="purchase__my-list">
            <TransitionComponent>
                <div class="purchase__product-items" v-if="dataCard.length > 0">
                    <ProductCard
                        v-for="(card, index) in dataCard"
                        :DataCard="card.theProperty"
                        :key="index"
                        :isBordered="true"
                        @on-handle-product="handleClicked(card.id)"
                    />
                </div>
                <div v-else class="purchase__empty">
                    <a-empty
                        description="Pas de bien avec document"
                        v-if="!loadingProduct"
                    />
                </div>
            </TransitionComponent>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .purchase {
        &__filterContainer {
            @apply flex gap-[14px];
        }
        &__chooser {
            @apply mb-[15px];
        }
        &__empty {
            @apply h-[200px] mt-[55px];
        }
        &__number-purche {
            @apply mb-3.5;
        }

        &__my-list {
            &:deep() {
                .card {
                    @screen md {
                        @apply max-w-[380px];
                    }
                }
                .product-card {
                    @apply flex flex-row flex-wrap justify-center gap-3.5 w-full;
                    align-items: normal;
                }
            }
        }
        &__product-items {
            @apply grid md:grid-cols-2 gap-[15px];
        }
    }
</style>
