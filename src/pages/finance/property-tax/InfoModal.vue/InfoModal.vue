<script lang="ts" setup>
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { computed, PropType, watch } from 'vue';
    import ChildOpening from './InfoModalContent.vue/ChildOpening.vue';
    import ModesteHouse from './InfoModalContent.vue/ModesteHouse.vue';
    import PaymentPlan from './InfoModalContent.vue/PaymentPlan.vue';
    import WarInvalid from './InfoModalContent.vue/WarInvalid.vue';
    import WellRated from './InfoModalContent.vue/WellRated.vue';
    import ModesteHouseFlanders from './InfoModalContent.vue/ModesteHouseFlanders.vue';
    import WarInvalidFlanders from './InfoModalContent.vue/WarInvalidFlanders.vue';
    import ChildOpeningFlanders from './InfoModalContent.vue/ChildOpeningFlanders.vue';
    import EfficientBuildingFlanders from './InfoModalContent.vue/EfficientBuildingFlanders.vue';
    import EfficientBuildingOptions from './InfoModalContent.vue/EfficientBuildingOptions.vue';
    import PropertyNotBuild from './InfoModalContent.vue/PropertyNotBuild.vue';
    import IsUnproductivityDuration from './InfoModalContent.vue/IsUnproductivityDuration.vue';
    import WarVictim from './InfoModalContent.vue/WarVictim.vue';
    import RentedByAgencySubletting from './InfoModalContent.vue/RentedByAgencySubletting.vue';
    import Flanders_1 from './InfoModalContent.vue/Exception/Flanders_1.vue';
    import Flanders_2 from './InfoModalContent.vue/Exception/Flanders_2.vue';
    import Flanders_3 from './InfoModalContent.vue/Exception/Flanders_3.vue';
    import Flanders_4 from './InfoModalContent.vue/Exception/Flanders_4.vue';
    import InvalidChildDepWal from './InfoModalContent.vue/InvaliChildDepWal.vue';
    import InvalidPersonDepWal from './InfoModalContent.vue/InvalidPersonDepWal.vue';
    import ChildDepWal from './InfoModalContent.vue/ChildDepWal.vue';

    const emit = defineEmits(['close-modal', 'on-choose-eb']);

    const props = defineProps({
        isShow: {
            type: Boolean,
            default: false,
        },
        modalType: {
            type: String,
            default: '',
            required: true,
        },
        currentSelectedEfficientBlding: {
            type: Object as PropType<{
                value: number | string;
                label: string;
                id: string;
                child?:
                    | null
                    | {
                          id: number;
                          max_1: string;
                          max_2: string;
                          reduction: string;
                          duration: string;
                          value: number;
                      }[];
            }>,
            default: null,
            required: false,
        },
    });

    const modalTitle = computed(() => {
        switch (props.modalType) {
            case 'modesteHouse':
                return 'Maison modeste';
            case 'wellRated':
                return 'wellRated';
            case 'warInvalid':
                return 'Personne/enfant handicapé(e) ou invalide de guerre';
            case 'childOpening':
                return 'Enfants ouvrant le droit aux allocations familiales';
            case 'paymentPlan':
                return 'Payement';
            // FLANDRE
            case 'modesteHouseFlanders':
                return 'Bescheiden huis';
            case 'warInvalidFlanders':
                return 'Gehandicapt persoon';
            case 'warInvalidFlanders':
                return 'Kinderen die in aanmerking komen voor kinderbijslag';
            case 'efficientBuildingFlanders':
                return 'Energiezuinige gebouwen';
            case 'efficientBuildingOptions':
                return (props.currentSelectedEfficientBlding as any).label;
            case 'propertyNotBuild':
                return 'Bien non bâtis situés dans une « VEN-gebied »';
            case 'isUnproductivityDuration':
                return 'Immeuble « improductif »';
            case 'warVictim':
                return 'Victimes de guerres';
            case 'rentedByAgencySubletting':
                return 'woningen die door een erkend sociaal verhuurkantoor worden gehuurd om doorverhuurd te worden';
            case 'flanders_1':
                return 'verbouwing van een handelspand in een winkelarm gebied';
            case 'flanders_2':
                return 'verbouwing van een handelspand in kernwinkelgebied';
            case 'flanders_3':
                return 'sloop en vervanging van een ongeschikte of onbewoonbare woning';
            case 'flanders_4':
                return 'sloop en vervanging van een leegstaande of verwaarloosde bedrijfsruimte';
            case 'invalidChildDepWal':
                return 'Enfant handicapé à charge';
            case 'invalidPersonDepWal':
                return 'Personne handicapée à charge';
            case 'childDepWal':
                return 'Enfants à charge';
            default:
                break;
        }
    });

    function hideModal() {
        emit('close-modal', false);
    }

    function handleChooseEb(emittedValue: any) {
        emit('on-choose-eb', emittedValue);
        hideModal();
    }
</script>

<template>
    <Modal :is-show-modal="isShow" @on-back="hideModal" :title="modalTitle">
        <template #content>
            <div class="infoModal__section">
                <ModesteHouse v-if="modalType === 'modesteHouse'" />
                <WellRated v-else-if="modalType === 'wellRated'" />
                <WarInvalid v-else-if="modalType === 'warInvalid'" />
                <ChildOpening v-else-if="modalType === 'childOpening'" />
                <PaymentPlan v-else-if="modalType === 'paymentPlan'" />
                <ModesteHouseFlanders
                    v-else-if="modalType === 'modesteHouseFlanders'"
                />
                <WarInvalidFlanders
                    v-else-if="modalType === 'warInvalidFlanders'"
                />
                <WarInvalidFlanders
                    v-else-if="modalType === 'warInvalidFlanders'"
                />
                <ChildOpeningFlanders
                    v-else-if="modalType === 'childOpeningFlanders'"
                />
                <EfficientBuildingFlanders
                    v-else-if="modalType === 'efficientBuildingFlanders'"
                />
                <EfficientBuildingOptions
                    :current-selected-efficient-blding="
                        currentSelectedEfficientBlding
                    "
                    @on-choose-eb="handleChooseEb"
                    v-else-if="modalType === 'efficientBuildingOptions'"
                />
                <PropertyNotBuild
                    v-else-if="modalType === 'propertyNotBuild'"
                />
                <IsUnproductivityDuration
                    v-else-if="modalType === 'isUnproductivityDuration'"
                />
                <WarVictim v-else-if="modalType === 'warVictim'" />
                <RentedByAgencySubletting
                    v-else-if="modalType === 'rentedByAgencySubletting'"
                />
                <Flanders_1 v-else-if="modalType === 'flanders_1'" />
                <Flanders_2 v-else-if="modalType === 'flanders_2'" />
                <Flanders_3 v-else-if="modalType === 'flanders_3'" />
                <Flanders_4 v-else-if="modalType === 'flanders_4'" />
                <InvalidChildDepWal
                    v-else-if="modalType === 'invalidChildDepWal'"
                />
                <InvalidPersonDepWal
                    v-else-if="modalType === 'invalidPersonDepWal'"
                />
                <ChildDepWal v-else-if="modalType === 'childDepWal'" />
            </div>
        </template>
    </Modal>
</template>
<style lang="scss" scoped>
    .infoModal__section {
        &:deep() {
            .infoModal {
                &__container {
                    h2 {
                        font-weight: 600;
                        font-size: 12px;
                        line-height: 15px;
                        @apply mb-[10px];
                        @screen md {
                            font-size: 14px;
                            line-height: 17px;
                        }
                    }
                }
                &__items {
                    @apply mb-[14px];
                    @screen md {
                        @apply mb-[18px];
                    }
                }
                &__subtitle {
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 18px;
                    @apply text-primary mb-[12px];
                    @screen md {
                        font-size: 14px;
                        line-height: 20px;
                        @apply mb-[14px];
                    }
                }
                &__content {
                    font-weight: 300;
                    font-size: 12px;
                    line-height: 18px;
                    @screen md {
                        font-size: 14px;
                        line-height: 17px;
                    }
                }
                &__list--items {
                    @apply pl-[20px];
                }
                &__list--content {
                    @apply relative mb-[5px];
                    &:before {
                        content: '';
                        font-size: 30px;
                        vertical-align: middle;
                        @apply absolute top-[9px] -left-[10px] bg-black w-[3px] h-[3px] rounded-full;
                    }
                }
            }
        }
    }
</style>
