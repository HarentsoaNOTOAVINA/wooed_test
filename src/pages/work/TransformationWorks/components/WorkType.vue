<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="workType">
            <Select
                label="Je souhaite"
                :options="typeOfWorkList"
                name="workType"
                placeholder="Selectionner"
                @change-select="changeTypeOfWork"
            />

            <Select
                v-if="showSubSection"
                label="de type"
                :options="subSectionList"
                name="subSection"
                placeholder="Selectionner"
                @change-select="changeSubSection"
            />

            <Select
                v-if="showChoiceCategory"
                label="dans le category de"
                :options="choiceCategoryList"
                name="choiceCategory"
                placeholder="Selectionner"
                @change-select="changeChoiceCategory"
            />

            <Select
                v-if="showModel"
                label="comme modele le"
                :options="modeleList"
                name="model"
                placeholder="Selectionner"
                @change-select="changeModel"
            />

            <Select
                v-if="showSubModel"
                label="et comme sous modele le "
                :options="subModeleList"
                name="subModel"
                placeholder="Selectionner"
                @change-select="changeSubModel"
            />

            <Input
                v-if="showQuantity && isLatest"
                label="superficie / quantité"
                unity="m2 / m3"
                input-type="number"
                name-input="quantity"
                placeholder="1"
                @input="handleQuantity"
            />
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    let showQuantity = ref<boolean>(false);
    let isLatest = ref<boolean>(false);
    let typeOfWorkList = ref<any>([]);
    let showSubSection = ref<boolean>(false);
    let showChoiceCategory = ref<boolean>(false);
    let showModel = ref<boolean>(false);
    let showSubModel = ref<boolean>(false);
    let subSectionList = ref<any>([]);
    let choiceCategoryList = ref<any>([]);
    let modeleList = ref<any>([]);
    let subModeleList = ref<any>([]);

    const breadcrumbListsData = [
        {
            label: 'Type de travaux',
        },
    ];

    const emit = defineEmits<{
        (e: 'update:showNextButton', v: boolean): void;
    }>();

    onMounted(() => {
        getListTypeOfWork();
    });

    async function getListTypeOfWork() {
        let myTabsWithLabelValue = await store.dispatch(
            'WorksModule/getTypeOfWork'
        );

        typeOfWorkList.value = myTabsWithLabelValue.data.map((tab: any) => {
            return {
                id: tab.id,
                name: tab.name,
                status: tab.status,
                subsections: tab.subsections,
                type: tab.type,
                area: tab.area,
                attach: tab.attach,
                demands: tab.demands,
                label: tab.name,
                value: tab.name,
            };
        });

        console.log(showQuantity.value, 'Show quantity value value');
        console.log(typeOfWorkList.value, 'DDDDDDDDDDDDD');
    }

    function changeTypeOfWork(value: any) {
        console.log(value.workType, 'Value');

        emit('update:showNextButton', true);

        typeOfWorkList.value.forEach(async (element: any) => {
            if (element.name == value.workType) {
                let tabSubSectionResponse = await store.dispatch(
                    'WorksModule/getSubSection',
                    { id: element.id }
                );

                await store.dispatch('WorksModule/setDataIdToPost', {
                    idTypeOfWork: element.id,
                });

                element.area
                    ? (showQuantity.value = true)
                    : (showQuantity.value = false);

                subSectionList.value = concatResultat(
                    tabSubSectionResponse.data
                );

                showSubSection.value = checkNextTab(element.subsections);

                checkLastSection(subSectionList.value);
                console.log(isLatest.value, 'Last value');
            }
        });
    }

    function changeSubSection(value: any) {
        subSectionList.value.forEach(async (subSection: any) => {
            if (subSection.name == value.subSection) {
                console.log(subSection.id);

                let tabSubSectionResponse = await store.dispatch(
                    'WorksModule/getChoiceCategory',
                    { id: subSection.id }
                );

                await store.dispatch('WorksModule/setDataIdToPost', {
                    idSubSection: subSection.id,
                });

                choiceCategoryList.value = concatResultat(
                    tabSubSectionResponse.data
                );

                showChoiceCategory.value = checkNextTab(
                    choiceCategoryList.value
                );

                checkLastSection(choiceCategoryList.value);
            }
        });
    }

    function changeChoiceCategory(value: any) {
        choiceCategoryList.value.forEach(async (choiceCat: any) => {
            if (choiceCat.name == value.choiceCategory) {
                let tabModelResponse = await store.dispatch(
                    'WorksModule/getModel',
                    { id: choiceCat.id }
                );

                await store.dispatch('WorksModule/setDataIdToPost', {
                    idCategory: choiceCat.id,
                });

                modeleList.value = concatResultat(tabModelResponse.data);

                showModel.value = checkNextTab(modeleList.value);

                checkLastSection(modeleList.value);

                console.log(modeleList.value, 'Liste Modeles');
            }
        });
        console.log(value, 'Value Choix de la category');
    }

    function changeModel(value: any) {
        modeleList.value.forEach(async (modelRes: any) => {
            if (modelRes.name == value.model) {
                console.log(modelRes.id, 'MMMMMMMMMMMMMMMMMMM');

                let tabModelResponse = await store.dispatch(
                    'WorksModule/getSubModel',
                    { id: modelRes.id }
                );

                await store.dispatch('WorksModule/setDataIdToPost', {
                    idModel: modelRes.id,
                });

                subModeleList.value = concatResultat(tabModelResponse.data);

                showSubModel.value = checkNextTab(subModeleList.value);

                checkLastSection(subModeleList.value);

                console.log(subModeleList.value, 'Liste sous modele');
            }
        });
    }

    function changeSubModel(value: any) {
        subModeleList.value.forEach(async (subModel: any) => {
            if (subModel.name == value.subModel) {
                await store.dispatch('WorksModule/setDataIdToPost', {
                    idSubModel: subModel.id,
                });

                console.log(subModel.id, 'Liste sous modeddddddddddddddddddle');
            }
        });
    }

    async function handleQuantity(objectValue: any) {
        await store.dispatch('WorksModule/setDataIdToPost', {
            quantity: objectValue.quantity,
        });
        console.log(objectValue.quantity, 'Quantity taped');
    }

    function concatResultat(tableaux: any) {
        return tableaux.map((tab: any) => {
            return {
                id: tab.id,
                name: tab.name,
                status: tab.status,
                label: tab.name,
                value: tab.name,
            };
        });
    }

    function checkNextTab(tableau: Array<any>) {
        let nexCondition = false;
        if (tableau.length > 0) {
            nexCondition = true;
        } else {
            nexCondition = false;
        }

        return nexCondition;
    }

    function checkLastSection(tableau: Array<any>) {
        if (tableau.length == 0) {
            isLatest.value = true;
        } else {
            isLatest.value = false;
        }

        return isLatest.value;
    }
</script>

<style lang="scss" scoped>
    .workType {
        &:deep() {
            .custom-select__wrapper {
                label {
                    @apply font-[600] text-black;
                }
            }
        }
    }
</style>
