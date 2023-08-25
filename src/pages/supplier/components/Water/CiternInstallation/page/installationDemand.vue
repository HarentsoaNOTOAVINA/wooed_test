<template>
    <Loader v-if="isLoadCall" />
    <div v-else class="tank-installation md:container">
        <div class="tank-installation__description__header">
            <span
                ><ArrowBack
                    @click="router.go(-1)"
                    class="hover:cursor-pointer"
                />
                <strong>Notifications</strong></span
            >
            <Bell />
        </div>
        <div class="tank-installation__description__body">
            <div class="tank-installation__description__body__message">
                <strong
                    class="tank-installation__description__body__message__title"
                    >Message</strong
                >
                <Paragraphe
                    class="tank-installation__description__body__message__content"
                    ><span class="send-icon"><Send /></span> Je souhaiterai
                    mettre une citerne d'eau de pluie à l'endroit marqué
                    ci-dessous. Auriez-vous l'aimabilité de bien vouloir me donné
                    votre accord. Sauriez-vous interessé de participer au coût
                    de sa construction. Merci.</Paragraphe
                >
                <ul
                    class="tank-installation__description__body__message__about"
                >
                    <li><User /> <span>{{ partenerDetails.firstname }} {{ partenerDetails.name }}</span></li>
                    <li><EmailOutline /> <span>{{partenerDetails.email}}</span></li>
                    <li><InfoPhone /> <span>{{ partenerDetails.telephone || 'N/A' }}</span></li>
                </ul>
            </div>
            <div class="map-container">
                <Map
                    :propertyPosition="propertyPosition"
                    id-map="map"
                    class="map"
                    :need-marker-layer="true"
                    :markers-coordinates="partenerPosition"
                    :needPolygonLayer="true"
                    :polygonCoordinates="installationZone"
                />
                <div class="map-container__legend">
                    <Button
                        @click="isDisplayLegend = !isDisplayLegend"
                        type-button="border"
                        >Legende</Button
                    >
                    <transition appear name="fade-card" mode="out-in">
                        <ul v-if="isDisplayLegend" class="legend">
                            <Close
                                @click="isDisplayLegend = !isDisplayLegend"
                                class="legend-close"
                            />
                            <li>
                                <img
                                    src="@/static/images/map/property-marker.png"
                                    alt="red-marker"
                                />
                                <strong>Votre propriété</strong>
                            </li>
                            <li>
                                <img
                                    src="@/static/images/map/partener.png"
                                    alt="red-marker"
                                />
                                <strong>{{ partenerDetails.firstname }} {{ partenerDetails.name }}</strong>
                            </li>
                            <li>
                                <span class="legend-carret"></span>
                                <strong
                                    >Zone d'installation de la citerne</strong
                                >
                            </li>
                            <li>
                                <span class="legend-carret-blue"></span>
                                <strong
                                    >Parcelles cadastrales</strong
                                >
                            </li>
                        </ul>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import EmailOutline from '@/components/Icon/EmailOutline.vue';
    import InfoPhone from '@/components/Icon/InfoPhone.vue';
    import User from '@/components/Icon/User.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Bell from '@/components/Icon/Bell.vue';
    import Map from '@/components/section/map/index.vue';
    import Send from '@/components/Icon/Send.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onBeforeMount, computed } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Close from '@/components/Icon/Close.vue';
    import SupplierServices from '@/services/supplierService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import PropertyDetailService from '@/services/PropertyDetailService';

    const router = useRouter();
    const route = useRoute();

    const isLoadCall = ref<boolean>(false);
    const isDisplayLegend = ref<boolean>(false);

    const uid = computed(() => route.params.uid);
    const thePropertyId = computed(() => +route.params.thePropertyId);
    const propertyPosition = ref<any>({
        zoom: 20,
    });
    const partenerPosition = ref<any>({
        customIcon: `${window.location.origin}/src/static/images/map/partener.png`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
    const partenerDetails = ref<any>();
    const installationZone = ref<any>([]);

    onBeforeMount(() => {
        getTankInstallationRequest();
    });

    async function getTankInstallationRequest() {
        try {
            isLoadCall.value = true;
            const { data } = await SupplierServices.getNeighborSignage({
                uid: uid.value,
            });
            const firstReq = data[0];
            const { polygon, constructor } = firstReq;
            installationZone.value = [JSON.parse(polygon)];
            getPropertyDetails(constructor.id, 'constructor')
                .then(() => getPropertyDetails(thePropertyId.value, 'concerned'))
                .then(() => {
                    isLoadCall.value = false;
                });
        } catch (error) {
            console.log(error);
        }
    }

    function getPropertyDetails(id: number, type: 'constructor' | 'concerned') {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                const { data } = await PropertyDetailService.getProductDetail(
                    id
                );
                const { latitude, longitude, user, polyCadastre } = data;
                const { email, name, firstname, telephone } = user;
                switch (type) {
                    case 'constructor':
                        partenerDetails.value = {
                            email,
                            name,
                            firstname,
                            telephone,
                        };
                        partenerPosition.value = [
                            {
                                ...partenerPosition.value,
                                lat: latitude,
                                lng: longitude,
                            },
                        ];
                        break;
                    case 'concerned':
                        propertyPosition.value = {
                            ...propertyPosition.value,
                            lat: latitude,
                            lng: longitude,
                        };
                        break;
                }
                installationZone.value.unshift(polyCadastre)
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

</script>
<style lang="scss" scoped>
    .tank-installation {
        @apply p-[20px];
        .map {
            @apply w-full h-[60vh];
            &-container {
                @apply relative;
                .fade-card-enter-active,
                .fade-card-leave-active {
                    @apply transition-all;
                }
                .fade-card-enter-from,
                .fade-card-leave-to {
                    @apply translate-y-[50px] opacity-0;
                }
                &__legend {
                    @apply absolute top-[10px] right-[10px] z-[1000] flex flex-col items-end;
                }
                .legend {
                    @apply relative flex gap-[10px] flex-col mt-[10px] bg-white p-[10px] rounded-[10px] border border-[var(--color-primary)];
                    &-carret {
                        @apply p-[10px] bg-[#0000ff3b] border-[4px] border-[green];
                        &-blue {
                            @apply p-[10px] bg-[#0000ff3b] border-[4px] border-[blue];
                        }
                    }
                    &-close {
                        @apply absolute top-[10px] right-[10px] hover:cursor-pointer;
                    }
                    img {
                        @apply w-[30px] h-auto;
                    }
                    li {
                        @apply flex items-center gap-[10px];
                        *:first-child {
                            @apply w-[30px];
                        }
                        &:not(:last-child) {
                            @apply border-b border-b-[var(--color-primary)] pb-[10px];
                        }
                    }
                }
            }
        }
        &__description {
            &__header {
                @apply flex justify-between items-center rounded-[8px] p-[10px] mb-[20px] bg-white;
                span {
                    @apply flex items-center gap-[10px];
                }
                &:deep() {
                    svg > path {
                        @apply fill-[var(--color-primary)];
                    }
                }
            }
            &__body {
                @apply p-[20px] rounded-[8px] bg-white;
                &__message {
                    @apply p-[10px] border border-[var(--color-secondary)] rounded-[8px] mb-[20px] relative;
                    &__title {
                        @apply absolute top-[-12px] left-[30px] px-[5px] uppercase text-secondary bg-white;
                    }
                    &__content {
                        @apply text-grayBlack flex gap-[10px] items-center mb-[10px];
                    }
                    &__about {
                        @apply flex flex-col items-end;
                        .send-icon {
                            flex: 0 0 100px;
                        }
                        li {
                            @apply flex items-center mb-[5px] gap-[8px] text-primary;
                            span {
                                @apply text-left;
                            }
                            &:deep() {
                                svg > path {
                                    @apply fill-[var(--color-primary)];
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
