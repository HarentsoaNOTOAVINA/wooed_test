<template>
    <div class="worksite__section">
        <div class="worksite__container">
            <div class="worksite__item">
                <div class="worksite__field--wrap">
                    <Router-link
                        to="/mobilite"
                        class="worksite__backButton"
                        title="Retour"
                    >
                        <Icon icon-name="ArrowBack" />
                    </Router-link>
                    <Input
                        class="worksite__field"
                        placeholder="Rayon de (en Km)"
                        name-input="rayon"
                        input-type="number"
                        @input="handleChangeInput"
                    />
                    <Button
                        @click="modalHandler"
                        class="worksite__button"
                        title="Ajouter signalement"
                    >
                        <Icon icon-name="Signal" />
                        <span> Ajouter signalement </span>
                    </Button>
                </div>

                <!-- Create template  -->
                <!-- end creation template  -->
                <Map
                    id-map="worksiteMap"
                    :property-position="centerCoord"
                    :multiple-marker-data="dataWorksite"
                    :need-multiple-marker="true"
                    :key="mapKey"
                    @touched="handleToucheMap"
                />
            </div>
            <Modal
                class="offer__rejectModal"
                title="Ajouter signalement"
                :isShowModal="modalShow"
                @onBack="modalHandler"
            >
                <template #content>
                    <ModalWorksiteSignal
                        @close-modal="modalHandler"
                        @on-add="handleAfterAdd"
                    />
                </template>
            </Modal>

            <Modal
                :is-show-modal="isShowModalInformation"
                @on-back="handleShowModalInfo"
                title="Information"
                width="500"
            >
                <template #content>
                    <div class="worksite__information-container">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="worksite__label">Content</td>
                                    <td class="worksite__value">
                                        {{ informationData.remark }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="worksite__label">Début</td>
                                    <td class="worksite__value">
                                        {{
                                            formatDateFr(
                                                informationData.startDate
                                            )
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="worksite__label">Fin</td>
                                    <td class="worksite__value">
                                        {{
                                            formatDateFr(
                                                informationData.endDate
                                            )
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <img
                            :src="
                                base_uri +
                                informationData?.files[0]?.path +
                                '/' +
                                informationData?.files[0]?.name
                            "
                            alt="images"
                        />
                        <div
                            class="worksite__footer"
                            v-if="informationData.author.id === userId"
                        >
                            <Button
                                type-button="border"
                                @click="
                                    handleSignalWorksite(informationData.id)
                                "
                                width="200"
                            >
                                <LoadingButton
                                    size="xs"
                                    theme="dark"
                                    v-if="loadingSignal"
                                />
                                <span v-else> Signaler l'arrêt.</span>
                            </Button>
                        </div>
                    </div>
                </template>
            </Modal>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Map from '@/components/section/map/index.vue';
    import ModalWorksiteSignal from './components/ModalWorksiteSignal.vue';
    import { ref, onMounted, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { formatDateFr } from '@/utils/date/format';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const store = useStore();
    const dataWorksite = ref<Array<any>>([]);
    const centerCoord = ref<any>();
    let modalShow = ref<boolean>(false);
    const defaultDistance = ref<number>(5);
    const mapKey = ref<number>(1);
    const isShowModalInformation = ref<boolean>(false);
    const informationData = ref<any>(null);
    const base_uri = ref<string>(import.meta.env.VITE_API_ROOT_URL);
    const loadingSignal = ref<boolean>(false);
    const userId = computed(
        () => store.getters['UserModule/getUserDetails'].id
    );

    watch(
        () => dataWorksite.value,
        (value) => {
            mapKey.value += 1;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => defaultDistance.value,
        (value) => {
            getDataWorksite(value);
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        getDataWorksite(defaultDistance.value);
        getPropertyPosition();
    });

    async function getDataWorksite(distance: number) {
        const user = computed(() => store.getters['UserModule/getUserDetails']);
        dataWorksite.value = await store.dispatch(
            'MobilityModule/getListWorkSite',
            {
                distance: distance,
                latitude: user.value.latitude,
                longitude: user.value.longitude,
            }
        );
        console.log('data worksite', user.value.latitude);
    }

    function getPropertyPosition() {
        const propertyDetail = store.getters['UserModule/getUserDetails'];
        centerCoord.value = {
            lat: propertyDetail.latitude,
            lng: propertyDetail.longitude,
        };
    }

    const modalHandler = () => {
        modalShow.value = !modalShow.value;
    };

    function handleChangeInput(item: any) {
        console.log('item\n', item);
        for (let i in item) {
            defaultDistance.value = item[i];
        }
    }

    function handleShowModalInfo() {
        isShowModalInformation.value = !isShowModalInformation.value;
    }

    function handleToucheMap(item: any) {
        console.log('item\n', item);
        informationData.value = item;
        handleShowModalInfo();
    }

    async function handleSignalWorksite(idItem: number) {
        console.log('item\n', idItem);
        loadingSignal.value = true;
        await store.dispatch('MobilityModule/signalWorksite', {
            id: idItem,
            data: {
                isStopped: true,
            },
        });
        getDataWorksite(defaultDistance.value);
        loadingSignal.value = false;
        handleShowModalInfo();
    }

    function handleAfterAdd() {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');
        getDataWorksite(defaultDistance.value);
    }
</script>
<style lang="scss" scoped>
    .worksite {
        &__section {
            height: calc(100vh - 59px);
            @screen lg {
                height: calc(100vh - 62px);
            }
        }
        &__container {
            @apply relative h-full w-full;
        }
        &__field--wrap {
            @apply w-full flex items-center justify-center absolute top-[10px] right-[50%] translate-x-[50%] z-[999] pl-[58px] pr-[10px] gap-x-[10px];
            @screen sm {
                @apply gap-x-[14px];
            }
        }
        &__field {
            max-width: 375px;
            width: calc(100% - 106px);
            @apply mb-0;
            @screen sm {
                width: calc(100% - 257px);
            }
            &:deep() {
                .custom-input__label-icon {
                    @apply hidden;
                }
            }
        }
        &__item {
            @apply h-full w-full;
        }
        &__backButton {
            background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
            transition: all 0.25s ease;
            @apply w-[38px] h-[38px] rounded-full bg-primary bg-blend-lighten flex items-center justify-center;
            &:deep() {
                svg {
                    path {
                        @apply fill-white;
                    }
                }
            }
            &:hover {
                transition: all 0.25s ease;
                @apply bg-blend-darken transition;
            }
        }

        &__label {
            color: var(--color-stroke-gray);
            @apply font-semibold;
        }
        &__value {
            @apply font-semibold;
        }
        &__button {
            @apply min-h-[38px];
            &:deep() {
                button {
                    @apply min-h-[38px] flex items-center gap-[10px] px-[15px];
                    @screen sm {
                        @apply px-[20px];
                    }
                    span {
                        @apply hidden;
                        @screen sm {
                            @apply block;
                        }
                    }
                    svg {
                        @apply w-[18px] h-[18px];
                        path:not([fill]) {
                            @apply fill-white stroke-white;
                        }
                        path:last-child {
                            @apply fill-white;
                        }
                    }
                }
            }
        }

        &__information-container {
            @apply flex flex-col gap-[20px];
        }

        &__footer {
            @apply flex justify-center items-center w-[100%];
        }
    }
</style>
