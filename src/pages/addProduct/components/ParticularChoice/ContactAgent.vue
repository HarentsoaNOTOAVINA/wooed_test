<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { computed, onMounted, ref } from 'vue';
    import Address from '../Address/Address.vue';
    import Map from './Map.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import BackButtonVue from '@/components/Common/BackButton/BackButton.vue';
    import AddProductService from '@/services/addProductService';
    import { Store, useStore } from 'vuex';
    import { notification } from 'ant-design-vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import StreetView from './StreetView.vue';
    import Photo from '@/components/Icon/Photo.vue';

    const store: Store<any> = useStore();

    const isDisplayStreetView = ref<boolean>(false);
    let loadingButton = ref<boolean>(false);
    const agentListOptions = ref<Array<any>>([]);
    const params = ref<any>({
        lat: 50.824446059264694,
        lng: 4.38640342821515,
        dis: 50,
    });
    const imgUrlDisplay = ref<string>('');
    const parameters = ref<any>({
        agencyIds: [],
        thePropertyType: '',
        address: '',
        file: null,
    });

    const options = computed(
        () => store.getters['AddProductModule/getPropertyType']
    );
    const emit = defineEmits<{
        (e: 'back'): void;
    }>();

    onMounted(() => {
        getAgentList();
    });

    function handleSelect(value: any) {
        for (let i in value) {
            if (i === 'product') {
                let product = options.value.find(
                    (el: { id: string }) => el.id === value.product
                );
                parameters.value.thePropertyType = product.name;
            } else if (i === 'agents') {
                parameters.value.agencyIds = [...value.agents];
            }
        }
    }

    function goBack() {
        emit('back');
    }

    const getLatLng = (value: any) => {
        params.value.lat = value.lat;
        params.value.lng = value.lng;
        parameters.value.address = value.address;

        getAgentList();
    };

    function getDefaultAdress(value: any, coord: any) {
        params.value.lat = coord.lat;
        params.value.lng = coord.lng;
        parameters.value.address = value.formatted_address;
    }

    async function getAgentList() {
        try {
            let { data } = await AddProductService.getAgencyList(params.value);
            for (let i = 0; i < data.length; i++) {
                agentListOptions.value.push({
                    label: data[i].name,
                    value: data[i].id,
                });
            }
        } catch (error) {
        } finally {
        }
    }

    async function handleContactAgent() {
        loadingButton.value = true;
        try {
            const formdata = new FormData();
            Object.keys(parameters.value).forEach((k) => {
                if (Array.isArray(parameters.value[k])) {
                    parameters.value[k].forEach((item: any, i: number) => {
                        formdata.append(`${k}[${i}]`, item);
                    });
                } else {
                    formdata.append(k, parameters.value[k]);
                }
            });
            let {status} = await AddProductService.sendEmailToAgent(formdata);
            if (status === 200) {
                notification['success']({
                    message: 'Démande envoyé aux agences',
                });
            } else {
                notification['error']({
                    message: 'Veuilliez réessayer plutard',
                });
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue, veuillez réessayer',
            });
        } finally {
            loadingButton.value = false;
        }
    }

    function savePicture(imgUrl: string) {
        isDisplayStreetView.value = false;
        // create new blob elt from imgUrl
        fetch(imgUrl)
            .then((res) => res.blob())
            .then(
                (blob) =>
                    new File([blob], `screen_${new Date().getTime()}`, {
                        type: 'image/png',
                    })
            )
            .then((file) => {
                console.log(file);
                parameters.value.file = file;
                imgUrlDisplay.value = imgUrl;
            });
    }
</script>
<template>
    <transition mode="out-in" appear name="fade-component">
        <div class="w-full">
            <Modal
                :is-show-modal="isDisplayStreetView"
                @on-back="isDisplayStreetView = false"
            >
                <template #content>
                    <StreetView
                        @on-save-picture="savePicture"
                        :coords="params"
                        v-if="isDisplayStreetView"
                    />
                </template>
            </Modal>
            <div class="add__content">
                <div class="__back w-full" @click="goBack">
                    <BackButtonVue />
                    <Title
                        type="h6"
                        weight="600"
                        label="Je souhaite faire appel à un professionnel pour la
                            vente de mon bien"
                        class="title"
                    />
                </div>
                <hr class="__hr" />

                <!-- AJOUTER ADRESSE -->
                <div class="w-full">
                    <Address
                        @get-lat-long="getLatLng"
                        @get-default-adress="getDefaultAdress"
                    />
                    <!-- <Map :is-display-public-cadaster="true" :property-coord="{ lat: 50.84535101789271, lng: 4.352409839630127 }" /> -->
                </div>
                <Button @click="isDisplayStreetView = true"
                    ><Photo /> Prendre une photo de street view</Button
                >
                <hr class="__hr" />
                <!-- APERCU IMAGE -->

                <div
                    class="w-full flex justify-center flex-col"
                    v-if="imgUrlDisplay"
                >
                    <Title
                        type="h3"
                        weight="600"
                        label="APERCU DE L'IMAGE"
                    /><img :src="imgUrlDisplay" alt="apercu-image" />
                </div>
                <hr class="__hr" />

                <!-- LISTES DES AGENTS -->
                <div class="w-full">
                    <Select
                        label="Liste des agents immobiliers dans un rayon de 3 kms du bien"
                        name="agents"
                        mode="multiple"
                        :options="agentListOptions"
                        @change-select="handleSelect"
                    />
                    <Select
                        v-if="options.length"
                        label="Type de bien"
                        name="product"
                        :options="options"
                        :placeholder="options[0].label"
                        @change-select="handleSelect"
                    />
                </div>
                <Button @click="handleContactAgent"
                    ><LoadingButton
                        size="sm"
                        theme="dark"
                        v-if="loadingButton"
                    />Solliciter des offres d’agents immobilier
                </Button>
            </div>
        </div>
    </transition>
</template>
<style scoped lang="scss">
    .fade-component-enter-active,
    .fade-component-leave-active {
        transition: all 0.4s ease;
        visibility: hidden;
        transition-delay: 0.1s;
    }

    .fade-component-enter-from,
    .fade-component-leave-to {
        opacity: 0;
        visibility: visible;
    }
    .container {
        max-width: 945px;
        @apply bg-[white] rounded-[8px] p-[14px] flex  justify-between my-[12px];
    }
    .__hr {
        @apply text-gray w-full;
    }
    .__red {
        color: var(--color-warn);
    }
    .__green {
        color: var(--color-green);
    }
    .add {
        &__content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: end;
            @apply bg-[white] rounded-[8px] p-[10px] w-full overflow-y-auto items-end;
        }
        &__btn-foot {
            @apply flex gap-[15px];
        }
        &__footer {
            border-top: 1px solid var(--color-gray);
            @apply pt-[15px] mt-[15px] flex justify-between items-center;
        }
        &__title {
            font-weight: 600;
        }
        &__divider {
            @apply my-[18px];
        }
        &__particular-mode {
            line-height: 2rem;
        }
        &__header {
            @apply flex flex-col gap-[18px];
        }
    }
    @screen md {
        .__hr {
            @apply my-5;
        }
    }
    .adress {
        &__container {
            &__info {
                @apply mb-[20px] flex items-center gap-[10px];
                color: var(--color-primary);
            }
        }
        &__map {
            @apply border rounded-sm h-[350px] mb-[10px];
            min-height: 350px;
            &--loading {
                min-height: inherit;
                @apply relative;
            }
        }
        &__info {
            @apply mb-3;
        }
    }
    .__back {
        @apply flex gap-[18px] items-center cursor-pointer;
    }
</style>
