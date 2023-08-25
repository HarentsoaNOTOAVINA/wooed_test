<template>
    <div class="work-tank__container">
        <Loader v-if="loadMenuData" />
        <SideMenu
            @on-back-to-menu="onBackToMenu"
            class="work-tank__side-menu"
            @active-comp="changeComponentMain"
            :MenuSideBar="dataMenuTanks"
        />
        <div class="work-tank__content">
            <div
                v-if="
                    activeComponent[activeComponent.length - 1].__name !==
                        'UntankMenu' && activeComponent.length !== 1
                "
            >
                <BackButton @return="onPrevious" text="Retour" />
            </div>
            <component
                :is="activeComponent[activeComponent.length - 1]"
                :property-id="propertyId"
                :btnLoadingExpert="btnLoadingExpert"
                :dataTankMenu="paramsByMenu"
                :paramsDemandAuthorityForm="paramsDemandAuthorityForm"
                :isReplacing="isReplacing"
                :from="caseClick"
                :dataDemand="paramsDemandAuthorityForm"
                @back="onPrevious"
                @changeComponent="changeComponent"
                @prevFromUntank="onPrevious"
                @handleChoice="handleChoice"
                @handleRadio="handleRadio"
                @handleChoiceExpert="handleChoiceExpert"
                @handleUploadExpert="handleUploadExpert"
                @sendMailExpert="sendMailExpert"
                @onCancelMailExpert="onPrevious"
                @handleChoiceStatus="handleChoiceStatus"
                @validateDemand="onNext"
            />
            <div v-if="step > 0 && step <= 3" class="work-tank__btnContainer">
                <Button
                    :disabled="btnPrevDisabled"
                    @on-click="onPrevious"
                    typeButton="border"
                    >Prcedent</Button
                >
                <Button
                    :disabled="isDisabled"
                    @on-click="onNext"
                    typeButton="gray"
                    >Suivant</Button
                >
            </div>
            <div>
                <Modal
                    width="700"
                    title="Sauvegarde des documents"
                    :isShowModal="isShowModal"
                    @onBack="onCloseModal"
                >
                    <template #content>
                        <SaveDoc @closeModalSaveDoc="onCloseModal" />
                    </template>
                </Modal>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import SideMenu from '@/components/Display/MenuSideBar/MenuSideBar.vue';
    import MenuTanksWork from './MenuTanksWork/MenuTanksWork.vue';
    import MenuRepair from './MenuRepair/MenuRepair.vue';
    import MenuEtanche from './MenuEtanch/MenuEtanch.vue';
    import ListExpert from './ListExpert/ListExpert.vue';
    import SendMailExpert from './SendMailExpert/SendMailExpert.vue';
    import MailAuthority from './MailAuthority/MailAuthority.vue';
    import SaveDoc from './SaveDoc/SaveDoc.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import DemandAuthorityForm from './DemandAuthorityForm/DemanAuthorityForm.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { dataMenuTanks } from '../data/dataMenuTanks';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted, computed, watch, onBeforeMount } from 'vue';
    import { Store, useStore } from 'vuex';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { createFormData } from '@/utils/formdata/formData';
    import Replace from '@/components/Icon/Replace.vue';
    import Tank from '@/components/Icon/Tank.vue';
    import Wrench from '@/components/Icon/Wrench.vue';
    import WorkMaintains from '@/components/Icon/WorkMaintainsIcon.vue';
    import Untank from '@/components/Icon/Untank.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import UntankMenu from './UntankMenu/UntankMenu.vue';

    const store: Store<any> = useStore();
    const propertyId = ref<any>();
    const route = useRoute();
    const router = useRouter();
    let activeComponent = ref<Array<any>>([MenuTanksWork]);
    let step = ref<number>(0);
    let btnPrev = ref<boolean>(false);
    let choiceEtanche = ref<any>();
    const notBuriedMenu = ref<Array<object>>([]);
    const otherMenu = ref<Array<object>>([]);
    const currentComp = ref<any>();
    let choiceTankType = ref<any>();
    const expertSelected = ref<Array<any>>([]);
    let isExpertChoosed = ref<boolean>(false);
    let isExpertContacted = ref<boolean>(false);
    let imagesExpert = ref<Array<any>>([]);
    let btnLoadingExpert = ref<boolean>(false);
    let isShowModal = ref<boolean>(false);
    let isDisabled = ref<boolean>(false);
    let paramsByMenu = ref<Array<object>>([{}]);
    let menuId = ref<number>();
    let paramsDemandAuthorityForm = ref<any>();
    let typeOfWorkId = ref<any>();
    let btnPrevDisabled = ref<boolean>(btnPrev.value);
    let loadMenuData = ref<boolean>(false);
    let isReplacing = ref<boolean>(false);
    let caseClick = ref<string>('');
    onBeforeMount(() => {
        getTypeOfWork();
        getMenuData();
    });

    onMounted(() => {
        propertyId.value = route.params.id;
        // store.dispatch('WorksModule/setListDemandDoubleTank');
    });

    const getTypeOfWork = async () => {
        await store.dispatch('WorksModule/setMaintainsMenu');
        const data = computed(
            () => store.getters['WorksModule/getMaintainsMenu']
        );
        let res = data.value.map((item: any) => {
            return {
                typeOfWorkId: item.id,
            };
        });
        typeOfWorkId.value = res[0];
        console.log('data citerne:', typeOfWorkId.value);
    };

    watch(
        () => btnPrev.value,
        (value) => {
            btnPrevDisabled.value = value;
            console.log('xxxx:', btnPrevDisabled.value);
        },
        { immediate: true, deep: true }
    );

    const onCloseModal = () => {
        isShowModal.value = false;
        activeComponent.value = [MenuTanksWork];
        step.value = 0;
    };

    const handleChoiceStatus = (item: string) => {
        if (item === 'normal') {
            // activeComponent.value.push()
            console.log('item cllicked is normal');
        }
    };

    const sendMailExpert = async () => {
        btnLoadingExpert.value = true;
        let params = {
            idTheProperty: propertyId.value,
            extProviderId: expertSelected.value,
            images: imagesExpert.value,
        };
        let req = createFormData(params);
        console.log('expert list:', expertSelected.value);

        try {
            await store.dispatch('WorksModule/setContactExpert', req);
            const data = computed(
                () => store.getters['WorksModule/getContactExpert']
            );
            if (data.value.data.code === 200) {
                notification['success']({
                    message: 'Votre demande de devis a bien été envoyer',
                });
                isExpertContacted.value = true;
                // isDisabled.value = false;
                expertSelected.value = [];
            }
            btnLoadingExpert.value = false;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoadingExpert.value = false;
        }

        console.log('params:', req);
        // expertSelected.value = [];
    };

    const handleUploadExpert = (value: any) => {
        imagesExpert.value = value;
        console.log('image expert:', imagesExpert.value);
    };

    const handleChoiceExpert = (item: Array<object>) => {
        expertSelected.value = item.map((obj) => {
            for (const key in obj) {
                return key;
            }
        });
        isExpertChoosed.value = true;
    };

    const handleChoice = (item: any) => {
        if (item == 0) {
            choiceEtanche.value = 0;
            console.log('item choice etanche:', item);
        } else if (item == 1) {
            choiceEtanche.value = 1;
        }
    };

    const onPrevious = () => {
        activeComponent.value.pop();
        step.value = step.value - 1;
        isDisabled.value = false;
        console.log('activeComp on back:', activeComponent.value);
    };

    const onNext = async () => {
        if (choiceTankType.value === 0) {
            activeComponent.value.push(ListExpert);
            step.value = step.value + 1;
            choiceTankType.value = null;
        } else if (choiceTankType.value === 1) {
            isShowModal.value = true;
            choiceTankType.value == null;
            console.log('second');
        } else if (isExpertChoosed.value) {
            activeComponent.value.push(SendMailExpert);
            step.value = step.value + 1;
            isExpertChoosed.value = false;
            // expertSelected.value.length = 0;
            console.log('mbola miverina ato izy');
        } else if (
            isExpertContacted.value === true ||
            activeComponent.value[activeComponent.value.length - 1].__name ===
                'DemanAuthorityForm'
        ) {
            console.log('miditra ato', isExpertContacted.value);
            activeComponent.value.push(MailAuthority);
            // step.value = step.value + 1;
            isExpertContacted.value = false;
            isDisabled.value = true;
            // isExpertContacted.value = false;
        }

        console.log(
            'step value :',
            step.value,
            'isExpert contacted:',
            isExpertContacted.value,
            activeComponent.value[activeComponent.value.length - 1].__name
        );
    };

    const handleRadio = (item: any) => {
        if (item == 0) {
            choiceTankType.value = 0;
        } else if (item == 1) {
            choiceTankType.value = 1;
        }
    };

    const changeComponentMain = (item: any) => {
        console.log('item side bar clicked:', item);
        if (item.id === 0) {
            activeComponent.value = [MenuTanksWork];
            currentComp.value = '';
            step.value = 0;
            // router.go(0);
        } else {
            // activeComponent.value;
            currentComp.value = '';
        }
        menuId.value = item.id;
        getMenuData();
        console.log('menuid:', menuId.value);
    };

    const changeComponent = (item: any) => {
        switch (item.name) {
            case 'Travaux de réparation':
                activeComponent.value.push(MenuRepair);
                currentComp.value = item.case;
                step.value++;
                break;
            case "Doubler la paroi d'un réservoir existante simple paroi":
                activeComponent.value.push(DemandAuthorityForm);
                currentComp.value = item.case;
                isReplacing.value = false;
                // step.value++;
                caseClick.value = 'double';
                console.log('from?', caseClick.value);
                break;
            case 'Remplacer le réservoir':
                activeComponent.value.push(DemandAuthorityForm);
                isReplacing.value = true;
                currentComp.value = item.case;
                caseClick.value = 'replace';
                // from.value
                console.log('from?', caseClick.value);
                break;
            case 'Mettre définitivement hors service le réservoir':
                activeComponent.value.push(UntankMenu);
                break;
            default:
                break;
        }
        console.log('act:', activeComponent.value);
        paramsDemandAuthorityForm.value = item;
        getAllParamDemandAuth();
        // console.log('params final:', paramsDemandAuthorityForm.value.subsection);
    };
    const getAllParamDemandAuth = () => {
        paramsDemandAuthorityForm.value = {
            thePropertyId: route.params.id,
            link: '',
            typeOfWorkId: typeOfWorkId.value.typeOfWorkId,
            subsection: paramsDemandAuthorityForm.value.subsection,
            category: paramsDemandAuthorityForm.value.category,
        };
        return paramsDemandAuthorityForm.value;
    };

    function onBackToMenu() {
        // activeComponent.value = MenuTanksWork;
    }

    const getMenuData = async () => {
        if (menuId.value === 0) {
            loadMenuData.value = true;
            await store.dispatch('WorksModule/setOtherMenu');
            const data = computed(
                () => store.getters['WorksModule/getOtherMenu']
            );
            paramsByMenu.value = data.value.data;
            loadMenuData.value = false;
        } else {
            loadMenuData.value = true;
            await store.dispatch('WorksModule/setNotBuriedMenu');
            const data = computed(
                () => store.getters['WorksModule/getNotBuriedMenu']
            );
            paramsByMenu.value = data.value.data;
            loadMenuData.value = false;
        }
        const dataMenu = paramsByMenu.value.map((item: any) => {
            return {
                category: item.id,
                subsection: item.subsection,
                name: item.name,
            };
        });
        paramsByMenu.value = dataMenu;
        getIcon();
        console.log('final data menu', paramsByMenu.value);
    };

    const getIcon = () => {
        paramsByMenu.value.forEach((item: any) => {
            switch (item.name) {
                case "Doubler la paroi d'un réservoir existante simple paroi":
                    item.icon = Tank;
                    break;
                case 'Remplacer le réservoir':
                    item.icon = Replace;
                    break;
                case 'Travaux de réparation':
                    item.icon = Wrench;
                    break;
                case 'Entretien':
                    item.icon = WorkMaintains;
                    break;
                case 'Mettre définitivement hors service le réservoir':
                    item.icon = Untank;
                    break;
                default:
                    break;
            }
        });
        console.log('icon:', paramsByMenu.value);
    };
</script>

<style scoped lang="scss">
    .work-tank {
        &__container {
            @apply mt-[18px] container flex flex-col md:flex-row gap-[10px];

            @screen md {
                @apply flex;
            }
        }

        &__side-menu {
            @apply mb-[1px];

            @screen md {
                min-height: calc(100vh - 100px);
            }
        }

        &__content {
            @apply flex flex-col bg-white rounded-[8px] p-[18px] gap-[18px] w-full;
        }

        &__btnContainer {
            @apply flex justify-end gap-[18px] mt-[18px];
        }
    }
</style>
