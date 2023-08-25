<template>
    <div class="Electricien__container">
        <div class="Electricien__content-title">
            <Paragraphe class="title"
                >Plombier disponibles à proximité</Paragraphe
            >
            <Button
                type-button="border"
                v-if="mailSent"
                @on-click="saveWorkEmergency"
                ><LoadingButton size="sm" v-if="loadingBtnSave" /> Enregistrer
                le travaux</Button
            >
        </div>
        <div class="Electricien__content-result">
            <CardExpertEmergency
                v-if="!loading"
                :data-expert-emergency="listExpertEmergencyElec"
                @send-mail="handleSendMail"
                :loading-btn="loadingBtn"
                :mail-sent="mailSent"
                :id-expert="expertId"
            />
            <Loader class="loading" v-if="loading" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import CardExpertEmergency from '../Components/CardExpertEmergency.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { notification } from 'ant-design-vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { useRoute } from 'vue-router';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import router from '@/routes';

    const store: Store<any> = useStore();
    const route = useRoute();

    let listExpertEmergencyElec = ref<any>([]);
    let loading = ref<boolean>(false);
    let loadingBtn = ref<boolean>(false);
    let loadingBtnSave = ref<boolean>(false);
    let mailSent = ref<boolean>(false);
    let expertId = ref<number>();
    let dataPostMail = ref<any>({
        thePropertyId: route.params.id,
        idTypeOfWork: null,
        forDemand: 'plumbers',
        extProviderMail: null,
    });
    let dataRegisterEmergencyWork = ref<any>({
        expertId: null,
        thePropertyId: route.params.id,
        typeOperation: 'Plomberie ',
    });

    onMounted(() => {
        getListElectric();
    });
    async function getListElectric() {
        try {
            loading.value = true;
            await store.dispatch('WorksModule/setListPlumber');

            let { code, data } = store.getters['WorksModule/getListPlumber'];

            if (code === 200) {
                listExpertEmergencyElec.value = [...data];

                console.log(listExpertEmergencyElec.value, 'Data companaty');
            }
        } catch (error) {
            console.log(error, 'Erreur list Expert');
        } finally {
            loading.value = false;
        }
    }

    async function handleSendMail(Expert: any) {
        console.log(Expert, 'Expert to contact');
        expertId.value = Expert.id;
        dataRegisterEmergencyWork.value.expertId = Expert.id;
        dataPostMail.value.extProviderMail = Expert.email;

        try {
            loadingBtn.value = true;
            let result = await store.dispatch(
                'WorksModule/sendMailExpertEmergency',
                dataPostMail.value
            );

            if (result.data.code === 200 && result.data.success) {
                notification['success']({
                    message: 'Expert contacter',
                    description: `Une E-mail a été envoyée à ${Expert.email}.`,
                });
                mailSent.value = true;
            }
        } catch (error) {
            console.log(error, 'Erreur list Expert');
        } finally {
            loadingBtn.value = false;
        }
    }

    async function saveWorkEmergency() {
        try {
            loadingBtnSave.value = true;
            let res = await store.dispatch(
                'WorksModule/registerWorEmergency',
                dataRegisterEmergencyWork.value
            );
            console.log(res, 'RESULTAT');

            if (res.status === 200) {
                notification['success']({
                    message: 'Travaux enregitrer',
                    description: "Votre travaux d'urgent a été bien enregitrer",
                });
                mailSent.value = false;
                router.push('/');
            } else {
                notification['error']({
                    message: 'Travaux Non enregitrée',
                    description:
                        "Erreur de l'enregistrement de Travaux d'urgent",
                });
            }
        } catch (error) {
            notification['error']({
                message: 'Travaux Non enregitrée',
                description: "Erreur enregistrement Travaux de d'urgent",
            });
            // console.log(error, "Erreur enregistrement Travaux de d'urgent");
        } finally {
            loadingBtnSave.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .Electricien {
        &__content-title {
            @apply py-[15px] border-y-[4px] border-y-[var(--color-gray)] mb-[10px] flex justify-between items-center;
        }
        &__container {
            @apply w-full bg-[#fff] rounded-[8px] p-[15px] h-full;
            @screen md {
                height: calc(100vh - 100px);
            }
        }
        &__content-result {
            @apply relative;
        }
    }

    .title {
        @apply text-[16px] font-semibold sm:text-[24px] my-[18px] text-[var(--color-primary)];
    }

    .noExpert {
        @apply flex justify-center w-full;
    }
    .loading {
        @apply mt-[50px] bg-[#fff] w-full h-[100px] rounded-[8px];
    }
</style>
