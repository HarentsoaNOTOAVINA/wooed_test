<template>
    <div class="urbanismeStatus__flandre">
        <MenuItem
            title="au Plan régional d’exécution spatial (GRUP) en "
            title-btn="Zones d'habitation à prédominance résidentielle"
            @hanlde-info="regionalInfo"
            @handle-btn="regionalBtn"
        />
        <MenuItem
            title="au Plan provincial d’exécution spatial (PRUP) en"
            title-btn="Zone d’habitat... "
            @hanlde-info="provincialInfo"
            @handle-btn="provincialBtn"
        />
        <MenuItem
            :shwoInfoIcon="false"
            title="au Plan communal d’exécution spatial (gRUP) en"
            title-btn="Zone "
            @hanlde-info="communalInfo"
            @handle-btn="communalBtn"
        />
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import UrbanPlanItem from '../Components/PlanItemStatus.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import MenuItem from '../Components/Urbanstatus/MenuItem.vue';
    // import { STATUS } from '@/core/constants/constants';

    function regionalInfo() {
        console.log('INFO regional');
    }
    function regionalBtn() {
        console.log('BUTTON regional');
    }
    function provincialInfo() {
        console.log('BUTTON provincial');
    }
    function provincialBtn() {
        console.log('BUTTON provincial');
    }
    function communalInfo() {
        console.log('BUTTON communal');
    }
    function communalBtn() {
        console.log('BUTTON communal');
    }
</script>
<style lang="scss" scoped></style>
