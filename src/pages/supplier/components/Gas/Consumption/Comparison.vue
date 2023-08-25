<template>
    <div class="comparison">
        <Loader v-if="isLoadComparison" />
        <template v-else>
            <div v-if="compareListResult.length" class="comparison__card-list">
                <div
                    class="comparison__card"
                    v-for="(item, index) in compareListResult"
                    :key="index"
                >
                    <div class="comparison__card__header">
                        <Paragraphe class="text-white"
                            >Une offre au seins de la societé
                            <strong class="uppercase text-secondary">{{
                                item.name
                            }}</strong>
                            présente une avantage de plus de
                            <strong class="text-secondary"
                                >{{ item.profit }} €</strong
                            >
                            sur la consomation.</Paragraphe
                        >
                    </div>
                    <div class="comparison__card__body">
                        <ul>
                            <li>
                                <Paragraphe
                                    ><span>Online par an</span
                                    ><span
                                        ><template
                                            v-if="+item.onlinePricePerYear"
                                            >{{
                                                item.onlinePricePerYear
                                            }}
                                            €</template
                                        ><template v-else>N/A</template></span
                                    ></Paragraphe
                                >
                            </li>
                            <li>
                                <Paragraphe
                                    ><span>Tip par an</span
                                    ><span
                                        ><template v-if="+item.tipPricePerYear"
                                            >{{
                                                item.tipPricePerYear
                                            }}
                                            €</template
                                        ><template v-else>N/A</template></span
                                    ></Paragraphe
                                >
                            </li>
                            <li>
                                <Paragraphe
                                    ><span>Top par an</span
                                    ><span
                                        ><template v-if="+item.topPricePerYear"
                                            >{{
                                                item.topPricePerYear
                                            }}
                                            €</template
                                        ><template v-else>N/A</template></span
                                    ></Paragraphe
                                >
                            </li>
                            <li>
                                <Paragraphe
                                    ><span>eMobility par an</span
                                    ><span
                                        ><template
                                            v-if="+item.eMobilityPricePerYear"
                                            >{{
                                                item.eMobilityPricePerYear
                                            }}
                                            €</template
                                        ><template v-else>N/A</template></span
                                    ></Paragraphe
                                >
                            </li>
                            <li class="result">
                                <Paragraphe
                                    ><span>Type d'energie</span
                                    ><span class="capitalize">{{
                                        item.energyType
                                    }}</span></Paragraphe
                                >
                            </li>
                            <li class="result">
                                <Paragraphe
                                    ><span>Consomation annuelle</span
                                    ><span
                                        >{{
                                            item.annualGazConsumption
                                        }}
                                        m<sup>3</sup>/kWh</span
                                    ></Paragraphe
                                >
                            </li>
                        </ul>
                    </div>
                    <div class="comparison__card__footer">
                        <Button
                            @click="
                                () => {
                                    handleLink(item.name.toUpperCase());
                                }
                            "
                            class="sub-btn"
                            type-button="border"
                            >Souscrire</Button
                        >
                    </div>
                </div>
            </div>
            <Alert v-else
                >Aucun autre fournisseur rentable pour le moment , nous vous
                informerons au fil du temps.</Alert
            >
        </template>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import SupplierServices from '@/services/supplierService';
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const isLoadComparison = ref<boolean>(true);
    const compareListResult = ref<any[]>([]);
    const link = ref<any>({
        LAMPIRIS: 'https://simulator.lampiris.be/fr/choix-energie',
        LAMPRIS: 'https://simulator.lampiris.be/fr/choix-energie',
        ENGIE: 'https://www.engie.be/fr/energie/electricite-gaz/demenager/nouvelle-habitation',
        LUMINUS:
            'https://secure.luminus.be/fr/devenir-client/prive/luminus/?elec=comfyflex&gas=comfyflex&_ga=2.237077957.472761727.1641074805-43925495.1641074804',
    });

    onMounted(() => {
        compareConsumption();
    });

    async function compareConsumption() {
        try {
            const { data } = await SupplierServices.compareConsumption({
                theProperty: route.params.id,
            });
            compareListResult.value = data;
            console.log(compareListResult.value);
        } finally {
            isLoadComparison.value = false;
        }
    }
    function handleLink(supplier: string) {
        window.open(link.value[supplier], '_blank');
    }
</script>
<style lang="scss" scoped>
    .comparison {
        @apply relative min-h-[300px] p-[10px];
        &__card {
            &-list {
                @apply flex flex-wrap justify-center gap-[20px];
            }
            @apply rounded-[8px] shadow-[var(--color-stroke-gray)] shadow-md md:w-[260px] w-full h-full;
            &__header {
                @apply p-[30px] bg-[var(--color-primary)];
                border-radius: 8px 8px 20px 20px;
                &__title {
                    @apply text-[#FFF] text-center font-semibold uppercase;
                }
            }
            &__body {
                @apply p-[20px];
                &:deep() {
                    .paragraphe__normal {
                        @apply flex justify-between pb-[10px] border-b border-b-[var(--color-primary)] mb-[20px] text-[var(--color-gray-icon)];
                    }
                }
                .result {
                    &:deep() {
                        .paragraphe__normal {
                            @apply text-[var(--color-primary)] font-semibold;
                        }
                    }
                }
            }
            &__footer {
                @apply pb-[20px] px-[10px];
                &:deep() {
                    button {
                        @apply w-full font-normal;
                    }
                }
            }
        }
    }
</style>
