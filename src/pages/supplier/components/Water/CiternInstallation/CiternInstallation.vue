<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <Modal :is-show-modal="isShowModal" @on-back="isShowModal = false">
                <template #content>
                    <ModalContent
                        :is-load-submit="isLoadSubmit"
                        v-if="isNeighborMatches"
                        :neighbor-details-list="nearlyNeighborDetailsList"
                        @on-submit="submitSignage"
                    />
                </template>
            </Modal>
            <Loader v-if="isLoadPrepertyDetail" />
            <div v-else class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Insallation d'une nouvelle citerne"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />
                <div class="supplier-work__items">
                    <Paragraphe class="description"
                        >Je souhaite installer une nouvelle citerne d’eau de
                        pluie conjointement avec les propriétaires
                        voisins</Paragraphe
                    >
                    <ul>
                        <li>
                            Je souhaite installer la citerne d’eau de pluie sur
                            ma parcelle de terrain mais souhaite alimenter les
                            biens voisins au moyen de ladite citerne
                        </li>
                        <li>
                            Je souhaite installer la citerne d’eau de pluie à
                            cheval sur deux parcelles de terrain, à
                            l’emplacement figuré sur le plan ci-dessous:
                        </li>
                    </ul>
                </div>
                <Alert v-if="!cadastre.length">Pas de cadastre trouvé</Alert>
                <Alert v-else
                    >Vous pouvez delimiter la zone où vous voulez installé votre
                    citerne d'eau en utilisant l'icone "<img
                        class="interact"
                        alt="polygone"
                        src="@/static/images/polygone.png"
                    />". <br />
                    Et ainsi singaler votre/vos voisin(s) concerné(s)</Alert
                >
                <div class="map__container">
                    <Map
                        :needPolygonLayer="true"
                        :polygonCoordinates="nearlyCadastres"
                        :propertyPosition="propertyPosition"
                        id-map="map"
                        class="map"
                        :need-draw-control="true"
                        @on-polygon-created="getDrawPolygon"
                        @on-polygon-deleted="clearDraw"
                    />
                    <transition appear name="fade-btn" mode="out-in">
                        <div
                            v-if="isNeighborMatches"
                            class="map__external-actions"
                        >
                            <Button
                                @click="isShowModal = true"
                                type-button="secondary"
                                >Signalez</Button
                            >
                        </div>
                    </transition>
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Map from '@/components/section/map/index.vue';
    import PropertyDetailService from '@/services/PropertyDetailService';
    import SupplierServices from '@/services/supplierService';
    import { ref, onMounted, computed } from 'vue';
    import * as turf from '@turf/turf';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import ModalContent from './Modal/ModalContent.vue';
    import { notification } from 'ant-design-vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);
    const params = ref<any>();
    const cadastre = ref<any[]>([]);
    const isNeighborMatches = ref<boolean>(false);
    const isShowModal = ref<boolean>(false);
    const isLoadPrepertyDetail = ref<boolean>(true);
    const isLoadSubmit = ref<boolean>(false);
    const nearlyCadastres = ref<any[]>([]);
    const nearlyCadastresWithId = ref<any[]>([]);
    const propertyPosition = ref<any>();
    const propertyOwnerId = ref<number>(-1);
    const nearlyNeighborDetails = ref<any[]>([]);
    const nearlyNeighborDetailsList = ref<any[]>([]);
    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },

        {
            label: 'Eau',
        },
    ];

    onMounted(() => {
        getPropertyDetail();
    });

    async function getNearlyCadasters() {
        try {
            const { data } = await SupplierServices.getNearlyCadasters({
                longitude: propertyPosition.value.lng,
                latitude: propertyPosition.value.lat,
                distance: 0.2, //200m
            });
            nearlyCadastres.value = data
                .filter((item: any) => !!item.polyCadastre)
                .map((item: any) => item.polyCadastre);
            nearlyCadastresWithId.value = data
                .filter((item: any) => !!item.polyCadastre)
                .map((item: any) => ({
                    id: item.id,
                    polygonCoords: [
                        item.polyCadastre.map((coords: any) => [
                            coords.lng,
                            coords.lat,
                        ]),
                    ],
                }));
            nearlyNeighborDetails.value = data.map((item: any) => ({
                name: `${item.user.firstname} ${item.user.name}`,
                email: item.user.email,
                phone: item.user.phone,
                id: item.id,
            }));
            nearlyCadastres.value = [...nearlyCadastres.value, cadastre.value];
        } catch (error) {
            console.log(error, 'ERROR');
        } finally {
            isLoadPrepertyDetail.value = false;
        }
    }

    async function getPropertyDetail() {
        try {
            const { data } = await PropertyDetailService.getProductDetail(route.params.id as any);
            const { polyCadastre, latitude, longitude, id } = data;
            propertyOwnerId.value = id;
            params.value = {
                ...params.value,
                constructor: propertyOwnerId,
            };
            if (polyCadastre.length) {
                cadastre.value = polyCadastre;
            }
            propertyPosition.value = {
                lat: latitude,
                lng: longitude,
            };
            getNearlyCadasters();
        } catch (e) {
            console.log(e);
        }
    }

    function getDrawPolygon(layer: any) {
        isNeighborMatches.value = false;
        const propertyIdsList: any[] = [];
        const { latlng } = layer;
        let polygon = latlng.map((coords: any) => [coords.lng, coords.lat]);
        polygon = [...polygon, polygon[0]];
        const drawnLayer = turf.polygon([polygon]);
        nearlyCadastresWithId.value.forEach((item) => {
            const turfPolygon = turf.polygon(item.polygonCoords);
            const res: boolean = (turf as any).intersect(
                drawnLayer,
                turfPolygon
            );
            if (res && item.id !== propertyOwnerId.value) {
                res && propertyIdsList.push(item.id);
            }
        });
        // if match do show signal btn
        isNeighborMatches.value = !!propertyIdsList.length;
        if (isNeighborMatches.value) {
            nearlyNeighborDetailsList.value =
                nearlyNeighborDetails.value.filter((item: any) =>
                    propertyIdsList.includes(item.id)
                );
        }
        params.value = {
            ...params.value,
            polygon: JSON.stringify(latlng),
            concernedProperties: propertyIdsList,
        };
        console.log(nearlyNeighborDetailsList.value);
    }

    function clearDraw() {
        isNeighborMatches.value = false;
        nearlyNeighborDetailsList.value = [];
    }

    async function submitSignage() {
        isLoadSubmit.value = true;
        try {
            const data = await SupplierServices.postNeighborSignage(
                params.value
            );
            console.log(data);
            notification.success({
                message:
                    'Les voisins concérnés ont été notifié de votre demande',
            });
        } catch (error) {
            notification.error({
                message: "Il semble qu'une erreur soit survenue",
            });
        } finally {
            isLoadSubmit.value = false;
            isShowModal.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .fade-btn-enter-active,
    .fade-btn-leave-active {
        @apply transition-all;
    }
    .fade-btn-enter-from,
    .fade-btn-leave-to {
        @apply scale-0;
    }
    .interact {
        @apply w-[25px] h-full inline-block rounded-[4px];
    }
    .map {
        height: 50vh;
        width: 100%;
        &__container {
            @apply relative;
        }
        &__external-actions {
            @apply z-[1000] absolute right-[10px] top-[10px];
        }
    }
    .supplier-work {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
        }
        &__head-title {
            @apply text-[16px] text-grayIcon;
        }
        &__items {
            @apply flex flex-col gap-[18px];
            .description {
                color: var(--color-gray-icon);
                font-weight: 500;
                text-decoration: underline;
            }
        }
    }
    .quality {
        &__tabs-items {
            @apply flex flex-col gap-[18px];
            .description {
                color: var(--color-gray-icon);
                font-weight: 500;
                text-decoration: underline;
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
    ul {
        list-style-type: disc;
        list-style-position: inside;
    }
</style>
