<template>
    <div>
        <Collapse :collapseData="collapseData" :operationType="operationType"/>
    </div>
</template>
<script lang="ts" setup>
    import Collapse from '@/components/Display/Collapse/Collapse.vue';
    import ElectricConnection from '@/pages/supplier/components/Electricity/SolarPannel/AdminAspect/ElectricConnection.vue';
    import MeterInstallation from '@/pages/supplier/components/Electricity/SolarPannel/AdminAspect/MeterInstallation.vue';
    import Certification from '@/pages/supplier/components/Electricity/SolarPannel/AdminAspect/Certification.vue';
    import Declaration from '@/pages/supplier/components/Electricity/SolarPannel/AdminAspect/Declaration.vue';
    import ChangeCertificat from '@/pages/supplier/components/Electricity/SolarPannel/AdminAspect/ChangeCertificat.vue';

    const props = defineProps<{
        operationType: string;
    }>();

    const collapseData = [
        // {
        //     title: "Permis d'urbanisme",
        //     content: UrbanPermit,
        // },
        {
            title: 'Raccordement electrique',
            content: ElectricConnection,
        },
        {
            title: 'Installation par Sibelga d’un compteur bidirectionnel',
            content: MeterInstallation,
        },
        {
            title: 'Certification par Brugel',
            content: Certification,
        },
        {
            title: 'Déclaration auprès des services du Cadastre',
            content: Declaration,
        },
        {
            title: 'Modification du certificat PEB',
            content: ChangeCertificat,
        },
        // {
        //     title: 'Prévenir sa compagnie d’assurance',
        //     content: AlertAssuranceCompany,
        // },
    ];
</script>
<style lang="scss" scoped></style>
