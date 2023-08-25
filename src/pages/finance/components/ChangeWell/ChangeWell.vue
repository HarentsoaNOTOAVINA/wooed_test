<template>
    <div class="change-well">
        <div class="change-well__wrap">
            <Refresh class="hover:cursor-pointer" @click="onReloadPage" />
            <span class="change-well__content"> Voir mon bien: </span>
            <Dropdown
                :trigger="['click']"
                v-model:visible="visible"
                placement="bottomRight"
            >
                <span
                    class="change-well__icon ant-dropdown-link"
                    @click.prevent
                >
                    <Immobilier />
                    <ArrowBottom />
                </span>
                <template #overlay>
                    <Card class="well__container">
                        <ProductCard :DataCard="property" class="well__items" />
                        <hr class="__hr" />
                        <Button @click="gotoProductList" class="well__btn-wrap"> Changer bien </Button>
                    </Card>
                </template>
            </Dropdown>
        </div>
    </div>
</template>

<script setup>
    import { Dropdown } from 'ant-design-vue';
    import Immobilier from '@/components/Icon/Immobilier.vue';
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import { useStore } from 'vuex';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router'
import Refresh from '@/components/Icon/Refresh.vue';

    const router = useRouter()
    const visible = ref(false);

    const store = useStore();
    const property = ref();

    onMounted(() => {
        getProperty();
    });

    function getProperty() {
        const d = store.getters[
            'FinancialModule/getChoosenProperty'
        ]
        property.value = d
    }

    function gotoProductList() {
        router.push('/finance-index')
    }

    function onReloadPage() {
        navigation.reload()
    }

</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .change-well {
        &__wrap {
            @apply flex items-center gap-x-[15px];
        }
        &__content {
            @apply hidden;
            @screen md {
                @apply block font-semibold text-[14px];
            }
        }
        &__icon {
            @apply flex items-center gap-x-2.5 p-[4px] bg-gray rounded-[4px] cursor-pointer;
            &:deep() {
                svg path {
                    @apply fill-primary transition;
                }
            }
            &:hover:active :deep() {
                svg path {
                    @apply fill-secondary transition;
                }
            }
        }
    }
    .well {
        &__container {
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
            width: 302px;
            @apply rounded-[10px] border-solid border-[1px] border-gray;
        }
        &__btn-wrap {
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
        &__items {
            max-height: calc(100vh - 235px);
            @apply overflow-y-auto w-auto py-0 -mx-[14px];
                @include scrollbar;
            &:hover {
                @apply shadow-none;
            }
        }
    }
    .__hr {
        @apply text-gray my-[10px];
    }
</style>
