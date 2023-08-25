<template>
    <div class="sale-content">
        <Select
            :options="FRANCE_DEPARTEMENT"
            label="Departement de localisation de votre bien"
            name="region"
            @change-select="handleChange"
            placeholder="Choisissez un departement"
        />

        <Select
            :options="PROPERTY_TYPE"
            label="Type du bien"
            name="type"
            @change-select="handleChange"
            placeholder="Choisissez le type de votre bien"
        />

        <Select
            v-if="params.type !== 'Bien ancien'"
            :options="PROPERTY_SELLER"
            label="Le vendeur du bien est"
            name="seller"
            @change-select="handleChange"
            placeholder="Particulier/Professionnel"
        />

        <Select
            v-if="
                params.type === 'Terrain' &&
                params.seller ===
                    'Un professionnel assujetti à la TVA (marchand de biens , promoteur immobilier)'
            "
            :options="GROUND_PURCHASED"
            label="Le terrain a précédemment été acheté auprès d' ..."
            name="previousSeller"
            @change-select="handleChange"
            placeholder="Particulier/Professionnel"
        />

        <Input
            input-type="number"
            v-if="
                params.type === 'Terrain' &&
                params.seller ===
                    'Un professionnel assujetti à la TVA (marchand de biens , promoteur immobilier)' &&
                params.previousSeller === 'Un particulier'
            "
            label="Prix de la cession précédente"
            name-input="oldPrice"
            @input="handleChange"
            placeholder="0.00 €"
        />

        <Input
            input-type="number"
            label="Prix d'achat"
            name-input="purchasePrice"
            @input="handleChange"
            placeholder="0.00 €"
        />
        <Input
            input-type="number"
            label="Dont mobilier éventuel d'une valeur de"
            name-input="donation"
            @input="handleChange"
            placeholder="0.00 €"
        />

        <Select
            :options="FINANCEMENT"
            label="Financement"
            name="financement"
            @change-select="handleChange"
            placeholder="Choisir le type de financement"
        />

        <template
            v-if="params.financement === 'Emprunt avec garantie hypothécaire'"
        >
            <Input
                input-type="number"
                label="Montant des prêts PEL, CEL et prêts aidès"
                name-input="loan"
                @input="handleChange"
                placeholder="0.00 €"
            />
            <Input
                input-type="number"
                label="Autres prêts"
                name-input="otherLoan"
                @input="handleChange"
                placeholder="0.00 €"
            />
        </template>
    </div>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { computed, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import {
        property_type,
        financement,
        france_departement,
        ground_purchased,
        property_seller,
    } from './data/france.data';

    interface TypesSelect {
        label: string;
        value: string | number; // value is stringify with this pattern => {code: number; name: string}
    }

    const route = useRoute();
    const PROPERTY_TYPE = ref<TypesSelect[]>(property_type);
    const FINANCEMENT = ref<TypesSelect[]>(financement);
    const PROPERTY_SELLER = ref<TypesSelect[]>(property_seller);
    const GROUND_PURCHASED = ref<TypesSelect[]>(ground_purchased);
    const params = ref<any>({
        country: 'France',
        theProperty: route.params.id,
    });
    const RAW_FR_DEP = ref<
        {
            code: number;
            name: string;
        }[]
    >(france_departement);
    const FRANCE_DEPARTEMENT = computed<TypesSelect[]>(() =>
        RAW_FR_DEP.value.map((item) => ({
            label: item.name,
            value: JSON.stringify(item),
        }))
    );
    const isRemoveOldPrice = ref<boolean>(false);
    const emit = defineEmits<{
        (fn: 'on-params-change', v: any): void;
    }>();

    watch(
        () => params.value,
        (v) => {
            isRemoveOldPrice.value = !(
                v.type === 'Terrain' &&
                v.seller ===
                    'Un professionnel assujetti à la TVA (marchand de biens , promoteur immobilier)' &&
                v.previousSeller === 'Un particulier'
            );
            let parseIntObj = {};
            Object.keys(v).forEach((key) => {
                parseIntObj = {
                    ...parseIntObj,
                    [key]: Number.isNaN(+v[key]) ? v[key] : +v[key],
                };
            });
            emit('on-params-change', parseIntObj);
        },
        { deep: true, immediate: true }
    );

    watch(
        () => isRemoveOldPrice.value,
        (v) => {
            if (v) {
                const { oldPrice, ...rest } = params.value;
                params.value = { ...rest };
            }
        }
    );

    function handleChange(evt: any) {
        console.log(evt);
        const content = Object.entries(evt)[0];
        const [name, value] = content;
        switch (name) {
            case 'region':
                const regionValue = JSON.parse(value as string);
                const [_, reg_name] = Object.entries(regionValue)[1];
                params.value = {
                    ...params.value,
                    [name]: reg_name,
                };
                break;
            case 'type':
                const { seller, ...rest } = params.value as any;
                params.value = { ...rest, ...evt };
                break;
            default:
                params.value = {
                    ...params.value,
                    ...evt,
                };
                break;
        }
        console.log(params.value);
    }
</script>

<style scoped lang="scss">
    @import '@/assets/style/calcul_sale.scss';
</style>
