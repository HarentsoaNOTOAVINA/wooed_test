<template>
    <Loader v-if="isLoading" />
    <div v-else class="mainCard">
        <Layout title="Obligation après l'accusé de réception/la délivrance du permis" :display-next-btn="false">
            <template #body>
                <div class="px-4">
                    <TopMenu 
                        :menu-data="obligationList" 
                        :active-menu-title="modalTitle"
                        :drop-down-menu-data="dropDownMenuData"
                        :drop-down-menu-label="dropDownMenuLabel"
                        @click="handleTopMenuClick" 
                    />
                    
                    <div v-if="options.length >= 1" class="mainCard__container">
                        <ObligationCard 
                            v-for="(item, index) in options" 
                            :key="index" 
                            :data="item"
                            @set-active-content="setActiveContent" 
                        />
                    </div>
                    <Empty v-else>
                        <template #description>
                            <Paragraphe> Vous n'avez pas fait de demande de permit d'environnement.</Paragraphe>
                        </template>
                    </Empty>
                </div>
                <Modal :is-show-modal="activeContent !== undefined" @on-back="resetActiveData"
                    :width="screenType >= 1024 ? '800' : '520'" :title="modalTitle">
                    <template #content>
                        <ActionDisplay 
                            v-if="activeContent" 
                            :data="activeAction" 
                            :parent-data="activeContent.content"
                            :description="activeContent.label" 
                            @set-active-display="handleDisplay" 
                            @submit-form="submitForm" 
                            @reset-action="resetActiveData"
                        />
                    </template>
                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script lang="ts" setup>
import Loader from '@/components/Common/Loader/Loader.vue';
import TopMenu from '@/pages/Environment/components/EnvironmentHorizontalMenu.vue';
import Layout from '@/pages/Environment/components/layout.vue'
import ObligationCard from '@/pages/Environment/components/myCollectiveGarden/Action/ObligationCard.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import ActionDisplay from '@/pages/Environment/components/actionDisplay.vue';
import { notification } from 'ant-design-vue';
import { onMounted, watch, ref, shallowRef, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {Empty} from 'ant-design-vue';

const screenType = ref<number>(screen.width);

const store = useStore();
const route = useRoute();

interface IListItem {
    label: string,
    id: number,
    content?: any
}

interface IFieldItem {
    composant: string,
    label: string,
    description?: string
}

interface IMenuItem {
    titre: string,
    items?: IListItem[],
    content?: any
}

interface IAction {
    type: string,
    payload?: string
}

interface ISubmenuItem {
    action: IAction | null,
    label?: string
}

interface IMenuElement {
    menu: string,
    submenu: ISubmenuItem[]
}

interface IAction {
    type: string,
    link?: string,
    linkLabel?: string,
    contact?: string,
    info?: string,
    routeName?: string,
    menuList?: IMenuElement[],
    submenuList?: ISubmenuItem[],
    pdfPath?: string,
    formFields?: IFieldItem[],
    description?: string
}

const obligationList = computed(() => store.getters["EnvironmentModule/getTankObligationData"]);
const isLoading = ref<boolean>(true); 
const activeItems = shallowRef<any>();
const options = ref<IListItem[]>([]);
const activeAction = ref<IAction>({ type: '' });
const activeContent = ref<any>();
const permit = ref<any>();
const dbResponse = ref<any>();
const modalTitle = ref<string>('');
const dropDownMenuData = ref<any>();
const dropDownMenuLabel = ref<string>();
const linkLabel = "Téléchargé le document relatif à ce cas";

watch(() => activeItems.value,
    (value) => {
        activeItems.value = value;
        setOptionsValue();
    },
    { immediate: true, deep: true }
)

watch(() => options.value,
    (value) => {
        options.value = value;
        isLoading.value = false;
    },
    { immediate: true, deep: true }
)

watch(() => activeAction.value,
    (value) => {
        activeAction.value = value
    },
    { immediate: true, deep: true }
)

watch(() => permit.value,
    async (value) => {
        permit.value = value;
    },
    { immediate: true, deep: true }
)

watch(() => activeContent.value,
    (value) => {
        activeContent.value = value;
        if (activeContent.value) checkActiveContent();
    },
    { immediate: true, deep: true }
)

watch(() => dbResponse.value,
    (value) => {
        dbResponse.value = value;
    },
    { immediate: true, deep: true }
)

watch(() => modalTitle.value, 
    (value) => {
        modalTitle.value = value;
        setDropDownMenuData(value);
    }
)

onMounted(async () => {
    await fetchPermits();
    await fetchTankObligationData();
    initiateActiveItems()
    setOptionsValue();
})

async function fetchPermits() {
    await store.dispatch("EnvironmentModule/fetchPermitList", { theProperty: route.params.id });
    let permitData = store.getters["EnvironmentModule/getPermitList"];
    permit.value = permitData.filter((element: any) => element.type === 'citerne')[0]; // for now a property supposed to have one tank only, maybe we need to check and update it later  
}

function objectToQueryString(params: object) {
    return Object.entries(params).map(([key, val]) => { if (val) return `${key}=${val}` }).join("&");
}

async function fetchTankObligationData() {
    let propertyDetails = await store.dispatch("UrbanismeModule/getDetailsProperty", route.params.id);
    let params = { region: propertyDetails.region, capacity: permit.value.category, location: permit.value.emplacement }
    let query = objectToQueryString(params)
    await store.dispatch("EnvironmentModule/fetchTankObligationData", query);
}

function initiateActiveItems() {
    activeItems.value = obligationList.value[0].items;
    modalTitle.value = obligationList.value[0].titre;
}

function handleTopMenuClick(value: any) {
    modalTitle.value = value.titre;
    if (value.items.length >= 1) activeItems.value = value.items;
}

function setDropDownMenuData(value: string) {
    dropDownMenuData.value = obligationList.value.filter((element: any) => element.titre !== value);
    dropDownMenuLabel.value = dropDownMenuData.value[0].titre;
}

function setOptionsValue() {
    options.value = [];
    if (activeItems.value && activeItems.value.length >= 1) activeItems.value.forEach((element: any) => { options.value.push(element) })
}

function setActionDataByItType(type: string, data: any) {
    switch (type) {
        case 'redirection':
            setRedirectionAction(data);
            break;
        case 'lien':
            setLinkAction(data);
            break;
        case 'pdf':
            setPdfAction(data);
            break;
        case 'info':
            setInfoAction(data);
            break;
        case 'form':
            setFormAction(data);
            break;
        case 'menu':
            setMenuAction(data);
            break;
        case 'contact':
            setContactAction(data);
            break;
        case 'doc':
            setDocAction(data);
            break;
        default:
            checkTypeInContent(data);
    }
}

function setActiveContent(value: any) {
    activeContent.value = value;
}

function checkActiveContent() {
    let data = activeContent.value.content.data;
    let type = activeContent.value.content.type;
    if (type) {
        if (data.length === 1) data = data[0];
        setActionDataByItType(type, data);
    } else {
        checkTypeInContent(data);
    }
}

function checkTypeInContent(value: any) {
    if (Array.isArray(value) && value.length) {
        let data = value[0].submenu[0].action;
        setActionDataByItType(data.type, data)
    } else {
        console.error("unknown error happen");
        resetActiveData();
    }
}

function handleDisplay($event: any) {
    let data = $event.data;
    if ($event.type === 'menu') {
        if (data.action) activeAction.value.type = data.action.type;
    } else if (data === undefined) {
        resetActiveData();
    }
}

function setContactAction(value: any) {
    activeAction.value = { type: "contact" };
    typeof value === "string"
        ? activeAction.value.contact = value
        : typeof value === "object"
            ? activeAction.value.contact = value
            : resetActiveData();
}

function setMenuAction(value: any) {
    activeAction.value = { type: "menu" };
    activeAction.value.menuList = value;
}

function setRedirectionAction(value: any) {
    activeAction.value = { type: "redirection" };
    if (value.hasOwnProperty("payload")) {
        activeAction.value.routeName = value.payload;
    } else {
        if (Array.isArray(value)) {
            value = value[0].submenu[0];
            setRedirectionAction(value.action);
        } else if (typeof value === 'object' && value.hasOwnProperty('submenu')) {
            value = value.submenu[0];
            setRedirectionAction(value.action);
        } else {
            console.error("unknown error happen");
            resetActiveData();
        }
    }
}

function setLinkAction(value: any) {
    activeAction.value = { type: "lien" };
    if (value.hasOwnProperty("action")) {
        activeAction.value.link = value.action.payload;
        activeAction.value.linkLabel = value.label;
    } else {
        console.error("unknown error happen to type link");
        resetActiveData();
    }
}

function setPdfAction(value: any) {
    activeAction.value = { type: "pdf" }
    if (value.submenu) {
        let submenu = value.submenu[0];
        if (submenu.hasOwnProperty("action")) {
            activeAction.value.pdfPath = submenu.action.payload;
            submenu.label 
                ? activeAction.value.linkLabel = submenu.label 
                : activeAction.value.linkLabel = linkLabel
        }
    } else {
        activeAction.value.pdfPath = value.payload;
        activeAction.value.linkLabel = linkLabel;
    }
}

function setDocAction(value: any) {
    if (value.hasOwnProperty("type") && value.type === 'doc') {
        activeAction.value = { type: "doc" };
        activeAction.value.pdfPath = value.payload;
        activeContent.value.content.data[0].submenu[0].label 
            ? activeAction.value.linkLabel = activeContent.value.content.data[0].submenu[0].label
            : activeAction.value.linkLabel = linkLabel;
    } else {
        console.error("unknown error happen!");
        resetActiveData();
    }
}

function setInfoAction(value: any) {
    activeAction.value = { type: "info" };
    activeAction.value.info = value;
}

function setFormAction(value: any) {
    activeAction.value = { type: "form" };
    let submenu = value.submenu[0];
    let action = submenu.action;
    if (action.type.length > 1) {
        switch (action.type) {
            case 'pdf':
                setPdfAction(action);
                break;
            case 'doc':
                setDocAction(action);
                break;
            case 'form':
                activeAction.value.formFields = action.payload.fields;
                activeAction.value.description = submenu.label;
                break;
            default:
                resetActiveData();
        }
    } else {
        resetActiveData();
    }
}

function submitForm() {
    // TODO: need to update it when you need to POST/STORE data from actionDisplay component
    resetActiveData(); // for now let just close the action modal
    // be carefull with this fake notification, need to update it according to backend response
    notification['success']({
        message: 'Enregistré',
        description: 'Vos informations sont enregistrés',
    });
}

function resetActiveData() {
    activeContent.value = undefined;
    activeAction.value = { type: '' };
}
</script>
<style lang="scss" scoped>
.mainCard {
    &:deep() {
        .custom-loader {
            @apply w-full bg-white;
        }
    }

    max-width: 945px;
    @apply mx-auto relative;

    @screen md {
        min-height: calc(100vh - 94px);
        @apply flex-1 mb-0;
    }

    &__container {
        @apply font-semibold flex flex-col gap-y-1 py-2
    }
}
</style>