<template>
    <Loader v-if="isLoad" />
    <div class="pv-france" v-else>
        <Select
            name="region"
            label="Departement"
            :options="FRANCE_DEPARTEMENT"
            :required="true"
            @change-select="handleChange"
            placeholder="Selectionnez"
        />
        <Select
            v-for="(item, index) in taxResidenceFr"
            :key="index"
            :name="item.name"
            :label="item.label"
            :options="item.radioData"
            :required="true"
            @change-select="handleChange"
            placeholder="Selectionnez"
        />
        <transition name="fade-hidden" mode="out-in">
            <Switch
                v-if="params.taxResidence === `En France`"
                name="isPrincipalResidence"
                @handle-switch="handleChange"
                item-label="Ce bien constitue-t-il actuellement ma résidence principale?"
            />
        </transition>
        <transition name="fade-hidden" mode="out-in">
            <Switch
                v-if="
                    params.taxResidence === `En France` &&
                    !params.isPrincipalResidence
                "
                name="isPrincipalResidenceOwner"
                @handle-switch="handleChange"
                item-label="Ai-je été propriétaire d’un autre bien constituant ma résidence principale au cours des 4 dernières années ?"
            />
        </transition>
        <transition name="fade-hidden" mode="out-in">
            <Switch
                v-if="
                    params.taxResidence ===
                    `Dans un autre pays de l’UE ou de l’EEE`
                "
                name="hasFiscalDomainInFrance"
                @handle-switch="handleChange"
                item-label="Ai-je eu, dans le passé, mon domicile fiscal en France pendant une période continue d’au moins deux ans ?"
            />
        </transition>
        <transition name="fade-hidden" mode="out-in">
            <Switch
                v-if="
                    params.taxResidence ===
                        `Dans un autre pays de l’UE ou de l’EEE` &&
                    params.hasFiscalDomainInFrance
                "
                name="resellInFiveYears"
                @handle-switch="handleChange"
                item-label="La vente interviendra-t-elle dans un délai maximal de cinq
                    ans suivant le transfert de mon domicile fiscal hors de
                    France ?"
            />
        </transition>
        <transition name="fade-hidden" mode="out-in">
            <Switch
                v-if="
                    params.taxResidence ===
                        `Dans un autre pays de l’UE ou de l’EEE` &&
                    !params.resellInFiveYears
                "
                name="InFreeDisposal"
                @handle-switch="handleChange"
                item-label="Ai-je la libre disposition de mon bien immobilier au moins
                    depuis le 1er janvier de l’année précédant l’année de la
                    vente ?"
            />
        </transition>
        <transition name="fade-hidden" mode="out-in">
            <Switch
                v-if="
                    params.taxResidence ===
                        `Dans un autre pays de l’UE ou de l’EEE` &&
                    params.InFreeDisposal
                "
                name="hasGotTaxExemption"
                @handle-switch="handleChange"
                item-label="Ai-je déjà bénéficié d’une exonération d’impôt au titre de
                    plus-values immobilières depuis le 1er janvier 2006 ?"
            />
        </transition>
        <div class="input-gr">
            <Input
                label="A quel prix ai-je acheté bien ?  En cas de donation ou succession, quelle valeur a été retenue pour calculer les droits de succession ou de donation ?"
                name-input="buyingPrice"
                placeholder="0.00 €"
                @input="handleChange"
            />
            <InputDate
                label="A quelle date ai-je acquis le bien que je souhaite vendre"
                name="buyingDate"
                @handle-date-format="handleChange"
            />
        </div>
        <div class="input-gr">
            <Input
                label="A quel prix est-ce que je compte vendre le bien ?"
                name-input="sellingPrice"
                placeholder="0.00 €"
                @input="handleChange"
            />
            <InputDate
                label="A quelle date ai-je le projet de vendre le bien ?"
                name="sellingDate"
                @handle-date-format="handleChange"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import { computed, ref, watch } from 'vue';
    import useCapitalGainConst from '../Composables/useCapitalGainConst';
    import { useRoute } from 'vue-router';
    import { france_departement } from '@/pages/finance/Sale/Country/data/france.data';
import Loader from '@/components/Common/Loader/Loader.vue';

    const { taxResidenceFr, isLoad } = useCapitalGainConst();
    const route = useRoute();
    const emit = defineEmits<{
        (fn: 'on-hanlde-params', v: TypesPlusValueParams): void;
    }>();

    const params = ref<TypesPlusValueParams>({
        theProperty: route.params.id,
        country: 'France',
    });

    watch(
        () => params.value,
        (v) => {
            emit("on-hanlde-params", v)
        },
        { immediate: true }
    );

    const RAW_FR_DEP = ref<
        {
            code: number;
            name: string;
        }[]
    >(france_departement);
    const FRANCE_DEPARTEMENT = computed(() =>
        RAW_FR_DEP.value.map((item) => ({
            label: item.name,
            value: JSON.stringify(item),
        }))
    );

    function handleChange(evt: any) {
        let [name, value] = Object.entries(evt)[0];
        switch (name) {
            case 'region':
                value = JSON.parse(value as string).name
                paramsSummons({[name]: value})
                break;
            case 'taxResidence':
                if (value !== 'En France') {
                    const {
                        isPrincipalResidence,
                        isPrincipalResidenceOwner,
                        ...rest
                    } = params.value;
                    paramsSummons(evt, rest);
                } else {
                    paramsSummons(evt);
                }
                break;
            default:
                paramsSummons(evt);
                break;
        }
    }
    function paramsSummons(
        evt: any,
        assign: TypesPlusValueParams = params.value
    ) {
        params.value = {
            ...assign,
            ...evt,
        };
    }
</script>
<style lang="scss" scoped>
    .pv-france {
        @apply mt-[10px];
        .fade-hidden-enter-active,
        .fade-hidden-leave-active {
            @apply transition-all;
        }
        .fade-hidden-enter-from,
        .fade-hidden-leave-to {
            @apply opacity-0 translate-x-[-100px];
        }

        .input-gr {
            @apply pt-[10px] border-t border-solid border-t-[var(--color-gray)] mb-[20px];
        }
    }
</style>
