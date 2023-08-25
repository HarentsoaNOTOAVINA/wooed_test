<template>
    <div class="urbanismeStatus__brussel">
        <MenuItem
            title="au Plan régional d’affectation du sol en "
            title-btn="Zones d'habitation à prédominance résidentielle"
            @hanlde-info="regionalInfo"
            @handle-btn="regionalBtn"
        />

        <div class="result-Pras" v-if="showPras">
            <Title
                type="p"
                :label="prasName"
                class="urbanismeStatus__namePras"
            />
            <div
                v-html="pprasAffectation"
                class="text-base"
                style="font-size: 20px"
            ></div>
        </div>
        <div class="noResult-Pras" v-else-if="showNoPras">
            <a-alert
                message="Vous n'avez pas de status urbanistique (Pras) sur cette zone"
                type="warning"
                closable
            />
        </div>

        <MenuItem
            title="au Plan Particulier d’Affectation du Sol en"
            title-btn="Zone d’habitat... "
            @hanlde-info="particularInfo"
            @handle-btn="particularBtn"
        />
        <div class="result-Ppas" v-if="showPpas">
            <Title
                type="p"
                :label="pPasName"
                class="urbanismeStatus__namePras"
            />
            <div v-html="pPasAffectation" class="text-base"></div>
        </div>
        <div class="noResult-Pras" v-else-if="showNoPpas">
            <a-alert
                message="Vous n'avez pas de status urbanistique (Ppas) sur cette zone"
                type="warning"
                closable
            />
        </div>
        <div class="Loader"><Loader v-if="loading" /></div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { notification, Alert as AAlert } from 'ant-design-vue';
    import MenuItem from '../Components/Urbanstatus/MenuItem.vue';
    import { Store, useStore } from 'vuex';
    // import { STATUS } from '@/core/constants/constants';

    let store: Store<any> = useStore();

    const props = defineProps({
        thePropertyId: {
            type: Number,
        },
        regionId: {
            type: Number,
        },
    });

    let params = ref<Object>({
        thePropertyId: props.thePropertyId,
        regionId: props.regionId,
    });
    let resultPras = ref<any>('');
    let resultPpas = ref<any>('');
    let pprasAffectation = ref<string>('');
    let pPasAffectation = ref<string>('');
    let prasName = ref<string>('');
    let pPasName = ref<string>('');
    let showPras = ref<boolean>(false);
    let showPpas = ref<boolean>(false);
    let showNoPras = ref<boolean>(false);
    let showNoPpas = ref<boolean>(false);
    let loading = ref<boolean>(false);

    onMounted(() => {
        getAllStatusUrban();
    });

    function regionalInfo() {
        console.log('INFO regional');
        showPras.value = !showPras.value;
    }
    function regionalBtn() {
        console.log('BUTTON regional');
    }
    function particularInfo() {
        console.log('BUTTON particular');
        showPpas.value = !showPpas.value;
    }
    function particularBtn() {
        console.log('BUTTON particular');
    }

    async function getAllStatusUrban() {
        loading.value = true;
        await getPrasZone();
        await getPpasZone();
        loading.value = false;
    }

    async function getPrasZone() {
        try {
            console.log(params, 'PARAMAS');

            await store.dispatch(
                'UrbanismeModule/setPrasStatusUrban',
                params.value
            );

            resultPras = computed(
                () => store.getters['UrbanismeModule/getPrasStatusUrban']
            );
            if (resultPras.value.code === 200) {
                pprasAffectation.value = resultPras.value.data.zone.affectation;
                prasName.value = resultPras.value.data.zone.name;
                notification['success']({
                    message: 'Pras',
                    description: 'Vous avez des données Pras dans cette zone.',
                });
            } else if (resultPras.value.code === 404) {
                notification['warning']({
                    message: 'Pras',
                    description:
                        "Vous n'avez pas des données Pras dans cette zone.",
                });
                showNoPras.value = true;
            } else {
                console.log('Une erreur est venu');
            }
        } catch (error) {}
    }

    async function getPpasZone() {
        try {
            await store.dispatch(
                'UrbanismeModule/setPpasStatusUrban',
                params.value
            );
            resultPpas = computed(
                () => store.getters['UrbanismeModule/getPpasStatusUrban']
            );

            if (resultPpas.value.code === 200) {
                pPasAffectation.value = resultPpas.value.data.affectation;
                pPasName.value = resultPpas.value.data.zone;
                notification['success']({
                    message: 'Ppas',
                    description: 'Vous avez des données Ppas dans cette zone.',
                });
            } else if (resultPpas.value.code === 404) {
                showNoPpas.value = true;
                notification['warning']({
                    message: 'Ppas',
                    description:
                        "Vous n'avez pas des données Ppas dans cette zone.",
                });
            } else {
                console.log('Une erreur est venu');
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style lang="scss" scoped>
    .urbanismeStatus {
        &__brussel {
            position: relative;
            &:deep() {
                .urbanismeStatus__menu
                    .urbanismeStatus__menu-list
                    .btn
                    .button__primary {
                    min-width: 100%;
                    @screen lg {
                        min-width: 346px;
                    }
                }
            }
        }
        &__affectation {
            @apply text-base;
        }

        &__namePras {
            @apply text-center bg-[var(--color-gray)] rounded-[8px] p-[7px];
        }
    }

    .Loader {
        @apply bg-[#fff];
    }
</style>
