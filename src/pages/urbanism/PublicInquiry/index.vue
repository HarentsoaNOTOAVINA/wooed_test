<template>
    <div class="publicInquiry">
        <Title :label="titleStyle.text" type="h3" :color="titleStyle.color" />
        <Hr />
        <div>
            <span class="publicInquiry__firstText">{{
                publicInquiryText.first
            }}</span>
            <Select
                :name="selectData.name"
                :options="selectData.options"
                @change-select="handleSelect"
                placeholder="Rayou ou traçage"
            />
            <div v-if="state.isShowInput">
                <Input
                    :label="publicInquiryText.second"
                    :placeholder="publicInquiryText.placeholderInput"
                    @input="handleInput"
                    name-input="rayon"
                />
            </div>
            <Button :disabled="btndisabled" @on-click="postData"
                ><LoadingButton v-if="loadingButton" size="xs" /><span>{{
                    btnData
                }}</span></Button
            >
        </div>
        <div class="publicInquiry__map">
            <Map
                :key="render || keyMarker"
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
                :polygonCoordinates="coordPolygon"
                :needMarkerLayer="true"
                :markersCoordinates="propertyCoords"
            />
        </div>
        <div class="publicInquiry__list">
            <div class="absolute" v-if="isLoading">
                <Loader />
            </div>
            <div v-else>
                <InquiryListMobile v-if="screenType <= 375" :brux="brux" />
                <InquiryList v-else />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { bruxHead } from '../Components/InquiryList/dataInquiryList';
    import Title from '@/components/Common/Title/Title.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Map from '@/components/section/map/index.vue';
    import InquiryList from '../Components/InquiryList/InquiryList.vue';
    import InquiryListMobile from '../Components/InquiryList/InquiryListMobile.vue';
    import { computed, onMounted, reactive, ref, watch } from 'vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    const store: Store<any> = useStore();
    const route = useRoute();
    const screenType = ref<number>(screen.width);
    const titleStyle = ref<any>({
        text: 'Enquete publiques en cours',
        color: 'var(--color-gray-icon)',
    });
    const publicInquiryText = ref<any>({
        first: "M'avertir en cas de publication d'une enquete public",
        second: 'Rayon en km de mon domicile',
        placeholderInput: 'km',
    });

    const selectData = ref<any>({
        name: 'choiceAlert',
        options: [
            {
                label: 'Rayon en km',
                value: 'rayon',
            },
            {
                label: 'Traçer sur la carte',
                value: 'tracer',
            },
        ],
    });

    const btnData = ref<string>("M'envoyer les coordonnées");

    let state = reactive({
        isShowInput: false,
        doNeedDrawPolygon: false,
    });

    let loadingButton = ref<boolean>(false);

    onMounted(() => {
        console.log('property id:', route.params.id);
        getList();
        getPropertyDetail();
    });

    let coordPolygon = ref<Array<any>>([]);
    let radius = ref<string>('');
    let btndisabled = ref<boolean>(true);

    //render drawing control
    let isDraw = ref<boolean>(false);
    let render = ref<number>(0);

    //property coords
    let propertyCoords = ref<Array<any>>([]);
    let keyMarker = ref<number>(0);

    //vars mobile list
    const anver = ref<Array<any>>([]);
    const brux = ref<Array<any>>([]);
    const region = ref<string>('');
    let isLoading = ref<boolean>(false);
    //List data-----------------------------
    let bruxData: Array<Object> = [];
    let anverData: Array<Object> = [];

    watch(
        () => propertyCoords.value,
        (value) => {
            keyMarker.value += 1;
        }
    );

    const extractData = () => {
        anver.value = anverData.map(
            ({
                projectNummer,
                adres,
                nummer,
                gementee,
                voorwerpVanDeAanvraag,
            }: any) => ({
                projectNummer,
                adres,
                nummer,
                gementee,
                voorwerpVanDeAanvraag,
            })
        );

        brux.value = bruxData.map(
            ({
                identifier,
                municipalReference,
                street,
                number,
                municipality,
                objectOFRequest,
                inquiryStartDate,
                inquiryEndDate,
            }: any) => ({
                identifier,
                municipalReference,
                street,
                number,
                municipality,
                objectOFRequest,
                inquiryStartDate,
                inquiryEndDate,
            })
        );
        console.log('data brux extracted:', brux.value);
    };
    const getList = async () => {
        try {
            isLoading.value = true;
            await store.dispatch('UrbanismeModule/setPublicInquiryList');
            const data = computed(
                () => store.getters['UrbanismeModule/getPublicInquiryList']
            );
            anverData = data.value.data.anvers;
            bruxData = data.value.data.bruxelles;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
            // isLoading.value = false;
            console.log('error:', error);
        } finally {
            isLoading.value = false;
        }
        console.log('anver data:', anverData);
        extractData();
    };

    const getPropertyDetail = () => {
        const data = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        propertyCoords.value.push({
            lat: data.value[0].latitude,
            lng: data.value[0].longitude,
        });
        console.log('coooooords:', data.value[0]);
        console.log('property coords:', propertyCoords.value);
        // console.log('property:', data.value[0].latitude);
        // console.log('property detail:', data.value[0].region);
    };

    const postData = async () => {
        try {
            loadingButton.value = true;
            await store.dispatch('UrbanismeModule/setCreatePublicInquiry', {
                thePropertyId: route.params.id,
                type: 'PublicInquiry',
                rayon: radius.value,
                perimeter: coordPolygon.value,
            });
            const data = computed(
                () => store.getters['UrbanismeModule/getCreatedPublicInquiry']
            );
            let status = data.value.data.code;
            if (status === 200) {
                notification['success']({
                    message: 'Vos données sont enregistrer avec success',
                });
                loadingButton.value = false;
            } else if (status === 412) {
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
            loadingButton.value = false;
        }
    };

    const handleInput = (value: any) => {
        radius.value = value.rayon;
        btndisabled.value = false;
    };

    const handleSelect = (value: any) => {
        if (value.choiceAlert === 'rayon') {
            state.isShowInput = true;
            isDraw.value = false;
            render.value += 1;
        } else if (value.choiceAlert === 'tracer') {
            state.isShowInput = false;
            isDraw.value = true;
            render.value += 1;
        }
    };

    const drawPolygonHandler = (latlong: any) => {
        coordPolygon.value = latlong.latlng;
        btndisabled.value = false;
        console.log('polygons:', coordPolygon.value);
    };
</script>

<style lang="scss" scoped>
    .publicInquiry {
        &__firstText {
            color: var(--color-primary);
            @apply mb-[10px] block;
        }
        &__map {
            @apply h-[258px] mt-[18px] rounded-sm;
        }
        &__list {
            @apply flex flex-col items-center justify-center;
            &:deep() {
                .custom-loader {
                    position: absolute;
                    margin-top: 100px;
                }
            }
        }
    }
</style>
