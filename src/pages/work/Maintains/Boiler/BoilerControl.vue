<template>
    <div class="boilerControl">
        <div class="boilerControl__header">
            <div class="boilerControl__header-title">
                <div class="boilerControl__back" @click="$emit('prev')">
                    <BackButton />
                </div>
                <Paragraphe class="boilerControl__title"
                    >Historique du contrôle</Paragraphe
                >
            </div>

            <div class="boilerControl__Button">
                <Button @on-click="handleAddControl"
                    ><AddIcon color="#fff" /><span class="text-btn"> </span
                ></Button>
            </div>
        </div>
        <hr class="separator" />

        <div
            class="boilerControl__control"
            v-if="!loading && hasLastControlPEB"
        >
            <a-alert
                v-if="hasNextControlPEB"
                class="mb-3 rouded-[8px]"
                message="Notification"
                :description="`La date de votre prochaine contrôle est le ${moment(
                    nextControlPEB.date
                ).format('LLLL')}`"
                type="info"
                closable
                @close="onClose"
            />
            <Title label="Dernier contrôle" weight="700" type="h3" />
            <div class="boilerControl__control-content-mob">
                <div class="content-head-mob">
                    <Paragraphe class="font-bold">
                        {{ titleBoilerLastControl }}
                    </Paragraphe>
                    <PlugMobIcon
                        :class="lastControlPEB.state"
                        @click="handleShowPlug"
                    />
                </div>
                <div class="file">
                    <AdobeReaderIcon /><a
                        :href="BASE_URL + pathDocLastControlPEB"
                        >{{ fileDocLastControlPEB }}</a
                    >
                </div>
                <Paragraphe class="text-primary mt-3">
                    Coût :
                    <span>{{ separatorMillier(lastControlPEB.cost) }} € </span>
                </Paragraphe>
                <Paragraphe class="text-primary">
                    Date :
                    <span>{{
                        moment(lastControlPEB.date).format('L')
                    }}</span></Paragraphe
                >
            </div>
            <div class="boilerControl__control-content-web">
                <Paragraphe class="font-bold"
                    >Dernier contrôle périodique
                </Paragraphe>
                <div class="buchon" @click="handleShowPlug">
                    <PlugIcon />
                </div>
                <div class="file">
                    <AdobeReaderIcon /><a
                        :href="BASE_URL + pathDocLastControlPEB"
                        >{{ fileDocLastControlPEB }}</a
                    >
                </div>
                <Paragraphe class="text-primary"
                    >{{ separatorMillier(lastControlPEB.cost) }} €
                </Paragraphe>
                <Paragraphe class="text-primary">{{
                    moment(lastControlPEB.date).format('L')
                }}</Paragraphe>
            </div>

            <!--Ajout de prochaine controle-->
            <div class="boilerControl__history">
                <Paragraphe
                    class="history-btn"
                    @click="handleModalAddNextControlPEB"
                    >Add next <ArrowBottom
                /></Paragraphe>
            </div>
        </div>

        <div
            class="boilerControl__control mt-[40px]"
            v-if="!loading && hasNextControlPEB"
        >
            <Title label="Prochain contrôle" weight="700" type="h3" />
            <div class="boilerControl__nextControl-content-web">
                <Paragraphe class="font-bold"
                    >Prochain contrôle périodique PEB (qui comprend l’entretien)
                </Paragraphe>
                <Paragraphe class="text-primary"
                    >Votre prochaine contrôle est le
                    {{ moment(nextControlPEB.date).format('LLLL') }}</Paragraphe
                >
            </div>
        </div>

        <div class="boilerControl__modal">
            <Modal
                class="addControl"
                title="Ajout dernier contrôle"
                :is-show-modal="showModalAddControlPEB"
                @onBack="showModalAddControlPEB = false"
            >
                <template #content>
                    <BoilerAddControl
                        :disabled="BtnLastControl"
                        :loadingBtnAd="loadignBtnWhenAddControl"
                        :type-control-label="labelBoilerControl"
                        @handle-date="handleDateControl"
                        @handle-change-radio="handleStateControl"
                        @handle-upload-file="handleUploadFileControl"
                        @handle-cost="handleCostControl"
                        @handle-add-control="handleValidControl"
                /></template>
            </Modal>

            <!-- Modal pour ajouter le next controle PEB -->
            <Modal
                class="addNextControl"
                title="Ajout Next contrôle PEB"
                :is-show-modal="showModalAddNextControlPEB"
                @onBack="showModalAddNextControlPEB = false"
            >
                <template #content>
                    <BoilerAddNextControlPEB
                        :disabled="BtnNextControlPEB"
                        :loadignBtnNextControlPEB="loadignBtnNextControl"
                        @handle-date-peb="handleDateControl"
                        @handle-add-next-control-peb="handleValidNextControlPEB"
                    />
                </template>
            </Modal>

            <!--Modal pour les bouchon -->
            <Modal
                class="plug"
                title="."
                :is-show-modal="showPlugModal"
                @onBack="showPlugModal = false"
            >
                <template #content>
                    <div class="plug-icon">
                        <PlugIcon
                            :color="
                                lastControlPEB.state == 'Mauvais'
                                    ? 'var(--color-red)'
                                    : 'var(--color-green)'
                            "
                        />
                    </div>

                    <BoilerPlugRed
                        v-if="lastControlPEB.state == 'Mauvais'"
                        :region="region"
                        :date-next="lastControlPEB.date"
                    />
                    <BoilerPlugGreen v-if="lastControlPEB.state == 'Bien'" />
                </template>
            </Modal>
        </div>

        <div
            class="controlTank__noResult"
            v-if="!hasLastControlPEB && !loading"
        >
            <a-alert
                message="Alert !!!"
                description="Vous n'avez pas encore effectuer de Contrôle PEB, Veuillez ajouter."
                type="warning"
                show-icon
            />
        </div>

        <Loader class="loading" v-if="loading" />
    </div>
</template>

<script setup lang="ts">
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import moment from 'moment';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import AdobeReaderIcon from '@/components/Icon/AdobeReaderIcon.vue';
    import PlugIcon from '@/components/Icon/PlugIcon.vue';
    import BoilerAddControl from './form/BoilerAddControl.vue';
    import BoilerAddNextControlPEB from './form/BoilerAddNextControlPEB.vue';
    import BoilerPlugGreen from './form/BoilerPlugGreen.vue';
    import PlugMobIcon from '@/components/Icon/PlugMobIcon.vue';
    import { onMounted, computed, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { notification, Alert as AAlert } from 'ant-design-vue';
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import BoilerPlugRed from './form/BoilerPlugRed.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    interface IControlPEB {
        type?: string;
        state?: string;
        thePropertyDocuments?: any;
        cost?: number;
        date?: string;
    }

    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    let showPlugModal = ref<boolean>(false);
    let showModalAddControlPEB = ref<boolean>(false);
    let showModalAddNextControlPEB = ref<boolean>(false);
    let BtnLastControl = ref<boolean>(true);
    let loadignBtnWhenAddControl = ref<boolean>(false);
    let loadignBtnNextControl = ref<boolean>(false);
    let hasLastControlPEB = ref<boolean>(false);
    let hasNextControlPEB = ref<boolean>(false);
    let BtnNextControlPEB = ref<boolean>(true);
    let labelBoilerControl = ref<string>('Dernier contrôle périodique PEB');
    let titleBoilerLastControl = ref<string>(
        'Dernier contrôle périodique PEB (qui comprend l’entretien)'
    );
    let detailProperty;
    let region = ref<string>();
    let lastControlPEB = ref<IControlPEB>({});
    let nextControlPEB = ref<IControlPEB>({});
    let BASE_URL = import.meta.env.VITE_API_ROOT_URL;
    let pathDocLastControlPEB = ref<string>('');
    let fileDocLastControlPEB = ref<string>('');
    let loading = ref<boolean>(false);

    let dataPostAddControl = ref<any>({
        thePropertyId: route.params.id,
        statePebControls: 'Mauvais',
    });

    onMounted(async () => {
        getPropertyDetailSelected();
        await getLastControlPEB();
        await getNextControlPEB();
    });

    function getPropertyDetailSelected() {
        detailProperty = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        region.value = detailProperty.value[0].region;

        switch (region.value) {
            case 'Bruxelles-Capitale':
                labelBoilerControl.value = 'Dernier contrôle périodique PEB ';
                break;
            case 'Flandre':
                labelBoilerControl.value = 'Dernier contrôle périodique ';
                titleBoilerLastControl.value = 'Dernier contrôle périodique ';
                break;
            case 'Wallonie':
                labelBoilerControl.value = 'Dernière inspection périodique ';
                titleBoilerLastControl.value =
                    'Dernière inspection périodique ';
                break;

            default:
                break;
        }
    }

    async function getLastControlPEB() {
        try {
            loading.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/getListControlPEB',
                { thePropertyId: route.params.id }
            );

            if (code == 200) {
                hasLastControlPEB.value = true;

                lastControlPEB.value = data[0];

                pathDocLastControlPEB.value =
                    lastControlPEB.value.thePropertyDocuments[0].path;
                fileDocLastControlPEB.value =
                    lastControlPEB.value.thePropertyDocuments[0].file;

                console.log(
                    lastControlPEB.value,
                    'data lastControlPEB resultat'
                );
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

    async function getNextControlPEB() {
        try {
            loading.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/getListNextControlPEB',
                { thePropertyId: route.params.id }
            );
            if (code == 200) {
                hasNextControlPEB.value = true;
                nextControlPEB.value = data[0];
                console.log(nextControlPEB.value, 'Control value value');
            } else if (code == 404) {
            }
        } catch (error) {
            console.error('Erreur lors de listage des next control');
        } finally {
            loading.value = false;
        }
    }

    function handleAddControl() {
        showModalAddControlPEB.value = true;
    }

    function handleDateControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
        checkBtnValidationState();
        checkBtnValidationStateNextPEB();
    }

    function handleStateControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
        console.log(region.value, 'REGION DE MON BIEN');
    }
    function handleUploadFileControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
    }

    function handleCostControl(value: object) {
        dataPostAddControl.value = { ...dataPostAddControl.value, ...value };
        console.log('DATA TO POST ', dataPostAddControl.value);

        checkBtnValidationState();
    }

    function handleShowPlug() {
        showPlugModal.value = true;
    }

    function handleModalAddNextControlPEB() {
        showModalAddNextControlPEB.value = true;
    }

    async function handleValidControl() {
        try {
            loadignBtnWhenAddControl.value = true;
            let resulta = await store.dispatch(
                'WorksModule/addLastControlBoiler',
                dataPostAddControl.value
            );

            if (resulta.data.code == 200 && resulta.data.success) {
                notification['success']({
                    message: 'Ajout de dernier control',
                    description: 'Le dernier control a été bien ajouter',
                });

                showModalAddControlPEB.value = false;

                router.push('/travaux');
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de dernier control");
        } finally {
            loadignBtnWhenAddControl.value = false;
        }
    }

    async function handleValidNextControlPEB() {
        try {
            loadignBtnNextControl.value = true;
            let resultaNext = await store.dispatch(
                'WorksModule/addNextControlBoiler',
                dataPostAddControl.value
            );

            if (resultaNext.data.code == 200 && resultaNext.data.success) {
                notification['success']({
                    message: 'Ajout prochaine control',
                    description: 'Le prochaine control PEB a été bien ajouter',
                });

                showModalAddNextControlPEB.value = false;
                router.push('/travaux');
            }
        } catch (error) {
        } finally {
            loadignBtnNextControl.value = false;
        }
    }

    function checkBtnValidationState() {
        return dataPostAddControl.value.datePebControls &&
            dataPostAddControl.value.costPebControls
            ? (BtnLastControl.value = false)
            : (BtnLastControl.value = true);
    }
    function checkBtnValidationStateNextPEB() {
        return dataPostAddControl.value.dateNextPebControls
            ? (BtnNextControlPEB.value = false)
            : (BtnNextControlPEB.value = true);
    }
    const onClose = (e: MouseEvent) => {};
</script>

<style scoped lang="scss">
    .boilerControl {
        &__header {
            @apply flex items-center;
        }
        &__back {
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
        &__title {
            @apply text-[16px] font-[600] text-[var(--color-gray-icon)];
        }
        &__content-title {
            @apply mb-[25px];
        }
        &__content-value {
            @apply mb-[25px];
        }
        &__history {
            @apply text-right  mt-[20px];
        }

        &__control {
            &:deep() {
                .ant-alert-with-description.ant-alert-no-icon {
                    @apply rounded-[8px];
                }
            }
        }
    }

    .boilerControl {
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
            @apply text-right mt-[20px];
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

    .loading {
        @apply relative h-[89vh] bg-[#fff];
    }

    .notif {
        border: 1px solid var(--color-green);

        @apply p-[5px] rounded-[8px] bg-[var(--color-green)] font-bold;
    }

    .Mauvais {
        &:deep(rect) {
            fill: var(--color-red);
        }
    }
    .Bien {
        &:deep(rect) {
            fill: var(--color-green);
        }
    }
</style>
