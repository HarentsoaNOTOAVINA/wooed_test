<template>
    <div class="work">
        <div>
            <Loading v-if="isLoading" />
        </div>
        <Title type="h3">Calculer coût</Title>
        <Hr />
        <div class="work__costContent">
            <span class="work__title">Montant :</span>
            <span class="work__cost">{{ cost }} €</span>
        </div>

        <div class="work__detailedStudyInfo">
            <Paragraphe class="work__infoHead"
                >La concentration de la pollution détectée dépasse
                <u> les normes prescrites</u></Paragraphe
            >
            <span class="work__title">Il s'agit de:</span>
            <ul v-for="item in infoDetailStudy">
                <li class="work__infoPuce">{{ item }}</li>
            </ul>
        </div>

        <div class="work__btnContainer">
            <Button @on-click="openSaveWork">Enregistrer le travaux</Button>
        </div>
        <div>
            <Modal
                width="700"
                title="Enregistrer votre travaux"
                :isShowModal="isShowModal"
                @onBack="onCloseModal"
            >
                <template #content>
                    <div class="work__form">
                        <InputDate
                            @handleDateFormatFr="handleDate($event)"
                            :name="dateUltName"
                            :label="dateUltLabel"
                        />
                        <InputDate
                            @handleDateFormatFr="handleDate($event)"
                            :name="dateEffectName"
                            :label="dateEffectLabel"
                        />
                        <UploadImage @uploadFileList="handleUpload" />
                        <div class="work__infoContainer">
                            <Title type="h3">Déclaration de conformité :</Title>
                            <Info @click="showInfo" />
                        </div>
                        <div v-if="isShowInfo">
                            <InfoRecon />
                        </div>
                        <InputDate
                            @handleDateFormatFr="handleDate($event)"
                            name="dateUltConform"
                            label="Date ultime de délivrance"
                        />
                        <InputDate
                            @handleDateFormatFr="handleDate($event)"
                            name="dateEffectConform"
                            label="Date effective de délivrance"
                        />
                        <!-- <UploadImage @uploadFileList="handleUploadRiskConf" /> -->

                        <Button @on-click="saveWork"
                            ><LoadingButton size="xs" v-if="loadingBtn" />
                            Enregistrer le travaux</Button
                        >

                        <!-- <Modal
                            width="700"
                            title="Enregistrer votre travaux"
                            :isShowModal="isShowInfo"
                            @onBack="onCloseModalInfoRecon"
                        >
                            <template #content>
                            </template>
                        </Modal> -->
                    </div>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import InfoRecon from '../InfoRecon/InfoRecon.vue';
    import Info from '@/components/Icon/Info.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Loading from '@/components/Common/Loader/Loader.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import { Store, useStore } from 'vuex';
    import { computed, onBeforeMount, onMounted, ref } from 'vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { createFormData } from '@/utils/formdata/formData';

    const emit = defineEmits(['finishSaveWork']);
    const props = defineProps(['paramsCost']);
    const store: Store<any> = useStore();
    let cost = ref<number>();
    let opt = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        separator: '.',
    };
    let isLoading = ref<boolean>(false);
    let isShowModal = ref<boolean>(false);
    let paramsSave = ref<object>({
        idModel: '',
        idSubModel: '',
        idTheProperty: props.paramsCost.thePropertyId,
        idSubSection: props.paramsCost.subsection,
        idCategory: props.paramsCost.category,
    });
    let loadingBtn = ref<boolean>(false);
    let reconCase = ref<string>('');
    let dateUltLabel = ref<string>("Date ultime de réalisation de l'étude");
    let dateEffectLabel = ref<string>(
        "Date effective de réalisation de l'étude"
    );
    let dateUltName = ref<string>('dateUlt');
    let dateEffectName = ref<string>('dateEffect');
    let isShowInfo = ref<boolean>(false);
    const infoDetailStudy = [
        'Une pollution unique qui a été principalement générée avant le 1er Janvier 1993',
        "Une pollution mélangée (sauf lorsque celle-ci est entièrement générée après le 20 Janvier 2005 par l'exploitant actuel, le titulaire de droits réels et/ou toute autre personne identifiée)",
        'Ou encore une pollution orpheline',
    ];
    onBeforeMount(() => {
        reconCondition();
    });

    onMounted(() => {
        reconCase.value = store.getters['WorksModule/getRecon'];
        console.log('reconcase:', reconCase.value);

        console.log('params props:', props.paramsCost);
        getCost();
    });

    const onCloseModalInfoRecon = () => {
        isShowInfo.value = false;
    };

    const showInfo = () => {
        isShowInfo.value = !isShowInfo.value;
    };

    const handleUploadRiskConf = (value: any) => {
        console.log('up risk conf:', value);
    };

    const reconCondition = () => {
        if (reconCase.value === 'risk') {
            dateUltName.value = 'dateUltNameRisk';
            dateEffectName.value = 'dateEffectNameRisk';
            dateUltLabel.value = 'Date ultime de réalisation du projet';
            dateEffectLabel.value = 'Date effective de réalisation du projet';
        }
    };

    const saveWork = async () => {
        loadingBtn.value = true;
        let params = createFormData(paramsSave.value);
        try {
            let res = await store.dispatch(
                'WorksModule/setSaveWork',
                paramsSave.value
            );
            if (res.data.code === 200) {
                notification['success']({
                    message: 'Vos données ont été enregistrer avec succes',
                });
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            loadingBtn.value = false;
            console.log('resres:', res);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            loadingBtn.value = false;
            emit('finishSaveWork');
        }
    };

    const handleDate = (value: any) => {
        if (value.dateUlt) {
            paramsSave.value = {
                ...paramsSave.value,
                ultimeStudyDate: value.dateUlt,
            };
            // console.log('date llll', value.dateUlt);
        } else if (value.dateEffect) {
            paramsSave.value = {
                ...paramsSave.value,
                effectiveStudyDate: value.dateEffect,
            };
        } else if (value.dateUltConform) {
            paramsSave.value = {
                ...paramsSave.value,
                ultimeDateConformity: value.dateUltConform,
            };
        } else if (value.dateEffectConform) {
            paramsSave.value = {
                ...paramsSave.value,
                effectiveDateConformity: value.dateEffectConform,
            };
        }
        console.log('date ', paramsSave.value);
    };

    const handleUpload = (value: any) => {
        paramsSave.value = { ...paramsSave.value, document: value };
        console.log('uploaddddd:', paramsSave.value);
    };

    const onCloseModal = () => {
        isShowModal.value = false;
    };

    const openSaveWork = () => {
        isShowModal.value = true;
    };

    const getCost = async () => {
        let params = {
            idSubSection: props.paramsCost.subsection,
            idCategory: props.paramsCost.category,
            idModel: null,
            idSubModel: null,
        };
        console.log('params for it: ', props.paramsCost);
        try {
            isLoading.value = true;
            await store.dispatch('WorksModule/setCostCalculated', params);
            const data = computed(
                () => store.getters['WorksModule/getCostCalculated']
            );
            let status = data.value.data.code;
            if (status === 200) {
                let val = data.value.data.data;
                cost.value = val.toLocaleString('fr-FR', opt);
                console.log('cost:', cost.value);
                console.log('value cost:', data.value.data);
            }
            isLoading.value = false;
        } catch (error) {
            // getCost()
        }
    };
</script>

<style lang="scss" scoped>
    .work {
        &__costContent {
            @apply flex justify-between bg-[var(--color-gray)] p-[24px] rounded-lg;
        }

        &__title {
            @apply font-bold text-[var(--color-gray-icon)];
        }

        &__infoContainer {
            @apply flex flex-row gap-[8px];
        }

        &__cost {
            @apply text-[var(--color-gray-icon)] font-bold;
        }

        &__btnContainer {
            @apply mt-[8px];
        }

        &__form {
            @apply flex flex-col gap-[8px];
        }

        &__detailedStudyInfo {
            @apply my-[14px];
        }

        &__infoHead{
            @apply text-[var(--color-primary)];
        }

        &__infoPuce {
            @apply ml-[28px];
            list-style-type: disc;
        }
    }
</style>
