<template>
    <div class="work">
        <div v-if="otherTank" class="work__head">
            <Paragraphe fontSize="16px"
                >Veuillez spécifié le rubrique de votre reservoir:</Paragraphe
            >
            <RadioButton
                @get-radio-input="getElementRadio"
                :element="elementRadioBtn"
            />
        </div>
        <Paragraphe fontSize="16px" class="work__infoText"
            >Voulez vous envoyer votre demande au service environnement de la
            commune?</Paragraphe
        >
        <UploadImage @uploadFileList="handleUpload" />
        <div class="work__btnContainer">
            <Button @on-click="onCancel">Annuler</Button>
            <Button @on-click="sendDemand"
                ><LoadingButton size="xs" v-if="btnLoad" /> Envoyer la
                demande</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';

    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import RadioButton from '@/components/Common/RadioButton/RadioButton.vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import { computed, ref } from 'vue';
    import { elementRadioBtn } from './data';
    import { createFormData } from '@/utils/formdata/formData';

    const props = defineProps(['otherTank']);
    const store: Store<any> = useStore();
    const route = useRoute();
    const router = useRouter();
    let btnLoad = ref<boolean>(false);
    let typeTank = ref<string>('');
    let doc = ref<any>();
    const emit = defineEmits(['onCancel']);

    const handleUpload = (value: any) => {
        doc.value = value;
        console.log('uuuup', doc.value);
    };

    const getElementRadio = (value: any) => {
        typeTank.value = value.target.value;
        console.log('value element:', value.target.value);
    };

    const sendDemand = async () => {
        let params: object = {
            idTheProperty: route.params.id,
            extProviderMail: 'mae7ryi@gmail.com',
            for: 'environment',
            documents: doc.value,
        };

        if (props.otherTank) {
            params = {
                ...params,
                typeTank: typeTank.value,
            };
        }

        let req = createFormData(params);
        console.log('req:', req);

        try {
            btnLoad.value = true;
            await store.dispatch('WorksModule/setContactMunicipality', req);
            const data = computed(
                () => store.getters['WorksModule/getContactMunicipality']
            );
            let status = data.value.data.code;
            console.log("suucc:", data.value.data.code)
            if (status === 200) {
                notification['success']({
                    message: 'Votre demande a bien été envoyer',
                });
            }
            btnLoad.value = false;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoad.value = false;
            // router.go(0);
        }
        emit('onCancel');
    };

    const onCancel = () => {
        emit('onCancel');
    };
</script>

<style lang="scss" scoped>
    .work {
        &__head {
            @apply flex flex-col gap-[14px];
        }
        &__infoText {
            color: var(--color-primary);
        }
        &__btnContainer {
            @apply flex my-[14px] justify-end gap-[10px];
        }

        &:deep() {
            .ant-radio-group {
                @apply flex flex-row gap-[14px];
            }
            .app-radio-value-number {
                @apply hidden;
            }
        }
    }
</style>
