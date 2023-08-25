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
        <div class="add" v-else>
            <MainContainer class="add__container">
                <Card class="add__sidebar">
                    <SideAddProperty
                        :activeLabel="menuActiveLabel"
                        :numberActive="currentRoute"
                        :data="dataAddProperty"
                    />
                </Card>
                <Card class="add__content">
                    <Transition>
                        <component
                            :is="activeComp"
                            @onClickPrev="prev"
                            @onClickNext="next"
                            @onClickFinished="finished"
                            :titleLabel="menuActive"
                            :controlButton="stepActive"
                            :data="dataContentFields"
                        />
                    </Transition>
                    <Modal
                        :is-show-modal="isShowModal"
                        @on-back="handleShowModal"
                        title="Confirmation"
                    >
                        <template #content>
                            <div class="flex flex-col gap-[50px]">
                                <Title
                                    type="h2"
                                    label="Voulez-vous publier cette annonce ?"
                                    weight="bold"
                                    class="add-modal__title-container"
                                />
                                <div class="add-modal__btn">
                                    <Button
                                        type-button="primary-cancel"
                                        @click="handleShowModal"
                                        >Annuler</Button
                                    >
                                    <Button
                                        type-button="primary"
                                        @click="handleFinish"
                                    >
                                        <LoadingButton
                                            size="xs"
                                            v-if="loadingFinish"
                                        />
                                        Confirmer
                                    </Button>
                                </div>
                            </div>
                        </template>
                    </Modal>
                </Card>
            </MainContainer>
            <ModalConfimation
                :show-modal="registerModif"
                @on-back="registerModif = false"
                @leave="handleLeavePage"
                @save="handleSaveParams"
                :isLoad="isLoadSaveSession"
            />
            <ModalConfirmPricing
                :show-modal="isShow"
                :pricing-statement="pricingStatement"
                @on-back="isShow = false"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Card from '@/components/Display/Card/Card.vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import SideAddProperty from './components/SideAddProperty.vue';
    // import { data } from '@/pages/addProperty/Teste/dataTeste';
    import { saleHouseDatapublic } from '@/pages/addProperty/dataProperty/sales/data.maison';
    import { onMounted, ref, shallowRef, provide, watch, computed } from 'vue';
    import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
    import Transition from '@/components/Common/Transition/Transition.vue';
    import { useStore } from 'vuex';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useSlug } from '@/composables/user/useUsernameSlug';
    import { notification } from 'ant-design-vue';
    import ModalConfimation from './components/ModalConfimation/ModalConfimation.vue';
    import { typeDataSell } from './utils/type-selected';
    import ParticularChoice from './components/ParticularChoice/ParticularChoice.vue';
    import Financial from '@/services/FinancialService';
    import ModalConfirmPricing from './components/ModalConfimation/ModalConfirmPricing.vue';

    const slug = useSlug();

    const store = useStore();
    const dataAddProperty = shallowRef<Array<any>>(saleHouseDatapublic);
    const router = useRouter();
    const route = useRoute();
    const currentRoute = ref<any>(1);
    const currentStep = ref<any>(0);
    const activeComp = shallowRef<any>(null);
    const fullDataStep = shallowRef<any>([]);
    const queryType = ref<any>();
    const menuActive = ref<string>();
    const stepActive = ref<object>({});
    const parentMenuActive = ref<string>();
    const menuActiveLabel = ref<Array<object>>([{}]);
    const dataContentFields = ref<Array<any>>([]);
    const isShowModal = ref<boolean>(false);
    const loadingFinish = ref<boolean>(false);
    const allPropertyType = store.getters['AddProductModule/getPropertyType'];
    const propertyType = ref<string | number>('-1');
    let userDetail = computed(() => store.getters['UserModule/getUserDetails']);
    const particularChoice = ref<String>('test');
    const isShow = ref<boolean>(false);
    const pricingStatement = ref<string>('');

    provide('operationType', 'sell');
    onMounted(() => {
        newDataStep();
        initQuery();
        activeValue();
    });

    watch(
        () => store.getters['AddProductModule/getPropertyType'],
        (value) => {
            allPropertyType.value = value;
        },
        { immediate: true }
    );

    watch(
        () => store.getters['AddProductModule/getParticularChoice'],
        (value) => {
            particularChoice.value = value;
        },
        { immediate: true }
    );

    watch(
        () =>
            store.getters['AddProductModule/getAddPropertyDatas'][
                'propertyType'
            ],
        (value) => {
            if (value.toString() !== propertyType.value.toString()) {
                dataAddProperty.value = typeDataSell(value, allPropertyType);
                propertyType.value = value;
            }
        },
        { immediate: true }
    );

    const handlePartChoice = (choice: any) => {
        store.dispatch('AddProductModule/setParticularChoice', choice);
    };

    function handleShowModal() {
        isShowModal.value = !isShowModal.value;
    }

    function activeValue() {
        const etapeValue = router.currentRoute.value.query.etape;
        if (etapeValue) {
            currentRoute.value = parseInt(etapeValue as string);
            activeComp.value =
                fullDataStep.value[currentRoute.value - 1].component;
        }
        menuActive.value = fullDataStep.value[currentRoute.value - 1].label;
        stepActive.value = {
            stepLength: fullDataStep.value.length,
            stepCurrent: currentRoute.value,
        };
        dataAddProperty.value.find((obj) => {
            const content = obj.content.find((item: any) => {
                if (Array.isArray(item.title)) {
                    return getDetailsLocation(item.title) == menuActive.value;
                } else {
                    return item.title == menuActive.value;
                }
            });
            if (content) {
                parentMenuActive.value = obj.title;
                dataContentFields.value = content.contentFields;
                menuActiveLabel.value = [
                    {
                        parentLabel: parentMenuActive.value,
                        childLabel: menuActive.value,
                    },
                ];
            }
        });
    }

    function newDataStep() {
        dataAddProperty.value.forEach((item: any) => {
            if (!item.content) {
                if (Array.isArray(item.title)) {
                    fullDataStep.value = [
                        ...fullDataStep.value,
                        {
                            label: getDetailsLocation(item.title),
                            component: item.component,
                        },
                    ];
                } else {
                    fullDataStep.value = [
                        ...fullDataStep.value,
                        {
                            label: item.title,
                            component: item.component,
                        },
                    ];
                }
            } else {
                item.content.forEach((subItem: any) => {
                    if (Array.isArray(subItem.title)) {
                        fullDataStep.value = [
                            ...fullDataStep.value,
                            {
                                label: getDetailsLocation(subItem.title),
                                component: subItem.component,
                            },
                        ];
                    } else {
                        fullDataStep.value = [
                            ...fullDataStep.value,
                            {
                                label: subItem.title,
                                component: subItem.component,
                            },
                        ];
                    }
                });
            }
        });
    }

    function getDetailsLocation(data: Array<any>) {
        const enum Country {
            be = 'Belgique',
            lux = 'Luxembourg',
            fr = 'France',
        }
        const country =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['country'];
        if (country) {
            if (country === Country.be) {
                return data[0];
            } else if (country === Country.lux) {
                return data[1];
            } else if (country === Country.fr) {
                return data[2];
            } else {
                return data[0];
            }
        } else {
            return data[0];
        }
    }

    function initQuery() {
        const typeString = fullDataStep.value[currentStep.value]?.label;
        queryType.value = convertToSnakeCase(typeString);
        if (!router.currentRoute.value.query.etape) {
            router.push({
                query: { type: queryType.value, etape: currentRoute.value },
            });
        }
    }

    function convertToSnakeCase(str: string): string {
        const lowerStr = str.toLowerCase();
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
        const trimmedStr = replacedStr.replace(
            /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g,
            ''
        );
        return trimmedStr;
    }

    function step(item: number) {
        const etapeNumberValue = router.currentRoute.value.query.etape;
        if (etapeNumberValue) {
            currentRoute.value = parseInt(etapeNumberValue as string);
            currentRoute.value = currentRoute.value + item;
            queryType.value = convertToSnakeCase(
                fullDataStep.value[currentRoute.value - 1]?.label
            );
            router.push({
                query: { type: queryType.value, etape: currentRoute.value },
            });
        }
    }

    function prev() {
        step(-1);
    }

    function next() {
        step(+1);
    }

    function finished() {
        isShowModal.value = true;
    }

    async function handleFinish() {
        saveForm();
        loadingFinish.value = true;
        switch (userDetail.value.roleHierarchy) {
            case 'FREE':
                pricingStatement.value = 'Free';
                isShow.value = true;
                loadingFinish.value = false;
                break;
            case 'ACCESS':
                console.log('Acces');
                pricingStatement.value = 'Premium';
                let { data } = await Financial.getPropertyPerUser();
                const ownerProductAnnouced: Array<any> = data.filter(
                    (obj: { status: string }) =>
                        obj.status === 'valid' ||
                        obj.status === 'inlease' ||
                        obj.status === 'sold'
                );
                console.log(
                    "le bien de l'utilisateur ===>>>>>>>>>",
                    ownerProductAnnouced
                );

                if (ownerProductAnnouced.length >= 2) {
                    isShow.value = true;
                    loadingFinish.value = false;
                } else {
                    sendparams();
                }
                break;
            case 'ADMINISTRATOR' || 'PREMIUM':
                sendparams();
                break;

            default:
                break;
        }
    }

    async function sendparams() {
        try {
            const { data, status } = await store.dispatch(
                'AddProductModule/createProduct'
            );
            // .then(() => {});
            if (status == '201' || status == '200') {
                notification['success']({
                    message: 'Succès',
                    description: 'Votre bien a été publié avec succès',
                });
                store.dispatch('AddProductModule/resetDataAction');
                store.dispatch(
                    'AccountMenuSelectedModule/setSelectedMenu',
                    'Mes annonces'
                );
                router.push(slug.value);
            }
        } catch (e: any) {
            loadingFinish.value = false;
            notification['error']({
                message: 'Erreur',
                description:
                    e?.data?.data?.detail ??
                    "Une erreur s'est produite, veuillez réessayer plus tard.",
            });
        } finally {
            loadingFinish.value = false;
        }
    }

    const registerModif = ref<boolean>(false);
    const pathToRedirect = ref<string>('');
    const unsavedChanges = ref<boolean>(true);
    const isLoadSaveSession = ref<boolean>(false);

    onBeforeRouteLeave((to, _, next) => {
        pathToRedirect.value = to.fullPath;
        let data = store.getters['AddProductModule/getAddPropertyDatas'];
        if (unsavedChanges.value && data.transactionType) {
            if (
                pathToRedirect.value === '/no-connection' ||
                pathToRedirect.value === '/error'
            ) {
                handleLeavePage();
            } else {
                registerModif.value = true;
            }
        } else {
            next();
        }
    });

    const handleLeavePage = () => {
        saveForm();
        store.dispatch('AddProductModule/resetDataAction');
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

<style lang="scss" scoped>
    @import '@/style.scss';
    .add {
        &__container {
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
        }
        &__sidebar {
            @screen md {
                height: calc(100vh - 94px);
                width: 315px;
            }
        }
        &__content {
            @apply w-full p-0;
            @screen md {
                width: calc(100% - 339px);
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
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
    }
    .add-modal {
        &__title-container {
            @apply font-[600] text-[18px];
        }
        &__btn {
            @apply w-full flex gap-[15px] justify-end;
        }
    }
    .wrap-button-confirmation {
        @apply flex flex-col gap-[18px];
    }
</style>
