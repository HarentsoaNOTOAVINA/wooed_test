<template>
    <div>
        <div class="property-tax__items property-tax__amount">
            <Paragraphe class="property-tax__amount-content">
                Montant du précompte immobilier après réduction
            </Paragraphe>
            <span class="property-tax__amount-value">
                {{ separatorHandleFloat(valueAmount) }} €
            </span>
        </div>
        <div class="property-tax__items">
            <div class="property-tax__request-wrap">
                <Paragraphe
                    @click="isShowA = !isShowA"
                    class="property-tax__request"
                >
                    <RoundLink />
                    <span>
                        Demander à l’administration un délai de payement
                    </span>
                    <InfoIcon
                        @click="
                            $emit('on-modal-handled', 'paymentPlan', $event)
                        "
                    />
                </Paragraphe>
                <Transition name="fadeHeight">
                    <div v-if="isShowA" class="property-tax__form-request">
                        <div class="property-tax__field-wrap">
                            <div class="property-tax__form-item-wrap">
                                <label>
                                    <span> Demande introduite le </span>
                                </label>
                                <InputDate
                                    @handleDateFormat="
                                        handleDate($event, 'deadline')
                                    "
                                    name="paymentDeadlineDemandSubmittedOn"
                                    class="property-tax__form-item"
                                />
                            </div>
                            <div class="property-tax__form-item-wrap">
                                <label>
                                    <span> La réduction expirera le </span>
                                </label>
                                <InputDate
                                    @handleDateFormat="
                                        handleDate($event, 'deadline')
                                    "
                                    name="paymentDeadlineReductionExpireOn"
                                    class="property-tax__form-item"
                                />
                            </div>
                        </div>
                        <!-- <div class="property-tax__form-item-wrap">
                            <label>
                                <span>
                                    Je dois conserver mon domicile principal
                                    dans le bien jusqu’au
                                </span>
                            </label>
                            <InputDate
                                @handleDateFormat="handleDate"
                                name="keepHome"
                                class="property-tax__form-item"
                            />
                        </div> -->
                        <div class="property-tax__form-item-wrap">
                            <CheckBox
                                label="M’envoyer une alerte 6 mois avant l’échéance"
                            />
                        </div>
                        <div class="flex justify-end mt-[10px]">
                            <Button @click="handleDemande('deadline')">
                                <LoadingButton
                                    size="xs"
                                    v-if="
                                        isLoadDemand && currentType === 'deadline'
                                    "
                                />
                                Envoyer</Button
                            >
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="property-tax__request-wrap">
                <Paragraphe
                    @click="isShowB = !isShowB"
                    class="property-tax__request"
                >
                    <RoundLink />
                    <span>
                        Demander à l’administration un plan de payement
                    </span>
                    <InfoIcon
                        @click="
                            $emit('on-modal-handled', 'paymentPlan', $event)
                        "
                    />
                </Paragraphe>
                <Transition name="fadeHeight">
                    <div v-if="isShowB" class="property-tax__form-request">
                        <div class="property-tax__field-wrap">
                            <div class="property-tax__form-item-wrap">
                                <label>
                                    <span> Demande introduite le </span>
                                </label>
                                <InputDate
                                    @handleDateFormat="
                                        handleDate($event, 'plan')
                                    "
                                    name="paymentPlanDemandSubmittedOn"
                                    class="property-tax__form-item"
                                />
                            </div>
                            <div class="property-tax__form-item-wrap">
                                <label>
                                    <span> La réduction expirera le </span>
                                </label>
                                <InputDate
                                    @handleDateFormat="
                                        handleDate($event, 'plan')
                                    "
                                    name="paymentPlanReductionExpireOn"
                                    class="property-tax__form-item"
                                />
                            </div>
                        </div>
                        <!-- <div class="property-tax__form-item-wrap">
                            <label>
                                <span>
                                    Je dois conserver mon domicile principal
                                    dans le bien jusqu’au
                                </span>
                            </label>
                            <InputDate
                                @handleDateFormat="handleDate"
                                name="keepHome"
                                class="property-tax__form-item"
                            />
                        </div> -->
                        <div class="property-tax__form-item-wrap">
                            <CheckBox
                                label="M’envoyer une alerte 6 mois avant l’échéance"
                            />
                        </div>
                        <div class="flex justify-end mt-[10px]">
                            <Button @click="handleDemande('plan')">
                                <LoadingButton
                                    size="xs"
                                    v-if="
                                        isLoadDemand && currentType === 'plan'
                                    "
                                />
                                Envoyer</Button
                            >
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import useCmp from '../useCmp';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRoute } from 'vue-router';
    import PrecompteService from '@/services/PrecompteServices';
    import { notification } from 'ant-design-vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const route = useRoute();
    const isLoadDemand = ref<boolean>(false);
    const currentType = ref<string>('');
    interface TypesDemande {
        paymentPlanDemandSubmittedOn: string;
        paymentPlanReductionExpireOn: string;
        paymentDeadlineDemandSubmittedOn: string;
        paymentDeadlineReductionExpireOn: string;
    }
    const deadlineDemand = ref<TypesDemande>();
    const planDemand = ref<TypesDemande>();

    function handleDate(date: any, type: string) {
        if (type === 'plan') {
            planDemand.value = {
                ...planDemand.value,
                ...date,
            };
        } else {
            deadlineDemand.value = {
                ...deadlineDemand.value,
                ...date,
            };
        }
    }

    async function handleDemande(type: string) {
        currentType.value = type;
        console.log('type', type);
        isLoadDemand.value = true;
        let dataToPost: any =
            type === 'plan' ? planDemand.value : deadlineDemand.value;
        try {
            const res = await PrecompteService.putPrecompte(
                dataToPost,
                route.params.id as string
            );
            console.log(res, 'RESULT');
            notification['success']({
                message: 'Demande envoyée',
            });
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
            });
        } finally {
            isLoadDemand.value = false;
        }
    }

    let {
        CheckBox,
        InfoIcon,
        InputDate,
        Paragraphe,
        RoundLink,
        Transition,
    }: any = useCmp();
    defineProps<{
        valueAmount: string | number;
    }>();
    const isShowA = ref<boolean>(false);
    const isShowB = ref<boolean>(false);
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    @import '@/assets/style/precompte.scss';
</style>
