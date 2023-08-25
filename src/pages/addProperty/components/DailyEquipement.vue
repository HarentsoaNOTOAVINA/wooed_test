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
                    <div class="general__features-content">
                        <!-- Selection des equipements pour la vie quotidienne -->
                        <div class="general__features-container">
                            <div
                                class="general__other-container-card"
                                v-if="loadingOption"
                            >
                                <LoadingButton size="xs" theme="dark" />
                            </div>
                            <template
                                v-for="filter in [
                                    'forGeneral',
                                    'forChicken',
                                    'forChamber',
                                    'forBath',
                                    'forEntertainment',
                                ]"
                            >
                                <Paragraphe class="font-bold">{{
                                    getTitle(filter)
                                }}</Paragraphe>
                                <div
                                    v-if="
                                        dataDaily.some(
                                            (item: any) => item[filter]
                                        )
                                    "
                                    class="flex gap-4 flex-wrap w-full"
                                >
                                    <div
                                        v-for="(
                                            item, index
                                        ) in dataDaily.filter(
                                            (item: any) => item[filter]
                                        )"
                                        :key="index"
                                        class="general__other-container-card"
                                        @click="
                                            item.id &&
                                                getDropedList({
                                                    id: item.id,
                                                    level: 0,
                                                })
                                        "
                                        :class="[dailyNeedSelected[0].dailyNeeded.some((i: any) => i === item.id) || !item.id ? 'general__checked' : '']"
                                    >
                                        <div
                                            class="general__item-deletable"
                                            v-if="!item.id"
                                        >
                                            <div
                                                class="general__deletable-container"
                                            >
                                                <Delete
                                                    @click="
                                                        handleDeleteFeature(
                                                            item.name
                                                        )
                                                    "
                                                    class="general__delete-item general__deletable"
                                                />
                                            </div>
                                            <div
                                                class="general__other-container-item"
                                            >
                                                <i
                                                    class="general__selected-other"
                                                />
                                                <a-tooltip placement="topRight">
                                                    <template #title>
                                                        <span>{{
                                                            item.name
                                                        }}</span>
                                                    </template>
                                                    <Paragraphe
                                                        class="general__selected-other  w-full text-center overflow-hidden text-overflow-ellipsis"
                                                    >
                                                        {{ item.name }}
                                                    </Paragraphe>
                                                </a-tooltip>
                                            </div>
                                        </div>
                                        <div
                                            class="general__other-container-item"
                                            v-else
                                        >
                                            <i
                                                :class="[dailyNeedSelected[0].dailyNeeded.some((i: any) => i === item.id) ? `general__selected-other ${item.icon}` : item.icon]"
                                            />
                                            <Paragraphe
                                                class=" w-full text-center overflow-hidden text-overflow-ellipsis"
                                                :class="[dailyNeedSelected[0].dailyNeeded.some((i: any) => i === item.id) ? 'general__selected-other' : '']"
                                            >
                                                {{ item.name }}
                                            </Paragraphe>
                                        </div>
                                    </div>
                                    <!-- Ajouter autre element -->
                                    <div class="general__other-container-card">
                                        <div
                                            class="general__other-container-item"
                                            @click="onOpenModal(filter)"
                                        >
                                            <Add />
                                            <Paragraphe> Autres </Paragraphe>
                                        </div>
                                    </div>
                                </div>
                                <hr class="inside__divider" />
                            </template>
                        </div>
                    </div>
                </div>

                <Modal
                    :is-show-modal="isShow"
                    @on-back="onOpenModal"
                    :title="'Autre élément' + ' ' + getTitle(otherSelected)"
                >
                    <template #content>
                        <div
                            class="mb-4"
                            v-for="(item, idItem) in modalItemFeature"
                            :key="item.id"
                        >
                            <Input
                                :name-input="item.name"
                                :label="item.label"
                                :input-type="item.type"
                                @input="handleChangeModalValue"
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
    import { ref, watch, onMounted, computed } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Add from '@/components/Icon/AddOptions.vue';
    import Delete from '@/components/Icon/deleteRoudedBG.vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { useStore } from 'vuex';
    import { Tooltip as ATooltip } from "ant-design-vue";
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

    let dailyNeedDatas = computed(
        () => store.getters['AddProductModule/getDailyNeeded']
    );

    const dataDaily = ref<any>(dailyNeedDatas);

    const paramsItem = ref<any>({
        name: '',
    });
    const params = ref<any>({
        thepropertyFeatures: [],
        otherOptions: [],
        dailyNeeds: [],
    });

    const dailyNeedSelected = ref<any[]>([{ dailyNeeded: [] }]);
    let newParamsItem = Object.assign({}, paramsItem.value);
    const content = ref<string>(props.titleLabel);
    const loadingOption = ref<boolean>(false);
    const otherSelected = ref<string>('');

    const defaultValue = ref<any>({
        glassType: null,
        heatingType: null,
    });

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(() => {
        fetchApi(
            store.dispatch('AddProductModule/getDailyNeeded'),
            'loadingOption'
        );
    });

    watch(
        () => store.getters['AddProductModule/getDailyNeeded'],
        (value) => {
            dataDaily.value = value;
        },
        { immediate: true, deep: true }
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

    watch(
        () => defaultValue.value,
        (value) => {
            defaultValue.value = value;
        },
        { immediate: true, deep: true }
    );

    /***End initial data of inside */

    watch(
        dailyNeedSelected.value,
        (data) => {
            console.log(data, 'SELECTED');
            store.dispatch('AddProductModule/setPropertyData', {
                data: { dailyNeeds: [...data] },
            });
        },
        { immediate: true, deep: true }
    );
    watch(
        dataDaily.value,
        (data) => {
            dataDaily.value = data;
        },
        { immediate: true, deep: true }
    );

    function getTitle(filter: string) {
        switch (filter) {
            case 'forChicken':
                return 'Pour la cuisine';
            case 'forBath':
                return 'Pour la salle de bain';
            case 'forChamber':
                return 'Pour la chambre';
            case 'forEntertainment':
                return 'Pour le divertissement';
            case 'forGeneral':
                return 'Général';
            default:
                return '';
        }
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        console.log(
            store.getters['AddProductModule/getAddPropertyDatas'],
            'getAddPropertyDatas'
        );
        emit('onClickNext');
    }

    function finished() {
        emit('onClickFinished');
    }
    /**
     * Initial data of inside
     */

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

    function getDropedList(list: dropedelement) {
        let isExist: boolean = dailyNeedSelected.value[
            list.level
        ].dailyNeeded.some((i: any) => i === list.id);

        if (!isExist) {
            dailyNeedSelected.value[list.level].dailyNeeded.push(+list.id);
            const data = { dailyNeeds: [...dailyNeedSelected.value] };
            store.dispatch('AddProductModule/setPropertyData', {
                data,
            });
        } else {
            let indexExist = null;
            dailyNeedSelected.value[list.level].dailyNeeded.forEach(
                (item: any, idItem: number) => {
                    if (item === list.id) {
                        indexExist = idItem;
                    }
                }
            );
            if (indexExist || indexExist === 0) {
                dailyNeedSelected.value[list.level].dailyNeeded.splice(
                    indexExist,
                    1
                );
                store.dispatch('AddProductModule/setPropertyData', {
                    data: { dailyNeeds: [...dailyNeedSelected.value] },
                });
            }
        }
    }

    function onOpenModal(filter: string) {
        isShow.value = !isShow.value;
        // indexItem.value = key + 1;
        otherSelected.value = filter;
    }

    function handleChangeModalValue(value: any) {
        console.log(value);

        for (let i in value) {
            newParamsItem.name = value[i];
        }
    }

    async function handleAddFeature() {
        const category = otherSelected.value;

        if (category === 'forChicken') {
            dataDaily.value.push({ ...newParamsItem, forChicken: true });
            dailyNeedSelected.value[0].dailyNeeded.push({
                ...newParamsItem,
                forChicken: true,
            });
        } else if (category === 'forBath') {
            dataDaily.value.push({ ...newParamsItem, forBath: true });
            dailyNeedSelected.value[0].dailyNeeded.push({
                ...newParamsItem,
                forBath: true,
            });
        } else if (category === 'forChamber') {
            dataDaily.value.push({ ...newParamsItem, forChamber: true });
            dailyNeedSelected.value[0].dailyNeeded.push({
                ...newParamsItem,
                forChamber: true,
            });
        } else if (category === 'forEntertainment') {
            dataDaily.value.push({ ...newParamsItem, forEntertainment: true });
            dailyNeedSelected.value[0].dailyNeeded.push({
                ...newParamsItem,
                forEntertainment: true,
            });
        } else if (category === 'forGeneral') {
            dataDaily.value.push({ ...newParamsItem, forGeneral: true });
            dailyNeedSelected.value[0].dailyNeeded.push({
                ...newParamsItem,
                forGeneral: true,
            });
        }
        console.log(dataDaily.value, dailyNeedSelected.value);

        isShow.value = false;
    }

    async function handleDeleteFeature(itemName: string) {
        const index = dataDaily.value.findIndex(
            (item: any) => item.name === itemName
        );
        if (index !== -1) {
            dataDaily.value.splice(index, 1);
        }

        const selectedIndex = dailyNeedSelected.value[0].dailyNeeded.findIndex(
            (item: any) => item.name === itemName
        );
        if (selectedIndex !== -1) {
            dailyNeedSelected.value[0].dailyNeeded.splice(selectedIndex, 1);
        }

        console.log(dataDaily.value, dailyNeedSelected.value);
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
            @apply rounded-[4px] h-[72px] w-[160px] flex justify-center items-center relative cursor-pointer;
            border: 0.5px solid #14223c;
        }
        &__other-container-item {
            @apply flex flex-col items-center justify-center w-full p-2 h-[60px];
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
            @apply w-full flex flex-col flex-wrap gap-[10px];
        }

        &__features-item {
            @apply flex flex-col;
        }
        &__delete {
            @apply cursor-pointer;
        }

        &__delete-item {
            @apply absolute -mt-[10px] -mr-[10px];
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
