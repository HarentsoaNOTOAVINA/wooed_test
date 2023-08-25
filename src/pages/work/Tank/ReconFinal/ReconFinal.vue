<template>
    <div class="work">
        <div class="work__form">
            <InputDate
                @handleDateFormatFr="handleDate($event)"
                name="dateUlt"
                label="Date ultime de réalisation du projet "
            />
            <InputDate
                @handleDateFormatFr="handleDate($event)"
                name="dateEffect"
                label="Date effective de réalisation du projet "
            />
            <InputDate
                @handleDateFormatFr="handleDate($event)"
                name="dateBrxSent"
                label="Date d'envoie du projet à Bruxelles-Environnement"
            />
            <UploadImage @uploadFileList="handleUpload" />
        </div>
        <div class="work__form">
            <Title type="h3"><u> Déclaration de conformité :</u></Title>
            <Title type="h4">Accusé de réception de dossier complet :</Title>
            <InputDate
                @handleDateFormatFr="handleDate($event)"
                name="dateUltConf"
                label="Date ultime"
            />
            <InputDate
                @handleDateFormatFr="handleDate($event)"
                name="dateEffectConf"
                label="Date effective"
            />
            <UploadImage @uploadFileList="handleUpload" />
        </div>
        <div class="work__btnContainer">
            <Button @on-click="saveWork"
                ><LoadingButton size="xs" v-if="loadingBtn" /> Enregistrer le
                travaux</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { Store, useStore } from 'vuex';
    import { computed, onBeforeMount, onMounted, ref } from 'vue';
    import { createFormData } from '@/utils/formdata/formData';
    import { Empty as AEmpty, notification } from 'ant-design-vue';

    const emit = defineEmits(['finishSaveWork']);
    const props = defineProps(['paramsWork']);
    const store: Store<any> = useStore();

    let dateUlt = ref<string>('');
    let dateEff = ref<string>('');
    let dateBrxSent = ref<string>('');
    let dateUltConf = ref<string>('');
    let dateEffectConf = ref<string>('');
    let files = ref<Array<object>>([]);
    let confFile = ref<any>();
    let loadingBtn = ref<boolean>(false);
    let paramsSave = ref<object>({
        idModel: '',
        idSubModel: '',
        idTheProperty: props.paramsWork.thePropertyId,
        idSubSection: props.paramsWork.subsection,
        idCategory: props.paramsWork.category,
    });

    onMounted(() => {
        console.log('paramswork:', props.paramsWork);
    });

    const saveWork = async () => {
        let param = {
            idModel: '',
            idSubModel: '',
            idTheProperty: props.paramsWork.thePropertyId,
            idSubSection: props.paramsWork.subsection,
            idCategory: props.paramsWork.category,
            ultimeStudyDate: dateUlt.value,
            effectiveStudyDate: dateEff.value,
            ultimeDateConformity: dateUltConf.value,
            effectiveDateConformity: dateEffectConf.value,
            sendingDateBruxEnv: dateBrxSent.value,
            document: files.value
        };
        let req = createFormData(param);
        try {
            loadingBtn.value = true;
            let res = await store.dispatch('WorksModule/setSaveWork', req);
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
            console.log('res:', res);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            emit('finishSaveWork');
        }
    };

    const handleDate = (value: any) => {
        if (value.dateUlt) {
            dateUlt.value = value.dateUlt;
        } else if (value.dateEffect) {
            dateEff.value = value.dateEffect;
        } else if (value.dateBrxSent) {
            dateBrxSent.value = value.dateBrxSent;
        } else if (value.dateUltConf) {
            dateUltConf.value = value.dateUltConf;
        } else if (value.dateEffectConf) {
            dateEffectConf.value = value.dateEffectConf;
        }
        console.log('date valu:', value);
    };

    const handleUpload = (value: any) => {
        files.value.push(value[0]);
        // if (value.norm) {
        //     normFile.value = value.norm[0].originFileObj;
        // } else if (value.conf) {
        //     confFile.value = value.conf[0].originFileObj;
        // }
        console.log('uuuuu:', files.value);
    };
</script>

<style lang="scss" scoped>
    .work {
        &__form {
            @apply flex flex-col gap-[8px];
        }
    }
</style>
