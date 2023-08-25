<template>
    <div class="product-card">
        <div
            v-if="!DataCard.length && isParentHandled"
            class="product-card--empty"
        >
            <a-empty description="Pas de bien(s) à afficher" />
        </div>
        <template v-else>
            <TransitionGroup appear name="fade-step">
                <ProductCard
                    @on-handle-product="
                        (prevProps: any) => {
                            handleProduct(prevProps, card);
                        }
                    "
                    v-for="(card, index) in DataCard"
                    :DataCard="card"
                    :key="index"
                    :isStatus="isStatus"
                    :needMarkInterest="props.needMarkInterest"
                    @moreInfo="$emit('moreInfo')"
                    @deleted="handleShowConfirmation(card.id)"
                />
            </TransitionGroup>
        </template>
        <Modal
            title="Confimation"
            :isShowModal="isShowModal"
            @on-back="isShowModal = false"
        >
            <template #content>
                <div>Voulez-vous vraiment supprimer cette annonce ?</div>
                <div class="wrap-button-confirmation">
                    <Button
                        typeButton="primary-cancel"
                        @on-click="isShowModal = false"
                    >
                        Annuler
                    </Button>
                    <Button type="primary" @on-click="handleDeteled">
                        <LoadingButton size="xs" v-if="isLoadDeleted" />
                        Supprimer
                    </Button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import CardType from '@/components/Display/productCard/CardType';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    import { PropType, provide, ref } from 'vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import ProductsListService from '@/services/productsListService';

    const props = defineProps({
        DataCard: {
            type: Object as PropType<CardType[]>,
            required: true,
            default: [],
        },
        isBordered: {
            type: Boolean,
            default: false,
        },
        isParentHandled: {
            type: Boolean,
            default: false,
        },
        isStatus: {
            default: false,
            required: false,
        },
        needMarkInterest: {
            type: Boolean,
            default: false,
        },
    });

    provide('isBordered', props.isBordered);

    const emit = defineEmits<{
        (e: 'on-handle-product', payload: any): void;
        (e: 'on-handle-detail', payload: any): void;
        (e: 'onEdit', payload: any): void;
        (e: 'moreInfo', payload: any): void;
    }>();

    const isShowModal = ref<boolean>(false);
    const isLoadDeleted = ref<boolean>(false);
    const idProduct = ref<number>(NaN);

    function handleProduct(value: any, cardDetail: any) {
        console.log(cardDetail);
        emit('on-handle-product', value);
        emit('on-handle-detail', cardDetail);
        emit('onEdit', { value, cardDetail });
    }

    function handleShowConfirmation(id: number) {
        isShowModal.value = true;
        idProduct.value = id;
    }

    async function handleDeteled() {
        isLoadDeleted.value = true;
        try {

            const { code } = await ProductsListService.detelePropertyPerUser(
                idProduct.value
            );

            console.log('deteled >>>>', code);
            if (code === 200) {

                notification.success({
                    message: `Votre annonces a été supprimé avec succès`,
                });

            }
        } catch (error) {

            notification.error({
                message: `Une erreur s'est produite, veuillez reessayer`,
            });

        } finally {

            isLoadDeleted.value = false;
            
        }
    }
</script>

<style lang="scss" scoped>
    .fade-step-enter-active,
    .fade-step-leave-active {
        transition: all 0.5s ease-in-out;
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        transform: translateX(50px);
    }
    .product-card {
        @apply gap-[18px];
        &--empty {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            display: flex;
            right: 0;
            align-items: center;
            justify-content: center;
            &:deep() {
                .ant-empty-description {
                    color: var(--color-stroke-gray);
                }
            }
        }
        &:deep() {
            & > .card {
                // @apply my-0 max-w-[400px];
                transition: transform 0.2s ease;
                @apply my-0 bg-white;
                // transform: scale(1);
                // transition: transform 0.2s ease;
                .card__image {
                    transition: transform 0.2s ease;
                    @apply scale-[1];
                }
                &:hover {
                    transition: transform 0.2s ease;
                    // transform: scale(1.03);
                    // @apply bg-gray;
                    .card__image {
                        transition: transform 0.2s ease;
                        @apply scale-[1.03];
                    }
                }
            }
        }
    }
    .wrap-button-confirmation {
        @apply flex gap-[10px] justify-end mt-[15px];
    }
</style>
