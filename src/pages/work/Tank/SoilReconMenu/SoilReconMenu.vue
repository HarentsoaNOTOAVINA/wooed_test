<template>
    <div class="work">
        <div v-if="loadinSubMenu">
            <Loader/>
        </div>
        <component
            :is="activeComp[activeComp.length - 1]"
            :dataTankMenu="menu"
            :paramsCost="props.dataPublish"
            :paramsWork="props.dataPublish"
            @finishSaveWork="finishSaveWork"
            @changeComponent="changeComp"
            @handleChoiceExpert="handleChoiceExpert"
            @gotoCalculCost="gotoCalculCost"
        />
    </div>
</template>

<script setup lang="ts">
    import Loader from "@/components/Common/Loader/Loader.vue"
    import PersoInfo from '../PersoInfo/PersoInfo.vue';
    import FinalEvaluation from '../FinalEvaluation/FinalEvaluation.vue';
    import ReconFinal from '../ReconFinal/ReconFinal.vue';
    import DofficeReconSoil from '../DofficeReconSoil/DofficeReconSoil.vue';
    import MenuTanksWork from '../MenuTanksWork/MenuTanksWork.vue';
    import { menuData, officeMenu } from './data';
    import { Store, useStore } from 'vuex';
    import { onMounted, ref, watch } from 'vue';
    import CalculateCost from '../CalculateCost/CalculateCost.vue';
    const store: Store<any> = useStore();

    const props = defineProps(['obliData', 'dataPublish']);

    onMounted(() => {
        menu.value = menuData;
        getReconSubMenu();
    });

    let activeComp = ref<Array<any>>([MenuTanksWork]);
    let subMenu = ref<Array<any>>([]);
    let menu = ref<Array<any>>([]);
    const expertSelected = ref<Array<any>>([]);
    let isExpertChoosed = ref<boolean>(false);
    let loadinSubMenu = ref<boolean>(false);
    const finishSaveWork = () => {
        activeComp.value = [MenuTanksWork];
    };

    const gotoCalculCost = () => {
        activeComp.value.push(CalculateCost);
    };

    const handleChoiceExpert = (item: Array<object>) => {
        expertSelected.value = item.map((obj) => {
            for (const key in obj) {
                return key;
            }
        });
        isExpertChoosed.value = true;
        console.log('expppp:', expertSelected.value);
    };

    // watch(() => props.)

    const getReconSubMenu = async () => {
        try {
            loadinSubMenu.value = true;
            let res = await store.dispatch(
                'WorksModule/setReconSoilSubMenu',
                props.obliData.id
            );
            subMenu.value = res;
            loadinSubMenu.value = false;
            console.log('sususususu:', subMenu.value);
        } catch (error) {}
    };

    const changeComp = (item: any) => {
        console.log('sub:', item);
        if (item.id === 0) {
            menu.value = subMenu.value;
            console.log('menu data:', menu.value);
        }else if(item.id === 1) {
            menu.value = subMenu.value;
        }


        if (item.name === "D'Office") {
            activeComp.value.push(DofficeReconSoil);
            // menu.value = officeMenu
            // console.log('dofaka');
        } else if (
            item.name === 'Il convient de réaliser une étude détaillée'
        ) {
            store.dispatch('WorksModule/setRecon', 'detailedStudy');
            activeComp.value.push(DofficeReconSoil);
        } else if (
            item.name === 'Il convient de réaliser une étude de risque'
        ) {
            activeComp.value.push(DofficeReconSoil);
        } else if (item.name === 'Projet de gestion du risque') {
            activeComp.value.push(ReconFinal);
            // store.dispatch("WorksModule/setRecon", "risk")
        } else if (item.name === 'Projet d’assainissement') {
            activeComp.value.push(ReconFinal);
        } else if (item.name === 'Evaluation finale') {
            activeComp.value.push(FinalEvaluation);
        } else if (item.name === 'Demander une prime') {
            activeComp.value.push(PersoInfo);
        }
    };
</script>

<style scoped></style>
