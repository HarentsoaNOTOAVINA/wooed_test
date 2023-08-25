<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Affix } from 'ant-design-vue';
    import HeadCard from '@/pages/community/components/CommunityPublication/HeadCard.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CommunityInfo from '@/pages/community/components/CommunityInfo.vue';
    import CommunityInfoCard from '@/pages/community/components/CommunityInfoCard.vue';
    import CommunityButtonMenu from './CommunityButtonMenu.vue';
    import {
        asideMenu,
        IAsideMenu,
        IInfoData,
        infoData,
        otherService,
    } from '@/pages/community/components/data';
    import { ref, inject } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
    import LoaderVue from '@/components/Common/Loader/Loader.vue';
    import { notification, Popconfirm as APopconfirm } from 'ant-design-vue';

    const asideData = ref<IAsideMenu[]>(asideMenu);
    const infos = ref<IInfoData[]>(infoData);
    const store = useStore();
    const router = useRouter();
    const routes = useRoute();
    const loading = ref<boolean>(false);
    const itemConsultation = ref<any>([
        { 
            id: 0,
            name: 'soumettre',
            icon: 'Map',
            buttonLabel: 'Soumettre un sujet à traiter',
        },
    ]);

    const typeView = inject<string>('typeView');

    const dataAside =
        typeView === 'otherService' ? otherService : itemConsultation;

    console.log('type', [typeView]);

    enum TypeAction {
        COMMUNITY = 'community',
        CONSULTATION = 'consultation',
        DIVERS_SERVICES = 'otherService',
    }

    const emit = defineEmits(['addConsultation']);

    const props = defineProps({
        details: {
            type: Object,
            default: {},
        },
        typeAction: {
            type: String,
            default: 'community',
        },
    });

    async function leaveCommunity(item: any) {
        if (item.name === 'exit') {
            loading.value = true;
            const { success } = await store.dispatch(
                'CommunityModule/leaveCommunity',
                routes.params.id
            );
            if (success === true) {
                notification['success']({
                    message: 'Success',
                    description: 'Vous avez quitter ce communauté',
                });
                router.push('/community');
            } else {
                notification['error']({
                    message: 'Erreur',
                    description: '',
                });
            }
        }
    }

    function handleAction(item: any) {
        if (item.id === 0) {
            emit('addConsultation');
        }
    }


    async function handleFilter(item : any){
        await store.dispatch('CommunityModule/filterPublication', item.name);
    }
</script>
<template>
    <div>
        <div class="asideRight">
            <div class="asideRight__section">
                <LoaderVue v-if="loading" />
                <div v-else class="asideRight__container" v-if="props.details">
                    <Title
                        type="h3"
                        label="A PROPOS"
                        class="asideRight__title"
                        v-if="props.typeAction === TypeAction.COMMUNITY"
                    />
                    <div class="asideRight__items">
                        <CommunityInfoCard
                            v-if="props.typeAction === TypeAction.COMMUNITY"
                        >
                            <CommunityInfo
                                key="0"
                                icon-name="Immobilier"
                                title-label="Nom de la comité"
                                :content-label="props.details.name"
                            />
                            <CommunityInfo
                                key="1"
                                icon-name="Profile"
                                title-label="Créateur"
                                :content-label="props.details.creator?.name"
                            />
                            <!-- <CommunityInfo
                            key="2"
                            icon-name="Map"
                            title-label="Périmètre géographique"
                            :content-label="props.details.creator.address"
                        /> -->
                            <CommunityInfo
                                key="2"
                                icon-name="Cloud"
                                title-label="Périmètre géographique"
                                :content-label="props.details.perimeterName"
                            />
                            <CommunityInfo
                                key="3"
                                icon-name="Profile"
                                title-label="Nombre de membre"
                                :content-label="
                                    props.details.numberOfMembers +
                                    ' membre' +
                                    [
                                        props.details.numberOfMembers > 1
                                            ? 's'
                                            : '',
                                    ]
                                "
                            />
                        </CommunityInfoCard>
                        <div>
                            <div>
                                <CommunityInfoCard
                                    v-if="
                                        props.typeAction ===
                                        TypeAction.COMMUNITY
                                    "
                                >
                                    <div class="community__buttonMenu--wrap">
                                        <div
                                            v-for="(item, index) in asideData"
                                            :key="index"
                                            class="community__buttonMenu"
                                        >
                                            <a-popconfirm
                                                title="Voulez-vous vraiment quitter ce communauté?"
                                                ok-text="Oui"
                                                cancel-text="Non"
                                                @confirm="leaveCommunity(item)"
                                                v-if="item.name === 'exit'"
                                            >
                                                <CommunityButtonMenu
                                                    :icon-name="item.icon"
                                                    :button-menu-label="
                                                        item.buttonLabel
                                                    "
                                                />
                                            </a-popconfirm>
                                            <CommunityButtonMenu
                                                :icon-name="item.icon"
                                                :button-menu-label="
                                                    item.buttonLabel
                                                "
                                                v-else
                                            />
                                        </div>
                                    </div>
                                </CommunityInfoCard>
                                <CommunityInfoCard v-else>
                                    <div class="community__buttonMenu--wrap">
                                        <div
                                            v-for="(item, index) in dataAside"
                                            :key="index"
                                            class="community__buttonMenu"
                                        >
                                            <a-popconfirm
                                                title="Voulez-vous vraiment quitter ce communauté?"
                                                ok-text="Oui"
                                                cancel-text="Non"
                                                @confirm="leaveCommunity(item)"
                                                v-if="item.name === 'exit'"
                                            >
                                                <CommunityButtonMenu
                                                    :icon-name="item.icon"
                                                    :button-menu-label="
                                                        item.buttonLabel
                                                    "
                                                />
                                            </a-popconfirm>
                                            <CommunityButtonMenu
                                                :icon-name="item.icon"
                                                :button-menu-label="
                                                    item.buttonLabel
                                                "
                                                v-else-if="item.name === 'soumettre'"
                                                @click="handleAction(item)"
                                            />
                                    
                                            <CommunityButtonMenu
                                                :icon-name="item.icon"
                                                :button-menu-label="
                                                    item.buttonLabel
                                                "
                                                v-else
                                                @click="handleFilter(item)"
                                            />
                                        </div>
                                    </div>
                                </CommunityInfoCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '@/style.scss';

    .asideRight {
        @apply w-full;
        @screen md {
            width: 315px;
            @apply fixed;
        }
        @screen lg {
            width: 270px;
        }
        @screen xl {
            width: 315px;
        }
        &__section {
            @apply flex flex-col bg-white rounded-lg p-[18px] w-full gap-y-[18px];

            @screen md {
                // max-width: 315px;
                width: 100%;
                max-height: calc(100vh - 100px);
            }
        }
        &__container {
            @apply w-full flex flex-col gap-y-[18px];
        }
        &__title {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            @apply uppercase text-grayIcon;
        }
        &__items {
            max-height: calc(100vh - 170px);
            @apply flex flex-col overflow-y-auto gap-y-[18px] px-[18px] -mx-[18px];
            @include scrollbar;
        }
    }
    .community {
        &__buttonMenu--wrap {
            @apply flex flex-col gap-y-[14px];
        }
    }
</style>
