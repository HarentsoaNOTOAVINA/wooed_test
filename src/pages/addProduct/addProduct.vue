<script lang="ts" setup>
    import {
        ref,
        reactive,
        shallowRef,
        onMounted,
        onUnmounted,
        watch,
        computed,
        h,
    } from 'vue';
    import { particularMenu } from './data';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Document from '@/pages/addProduct/components/Documents/Documents.vue';
    import PropertyType from '@/pages/addProduct/components/PropertyType/PropertyType.vue';
    import SideBar from '@/pages/addProduct/components/SideBar/SideBar.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Adress from '@/pages/addProduct/components/Address/Address.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import { FontAwesomePromise } from '@/composables/useFontAwesome';
    import { useStore, Store } from 'vuex';
    import {
        NavigationGuardNext,
        RouteRecordRaw,
        RouterView,
        onBeforeRouteLeave,
        useRoute,
        useRouter,
    } from 'vue-router';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { useSlug } from '@/composables/user/useUsernameSlug';
    import {
        data,
        dataGround,
    } from '@/pages/addProduct/components/SideBar/data';
    import ParticularChoice from './components/ParticularChoice/ParticularChoice.vue';
    import BackButtonVue from '@/components/Common/BackButton/BackButton.vue';
    import { Popconfirm as APopconfirm, notification } from 'ant-design-vue';
    import routes from '@/routes/routes';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import ModalConfimation from './components/ModalConfimation/ModalConfimation.vue';

    interface infoTyppe {
        [key: string]: any;
    }

    const slug = useSlug();
    let activeComp = shallowRef<Array<object | any>>([Adress]);

    const text = reactive({
        particularModeTitle: 'Mode de vente*',
        redirectionPath: null,
        pageName: 'Mes annonces',
    });
    const pageReady = ref<boolean>(false);
    const idFirstStep = ref<number>(1);

    const energeticData = ref<infoTyppe>({
        gazConnect: {
            content: 'Votre rue n’est pas raccordé au fournisseur de Gaz',
            exist: 'Votre rue est raccordé au fournisseur de Gaz',
            condition: false,
            name: 'gazSupplier',
            supplierName: '',
        },
        waterConnect: {
            content: 'Votre rue n’est pas raccordé au fournisseur de Eau',
            exist: "Votre rue est raccordé au fournisseur d' Eau",
            condition: false,
            name: 'waterSupplier',
            supplierName: '',
        },
        electricity: {
            content:
                'Votre rue n’est pas raccordé au fournisseur d’éléctricité',
            exist: 'Votre rue est raccordé au fournisseur d’éléctricité',
            condition: false,
            name: 'elecSupplier',
            supplierName: '',
        },
    });
    const store = useStore();
    const current = ref<number>(0);
    const isParticular = ref<boolean>(false);
    const title = ref<string>("Type d'annonce");
    const loadMap = ref<boolean>(true);
    const router = useRouter();
    const route = useRoute();
    const loadingFinish = ref(false);
    const energyCaracteristic = ref<{}>({});
    let userDetail = computed(() => store.getters['UserModule/getUserDetails']);
    const roleUser = ref<any>('');
    const element = ref<Array<any>>([]);
    const propertyData = computed(
        () => store.getters['AddProductModule/getAddPropertyDatas']
    );
    const properyType = ref<number>(0);
    const locationMinutes = ref<boolean>(false);
    const postUranDoc = ref<boolean>(false);
    const particularChoice = ref<string>('');
    const location = ref<boolean>(false);
    const energySupplier = ref<{
        waterSupplier: string;
        gazSupplier: string;
        elecSupplier: string;
    }>({ waterSupplier: '', gazSupplier: '', elecSupplier: '' });
    enum Role {
        pro = 'ROLE_PRO',
        part = 'ROLE_PART',
    }

    const isFinished = ref<boolean>(false);
    const listComponent = ref<any>([]);
    const stepCurrent = ref<number>(0);
    const currentStep = ref<any>(0);
    const isLoadSaveSession = ref<boolean>(false);

    onMounted(async () => {
        fetchAPI().finally(() => {
            loadMap.value = false;
        });
        await getRoleUsers();
        await getOperationType();
        setSideBar();
        FontAwesomePromise.then((state: any) => {
            // console.log(state);
        });
        pageReady.value = true;
    });

    async function getRoleUsers() {
        roleUser.value = (await store.getters[
            'UserModule/getUserDetails'
        ].roles.includes('ROLE_PRO'))
            ? Role.pro
            : Role.part;
    }

    function setSideBar() {
        if (roleUser.value === Role.pro && properyType.value === 2) {
            element.value = dataGround;
        } else {
            element.value = data;
        }
    }
    function handleChoseEnergySupplier(evt: any, supplierName: any) {
        const [k, v] = Object.entries(evt)[0];
        energySupplier.value = {
            ...energySupplier.value,
            [k]: v ? supplierName : '',
        };
    }

    watch(
        () => energySupplier.value,
        (data) => {
            store.dispatch('AddProductModule/setPropertyData', { data });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            for (let i in value) {
                if (i === 'propertyType') {
                    properyType.value = value[i];
                    setSideBar();
                }
                if (i === 'locationType') {
                    if (value[i].split(' ').includes('minute')) {
                        locationMinutes.value = true;
                    } else {
                        locationMinutes.value = false;
                        location.value = true;
                    }
                }
            }
        },
        { immediate: true, deep: true }
    );

    const propertyDetails = computed(
        () => store.getters['AddProductModule/getAddPropertyDatas']
    );

    const addPropertyStep = computed(
        () => store.getters['AddProductModule/getAddPropertyStep']
    );
    function getTypeProperty(id: any) {
        const allType: Array<any> =
            store.getters['AddProductModule/getPropertyType'];
        const type = allType.find((item) => item.id === id);
        // console.log('Ito aaaa\n', type.name);
        if (type && (type.name === 'Terrain' || type.name === 'terrain')) {
            return true;
        } else {
            return false;
        }
    }

    // disable or enable next button according to step datas
    const enabeNextButton = computed(() => {
        if (!locationMinutes.value) {
            switch (current.value) {
                case 0:
                    return addPropertyStep.value.type;
                case 1:
                    return addPropertyStep.value.property;

                case 2:
                    return addPropertyStep.value.address;
                // return addPropertyStep.value.price;

                // return true;
                case 3:
                    return addPropertyStep.value.livingArea;

                // return addPropertyStep.value.property
                case 4:
                    // return addPropertyStep.value.price;
                    // return true;
                    if (getTypeProperty(properyType.value)) {
                        return true;
                    } else {
                        return addPropertyStep.value.interior;
                    }

                // return addPropertyStep.value.general;

                // case 4:
                //     if (getTypeProperty(properyType.value)) {
                //         return true;
                //     } else {
                //         return addPropertyStep.value.interior;
                //     }
                // return true
                // return addPropertyStep.value.general;
                case 5:
                    return true;
                case 6:
                    if (getTypeProperty(properyType.value)) {
                        return true;
                    } else {
                        if (
                            store.getters[
                                'ProductsListModule/getOperationType'
                            ] === 'lease'
                        ) {
                            return true;
                        } else {
                            return addPropertyStep.value.energyCharacteristic;
                        }
                    }
                // return addPropertyStep.value.energyCharacteristic;

                // }
                // return addPropertyStep.value.interior;
                case 7:
                    return true;
                case 8:
                    return true;
                case 9:
                    return true;

                case 10:
                    /**Environnement */
                    return true;
                case 11:
                    if (getTypeProperty(properyType.value)) {
                        return addPropertyStep.value.media;
                    } else {
                        /**Urbanisme */
                        return true;
                    }
                case 12:
                    if (getTypeProperty(properyType.value)) {
                        return true;
                    }
                    return addPropertyStep.value.media;

                case 13:
                    /**Disponibilité */
                    return true;
                // return addPropertyStep.value.energyCharacteristic;

                case 14:
                    if (getTypeProperty(properyType.value)) {
                        return addPropertyStep.value.price;
                    }
                    /**Revenue cadastrale */
                    return true;

                case 15:
                    if (getTypeProperty(properyType.value)) {
                        if (location.value) {
                            return addPropertyStep.value.adDesc;
                        } else {
                            return true;
                        }
                    }
                    return addPropertyStep.value.price;

                // return addPropertyStep.value.adDesc;
                case 16:
                    return addPropertyStep.value.documents;
                case 17:
                    return true;
                default:
                    return true;
            }
        } else {
            switch (current.value) {
                case 0:
                    return addPropertyStep.value.type;
                case 1:
                    return addPropertyStep.value.property;

                case 2:
                    return addPropertyStep.value.address;
                // return addPropertyStep.value.price;

                // return true;
                case 3:
                    return addPropertyStep.value.livingArea;
                case 4:
                    // if( roleUser.value === Role.pro && properyType.value === 2){

                    if (getTypeProperty(properyType.value)) {
                        return true;
                    } else {
                        return addPropertyStep.value.media;
                    }
                // return true;
                case 5:
                    // if( roleUser.value === Role.pro && properyType.value === 2){
                    //     // return addPropertyStep.value.detailDescription;
                    //     return true;
                    // }
                    if (getTypeProperty(properyType.value)) {
                        return true;
                    } else {
                        return addPropertyStep.value.price; //initerior;
                    }

                // return true
                case 6:
                    return true; //initerior;

                case 7:
                    //  if( roleUser.value === Role.pro && properyType.value === 2){
                    //     // return addPropertyStep.value.adDesc;
                    // return true;
                    // }
                    return addPropertyStep.value.energyCharacteristic; //Energy

                // return addPropertyStep.value.interior;//true

                case 8:
                    return true; //true

                case 9:
                    return true;
                case 10:
                    return true;
                case 11:
                    return true;

                case 12:
                    /**Environnement */
                    return true;
                case 13:
                    /**Urbanisme */
                    return true;
                case 14:
                    //media
                    return addPropertyStep.value.price;
                case 15:
                    return true;
                case 16:
                    /**Disponibilité */
                    return true;
                case 17:
                    /**Revenue cadastrale */
                    return true;
                // case 15:
                //     return addPropertyStep.value.adDesc;

                case 18:
                    return true;
                default:
                    return true;
            }
        }
    });

    async function fetchAPI() {
        await store.dispatch('AddProductModule/getTransactionTypes');
        store.dispatch('AddProductModule/fetchNotaryList');
        store.dispatch('AddProductModule/getProperyType');
        store.dispatch('AddProductModule/getFeatures');
        store.dispatch('AddProductModule/getOptions');
        store.dispatch('AddProductModule/getDestinations');
        store.dispatch('AddProductModule/getDailyNeeded');
        store.dispatch('AddProductModule/fetchToitureList');
    }

    const fullData = ref<any>();
    const fullLabelComponent = ref<any>([]);
    const queryType = ref<any>();

    function dataList(item: any) {
        fullData.value = item;
    }

    onMounted(() => {
        fullData.value.forEach((item: any) => {
            if (!item.subMenu) {
                fullLabelComponent.value = [
                    ...fullLabelComponent.value,
                    { label: item.label, component: item.component },
                ];
            } else {
                item.subMenu.forEach((subItem: any) => {
                    fullLabelComponent.value = [
                        ...fullLabelComponent.value,
                        { label: subItem.label, component: subItem.component },
                    ];
                });
            }
        });
    });

    onMounted(() => {
        const typeString = fullLabelComponent.value[stepCurrent.value]?.label;
        queryType.value = convertToSnakeCase(typeString);
        if (!router.currentRoute.value.query.step) {
            router.push({
                query: { type: queryType.value, step: currentStep.value + 1 },
            });
        }
    });

    function convertToSnakeCase(str: string): string {
        // Convertir la chaîne en minuscules
        const lowerStr = str.toLowerCase();

        // Remplacer les caractères spéciaux par des underscores
        const replacedStr = lowerStr
            .replace(/[\s'"]/g, '_')
            .replace(/[àáâãäå]/g, 'a')
            .replace(/æ/g, 'ae')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõöø]/g, 'o')
            .replace(/œ/g, 'oe')
            .replace(/[ùúûü]/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/ñ/g, 'n');
        // Supprimer les caractères spéciaux et les espaces en début et fin de chaîne
        const trimmedStr = replacedStr.replace(
            /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g,
            ''
        );

        return trimmedStr;
    }

    function changeComponent(comp: object, label: string) {
        stepCurrent.value = parseInt(
            router.currentRoute.value.query.step as string
        );
        current.value = stepCurrent.value - 1;
        activeComp.value =
            fullLabelComponent.value[stepCurrent.value - 1]?.component;
        if (
            typeof fullLabelComponent.value[stepCurrent.value - 1]?.label ===
            'string'
        ) {
            title.value =
                fullLabelComponent.value[stepCurrent.value - 1]?.label;
        } else {
            title.value =
                fullLabelComponent.value[stepCurrent.value - 1]?.label[0];
        }
    }
    watch(
        () => loadMap.value, // parameter to watch
        (newVal) => (loadMap.value = newVal), // callback
        { immediate: true } // config
    );
    watch(
        () => title.value, // parameter to watch
        (value) => (title.value = value), // callback
        { immediate: true } // config
    );
    console.clear();
    // handle step according to step status on each component

    function next() {
        // current.value++;
        if (stepCurrent.value < fullLabelComponent.value.length) {
            stepCurrent.value++;
            addQuery(stepCurrent.value);
        }
    }

    function prev() {
        // current.value--;
        if (stepCurrent.value > 0) {
            stepCurrent.value--;
            addQuery(stepCurrent.value);
        }
    }

    function addQuery(type: any) {
        const typeString = fullLabelComponent.value[type - 1]?.label;
        if (typeof typeString === 'string') {
            queryType.value = convertToSnakeCase(typeString);
            router.push({
                query: {
                    type: queryType.value,
                    step: type as number,
                },
            });
        } else {
            queryType.value = convertToSnakeCase(typeString[0]);
            router.push({
                query: {
                    type: queryType.value,
                    step: type as number,
                },
            });
        }
    }

    const isParticularUser = () => userDetail.value.roles[0] === 'ROLE_PART';

    async function handleFinish() {
        // const params = await store.getters['AddProductModule/getAddPropertyDatas'];
        /**
         * Post the data
         */
        loadingFinish.value = true;
        const uploadUrbanDocument = computed(
            () => store.getters['AddProductModule/getShowDocumentForm']
        );
        await postProperty();

        if (postUranDoc.value) {
            await store
                .dispatch('AddProductModule/postUrbanDocument')
                .then(() => {});
        }
        isFinished.value = true;
        loadingFinish.value = false;
    }

    async function postProperty() {
        await store
            .dispatch('AddProductModule/createProduct')
            .then(() => {
                store.dispatch(
                    'AccountMenuSelectedModule/setSelectedMenu',
                    'Mes annonces'
                );

                store.dispatch('AddProductModule/resetDataAction');
                router.push(slug.value);
                notification['success']({
                    message: 'Succès',
                    description: 'Votre bien a été publié avec succès',
                });
            })
            .catch((e) => {
                console.log('Ito ilay erreur\n', e.data.data?.detail);

                loadingFinish.value = false;
                notification['error']({
                    message: 'Erreur',
                    description:
                        e.data?.data?.detail ??
                        "Une erreur s'est produite, veuillez réessayer plus tard.",
                });
            })
            .finally(() => {
                loadingFinish.value = false;
            });
    }

    // function handleChangeRadio(e : any){
    //     text.redirectionPath = e.target.value
    // }

    watch(
        () => store.getters['AddProductModule/getPropertyCoordinates'],

        async (newVal, oldValue) => {
            if (JSON.stringify(newVal) !== JSON.stringify(oldValue)) {
                if (pageReady.value) {
                    store.dispatch(
                        'AddProductModule/getGetEnergeticCaracteristic',
                        {
                            latitude: newVal.lat,
                            longitude: newVal.lng,
                        }
                    );
                }
            }
        },
        { immediate: true }
    );
    watch(
        () => store.getters['AddProductModule/getEnergeticData'],
        async (newVal, _) => {
            const keys = Object.keys(energeticData.value);
            keys.forEach((key) => {
                energeticData.value[key].condition = !!newVal[key];
                if (!!newVal['gazConnect'] && key === 'electricity') {
                    energeticData.value['electricity'].condition =
                        !!newVal['gazConnect'];
                }
                energeticData.value[key].supplierName = energeticData.value[key]
                    .condition
                    ? newVal.networkManager
                    : '';
                // if (energeticData.value[key]) {
                // }
            });
            console.log(energeticData.value);
        }
    );

    function getOperationType() {
        const oper = store.getters['ProductsListModule/getOperationType'];
        if (!oper) {
            router.push('/');
        }
    }

    function showUrbanDoc(event: boolean) {
        postUranDoc.value = event;
    }

    function handlePartChoice(e: string) {
        particularChoice.value = e;
    }

    function goBack() {
        particularChoice.value = '';
    }

    const registerModif = ref<boolean>(false);
    const pathToRedirect = ref<string>('');
    const unsavedChanges = ref<boolean>(true);

    onBeforeRouteLeave((to, _, next) => {
        pathToRedirect.value = to.fullPath;
        if (unsavedChanges.value) {
            registerModif.value = true;
        } else {
            next();
        }
    });

    const handleLeavePage = () => {
        saveForm();

        registerModif.value = false;
        router.push(pathToRedirect.value);
    };

    const saveForm = function () {
        unsavedChanges.value = false;
    };

    const handleSaveParams = async () => {
        isLoadSaveSession.value = true;
        try {
            const data = await store.dispatch(
                'AddProductModule/saveParamsSession'
            );
            console.log(data);
        } catch (err) {
            console.log(err);
        } finally {
            handleLeavePage();
            isLoadSaveSession.value = false;
        }
    };
</script>

<template>
    <div>
        <div
            v-if="
                userDetail.roles[0] === 'ROLE_PART' &&
                particularChoice !== 'manual'
            "
        >
            <ParticularChoice @handle-click="handlePartChoice" />
        </div>
        <div class="md:container" v-else>
            <MainContainer class="add__container">
                <Card class="add__step">
                    <SideBar
                        :currentItem="current"
                        @component="changeComponent"
                        @data="dataList"
                    />
                </Card>
                <!-- <Loader v-if="loadMap" /> -->
                <MainCard
                    :button="true"
                    :border-bottom="true"
                    :dataBreadcrumbs="[{ label: title }]"
                    class="add__content"
                >
                    <div class="">
                        <div
                            v-if="
                                userDetail.roles[0] === 'ROLE_PART' &&
                                particularChoice === 'manual'
                            "
                            class="add__header"
                        >
                            <div class="__back" @click="goBack">
                                <BackButtonVue />
                                <Title
                                    type="h6"
                                    weight="600"
                                    label="Je souhaite vendre le bien via les services de
                                        l’application"
                                    class="title"
                                />
                            </div>
                            <hr class="__hr" />
                        </div>
                        <transition mode="out-in" appear name="fade-component">
                            <keep-alive>
                                <routerView>
                                    <component
                                        :is="activeComp"
                                        @onNext="next"
                                        @onPrev="prev"
                                        :isFinished="isFinished"
                                        @showUrbanDoc="showUrbanDoc"
                                    />
                                </routerView>
                            </keep-alive>
                        </transition>
                        <div
                            v-if="
                                current === 0 &&
                                userDetail.roles[0] === 'ROLE_PART'
                            "
                            class="add__particular-mode"
                        >
                            <!-- <P>{{text.particularModeTitle}}</P>
                                <Radio
                                    :element="particularMenu"
                                    align="vertical"
                                    class="radioElementClass"
                                    name="radioGroupCheck"
                                    @get-radio-input="handleChangeRadio($event)"
                                /> -->
                            <!-- PARTICULIER -->
                        </div>
                    </div>

                    <!-- <div class="__info" v-if="current === idFirstStep">
                            <hr class="__hr" />
                            <div
                                v-for="(item, key) in Object.keys(energeticData)"
                                :key="key"
                            >
                                <p
                                    :class="
                                        energeticData[item].condition
                                            ? '__green'
                                            : '__red'
                                    "
                                >
                                    {{
                                        energeticData[item].condition
                                            ? energeticData[item].exist
                                            : energeticData[item].content
                                    }}
                                </p>
                                <Switch
                                    @handle-switch="
                                        ($event) =>
                                            handleChoseEnergySupplier(
                                                $event,
                                                energeticData[item].supplierName
                                            )
                                    "
                                    v-if="energeticData[item].condition"
                                    :name="energeticData[item].name"
                                    :item-label="`Ma maison est raccorée a ${energeticData[item].supplierName}`"
                                />
                            </div>
                        </div> -->
                    <template #buttonFooter>
                        <div class="add__footer">
                            <p>(*) champ obligatoire</p>
                            <div class="add__btn-foot">
                                <Button
                                    v-if="stepCurrent > 1"
                                    class="info__my-btn"
                                    type="border"
                                    @click="prev"
                                >
                                    Précedent
                                </Button>
                                <a-popconfirm
                                    v-if="
                                        stepCurrent ===
                                        fullLabelComponent.length
                                    "
                                    title="Voulez-vous publié cette annonce ?"
                                    @cancel=""
                                    @confirm="handleFinish"
                                >
                                    <Button
                                        class="info__my-btn"
                                        type="secondary"
                                    >
                                        <LoadingButton
                                            size="xs"
                                            v-if="loadingFinish"
                                        />
                                        Terminer
                                    </Button>
                                </a-popconfirm>

                                <Button
                                    v-else
                                    class="info__my-btn"
                                    type="secondary"
                                    @click="next"
                                    :disabled="!enabeNextButton"
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    </template>
                </MainCard>
            </MainContainer>
        </div>
        <ModalConfimation
            :show-modal="registerModif"
            @on-back="registerModif = false"
            @leave="handleLeavePage"
            @save="handleSaveParams"
            :isLoad="isLoadSaveSession"
        />
    </div>
</template>

<style scoped lang="scss">
    @import '@/style.scss';
    // .__hr {
    //     @apply my-2;
    // }
    .__red {
        color: var(--color-warn);
    }
    .__green {
        color: var(--color-green);
    }
    .__info {
        @apply w-full container flex flex-col gap-[14px];
    }
    .add {
        &__container {
            position: relative;
            // overflow: hidden;
            // @apply m-[12px] md:flex gap-[20px] md:gap-[10px] min-h-[calc(100vh_-_250px)] md:min-h-[calc(100vh_-_70px)];
            @apply flex flex-col my-[18px] px-[15px] gap-y-[14px];
            @screen md {
                @apply flex-row gap-x-[18px] mb-0;
            }
            @screen lg {
                @apply gap-x-[20px] container;
            }
            @screen xl {
                @apply gap-x-[24px];
            }
            .fade-component-enter-active,
            .fade-component-leave-active {
                transition: all 0.25s ease-in;
            }
            .fade-component-enter-from,
            .fade-component-leave-to {
                opacity: 0;
                transform: translateX(60px);
                position: absolute;
                overflow: hidden;
                width: 100%;
                // top: 0;
                // right: 0;
            }
            &:deep() {
                .mainCard__items-wrap-btn {
                    @apply flex flex-col gap-[14px] py-[14px];
                }
                .__hr {
                    @apply text-gray w-full;
                }
            }
        }
        &__step {
            // @apply p-[12px];
            @screen md {
                height: calc(100vh - 94px);
                width: 315px;
            }
            &:deep() {
                .steps__container {
                    @apply h-full w-full overflow-y-auto p-0;
                    @include scrollbar;
                }
                .steps__icon {
                    @apply mt-0;
                }
            }
        }
        &__content {
            @apply w-full;
            // display: flex;
            // overflow: hidden;
            // flex-direction: column;
            // justify-content: space-between;
            // //@apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] lg:w-[893px] mt-[10px] md:mt-[0px] md:h-[calc(100vh_-_100px)] overflow-y-auto;
            // @apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] lg:w-[893px] mt-[10px] md:mt-[0px] overflow-y-auto;
        }
        &__btn-foot {
            @apply flex gap-[15px];
        }
        &__footer {
            // border-top: 1px solid var(--color-gray);
            @apply w-full flex justify-between items-center;
        }
        &__title {
            font-weight: 600;
        }
        &__divider {
            @apply my-[18px];
        }
        &__particular-mode {
            line-height: 2rem;
        }
    }
    // @screen md {
    //     .__hr {
    //         @apply my-5;
    //     }
    // }
    .__hr {
        @apply text-gray w-full;
    }
    .__back {
        @apply flex gap-[18px] items-center cursor-pointer;
    }
</style>
