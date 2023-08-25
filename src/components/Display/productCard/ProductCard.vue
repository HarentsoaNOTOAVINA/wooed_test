<template>
    <div v-if="DataCard" class="card max-w-xl">
        <div
            @click="$emit('on-handle-product', DataCard.id)"
            class="card__information"
        >
            <figure class="card__image">
                <img
                    v-if="DataCard.images?.length"
                    :src="
                        DataCard.images
                            ? DataCard.images.length > 0
                                ? `${BASE_URL}${
                                      DataCard.images[
                                          DataCard.images.length - 1
                                      ].path
                                  }`
                                : ' '
                            : ''
                    "
                    alt=" card product"
                />
                <NoPicture v-else />
                <div class="card__status" v-if="isStatus">
                    {{ statusProduct }}
                </div>
                <div
                    class="card__proposal-time"
                    v-if="!!DataCard?.isSollicited"
                >
                    {{
                        DataCard?.solicitationTimeRemaining?.days
                            ? `${DataCard?.solicitationTimeRemaining?.days} jours`
                            : ''
                    }}
                    {{
                        DataCard?.solicitationTimeRemaining?.days &&
                        DataCard?.solicitationTimeRemaining?.hours
                            ? ' et '
                            : ''
                    }}
                    {{
                        DataCard?.solicitationTimeRemaining?.hours
                            ? `${DataCard?.solicitationTimeRemaining?.hours} heures`
                            : ''
                    }}
                </div>
            </figure>
            <div class="card__type">
                <Title
                    type="h4"
                    :label="
                        DataCard.propertyType
                            ? DataCard.propertyType.name || 'name'
                            : 'default Name'
                    "
                    weight="bold"
                />
                <span
                    v-if="
                        DataCard?.priceSolicited &&
                        (DataCard?.solicitationTimeRemaining?.days ||
                            DataCard?.solicitationTimeRemaining?.hours)
                    "
                >
                    {{
                        DataCard?.priceSolicited.toLocaleString('be-BE', {
                            currency: 'EUR',
                            style: 'currency',
                        })
                    }}
                </span>
                <span v-else-if="DataCard.prices">
                    {{ separatorMillier(DataCard.prices) }}
                    €</span
                >
                <span v-else-if="DataCard.startPrice">
                    {{ separatorMillier(DataCard.startPrice) }}
                    €</span
                >
            </div>

            <div class="card__value">
                <div class="card__value--item">
                    <Room />
                    <span>{{
                        DataCard.roomcount ? DataCard.roomcount : 0
                    }}</span>
                </div>
                <div class="card__value--item">
                    <Bath />
                    <span>{{
                        DataCard.bathroomcount ? DataCard.bathroomcount : 0
                    }}</span>
                </div>
                <!-- <div class="card__value--item">
                    <Surface />
                    <span
                        >{{ DataCard.surface ? DataCard.surface : 0 }} m2</span
                    >
                </div> -->
            </div>
            <div v-if="userLoggedIn" class="card__action">
                <span> ({{ DataCard.viewTotal || 0 }}) Vue(s)</span>
                <span> ({{ sauvegarde || 0 }}) Sauvegardé(s)</span>
            </div>
            <div v-else class="card__action">
                <span>Veillez vous connecter pour voir plus d'Information</span>
            </div>
            <Paragraphe class="card__peb"
                >Résulat PEB:
                <span class="card__peb__value">{{
                    peb?.label
                }}</span></Paragraphe
            >
            <div class="card__adress" @click="hanldeAdress">
                <Map />
                <span>{{ DataCard.address || 'default address' }} </span>
            </div>
        </div>
        <div v-if="DataCard.status === 'skipped'">
            <Button
                width="100%"
                type="primary"
                @on-click="handleRepost(DataCard.id)"
            >
                Republier
            </Button>
        </div>
        <!-- <Button
            v-if="isStatus"
            class="detail__btnOffer"
            @click="$emit('moreInfo')"
            :width="'100%'"
        >
            Finir votre information
        </Button> -->
        <div
            v-if="isStatus"
            class="card__deleted"
            @click="$emit('deleted')"
            :width="'100%'"
        >
            <Icon class="cursor-pointer" icon-name="deleteRoudedBG" />
        </div>
        <div
            v-if="!!DataCard?.isSollicited"
            class="flex flex-col justify-center"
        >
            <Button
                v-if="!isMe || !route.query.type"
                class="detail__btnOffer"
                @click="gotoOffer(DataCard.id)"
                :width="'100%'"
            >
                Faire une offre
            </Button>
        </div>
        <!-- <div
            v-if="
                !isMyPropert() &&
                props.needMarkInterest &&
                DataCard?.operationType &&
                DataCard.operationType.toLocaleLowerCase() ===
                    text.operationType.LEASE
            "
            class="flex flex-col justify-center"
        >
            <Button
                class="detail__btnOffer"
                @click="markInterest(DataCard.id)"
                :width="'100%'"
            >
                Me signaler si le bien est à vendre
            </Button>
        </div> -->

        <Button v-if="info" width="100%" type="primary"> Information </Button>
    </div>
    <div v-else>
        <h1>Something wrong , Data undefined</h1>
    </div>
    <ModalConfirmPricing
        :show-modal="isShowModalConfirmPricing"
        :pricing-statement="pricingStatement"
        :is-in-product-card="true"
        @on-back="isShowModalConfirmPricing = false"
    />
</template>

<script setup lang="ts">
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';
    import { ref, PropType, inject, computed, onMounted, reactive } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Room from '@/components/Icon/Room.vue';
    import Bath from '@/components/Icon/Bath.vue';
    import Map from '@/components/Icon/Map.vue';
    import Surface from '@/components/Icon/Surface.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import CardType from '@/components/Display/productCard/CardType';
    import ProductsListService from '@/services/productsListService';
    import Icon from '@/components/Common/Icon/Icon.vue';

    import { message, notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';
    import dataCard from '@/pages/user-account/Menu/Purchases/Seller/data/dataCard';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import { useRouter, useRoute } from 'vue-router';
    import { PEBValue } from '@/pages/addProduct/components/Energy/data';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import NoPicture from '../NoPicture/NoPicture.vue';
    import Financial from '@/services/FinancialService';
    import ModalConfirmPricing from '@/pages/addProperty/components/ModalConfimation/ModalConfirmPricing.vue';

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const operationType = computed(
        () => store.getters['PropertyDetailModule/getOperationTye']
    );
    let isMe = computed(
        () => store.getters['PropertyDetailModule/getPropertyOwner']
    );
    const pricingStatement = ref<string>('');
    const isShowModalConfirmPricing = ref<boolean>(false);

    let showStatus = ref(false);
    const info = inject('isInfo', '');
    const props = defineProps({
        DataCard: {
            type: Object as PropType<CardType>,
            required: true,
        },
        isStatus: {
            default: false,
            required: false,
        },
        isBordered: {
            default: false,
            required: false,
        },
        needMarkInterest: {
            type: Boolean,
            default: false,
        },
    });

    const text = reactive({
        operationType: {
            LEASE: 'lease',
            SALE: 'sale',
        },
    });

    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    const peb = computed(() => {
        const pebNumberValue = props.DataCard.primaryenergy as number;
        return PEBValue.find(
            (item) => pebNumberValue >= item.min && pebNumberValue <= item.max
        );
    });

    onMounted(() => {
        if (showStatus.value) {
            showStatus.value = true;
        } else {
            showStatus.value = false;
        }
        console.log(userLoggedIn);
    });

    let BASE_URL = import.meta.env.VITE_API_BASE_URL;
    BASE_URL = BASE_URL.replace('/api/immo/v2', '');

    let color = ref(
        props.DataCard.status === 'waiting'
            ? 'var(--color-warn)'
            : props.DataCard.status === 'progress'
            ? 'var(--color-primary)'
            : props.DataCard.status === 'valid'
            ? 'var(--color-green)'
            : 'var(--color-red)'
    );

    const statusProduct = ref<string>(
        props.DataCard.status === 'waiting'
            ? 'En attente'
            : props.DataCard.status === 'progress'
            ? 'En cours'
            : props.DataCard.status === 'valid'
            ? 'Validé'
            : 'Refusé'
    );

    const isBordered = inject('isBordered', '');
    const border = ref(
        isBordered || props.isBordered ? '1px solid #ccc' : 'none'
    );

    let sauvegarde = ref(props.DataCard.favoritesTotal || 0);
    const setFavorite = async (property: number) => {
        const { code } = await ProductsListService.setFavorite({
            property: property,
        });
        if (code == 201) {
            sauvegarde.value++;
            message.success('Bien ajoutée au favoris');
        } else if (code == 204) {
            sauvegarde.value--;
            message.success('Supprimée au favoris');
        } else {
            message.error('un erreur est passé');
        }
    };
    function isMyPropert() {
        return userLoggedIn.value.id === props.DataCard.user?.id;
    }
    function markInterest(id: number | string) {
        store.commit('FindPropertyModule/setCriteria', { theProperty: id });
        store.dispatch('FindPropertyModule/createAlerte', callback);
    }
    function gotoOffer(id: any): void {
        router.push({
            name: 'rental-processes',
            params: { id: id },
        });
    }
    function hanldeAdress(e: Event) {
        e.stopPropagation();
        const { longitude, latitude } = props.DataCard;
        const coords = encodeURIComponent(
            `${latitude?.toLocaleString()}@${longitude?.toLocaleString()}`
        );
        router.push(`/localisation/${coords}`);
    }
    function callback(success: boolean) {
        if (success) {
            notification.success({ message: 'Votre alerte a bien été créer' });
        } else {
            notification.error({
                message: "Oups! votre alerte n'a pas été créer. réessayez svp.",
            });
        }
    }

    async function handleRepost(id: number) {

        switch (userLoggedIn.value.roleHierarchy) {
            case 'FREE':
                isShowModalConfirmPricing.value = true;
                pricingStatement.value = 'Free';
                break;
            case 'ACCESS':
                pricingStatement.value = 'Premium';
                let { data } = await Financial.getPropertyPerUser();
                const ownerProductAnnouced: Array<any> = data.filter(
                    (obj: { status: string }) =>
                        obj.status === 'valid' ||
                        obj.status === 'inlease' ||
                        obj.status === 'sold'
                );
                console.log(
                    "le bien de l'utilisateur ===>>>>>>>>>",
                    ownerProductAnnouced
                );

                if (ownerProductAnnouced.length >= 2) {
                    isShowModalConfirmPricing.value = true;
                } else {
                    repostAnnounce(id);
                }
                break;
            case 'ADMINISTRATOR' || 'PREMIUM':
                repostAnnounce(id);
                break;
        }
    }

    async function repostAnnounce(id: number) {
        try {
            const data = await ProductsListService.updateProductDetail(id, {
                status: 'waiting',
            });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        @apply my-2;
        display: flex;
        flex-direction: column;
        position: relative;
        width: auto;
        height: auto;
        padding: 16px;
        gap: 18px;
        background: #ffffff;
        border-radius: 8px;
        width: 100%;
        transition: all 0.7s ease-in-out;
        border: v-bind(border);
        &__peb {
            @apply text-[#797575] font-semibold flex items-center gap-[10px];
            &__value {
                @apply w-[30px] h-[30px] flex items-center justify-center rounded-[50%] text-white;
                background-color: v-bind('peb?.color');
            }
        }
        &__image {
            width: auto;
            height: 160px;
            overflow: hidden;
            img {
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__type {
            display: flex;
            justify-content: space-between;
            span {
                color: var(--color-alert-str-rose);
                background: rgba(255, 130, 130, 0.15);
                border-radius: 15px;
                padding: 4px 12px;
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
            }
        }
        &__value {
            display: flex;
            gap: 18px;
            &--item {
                display: flex;
                cursor: pointer;
                align-items: center;
                gap: 5px;
                :last-child {
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 16.44px;
                }
            }
        }
        &__action {
            display: flex;
            flex-direction: column;
            span {
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 16px;
                color: #797575;
            }
        }
        &__adress {
            @apply transition-all;
            display: flex;
            align-items: center;
            gap: 5px;
            :last-child {
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                color: #a39f9f;
            }
            &:hover {
                // @apply scale-[1.05];
                span {
                    @apply text-[var(--color-alert-str-rose)];
                }
                &:deep() {
                    path {
                        fill: var(--color-alert-str-rose);
                    }
                }
            }
        }

        &__status {
            position: absolute;
            top: 10px;
            right: 10px;
            background: v-bind(color);
            border-radius: 5px;
            padding: 3px 10px;
            color: #ffffff;
            // border: 1px solid var(--color-border-warn);
            font-weight: 700;
        }

        &__information {
            @apply flex flex-col gap-[18px] cursor-pointer;
        }

        &__proposal-time {
            position: absolute;
            bottom: 0px;
            color: #ffffff;
            @apply w-full flex flex-row justify-center
                    bg-gradient-to-t from-[#0000009e] to-[#0000003b];
        }

        &__deleted {
            position: absolute;
            left: 25px;
            top: 25px;
            cursor: pointer;
        }
    }
    // .card:hover {
    //     box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    // }
</style>
