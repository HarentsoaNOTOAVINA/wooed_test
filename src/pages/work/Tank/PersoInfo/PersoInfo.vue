<template>
    <div class="work">
        <div class="work__form">
            <!-- <Title type="h3"><u>Une copie de la carte d'identité :</u></Title> -->

            <Paragraph
                ><u class="work__title">Une copie de la carte d'identité</u>
                <span>
                    du demandeur ou, pour les personnes morales, une copie de la
                    carte d'identité du gérant ou de toute autre personne
                    morale. Cependant, cette copie n'est pas nécessaire lorsque
                    vous passez par le guichet électronique de la Region</span
                ></Paragraph
            >
            <UploadImage name="cin" @uploadFileListWithName="handleUpload" />
            <Paragraph
                ><u class="work__title"
                    >Une copie de la facture relative à la réalisation de
                    travaux de traitement de pollution</u
                >
                <span>
                    faisant l'objet de la demande de prime, établie au nom du
                    demandeur par un entrepreneur en assainissement du sol,
                    datée et signée par ce dernier. Dans le cas d'une étude du
                    sol ou de travaux de traitement de pollution concernant une
                    ou plusieurs pollutions mélangées et/ou uniques, la facture
                    établie par l'expert en pollution du sol ou par
                    l'entrepreneur en assainissement devra indiquer clairement
                    les couts relatifs à la partie de l'étude du sol ou de
                    travaux de traitement de pollution concernant uniquement la
                    ou les pollution orphelines</span
                ></Paragraph
            >
            <UploadImage
                name="factureRelative"
                @uploadFileListWithName="handleUpload"
            />

            <Paragraph
                ><u class="work__title"
                    >Une preuve de paiement de la facture ,</u
                >
                <span
                    >datée et signée par le demandeur de la prime. On entend par
                    preuve de payement, un extrait de compte bancaire qui prouve
                    que le payement, un extrait de compte bancaire qui prouve
                    que le payement a bien été effectué (preuve de débit).</span
                ></Paragraph
            >
            <UploadImage
                name="paiementFacture"
                @uploadFileListWithName="handleUpload"
            />
            <div class="work__btnContainer">
                <Button @on-click="saveWork"
                    ><LoadingButton size="xs" v-if="loadingBtn" />
                    Enregistrer</Button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { Store, useStore } from 'vuex';
    import { createFormData } from '@/utils/formdata/formData';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { ref } from 'vue';

    const emit = defineEmits(['finishSaveWork']);
    const props = defineProps(['paramsWork']);
    const store: Store<any> = useStore();

    let docCin = ref<object>();
    let factureRelative = ref<object>();
    let paiementFacture = ref<object>();
    let loadingBtn = ref<boolean>();
    let paramsSave = ref<object>({
        idModel: '',
        idSubModel: '',
        idTheProperty: props.paramsWork.thePropertyId,
        idSubSection: props.paramsWork.subsection,
        idCategory: props.paramsWork.category,
    });
    let docs = ref<Array<any>>([]);

    const saveWork = async () => {
        paramsSave.value = { ...paramsSave.value, document: docs.value };
        let req = createFormData(paramsSave.value);
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
            console.log('res res:', res);
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

    const handleUpload = (value: any) => {
        if (value.cin) {
            docs.value.push(value.cin[0]);
            docCin.value = value.cin;
        } else if (value.factureRelative) {
            docs.value.push(value.factureRelative[0]);
            factureRelative.value = value.factureRelative;
        } else if (value.paiementFacture) {
            docs.value.push(value.paiementFacture[0]);
            paiementFacture.value = value.paiementFacture;
        }
        // console.log('val up:', docs.value);
    };
</script>

<style lang="scss" scoped>
    .work {
        @apply mt-[14px];
        &__form {
            @apply flex flex-col gap-[8px];
        }

        &__title {
            @apply text-lg text-[var(--color-primary)];
        }
    }
</style>
