<template>
    <Modal
        :is-show-modal="isShowModal"
        :closable="true"
        @cancel="$emit('closeModal')"
        width="1000"
        height="1000"
        :title="activeLabel"
    >
        <template #content>
            <div class="modalInformation__modal">
                <transition name="fade-step" mode="out-in">
                    <template v-if="backToInfo">
                        <div
                            :class="images.length ? 'md:grid-cols-2' : ''"
                            class="modalInformation__infoContainer"
                        >
                            <div class="modalInformation__info">
                                <Information
                                    @goToGoogleEarth="goToGoogleEarth"
                                    @goToStreetView="goToStreetView"
                                    @info-selected="showInfo"
                                />
                            </div>
                            <div
                                v-if="images.length"
                                class="modalInformation__imgContainer"
                            >
                                <swiper
                                    ref="swipeee"
                                    :pagination="{
                                        clickable: true,
                                    }"
                                    :modules="modules"
                                >
                                    <swiper-slide
                                        v-for="(img, imgIndex) in images"
                                        :key="imgIndex"
                                    >
                                        <figure
                                            class="modalInformation__img-wrap"
                                        >
                                            <img
                                                :src="BASE_URL + img.path"
                                                alt=""
                                                class="modalInformation__img"
                                            />
                                        </figure>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="modalInformation__info-detail">
                            <div
                                class="modalInformation__backToInfo"
                                @click="backToClick"
                            >
                                <Icon icon-name="ArrowBack" />
                                <span> Retour </span>
                            </div>
                            <component :is="activeCompInfo" />
                        </div>
                    </template>
                </transition>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
    import { ref, shallowRef, watch } from 'vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Information from './Information.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Pagination } from 'swiper';
    import { useRouter } from 'vue-router';

    import { useStore } from 'vuex';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false,
        }
    });

    const store = useStore();
    const router = useRouter();
    let BASE_URL = import.meta.env.VITE_API_BASE_URL_UPLOADS;
    let isShowModal = ref<boolean>(props.showModal);
    let images = ref<any>([]);
    let selectedProperty = ref<any>();
    const modules = ref<any>([Autoplay, Pagination]);
    let showStreetView = ref<boolean>(false);
    enum title {
        text = 'Les informations relatives du bien choisi',
    }
    const activeLabel = ref<string>(title.text);
    const activeCompInfo = shallowRef<object>({});
    const backToInfo = ref<boolean>(true);

    
    watch(
        () => activeLabel.value,
        (v) => {
            activeLabel.value = v;
        },
        { immediate: true }
    );

    watch(
        () => props.showModal,
        (bool) => {
            console.log("show modal >>>>", bool);
            
            isShowModal.value = bool;
        },
        { immediate: true }
    );

    const showPopUp = (property: any) => {
        // isShowModal.value = !isShowModal.value;
        // if (isShowModal.value)
        //     if (property.images.length !== 0) {
        //         images.value = property.images.map(({ path }: any) => {
        //             return { path };
        //         });
        //     }
        // selectedProperty.value = property;
        // store.dispatch('UrbanismeModule/setPrasStatusUrban');
        console.log('touched images', property);
    };

    const goToGoogleEarth = () => {
        console.log('psroperty values:', selectedProperty.value);
        window.open(
            `https://earth.google.com/web/search/${selectedProperty.value.lat},${selectedProperty.value.lng}`,
            '_blank'
        );
    };

    const goToStreetView = () => {
        router.push('/information_relative/street_view');
        isShowModal.value = false;
        showStreetView.value = true;

        console.log(
            'lat long:',
            selectedProperty.value.lat,
            selectedProperty.value.lng
        );
    };

    function backToClick() {
        backToInfo.value = true;
        activeLabel.value = title.text;
    }

    function showInfo(label: string, component: object) {
        activeCompInfo.value = component;
        backToInfo.value = false;
        activeLabel.value = label;
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .modalInformation {
        &__modal {
            @apply min-h-[290px];
            &:deep(.CardWrapperTitle) {
                @apply shadow-none;
            }
        }
        &__infoContainer {
            @apply flex flex-col-reverse gap-[14px];
            @screen md {
                @apply grid;
            }
        }
        &__img-wrap {
            @apply h-[256px] overflow-hidden bg-strokeGray;
            // @apply rounded-[8px];
            img {
                border: 1px solid transparent;
            }
        }
        &__imgContainer {
            @apply h-full object-cover;
        }
        &__img {
            @apply w-full object-fill;
        }
        &__info-detail {
            @apply place-content-18px;
        }
        &__backToInfo {
            @apply flex gap-[14px] items-center cursor-pointer rounded-[24px] px-[14px] py-[5px] mx-[-14px] my-[-5px] max-w-max;
            &:hover {
                @apply bg-gray;
            }
        }
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }
</style>
