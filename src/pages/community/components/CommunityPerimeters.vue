<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Map from '@/components/section/map/index.vue';
    import { ref, onMounted, watch } from 'vue';
    import { useStore } from 'vuex';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRouter } from 'vue-router';

    enum Type {
        SERVICES = 'services',
        CONSULTATION = 'consultation',
    }

    const props = defineProps({
        buttonTitle: {
            type: String,
        },
        data: {
            type: Object,
            default: {},
        },
    });

    const emit = defineEmits(['closeModal']);
    const userCoordinate = ref<Array<any>>([
        {
            lat: 0,
            lng: 0,
        },
    ]);
    const store = useStore();
    const router = useRouter();
    const cle = ref<number>(1);
    const loading = ref<boolean>(false);
    const params = ref<any>({
        coordinates: [],
    });

    watch(
        () => userCoordinate.value,
        (value) => {
            userCoordinate.value = value;
            cle.value += 1;
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        getUserCoordinate();
    });

    function getUserCoordinate() {
        const userDetails = store.getters['UserModule/getUserDetails'];
        userCoordinate.value = [
            ...userCoordinate.value,
            {
                lat: userDetails.latitude,
                lng: userDetails.longitude,
            },
        ];
        console.log('latlong user\n', userCoordinate.value);
    }

    function polygonDrawed(item: any) {
        params.value.coordinates = [
            ...params.value.coordinates,
            ...item.latlng,
        ];
        console.log('Drawed position\n', params.value);
    }

    async function handlePost(type: string) {
        loading.value = true;
        switch (type) {
            case Type.CONSULTATION:
                await store
                    .dispatch('CommunityModule/getConsultation', params.value)
                    .then((res) => {
                        router.push('/community/consultation');
                        emit('closeModal');
                    })
                    .finally(() => {
                        loading.value = false;
                    });
                break;

            case Type.SERVICES:
                await store
                    .dispatch('CommunityModule/getDiversServices', params.value)
                    .then((res) => {
                        router.push('/community/divers-services');
                        emit('closeModal');
                    })
                    .finally(() => {
                        loading.value = false;
                    });
                break;
            default:
                await store
                    .dispatch('CommunityModule/getDiversServices', params.value)
                    .then((res) => {
                        router.push('/community/divers-services');
                        emit('closeModal');
                    })
                    .finally(() => {
                        loading.value = false;
                    });
                break;
        }

        // await store.dispatch('CommunityModule/getConsultation', params.value)
        // .then(res => {

        // }).finally(() => {
        // })
        loading.value = false;
    }
</script>

<template>
    <div class="service__container">
        <div class="service__map--container">
            <span class="service__title"
                >Dessiner le périmètre géographique sur la carte</span
            >
            <div class="service__map--item">
                <Map
                    :key="cle"
                    :needMarkerLayer="true"
                    :needDrawControl="true"
                    :markersCoordinates="userCoordinate"
                    @on-polygon-created="polygonDrawed"
                    :control-config="{
                        rectangle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                        circle: false,
                    }"
                />
            </div>
            <div class="modal-button">
                <Button
                    typeButton="secondary"
                    @click="handlePost(props.data.type)"
                >
                    <LoadingButton v-if="loading" size="xs" />
                    {{ props.buttonTitle }}
                </Button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .service {
        &__map--item {
            max-height: 300px;
            @apply h-[300px] w-full mb-[10px];
            @screen md {
                max-height: calc(100vh - 275px);
                @apply h-[400px];
            }
            @screen lg {
                @apply h-[500px];
            }
        }
        &__title {
            font-weight: 600;
            display: block;
        }
    }
    .modal-button {
        display: flex;
        justify-content: flex-end;
    }
</style>
