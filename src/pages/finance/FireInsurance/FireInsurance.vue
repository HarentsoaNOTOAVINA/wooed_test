<template>
    <div class="fire-insurance">
        <finance-card label-title="Assurance incendie">
            <div class="fire-insurance__content">
                <div class="fire-insurance__input">
                    <div class="fire-insurance__input--col">
                        <InputDate
                            label="Prochaine échéance"
                            name="expiration"
                        />
                    </div>
                    <div class="fire-insurance__input--col">
                        <Input
                            input-type="number"
                            name-input="estimatedAmount"
                            label="Montant prévisionnel"
                            placeholder="0"
                            unity="€"
                        />
                    </div>
                </div>
                <div class="fire-insurance__checkbox">
                    <CheckBox
                        label="M’envoyer une alerte la veille de l’échéance"
                    />
                </div>
                <div class="fire-insurance__result">
                    <Title type="h3" label="ETAT ACTUEL DE MES DEPENSES" />
                    <hr />
                    <div class="fire-insurance__result--row">
                        <Paragraphe>Depuis le</Paragraphe>
                        <Paragraphe>01 JANVIER 2021</Paragraphe>
                    </div>
                    <div class="fire-insurance__result--row">
                        <Paragraphe>Montant</Paragraphe>
                        <Paragraphe>0€</Paragraphe>
                    </div>
                </div>
            </div>
        </finance-card>
    </div>
</template>
<script setup lang="ts">
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import FinanceCard from '../components/FinanceCard/FinanceCard.vue';
</script>
<style lang="scss" scoped>
    .fire-insurance {
        @apply w-full mt-[10px];
        &__content {
            @apply w-full mt-[10px];
        }
        &__input {
            @apply flex flex-col md:flex-row gap-[10px];
            &--col {
                @apply w-full;
                :deep() {
                    .date__label {
                        @apply mb-[2px]
                    }
                }
            }
        }
        &__checkbox {
            @apply mt-[10px] mb-[10px];
        }
        &__result {
            @apply bg-gray p-[10px];
            border-radius: 8px;
            hr {
                color: #fff;
                @apply mt-[10px] mb-[10px];
            }
            &--row {
                @apply flex justify-between mb-[10px];
            }
        }
    }
</style>
