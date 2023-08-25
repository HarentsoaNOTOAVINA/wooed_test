<template>
    <FinanceCard :financial-help="true" label-title="Abattement" label-button="Enregistrer" :disableSubmitButton="!formCompleted" @submit-form="submitForm">
        <div class="financial-help__content">
            <Input class="financial-help__content__invoice" label="Montant" :disabled="true" :value="'000'" unity="€" />
            <span class="financial-help__content__title">Condition d'octroi</span>
            <hr class="__hr__on-mobile" />
            <p class="financial-help__content__title__description">
                Domiciliation dans le bien dans les 3 ans de la signature de
                l’acte d’acquisition
            </p>
            <hr class="__hr" />

            <InputDate class="financial-help__content__acquisition-date" label="Date d'acquisition du bien"
                name="acquisitionDate" @handle-date-format="handleDate" />

            <div class="financial-help__content__domiciliation">
                <span class="financial-help__content__domiciliation__title">Date de domiciliation dans le bien</span>

                <div class="financial-help__content__domiciliation__date-items">
                    <InputDate class="financial-help__content__domiciliation__date-items__effective"
                        label="Date effective" name="domiciliationEffectiveDate"
                        @handle-date-format="handleDate" />
                    <FormValue class="financial-help__content__domiciliation__date-items__ultime"
                        :label-title="'Date ultime'" :label-value="'00/00/00'" :icon="'Calendar'" />
                </div>

                <div class="financial-help__content__domiciliation__checkboxes">
                    <CheckBox :return-boolean="true" label="M’envoyer une alerte 1 an avant l’échéance" />
                    <CheckBox :return-boolean="true" @click="setNotMeetDateAcquisition"
                        :label="notMeetConditions.acquisitionDate" />
                </div>
                <transition name="fade">
                    <div v-show="hiddenButton" class="financial-help__content__domiciliation__hidden-section">
                        <Button @click="toggleModal" type-button="primary">
                            Demander
                        </Button>
                        <div class="financial-help__content__domiciliation__hidden-section__description">
                            Demander à l’administration d’être exempté du
                            remboursement du montant de l’abattement
                        </div>
                    </div>
                </transition>
                <div class="financial-help__content__domiciliation__description">
                    Maintien de la résidence principale dans le bien pendant 3
                    ans à compter de la date de domiciliation
                </div>
            </div>

            <hr class="__hr" />

            <div class="financial-help__content__expiration">
                <span class="financial-help__content__expiration__title">
                    Fin du délai de maintien obligatoire de la résidence
                    principale dans le bien
                </span>
                <div class="financial-help__content__expiration__date-items">
                    <FormValue class="financial-help__content__expiration__date-items__effective"
                        :label-title="'Date effective'" :label-value="'00/00/00'" :icon="'Calendar'" />
                    <FormValue class="financial-help__content__expiration__date-items__ultime"
                        :label-title="'Date ultime'" :label-value="'00/00/00'" :icon="'Calendar'" />
                </div>
            </div>
            <div class="text-gray-icon">
                <CheckBox :return-boolean="true" label="M’envoyer une alerte 1 an avant l’échéance" />
                <CheckBox :return-boolean="true" @click="setNotMeetDateDomiciliation"
                    :label="notMeetConditions.domiciliationDate" />
            </div>
        </div>
        <FinancialHelpModal :is-show="showModal" @close-modal="toggleModal" @upload-file="uploadFileToStore"
            @set-reason-value="setReason" />
    </FinanceCard>
</template>
<script lang="ts" setup>
import FinanceCard from '../components/FinanceCard/FinanceCard.vue';
import Input from '@/components/Common/Input/Input.vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import Button from '@/components/Common/Button/Button.vue';
import FinancialHelpModal from './FinancialHelpModal.vue';
import FormValue from '../components/FormValue/FormValue.vue';
import checkRegion from '@/utils/check_region/checkRegion';

import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { notification } from 'ant-design-vue';

const store = useStore();

let showModal = ref<boolean>(false);
let hiddenButton = ref<boolean>(false);

const region = ref<string>('');

const payload = ref<{
    theProperty: number;
    region: string;
    acquisitionDate: string;
    domiciliationEffectiveDate: string;
    didNotMeetDateAcquisition: boolean;
    didNotMeedDateDomiciliation: boolean;
    reduction: number;
    reason: string;
    requestRepaymentFiles: Array<object>;
}>({
    theProperty: 0,
    region: '',
    acquisitionDate: '',
    domiciliationEffectiveDate: '',
    didNotMeetDateAcquisition: false,
    didNotMeedDateDomiciliation: false,
    reduction: 0,
    reason: '',
    requestRepaymentFiles: [],
});

const props = defineProps({
    propertyId: {
        type: [String, Number],
    },
});

const emit = defineEmits<{
    (e: 'uploadFinal', value: any): void;
}>();

let formCompleted = ref<boolean>(false);

const notMeetConditions = computed(() =>{
    switch (payload.value.region) {
        case 'Bruxelles':
            return { 
                acquisitionDate: 'Je n’ai pas respecté le délai de 2 ans', 
                domiciliationDate: 'Je n’ai pas respecté le délai de 5 ans'
            }
        case "Région Wallonne":
            return {
                acquisitionDate: 'Je n’ai pas respecté le délai de 3 ans', 
                domiciliationDate: 'Je n’ai pas respecté le délai de 3 ans'
            }
        default:
            return {
                acquisitionDate: 'Je n’ai pas respecté le délai de 3 ans', 
                domiciliationDate: 'Je n’ai pas aliéné le bien dont je suis propriétaire dans le délai de 2 ans'
            }
    }
})

onMounted(() => {
    getRegion()
})

watch(
    () => showModal.value,
    (value) => {
        showModal.value = value;
    },
    { immediate: true, deep: true }
);

watch(
    () => props.propertyId,
    (value) => {
        fetchPropertyInfo(value);
    },
    { immediate: true, deep: true }
);

watch(
    () => payload.value,
    (value) => {
        store.dispatch('FinancialModule/updateFinancialHelpDetail', {
            ...value,
        });
    },
    { immediate: true, deep: true }
);

function getRegion() {
    region.value = store.getters['FinancialModule/getChoosenProperty'].codeRegion;
}

const handleDate = (value: any) => {
    payload.value = { ...payload.value, ...value };
    if (payload.value.acquisitionDate !== '' && payload.value.domiciliationEffectiveDate !== ''){
        formCompleted.value = true;
    }
}

function toggleModal(value: any) {
    showModal.value = value;
}

function setNotMeetDateAcquisition(value: any) {
    hiddenButton.value = !hiddenButton.value;
    payload.value = { ...payload.value, didNotMeetDateAcquisition: value };
}

function setNotMeetDateDomiciliation(value: any) {
    payload.value = {
        ...payload.value,
        didNotMeedDateDomiciliation: value,
    };
}

async function fetchPropertyInfo(id: any) {
    await store.dispatch('FinancialModule/setListMyProperty');
    let data = computed(
        () => store.getters['FinancialModule/getListMyProperty']
    );
    let currentProperty = data.value.filter((element: any) => {
        return element.id.toString() === id;
    })[0];
    payload.value = {
        ...payload.value,
        region: region.value,
        theProperty: Number(id),
    };
}
function uploadFileToStore(data: any) {
    payload.value.requestRepaymentFiles.push(data);
}

function setReason(value: any) {
    payload.value = { ...payload.value, reason: value }
}

async function submitForm() {
    try {
        const response = await store.dispatch('FinancialModule/submitFinancialHelpDetail');
        console.log(response);
    } catch (error) {
        notification.error({message: `Veuillez verifier les champs `})
    }
    
}
</script>
<style lang="scss" scoped>
.financial-help {
    &__content {
        &__title {
            @apply block font-semibold mb-[14px];

            @screen md {
                @apply mb-6;
            }

            &__description {
                @apply text-xs text-primary my-[18px];

                @screen md {
                    @apply text-sm;
                }
            }
        }

        &__invoice {
            @apply mt-3.5;
        }

        &__acquisition-date {
            @apply w-full;
        }

        &__domiciliation {
            @apply my-3.5;

            &__title {
                @apply block w-full font-semibold mb-3.5;
            }

            &__date-items {
                @screen md {
                    @apply flex flex-wrap;
                }

                &__effective {
                    @apply w-full mb-3.5;

                    @screen md {
                        @apply w-1/2 pr-4;
                    }
                }

                &__ultime {
                    @apply w-full mb-3.5;

                    @screen md {
                        @apply w-1/2 pl-4;
                    }
                }
            }

            &__description {
                @apply text-xs text-primary my-[18px];

                @screen md {
                    @apply text-sm;
                }
            }

            &__hidden-section {
                @apply flex items-center mt-3.5;

                &__description {
                    @apply text-xs font-thin ml-2;

                    @screen md {
                        @apply text-sm;
                    }
                }
            }
        }

        &__expiration {
            @apply my-3.5;

            &__title {
                @apply my-3.5 block font-semibold;
            }

            &__date-items {
                @screen md {
                    @apply flex flex-wrap;
                }

                &__effective {
                    @apply w-full mb-3.5;

                    @screen md {
                        @apply w-1/2 pr-4 mb-0;
                    }
                }

                &__ultime {
                    @apply w-full;

                    @screen md {
                        @apply w-1/2 pl-4;
                    }
                }
            }
        }
    }
}

.__hr {
    @apply my-3.5 text-gray;

    &__on-mobile {
        @apply text-gray;

        @screen md {
            @apply hidden;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
