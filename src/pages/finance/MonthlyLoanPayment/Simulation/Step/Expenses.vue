<template>
    <div class="simulation-step">
        <Title type="h3" label="DEPENSES" />
        <hr />
        <Input
            @input="handleEntry"
            placeholder="0.00 €"
            label="Dépenses locatives (uniquement si vous êtes locataire d'une maison, d'un garage, ...)"
            name-input="locativeDepense"
            input-type="number"
        />
        <Switch
            @handle-switch="handleEntry"
            item-label="Avez-vous d'autres dépenses (pension alimentaire),
                            contrat de leasing privé de votre voiture ou
                            d'autres plans de remboursement (hors crédits
                            bancaires)?"
            name="otherDepense"
            class="mb-[20px]"
        />
        <transition appear mode="out-in" name="fade-appear">
            <div v-if="params.otherDepense">
                <div class="simulation-step__info">
                    <InfoIcon />
                    <Paragraphe
                        >Additionnez les montants mensuels de vos autres revenus
                        et indiquez le montant total. Les revenus locatifs, les
                        allocations familiales et les revenus d'une activité
                        complémentaire ne doivent pas être inclus.</Paragraphe
                    >
                </div>
                <Input
                    @input="handleEntry"
                    placeholder="0.00 €"
                    label="Montant"
                    name-input="otherDepenseAmount"
                    input-type="number"
                />
                <div class="simulation-step__info">
                    <InfoIcon />
                    <Paragraphe
                        >Indiquez ici les autres dépenses que vous avez
                        additionnées.</Paragraphe
                    >
                </div>
                <TextArea
                    @handle-change="handleEntry"
                    placeholder="0.00 €"
                    label="Montant"
                    name-input="otherDepenseType"
                    input-type="number"
                    class="mb-[20px]"
                />
            </div>
        </transition>
        <Input
            @input="handleEntry"
            placeholder="Entrez le nombre d'emprunt"
            label="Combien d'emprunts avez-vous?"
            name-input="loanNb"
            input-type="number"
        />
        <transition appear mode="out-in" name="fade-appear">
            <div
                v-if="
                    !!params.loanNb &&
                    (params.loanNb !== '0' || params.loanNb !== 0)
                "
                class="simulation-step__col"
            >
                <Input
                    @input="handleEntry"
                    placeholder="0.00 €"
                    label="Montant des mensualités"
                    name-input="monthlyPaymentsAmount"
                    input-type="number"
                />
                <Input
                    @input="handleEntry"
                    placeholder="0.00 €"
                    label="Montant encore à rembourser"
                    name-input="repaidAmount"
                    input-type="number"
                />
            </div>
        </transition>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import { ref, watch } from 'vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    const params = ref<any>({});

    const emit = defineEmits<{
        (fn: 'on-handle-params', v: any): void;
    }>();

    watch(
        () => params.value,
        (v) => {
            emit('on-handle-params', v);
        }
    );

    function handleEntry(evt: any) {
        const [name, value] = Object.entries(evt)[0];
        switch (name) {
            case '':
                break;
            default:
                paramsDefaultAssignation(evt);
                break;
        }
    }
    function paramsDefaultAssignation(
        obj?: any,
        defaultParams: any = params.value
    ) {
        params.value = {
            ...defaultParams,
            ...obj,
        };
    }
</script>
<style lang="scss" scoped>
    .simulation-step {
        &__info {
            @apply p-[10px] rounded-[8px] bg-gray;
            &:deep() {
                .paragraphe__normal {
                    @apply italic text-[11px];
                }
                path:first-child {
                    @apply fill-[var(--color-stroke-gray)];
                }
                path:last-child {
                    @apply fill-[var(--color-gray-icon)];
                }
            }
        }
        &__col {
            @apply md:grid grid-cols-2 gap-[10px];
            &:deep() {
                .date__space {
                    @apply gap-[9px];
                }
            }
        }
        .fade-appear-enter-active,
        .fade-appear-leave-active {
            @apply transition-all;
        }
        .fade-appear-enter-from,
        .fade-appear-leave-to {
            @apply translate-x-[-200px];
        }
    }
</style>
