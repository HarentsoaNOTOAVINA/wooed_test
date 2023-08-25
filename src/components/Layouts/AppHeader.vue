<script setup lang="ts">
    import store from '@/store';
    import {
        ref,
        watch,
        onMounted,
        watchEffect,
        computed,
        onBeforeMount,
    } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { NotificationsService } from '@/services/notificationsService';

    /* icon */
    import Login from '@/components/Icon/Login.vue';
    import Logout from '@/components/Icon/Logout.vue';
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import Search from '@/components/Icon/Search.vue';
    import User from '@/components/Icon/User.vue';
    import MiniUser from '@/components/Icon/MiniUser.vue';
    import MiniMailBox from '@/components/Icon/MiniMailBox.vue';
    import CircleBell from '@/components/Icon/CircleBell.vue';
    import ArrowBack from '../Icon/ArrowBack.vue';

    import { dataMenu } from './dataHeader';

    import {
        Affix as AAffix,
        Menu as AMenu,
        SubMenu as ASubMenu,
        MenuItemGroup as AMenuItemGroup,
        MenuItem as AMenuItem,
    } from 'ant-design-vue';
    import router from '@/routes';
    import { useSlug } from '@/composables/user/useUsernameSlug';
    import Chat from '../Icon/Chat.vue';
    import { useSocketNotificationMessage } from '@/composables/socket/socket';
    import ProductsListService from '@/services/productsListService';
    import { setSessionPersistStore } from '@/utils/persist_store';
    import { useRoute } from 'vue-router';

    const slug = useSlug();
    const isLoggedIn = ref<boolean>(false);
    const isMenu = ref<boolean>(false);
    const fakeLoadAvatar = ref<boolean>(true);
    const messageNotification = ref<number>(0);
    const messageMiniMailBox = ref<number>(0);
    const route = useRoute();
    const routeActive = ref<string>('');
    const initialPath = ref<string>('');
    const subMenuActive = ref(false);

    const { notifications, evtSource, initSocket } =
        useSocketNotificationMessage();

    /* message */
    watch(
        () => notifications?.value,
        (v) => {
            messageNotification.value = v;
            // store.dispatch('MessagesModule/setNotifications', v)
            console.log('notification messages', v);
        },
        { immediate: true, deep: true }
    );
    watch(
        () => store.getters['UserModule/getUserDetails'],
        (v) => {
            if (v) {
                initSocket();
            } else {
                if (evtSource.value) {
                    evtSource.value.close();
                }
            }
        },
        { immediate: true }
    );
    /* end message notif */

    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    // const messagesCount = computed(() => {
    //     if (userLoggedIn.value) {
    //         const notificationCount =
    //             store.getters['NotificationModule/getNotificationsCount'];
    //         if (notificationCount) {
    //             return notificationCount;
    //         } else return 0;
    //     } else return 0;
    // });
    const notificationCount = computed(() => {
        if (userLoggedIn.value) {
            const notificationCount =
                store.getters['NotificationModule/getNotificationsCount'];
            if (notificationCount) {
                return notificationCount;
            } else return 0;
        } else return 0;
    });
    //======================
    //
    //  Code tempooraire pour livrable 11/2022
    //  Pour location basique
    //============START============

    const __data = {
        lease: {
            label: 'Mettre un bien en location',
            opterationType: 'lease',
        },
        sale: {
            label: 'Vendre un bien',
            opterationType: 'sale',
        },
    };
    //============END===============

    const username = computed(() => {
        const name = userLoggedIn.value.name;
        const firstname = userLoggedIn.value.firstname;
        return `${firstname.replace(
            firstname[0],
            firstname[0].toUpperCase()
        )} ${name.replace(name[0], name[0].toUpperCase())}`;
    });

    watch(
        () => route.path,
        (v) => {
            routeActive.value = v;
            const pathParts = routeActive.value.split('/');
            initialPath.value = `/${pathParts[1]}`;

            // Mettre à jour l'état du sous-menu actif
            subMenuActive.value = dataMenu.some((item: any) =>
                isSubMenuActive(item.submenu)
            );
        },
        { immediate: true }
    );

    onMounted(() => {
        setTimeout(() => {
            fakeLoadAvatar.value = false;
        }, 1000);

        // getRoleUser();
    });

    onBeforeMount(() => {
        getRoleUser();
    });
    watchEffect(() => {
        window.addEventListener('resize', () => {
            fakeLoadAvatar.value = true;
            setTimeout(() => {
                fakeLoadAvatar.value = false;
            }, 1000);
        });
        window.removeEventListener('resize', () => {});
    });
    watch(
        () => store.getters['UserModule/getUserDetails'],
        function (user) {
            isLoggedIn.value = !!user;
        },
        { immediate: true, deep: true }
    );

    function clickUserProfilHandler() {
        if (isLoggedIn.value) {
            router.push({ path: slug.value });
        } else {
            router.push({ name: 'authLogin' });
        }
        handleShowMenu('');
    }

    function handleLogout(isMobile: boolean) {
        isMobile && handleShowMenu('');
        navigateTo('logout');
    }
    function navigateTo(type: string) {
        // !!(window as any).flutter_inappwebview &&
        //     (window as any).flutter_inappwebview.callHandler(
        //         'navigateTo',
        //         type
        //     );
        !!(window as any).navigateTo &&
            (window as any).navigateTo.postMessage(type);
    }

    const handleShowMenu = (type: string) => {
        isMenu.value = !isMenu.value;
        if (type.toLocaleLowerCase() === 'immogo') {
            navigateTo(JSON.stringify({ path: '/chose_action' }));
        }
        // else if (
        //     type.toLocaleLowerCase() === __data.lease.label.toLocaleLowerCase()
        // ) {
        //     store.dispatch('AddProductModule/setPropertyData', {
        //         data: { operationType: __data.lease.opterationType },
        //     });
        // } else if (
        //     type.toLocaleLowerCase() === __data.sale.label.toLocaleLowerCase()
        // ) {
        //     store.dispatch('AddProductModule/setPropertyData', {
        //         data: { operationType: __data.sale.opterationType },
        //     });
        // }
        else if (type.toLowerCase() === 'mettre un bien en location') {
            initSessionParams('lease');
            store.dispatch('ProductsListModule/setOperationType', 'lease');
        } else if (type.toLowerCase() === 'woo-deal') {
            initSessionParams('sale');
            store.dispatch('ProductsListModule/setOperationType', 'sale');
        } else if (type.toLowerCase() === 'vendre un bien') {
            initSessionParams('sale');
            store.dispatch('ProductsListModule/setOperationType', 'sale');
        } else if (type.toLowerCase() === 'louer un bien') {
            initSessionParams('lease');
            store.dispatch('ProductsListModule/setOperationType', 'lease');
        } else if (type.toLowerCase() === 'relooker mon bien') {
            store.dispatch('ArtHomeModule/setActionType', 'edit');
        } else if (
            type.toLowerCase() === 'acquérir un meuble/une œuvre d’art'
        ) {
            store.dispatch('ArtHomeModule/setActionType', 'relooking');
        } else if (type.toLowerCase() === 'proposer mes services') {
            store.dispatch('ArtHomeModule/setActionType', '');
        }
    };

    function initSessionParams(type: string) {
        setSessionPersistStore({
            key: 'params',
            value: { data: { operationType: type }, step: {} },
        });
    }
    async function navigateToNotification(route: string) {
        router.push({ name: route });
    }

    function getRoleUser() {
        if (userLoggedIn.value) {
            if (userLoggedIn.value.roles.includes('ROLE_PREST')) {
                dataMenu.forEach((menu: any) =>
                    menu.label.toUpperCase() === 'W-Local'.toUpperCase()
                        ? menu.submenu?.forEach(
                              (submenu: any) => (submenu.view = '')
                          )
                        : ''
                );
            }
        }
    }

    function setActionArtHome() {
        console.log('SET ACTION ART_HOME');
    }

    function isMenuItemActive(submenu: any): boolean {
        if (submenu && submenu.length > 0) {
            return submenu.some(
                (s: any) =>
                    s.path === routeActive.value || isMenuItemActive(s.submenu)
            );
        }
        return false;
    }

    function isSubMenuActive(submenu: any): boolean {
        if (submenu && submenu.length > 0) {
            return submenu.some((s: any) => {
                return (
                    s.path === routeActive.value || isMenuItemActive(s.submenu)
                );
            });
        }
        return false;
    }

    const activeSubMenuIndex = ref(getItem('activeSubMenuIndex', '0'));
    const activeSubMenuKey = ref(getItem('activeSubMenuKey', '-1'));

    // Fonction pour obtenir les classes pour l'élément de menu 2
    function getMenuItemClasses(path: string) {
        return {
            'ant-menu-item-active ant-menu-item-selected':
                initialPath.value === path, // Remplacez 'active-class-name' par la classe spécifique que vous voulez pour l'élément actif
        };
    }

    function getItem(variable: string, initValue: string) {
        return parseInt(localStorage.getItem(variable) || initValue);
    }

    function setItem(variable: string, index: number) {
        return localStorage.setItem(variable, index.toString());
    }

    function handleMenuClick(index: number, key: number) {
        activeSubMenuIndex.value = index;
        activeSubMenuKey.value = key;
        setItem('activeSubMenuIndex', index);
        setItem('activeSubMenuKey', key);
    }
</script>

<template>
    <a-affix class="section__header">
        <header class="header">
            <div class="header__mobile">
                <div>
                    <Paragraphe type="bold">
                        <div class="mobile-title">
                            <!-- <div
                                @click="router.back()"
                                v-if="$route.name !== 'home'"
                            >
                                <ArrowBack />
                            </div> -->
                            <div>
                                <router-link to="/">IMMO</router-link>
                                <span v-if="isLoggedIn" class="relative"
                                    ><span class="header__mobile__isLoggedInDot"
                                        >&nbsp;</span
                                    ></span
                                >
                            </div>
                        </div>
                    </Paragraphe>
                </div>
                <div class="flex gap-[15px]">
                    <!-- Mini boite email -->
                    <router-link to="/mini-boite-mail">
                        <!-- <MiniMailBox /> -->
                        <span class="notification notification--messages">
                            <MiniMailBox />
                            <small
                                v-if="messageMiniMailBox"
                                class="notification__count"
                                ><template v-if="messageMiniMailBox > 15"
                                    >15+</template
                                ><template v-else>{{
                                    messageMiniMailBox
                                }}</template></small
                            >
                        </span>
                    </router-link>
                    <!-- end Mini boite email -->
                    <!-- MESSAGES -->
                    <span @click="navigateToNotification('message')">
                        <span class="notification notification--messages">
                            <Chat />
                            <small
                                v-if="messageNotification"
                                class="notification__count"
                                ><template v-if="messageNotification > 15"
                                    >15+</template
                                ><template v-else>{{
                                    messageNotification
                                }}</template></small
                            >
                        </span>
                    </span>
                    <!--end MESSAGES -->
                    <span
                        @click="navigateToNotification('global-notification')"
                        class="notification"
                    >
                        <CircleBell />
                        <small
                            :class="{ 'p-[1px]': notificationCount > 15 }"
                            v-if="notificationCount !== 0"
                            class="notification__count"
                            ><template v-if="notificationCount > 15"
                                >15+</template
                            ><template v-else>{{
                                notificationCount
                            }}</template></small
                        >
                    </span>
                    <div
                        class="header__menu"
                        :class="{ 'header__menu--active': isMenu }"
                        @click="handleShowMenu('')"
                    >
                        <!-- <IconMenu /> -->
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div
                    class="header__overlay"
                    :class="{ 'overlay-active': isMenu }"
                    @click="handleShowMenu('')"
                ></div>
                <div
                    class="header__content-menu-mobile"
                    :class="{ 'menu-active': isMenu }"
                >
                    <a-menu mode="inline">
                        <template v-for="(d, index) in dataMenu">
                            <template v-if="!d.submenu">
                                <a-menu-item :key="`alipay-${index}`">
                                    <router-link
                                        @click="handleShowMenu('')"
                                        :to="d.path"
                                        class="header__nav"
                                    >
                                        <component :is="d.icon"></component>
                                        {{ d.label }}
                                    </router-link>
                                </a-menu-item>
                            </template>
                            <a-sub-menu :key="`sub-${index}`" v-else>
                                <template #title>
                                    <component :is="d.icon"></component>
                                    <span class="header__nav">{{
                                        d.label
                                    }}</span>
                                </template>
                                <a-menu-item-group
                                    v-for="(s, key) in d.submenu"
                                    :key="key"
                                >
                                    <a-menu-item
                                        :key="`setting:${key}`"
                                        v-if="s.view !== 'ROLE_PREST'"
                                    >
                                        <router-link
                                            @click="handleShowMenu(s.label)"
                                            :to="s.path"
                                        >
                                            {{ s.label }}
                                        </router-link>
                                    </a-menu-item>
                                </a-menu-item-group>
                            </a-sub-menu>
                        </template>
                        <template v-if="!isLoggedIn">
                            <a-menu-item :key="`setting:100`">
                                <router-link
                                    @click="handleShowMenu('')"
                                    to="/connexion"
                                    class="header__nav"
                                >
                                    <Login />
                                    Connexion
                                </router-link>
                            </a-menu-item>
                            <!-- <a-menu-item :key="`setting:101`">
                                <router-link
                                    @click="handleShowMenu('')"
                                    to="/inscription"
                                    class="header__nav"
                                >
                                    <AddUser />
                                    Inscription
                                </router-link>
                            </a-menu-item> -->
                        </template>
                        <template v-else>
                            <a-menu-item :key="`setting:1002`">
                                <router-link
                                    @click="handleLogout"
                                    to="/logout"
                                    class="header__nav"
                                >
                                    <Logout />
                                    Déconnexion
                                </router-link>
                            </a-menu-item>
                            <a-menu-item
                                @click="clickUserProfilHandler"
                                :key="`setting:1003`"
                            >
                                <figure
                                    v-if="userLoggedIn.logo"
                                    class="header__avatar--mobile"
                                >
                                    <img
                                        :src="userLoggedIn.logo"
                                        alt="profil-avatar"
                                    />
                                </figure>
                                <MiniUser v-else />
                                <span
                                    class="header__content-menu-mobile__username"
                                    >{{ username }}</span
                                >
                            </a-menu-item>
                        </template>
                    </a-menu>
                </div>
            </div>
            <div class="header__desc">
                <Paragraphe type="bold">
                    <router-link to="/">IMMO</router-link>
                </Paragraphe>
                <div class="header__content-menu">
                    <a-menu mode="horizontal" :selectable="false">
                        <template v-for="(d, index) in dataMenu">
                            <template v-if="!d.submenu && d.view === 'all'">
                                <a-menu-item
                                    :key="`alipay-${index}`"
                                    :class="{
                                        'ant-menu-item-selected':
                                            initialPath === `/${
                                                        d.path.split('/')[1]
                                                    }` &&
                                            index === activeSubMenuIndex,
                                    }"
                                    @click="handleMenuClick(index, NaN)"
                                >
                                    <router-link :to="d.path">
                                        {{ d.label }}
                                    </router-link>
                                </a-menu-item>
                            </template>
                            <a-sub-menu
                                popup-class-name="submenu-header-nav"
                                :key="`sub-${index}`"
                                v-else-if="d.submenu && d.view !== 'mobile'"
                                :class="{
                                    'ant-menu-submenu-selected':
                                        index === activeSubMenuIndex,
                                }"
                            >
                                <template #title>
                                    <span>{{ d.label }}</span>
                                    <ArrowBottom
                                        v-if="d.submenu && d.submenu.length > 0"
                                    />
                                </template>
                                <a-menu-item-group
                                    v-for="(s, key) in d.submenu"
                                    :key="key"
                                >
                                    <a-menu-item
                                        :key="`setting:${key}`"
                                        :class="{
                                            'nav-immogo':
                                                s.label.toLocaleLowerCase() ===
                                                'immogo',
                                            'ant-menu-item-active ant-menu-item-selected':
                                                initialPath ===
                                                    `/${
                                                        s.path.split('/')[1]
                                                    }` &&
                                                key === activeSubMenuKey,
                                        }"
                                        v-if="s.view !== 'ROLE_PREST'"
                                        @click="handleMenuClick(index, key)"
                                    >
                                        <router-link
                                            @click="handleShowMenu(s.label)"
                                            :to="s.path"
                                        >
                                            {{ s.label }}
                                        </router-link>
                                    </a-menu-item>
                                </a-menu-item-group>
                            </a-sub-menu>
                        </template>
                    </a-menu>
                </div>
                <div class="header__user header__menu-rigth">
                    <a-menu mode="horizontal" :selectable="false">
                        <a-menu-item
                            key="20"
                            :class="getMenuItemClasses('/recherche-bien')"
                            @click="handleMenuClick(20, NaN)"
                        >
                            <router-link to="/recherche-bien">
                                <Search />
                            </router-link>
                        </a-menu-item>
                        <!-- MINI BOITE MAIL -->
                        <a-menu-item
                            key="21"
                            :class="getMenuItemClasses('/mini-boite-mail')"
                            @click="handleMenuClick(21, NaN)"
                        >
                            <router-link to="/mini-boite-mail">
                                <MiniMailBox />
                            </router-link>
                        </a-menu-item>
                        <!-- MESSAGES -->
                        <a-menu-item
                            key="24"
                            :class="getMenuItemClasses('/messages')"
                            @click="handleMenuClick(24, NaN)"
                        >
                            <span @click="navigateToNotification('message')">
                                <span
                                    class="notification notification--messages"
                                >
                                    <Chat />
                                    <small
                                        v-if="messageNotification"
                                        class="notification__count"
                                        ><template
                                            v-if="messageNotification > 15"
                                            >15+</template
                                        ><template v-else>{{
                                            messageNotification
                                        }}</template></small
                                    >
                                </span>
                            </span>
                        </a-menu-item>
                        <!--end MESSAGES -->
                        <!-- NOTIFICATION -->
                        <a-menu-item
                            key="25"
                            :class="getMenuItemClasses('/notification')"
                            @click="handleMenuClick(25, NaN)"
                        >
                            <span
                                @click="
                                    navigateToNotification(
                                        'global-notification'
                                    )
                                "
                            >
                                <span class="notification">
                                    <CircleBell />
                                    <small
                                        v-if="notificationCount !== 0"
                                        class="notification__count"
                                        ><template v-if="notificationCount > 15"
                                            >15+</template
                                        ><template v-else>{{
                                            notificationCount
                                        }}</template></small
                                    >
                                </span>
                            </span>
                        </a-menu-item>
                        <!--end NOTIFICATION -->

                        <a-menu-item
                            key="30"
                            :class="getMenuItemClasses('/admin-immobilier')"
                            @click="handleMenuClick(30, NaN)"
                        >
                            <figure
                                v-if="!fakeLoadAvatar"
                                class="header__avatar"
                                @click="clickUserProfilHandler"
                            >
                                <User
                                    v-if="
                                        !isLoggedIn ||
                                        (isLoggedIn && !userLoggedIn.logo)
                                    "
                                />
                                <img
                                    v-else
                                    :src="userLoggedIn.logo"
                                    alt="profil-avatar"
                                />
                                <span
                                    v-if="isLoggedIn"
                                    class="header__isLoggedInDot"
                                ></span>
                            </figure>
                            <span v-else>...</span>
                        </a-menu-item>
                        <a-sub-menu key="sub-100">
                            <template #title>
                                <ArrowBottom />
                            </template>
                            <a-menu-item-group v-if="!isLoggedIn">
                                <a-menu-item :key="`setting:100`">
                                    <router-link to="/connexion"
                                        >Connexion</router-link
                                    >
                                </a-menu-item>
                                <a-menu-item :key="`setting:1001`">
                                    <router-link to="/inscription"
                                        >Inscription</router-link
                                    >
                                </a-menu-item>
                            </a-menu-item-group>
                            <a-menu-item-group v-else>
                                <a-menu-item :key="`setting:1002`">
                                    <router-link
                                        @click="handleLogout"
                                        to="/logout"
                                        >Déconnexion</router-link
                                    >
                                </a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>
                    </a-menu>
                </div>
            </div>
        </header>
    </a-affix>
</template>

<style lang="scss" scoped>
    a:hover {
        color: var(--color-primary);
    }
    .notification {
        cursor: pointer;
        position: relative;
        @apply block;
        &__count {
            @apply absolute w-[15px] h-[15px] flex justify-center items-center;
            top: 0;
            right: -5px;
            background-color: #fb2020;
            color: #fff;
            border-radius: 50%;
        }
        &--messages {
            width: 30px;
            height: 30px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background-color: #f2f2f2;
            border-radius: 50%;
            position: relative;
        }
    }
    .header {
        &__isLoggedInDot {
            position: absolute;
            height: 10px;
            width: 10px;
            background-color: #54d954;
            border-radius: 50%;
            bottom: 0;
            right: 0;
        }
        background-color: #fff;
        padding: 14px 15px;
        position: relative;
        z-index: 1001;
        box-shadow: 0 0 3px var(--color-primary);
        &__menu {
            cursor: pointer;
            @apply flex flex-col justify-center gap-[4px];
            span {
                background-color: var(--color-secondary);
                @apply block w-[16px] h-[2px];
                &:nth-child(2) {
                    transform: translateX(100%);
                    @apply w-[8px];
                    transition: transform 0.18s ease;
                }
            }
            &--active {
                span {
                    &:nth-child(2) {
                        transform: translateX(0);
                    }
                }
            }
        }
        &__mobile {
            &__isLoggedInDot {
                @apply absolute w-[10px] h-[10px] top-[50%] left-[50%];
                background-color: #54d954;
                border-radius: 50%;
                transform: translate(50%, -50%);
            }
            @apply flex justify-between items-center;
            @screen lg {
                display: none;
            }
            &:deep() {
                .ant-menu-submenu::after .ant-menu-item,
                .ant-menu-submenu-title {
                    padding-left: 10px !important;
                }
                .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
                    background-color: var(--color-gray);
                    border-radius: 8px;
                    a {
                        color: var(--color-secondary);
                    }
                }
                .ant-menu-submenu-open {
                    .ant-menu-submenu-title {
                        background-color: var(--color-gray);
                        border-radius: 8px;
                    }
                    .ant-menu-submenu-arrow {
                        color: var(--color-secondary);
                    }
                }
                .ant-menu-submenu:hover
                    > .ant-menu-submenu-title
                    > .ant-menu-submenu-arrow {
                    color: var(--color-secondary);
                }
                .ant-menu-sub.ant-menu-inline .ant-menu-item-group-title {
                    display: none;
                }
                .ant-menu-sub {
                    body & {
                        background-color: transparent;
                        @apply pl-[25px] relative;
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        left: 15px;
                        border-left: 1px solid var(--color-gray);
                        height: 100%;
                        top: 0;
                        display: inline-block;
                    }
                    .ant-menu-item {
                        @apply py-[5px];
                    }
                }
            }
        }
        &__desc {
            display: none;
            max-width: 1170px;
            width: 100%;
            margin: auto;
            @screen lg {
                @apply flex justify-between gap-[10px];
            }
            p {
                @apply flex items-center;
            }
        }
        &__content-menu {
            @apply w-full flex items-center;
            &:deep() {
                .ant-menu-overflow {
                    @apply w-full justify-center gap-[10px];
                    @screen xl {
                        @apply gap-[20px];
                    }
                    &::after,
                    &::before {
                        @apply hidden;
                    }
                }
            }
        }
        &__avatar--mobile,
        &__avatar {
            overflow: hidden;
            border-radius: 50%;
            background-color: var(--color-stroke-gray);
            @apply flex justify-center items-center;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__avatar {
            width: 35px;
            height: 35px;
            &--mobile {
                width: 16px;
                height: 16px;
            }
        }

        &__content-menu-mobile {
            position: fixed;
            width: calc(100vw - 50px);
            transform: translateX(100%);
            top: 50px;
            right: 0;
            background-color: #fff;
            height: calc(100vh - 49px);
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            overflow: auto;
            padding: 0 10px;
            transition: transform 0.25s ease;
            &__username {
                color: var(--color-secondary);
                font-weight: 600;
            }
        }
        .menu-active {
            transform: translateX(0);
            transition: transform 0.25s ease;
        }
        .overlay-active {
            opacity: 0.25;
            visibility: visible;
        }
        &__menu-rigth {
            body & {
                .ant-menu-overflow {
                    @apply gap-[10px];
                }
            }
        }
        &:deep() {
            .ant-menu-horizontal {
                border-bottom: 0;
            }
            .ant-menu-horizontal:not(.ant-menu-dark)
                > .ant-menu-submenu:hover::after {
                content: none;
            }
            .ant-menu-title-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .ant-menu-overflow {
                align-items: center;
                line-height: normal;
                // @apply gap-[35px];
            }
            .ant-menu-overflow-item {
                padding: 0;
            }
            .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover {
                color: var(--color-secondary);
            }
            .ant-menu-vertical {
                padding-top: 10px;
            }
            .ant-menu-vertical .ant-menu-item::after,
            .ant-menu-vertical-left .ant-menu-item::after,
            .ant-menu-vertical-right .ant-menu-item::after,
            .ant-menu-inline .ant-menu-item::after {
                content: none;
            }
            .ant-menu-inline,
            .ant-menu-vertical,
            .ant-menu-vertical-left {
                border: none;
            }

            .ant-menu-horizontal:not(.ant-menu-dark)
                > .ant-menu-submenu-selected {
                color: var(--color-secondary);
            }
        }
        &__overlay {
            position: fixed;
            top: 49px;
            right: 0;
            width: 100vw;
            height: calc(100% - 49px);
            background-color: var(--color-secondary);
            opacity: 0;
            transition: opacity 0.25s ease;
            z-index: -1;
            visibility: hidden;
        }
        &__nav {
            @apply flex gap-[10px] items-center;
            color: var(--color-secondary);
            font-weight: 600;
        }
    }
    .mobile-title {
        @apply flex items-center gap-[15px];
    }
    .section__header {
        &:deep() {
            & > div {
                top: -20px;
                transition: top 0.25s linear;
            }
        }
    }
</style>
