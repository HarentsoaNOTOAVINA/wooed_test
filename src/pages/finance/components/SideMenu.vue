<template>
    <div class="sideMenu__section">
        <transition mode="out-in" name="fade-menu">
            <div
                class="sideMenu__container-mobile"
                :class="{
                    'sideMenu__container-mobile--is-on-back': !isMenuSelected,
                }"
            >
                <div v-if="activeData" class="flex items-center">
                    <ArrowBack @click="onbacktoMenu" />
                    <div class="sideMenu__item">
                        <Icon :icon-name="activeData.icon" />
                        <span> {{ activeData.label }} </span>
                    </div>
                </div>
            </div>
        </transition>
        <transition mode="out-in" name="fade-menu">
            <div
                class="sideMenu__container"
                :class="{
                    'sideMenu__container--is-on-back': !isMenuSelected,
                }"
            >
                <a-menu
                    v-model:selectedKeys="selectedKeys"
                    v-model:openKeys="openKeys"
                    mode="inline"
                    @open-change="onOpenChange"
                >
                    <a-menu-item
                        key="price-evolution"
                        @click="
                            click(
                                {
                                    name: `priceEvolution`,
                                    component: PriceEvolution,
                                },
                                'price-evolution'
                            )
                        "
                        class="sideMenu__item"
                    >
                        <Icon class="rotate-[130deg]" icon-name="ArrowBack" />
                        <span>Evolution du prix</span>
                    </a-menu-item>

                    <a-sub-menu key="aquisition-fee">
                        <template #title>
                            <div class="submenu-content">
                                <Icon icon-name="FinancialRessources" />
                                <Title type="h5" label="Frais d'aquisition" />
                            </div>
                        </template>
                        <a-menu-item
                            v-for="item in acquisitionFee"
                            :key="item.name"
                            class="sideMenu__item"
                            :class="[
                                nameActive === item.name
                                    ? 'sideMenu__active'
                                    : '',
                            ]"
                            @click="click(item, 'aquisition-fee')"
                        >
                            <Icon :icon-name="item.icon" />
                            <span>
                                {{ item.label }}
                            </span>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="selling-fees">
                        <template #title>
                            <div class="submenu-content">
                                <Icon icon-name="CreditCard" />
                                <Title type="h5" label="Frais de vente" />
                            </div>
                        </template>
                        <a-menu-item
                            v-for="item in sellingFee"
                            :key="item.name"
                            class="sideMenu__item"
                            :class="[
                                nameActive === item.name
                                    ? 'sideMenu__active'
                                    : '',
                            ]"
                            @click="click(item, 'selling-fees')"
                        >
                            <Icon :icon-name="item.icon" />
                            <span>
                                {{ item.label }}
                            </span>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item
                        key="annual-income"
                        @click="
                            click(
                                {
                                    name: `annualIncome`,
                                    component: AnnualIncome,
                                },
                                'annual-income'
                            )
                        "
                        class="sideMenu__item"
                    >
                        <Icon class="money-icon" icon-name="Money" />
                        <div class="sideMenu__content-section">
                            <span> Revenus annuels de mon bien</span>
                            <span class="sideMenuPrice">
                                {{ separatorHandleFloat(totalAnnualRevenu) }}
                                €</span
                            >
                        </div>
                    </a-menu-item>
                    <a-sub-menu key="annual-cost">
                        <template #title>
                            <div class="submenu-content">
                                <Icon class="money-icon" icon-name="Money" />
                                <div class="sideMenu__content-section">
                                    <Title
                                        type="h5"
                                        label="Coût annuelle de mon bien"
                                    />
                                    <span class="sideMenuPrice"
                                        >{{ totalAnnualCost }} €</span
                                    >
                                </div>
                            </div>
                        </template>
                        <a-menu-item
                            :disabled="
                                isSimulation &&
                                (item.name === 'help' ||
                                    item.name === 'municipalTax' ||
                                    item.name === 'consumer')
                            "
                            v-for="item in actvieDataSideMenuAnnualCost"
                            :key="item.name"
                            class="sideMenu__item"
                            :class="[
                                nameActive === item.name
                                    ? 'sideMenu__active'
                                    : '',
                            ]"
                            @click="
                                () =>
                                    item.name !== 'totalAmount' &&
                                    click(item, 'annual-cost')
                            "
                        >
                            <Icon :icon-name="item.icon" />
                            <span
                                class="overflow-hidden w-full border-t border-t-strokeGray"
                                v-if="item.name === 'totalAmount'"
                            >
                                <transition name="fade-slider" mode="out-in">
                                    <span
                                        class="sideMenuPrice"
                                        v-if="toggleDisplayTotalAmount"
                                        >{{
                                            separatorHandleFloat(
                                                totalAnnualCost
                                            )
                                        }}
                                        €</span
                                    >
                                    <span class="font-semibold" v-else>
                                        {{ item.label }}</span
                                    >
                                </transition>
                            </span>
                            <div class="sideMenu__content-section">
                                <span>
                                    {{ item.label }}
                                </span>
                                <span
                                    class="sideSubMenuPrice"
                                    v-if="item.name === 'immobilingDeposit'"
                                >
                                    {{ precompte?  precompte : "0"}} €
                                </span>
                            </div>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item key="annual-return" class="sideMenu__item">
                        <Icon class="money-icon" icon-name="Money" />
                        <span
                            class="overflow-hidden w-full border-t border-t-strokeGray"
                        >
                            <!-- <transition name="fade-slider" mode="out-in"> -->
                            <div class="sideMenu__content-section">
                                <span> Rendement annuel</span>
                                <span class="sideMenuPrice"
                                    >{{
                                        separatorHandleFloat(
                                            annualReturn.toFixed(2)
                                        )
                                    }}
                                    €</span
                                >
                            </div>
                            <!-- </transition> -->
                        </span>
                    </a-menu-item>
                </a-menu>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { useStore } from 'vuex';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';
    import {
        computed,
        onMounted,
        onUnmounted,
        ref,
        shallowRef,
        watch,
    } from 'vue';
    import {
        dataSideMenu,
        dataSideMenuNotSyndic,
        acquisitionFee,
        sellingFee,
    } from '@/pages/finance/components/dataMenu';
    import {
        Menu as AMenu,
        SubMenu as ASubMenu,
        MenuItem as AMenuItem,
    } from 'ant-design-vue';
    import PriceEvolution from '../PriceEvolution/PriceEvolution.vue';
    import AnnualIncome from '../AnnualIncome/AnnualIncome.vue';
    const store = useStore();
    const props = defineProps<{
        isSimulation: boolean;
        totalAnnualCost: number;
        totalAnnualRevenu: number;
        annualReturn: number;
        precompte: any;
    }>();
    // const annualReturn = ref(128900.5);
    const ROLE_SYN = 'ROLE_SYN';
    const emit = defineEmits<{
        (e: 'activeComp', v: any): void;
        (e: 'on-back-to-menu'): void;
    }>();
    const currentOpenMenu = ref<string>('');
    const nameActive = ref<string>('');
    const activeData = shallowRef<any>(null);
    const isMenuSelected = ref<boolean>(true);
    const selectedKeys = ref<Array<string>>(['help']);
    const openKeys = ref<Array<string>>(['annual-cost']);
    const toggleDisplayTotalAmount = ref<boolean>(false);
    const actvieDataSideMenuAnnualCost = shallowRef<any>([]);
    const intervalTmp = ref<any>(null);
    onMounted(() => {
        userRoleHandler();
        handleToggleDisplayTotalAmount();
        console.log('annualReturn, ', props.annualReturn);
        console.log('cout anuel de mon bien, ', props.totalAnnualCost);
        console.log('municipality, ', props.precompte);
    });
    onUnmounted(() => {
        clearInterval(intervalTmp.value);
    });
    watch(
        () => props.precompte,
        (v) => {
            console.log(v);
        },
        { immediate: true, deep: true }
    );
    watch(
        () => props.totalAnnualRevenu,
        (v) => {
            console.log(v);
        },
        { immediate: true }
    );
    const userRole = computed<string[]>(
        () => store.getters['UserModule/getUserDetails'].roles
    );
    function handleToggleDisplayTotalAmount() {
        intervalTmp.value = setInterval(() => {
            toggleDisplayTotalAmount.value = !toggleDisplayTotalAmount.value;
        }, 2000);
    }
    function userRoleHandler() {
        actvieDataSideMenuAnnualCost.value = userRole.value.includes(ROLE_SYN)
            ? dataSideMenu
            : dataSideMenuNotSyndic;
        nameActive.value = props.isSimulation
            ? actvieDataSideMenuAnnualCost.value[2].name
            : actvieDataSideMenuAnnualCost.value[0].name;
        activeData.value = props.isSimulation
            ? actvieDataSideMenuAnnualCost.value[2]
            : actvieDataSideMenuAnnualCost.value[0];
        console.log('active data:', actvieDataSideMenuAnnualCost.value);
    }
    function click(item: any, key: string) {
        if (item) {
            emit('activeComp', item);
            nameActive.value = item.name;
            activeData.value = item;
        }
        isMenuSelected.value = true;
        openKeys.value = [key];
    }
    function onbacktoMenu() {
        isMenuSelected.value = false;
        emit('on-back-to-menu');
    }
    function onOpenChange(value: any) {
        openKeys.value = [value.at(-1) as string];
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .fade-slider-enter-active,
    .fade-slider-leave-active {
        @apply transition-all;
    }
    .fade-slider-enter-from,
    .fade-slider-leave-to {
        @apply translate-x-[-100px];
    }
    .money-icon {
        &:deep() {
            path {
                fill: var(--color-gray-icon);
            }
        }
    }
    .sideMenu {
        &__section {
            @apply flex bg-white rounded-lg p-3 w-full;
            @screen md {
                height: calc(100vh - 100px);
                max-width: 400px;
                // max-width: fit-content;
            }
        }
        &__container {
            @apply hidden;
            &--is-on-back {
                @apply block w-full;
                min-height: calc(100vh - 100px);
            }
            @screen md {
                @include scrollbar;
                @apply block w-full overflow-y-auto;
            }
            .submenu-content {
                @apply flex gap-[10px];
            }
            &:deep() {
                svg {
                    @apply w-[18px] h-[18px];
                }
                .ant-menu-item {
                    span {
                        @apply flex gap-[10px];
                    }
                    &::after {
                        border: none;
                    }
                }
                .ant-menu-item-selected {
                    @apply bg-gray font-semibold flex px-3 w-full py-4 my-[5px] items-center rounded-lg duration-300 gap-x-[16px];
                    .ant-menu-title-content {
                        color: var(--color-primary);
                    }
                }
                .ant-menu-submenu {
                    ul {
                        padding: 10px;
                    }
                }
                .ant-menu-submenu-active,
                .ant-menu-submenu-selected {
                    .ant-menu-submenu-arrow,
                    .ant-menu-submenu-title {
                        color: var(--color-primary);
                    }
                }
                .ant-menu-submenu-arrow {
                    color: var(--color-primary);
                }
                .ant-menu-inline {
                    border: none;
                    overflow: hidden;
                }
            }
        }
        &__container-mobile {
            @apply block w-full;
            &--is-on-back {
                @apply hidden;
            }
            @screen md {
                @apply hidden;
            }
            .sideMenu__item {
                @apply m-0 p-0 flex justify-end;
            }
            &__item {
                @apply p-0 pointer-events-none;
            }
        }
        &__item {
            @apply font-semibold flex px-3 w-full py-4 my-[5px] items-center rounded-lg duration-300 gap-x-[16px];
            @screen md {
                &:hover {
                    @apply bg-gray cursor-pointer;
                }
                &.active {
                    @apply bg-gray;
                }
            }
        }
        &__icon {
            @apply mr-[18.5px] w-4 h-4;
        }
        &__active {
            @apply bg-gray cursor-pointer my-[5px];
        }
    }
    .sideMenu__content-section {
        @apply flex w-full justify-between;
    }
    .sideMenuPrice {
        @apply font-bold text-[18px];
        color: var(--color-secondary);
    }
    .sideSubMenuPrice {
        @apply font-semibold text-[16px];
        color: var(--color-secondary);
    }
</style>
