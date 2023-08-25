<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="general__container">
            <div class="general__master-container">
                <div class="general__features">
                    <div
                        class="general__features-body"
                        v-for="(levelItem, idLevelItem) in niveau"
                        :key="idLevelItem"
                    >
                        <div class="general__features-content">
                            <!-- Selection des equipements pour la vie quotidienne -->
                            {{ dailyNeed }} ici
                            <div class="general__features-container">
                                <div
                                    class="general__other-container-card"
                                    v-if="loadingOption"
                                >
                                    <LoadingButton size="xs" theme="dark" />
                                </div>
                                <div
                                    class="general__other-container-card"
                                    v-for="(item, index) in dailyNeed"
                                    :key="index"
                                    @click="
                                        getDropedList({
                                            id: item.id,
                                            level: idLevelItem,
                                        })
                                    "
                                    :class="[featuresSelected[idLevelItem].features.some((i : any) => i.feature === item.id) ? 'general__checked' : '']"
                                >
                                    <div class="general__other-container-item">
                                        <i
                                            :class="[featuresSelected[idLevelItem].features.some((i : any) => i.feature === item.id) ? `general__selected-other ${item.icon}` : item.icon]"
                                        />
                                        <Paragraphe
                                            :class="[featuresSelected[idLevelItem].features.some((i : any) => i.feature === item.id)  ? 'general__selected-other' : '']"
                                        >
                                            {{ item.label }}
                                        </Paragraphe>
                                    </div>
                                </div>
                                <template
                                    class=""
                                    v-if="
                                        params.thepropertyFeatures.length > 0 &&
                                        params.thepropertyFeatures[idLevelItem]
                                    "
                                >
                                    <div
                                        class="general__other-container-card general__checked"
                                        v-for="(item, index) in params
                                            .thepropertyFeatures[idLevelItem]
                                            .features"
                                        :key="index"
                                    >
                                        <div class="general__item-deletable">
                                            <div
                                                class="general__deletable-container"
                                            >
                                                <Delete
                                                    class="general__delete-item general__deletable"
                                                    @click="
                                                        handleDeleteFeature(
                                                            item,
                                                            idLevelItem
                                                        )
                                                    "
                                                />
                                            </div>
                                            <div
                                                class="general__other-container-item"
                                            >
                                                <i
                                                    :class="item.feature.icon"
                                                    class="general__selected-other"
                                                />
                                                <Paragraphe
                                                    class="general__selected-other"
                                                >
                                                    {{ item.feature.name }}
                                                </Paragraphe>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <div class="general__other-container-card">
                                    <div
                                        class="general__other-container-item"
                                        @click="onOpenModal(idLevelItem)"
                                    >
                                        <Add />
                                        <Paragraphe> Autres </Paragraphe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    :is-show-modal="isShow"
                    @on-back="onOpenModal"
                    :title="'Autre pièce (' + levelName[indexItem - 1] + ').'"
                >
                    <template #content>
                        <div
                            class=""
                            v-for="(item, idItem) in modalItemFeature"
                            :key="item.id"
                        >
                            <Input
                                :name-input="item.name"
                                :label="item.label"
                                :input-type="item.type"
                                @input="
                                    handleChangeModalValue($event, +indexItem)
                                "
                            />
                        </div>
                        <div class="general__modal-footer">
                            <Button @click="handleAddFeature"> Valider </Button>
                        </div>
                    </template>
                </Modal>
            </div>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import { modalItemFeature } from '@/pages/addProduct/components/General/data';
    import { ref, shallowRef, watch, onMounted } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Add from '@/components/Icon/AddOptions.vue';
    import Delete from '@/components/Icon/deleteRoudedBG.vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';

    import { useStore } from 'vuex';

    /**
     * Import of inside
     */
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    /**End import inside */

    const props = defineProps({
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

    interface dropedelement {
        id: number;
        level: number;
    }

    let isShow = ref<boolean>(false);
    const indexItem = ref<any>(null);
    const store = useStore();

    const featuresready = ref<boolean>(false);

    const dailyNeed = store.getters['AddProductModule/getDailyNeeded'];

    const niveau = ref<Array<any>>([
        {
            title: 'Niveau',
            level: 0,
            item: store.getters['AddProductModule/getDailyNeeded'],
            // item: store.state.AddProductModule.features.data,
        },
    ]);
    const niveauEntity = ref<any>({
        title: 'Niveau',
        level: 0,
        item: [],
    });
    const paramsItem = ref<any>({
        id: 0,
        label: '',
        item: {
            name: '',
            icon: 'fab fa-hotjar',
        },
    });
    const params = ref<any>({
        thepropertyFeatures: [],
        otherOptions: [],
    });

    const featuresSelected = ref<any[]>([{ features: [] }]);
    let newParamsItem = Object.assign({}, paramsItem.value);
    const levelName = ref<string[]>(['RDC']);
    const content = ref<string>(props.titleLabel);
    const loadingOption = ref<boolean>(false);
    
    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        console.log(params.value, 'PARAMS');
        emit('onClickNext');
    }

    function finished() {
        emit('onClickFinished');
    }
    /**
     * Initial data of inside
     */

    const defaultValue = ref<any>({
        glassType: null,
        heatingType: null,
    });

    // onMounted(() => {
    //     if (store.state.AddProductModule.features.data) {
    //         niveauEntity.value.item =
    //             store.state.AddProductModule.features.data;
    //         featuresready.value = true;
    //         niveauEntity.value.item =
    //             store.state.AddProductModule.features.data;
    //     } else {
    //         niveauEntity.value.item = fetchApi(
    //             store.dispatch('AddProductModule/getFeatures'),
    //             'loadingOption'
    //         );
    //     }
    // });

    onMounted(() => {
        if (store.state.AddProductModule.dailyNeeded.data) {
            niveauEntity.value.item =
                store.state.AddProductModule.dailyNeeded.data;
            featuresready.value = true;
            niveauEntity.value.item =
                store.state.AddProductModule.dailyNeeded.data;
        } else {
            niveauEntity.value.item = fetchApi(
                store.dispatch('AddProductModule/getDailyNeeded'),
                'loadingOption'
            );
        }
    });

    async function fetchApi(setStore: any, loading: string) {
        loading === 'loadingOption' && (loadingOption.value = true);
        let dataOption: any = [];
        try {
            const { data } = await setStore;
            dataOption = data;
        } catch (error) {
            console.error(error);
        } finally {
            loading === 'loadingOption' && (loadingOption.value = false);
        }
        return dataOption;
    }

    // watch(
    //     () => store.state.AddProductModule.features.data,
    //     (data) => {
    //         niveau.value[0].item = data;
    //     },
    //     { immediate: true, deep: true }
    // );

    watch(
        () => store.state.AddProductModule.dailyNeeded.data,
        (data) => {
            niveau.value[0].item = data;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => defaultValue.value,
        (value) => {
            defaultValue.value = value;
        },
        { immediate: true, deep: true }
    );

    /***End initial data of inside */

    watch(
        featuresSelected.value,
        (data) => {
            console.log(data, 'SELECTED');
            store.dispatch('AddProductModule/setPropertyData', {
                data,
            });
        },
        { immediate: true, deep: true }
    );

    function getDropedList(list: dropedelement) {
        let isExist: boolean = featuresSelected.value[list.level].features.some(
            (i: any) => i.feature === list.id
        );

        if (!isExist) {
            featuresSelected.value[list.level].features.push({
                feature: +list.id,
            });
            const data = { thepropertyFeatures: [...featuresSelected.value] };
            store.dispatch('AddProductModule/setPropertyData', {
                data,
                step: { general: true },
            });
        } else {
            let indexExist = null;
            featuresSelected.value[list.level].features.forEach(
                (item: any, idItem: number) => {
                    if (item.feature === list.id) {
                        indexExist = idItem;
                    }
                }
            );
            if (indexExist || indexExist === 0) {
                featuresSelected.value[list.level].features.splice(
                    indexExist,
                    1
                );
                store.dispatch('AddProductModule/setPropertyData', {
                    data: { thepropertyFeatures: [...featuresSelected.value] },
                    step: { general: true },
                });
            }
        }
    }

    watch(
        () => store.state.AddProductModule.features.data,
        function (newVal) {
            niveauEntity.value.item = newVal;
            if (store.state.AddProductModule.features.data) {
                featuresready.value = true;
            }
            return newVal;
        }
    );

    watch(
        () => niveau.value,
        (newVal) => {
            niveau.value = newVal;
            return newVal;
        },
        { immediate: true }
    );

    watch(
        () => params.value,
        (first) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...first },
            });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => indexItem.value,
        (first) => {
            indexItem.value = first;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => isShow.value,
        (first) => {
            isShow.value = first;
        },
        { immediate: true, deep: true }
    );

    function onOpenModal(key: number) {
        isShow.value = !isShow.value;
        indexItem.value = key + 1;
    }

    function handleChangeModalValue(value: any, level: number) {
        for (let i in value) {
            newParamsItem.item.name = value[i];
            newParamsItem.label = i;
            newParamsItem.id = level;
        }
    }

    async function handleAddFeature() {
        let a = JSON.stringify(newParamsItem);
        let b = JSON.parse(a);
        if (params.value.thepropertyFeatures.length < +b.id) {
            params.value.thepropertyFeatures = [
                ...params.value.thepropertyFeatures,
                {
                    features: [
                        {
                            feature: b.item,
                        },
                    ],
                },
            ];
        } else {
            params.value.thepropertyFeatures[+b.id - 1].features = [
                ...params.value.thepropertyFeatures[+b.id - 1].features,
                {
                    feature: b.item,
                },
            ];
        }
        isShow.value = false;
    }

    function handleDeleteFeature(item: any, level: number) {
        let indexToDelete = null;
        params.value.thepropertyFeatures[level].features.forEach(
            (elem: any, idElem: number) => {
                if (elem.feature.name === item.feature.name) {
                    indexToDelete = idElem;
                }
            }
        );
        params.value.thepropertyFeatures[level].features.splice(
            indexToDelete,
            1
        );
    }
</script>

<style lang="scss" scoped>
    .general {
        &__container {
            &:deep() {
                .button__secondary {
                    @apply w-full;
                }
            }
        }
        &__master-container {
            @apply flex flex-col gap-[18px];
        }
        &__other-container {
            @apply flex gap-[10px] flex-wrap;
        }
        &__other-container-card {
            @apply rounded-[4px] h-[72px] w-[110px] flex justify-center items-center  cursor-pointer;
            border: 0.5px solid #14223c;
        }
        &__other-container-item {
            @apply flex flex-col items-center justify-center;
        }
        &__checked {
            @apply border-none;
            background-color: var(--color-primary);
        }
        &__selected-other {
            @apply text-[white];
        }
        &__modal-footer {
            @apply flex justify-end;
        }
        &__other {
            @apply flex  gap-[20px];
        }

        &__item-deletable {
            @apply flex flex-col w-full;
        }

        &__deletable-container {
            @apply w-full flex justify-end;
        }

        //Features
        &__features {
            @apply flex flex-col gap-[18px];
        }
        &__features-body {
            @apply flex flex-col gap-[18px];
        }
        &__features-item {
            @apply rounded-[4px] h-[72px] w-[110px] flex justify-center items-center  cursor-pointer;
            border: 0.5px solid #14223c;
        }

        &__features-container {
            @apply w-full flex flex-wrap gap-[10px];
        }

        &__features-item {
            @apply flex flex-col;
        }
        &__delete {
            @apply cursor-pointer;
        }

        &__delete-item {
            @apply -mt-[20px] -mr-[10px];
        }
        &__features-content {
            @apply flex flex-col gap-[20px];
        }
        //End features
    }

    /**CSS of Inside */
    .inside {
        &__title {
            @apply my-[10px] text-[14px] font-[600];
            color: var(--color-primary);
        }
        &__bedroom {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            @apply flex flex-col gap-[14px] p-[14px] rounded-[8px];
            &-container {
                @apply flex flex-col gap-[14px];
            }
        }
        &__details-container {
            @apply flex flex-col  gap-[24px] flex-wrap;
            &:deep() {
                label {
                    @apply font-[600];
                }
            }
        }
        &__input {
            @apply flex md:flex-1 w-[100%] flex-col;
        }
        &__divider {
            @apply mb-[18px] text-slate-300 mt-[10px];
        }

        &__room-description {
            @apply grid gap-[14px];
            @screen sm {
                @apply grid-cols-2;
            }
            @screen md {
                @apply grid-cols-1;
            }
            @screen lg {
                @apply grid-cols-2;
            }
        }
        &__input-item {
            @apply flex flex-1;
        }

        &__water-details {
            @apply flex flex-col gap-[14px];
        }

        &__water-details-header {
        }
        &__water-details-container {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            @apply flex flex-col gap-[14px] p-[14px] rounded-[8px];
        }

        &__water-details-body {
            @apply grid gap-[10px];
            @screen md {
                @apply grid-cols-2;
            }
        }

        &__input-content {
            @apply flex-1;
        }
    }
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 800px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
