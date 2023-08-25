<template>
    <div class="boilerDiagnostic__list">
        <div class="boilerDiagnostic__list-nav">
            <ArrowBack @click="$router.push({ name: 'work-boiler' })" />
            <Paragraphe>Dernier Diagnostic</Paragraphe>
        </div>
        <hr class="separator" />

        <div class="boilerDiagnostic__content" v-if="hasContent && !loading">
            <a-alert
                v-if="visible"
                :message="`Votre prochaine diagnostic est le ${moment(
                    nextControlPEB.date
                ).format('LLLL')}`"
                type="info"
                closable
                :after-close="handleClose"
                class="notification"
            />
            <div class="boilerDiagnostic__control-content-mob">
                <div class="content-head-mob">
                    <!-- {{ titleBoilerLastControl }} -->
                    <Paragraphe class="font-bold">
                        Date de la dernier diagnostic
                    </Paragraphe>
                    <!-- <PlugMobIcon
                        :class="lastControlPEB.state"
                        @click="handleShowPlug"
                    /> -->
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
            <div class="boilerDiagnostic__content-web">
                <div class="boilerDiagnostic__control-content-mob mt-[10px]">
                    <div class="content-head-mob">
                        <!-- {{ titleBoilerLastControl }} -->
                        <Paragraphe class="font-bold">
                            Date de la prochaine diagnostic
                        </Paragraphe>
                        <!-- <PlugMobIcon
                        :class="lastControlPEB.state"
                        @click="handleShowPlug"
                    /> -->
                    </div>
                    <!-- <div class="file">
                        <AdobeReaderIcon /><a
                            :href="BASE_URL + pathDocLastControlPEB"
                            >{{ fileDocLastControlPEB }}</a
                        >
                    </div> -->
                    <Paragraphe class="text-primary">
                        Votre prochaine contrôle est le
                        {{
                            moment(nextControlPEB.date).format('LLLL')
                        }}</Paragraphe
                    >
                </div>
            </div>
            <div class="boilerDiagnostic__content-web">
                <div class="boilerDiagnostic__control-content-web">
                    <Paragraphe class="font-bold"
                        >Dernier contrôle périodique
                    </Paragraphe>
                    <!-- <div class="buchon" @click="handleShowPlug">
                    <PlugIcon />
                </div> -->
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

                <div class="boilerDiagnostic__control-content-web mt-[10px]">
                    <Paragraphe class="font-bold"
                        >Prochain contrôle périodique
                    </Paragraphe>
                    <!-- <div class="buchon" @click="handleShowPlug">
                    <PlugIcon />
                </div> -->
                    <!--   <div class="file">
                        <AdobeReaderIcon /><a
                            href="BASE_URL + pathDocLastControlPEB"
                            >Pdf name uploaded name.pdf</a
                        >
                    </div>
                    <Paragraphe class="text-primary"
                        >{{ separatorMillier(20000) }} €
                    </Paragraphe>  -->
                    <Paragraphe class="text-primary">
                        Votre prochaine contrôle est le
                        {{
                            moment(nextControlPEB.date).format('LLLL')
                        }}</Paragraphe
                    >
                </div>
            </div>
        </div>

        <a-alert
            v-if="!hasContent && !loading"
            message="Aucun diagnostic"
            description="Vous n'avez pas encore effectuer aucun diagnostic."
            type="warning"
            show-icon
        />

        <div class="button-add" v-if="!loading">
            <Button class="btn" @on-click="addDiagnostic"
                >Nouveau diagnostic</Button
            >
        </div>

        <div class="loading"><Loader v-if="loading" /></div>
    </div>
</template>

<script setup lang="ts">
    import { Divider as ADivider, Alert as AAlert } from 'ant-design-vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { ref, onMounted, computed } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import AdobeReaderIcon from '@/components/Icon/AdobeReaderIcon.vue';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import AddDiagnostic from './AddDiagnostic.vue';
    import moment from 'moment';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import Loader from '@/components/Common/Loader/Loader.vue';

    interface IDiagnostic {
        type?: string;
        state?: string;
        thePropertyDocuments?: any;
        cost?: number;
        date?: string;
    }

    const store = useStore();
    const route = useRoute();

    let visible = ref<boolean>(true);
    let loadingEntry = ref<boolean>(false);
    let hasContent = ref<boolean>(true);
    let loading = ref<boolean>(false);
    let dataIdStore = ref<any>({
        thePropertyId: route.params.id,
        typeOfWork: null,
    });
    let BASE_URL = import.meta.env.VITE_API_ROOT_URL;
    let lastControlPEB = ref<IDiagnostic>({});
    let nextControlPEB = ref<IDiagnostic>({});
    let pathDocLastControlPEB = ref<string>('');
    let fileDocLastControlPEB = ref<string>('');
    const emit = defineEmits<{
        (e: 'component', v: any): void;
    }>();

    onMounted(async () => {
        await getLastDiagnostic();
        await getNextDiagnostic();
    });

    const handleClose = () => {
        visible.value = false;
    };

    function addDiagnostic() {
        emit('component', AddDiagnostic);
    }
    async function getLastDiagnostic() {
        let listId = computed(
            () => store.getters['WorksModule/getDataIdToPost']
        );

        dataIdStore.value.typeOfWork = listId.value.idTypeOfWork;
        // dataIdStore.value.thePropertyId = listId.value.idSubSection;

        console.log(dataIdStore.value, 'ID');
        try {
            loading.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/getListControlPEB',
                dataIdStore.value
            );

            data.length > 0
                ? (hasContent.value = true)
                : (hasContent.value = false);

            console.log(data, 'code response');
            console.log(code, 'Data response');

            if (code == 200) {
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
                "Erreur lors de l'afffichage de liste dernier diagnostic"
            );
        } finally {
            loading.value = false;
        }
    }

    async function getNextDiagnostic() {
        let listId = computed(
            () => store.getters['WorksModule/getDataIdToPost']
        );

        dataIdStore.value.typeOfWork = listId.value.idTypeOfWork;
        try {
            // loading.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/getListNextControlPEB',
                dataIdStore.value
            );

            console.log(data, 'List next Diagnostic');
            if (code == 200) {
                nextControlPEB.value = data[0];
            } else if (code == 404) {
            }
        } catch (error) {
            console.error('Erreur lors de listage des next diagnostic', error);
        } finally {
            loading.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .boilerDiagnostic {
        &__list {
            @apply relative bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__list-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }

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
    }

    .button-add {
        @apply flex justify-center mt-[15px];
    }

    .notification {
        @apply rounded-[8px] mb-[12px];
    }

    .file {
        @apply flex gap-[2px];
    }
    .separator {
        @apply my-[15px];
    }
    .loading {
        @apply absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
