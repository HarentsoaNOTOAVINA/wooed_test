<template>
    <div class="btn-list">
        <Button
            type-button="gray"
            @click="handleShowContent(item.content)"
            v-if="!showComponent"
            v-for="(item, index) in btnItems"
            :key="index"
        >
            {{ item.label }}
        </Button>
        <component
            :is="component"
            v-else
            @backTo="backTo"
            @show-control-agree="showControlAgree"
        />
    </div>
</template>
<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { ref , shallowRef} from 'vue';
    import ReduceWaterBill from '../Consumption/ReduceWaterBill.vue';
    import AskConnection from './NoWaterConnection/AskConnection.vue';
    import RainWaterWell from './NoWaterConnection/RainWaterWell.vue';
    import UnderGroundWater from './NoWaterConnection/UnderGroundWater.vue';

    const showComponent = ref<boolean>(false);
    const component = shallowRef<any>();

    const emit = defineEmits(['showControlAgree']);

    const btnItems = [
        {
            label: "Demander un raccordement à l'eau courante",
            content: AskConnection,
        },
        {
            label: 'Je dispose d’un système d’extraction des eaux souterraines',
            content: UnderGroundWater,
        },
        {
            label: 'Je dispose d’un puits d’eau de pluie',
            content: RainWaterWell,
        },
    ];

    function handleShowContent(content: any) {
        showComponent.value = !showComponent.value;
        component.value = content;
    }

    function backTo() {
        console.log('back');
        showComponent.value = !showComponent.value;
    }

    function showControlAgree(value: boolean) {
        emit('showControlAgree', value);
    }
</script>
<style>
    .btn-list {
        @apply flex flex-col items-center gap-[18px];
    }
</style>
