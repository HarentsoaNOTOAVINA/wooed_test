<template>
    <div class="newProject">
        <Title :label="title.text" type="h3" :color="title.color" />
        <Form
            :headText="headText"
            @handleSelectOption="handleSelect"
            @handleInputField="handleInput"
            @postData="postData"
            :isshowInput="isShowInput"
            :butondisabled="btndisabled"
            :btnLoading="btnLoading"
        />
        <MapFilter
            :showAllProjectMarker="showAllNewProjectMarker"
            :showAllProjectMarkerByType="showAllProjectMarkerByType"
            :projectTypeTitle="projectTypeTitle"
            :showAllCategoryMarkerByType="showAllCategoryMarkerByType"
            :categoryTypeTitle="allCategoryTypeTitle"
            @changeSelect="showMarker"
            @changeSelectByType="handleByType"
            @changeSelectByTypeFiltered="showMarkerByType"
            @changeSelectByCategory="handleByCategory"
            @changeSelectByCategoryFiltered="showMarkerByCategory"
        />

        <div class="newProject__map">
            <Map
                :key="render | keyMarker"
                :control-config="{
                    rectangle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    circle: false,
                }"
                @on-polygon-created="drawPolygonHandler"
                :needDrawControl="isDraw"
                :needPolygonLayer="true"
                :needFilteredCoords="true"
                :polygonCoordinates="coordPolygon"
                :customMarkerCoords="allProjectMarker"
                :needMarkerLayer="true"
                :markersCoordinates="propertyCoords"
                @touched="handleList"
            />
        </div>
        <div>
            <Button @on-click="refreshList"
                ><span>{{ refreshListTxt }}</span></Button
            >
        </div>
        <div>
            <NewProjectList :allProjectData="allProject" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import { computed, onMounted, ref, watch } from 'vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Form from '../Components/Form/Form.vue';
    import Map from '@/components/section/map/index.vue';
    import NewProjectList from '../Components/NewProjectList/NewProjectList.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MapFilter from '../Components/MapFilter/MapFilter.vue';
    import { Store, useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import { Empty as AEmpty, notification } from 'ant-design-vue';

    const route = useRoute();
    const store: Store<any> = useStore();
    let isShowInput = ref<boolean>(false);
    const headText = ref<string>(
        "M'avertir en cas de publication d'nouveau projet immobilier"
    );
    //vars
    let allData: Array<Object> = [];
    const refreshListTxt = ref<string>('Restaurer la liste');
    //refs
    const title = ref<any>({
        text: 'Liste des nouveaux projets immobiliers de Bruxelles',
        color: 'var(--color-gray-icon)',
    });
    let allProject = ref<Array<any>>([]);
    let allProjectMarker = ref<Array<any>>([]);
    let showAllNewProjectMarker = ref<boolean>(true);
    let showAllProjectMarkerByType = ref<boolean>(false);
    let showAllCategoryMarkerByType = ref<boolean>(false);
    let allProjectType = ref<Array<any>>([]);
    let projectTypeTitle = ref<Array<any>>([]);
    let projectTypeData = ref<Array<any>>([]);
    let allCategoryData = ref<Array<any>>([]);
    let allCategoryTypeTitle = ref<Array<any>>([]);
    let allCategoryTypeCoords = ref<Array<any>>([]);
    let coordsByProjectType = ref<Array<any>>([]);
    let final: any = {};
    let finalCategory: any = {};
    let byProjectMarker = ref<Array<any>>([]);
    let byCategoryWorkMarker = ref<Array<any>>([]);
    let markerToShow = ref<Array<any>>([]);
    let radius = ref<string>('');
    let propertyCoords = ref<Array<any>>([]);
    //render drawing control
    let isDraw = ref<boolean>(false);
    let render = ref<number>(0);
    let keyMarker = ref<number>(0);
    let coordPolygon = ref<Array<any>>([]);
    let btndisabled = ref<boolean>(true);

    let btnLoading = ref<boolean>(false);
    let loading = ref<boolean>(true);
    onMounted(() => {
        getPropertyDetail();
        getAllNewProperty();
        getAllProjectType();
        getAllCategoryType();
    });

    watch(
        () => propertyCoords.value,
        (value) => {
            keyMarker.value += 1;
        }
    );

    watch(
        () => allProjectMarker.value,
        (value) => {
            keyMarker.value += 1;
        }
    );
    let x = ref<any>(byProjectMarker.value);
    watch(
        () => byProjectMarker.value,
        (value) => {
            x.value = value;
            keyMarker.value += 1;
        }
    );

    const refreshList = () => {
        extractData();
    };

    const handleList = (data: any) => {
        allProject.value = [];
        allProject.value.push(data);
        console.log('test:', allProject.value);
    };

    const getPropertyDetail = () => {
        const data = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        propertyCoords.value.push({
            urbaIcon: `${window.location.origin}/src/static/images/map/property-marker.png`,
            lat: data.value[0].latitude,
            lng: data.value[0].longitude,
        });
        console.log('coooooords:', data.value[0]);
        console.log('property coords:', propertyCoords.value);
        // console.log('property:', data.value[0].latitude);
        // console.log('property detail:', data.value[0].region);
    };

    const postData = async (value: any) => {
        try {
            btnLoading.value = true;
            await store.dispatch('UrbanismeModule/setCreatedNewAlert', {
                thePropertyId: route.params.id,
                type: 'NewProject',
                rayon: radius.value,
                perimeter: coordPolygon.value,
            });
            const data = computed(
                () => store.getters['UrbanismeModule/getCreatedNewAlert']
            );
            let status = data.value.data.code;
            if (status === 200) {
                notification['success']({
                    message: 'Vos données sont enregistrer avec success',
                });
                btnLoading.value = false;
            } else if (status == 412) {
                notification['error']({
                    message: 'Le traçage doit englober le point de votre bien',
                    description: 'Veuillez réessayer...',
                });
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoading.value = false;
        }
    };

    const handleInput = (value: any) => {
        radius.value = value.rayon;
        if (radius.value) btndisabled.value = false;
        console.log('value input', value.rayon);
    };

    const showMarkerByCategory = (item: any) => {
        let finalDataCategory: any = [];
        item.forEach((value: any) => {
            const filtered: any = Object.keys(finalCategory).filter(
                (filt: any) => filt.toLowerCase() === value.toLowerCase()
            );
            if (finalCategory) {
                finalDataCategory = [
                    ...finalDataCategory,
                    finalCategory[filtered],
                ];
            } else {
                finalDataCategory = finalCategory[filtered];
            }
            byCategoryWorkMarker.value = finalDataCategory.flat();

            byCategoryWorkMarker.value.forEach((el: any) => {
                allProjectMarker.value.push(el);
            });
            // console.log('aaaaaaaaaaaaaaaaaaaa:', byCategoryWorkMarker.value );
        });
        for (let i = 0; i < allProjectMarker.value.length; i++) {
            if (!item.includes(allProjectMarker.value[i].categoryOfWorks)) {
                allProjectMarker.value.splice(i, 1);
                i--;
                keyMarker.value += 1;
                console.log('mar:', allProjectMarker.value);
            } else {
                keyMarker.value += 1;
            }
        }
        console.log('item for catogory', item);
    };

    const extractAllCategoryCoords = () => {
        let extractedCategory = allCategoryTypeCoords.value.map(
            ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
                latitude,
                longitude,
            }: any) => ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
                urbaIcon: `${window.location.origin}/src/static/images/map/yellow.png`,
                lat: latitude,
                lng: longitude,
            })
        );
        allCategoryTypeTitle.value.forEach((value: any) => {
            const filtered = extractedCategory.filter(
                (filteredValue) =>
                    filteredValue.categoryOfWorks.toLowerCase() ===
                    value.toLowerCase()
            );
            if (finalCategory[value]) {
                finalCategory[value] = [...finalCategory[value], filtered];
            } else {
                finalCategory[value] = filtered;
            }
        });
        console.log('iiiiiiiiiiiiiiiiiiii:', finalCategory);
    };

    const getAllCategoryCoords = async () => {
        for (var i = 0; i < allCategoryTypeTitle.value.length; i++) {
            await store.dispatch('UrbanismeModule/setAllCategoryCoords', {
                categoryOfWorks: allCategoryTypeTitle.value[i],
            });
            const data = computed(
                () => store.getters['UrbanismeModule/getAllCategoryCoords']
            );
            allCategoryTypeCoords.value = [
                ...allCategoryTypeCoords.value,
                ...data.value.data.data,
            ];
        }
        extractAllCategoryCoords();
        console.log('subsubsub:', allCategoryTypeCoords.value);
    };

    const extractAllCategory = () => {
        allCategoryTypeTitle.value = allCategoryData.value.map(
            ({ categoryOfWorks }: any) => {
                return categoryOfWorks;
            }
        );
        console.log('all category type:', allCategoryTypeTitle.value);
    };

    const getAllCategoryType = async () => {
        try {
            loading.value = true;
            await store.dispatch('UrbanismeModule/setAllCategoryType');
            const data = computed(
                () => store.getters['UrbanismeModule/getAllCategoryType']
            );
            allCategoryData.value = data.value.data;
            extractAllCategory();
            getAllCategoryCoords();
            loading.value = false;
        } catch (error) {
            loading.value = false;
        } finally {
            loading.value = false;
        }

        console.log('all category type:', allCategoryData.value);
    };

    const showMarkerByType = (item: any) => {
        console.log('fiiiiiiiiiinnnnnnnaaaaaaaallllll:', final);
        console.log('item selected:', item);
        let finalData: any = [];
        item.forEach((value: any) => {
            const filtered: any = Object.keys(final).filter(
                (filt: any) => filt.toLowerCase() === value.toLowerCase()
            );
            if (finalData) {
                finalData = [...finalData, final[filtered]];
                console.log('anaty if');
            } else {
                finalData = final[filtered];
                console.log('ato anat else');
            }
            byProjectMarker.value = finalData.flat();
            //needed
            byProjectMarker.value.forEach((el: any) => {
                allProjectMarker.value.push(el);
            });
        });

        for (let i = 0; i < allProjectMarker.value.length; i++) {
            if (!item.includes(allProjectMarker.value[i].projectType)) {
                allProjectMarker.value.splice(i, 1);
                i--;
                keyMarker.value += 1;
                console.log('mar:', allProjectMarker.value);
            }
        }
    };

    const showMarker = (item: any) => {
        showAllNewProjectMarker.value = item;

        if (!showAllNewProjectMarker.value) {
            // const removed = allProjectMarker.value.filter(
            //     (rm: any) => rm.projectType
            // );
            // console.log('removed:', removed);
            // allProjectMarker.value = removed;
            allProjectMarker.value = [];
        } else {
            extractCoords();
        }
        console.log('all marker:', allProjectMarker.value);
    };

    const extractCoordsByType = async () => {
        let extracted = projectTypeData.value.map(
            ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
                latitude,
                longitude,
            }: any) => ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
                urbaIcon: `${window.location.origin}/src/static/images/map/blue.png`,
                lat: latitude,
                lng: longitude,
            })
        );

        // let final: any = {};
        projectTypeTitle.value.forEach((value: any) => {
            const filtered = extracted.filter(
                (filteredValue) =>
                    filteredValue.projectType.toLowerCase() ===
                    value.toLowerCase()
            );
            if (final[value]) {
                final[value] = [...final[value], filtered];
            } else {
                final[value] = filtered;
            }
        });
        console.log('coords by project type:', final);
    };

    const getProjectTypeCoords = async () => {
        for (var i = 0; i < projectTypeTitle.value.length; i++) {
            await store.dispatch('UrbanismeModule/setAllProjectTypeCoords', {
                projectType: projectTypeTitle.value[i],
            });
            const data = computed(
                () => store.getters['UrbanismeModule/getAllProjectTypeCoords']
            );
            projectTypeData.value = [
                ...projectTypeData.value,
                ...data.value.data.data,
            ];
        }
        extractCoordsByType();
        console.log('project type data:', projectTypeData.value);
    };

    const extractProjectTypeTitle = () => {
        projectTypeTitle.value = allProjectType.value.map(
            ({ projectType }: any) => {
                return projectType;
            }
        );
        // console.log('project type title', projectTypeTitle.value);
    };

    const getAllProjectType = async () => {
        try {
            await store.dispatch('UrbanismeModule/setAllProjectType');
            const data = computed(
                () => store.getters['UrbanismeModule/getAllProjectType']
            );
            let statusCode = data.value.code;
            if (statusCode === 200) {
                console.log('azo le izy');
            }
            // console.log("data project type:", data.value.data)
            allProjectType.value = data.value.data;
            extractProjectTypeTitle();
            getProjectTypeCoords();
            // console.log(' project Type Title:', projectTypeTitle.value);
            // console.log('all projectType:', allProjectType.value);
        } catch (error) {}
    };

    const handleByCategory = (item: any) => {
        showAllCategoryMarkerByType.value = item;
        console.log('choice by category:', item);
    };

    const handleByType = (item: any) => {
        showAllProjectMarkerByType.value = item;
        // if(!showAllProjectMarkerByType.value){
        //     byProjectMarker.value = []
        // }
        console.log('choice by type:', item);
    };

    const getAllNewProperty = async () => {
        try {
            await store.dispatch('UrbanismeModule/setAllNewPropertyProject');
            const data = computed(
                () => store.getters['UrbanismeModule/getAllNewPropertyProject']
            );
            allData = data.value;
            console.log('all data:', allData);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        }
        extractData();
        extractCoords();
    };
    const extractData = () => {
        allProject.value = allData.map(
            ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
            }: any) => ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
                icon: 'qqq',
            })
        );
        console.log('extracted data sssssssssssssssssss :', allProject.value);
    };

    const extractCoords = () => {
        allProjectMarker.value = allData.map(
            ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
                latitude,
                longitude,
            }: any) => ({
                identity,
                municipalRef,
                regionalRef,
                rue,
                number,
                municipality,
                projectType,
                objectRequest,
                categoryOfWorks,
                urbaIcon: `${window.location.origin}/src/static/images/map/green.png`,
                lat: latitude,
                lng: longitude,
            })
        );
        console.log('icon added:', allProjectMarker.value);
    };

    const handleSelect = (value: any) => {
        if (value.choiceAlert === 'rayon') {
            isShowInput.value = true;
            isDraw.value = false;
            render.value += 1;
        } else if (value.choiceAlert === 'tracer') {
            console.log('choice:', value.choiceAlert);
            isShowInput.value = false;
            isDraw.value = true;
            render.value -= 1;
        }
    };

    const drawPolygonHandler = (latlong: any) => {
        coordPolygon.value = latlong.latlng;
        if (coordPolygon.value) {
            btndisabled.value = false;
        }
    };
</script>

<style lang="scss" scoped>
    .newProject {
        &__map {
            @apply h-[258px] mt-[18px] rounded-sm;
        }
    }
</style>
