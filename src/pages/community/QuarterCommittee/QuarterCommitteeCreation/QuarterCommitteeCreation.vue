<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Map from '@/components/section/map/index.vue';
    import CommunityCard from '@/pages/community/components/CommunityCard.vue';
    import { onBeforeMount, onMounted, ref, watch } from 'vue';
    import LoaderVue from '@/components/Common/Loader/Loader.vue';
    import store from '@/store';
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue';

    interface IParams {
        name: string;
        perimeterName: string;
        coordinates: Array<any>;
    }
    const params = ref<any>({
        coordinates: null,
        name: null,
        perimeterName: null,
    });
    const disableBtn = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const userCoordinate = ref<Array<any>>([]);
    const router = useRouter();
    const cle = ref<number>(1);

    onBeforeMount(() => {
        getUserCoordinate();
    });

    watch(
        () => params.value,
        (value) => {
            disableBtn.value = validate(value);
            console.log('hh', disableBtn.value);
        },
        { immediate: true, deep: true }
    );

    watch(
        () => userCoordinate.value,
        (value) => {
            userCoordinate.value = value;
        },
        { immediate: true, deep: true }
    );

    function polygonDrawed(item: any) {
        params.value = {
            ...params.value,
            coordinates: item.latlng,
        };
    }

    function getUserCoordinate() {
        const userDetails = store.getters['UserModule/getUserDetails'];
        userCoordinate.value = [
            ...userCoordinate.value,
            {
                lat: userDetails.latitude,
                lng: userDetails.longitude,
            },
        ];
    }

    function handleChange(item: any, name?: any) {
        params.value = {
            ...params.value,
            ...item,
        };
        if (!item[name]) {
            disableBtn.value = false;
            console.log('gg', disableBtn.value);
        }
    }

    function validate(item: Record<string, any>) {
        return Object.values(item).every(
            (i) => i !== null && i.toString().trim() !== ''
        );
    }
    async function handleCreateCommunity() {
        console.log(params.value);
        loading.value = true;

        try {
            const { data, success } = await store.dispatch(
                'CommunityModule/createCommunity',
                params.value
            );

            if (success === true) {
                notification['success']({
                    message: 'Success',
                    description: 'Votre communauté a été créée avec succès',
                });
                router.push(`/community/publication/${data.idCommittee}`);
            }
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la création de la communauté :",
                error
            );
            notification['error']({
                message: 'Erreur',
                description:
                    "Une erreur s'est produite lors de la création de la communauté",
            });
        } finally {
            loading.value = false;
        }
    }
</script>

<template>
    <CommunityCard
        label-title="Créer une comité"
        :button="true"
        label-button="Terminer"
        class="communityAdd__section"
        @on-click="handleCreateCommunity"
        :disable-submit-button="!disableBtn"
        :loading="loading"
    >
        <div class="communityAdd__container">
            <div class="">
                <div class="communityAdd__form-item-wrap">
                    <label>
                        <span> Nom de la comité </span>
                    </label>
                    <Input
                        class="communityAdd__form-item"
                        placeholder="Nom de la comité"
                        name-input="name"
                        @input="handleChange($event, 'name')"
                    />
                </div>
                <div class="communityAdd__form-item-wrap">
                    <label>
                        <span> Périmètre geographique </span>
                    </label>
                    <Input
                        class="communityAdd__form-item"
                        placeholder="Périmètre geographique"
                        name-input="perimeterName"
                        @input="handleChange($event, 'perimeterName')"
                    />
                </div>
                <div class="communityAdd__map--container">
                    <div class="communityAdd__map--item">
                        <Map
                            :key="cle"
                            :needDrawControl="true"
                            @on-polygon-created="polygonDrawed"
                            :needMarkerLayer="true"
                            :markersCoordinates="userCoordinate"
                            :control-config="{
                                rectangle: false,
                                circlemarker: false,
                                marker: false,
                                polyline: false,
                                circle: false,
                            }"
                        />
                    </div>
                    <span>Dessiner le périmètre géographique sur la carte</span>
                </div>
            </div>
        </div>
    </CommunityCard>
</template>
<style lang="scss" scoped>
    .communityAdd {
        &__form-item-wrap {
            @apply mb-[25px];
            label {
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                @apply text-black flex items-center mb-[10px] gap-x-[12px];
            }
            &:deep() {
                .custom-input__label-icon {
                    @apply hidden;
                }
            }
        }
        &__form-item {
            @apply mb-0;
        }
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
            @screen xl {
                @apply h-[628px];
            }
        }
    }
</style>
