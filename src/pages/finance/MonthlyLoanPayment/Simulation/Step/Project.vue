<template>
    <div class="simulation-step">
        <Title type="h3" label="PROJET" />
        <hr />
        <Select
            @change-select="handleEntry"
            placeholder="Selectionnez"
            label="De quel type d’habitation s’agit-il?"
            name="dwellingType"
            :options="DWELLING_TYPE"
            :required="true"
        />
        <Select
            @change-select="handleEntry"
            placeholder="Selectionnez"
            label="À quoi est destinée votre habitation?"
            name="locationPurpose"
            :options="LOCATION_PURPOSE"
            :required="true"
        />
        <Switch
            @handle-switch="handleEntry"
            item-label="Utilisez-vous plus de la moitié de la superficie pour
                        une activité professionnelle?"
            name="halfAreaPurpose"
            class="mb-[20px]"
        />
        <Input
            @input="handleEntry"
            placeholder="0.00 €"
            label="Prix d’achat de votre habitation?"
            name-input="totalCreditAmount"
            :required="true"
            input-type="number"
        />
        <Switch
            @handle-switch="handleEntry"
            item-label="Achetez-vous l'habitation sous régime TVA ?"
            name="buyingHouseUnderTva"
            class="mb-[20px]"
        />
        <transition appear mode="out-in" name="fade-appear">
            <Select
                @change-select="handleEntry"
                v-if="params.buyingHouseUnderTva"
                placeholder="Selectionnez"
                label="À quoi est destinée votre habitation?"
                name="locationRegion"
                :options="LOCATION_REGION"
            />
        </transition>
        <transition appear mode="out-in" name="fade-appear">
            <Select
                @change-select="handleEntry"
                v-if="params.locationRegion"
                placeholder="Selectionnez"
                label="À quoi est destinée votre habitation?"
                name="registrationFees"
                :options="REGISTRATION_FEES[params.locationRegion]"
            />
        </transition>
        <Switch
            @handle-switch="handleEntry"
            item-label="L'habitation pour laquelle vous contractez l'emprunt
                        sera-t-elle l'unique habitation familiale?"
            name="uniqueFamilyDwelling"
            class="mb-[20px]"
        />
        <Input
            @input="handleEntry"
            placeholder="Entez le nombre d'année"
            label="Durée en année"
            name-input="year"
            :required="true"
            input-type="number"
        />
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import { ref, watch } from 'vue';

    const params = ref<any>({});

    const DWELLING_TYPE = ref<any>([
        {
            value: 'maison',
            label: 'Maison',
        },
        {
            value: 'appartement',
            label: 'Appartement',
        },
    ]);

    const LOCATION_PURPOSE = [
        {
            label: 'Résidence principale',
            value: 'Résidence principale',
        },
        {
            label: '2éme résidence',
            value: '2éme résidence',
        },
        {
            label: 'À louer',
            value: 'À louer',
        },
    ];

    const LOCATION_REGION = [
        {
            label: 'Région Bruxelloise',
            value: 'bruxelle',
        },
        {
            label: 'Région Flamande',
            value: 'flandre',
        },
        {
            label: 'Région Wallonne',
            value: 'wallonie',
        },
    ];

    const REGISTRATION_FEES = ref<any>({
        bruxelle: [
            {
                label: 'Avec abattement de 175.000 euros',
                value: 'Avec abattement de 175.000 euros',
            },
            { label: 'Sans abattement', value: 'Sans abattement' },
        ],
        flandre: [
            {
                label: "3% Droits d'enregistrement",
                value: "3% Droits d'enregistrement",
            },
            {
                label: '3% Centre-ville/Périphérie flamande',
                value: '3% Centre-ville/Périphérie flamande',
            },
            {
                label: '1% - rénovation énergétique',
                value: '1% - rénovation énergétique',
            },
            {
                label: '1% - rénovation énergétique - Centre-ville/Périph. flamande',
                value: '1% - rénovation énergétique - Centre-ville/Périph. flamande',
            },
            {
                label: "12% Droits d'enregistrement",
                value: "12% Droits d'enregistrement",
            },
        ],
        wallonie: [
            { label: 'Frais réduits', value: 'Frais réduits' },
            { label: 'Frais ordinaires', value: 'Frais ordinaires' },
        ],
    });

    const emit = defineEmits<{
        (fn: 'on-handle-params', v: any): void
    }>()

    watch(() => params.value, (v) => {
        emit("on-handle-params", v)
    })

    function handleEntry(evt: any) {
        const [name, value] = Object.entries(evt)[0];
        switch (name) {
            case '':
                break;
            default:
                paramsDefaultAssignation(evt);
                break;
        }
    }
    function paramsDefaultAssignation(
        obj?: any,
        defaultParams: any = params.value
    ) {
        params.value = {
            ...defaultParams,
            ...obj,
        };
    }
</script>
<style lang="scss" scoped>
    .simulation-step {
        .fade-appear-enter-active,
        .fade-appear-leave-active {
            @apply transition-all;
        }
        .fade-appear-enter-from,
        .fade-appear-leave-to {
            @apply translate-x-[-200px];
        }
    }
</style>
