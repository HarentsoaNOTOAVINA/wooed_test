<template>
    <div class="simulation-result__card">
        <div class="simulation-result__card__header">
            <Title
                class="simulation-result__card__header__title"
                type="h4"
                :label="itemResult.bank"
            />
        </div>
        <div class="simulation-result__card__body">
            <ul>
                <li>
                    <Paragraphe
                        ><span>Durée en années</span
                        ><span>{{ itemResult.year }}</span></Paragraphe
                    >
                </li>
                <li>
                    <Paragraphe
                        ><span>Formule</span
                        ><span>{{ itemResult.creditForm }}</span></Paragraphe
                    >
                </li>
                <li>
                    <Paragraphe
                        ><span>Mensulalité</span
                        ><span
                            >{{
                                separatorHandleFloat(
                                    (+itemResult.monthlyPayment).toFixed(2)
                                )
                            }}
                            €</span
                        ></Paragraphe
                    >
                </li>
                <li>
                    <Paragraphe
                        ><span>TAEG</span
                        ><span
                            >{{
                                separatorHandleFloat(
                                    (+itemResult.taeg).toFixed(2)
                                )
                            }}
                            €</span
                        ></Paragraphe
                    >
                </li>
                <li class="result">
                    <Paragraphe
                        ><span>Coût total du crédit</span
                        ><span
                            >{{
                                separatorHandleFloat(
                                    (+itemResult?.totalCreditAmount).toFixed(2)
                                )
                            }}
                            €</span
                        ></Paragraphe
                    >
                </li>
            </ul>
        </div>
        <div class="simulation-result__card__footer">
            <Button
                @click="!isLoadChoice ? chooseBank() : () => {}"
                :disabled="isLoadChoice"
                type-button="border"
                ><LoadingButton v-if="isLoadChoice" size="xs" theme="dark" />
                <span v-else>CHOISIR</span></Button
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref } from 'vue';
    import FinancialService from '@/services/FinancialService';
    import { useRoute } from 'vue-router';
    import { notification } from 'ant-design-vue';

    const route = useRoute();

    const props = defineProps<{
        havePartener?: boolean;
        itemResult: TypeSimulationResult;
    }>();

    const emit = defineEmits<{
        (fn: 'on-chosen-bank', v: any): void;
    }>();

    const isLoadChoice = ref<boolean>(false);

    async function chooseBank() {
        isLoadChoice.value = true;
        try {
            const { id, ...rest } = props.itemResult;
            let intParsingObj = {};
            Object.keys(rest).forEach((k) => {
                intParsingObj = {
                    ...intParsingObj,
                    [k]: Number.isNaN(+(rest as any)[k])
                        ? (rest as any)[k]
                        : +(rest as any)[k],
                };
            });
            const params = {
                ...intParsingObj,
                theProperty: +route.params.id,
            };
            const { data } = await FinancialService.chooseBank(params);
            emit('on-chosen-bank', data.data);
            notification.success({
                message: 'Votre choix a bien été enregistré.',
            });
        } catch {
            notification.error({
                message: "Une erreur s'est produite. Veuillez réessayer.",
            });
        } finally {
            isLoadChoice.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .simulation-result {
        &__card {
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
                        @apply w-full font-normal text-[12px];
                    }
                }
            }
        }
    }
</style>
