<template>
    <div class="boilerDiagnostic__diagnostic">
        <div class="boilerDiagnostic__diagnostic-nav">
            <ArrowBack @click="goBack" />
            <Paragraphe>Diagnostic</Paragraphe>
        </div>
        <hr class="separator" />

        <div class="boilerDiagnostic__content">
            <div class="boilerDiagnostic__last">
                <div class="boilerDiagnostic__content-title">
                    <Paragraphe>Dernier diagnostic chauffage PEB</Paragraphe>
                </div>
                <InputDate
                    :max="true"
                    name="datePebControls"
                    label="Date dernier diagnostic"
                    placeholder="date dernier diagnostic"
                    @handle-date-format-fr="handleChangeDataLastDiagnostic"
                />
                <div class="boilerDiagnostic__attestation">
                    <Radio
                        name="statePebControls"
                        label="Attestaton​"
                        :element="dataRadioAttestation"
                        align="horizontal"
                        @handle-change-radio="handleChangeDataLastDiagnostic"
                    />
                </div>
                <div class="boilerDiagnostic__document">
                    <label>Diagnostic (LIEN AVEC CARNET DE BORD)</label>
                    <UploadImage
                        name="document"
                        @uploadFileListWithName="handleChangeDataLastDiagnostic"
                    />
                </div>
                <Input
                    label="Coût"
                    input-type="number"
                    name-input="costPebControls"
                    placeholder="0"
                    unity="€"
                    @input="handleChangeDataLastDiagnostic"
                />
            </div>

            <a-divider style="border-color: var(--color-primary)" dashed />

            <div class="boilerDiagnostic__next">
                <div class="boilerDiagnostic__content-title">
                    <Paragraphe>Prochain diagnotic chauffage PEB</Paragraphe>
                </div>
                <div class="boilerDiagnostic__date-next">
                    <InputDate
                        :min="true"
                        name="dateNextPebControls"
                        label="Date du prochain diagnostic"
                        placeholder="date prochain diagnostic"
                        @handle-date-format-fr="handleChangeDateNextDiagnostic"
                    />
                    <Input
                        :disabled="true"
                        label="Date dernier contrôle + 5 ans"
                        :placeholder="dateLastAddFive"
                    />
                </div>
                <!-- <div class="boilerDiagnostic__document">
                    <label>Document pdf</label>
                    <UploadImage />
                </div>
                -->
            </div>

            <div class="boilerDiagnostic__button">
                <Button
                    class="btnSave"
                    @on-click="addLastNextDiagnostic"
                    :disabled="btnValidState"
                    ><LoadingButton size="xs" v-if="loadingBtn" />
                    Enregistrer</Button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Divider as ADivider, notification } from 'ant-design-vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { ref, onMounted, computed } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import ListDiagnostic from './ListDiagnostic.vue';
    import { useStore } from 'vuex';
    import moment from 'moment';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRoute } from 'vue-router';

    const emit = defineEmits<{
        (e: 'component', v: any): void;
        (e: 'prev'): void;
    }>();

    const route = useRoute();
    const store = useStore();

    let btnValidState = ref<boolean>(true);
    let loadingBtn = ref<boolean>(false);
    let dateLastAddFive = ref<any>(moment().format('L'));
    let dataToPostLastDiagnostic = ref<any>({
        thePropertyId: route.params.id,
        statePebControls: 'Conforme',
    });
    let dataToPostNextDiagnostic = ref<any>({
        thePropertyId: route.params.id,
    });

    let dataRadioAttestation = ref<any>([
        {
            label: 'Conforme',
            value: 'Conforme',
        },
        {
            label: 'Non conforme',
            value: 'Non conforme',
        },
    ]);

    onMounted(() => {
        let listId = computed(
            () => store.getters['WorksModule/getDataIdToPost']
        );

        dataToPostLastDiagnostic.value.typeOfWork = listId.value.idTypeOfWork;
    });

    function handleChangeDataLastDiagnostic(value: any) {
        dataToPostLastDiagnostic.value = {
            ...dataToPostLastDiagnostic.value,
            ...value,
        };

        console.log(
            dataToPostLastDiagnostic.value,
            'dataToPostLastDiagnostic Last'
        );
        checkBtn();

        if (value['datePebControls']) {
            const date = moment(
                dataToPostLastDiagnostic.value.datePebControls,
                'D/M/YYYY'
            );

            dateLastAddFive.value = date.add(5, 'years').format('DD-MM-YYYY');

            console.log(dataToPostLastDiagnostic.value.datePebControls, 'DATE');
            console.log(date, 'DATE DE LA dyagnostic');
            console.log(dateLastAddFive.value, 'DAte + 5 ans');
        }
    }

    function handleChangeDateNextDiagnostic(value: any) {
        dataToPostNextDiagnostic.value = {
            ...dataToPostNextDiagnostic.value,
            ...value,
        };
        checkBtn();
        console.log(
            dataToPostNextDiagnostic.value,
            'dataToPostNextDiagnostic Next '
        );
    }

    async function addLastNextDiagnostic() {
        console.log(dataToPostLastDiagnostic.value, 'dataToPostLastDiagnostic');
        console.log(dataToPostNextDiagnostic.value, 'dataToPostNextDiagnostic');

        try {
            loadingBtn.value = true;

            let resulta = await store.dispatch(
                'WorksModule/addLastControlBoiler',
                dataToPostLastDiagnostic.value
            );

            let resultaNext = await store.dispatch(
                'WorksModule/addNextControlBoiler',
                dataToPostNextDiagnostic.value
            );

            if (
                resultaNext.data.code == 200 &&
                resultaNext.data.success &&
                resulta.data.code == 200 &&
                resulta.data.success
            ) {
                notification['success']({
                    message: 'Diagnostique ajouter',
                    description: 'La date de diagnostique ajouter avec success',
                });

                goBack();
            }
        } catch (error) {
        } finally {
            loadingBtn.value = false;
        }
    }

    function goBack() {
        emit('prev');
    }

    function checkBtn() {
        return dataToPostNextDiagnostic.value.dateNextPebControls &&
            dataToPostLastDiagnostic.value.datePebControls &&
            dataToPostLastDiagnostic.value.costPebControls
            ? (btnValidState.value = false)
            : (btnValidState.value = true);
    }
</script>

<style scoped lang="scss">
    .boilerDiagnostic {
        &__diagnostic {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__diagnostic-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }

        &__attestation {
            @apply mt-[12px];
        }

        &__content-title {
            @apply font-semibold mb-[12px];

            p {
                @apply text-base;
            }
        }

        &__date-next {
            @apply grid gap-[10px];
            grid-template-columns: 1fr;

            @screen md {
                grid-template-columns: 1fr 1fr;
            }
        }
    }
    .btnSave {
        @screen md {
            @apply flex justify-end;
        }
        &:deep() {
            .button__primary {
                @apply w-full;

                @screen md {
                    width: fit-content;
                }
            }
        }
    }

    label {
        @apply text-sm font-[500] text-[var(--color-gray-icon)];
    }

    .separator {
        @apply my-[15px];
    }
</style>
