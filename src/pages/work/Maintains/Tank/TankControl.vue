<template>
    <div class="controlTank__container">
        <div class="controlTank__hasResult">
            <div class="controlTank__header">
                <div class="controlTank__header-title">
                    <div class="controlTank__back" @click="$emit('prev')">
                        <BackButton />
                    </div>
                    <Paragraphe class="controlTank__title"
                        >Etendue du contrôle</Paragraphe
                    >
                </div>
                <div class="controlTank__Button">
                    <Button @on-click="handleAddControl"
                        ><AddIcon color="#fff" /><span class="text-btn"> </span
                    ></Button>
                </div>
            </div>
            <hr class="separator" />

            <div class="controlTank__notification" v-if="hasNextControl">
                <a-alert
                    :message="`Votre prochaine contrôle est  ${moment(
                        nextControl.date,
                        'YYYYMMDD'
                    ).fromNow()}`"
                    type="info"
                    closable
                    @close="onClose"
                />
            </div>

            <div class="controlTank__control" v-if="hasLastControl">
                <Title label="Dernier contrôle" weight="700" type="h3" />
                <div class="controlTank__control-content-mob">
                    <div class="content-head-mob">
                        <Paragraphe class="font-bold">{{
                            lastControl.type
                        }}</Paragraphe>
                        <PlugMobIcon
                            :class="lastControl.state"
                            @click="handleShowPlug"
                        />
                    </div>
                    <div class="file">
                        <AdobeReaderIcon /><a
                            :href="BASE_URL + lastControl.documents[0].path"
                            >{{ lastControl.documents[0].file }}</a
                        >
                    </div>
                    <Paragraphe class="text-primary mt-3">
                        Coût :
                        <span>{{ separatorMillier(lastControl.cost) }} € </span>
                    </Paragraphe>
                    <Paragraphe class="text-primary">
                        Date :
                        <span>{{
                            moment(lastControl.date).format('DD/MM/YYYY')
                        }}</span></Paragraphe
                    >
                </div>
                <div
                    class="controlTank__control-content-web"
                    v-if="hasLastControl"
                >
                    <Paragraphe class="font-bold">{{
                        lastControl.type
                    }}</Paragraphe>
                    <div class="buchon" @click="handleShowPlug">
                        <PlugIcon />
                    </div>
                    <div class="file">
                        <AdobeReaderIcon /><a
                            :href="BASE_URL + lastControl.documents[0].path"
                            >{{ lastControl.documents[0].file }}</a
                        >
                    </div>
                    <Paragraphe class="text-primary"
                        >{{ separatorMillier(lastControl.cost) }} €
                    </Paragraphe>
                    <Paragraphe class="text-primary">{{
                        moment(lastControl.date).format('DD/MM/YYYY')
                    }}</Paragraphe>
                </div>
            </div>

            <!--Ajout de prochaine controle-->
            <div class="controlTank__history" v-if="hasLastControl">
                <!--<Title label="Historique du document" weight="700" type="h3" />-->
                <Paragraphe
                    class="history-btn"
                    @click="handleModalAddNextControl"
                    >Add next <ArrowBottom
                /></Paragraphe>
            </div>

            <div class="controlTank__control mt-[40px]" v-if="hasNextControl">
                <Title label="Prochain contrôle" weight="700" type="h3" />
                <div class="controlTank__nextControl-content-web">
                    <Paragraphe class="font-bold">{{
                        nextControl.type
                    }}</Paragraphe>
                    <!--<div class="buchon"><PlugIcon /></div>-->
                    <!--<div class="file"><AdobeReaderIcon /> Nom du PDF</div>-->
                    <Paragraphe class="text-primary"
                        >Votre prochaine contrôle est le
                        {{
                            moment(nextControl.date).format('LLLL')
                        }}</Paragraphe
                    >
                </div>
                <div
                    class="controlTank__control-notification"
                    v-if="hasLastControl"
                >
                    <span>Votre prochaine contrôle est : </span>
                    <span class="notif">{{
                        moment(nextControl.date, 'YYYYMMDD').fromNow()
                    }}</span>
                </div>
            </div>
        </div>

        <div class="modal-plug-and-addControl">
            <!--Modal pour l'ajout de dernier control-->
            <Modal
                class="addControl"
                title="Ajout dernier contrôle"
                :is-show-modal="showModalAddControl"
                @onBack="showModalAddControl = false"
            >
                <template #content>
                    <TankAddControl
                        :disabled="BtnLastControl"
                        :loadingBtnAd="loadignBtnWhenAddControl"
                        @handle-select="handleTypeControl"
                        @handle-date="handleDateControl"
                        @handle-change-radio="handleStateControl"
                        @handle-upload-file="handleUploadFileControl"
                        @handle-cost="handleCostControl"
                        @handle-add-control="handleValidControl"
                /></template>
            </Modal>

            <!--Modal pour l'ajout de next control-->
            <Modal
                class="addNextControl"
                title="Ajout Next contrôle"
                :is-show-modal="showModalAddNextControl"
                @onBack="showModalAddNextControl = false"
            >
                <template #content>
                    <TankAddNextControl
                        :disabled="BtnNextControl"
                        :loadignBtnNextControl="loadignBtnNextControl"
                        @handle-select="handleTypeControl"
                        @handle-date="handleDateControl"
                        @handle-add-next-control="handleValidNextControl"
                /></template>
            </Modal>

            <!--Modal pour les bouchon -->
            <Modal
                class="plug"
                title="."
                :is-show-modal="showPlug"
                @onBack="showPlug = false"
            >
                <template #content>
                    <div class="plug-icon">
                        <PlugIcon
                            :color="
                                lastControl.state == 'Mauvais'
                                    ? 'var(--color-red)'
                                    : lastControl.state == 'Moyenne'
                                    ? 'var(--color-warn)'
                                    : 'var(--color-green)'
                            "
                        />
                    </div>

                    <PlugRed v-if="lastControl.state == 'Mauvais'" />
                    <PlugYellow v-if="lastControl.state == 'Moyenne'" />
                    <PlugGreen v-if="lastControl.state == 'Bien'" />
                </template>
            </Modal>
        </div>
        <div class="controlTank__noResult" v-if="!hasLastControl">
            <a-alert
                message="Alert !!!"
                description="Vous n'avez pas encore effectuer de Contrôle, Veuillez ajouter."
                type="warning"
                show-icon
            />
        </div>
        <Loader class="loading" v-if="loading" />
    </div>
</template>

<script setup lang="ts">
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import PlugIcon from '@/components/Icon/PlugIcon.vue';
    import PlugMobIcon from '@/components/Icon/PlugMobIcon.vue';
    import AdobeReaderIcon from '@/components/Icon/AdobeReaderIcon.vue';
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import PlugGreen from './PlugGreen.vue';
    import PlugYellow from './PlugYellow.vue';
    import PlugRed from './PlugRed.vue';
    import { notification, Alert as AAlert } from 'ant-design-vue';
    import { computed, onMounted, ref } from 'vue';
    import TankAddControl from './TankAddControl.vue';
    import TankAddNextControl from './Form/TankAddNextControl.vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import moment from 'moment';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const route = useRoute();
    const store = useStore();

    onMounted(async () => {
        await getLastControl();
        await getNextControl();
        getPropertyDetail();
    });

    interface ILastControl {
        type?: string;
        state?: string;
        documents?: any;
        cost?: number;
        date?: string;
    }

    let loading = ref<boolean>(false);
    let loadignBtnWhenAddControl = ref<boolean>(false);
    let loadignBtnNextControl = ref<boolean>(false);
    let showModalAddControl = ref<boolean>(false);
    let showModalAddNextControl = ref<boolean>(false);
    let showPlug = ref<boolean>(false);
    let hasLastControl = ref<boolean>(false);
    let hasNextControl = ref<boolean>(false);
    let BtnLastControl = ref<boolean>(true);
    let BtnNextControl = ref<boolean>(true);

    let dataPostAddControl = ref<any>({
        thePropertyId: route.params.id,
        stateControls: 'Mauvais',
    });
    let lastControl = ref<ILastControl>({});
    let nextControl = ref<ILastControl>({});
    let BASE_URL = import.meta.env.VITE_API_ROOT_URL;

    console.log(BASE_URL, 'VASE URL');

    async function getLastControl() {
        try {
            loading.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/setListLastControls',
                route.params.id
            );

            if (code == 200) {
                hasLastControl.value = true;

                lastControl.value = data[data.length - 1];

                console.log(lastControl.value, 'data lastControl resultat');
            } else if (code == 404) {
            }
        } catch (error) {
            console.error(
                "Erreur lors de l'afffichage de liste dernier contrôle"
            );
        } finally {
            loading.value = false;
        }
    }

    async function getNextControl() {
        try {
            loading.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/setListNextControls',
                route.params.id
            );

            if (code == 200) {
                hasNextControl.value = true;

                nextControl.value = data[data.length - 1];
            } else if (code == 404) {
            }
        } catch (error) {
            console.error('Erreur lors de listage des next control');
        } finally {
            loading.value = false;
        }
    }

    function handleShowPlug() {
        showPlug.value = true;
    }

    function handleAddControl() {
        showModalAddControl.value = true;
    }

    function handleModalAddNextControl() {
        showModalAddNextControl.value = true;
    }

    function handleTypeControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
        checkBtnValidationState();
        checkBtnValidationStateNext();
    }
    function handleDateControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
        checkBtnValidationState();
        checkBtnValidationStateNext();
    }
    function handleStateControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
    }
    function handleUploadFileControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
    }
    function handleCostControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
        checkBtnValidationState();
    }
    async function handleValidControl() {
        console.log('DATA TO POST ', dataPostAddControl.value);
        try {
            loadignBtnWhenAddControl.value = true;
            let resulta = await store.dispatch(
                'WorksModule/addLastControl',
                dataPostAddControl.value
            );

            if (resulta.data.code == 200 && resulta.data.success) {
                notification['success']({
                    message: 'Ajout de dernier control',
                    description: 'Le dernier control a été bien ajouter',
                });
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de dernier control");
        } finally {
            loadignBtnWhenAddControl.value = false;
        }
    }

    async function handleValidNextControl() {
        try {
            loadignBtnNextControl.value = true;
            let resultaNext = await store.dispatch(
                'WorksModule/addNextControl',
                dataPostAddControl.value
            );

            if (resultaNext.data.code == 200 && resultaNext.data.success) {
                notification['success']({
                    message: 'Ajout prochaine control',
                    description: 'Le prochaine control a été bien ajouter',
                });
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        } catch (error) {
        } finally {
            loadignBtnNextControl.value = false;
        }
    }

    function getPropertyDetail() {
        const data = computed(
            () => store.getters['PropertyDetailModule/getPropertyDetail']
        );

        console.log(data, 'DTATATATATA');
    }

    function checkBtnValidationState() {
        return dataPostAddControl.value.typeControls &&
            dataPostAddControl.value.dateControls &&
            dataPostAddControl.value.costControls
            ? (BtnLastControl.value = false)
            : (BtnLastControl.value = true);
    }
    function checkBtnValidationStateNext() {
        return dataPostAddControl.value.typeControls &&
            dataPostAddControl.value.dateControls
            ? (BtnNextControl.value = false)
            : (BtnNextControl.value = true);
    }

    const onClose = (e: MouseEvent) => {
        console.log(e, 'I was closed.');
    };
</script>

<style scoped lang="scss">
    .controlTank {
        &__notification {
            @apply mb-[20px];
        }
        &__container {
            @apply bg-[#fff] rounded-[8px] p-[18px] flex flex-col min-h-[89vh];
        }
        &__back {
            @apply w-[30px];
        }
        &__header {
            @apply flex justify-between mb-[5px];
        }
        &__header-title {
            @apply flex items-baseline;
        }
        &__title {
            color: var(--color-gray-icon);
            font-weight: 600;
            @apply text-[16px];
        }

        &__Button {
            &:deep() {
                .button__primary {
                    @apply flex items-center gap-[7px];

                    @screen sm {
                        @apply py-[7px] px-[25px];
                    }
                }
            }
        }

        // Dernier controle mobile
        &__control-content-mob {
            @apply bg-[var(--color-gray)] p-[10px] rounded-[8px] flex flex-col gap-[3px];

            @screen sm {
                @apply hidden;
            }
        }

        // Dernier controle web

        &__control-content-web {
            @apply hidden;
            @screen sm {
                @apply bg-[var(--color-gray)] p-[10px] mt-[10px] rounded-[8px] flex items-center justify-between flex-wrap gap-[8px];
            }
        }
        &__nextControl-content-web {
            @apply bg-[var(--color-gray)] p-[10px] mt-[10px] rounded-[8px] flex flex-col gap-[8px] mb-[10px];
            @screen sm {
                @apply flex-row items-center justify-between flex-wrap;
            }
        }

        // historique
        &__history {
            @apply text-right  mt-[20px];
        }

        // No result
        &__noResult {
            @apply mt-2;
        }
    }

    .content-head-mob {
        @apply flex items-center justify-between mb-[10px];
    }

    .text-btn::before {
        content: 'Contrôle';

        @screen sm {
            content: 'Ajout contrôle';
        }
    }

    .buchon {
        @apply bg-white px-[40px] py-[5px] rounded-[25px] cursor-pointer;
        border: 1px solid var(--color-green);
    }

    .file {
        @apply flex items-center gap-[5px] font-semibold text-xs;
    }

    .text-primary {
        @apply text-[var(--color-primary)];
    }

    .history-btn {
        display: inline-flex;
        @apply items-center gap-[5px] cursor-pointer;
    }

    .addControl {
        &:deep() {
            .ant-modal .ant-modal-content .ant-modal-header .ant-modal-title {
                // @apply text-[var(--color-primary)];
                color: var(--color-primary);
                font-size: 40px;
            }
        }
    }

    .plug-icon {
        @apply absolute top-[22px] left-[22px];
    }

    // .loading {
    //     @apply relative;
    // }

    .notif {
        border: 1px solid var(--color-green);

        @apply p-[5px] rounded-[8px] bg-[var(--color-green)] font-bold;
    }

    .Mauvais {
        &:deep(rect) {
            fill: var(--color-red);
        }
    }
    .Moyenne {
        &:deep(rect) {
            fill: var(--color-warn);
        }
    }
    .Bien {
        &:deep(rect) {
            fill: var(--color-green);
        }
    }
</style>
