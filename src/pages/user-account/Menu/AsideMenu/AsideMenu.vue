<template>
    <div class="account__aside-menu__wrapper">
        <div class="account">
            <div class="account__profil">
                <!-- photo header -->
                <div class="account__profil__photo__wrapper">
                    <div class="account__profil__go-back">
                        <ArrowBack @click="goBackHandler" />
                    </div>
                    <figure class="account__profil__photo__content">
                        <div class="img-container">
                            <img
                                v-if="urlImgData"
                                :src="urlImgData"
                                alt="photo-de-profil"
                            />
                            <div v-else class="img-container__empty-logo">
                                <User size="lg" />
                            </div>
                        </div>
                        <div
                            @click="handleAddPhoto"
                            for="take-photo"
                            class="img-photo"
                        >
                            <Photo />
                        </div>
                    </figure>
                    <Title type="h2" :label="getFullName" />
                    <Paragraphe> {{ userLoggedIn.email }} </Paragraphe>
                </div>

                <!-- profil details -->

                <div class="account__profil__details">
                    <div class="account__profil__details__row">
                        <Title label="Adresse" type="h2" />
                        <Paragraphe>{{ userLoggedIn.address }}</Paragraphe>
                    </div>
                    <hr />
                    <div class="account__profil__details__row">
                        <Title label="Numéro de téléphone" type="h2" />
                        <Paragraphe>{{ userLoggedIn.telephone }}</Paragraphe>
                    </div>
                    <hr />
                    <div class="account__profil__details__row justify-start">
                        <Button
                            v-for="(menu, key) in BTN_MENU"
                            :key="key"
                            :typeButton="(menu.type as any)"
                            class="account-profil-btn"
                            @click="handleClickMenu(menu)"
                        >
                            {{ menu.label }}
                        </Button>
                    </div>
                </div>
            </div>
            <hr class="mt-[20px]" />
            <div class="account__menu">
                <ul>
                    <li
                        v-for="(menu, index) in menuList"
                        :key="index"
                        @click="handleClickMenu(menu)"
                    >
                        <div class="account__menu__content">
                            <component :is="menu.icon" />
                            <Title :label="menu.label" type="h3" />
                            <ArrowNext v-if="showSubmenu && menu.submenu" />
                        </div>
                        <div
                            class="account__submenu"
                            v-if="showSubmenu && menu.submenu"
                        >
                            <ul>
                                <li
                                    v-for="(subItem, key) in menu.submenu"
                                    :key="key + '__'"
                                    class="account__submenu-item"
                                    :class="{
                                        'active-menu':
                                            currentLabelMenu === subItem.label,
                                    }"
                                    @click="handleClickMenu(subItem)"
                                >
                                    <Title :label="subItem.label" type="h3" />
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <Modal
                :is-show-modal="displayImgInput"
                @on-back="displayImgInput = false"
                :width="'520'"
                title="Mettre à jour ma photo de profil"
            >
                <template #content>
                    <div class="account__logo-input">
                        <UploadImage 
                            :needBase64="true"
                            @upload-single="handleLogoUpdate"
                            :type-image="true"
                            :key="imgKey"
                            :disabled="newLogo !== undefined"
                        />
                    </div>
                    <div class="flex flex-col text-center">
                        <span class="w-full block my-4">
                            Souhaitez-vous mettre à jour votre photo de profil (ou logo)?
                        </span>
                        <div class="flex flex-row justify-center gap-4">
                            <Button
                                @click="hideLogoModal"
                                type-button="primary-cancel"
                            >  
                                Annuler
                            </Button>
                            <Button
                                @click="confirmLogoUpdate"
                                type-button="primary"
                            >  
                                Confirmer
                            </Button>
                        </div>
                        
                    </div>
                    
                </template>
            </Modal>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Photo from '@/components/Icon/Photo.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { MENU_LIST, BTN_MENU } from './account.data';
    import { useStore } from 'vuex';
    import { computed, onMounted, ref, shallowRef, reactive, watch } from 'vue';
    import { CommunityService } from '@/services/communityService';
    import User from '@/components/Icon/User.vue';
    import { notification } from 'ant-design-vue';
    import InfoPlus from '../InfoPlus.vue';
    import { MENU_LIST_NOTARY } from '@/pages/user-account/NotaryAccount/Aside/dataMenuNotary';
    import ArrowNext from '@/components/Icon/ArrowNext.vue';
    /**styles */
    import '@/assets/style/userprofil.scss';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { useRouter } from 'vue-router';
    import { setPersistStore } from '@/utils/persist_store';

    //--------------------------
    const text = reactive({
        btn: {
            more: "Plus d'infos",
            space: 'Espace',
        },
    });

    //---------------------------

    const router = useRouter();
    const urlImgData = ref();
    const newLogo = ref();
    const imgKey = ref(1);
    const displayImgInput = ref(false);

    let menuList = shallowRef();
    const showSubmenu = ref<boolean>(false);
    defineProps<{
        currentLabelMenu: string;
    }>();
    const emit = defineEmits<{
        (e: 'on-click-menu', payload: any): void;
    }>();
    const store = useStore();

    onMounted(() => {
        console.error(userLoggedIn.value);
        if (userLoggedIn.value.roles.includes('ROLE_NOT')) {
            menuList.value = MENU_LIST_NOTARY;
        } else {
            menuList.value = MENU_LIST;
        }

        if (userLoggedIn.value.logo) urlImgData.value = userLoggedIn.value.logo;
    });

    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );

    const getFullName = computed(
        () =>
            `${(userLoggedIn.value.name as string).replace(
                userLoggedIn.value.name[0],
                userLoggedIn.value.name[0].toUpperCase()
            )} ${(userLoggedIn.value.firstname as string).replace(
                userLoggedIn.value.firstname[0],
                userLoggedIn.value.firstname[0].toUpperCase()
            )}`
    );
    function handleClickMenu(menu: any) {
        if (!menu.submenu) {
            showSubmenu.value = false;
            emit('on-click-menu', menu), setSelectedMenu(menu.label);
        } else {
            showSubmenu.value = true;
        }

        if (menu.label === 'Je suis un syndic') router.push({ name: 'syndic' });
        if (menu.label === 'W-Agenda') router.push({ name: 'agenda' });
        if (menu.label === 'Ma copropriété') router.push({ name: 'my-coproperty' });
    }
    function goBackHandler() {
        router.go(-1);
    }
    function setSelectedMenu(label: string) {
        store.dispatch('AccountMenuSelectedModule/setSelectedMenu', label);
    }

    async function handleLogoUpdate(value: any) {
        newLogo.value = await getBase64(value);        
    }

    async function confirmLogoUpdate() {
        const payload = { logo: newLogo.value.base64String };
        urlImgData.value = newLogo.value.url;
        hideLogoModal();
        const { data } = await CommunityService.updateProfilCommunity(payload);
        imgKey.value += 1;
        if (data.code === 200) {
            const userDetails = { detail : data.data };
            notification.success({ message: `Votre photo de profil a été modifier`});
            store.dispatch('UserModule/setUserDetails', userDetails);
        } else {
            notification.error({ message: `Une erreur s'est produite, veuillez reessayer`});
            urlImgData.value = userLoggedIn.value.logo;
        }
    }

    function hideLogoModal () {
        displayImgInput.value = false;
        newLogo.value = undefined;
        imgKey.value += 1;
    }

    function getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result;
                const url = URL.createObjectURL(file);
                resolve({ base64String, url });
            };
            reader.onerror = (error) => reject(error);
        });
    };
    function handleAddPhoto(e: any) {
        displayImgInput.value = true;
    }
</script>

<style lang="scss" scoped>
    .account-profil-btn {
        @apply w-full;
        // button {
        //     border-radius: 8px;
        //     @apply w-full;
        // }
        &:deep() {
            button {
                @apply w-full;
            }
            svg {
                @apply w-[20px] h-[20px];
            }
            path {
                fill: white;
            }
        }
        &__update {
            @apply w-full mt-[20px];
            &:deep() {
                button {
                    @apply w-full;
                }
                svg {
                    @apply w-[20px] h-[20px];
                }
                path {
                    fill: var(--color-primary);
                }
            }
        }
        button {
            border-radius: 8px;
            @apply w-[50%];
        }
        
    }

    .account__logo-input {
        @apply flex justify-center;
        &:deep(.ant-upload-picture-card-wrapper) {
            width: auto;
        }
    }
</style>
