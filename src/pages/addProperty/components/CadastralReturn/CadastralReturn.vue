<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="cadastre__container">
            <div class="" v-for="(item, index) in dataOfCadastre" :key="index">
                <Input
                    :label="labelOfRegion + ' ' + item.label"
                    :name-input="item.name"
                    :input-type="item.type"
                    placeholder="0"
                    @input="handleChange"
                    :unity="item.placeholder"
                    :vmodel="propertyDatas[item.name]"
                />
            </div>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import { cadastreData } from '@/pages/addProduct/components/CadastralReturn/data';
    import { ref, watch, onMounted } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import { useStore } from 'vuex';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';

    const enum Region {
        be = 'Belgique',
        lux = 'Luxembourg',
        fl = 'Flandres',
    }

    const info = [
        {
            name: 'Belgique',
            label: 'Revenu cadastral',
        },
        {
            name: 'Luxembourg',
            label: 'Valeur unitaire',
        },
        {
            name: 'Flandres',
            label: 'Valeur locative cadastrale',
        },
    ];

    const info2 = {
        be: 'Revenu cadastral',
        fl: 'Valeur locative cadastrale',
        lux: 'Valeur unitaire',
    };

    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
    });

    const store = useStore();
    const dataOfCadastre = ref<any>(cadastreData);
    const params = ref<any>({});
    const labelOfRegion = ref<any>(null);
    const content = ref<string>(props.titleLabel);

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(() => {
        getDetailsLocation();
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            propertyDatas.value = value;
        },
        { immediate: true }
    );
    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
            });
        },
        { immediate: true, deep: true }
    );

    function getDetailsLocation() {
        const country =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['country'];
        switch (country) {
            case Region.be:
                labelOfRegion.value = info2.be;
                break;
            case Region.fl:
                labelOfRegion.value = info2.fl;
                break;
            case Region.lux:
                labelOfRegion.value = info2.lux;
                break;

            default:
                labelOfRegion.value = info2.be;
                break;
        }
    }

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
        console.log(params.value);
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
        emit('onClickNext');
    }

    function finished() {
        emit('onClickFinished');
    }
</script>

<style lang="scss" scoped>
    .cadastre {
        &__container {
        }
    }
</style>
