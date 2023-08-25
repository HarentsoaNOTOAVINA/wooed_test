<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="caracteristic">
            <!-- Type de chauffage -->
            <HeatingType @change="getParams" />

            <!-- Performance energetic -->
            <PerformanceEnergetic
                @change="getParams"
                @data="getDataEnergy"
                :required="error"
                ref="scrollSection"
            />

            <!-- Chaudière -->
            <Boiler @change="getParams" />

            <!-- caracteristique energetique -->
            <CharacteristicEnergy @change="getParams" />
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import HeatingType from './components/HeatingType/HeatingType.vue';
    import PerformanceEnergetic from './components/PerformanceEnergetic/PerformanceEnergetic.vue';
    import Boiler from './components/Boiler/Boiler.vue';
    import CharacteristicEnergy from './components/CharacteristicEnergy/CharacteristicEnergy.vue';

    import { ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import { requiredControl } from '@/utils/validation/form_validation';
    import { formatDocument } from '../../utils/default-value';

    defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
    });

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    const store: Store<any> = useStore();
    const params = ref<any>({});
    const dataEnergy = ref<Array<any>>([]);
    const error = ref<any>({});
    const scrollSection = ref<any>();
    const paramsDoc = ref();
    let allDocument = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']['documents']
    );

    function getDataEnergy(data: Array<any>, valueParams: object) {
        params.value = {
            ...params.value,
            ...valueParams,
        };

        dataEnergy.value = data;
    }

    function getParams(value: object, label: any) {
        params.value = {
            ...params.value,
            ...value,
        };

        if(label) {
            paramsDoc.value = formatDocument(
                params.value,
                label
            );
        }
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        
        error.value = requiredControl(dataEnergy.value, params.value);

        if (Object.values(error.value).every((v) => v !== '')) {
            if (paramsDoc.value && paramsDoc.value.length) {
                store.dispatch('AddProductModule/setPropertyData', {
                    data: {
                        ...params.value,
                        documents: [...allDocument.value, ...paramsDoc.value],
                    },
                });
            } else {
                store.dispatch('AddProductModule/setPropertyData', {
                    data: {
                        ...params.value,
                    },
                });
            }
            emit('onClickNext');
        } else {
            scrollSection.value.$el.scrollIntoView();
        }
    }
</script>

<style lang="scss" scoped>
    .energy-label {
        @apply font-[600] text-grayIcon;
    }
</style>
