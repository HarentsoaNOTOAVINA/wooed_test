<script setup lang="ts">
    import { RadioGroup, RadioButton } from 'ant-design-vue';
    import { computed, onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    import { useRouter } from 'vue-router';
    import { Empty as AEmpty } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import FilterIcon from '@/components/Icon/FilterIcon.vue';
    import APopover from 'ant-design-vue/lib/popover';
    import Button from '@/components/Common/Button/Button.vue';

    const store: Store<any> = useStore();
    const router = useRouter();

    const currentFilterActive = ref<string>('all');
    const currentFilterTitle = ref<string>('Tout');

    const filterFinance = ref<any>([
        {
            label: 'Tout',
            value: 'all',
        },
        {
            label: 'Bien à Vendre',
            value: 'sale',
        },
        {
            label: 'Bien à Louer',
            value: 'lease',
        },
        {
            label: 'Bien à Occuper',
            value: 'occupied',
        },
    ]);

    let dataCard = ref<any>([]);
    let data = ref<any>([]);
    let loading = ref<boolean>(false);
    const visible = ref<boolean>(false);

    onMounted(async () => {
        let data = computed(
            () => store.getters['FinancialModule/getListMyProperty']
        );

        if (data.value) {
            dataCard.value = [...data.value];
        } else {
            try {
                loading.value = true;
                await store.dispatch('FinancialModule/setListMyProperty');
                data = computed(
                    () => store.getters['FinancialModule/getListMyProperty']
                );

                dataCard.value = [...data.value];
            } catch (error) {
                console.log(error);
            } finally {
                loading.value = false;
            }
        }
    });

    const handleSelectButtonMenu = (e: any) => {
        console.log('select value', e.target);
        currentFilterActive.value = e.target.value;
        console.log(currentFilterActive.value, 'value select');
        if (currentFilterActive.value !== 'all') {
            data = computed(
                () => store.getters['FinancialModule/getListMyProperty']
            );

            dataCard.value = data.value.filter((value: any) => {
                return value.operationType.includes(currentFilterActive.value);
            });
            visible.value = false;
        } else {
            data = computed(
                () => store.getters['FinancialModule/getListMyProperty']
            );
            dataCard.value = [...data.value];
            visible.value = false;
        }
    };

    function gotoFinancial(id: any) {
        router.push({ name: 'financial-help', params: { id: id } });
    }

    function handleClickedBtn(title: string) {
        currentFilterTitle.value = title;
    }

    function getProductDetail(product: any) {
        store.dispatch('FinancialModule/updateChoosenProperty', product);
    }
</script>

<template>
    <div class="container finance">
        <div class="finance__filter-mobile" v-if="!loading">
            <Paragraphe class="font-bold">{{ currentFilterTitle }}</Paragraphe>
            <Paragraphe class="font-semibold filter-right">
                Filtre
                <a-popover v-model:visible="visible" trigger="click">
                    <template #content>
                        <div class="filter-mobile">
                            <RadioGroup @change="handleSelectButtonMenu">
                                <RadioButton
                                    class="md-radio"
                                    :class="
                                        currentFilterActive === item.value
                                            ? 'md-header-filter-active'
                                            : ''
                                    "
                                    size="small"
                                    v-for="(item, _) in filterFinance"
                                    :key="_"
                                    :value="item.value"
                                    @click="handleClickedBtn(item.label)"
                                >
                                    {{ item.label }}
                                </RadioButton>
                            </RadioGroup>
                        </div>
                    </template>
                    <FilterIcon />
                </a-popover>
            </Paragraphe>
        </div>
        <div class="md-header-filter__simulate sm:hidden">
            <Button @click="router.push({name: 'financial-simulation'})" type-button="gray"
                >Faire une simulation non liée à un bien</Button
            >
        </div>
        <div class="md-header-filter mt-3" v-if="!loading">
            <RadioGroup @change="handleSelectButtonMenu">
                <RadioButton
                    class="md-radio"
                    :class="
                        currentFilterActive === item.value
                            ? 'md-header-filter-active'
                            : ''
                    "
                    size="small"
                    v-for="(item, _) in filterFinance"
                    :key="_"
                    :value="item.value"
                >
                    {{ item.label }}
                </RadioButton>
            </RadioGroup>
            <div class="md-header-filter__simulate">
                <Button @click="router.push({name: 'financial-simulation'})" type-button="gray"
                    >Faire une simulation non liée à un bien</Button
                >
            </div>
        </div>

        <div class="finance__home-content mt-3" v-if="!loading">
            <ListProducts
                v-if="dataCard.length > 0"
                class="finance__container-product"
                @on-handle-product="gotoFinancial"
                @on-handle-detail="getProductDetail"
                :DataCard="dataCard"
            />
            <div v-else>
                <a-empty :description="`Vous n'avez pas de bien`" />
            </div>
        </div>
        <div v-if="loading"><Loader /></div>
    </div>
</template>

<style scoped lang="scss">
    .finance {
        &__home-content {
            &:deep() {
                .product-card > .card {
                    height: fit-content;
                }
            }
        }
        background-color: #fff;
        &__filter-mobile {
            @apply flex flex-row justify-between items-center bg-[#fff] p-[10px] mt-[10px] rounded-[8px];
        }
        &__container-product {
            @apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] mt-[10px] md:mt-[0px] md:h-[calc(100vh_-_100px)] overflow-y-auto grid md:grid-cols-3 sm:grid-cols-2 gap-4;
            &::-webkit-scrollbar {
                display: none;
            }
            -ms-overflow-style: none;
            scrollbar-width: none;
            &:deep() {
                .card {
                    border: 1px solid var(--color-stroke-gray);
                }
            }
            // @apply flex flex-row flex-wrap justify-center gap-[20px] items-center;
        }
    }
    .md-header-filter {
        display: none;
    }

    .md {
        &-header {
            &-filter {
                &-active {
                    color: var(--color-secondary);
                    font-weight: 500;
                    border-bottom: 1px solid var(--color-secondary) !important;
                }
                &__simulate {
                    :deep() {
                        button {
                            @apply rounded-[8px] w-full;
                        }
                    }
                }
            }
        }
        &-radio {
            border: none;
            box-shadow: unset;
            position: initial;
            min-width: max-content;
            &:deep(.ant-radio-button-wrapper) {
                position: initial;
            }
        }

        &-radio:hover {
            position: initial;
            color: var(--color-secondary);
            border-bottom: 1px solid var(--color-secondary);
        }
    }

    .filter-mobile {
        &:deep() {
            .ant-radio-group.ant-radio-group-outline {
                @apply flex flex-col;
            }
        }
    }
    @screen sm {
        .finance__filter-mobile {
            display: none;
        }
        .md {
            &-header {
                &-filter {
                    @apply w-full flex flex-row py-2 text-sm justify-between rounded-[8px] p-[24px];
                }
            }
        }
    }

    .filter-right {
        @apply flex flex-row justify-end items-center gap-[5px];
    }
</style>
