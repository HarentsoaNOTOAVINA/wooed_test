<template>
    <div class="urbanismeStatus__flandre">
        <MenuItem
            title="au Plan de secteur en "
            title-btn="Zones d'habitation à prédominance résidentielle"
            @hanlde-info="regionalInfo"
            @handle-btn="regionalBtn"
        />
        <MenuItem
            title="Est visé par "
            title-btn="Un Règlement général sur les bâtisses applicable aux zones protégées en matière d’urbanisme (ZPU)"
            @hanlde-info="provincialInfo"
            @handle-btn="provincialBtn"
        />
        <MenuItem
            :shwoInfoIcon="false"
            title="Est visé par "
            title-btn="Un Règlement général sur les bâtisses en site rural  "
            @hanlde-info="ruralInfo"
            @handle-btn="ruralBtn"
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
    function ruralInfo() {
        console.log('BUTTON communal');
    }
    function ruralBtn() {
        console.log('BUTTON communal');
    }
</script>
<style lang="scss" scoped>
    .urbanismeStatus {
        &__flandre {
            &:deep() {
                .urbanismeStatus__menu
                    .urbanismeStatus__menu-list
                    .btn
                    .button__primary {
                    max-width: 346px;
                }
            }
        }
    }
</style>
