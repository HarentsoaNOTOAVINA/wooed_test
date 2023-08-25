<template>
    <div class="result">
        <div class="z-20">
            <!-- VENTE -->
            <div class="result__price" v-if="!isCredit">
                <div class="result__price__elt">
                    <Paragraphe class="result__price__elt__label"
                        >Montant global :</Paragraphe
                    >
                    <Paragraphe class="result__price__elt__amount">
                        <span>{{
                            separatorHandleFloat(
                                saleResult?.provision.toFixed(
                                    2
                                ) as string
                            )
                        }}</span>
                        <span>€</span>
                    </Paragraphe>
                </div>
            </div>
            <!-- CREDIT -->
            <div class="result__price" v-else>
                <div class="result__price__elt">
                    <Paragraphe class="result__price__elt__label"
                        >Montant principal</Paragraphe
                    >
                    <Paragraphe class="result__price__elt__amount">
                        <span>{{
                            separatorHandleFloat(creditResult?.provision as number)
                        }}</span>
                        <span>€</span>
                    </Paragraphe>
                </div>
            </div>

            <hr class="__hr" />

            <div class="result__actions">
                <transition name="fade-export" mode="out-in">
                    <Button
                        @click="generatePDF"
                        v-if="isViewChart"
                        type-button="secondary"
                        ><DocPdf /> Exporter(pdf)
                        <LoadingButton
                            v-if="isLoadUploadPDF"
                            class="load-pdf"
                            size="xs"
                    /></Button>
                </transition>
                <Button
                    @click="isViewChart = !isViewChart"
                    theme="light"
                    type-button="secondary"
                    ><Eye v-if="!isViewChart" />
                    <EyeSlash v-else /> Visulaliser</Button
                >
            </div>
        </div>
        <transition mode="out-in" name="fade-chart">
            <div v-if="isViewChart" id="result-view">
                <ChartView
                    :sale-result="saleResult"
                    :credit-result="creditResult"
                    :is-credit="isCredit"
                />
            </div>
        </transition>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import DocPdf from '@/components/Icon/DocPdf.vue';
    import Eye from '@/components/Icon/Eye.vue';
    import EyeSlash from '@/components/Icon/EyeSlash.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { PropType, ref, onMounted } from 'vue';
    import ChartView from './ChartView.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const isViewChart = ref<boolean>(false);

    const isLoadUploadPDF = ref<boolean>(false);

    const props = defineProps({
        isCredit: {
            type: Boolean,
            default: false,
        },
        saleResult: {
            type: Object as PropType<TypesSaleResult>,
        },
        creditResult: {
            type: Object as PropType<TypeCreditResult>,
        },
    });

    function generatePDF() {
        isLoadUploadPDF.value = true;
        const opt = {
            margin: [0, 10, 0, 10],
            filename: 'Resultat_vente.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { dpi: 192, scale: 2, letterRendering: true },
            pagebreak: { mode: 'avoid-all' },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        };
        const worker = new (window as any).html2pdf.Worker(opt);
        worker
            .from(document.getElementById('result-view'))
            .save()
            .then(() => {
                isLoadUploadPDF.value = false;
            });
    }
</script>
<style lang="scss" scoped>
    .result {
        .fade-chart-enter-active,
        .fade-chart-leave-active {
            transition: all 0.3s ease;
        }
        .fade-chart-enter-from,
        .fade-chart-leave-to {
            transform: translateX(-300px);
            opacity: 0;
        }
        .fade-export-enter-active,
        .fade-export-leave-active {
            transition: all 0.3s ease;
        }
        .fade-export-enter-from,
        .fade-export-leave-to {
            transform: scale(0);
            opacity: 0;
        }
        .__hr {
            @apply text-[var(--color-gray)] my-[20px];
        }
        &__price {
            &__elt {
                @apply mb-[10px];
                &__label {
                    @apply font-medium;
                }
                &__amount {
                    @apply bg-gray p-[10px] rounded-[4px] font-medium flex justify-between items-center;
                    span:last-child {
                        @apply text-[18px];
                    }
                }
            }
        }
        &__actions {
            .load-pdf {
                &:deep() {
                    svg {
                        @apply h-[20px];
                    }
                }
            }
            @apply flex flex-col gap-[10px] md:flex-row justify-end;
            &:deep() {
                button {
                    @apply w-full flex items-center justify-center gap-[10px] min-h-[36px];
                }
            }
        }
    }
</style>
