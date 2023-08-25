<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="myConnection">
            <Alert v-if="energyName === 'Gaz'">Ma rue est raccordée au gaz de la ville.</Alert>
            <Alert v-if="energyName === 'Eléctricité'">Ma rue est raccordée à l'éléctricité de la ville.</Alert>
            <hr class="my-[20px] text-gray" />
            <Connected
                @on-redirect-to-consumption="
                    $emit('on-redirect-to-consumption')
                "
                :energy-type="energyType"
                v-if="isConnected"
            />
            <NotConnected v-else :supplier="supplier" />
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { computed, ref } from 'vue';
    import NotConnected from './ConnectionState/NotConnected/NotConnected.vue';
    import Connected from './ConnectionState/Connected/Connected.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const theProperty = computed(() => route.params.id)
    
    const props = defineProps<{
        supplier: string;
        energyName: string;
        energyType: string;
    }>();

    const breadcrumbListsData = [
        {
            url: '/fournisseur/'+theProperty.value,
            label: 'Fournisseur',
        },
        {
            label: props.energyName,
        },
    ];
    const isConnected = ref<boolean>(true);
</script>

<style lang="scss" scoped></style>
