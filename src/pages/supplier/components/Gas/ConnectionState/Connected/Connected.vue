<template>
    <Loader v-if="isLoadFetchDocument" />
    <div v-else class="is-connected">
        <AddDocument
            :the-property="(route.params.id as any)"
            @on-get-document-result="getDocumentResult"
            v-if="!hasDocumentProof"
            :energy-type="energyType"
        />
        <template v-else>
            <div>
                <transition appear name="fade-slide" mode="out-in">
                    <div v-if="!hasConsumption" class="has-not-consumtion">
                        <Alert>
                            Votre consommation n’est pas encore enregistré
                        </Alert>
                        <div class="is-connected__operation">
                            <Button
                                @click="$emit('on-redirect-to-consumption')"
                                class="is-connected__operation__btn"
                                >Enregistré votre consommation</Button
                            >
                        </div>
                    </div>
                    <div v-else class="has-consumtion">
                        <Loader v-if="isLoadConsumptionData" />
                        <template v-else>
                            <Alert>
                                Votre consommation a deja été enregistré
                            </Alert>
                            <br />
                            <InfoConsume
                                :consumption-details="consumptionDetails"
                            />
                        </template>
                    </div>
                </transition>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import AddDocument from '../../Consumption/AddDocument.vue';
    import InfoConsume from '../../Consumption/InfoConsume.vue';
    import { ref, onMounted } from 'vue';
    import SupplierServices from '@/services/supplierService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const hasDocumentProof = ref<boolean>(false);
    const hasConsumption = ref<boolean>(false);
    const isLoadFetchDocument = ref<boolean>(false);
    const consumptionDetails = ref<any>(null);
    const isLoadConsumptionData = ref<boolean>(false);

    const props = defineProps<{
        energyType: string;
    }>();

    onMounted(() => {
        getInitDocument();
        getConsumptionData();
    });
    function getDocumentResult(result: boolean) {
        hasDocumentProof.value = result;
    }
    async function getInitDocument() {
        try {
            isLoadFetchDocument.value = true;
            const { data, code } = await SupplierServices.getSupplierDocProof({
                theProperty: route.params.id,
                energyType: props.energyType,
            });
            hasDocumentProof.value = code === 200;
            console.log(data);
        } finally {
            isLoadFetchDocument.value = false;
        }
    }

    async function getConsumptionData() {
        try {
            isLoadConsumptionData.value = true;
            const { data, code } = await SupplierServices.getConsumption({
                theProperty: route.params.id,
                energyType: props.energyType,
            });
            if (code === 200) {
                consumptionDetails.value = Array.isArray(data)
                    ? data.at(-1)
                    : data;
                hasConsumption.value = true;
            }

            console.log(consumptionDetails.value, 'result');
        } finally {
            isLoadConsumptionData.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .is-connected {
        .fade-slide-enter-active,
        .fade-slide-leave-active {
            @apply transition-all;
        }
        .fade-slide-leave-to,
        .fade-slide-enter-from {
            @apply translate-x-[-100px];
        }
        &__operation {
            @apply mt-[10px];
            &__btn {
                @apply w-full flex justify-end;
            }
            &:deep {
                button {
                    @apply w-full md:w-auto;
                }
            }
        }
    }
</style>
