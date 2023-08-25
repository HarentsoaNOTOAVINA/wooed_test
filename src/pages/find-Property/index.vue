<script setup>
    import { onMounted, onBeforeMount, ref, reactive, shallowRef } from 'vue';
    import MenuButton from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import MapPinIcon from '@/components/Icon/mapPin.vue';
    import CityOutlinedIcon from '@/components/Icon/CityOutlined.vue';
    import MapCardIcon from '@/components/Icon/mapCard.vue';
    import SettingConfigIcon from '@/components/Icon/SettingConfig.vue';
    import ARIcon from '@/components/Icon/AugmentedReality.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { useGoogleMapAPI } from '@/composables/google-maps-api';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const width = ref('');

    const screenSize = { sm: 640 };
    const navigateTo = (path) => {
        // !!window.flutter_inappwebview &&
        //     window.flutter_inappwebview.callHandler('navigateTo', path);
        !!window.navigateTo &&
        window.navigateTo.postMessage(path);
    };
    const menus = shallowRef([
        {
            title: 'Adresse',
            desc: 'Sélectionner une ou plusieurs villes',
            icon: MapPinIcon,
            class: 'menu',
            handler: () => {
                router.push('/recherche-bien/ville');
            },
        },
        {
            title: 'Agence immobilier',
            desc: 'Sélectionner une agence',
            icon: CityOutlinedIcon,
            class: 'menu',
            handler: () => {
                router.push('/recherche-bien/agence');
            },
        },
        {
            title: 'Dessiner votre zone de recherche',
            desc: 'rechercher un bien dans une zone délimitée par un dessin sur la carte',
            icon: MapCardIcon,
            class: 'menu',
            handler: () => {
                router.push('/recherche-bien/carte');
            },
        },
        {
            title: 'A partir des critères',
            desc: 'Rechercher un bien selon les critères ajouotées',
            icon: SettingConfigIcon,
            class: 'menu',
            handler: () => {
                router.push('/recherche-bien/critere');
            },
        },
        {
            title: 'Immogo',
            desc: 'recherche de bien avec ImmoGo',
            class: 'menu menu-immogo',
            icon: ARIcon,
            handler: navigateTo(JSON.stringify({"path": '/immogo'})),
        },
    ]);

    const breadcrumbListsData = [
        {
            label: "Recherche",
        },
    ];

    onBeforeMount(() => {
        useGoogleMapAPI().then((google) => {
            console.log('google is ready');
        });
        store.commit('FindPropertyModule/resetPropertyList');
        if (window.innerWidth < screenSize.sm + 1) {
            width.value = '100%';
            console.log('for sm', width.value);
        } else {
            width.value = undefined;
            console.log('for md and wider', width.value);
        }
    });

    defineExpose({ width, menus });
</script>
<template>
    <MainContainer class="search">
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="max-container">
            <div class="container-btn">
                <MenuButton
                    v-for="(menu, key) in menus"
                    :key="key"
                    :width="width"
                    :class="menu.class"
                    :isIcon="menu.icon"
                    @click="menu.handler"
                >
                    <template #default>
                        <div class="w-full">
                            <p class="text-menu-title">{{ menu.title }}</p>
                            <p class="text-menu-sub">{{ menu.desc }}</p>
                        </div>
                    </template>
                </MenuButton>
            </div>
        </MainCard>
    </MainContainer>
</template>

<style lang="scss" scoped>
    @import '@/style.scss';
    .search {
        &:deep() {
            .mainCard {
                &__container {
                    @apply bg-transparent;
                    @screen sm {
                        @apply bg-white;
                    }
                }
                &__head-items {
                    @apply mb-0 py-[12px] px-[10px] rounded-[8px] bg-white;
                    @screen sm {
                        @apply mb-[18px] p-0;
                    }
                    & + .__hr {
                        @apply hidden;
                        @screen sm {
                            @apply block;
                        }
                    }
                }
            }
        }
    }
    .container {
        &-title {
            @apply w-full rounded-lg bg-white p-3 my-3;
        }
        &-btn {
            @apply grid grid-cols-1 gap-[10px];
            @screen sm {
                @apply grid-cols-2 gap-[18px];
            }
            @screen lg {
                @apply grid-cols-3 gap-[24px];
            }
        }
    }
    .text {
        &-menu {
            &-title {
                @apply text-start font-[600];
            }
            &-sub {
                @apply text-start text-xs;
                color: var(--color-stroke-gray);
            }
        }
    }
    .button-menu {
        @apply flex items-center gap-[14px] m-0 p-[14px] h-auto rounded-[8px] border-none;
        @include hoverButtonDark;
        &:hover {
            .text-menu {
                &-sub {
                    @apply text-primary;
                }
            }
        }
        @screen sm {
            @apply border-solid;
        }
        @screen lg {
            @apply min-h-[83px];
        }
        @screen xl {
            @apply gap-[24px] py-[32px] px-[24px];
        }
        &:deep() {
            .button-menu__wrap-icon {
                @apply mr-0;
            }
        }
    }

    .menu-immogo {
        @screen md {
            @apply hidden;
        }
    }
</style>
