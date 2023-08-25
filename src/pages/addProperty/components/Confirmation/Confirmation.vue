<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="confirmation__item" v-for="d in data" :key="d.id">
            <div class="confirmation__head">
                <Title v-if="d.title !== 'Prix'" type="h4" weight="600">{{
                    d.title
                }}</Title>
                <Title v-else type="h4" weight="600"
                    ><span v-if="allFilledData.startPrice"
                        >{{ d.title }} fixe</span
                    ><span v-else-if="allFilledData.floorPrice"
                        >Solliciter des offres dans un certain délai</span
                    ><span v-else>{{ d.title }}</span>
                </Title>
                <!-- <Button><Icon iconName="Edit" /> Modifier</Button> -->
            </div>
            <Divider />
            <component :is="d.component" :data="allFilledData" />
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import dataSell from './Data/dataSell';
    import { groundData } from '@/pages/addProduct/components/Confirmation/Data/dataSell';
    import { Divider } from 'ant-design-vue';
    import { ref, computed, onMounted, onBeforeMount, shallowRef } from 'vue';
    import { useStore } from 'vuex';
    import fakeData from './Data/zaza.json';
    import Desc from './Description.vue';
    import AddContainer from '../AddContainer.vue';

    const data = shallowRef<any>(dataSell);
    const store = useStore();
    // const allFilledData = ref<any>(fakeData);
    const allFilledData = computed(
        () => store.getters['AddProductModule/getAddPropertyDatas']
    );

    defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });

    onBeforeMount(() => {
        // getTypeProperty();
    });

    function getTypeProperty() {
        const allType: Array<any> =
            store.getters['AddProductModule/getPropertyType'];
        const id: number =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'propertyType'
            ];
        const type = allType.find((item) => item.id === id);
        console.log('Ito\n', type);
        if (type.name === 'Terrain') {
            data.value = groundData;
        } else {
            data.value = dataSell;
        }
    }
    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        emit('onClickNext');
    }

    function finished() {
        emit('onClickFinished');
    }
</script>

<style lang="scss" scoped>
    .confirmation {
        &__item {
            border: 1px solid var(--color-stroke-gray);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            &:deep() {
                .ant-divider {
                    margin: 15px 0;
                }
            }
        }
        &__head {
            @apply flex justify-between items-center;
        }
    }
</style>
