<template>
    <div>
        <div v-for="(item, index) in luxemburgElt" :key="index">
            <Select
                :options="item.radioData"
                :label="item.label"
                :name="item.name"
                placeholder="Selectioner"
                @change-select="handleChange"
            />
        </div>
            <Switch
                item-label="L'immeuble fait partie d’une entreprise commerciale ou agricole ou d'une profession"
                name="isPartOfCommercial"
                @handle-switch="handleChange"
            />
            <Switch
                item-label="L'immeuble est mon habitation propre durant 12 mois précédent d'aliénation ?"
                name="isOwnDwelling"
                @handle-switch="handleChange"
            />
            <Input
                label="Prix de vente"
                name-input="resellPrice"
                placeholder="$0.0"
                @input="handleChange"
            />
            <Switch
                item-label="J'ai contracté un crédit "
                name="creditContracted"
                @handle-switch="handleChange"
            />
            <div v-if="params && params.creditContracted === true">
                <Input
                    label="Montant du crédit"
                    name-input="credit"
                    placeholder="$0.0"
                    @input="handleChange"
                />
                <Input
                    label="Durée du crédit"
                    name-input="creditTime"
                    placeholder="$0.0"
                    @input="handleChange"
                />
                <Input
                    label="Taux d’interet"
                    name-input="creditInteret"
                    placeholder="$0.0"
                    @input="handleChange"
                />
                <Input
                    label="Montant hypothyquet"
                    name-input="creditMortagage"
                    placeholder="$0.0"
                    @input="handleChange"
                />
            </div>
            <Switch
                item-label="Je recours au service d'une agence immobilière ?"
                name="agency"
                @handle-switch="handleChange"
            />
            <div v-if="params && !params.agency">
                <Input
                    label="Frais de publicité"
                    name-input="addFee"
                    placeholder="$0.0"
                    @input="handleChange"
                />
            </div>
            <div v-else>
                <Select
                    :options="selectData"
                    label="Commission de l'agence immobilière"
                    name="agencyCommission"
                    placeholder="Selectioner"
                    @change-select="handleChange"
                />
            </div>
            <div>
                <Input
                    label="Je revends le bien en"
                    name-input="resellYear"
                    placeholder="$0.0"
                    @input="handleChange"
                />
                <Input
                    label="Montant net de mes revenus imposables"
                    name-input="taxableIncome"
                    placeholder="$0.0"
                    @input="handleChange"
                />
                <Input
                    label="Montant prévisionnel des travaux"
                    name-input="workPrice"
                    :required="true"
                    placeholder="$0.0"
                    @input="handleChange"
                />
            </div>
    </div>
    <!-- <Loader/> -->
</template>
<script lang="ts" setup>
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import useCapitalGainConst from '../Composables/useCapitalGainConst';
    import { ref, watch } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import { TypeParams } from './data/lux.data';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const { luxemburgElt, isLoad } = useCapitalGainConst();
    const params = ref<TypeParams>({
        theProperty: +route.params.id,
        country: 'Luxembourg',
        region: 'Ville de Luxembourg',
        creditContracted: false,
        agency: false,
    });
    const selectData = [
        {
            label: '1%',
            value: '1%',
        },
        {
            label: '2%',
            value: '2%',
        },
        {
            label: '2,5%',
            value: '2,5%',
        },
        {
            label: '3%',
            value: '3%',
        },
    ];
    const emit = defineEmits<{
        (fn: 'on-hanlde-params', v: TypesPlusValueParams): void;
    }>();
    watch(
        () => params.value,
        (v) => {
            emit('on-hanlde-params', v as any);
        },
        { immediate: true, deep: true }
    );

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };

        if (params.value && params.value.creditContracted === false) {
            const {
                credit,
                creditTime,
                creditInteret,
                creditMortagage,
                ...rest
            } = params.value;
            console.log('sisa = ', rest);
            params.value = rest;
        } else if (params.value && params.value.isOwnDwelling === false) {
            const { isOwnDwelling, ...rest } = params.value;
            params.value = rest;
        } else if (params.value && params.value.isPartOfCommercial === false) {
            const { isPartOfCommercial, ...rest } = params.value;
            params.value = rest;
        }
        console.log('sisa = ', params.value);
    }
</script>
<style lang="scss" scoped></style>
