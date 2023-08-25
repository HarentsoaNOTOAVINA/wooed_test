<template>
    <div v-if="loading"><Loader /></div>
    <div v-else class="container education__form">
        <!-- <Title :label="title" type="h4" class="education__title" /> -->
        <!-- <Hr /> -->
        <div class="education__map">
            <Map
                :control-config="{
                    rectangle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    circle: false,
                }"
                @on-polygon-created="drawPolygonHandler"
                :needDrawControl="true"
                :needPolygonLayer="true"
                :polygonCoordinates="coordPolygon"
            />
        </div>
        <span class="education__map-info">{{ mapElement.text }}</span>
        <div>
            <label class="education__label__radio" for="">Niveau</label>
            <div class="education__radioSection">
                <RadioGroup>
                    <Radio
                        v-for="(item, index) in levelist"
                        :key="index"
                        :value="item.id"
                        @click="handleRadio"
                        >{{ item.label }}</Radio
                    >
                </RadioGroup>
            </div>
            <div>
                <label class="education__label" for="schoolChoice">{{
                    selectData[0].item[0].label
                }}</label>
                <Select
                    placeholder="Ecoles"
                    :disabled="state.selectSchoolDisabled"
                    :name="selectData[0].item[0].name"
                    :options="schoolList"
                    @change-select="handleSelect"
                />
                <label class="education__label" for="classChoice">{{
                    selectData[0].item[1].label
                }}</label>
                <Select
                    :disabled="state.selectClassDisabled"
                    :options="classList"
                    :name="selectData[0].item[1].name"
                    @change-select="handleSelect"
                />
            </div>
        </div>
        <div class="education__finalBtn">
            <Button
                :disabled="state.btnDisabled"
                @on-click="createEducation"
                typeButton="gray"
                ><LoadingButton v-if="loadingButton" size="xs" />{{ btnText }}
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Map from '@/components/section/map/index.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { RadioGroup, Radio } from 'ant-design-vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { mapElement, selectData } from './educationData';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { Store, useStore } from 'vuex';

    // const title = ref<string>('Seléctionner votre école');
    const btnText = ref<string>('Terminer');
    let loading = ref<boolean>(false);
    let loadingButton = ref<boolean>(false);

    //Form value
    const levelist = ref<Array<any>>([]);
    const schoolList = ref<Array<any>>([]);
    const classList = ref<Array<any>>([]);

    //disabled input & btn
    let state = reactive({
        selectSchoolDisabled: true,
        selectClassDisabled: true,
        btnDisabled: true,
    });

    //params value
    let coordPolygon = ref<Array<object>>([]);
    let levelValue = ref<string>('');
    let schoolValue = ref<string>('');
    let classValue = ref<string>('');
    let idLevelSelected = ref<number>();
    let idSchoolSelected = ref<number>();
    const store: Store<any> = useStore();

    onMounted(() => {
        getLevelList();
    });

    const createEducation = async () => {
        loadingButton.value = true;
        await store.dispatch('EducationModule/setCreateEducation', {
            class: { name: schoolValue.value },
            schools: idSchoolSelected.value,
            level: idLevelSelected.value,
        });
        const data = computed(
            () => store.getters['EducationModule/getCreatedEducation']
        );
        let status = data.value.data.code;
        if (status === 201) {
            loadingButton.value = false;
            notification['success']({
                message: 'Vos données ont bien créer',
                description:
                    'Vous allez etre rediriger vers la page COMMUNAUTE',
            });
            // redirect to community
        } else {
            loadingButton.value = false;
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        }
        console.log('created data:', data.value.data.code);
    };

    const handleSelect = (value: any) => {
        console.log('handle select:', value);
        if (value.schoolChoice) {
            schoolValue.value = value.schoolChoice;
            let id = schoolList.value.filter((value) => {
                return value.label === schoolValue.value;
            });
            idLevelSelected.value = id[0].levels.id;
            idSchoolSelected.value = id[0].id;

            getClassList(idLevelSelected.value, idSchoolSelected.value);
        } else if (value.classChoice) {
            classValue.value = value.classChoice;
            state.btnDisabled = false;
            console.log('class value:', classValue.value);
        }
        classList.value = [];
    };

    const drawPolygonHandler = (latlong: any) => {
        console.log('latlong:', JSON.stringify(latlong.latlng));
        coordPolygon.value = latlong.latlng;
        getSchoolList(levelValue.value, coordPolygon.value);
    };

    const handleRadio = async (e: any) => {
        levelValue.value = e.target.value;
        coordPolygon.value = [];
        getSchoolList(levelValue.value, coordPolygon.value);
        // await store.dispatch('EducationModule/setSchoolList', { level: 1 });
        // console.log('radio value', levelValue.value);
    };

    const getClassList = async (level: any, school: any) => {
        await store.dispatch('EducationModule/setClassList', {
            level,
            school,
        });
        const data = computed(
            () => store.getters['EducationModule/getClassList']
        );
        classList.value = data.value.data.data;
        console.log('class list:', classList.value);
        if (levelist.value.length !== 0) {
            state.selectClassDisabled = false;
        }
    };

    const getSchoolList = async (level: any, polygons: any) => {
        loading.value = true;
        await store.dispatch('EducationModule/setSchoolList', {
            level,
            polygons,
        });
        const data = computed(
            () => store.getters['EducationModule/getSchoolList']
        );

        schoolList.value = data.value.data.data.map(
            ({ id, label, value, levels }: any) => ({
                id: id,
                label: label,
                value: value,
                levels: levels,
            })
        );
        loading.value = false;
        if (schoolList.value.length !== 0) {
            state.selectSchoolDisabled = false;
        }

        // if (schoolList.value.length !== 0) {
        //     state.selectSchoolDisabled = false;
        // }
        console.log('selectDisabled:', state.selectSchoolDisabled);
        console.log('school list label value:', schoolList.value);
        // console.log('school list:', schoolList.value);
    };

    const getLevelList = async () => {
        loading.value = true;
        await store.dispatch('EducationModule/setLevelList');
        const data = computed(
            () => store.getters['EducationModule/getLevelList']
        );
        console.log('levelist length:', levelist.value);
        levelist.value = data.value;
        if (levelist.value.length !== 0) {
            loading.value = false;
        }
        console.log('level list:', levelist.value);
    };
</script>

<style lang="scss" scoped>
    .education {
        &__form {
            // height: calc(100vh - 133px);
            // overflow-y: auto;
        }
        &__title {
            color: #606060;
        }
        &__map {
            @apply h-[258px] mt-[18px] rounded-sm;
        }
        &__map-info {
            @apply block mt-[8px] mb-[18px] font-light;
        }
        &__radioSection {
            @apply mb-[18px];
            &:deep() {
                .ant-radio-group-outline {
                    display: flex;
                }
            }
        }
        &__label__radio,
        &__label {
            @apply block font-semibold mb-[10px];
        }
        &__label__radio {
            @apply mb-[5px];
        }
        &__finalBtn {
            @apply flex justify-end;
        }
    }
</style>
