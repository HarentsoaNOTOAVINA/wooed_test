<template>
    <div class="md:container account__wrapper">
        <template v-if="isMobile">
            <transition name="fade-menu" mode="out-in">
                <component
                    :is="AsideMenuProps"
                    v-bind="$props"
                    :current-label-menu="currentLabelMenu"
                    v-if="!currentMenu"
                    @on-click-menu="navigationHandler"
                />
                <div class="account__menu-content" v-else>
                    <transition name="fade-menu" mode="out-in">
                        <MenuListWrapper
                            @on-go-back="gobackHandler"
                            :label-menu="currentLabelMenu"
                            :navigationMenuArray="navigationMenuArray"
                            @on-navigate-to="gobackMenuHandler"
                            :is-mobile="isMobile"
                        >
                            <component
                                v-if="dynamicProps"
                                :is="currentMenu"
                                @on-change-cmp="navigationHandler"
                                :[dynamicProps.label]="dynamicProps.value"
                            />
                            <component
                                v-else
                                :is="currentMenu"
                                @on-change-cmp="navigationHandler"
                            />
                        </MenuListWrapper>
                    </transition>
                </div>
            </transition>
        </template>
        <template v-else>
            <component
                :is="AsideMenuProps"
                :current-label-menu="currentLabelMenu"
                @on-click-menu="navigationHandler"
            />
            <div class="account__menu-content">
                <transition name="fade-menu" mode="out-in">
                    <MenuListWrapper
                        :navigationMenuArray="navigationMenuArray"
                        @on-go-back="gobackHandler"
                        :label-menu="currentLabelMenu"
                        @on-navigate-to="gobackMenuHandler"
                        :is-mobile="isMobile"
                    >
                        <transition name="fade-menu-content" mode="out-in">
                            <template v-if="dynamicPropsCurrent">
                                <component
                                    :is="currentMenu"
                                    @on-change-cmp="navigationHandler"
                                    :[dynamicPropsCurrent.label]="
                                        dynamicPropsCurrent.value
                                    "
                                />
                            </template>
                            <template v-else>
                                <component
                                    :is="currentMenu"
                                    @on-change-cmp="navigationHandler"
                                />
                            </template>
                        </transition>
                    </MenuListWrapper>
                </transition>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref, shallowRef, watch, PropType, onMounted } from 'vue';
    import MenuListWrapper from '@/pages/user-account/Menu/Wrapper/MenuListWrapper.vue';
    import { useRoute } from 'vue-router';

    import PurchasesList from '@/pages/user-account/Menu/Purchases/PurchasesList.vue';
    import Menu from '@/pages/user-account/Menu/Purchases/Buyer/components/MenuPurchaseProperty.vue';
    import OfferLease from  "@/pages/lease/offer/list.vue";
    import MoreInfo from "../Menu/MoreInfo/moreInfo.vue";
    
    // import store from '@/store';

    const currentMenu = shallowRef<any>();
    const navigationMenuArray = shallowRef<Array<any>>([]);
    const currentLabelMenu = ref<string>('');
    const MIN_WIDTH: number = 768;
    const currentWidthScreen = ref<number>(screen.width);
    const dynamicProps = ref<any>();
    const dynamicPropsCurrent = ref<any>();
    const dynamicPropsArray = ref<Array<any>>([]);
    const route = useRoute();

    const isMobile = computed(() => currentWidthScreen.value < MIN_WIDTH);

    window.addEventListener('resize', () => {
        currentWidthScreen.value = screen.width;
    });

    const props = defineProps({
        DefaultMenu: {
            type: Object as PropType<any>,
        },
        AsideMenuProps: {
            type: Object as PropType<any>,
        },
        defaultMenuLabel: String,
    });

    onMounted(() => {
        checkQueryFromNotification();
        checkQueryFromRentProposal();
        checkQueryFromProposition();
    });

    watch(
        () => isMobile.value,
        (v) => {
            if (!v) {
                navigationMenuArray.value.forEach((item) => {
                    if (item.label === 'Profil') {
                        navigationMenuArray.value = [
                            ...navigationMenuArray.value.slice(
                                1,
                                navigationMenuArray.value.length
                            ),
                        ];
                    }
                });
                if (!navigationMenuArray.value.length) {
                    currentMenu.value = props.DefaultMenu;
                    currentLabelMenu.value = <string>props.defaultMenuLabel;
                    navigationMenuArray.value = [
                        ...navigationMenuArray.value,
                        {
                            label: currentLabelMenu.value,
                            value: currentMenu.value,
                        },
                    ];
                }
            }
        },
        { immediate: true }
    );

    watch(
        () => dynamicProps.value,
        (v) => {
            dynamicPropsCurrent.value = { ...v };
        },
        { immediate: true, deep: true }
    );

    function checkQueryFromNotification() {
        if (!!route.query.to) {
            const destRoute = JSON.parse(route.query.to as any);

            const menuArray = [
                {
                    label: 'Mes achats',
                    value: PurchasesList,
                },
                {
                    label: 'Menu',
                    value: Menu,
                    active: true,
                    emittedValue: {
                        label: 'id',
                        value: destRoute.thePropertyId,
                    },
                },

            ];

            switch (destRoute.name) {
                case 'Mes offres envoyées':
                    menuArray.forEach(item => {
                        navigationHandler(item);
                    })
                    break;
                case 'Mettre a  jour identite':
                    menuArray.forEach(item => {
                        navigationHandler(item);
                    })
                    break;
            }
        }
    }
    function checkQueryFromRentProposal(){
        if(route.query.to){

            const destRoute = JSON.parse(route.query.to as any);
            
            navigationHandler({
                label: 'rent-proposal',
                value: OfferLease,
            });
        }
    }

    function checkQueryFromProposition(){
        if(route.query.to){

            const destRoute = JSON.parse(route.query.to as any);
            
            navigationHandler({
                label: "Mettre à jour votre profil bancaire",
                value: MoreInfo,
            });
        }
    }

    function gobackHandler() {
        navigationMenuArray.value = [...navigationMenuArray.value.slice(0, -1)];
        if (navigationMenuArray.value.length) {
            currentMenu.value = navigationMenuArray.value.at(-1).value;
            currentLabelMenu.value = navigationMenuArray.value.at(-1).label;
        } else {
            currentMenu.value = null;
            currentLabelMenu.value = '';
        }
        propsArrayHanlder();
    }
    function gobackMenuHandler(menu: { label: string; value: any }) {
        navigationMenuArray.value = [
            ...navigationMenuArray.value.slice(
                0,
                navigationMenuArray.value.indexOf(menu) + 1
            ),
        ];
        currentMenu.value = navigationMenuArray.value.at(-1).value;
        currentLabelMenu.value = navigationMenuArray.value.at(-1).label;
        propsArrayHanlder();
    }

    function navigationHandler(menu: {
        label: string;
        value: any;
        submenu?: any;
        active?: boolean;
        emittedValue?: { label: string; value: any };
    }) {
        if (navigationMenuArray.value.indexOf(menu) === -1) {
            if (menu?.active) {
                navigationMenuArray.value = [
                    ...navigationMenuArray.value,
                    menu,
                ];
            } else {
                navigationMenuArray.value = [menu];
            }
        }
        currentMenu.value = menu.value;
        currentLabelMenu.value = menu.label;
        !!menu.emittedValue && propsHandler(menu.emittedValue);
        let indexCurrentMenu: number = 0;
        navigationMenuArray.value.forEach((item, index) => {
            console.log(item);
            
            if (JSON.stringify(menu) === JSON.stringify(item)) {
                indexCurrentMenu = index;
            }
        });
        if (menu.emittedValue) {
            dynamicPropsArray.value = [
                ...dynamicPropsArray.value,
                {
                    idx: indexCurrentMenu,
                    props: menu.emittedValue,
                },
            ];
        }

        console.log(dynamicPropsArray.value, 'dynamicPropsArray');
    }

    function propsArrayHanlder() {
        const lastCurrentMenuIdx = navigationMenuArray.value.length - 1;
        dynamicPropsArray.value.forEach((item) => {
            if (item.idx === lastCurrentMenuIdx) {
                propsHandler(item.props);
            }
        });
    }

    function propsHandler(props: { label: string; value: any }) {
        dynamicProps.value = { ...props };
        console.log(dynamicProps.value);
    }
</script>

<style lang="scss" scoped>
    .fade-menu-enter-active,
    .fade-menu-leave-active {
        transition: 0.2s ease-out;
    }
    .fade-menu-enter-from {
        // opacity: 0;
        transform: translate(-100%, 0);
    }
    .fade-menu-leave-to {
        // opacity: 0;
        transform: translate(100%, 0);
    }
    .fade-menu-content-enter-active,
    .fade-menu-content-leave-active {
        transition: 0.2s ease-in;
    }
    .fade-menu-content-enter-from {
        // opacity: 0;
        transform: translate(-100%, 0);
    }
    .fade-menu-content-leave-to {
        // opacity: 0;
        transform: translate(100%, 0);
    }
    .account {
        @apply p-[10px];
        border-radius: 8px;
        background-color: #fff;
        &__aside-menu__wrapper {
            @apply w-full;
            @screen md {
                @apply w-1/3;
            }
        }
        &__wrapper {
            @apply p-[10px] flex flex-row gap-x-[10px];
            &:deep() {
                hr {
                    color: var(--color-stroke-gray) 
                }
            }
        }
        &__menu-content {
            @apply w-full overflow-hidden;
            @screen md {
                @apply w-2/3;
            }
        }
    }
</style>
