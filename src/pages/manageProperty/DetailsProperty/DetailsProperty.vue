<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { Empty as AEmpty, Tag as ATag } from 'ant-design-vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Room from '@/components/Icon/Room.vue';
    import Bath from '@/components/Icon/Bath.vue';
    import Map from '@/components/Icon/Map.vue';
    import Surface from '@/components/Icon/Surface.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { dataMenu } from '@/pages/manageProperty/DetailsProperty/data';
    import MenuItem from '@/pages/manageProperty/components/Menu/MenuItem.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Pagination } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import Timeline from '@/components/Display/TimeLine/Timeline.vue';
    import moment from 'moment';
    import NoPicture from '@/components/Display/NoPicture/NoPicture.vue';

    const store = useStore();
    const details = ref<any>(null);
    const routes = useRoute();
    const router = useRouter();
    const baseUrl = import.meta.env.VITE_API_ROOT_URL;
    const modules = ref<any>([Autoplay, Pagination]);
    const basedIn = ref<string>('Adresse');
    const payment = ref<string>('1000');

    enum nameMenu {
        FINANCE = 'finance',
        CALCUL = 'calcul',
        TARAVAUX = 'work',
        FOURNISSEUR = 'fournisseur',
        URBANISME = 'urbanisme',
        ENVIRONNEMENT = 'environment',
        EDUCATION = 'education',
        COPROPRIETE = 'coproperty',
        LOCALISE_PROPERTY = 'localise',
        PRIME = 'prime',
        SECURITE = 'security',
        ASSURANCE = 'assurance',
        MOVING = 'moving',
        LOCATION_HOUSE = 'rentalManagment',
    }

    const timelineData = [
        {
            title: `Signature du contrat de bail du bien sis à ${basedIn.value}`,
            name: 'contractSignature',
            date: '2023-05-05',
        },
        {
            title: `Constitution de la garantie pour la location du bien sis à ${basedIn.value}`,
            name: 'constitutionGuarantee',
            date: '2023-05-20',
        },
        {
            title: `Signature de l’état des lieux d’entrée du bien sis à ${basedIn.value}`,
            name: 'SignatureEntryInventory',
            date: '2023-05-25',
        },
        {
            title: `Fin du bail du bien sis à ${basedIn.value}`,
            name: 'endLease',
            date: '2023-10-20',
        },
        {
            title: "Signature de l'état des lieux de sortie",
            name: 'signatureExitInventory',
            date: '2027-10-30',
        },
        {
            title: `Libération de la garantie du bien sis à ${basedIn.value}`,
            name: 'warrantyRelease',
            date: '2027-11-15',
        },
        {
            title: `Paiement du précompte immobilier - ${payment.value} EUR`,
            name: 'paymentDeposit',
            date: '2027-11-30',
        },
        {
            title: `Paiement du loyer du bien sis à ${basedIn.value}`,
            name: 'paymentRent',
            date: '2027-11-30',
        },
        {
            title: 'Date d’aujourd’hui',
            name: 'todaysDate',
            date: new Date().toISOString().substring(0, 10),
        },
        {
            title: 'Date ultime pour le prochain contrôle de la citerne',
            name: 'ultimeDate',
            date: '2023-10-06',
        },
    ];

    onMounted(() => {
        getDetailsProperty();
    });

    async function getDetailsProperty() {
        const dataStore =
            store.getters['ManagePropertyModule/getDetailsProperty'];
        if (dataStore) {
            details.value = dataStore;
        } else {
            details.value = await store.dispatch(
                'ManagePropertyModule/getDetailsProperty',
                routes.params.id
            );
        }
    }

    function handleClick(data: any) {
        if (
            data.name === nameMenu.SECURITE ||
            data.name === nameMenu.FINANCE ||
            data.name === nameMenu.URBANISME ||
            data.name === nameMenu.TARAVAUX ||
            data.name === nameMenu.ASSURANCE ||
            data.name === nameMenu.PRIME ||
            data.name === nameMenu.FOURNISSEUR ||
            data.name === nameMenu.COPROPRIETE ||
            data.name === nameMenu.MOVING ||
            data.name === nameMenu.LOCATION_HOUSE
        ) {
            router.push(`${data.path}${routes.params.id}`);
        }
    }

    function handleBack() {
        router.push('/manage-property');
    }
</script>

<template>
    <div class="details details__container">
        <Loader v-if="!details" />
        <div class="details__content" v-else>
            <CardWrapper>
                <div class="details__content-backTo" @click="handleBack">
                    <BackButton />
                    <span> Retour </span>
                </div>
            </CardWrapper>
            <CardWrapper class="details__property">
                <div class="details__timeline">
                    <Title
                        type="h2"
                        label="Wooed-line"
                        class="details__timeline-title"
                    />
                    <hr class="__hr" />
                    <Timeline :events-data="timelineData" />
                </div>
                <div v-if="details?.images.length" class="details__swiper">
                    <swiper
                        :autoplay="{
                            delay: 2500,
                            disableOnInteraction: false,
                        }"
                        :pagination="{
                            clickable: true,
                        }"
                        :modules="modules"
                    >
                        <swiper-slide
                            v-for="(item, index) in details?.images"
                            :key="index"
                        >
                            <figure class="details__figure">
                                <img
                                    :src="baseUrl + item.path"
                                    alt="images"
                                    class="details__figure-image"
                                />
                            </figure>
                        </swiper-slide>
                    </swiper>
                </div>
                <div v-else class="details__figure">
                    <NoPicture />
                </div>

                <div class="details__description">
                    <div class="details__adress-container">
                        <div class="details__adress">
                            <Map />
                            <P>{{ details.address }} {{ details?.region }}</P>
                        </div>
                        <a-tag color="#87d068"> {{ details.status }} </a-tag>
                    </div>
                    <div class="details__title">
                        <P class="details__title-item">{{
                            details.propertyType.name
                        }}</P>
                    </div>

                    <div class="details__infos">
                        <div class="details__infos-item">
                            <Room />
                            <P class="details__infos-item-title">{{
                                details.roomcount
                            }}</P>
                        </div>
                        <div class="details__infos-item">
                            <Bath />
                            <P class="details__infos-item-title">{{
                                details.bathroomcount
                            }}</P>
                        </div>
                        <div class="details__infos-item">
                            <Surface />
                            <P class="details__infos-item-title"
                                >{{ details.surface }} m²</P
                            >
                        </div>
                    </div>
                </div>
            </CardWrapper>
            <!-- <div class="details__interested">
                <P class="details__title">Les interessés</P>
                <div class="details__interested-content">

                    <div class="details__interested-empty">
                        <a-empty 
                            description="Aucun interessés pour le moment"
                        />
                        <Button
                            type-button="gray"
                        >
                            Plus
                        </Button>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="details__menu">
            <MenuItem
                v-for="(item, index) in dataMenu"
                :key="index"
                :data="item"
                @click="handleClick"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .details {
        &__container {
            @apply container my-[20px] flex flex-col gap-[20px];
        }

        &__content {
            @apply flex gap-[20px] flex-wrap;
            &-backTo {
                @apply flex items-center cursor-pointer rounded-[24px] px-[14px] py-[5px] mx-[-14px] my-[-5px] max-w-max;
                &:hover {
                    @apply bg-gray;
                }
            }
        }

        &__property {
            @apply flex-1 flex flex-col gap-[20px];
        }

        &__timeline {
            @apply place-content-8px;
            &-title {
                @apply font-[600] text-[18px] text-primary;
            }
        }

        &__title {
            @apply font-semibold;
        }

        &__title-item {
            @apply font-bold text-lg;
        }
        &__interested {
            @apply flex-1 bg-[white] rounded-[8px] p-[10px] h-[auto];
        }

        &__adress-container {
            @apply flex gap-[20px] flex-wrap;
        }
        &__figure {
            @apply rounded-[8px] border-slate-200 h-[200px] md:h-[500px] w-[100%] bg-gray;
            img {
                @apply object-cover;
            }
        }

        &__figure-image {
            @apply w-[100%] h-[100%] rounded-[8px];
        }

        &__interested-content {
            @apply w-[100%] h-[100%] flex justify-center items-center;
        }

        &__interested-empty {
            @apply flex flex-col justify-center items-center gap-[20px] w-[100%] h-[100%] mb-[20px];
        }

        &:deep() {
            .button__gray {
                @apply text-[12px] font-light;
            }

            .ant-tag {
                @apply capitalize min-w-[50px] rounded-[8px] text-center flex justify-center items-center;
            }
        }

        &__adress {
            @apply flex items-center gap-[5px];
        }

        &__description {
            @apply flex flex-col gap-[20px];
        }

        &__status {
            @apply bg-green;
        }

        &__infos {
            @apply flex gap-[20px];
        }

        &__infos-item {
            @apply flex gap-[10px];
        }

        &__infos-item-title {
            color: var(--color-primary);
            @apply font-semibold;
        }

        &__menu {
            @apply grid gap-[14px] grid-cols-1 mb-[20px];
            @screen sm {
                @apply grid-cols-2 gap-[18px];
            }
            @screen lg {
                @apply grid-cols-3 gap-[20px];
            }
        }

        &__swiper {
            @screen lg {
                width: 100%;
            }
            &:deep() {
                .swiper-pagination {
                    position: initial;
                    .swiper-pagination-bullet {
                        background-color: var(--color-gray-icon);
                        opacity: 1;
                        width: 8px;
                        border-radius: 8px;
                        transition: all 0.5s ease;
                    }
                    .swiper-pagination-bullet-active {
                        width: 24px;
                        transition: width 0.5s ease;
                        background-color: var(--color-primary);
                    }
                }
            }
        }
    }
</style>
