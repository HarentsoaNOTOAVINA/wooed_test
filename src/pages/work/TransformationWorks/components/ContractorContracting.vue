<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="ContractorContracting"
        >
            <div class="ContractorContracting__container">
                <Title
                    type="h3"
                    label="Contracter avec l’entrepreneur"
                    class="ContractorContracting__title"
                />
                <hr class="__hr" />
                <ContractorItems
                    :cardData="expertLists"
                    :id-expert-selected="idExpertSelected"
                    :sending-mail="mailSending"
                    @handle-contact="contacterExpert"
                />
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { notification } from 'ant-design-vue';
    import { list } from 'postcss';
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import ContractorItems from './ContractorItems.vue';

    interface CardData {
        id: number;
        title: string;
        numberPhone: string;
        mail: string;
    }

    const emit = defineEmits<{
        (e: 'update:showNextButton', v: boolean): void;
    }>();

    const store = useStore();
    const route = useRoute();

    let expertLists = ref<Array<any>>([]);
    let idExpertSelected = ref<number>();
    let mailSending = ref<boolean>(false);
    const breadcrumbListsData = [
        {
            label: 'Trouver un entrepreneur',
        },
    ];

    let dataToContact = ref<any>({
        thePropertyId: route.params.id,
        idTypeOfWork: null,
        extProviderMail: 'anghack98@yopmail.com',
        forDemand: 'external',
    });

    onMounted(async () => {
        await getDataIdToPost();
        await getListExpertTrans();
    });

    async function getDataIdToPost() {
        let listIdToPost = await store.getters['WorksModule/getDataIdToPost'];
        console.log(listIdToPost, 'LISTE ID TO POST');
        dataToContact.value.idTypeOfWork = listIdToPost.idTypeOfWork;

        console.log(dataToContact.value, 'dataToContact onMounted');
    }

    async function getListExpertTrans() {
        let experts = await store.dispatch('WorksModule/listExpertTrans');

        expertLists.value = experts.data;
        console.log(experts, 'LISTES EXPERT TRANS');
    }

    async function contacterExpert(data: any) {
        dataToContact.value.extProviderMail = data.mail;
        idExpertSelected.value = data.id;
        try {
            mailSending.value = true;
            let responseContact = await store.dispatch(
                'WorksModule/contactExpertTrans',
                dataToContact.value
            );

            console.log(responseContact, 'RESPONSE CONTACT');

            if (
                responseContact.data.code == 200 &&
                responseContact.data.success
            ) {
                notification['success']({
                    message: `Vous avez envoyer un e-mail à ${data.mail} pour votre travaux`,
                });
                await store.dispatch('WorksModule/setDataIdToPost', {
                    idProvider: data.id,
                });
                emit('update:showNextButton', true);
            }
        } catch (error) {
            console.error('Error contact expert work transformation:', error);
        } finally {
            mailSending.value = false;
        }
        console.log(dataToContact.value, 'DATA data data data data');
    }

    const cardData = ref<CardData[]>([
        {
            id: 1,
            title: 'Entrepreneur 1',
            numberPhone: '+32 (0)87 63 24 44',
            mail: 'entrepreneur@ml.com',
        },
        {
            id: 2,
            title: 'Entrepreneur 2',
            numberPhone: '+32 (0)87 63 24 44',
            mail: 'entrepreneur@ml.com',
        },
        {
            id: 3,

            title: 'Entrepreneur 3',
            numberPhone: '+32 (0)87 63 24 44',
            mail: 'entrepreneur@ml.com',
        },
        {
            id: 4,
            title: 'Entrepreneur 4',
            numberPhone: '+32 (0)87 63 24 44',
            mail: 'entrepreneur@ml.com',
        },
        {
            id: 5,
            title: 'Entrepreneur 5',
            numberPhone: '+32 (0)87 63 24 44',
            mail: 'entrepreneur@ml.com',
        },
        {
            id: 6,
            title: 'Entrepreneur 6',
            numberPhone: '+32 (0)87 63 24 44',
            mail: 'entrepreneur@ml.com',
        },
    ]);
</script>

<style lang="scss" scoped>
    .ContractorContracting {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
