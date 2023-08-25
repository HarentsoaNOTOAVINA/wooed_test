<template>
    <div v-if="relativeWork && supplier">
        <ModalWapper
            :is-show-modal="isShowModal"
            @on-close-modal="isShowModal = false"
            :modal-name="subWork"
            :additional-button-info="additionalButtonInfo"
        />
        <!-- TABLEAU DE TYPE COMPLEXE -->
        <div style="overflow-x: auto" v-if="type === 'complexe'">
            <!-- DESKTOP -->
            <ComplexeDesc
                :sub-work="subWork"
                :chose-work="choseWork"
                :has-selected-work="hasSelectedWork"
                :is-load-work="isLoadWork"
                :relative-work="relativeWork"
                :supplier="supplier"
                :work-chose="workChose"
            />
            <!-- MOBILE -->
            <ComplexeMobile
                :sub-work="subWork"
                :chose-work="choseWork"
                :has-selected-work="hasSelectedWork"
                :is-load-work="isLoadWork"
                :relative-work="relativeWork"
                :supplier="supplier"
                :work-chose="workChose"
            />
        </div>

        <!-- TABLEAU DE TYPE SIMPLE -->
        <div style="overflow-x: auto" v-if="type === 'simple'">
            <!-- DESKTOP -->
            <SimpleDesc
                :sub-work="subWork"
                :chose-work="choseWork"
                :has-selected-work="hasSelectedWork"
                :is-load-work="isLoadWork"
                :relative-work="relativeWork"
                :supplier="supplier"
                :work-chose="workChose"
            />
            <!-- MOBILE -->
            <SimpleMobile
                :sub-work="subWork"
                :chose-work="choseWork"
                :has-selected-work="hasSelectedWork"
                :is-load-work="isLoadWork"
                :relative-work="relativeWork"
                :supplier="supplier"
                :work-chose="workChose"
            />
        </div>

        <div class="operation">
            <Button @click="handleRedirection" class="operation__btn"
                >Informations</Button
            >
            <template v-if="subWork === 'Déplacer le compteur'">
                <Button
                    @click="handleRedirection('classique')"
                    class="operation__btn"
                >
                    Je dispose d’un compteur classique
                </Button>
                <Button
                    @click="handleRedirection('digital')"
                    class="operation__btn"
                >
                    Je dispose d'un compteur digital
                </Button>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import { computed, PropType, ref, watch, onMounted } from 'vue';
    import ModalWapper from '../Gas/MeterWork/Modal/ModalWrapper.vue';
    import { notification } from 'ant-design-vue';
    import SupplierServices from '@/services/supplierService';
    import ComplexeDesc from './Table/Complexe/Desc.vue';
    import ComplexeMobile from './Table/Complexe/Mobile.vue';
    import SimpleDesc from './Table/Simple/Desc.vue';
    import SimpleMobile from './Table/Simple/Mobile.vue';
    import store from '@/store';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);
    const hasSelectedWork = ref<boolean>(false);
    const isShowModal = ref<boolean>(false);

    const workChose = ref<any>({});

    const props = defineProps({
        type: {
            type: String,
            default: 'simple',
        },
        relativeWork: {
            type: Object as PropType<any>,
        },
        supplier: {
            type: String,
        },
        workType: {
            type: String,
        },
    });

    const subWork = computed(() => props.relativeWork.key);

    const energyTypeStored = computed(
        () => store.getters['SupplierModule/getEnergyType']
    );

    const additionalButtonInfo = ref<string>('');
    const isLoadWork = ref<boolean>(false);
    const isLoadPersistedWork = ref<boolean>(false);

    onMounted(() => {
        getSelectedWork();
    });

    watch(
        () => props.relativeWork,
        (v) => {
            v ? console.log(v) : console.log('no response');
        },
        { immediate: true }
    );

    async function getSelectedWork() {
        isLoadPersistedWork.value = true;
        try {
            const { data, code } = await SupplierServices.getRelativeWork({
                energyType: energyTypeStored,
                theProperty: theProperty.value,
            });
            console.log(data, 'RESULT');
            if (code === 200) {
                hasSelectedWork.value = true;
            }
        } catch (error) {
        } finally {
            isLoadPersistedWork.value = false;
        }
    }

    function handleRedirection(info?: string) {
        if (info && typeof info === 'string') {
            additionalButtonInfo.value = info;
            isShowModal.value = true;
        } else {
            const link =
                props.relativeWork.linkRedirection[props.supplier as string];
            if (link !== 'isModal') {
                window.open(link, '_blank');
            } else {
                isShowModal.value = true;
            }
        }
    }

    async function choseWork(work: {
        costWork?: number;
        caracteristicWork?: string;
        idx?: number;
    }) {
        hasSelectedWork.value = false;
        const parsedWork = {
            ...work,
            typeWork: props.workType,
            typeSubwork: subWork.value,
            energyType: energyTypeStored,
            theProperty: theProperty.value,
        };
        workChose.value = parsedWork;
        isLoadWork.value = true;
        try {
            const data = await SupplierServices.updateRelativeWork(parsedWork);
            hasSelectedWork.value = true;
        } catch (error) {
            notification.error({
                message: 'Une erreur est survenue, veuillez reesayez',
            });
        } finally {
            isLoadWork.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/style/supplier.scss';
</style>
