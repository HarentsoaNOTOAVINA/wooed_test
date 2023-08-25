<template>
    <Loader v-if="isLoad" />

    <div class="mt-[10px]" v-else>
        <div v-for="(item, index) in belgiumElt" :key="index">
            <Select
                :options="item.radioData"
                :name="item.name"
                :label="item.label"
                placeholder="Selectionnez"
                @change-select="handleChange"
            />
            <template v-if="item.name === 'taxation'">
                <transition name="fade-hidden" mode="out-in">
                    <Switch
                        v-if="
                            params.taxation ===
                            `Je revends le bien sans spéculation`
                        "
                        class="mb-[20px]"
                        name="isOwnDwelling"
                        @handle-switch="handleChange"
                        item-label="L'immeuble est mon habitation propre durant 12 mois précédent d'aliénation"
                    />
                </transition>

                <transition name="fade-hidden" mode="out-in">
                    <Input
                        v-if="!params.isOwnDwelling"
                        name-input="receivedCompensation"
                        label="Indemnités percues du chef de sinistres ayant frappé l'immeuble alléné"
                        @input="handleChange"
                        placeholder="0.00 €"
                    />
                </transition>
            </template>
            <template v-if="item.name === 'type'">
                <transition name="fade-hidden" mode="out-in">
                    <Input
                        v-if="
                            params.type === 'Terrain' &&
                            params.taxation ===
                                `Je revends le bien avec spéculation (La spéculation est plus qu'occasionnelle ou fortuite)`
                        "
                    name-input="buildPrice"
                        label="Prix de construction hors TVA"
                        placeholder="0.00 €"
                        @input="handleChange"
                    />
                </transition>
            </template>
        </div>

        <div v-for="(item, index) in resaleInputBelgium" :key="index">
            <Input
                :name-input="item.name"
                :type="item.type"
                :placeholder="item.placeholder"
                :label="item.label"
                @input="handleChange"
            />
        </div>

        <Switch
            class="mb-[20px]"
            name="creditContracted"
            @handle-switch="handleChange"
            item-label="J'ai contracté un crédit"
        />
        <transition name="fade-hidden" mode="out-in">
            <CardWrapper v-if="params.creditContracted">
                <Input
                    v-for="(item, index) in creditInputBelgium"
                    :key="index"
                    :name-input="item.name"
                    :label="item.label"
                    :placeholder="item.placeholder"
                    type="number"
                    @input="handleChange"
                />
            </CardWrapper>
        </transition>

        <Switch
            class="mb-[20px]"
            name="agency"
            @handle-switch="handleChange"
            item-label="Je recours au service d'une agence immobilière"
        />

        <transition name="fade-hidden" mode="out-in">
            <CardWrapper v-if="params.agency">
                <div
                    v-for="(item, index) in serviceUsageInputSecBelgium"
                    :key="index"
                >
                    <Select
                        :options="item.radioData"
                        :name="item.name"
                        :label="item.label"
                        placeholder="Selectionnez"
                        @change-select="handleChange"
                    />
                </div>
            </CardWrapper>
            <CardWrapper v-else>
                <Input
                    name-input="addFee"
                    label="Frais de publicité"
                    placeholder="0.00 €"
                    type="number"
                    @input="handleChange"
                />
            </CardWrapper>
        </transition>
        <div
            class="mt-[20px]"
            v-for="(item, index) in servcieUsageInputBelgium"
            :key="index"
        >
            <Input
                :name-input="item.name"
                :type="item.type"
                :placeholder="item.placeholder"
                :label="item.label"
                @input="handleChange"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import useCapitalGainConst from '../Composables/useCapitalGainConst';

    const {
        belgiumElt,
        resaleInputBelgium,
        creditInputBelgium,
        servcieUsageInputBelgium,
        serviceUsageInputSecBelgium,
        isLoad,
    } = useCapitalGainConst();

    const route = useRoute();

    const params = ref<TypesPlusValueParams>({
        theProperty: route.params.id as any,
        country: 'Belgique',
        region: 'Bruxelles',
        creditContracted: false,
        agency: false,
    });

    const emit = defineEmits<{
        (fn: 'on-hanlde-params', v: TypesPlusValueParams): void;
    }>();
    watch(
        () => params.value,
        (v) => {
            emit('on-hanlde-params', v);
        },
        { immediate: true, deep: true }
    );

    function handleChange(evt: any) {
        const [name, value] = Object.entries(evt)[0];
        switch (name) {
            case 'taxation':
                if (value !== 'Je revends le bien sans spéculation') {
                    const { isOwnDwelling, receivedCompensation, ...rest } =
                        params.value;
                    params.value = {
                        ...rest,
                        ...evt,
                    };
                } else {
                    params.value = {
                        ...params.value,
                        ...evt,
                    };
                }
                break;
            case 'isOwnDwelling':
                if (value) {
                    const { receivedCompensation, ...rest } = params.value;
                    params.value = {
                        ...rest,
                        ...evt,
                    };
                } else {
                    params.value = {
                        ...params.value,
                        ...evt,
                    };
                }
                break;
            case 'creditContracted':
                if (!value) {
                    const {
                        credit,
                        creditTime,
                        creditInteret,
                        creditMortagage,
                        ...rest
                    } = params.value;
                    params.value = {
                        ...rest,
                        ...evt,
                    };
                } else {
                    params.value = {
                        ...params.value,
                        ...evt,
                    };
                }
                break;
            case 'agency':
                if (!value) {
                    const { addFee, ...rest } = params.value;
                    params.value = {
                        ...rest,
                        ...evt,
                    };
                } else {
                    const { agencyFeeRate, ...rest } = params.value;
                    params.value = {
                        ...rest,
                        ...evt,
                    };
                }
                break;
            default:
                params.value = {
                    ...params.value,
                    ...evt,
                };
                break;
        }

    }
</script>
<style lang="scss" scoped>
    .fade-hidden-enter-active,
    .fade-hidden-leave-active {
        transition: all 0.3s ease;
    }
    .fade-hidden-enter-from,
    .fade-hidden-leave-to {
        transform: translateX(-100px);
        opacity: 0;
    }
</style>
