<template>
    <div class="work-tank">
        <div>
            <BackButton @return="onPrevious" text="Retour" />
        </div>
        <component
            :is="activeComp[activeComp.length - 1]"
            :dataTankMenu="menuData"
            :dataDemand="props.dataDemand"
            :paramsCost="props.dataDemand"
            :demandData="props.dataDemand"
            :obliData="dataObli"
            :dataPublish="props.dataDemand"
            @changeFromObli="changeFromObli"
            @changeCompUntank="changeCompUntank"
            @respondDone="respondDone"
            @changeComponent="untankChangeComps"
        />

        <Modal
            width="700"
            title="Ajout controle"
            :isShowModal="isShowModal"
            @onBack="onCloseModal"
        >
            <template #content>
                <AddControl
                    :demandData="props.dataDemand"
                    :obliData="dataObli"
                />
            </template>
        </Modal>
        <!-- <div v-if="step > 1" class="work-tank__btnContainer">
            <Button @on-click="onPrevious" typeButton="border">Prcedent</Button>
            <Button @on-click="onNext" typeButton="gray">Suivant</Button>
        </div> -->
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import LeaveTank from '../LeaveTank/LeaveTank.vue';
    import EvacuateForm from '../EvacuateForm/EvacuateForm.vue';
    import AddControl from '../AddControl/AddControl.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import ListExpert from '../ListExpert/ListExpert.vue';
    import DemanAuthorityForm from '../DemandAuthorityForm/DemanAuthorityForm.vue';
    import UntankDemand from '../UntankDemand/UntankDemand.vue';
    import MenuTanksWork from '../MenuTanksWork/MenuTanksWork.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import ObliMenu from '../ObliMenu/ObliMenu.vue';
    import MenuUnTankType from '../MenuUnTankType/MenuUnTankType.vue';
    import MailAuthority from '../MailAuthority/MailAuthority.vue';
    import CalculateCost from '../CalculateCost/CalculateCost.vue';
    import SoilReconMenu from '../SoilReconMenu/SoilReconMenu.vue';
    import { menuData } from './data';

    const props = defineProps(['dataDemand', 'obliData']);

    const emit = defineEmits(['prevFromUntank']);

    onMounted(() => {
        console.log('data demandssssssssssssss:', props.dataDemand);
        console.log('activ comp from untank:', activeComp.value);
        console.log('obli data:', props.obliData);
    });

    let activeComp = ref<Array<any>>([MenuTanksWork]);
    let step = ref<number>(0);
    let isResponseDone = ref<boolean>(false);
    let isShowModal = ref<boolean>(false);
    let dataObli = ref<object>({});
    // const changeFromObli = () => {
    //     console.log("from obli")
    // }


    const onCloseModal = () => {
        isShowModal.value = false;
    };

    const changeFromObli = (item: any) => {
        if (item.name === 'Vider et dégager le réservoir') {
            console.log(item.case);
            activeComp.value.push(ListExpert);
        } else if (
            item.name ===
            'Faire nettoyer le réservoir et évacuez les déchets dangereux'
        ) {
            isShowModal.value = true;
            dataObli.value = item;
            console.log('clean', props.obliData);
        } else if (item.name === 'Faire évacuer le réservoir') {
            activeComp.value.push(EvacuateForm);
            dataObli.value = item;
        } else if (item.id === 90 || item.id === 86) {
            console.log('lll');
            activeComp.value.push(LeaveTank);
        } else if (
            item.name ===
            'Dois-je faire réaliser une reconnaissance de l’état du sol'
        ) {
            activeComp.value.push(SoilReconMenu);
            dataObli.value = item;
            console.log('eee',dataObli.value);
        }
        console.log('clicked:', item);
    };

    const changeCompUntank = (value: any) => {
        if (value.case === 'remove') {
            activeComp.value.push(CalculateCost);
            console.log('changeCompUntank remove:', activeComp.value);
        } else {
            activeComp.value.push(MailAuthority);
            console.log('active:', activeComp.value);
        }
    };

    const onNext = () => {
        console.log('next', isResponseDone.value);
    };

    const onPrevious = () => {
        if (activeComp.value.length === 1) {
            emit('prevFromUntank');
        } else {
            activeComp.value.pop();
        }
    };

    const respondDone = () => {
        activeComp.value.push(MenuUnTankType);
        console.log('respond done');
    };

    const untankChangeComps = (item: any) => {
        if (item.id === 0) {
            activeComp.value.push(UntankDemand);
            // step.value++;
            console.log('step value:', step.value);
        } else {
            activeComp.value.push(ObliMenu);
        }
        console.log('untank change comp:', item);
    };
</script>

<style lang="scss" scoped>
    .work-tank {
        &__btnContainer {
            @apply flex justify-end gap-[18px] mt-[18px];
        }
    }
</style>
