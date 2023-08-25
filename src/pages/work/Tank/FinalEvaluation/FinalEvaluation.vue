<template>
    <div class="work">
        <div class="work__form">
            <InputDate
                @handleDateFormatFr="handleDate($event)"
                name="dateEff"
                label="Date effective de réalisation de l'évaluation"
            />
            <InputDate
                @handleDateFormatFr="handleDate($event)"
                name="dateSend"
                label="Date d'envoie de l'évaluation à Bruxelles-Environnement"
            />
            <UploadImage @uploadFileList="handleUpload" />

            <div class="work__btnContainer">
                <Button @on-click="saveWork"
                    ><LoadingButton size="xs" v-if="loadingBtn" /> Enregistrer
                    le travaux</Button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import LoadingButton from "@/components/Icon/LoadingButton.vue"
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';
    import { createFormData } from '@/utils/formdata/formData';

    const props = defineProps(['paramsWork']);
    const store: Store<any> = useStore();
    const emit = defineEmits(['finishSaveWork']);

    onMounted(() => {
        console.log('lskdjfdlfdlfdlldlllllll:', props.paramsWork);
    });
    let dateEff = ref<string>('');
    let dateSend = ref<string>('');
    let files = ref<object>();
    let loadingBtn = ref<boolean>(false);

    const saveWork = async () => {
        let param = {
            idModel: '',
            idSubModel: '',
            idTheProperty: props.paramsWork.thePropertyId,
            idSubSection: props.paramsWork.subsection,
            idCategory: props.paramsWork.category,
            ultimeDateOpinionBrux: dateSend.value,
            effectiveDateReception: dateEff.value,
            document: files.value,
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
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            emit('finishSaveWork');
        }
    };

    const handleUpload = (value: any) => {
        files.value = value;
    };

    const handleDate = (value: any) => {
        if (value.dateEff) {
            dateEff.value = value.dateEff;
        } else if (value.dateSend) {
            dateSend.value = value.dateSend;
        }
    };
</script>

<style lang="scss" scoped>
    .work {
        &__form {
            @apply flex flex-col gap-[8px];
        }
    }
</style>
