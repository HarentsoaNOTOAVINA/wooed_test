<template>
    <div class="expertMaintainsTank">
        <div class="expertMaintainsTank__back" @click="$emit('prev')">
            <BackButton />
            <Paragraphe class="expertMaintainsTank__title"
                >Trouver un expert</Paragraphe
            >
        </div>
        <hr class="separator" />

        <div class="expertMaintainsTank__list" v-if="!loading">
            <CardExpertMaintains
                :dataExpert="listExpert"
                @handleSendMail="sendMailExpert"
                :loadingBtn="loadingBtnMailSend"
                :idExpert="idExpertClicked"
            />
        </div>
        <div class="loader" v-if="loading"><Loader /></div>
    </div>
</template>

<script setup lang="ts">
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import CardExpertMaintains from '../Components/CardExpertMaintains.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { notification } from 'ant-design-vue';

    const store = useStore();
    const route = useRoute();

    let loading = ref<boolean>(true);
    let loadingBtnMailSend = ref<boolean>(false);
    let idExpertClicked = ref<number>();
    let listExpert = ref<any>();
    let region = ref<string>();
    let dataGetExpert = ref<any>({
        region: null,
        speciality: null,
    });
    let dataContactExpertTank = ref<any>({
        idTypeOfWork: null,
        idTheProperty: route.params.id,
        extProviderMail: 'anghack98@yopmail.com',
        for: null,
    });

    onMounted(async () => {
        await getIdTypeOfWork();
        await getPropertyDetailSelected();
        await getListExpertMaintainsTank();
    });

    async function getPropertyDetailSelected() {
        let data = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        dataGetExpert.value.region = data.value[0].region;
        // console.log(region.value, 'Salut salut salut');
    }

    async function getIdTypeOfWork() {
        let data = await store.dispatch('WorksModule/setMaintainsMenu');

        data.forEach((item: any) => {
            console.log(item.name, 'ITEM NAME');
            switch (item.name) {
                case 'Citernes':
                    dataContactExpertTank.value.idTypeOfWork = item.id;
                    dataGetExpert.value.speciality = 'Tank';
                    dataContactExpertTank.value.for = 'Tank';

                    break;
                case 'Chaudière':
                    dataContactExpertTank.value.idTypeOfWork = item.id;
                    dataGetExpert.value.speciality = 'Boiler';
                    dataContactExpertTank.value.for = 'Boiler';

                    break;

                default:
                    break;
            }
        });
    }

    async function getListExpertMaintainsTank() {
        try {
            loading.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/setListExpertTankBoiler',
                dataGetExpert.value
            );

            if (code == 200) {
                listExpert.value = data;
            } else if (code == 404) {
                console.log('DATA NOT FOUND LIst Expert');
            }
        } catch (error) {
            console.log('Erreur List expert en citerne');
        } finally {
            loading.value = false;
        }
    }

    async function sendMailExpert(expert: any) {
        // dataContactExpertTank.value.extProviderMail = expert.office?.mail;
        idExpertClicked.value = expert.id;
        try {
            loadingBtnMailSend.value = true;
            let { data } = await store.dispatch(
                'WorksModule/contactExpertTank',
                dataContactExpertTank.value
            );
            if (data.success && data.code == 200) {
                notification['success']({
                    message: 'Contacter Expert',
                    description: `Un e-mail a été envoyé à ${expert.office?.mail}`,
                });
            }
        } catch (error) {
            console.log("Erreur lors de l'envoie du mail");
        } finally {
            loadingBtnMailSend.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .expertMaintainsTank {
        &__back {
            @apply h-[40px] w-[40px] flex items-center;
        }

        &__title {
            @apply min-w-max text-[var(--color-gray-icon)] font-semibold gap-[8px];
        }
    }

    .loader {
        @apply mt-[100px] relative;
    }
</style>
