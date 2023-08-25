<template>
    <wrapper
        title="Resultat de la simulation"
        @on-back="$emit('on-back')"
        :hasRefresh="true"
    >
        <div class="result">
            <template v-if="simulationResult">
                <Alert
                    >Nous avons trouvé des resultats correspondants à votre
                    simulation <br />
                    Vous pouvez choisir le cout de la consommation de votre
                    choix</Alert
                >
                <div class="result__container">
                    <div
                        v-for="(item, index) in simulationResult"
                        :key="index"
                        class="result__card"
                    >
                        <div class="result__card__header">
                            <Title
                                class="result__card__header__title"
                                type="h4"
                                :label="index"
                            />
                        </div>
                        <div class="result__card__body">
                            <Paragraphe
                                >{{ item }} <sup>€/mois</sup></Paragraphe
                            >
                        </div>
                        <div class="result__card__footer">
                            <Button
                                :is-load="isLoadChoice && (currentChoice === index as unknown)"
                                loading-theme="dark"
                                @click="
                                    choseResult({ name: index, value: item })
                                "
                                type-button="border"
                            >
                                CHOISIR</Button
                            >
                        </div>
                    </div>
                </div>
            </template>
            <NoProposal
                text-desc="Pas de resultat(s) correspondant(s)"
                v-else
            />
        </div>
    </wrapper>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ref } from 'vue';
    import Wrapper from './Wrapper.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import NoProposal from '../../Gas/Consumption/NoProposal.vue';
    import { notification } from 'ant-design-vue';
    import SupplierServices from '@/services/supplierService';
import { useRoute } from 'vue-router';

    const route = useRoute();
    const isLoadChoice = ref<boolean>(false);
    const currentChoice = ref<string>('');

    const props = defineProps<{
        simulationResult: any;
        params: any;
    }>();

    async function choseResult({ name, value }: any) {
        currentChoice.value = name;
        isLoadChoice.value = true;
        try {
            const {data, status} = await SupplierServices.choseSimulation({
                theProperty: route.params.id,
                name,
                price: +value.replace(',', '.'),
                consumptionType: props.params['equipement'],
            });
            const {code} = data;
            if (code === 200 || code === 201 || status === 200) {
                notification.success({
                    message: 'Votre choix a bien été enrigistré'
                })
            }
        } catch (error) {
            notification.error({
                message:
                    "Il semble q'une erreur ait survenue, veuillez réessayer",
            });
        } finally {
            isLoadChoice.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .result {
        &__container {
            @apply flex flex-wrap gap-[20px] mt-[20px] justify-center;
        }
        &__card {
            @apply rounded-[8px] shadow-[var(--color-stroke-gray)] shadow-md md:w-[260px] w-full h-full;
            &__header {
                @apply p-[30px] bg-[var(--color-primary)];
                border-radius: 8px 8px 20px 20px;
                &__title {
                    @apply text-[#FFF] text-center font-semibold capitalize;
                }
            }
            &__body {
                @apply p-[20px];
                &:deep() {
                    p {
                        @apply text-[28px] text-center p-[10px] font-semibold text-primary;
                    }
                }
            }
            &__footer {
                @apply pb-[20px] px-[10px];
                &:deep() {
                    button {
                        @apply w-full font-normal text-[12px];
                    }
                }
            }
        }
    }
</style>
