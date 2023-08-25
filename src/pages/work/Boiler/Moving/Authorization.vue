<template>
    <div class="boilerMove__authorization">
        <div class="boilerMove__authorization-nav">
            <ArrowBack @click="$emit('prev')" v-if="!responseAdded" />
            <Paragraphe>{{ titleNav }}</Paragraphe>
        </div>
        <hr class="separator" />
        <div class="boilerMove__message" v-if="!responseAdded">
            <Paragraphe class="message-title"
                >Demandez par écrit l’autorisation à l’autorité compétente avant
                de remplacer la chaudière
            </Paragraphe>
            <div class="boilerMove__alert">
                <Warning />Attendez toujours l’autorisation officielle pour
                procéder à ces changements.
            </div>

            <div class="boilerMove__inputDate">
                <InputDate
                    v-if="!hasDemand"
                    name="date"
                    :max="true"
                    @handle-date-format-fr="handleDate"
                />
                <div class="boilerMove__date" v-if="hasDemand">
                    <Paragraphe class="demande-date"
                        >Demande du {{ moment(dateDemande).format('LL') }}
                    </Paragraphe>
                    <Paragraphe class="demande-status">en attente</Paragraphe>
                </div>
            </div>

            <div class="boilerMove__demand-btn" v-if="!hasDemand">
                <Button :disabled="disabled" @on-click="sendRequestAutorization"
                    ><LoadingButton size="xs" v-if="loadRequest" /> Envoyer la
                    demande</Button
                >
            </div>
        </div>

        <div class="boilerMove__response" v-if="hasDemand && !responseAdded">
            <a-divider style="border-color: var(--color-primary)" dashed />
            <div class="boilerMove__response-switch">
                <Switch
                    item-label="Avez-vous reçu la réponse des autorités ?"
                    name="response"
                    @handle-switch="handleSwitch"
                />
            </div>
            <div class="boilerMove__response-btn" v-if="hasResponse">
                <Button @on-click="sendResponse"
                    ><LoadingButton size="xs" v-if="loadResponse" /> Ajouter la
                    réponse</Button
                >
            </div>
        </div>

        <div class="boilerMove__storageType" v-if="responseAdded">
            <Paragraphe class="boilerMove__storage-title"
                >Le réservoir est couvert par :</Paragraphe
            >
            <ul class="type-storage">
                <li @click="sendMailCommune">
                    Une déclaration de classe 3 introduite auprès de la commune
                    <LoadingButton v-if="loadingSentMail" />
                </li>
                <li @click="sendMailCommune">
                    Un permis d’environnement délivré par la commune
                    <LoadingButton v-if="loadingSentMail" />
                </li>
                <li @click="sendMailEnvironment">
                    Un Permis d’environnement délivré par
                    Bruxelles-Environnement
                    <LoadingButton v-if="loadingSentMail" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Warning from '@/components/Icon/Warning.vue';
    import { notification, Divider as ADivider } from 'ant-design-vue';
    import { ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import moment from 'moment';
    import Switch from '@/components/Common/Switch/Switch.vue';

    const emit = defineEmits<{
        (e: 'prev'): void;
    }>();

    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    let titleNav = ref<string>('Autorisation de responsable');
    let disabled = ref<boolean>(true);
    let loadRequest = ref<boolean>(false);
    let loadResponse = ref<boolean>(false);
    let hasDemand = ref<boolean>(false);
    let responseAdded = ref<boolean>(false);
    let hasResponse = ref<boolean>(false);
    let loadingSentMail = ref<boolean>(false);
    let dateDemande = ref<string>('09/02/2023');
    let dataToSendRequest = ref<any>({
        thePropertyId: route.params.id,
        typeOfWorkId: null,
        subsection: null,
        date: null,
        link: 'http://immoch.loc/mail',
    });
    let dataToGetDemandList = ref<any>({
        thePropertyId: route.params.id,
        typeofWorkId: null,
        subsection: null,
        category: null,
    });
    let now = moment().format('L');
    let dataToSendResponse = ref<any>({
        idDemand: null,
        date: now,
        link: 'http://test-mail.link',
    });
    let dataToSendMail = ref<any>({
        idTheProperty: route.params.id,
        extProviderMail: 'maeryi@gmail.com',
        for: null,
    });

    onMounted(async () => {
        console.log(dataToSendResponse.value, 'INITIAL ');

        await getAllIdStore();
    });

    async function getAllIdStore() {
        let data = computed(() => store.getters['WorksModule/getDataIdToPost']);
        dataToSendRequest.value.typeOfWorkId = data.value.typeOfWorkId;
        dataToSendRequest.value.subsection = data.value.idSubSection;
        dataToGetDemandList.value.typeofWorkId = data.value.typeOfWorkId;
        dataToGetDemandList.value.subsection = data.value.idSubSection;

        await store.dispatch(
            'WorksModule/setListDemandDoubleTank',
            dataToGetDemandList.value
        );
        const response: any = await computed(
            () => store.getters['WorksModule/getListDemandDoubleTank'].data
        );

        if (response.value.data.length > 0) {
            console.log(response.value, 'BIG RESPONSE');
            hasDemand.value = true;
            dateDemande.value = response.value.data[0].date;
            dataToSendResponse.value.idDemand = response.value.data[0].id;
        } else {
            console.log(response.value, 'NO RESPONSE');
        }
    }

    function handleDate(date: object) {
        dataToSendRequest.value = { ...dataToSendRequest.value, ...date };
        dataToSendRequest.value.date != 'undefined/NaN/undefined'
            ? (disabled.value = false)
            : (disabled.value = true);
    }

    async function handleSwitch(value: any) {
        hasResponse.value = value.response;
    }

    async function sendRequestAutorization() {
        console.log(dataToSendRequest.value, 'DATA To POs');
        try {
            loadRequest.value = true;
            let response = await store.dispatch(
                'WorksModule/setDemandDoubleTank',
                dataToSendRequest.value
            );
            let status = response.status;
            let statusError = response.data.code;

            if (status === 200 && statusError === 200) {
                notification['success']({
                    message: 'Votre demande a bien été envoyer',
                });
                emit('prev');
            } else if (statusError == 412) {
                notification['warn']({
                    message: 'Vous avez déjà de demande en cours',
                    description:
                        'Attendez la réponse des autorité avant de procéder a une nouvelle demande',
                });
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            loadRequest.value = false;
        }
    }

    async function sendResponse() {
        try {
            loadResponse.value = true;
            let response = await store.dispatch(
                'WorksModule/setRespondDemandDoubleTank',
                dataToSendResponse.value
            );

            if (response.data.code == 200 && response.data.success) {
                notification['success']({
                    message: 'Votre Reponse a été bien ajouter',
                });
                responseAdded.value = true;
                titleNav.value = 'Type réservoir';
            }
        } catch (error) {
            notification['error']({
                message: 'Veuillez réessayer',
                description:
                    "Une erreur est survenue lors de l'envoye de votre reponse...",
            });
        } finally {
            loadResponse.value = false;
        }
    }

    function sendMailCommune() {
        senMail('commune');
    }

    function sendMailEnvironment() {
        senMail('environment');
    }

    async function senMail(mailTo: string) {
        dataToSendMail.value.for = mailTo;
        try {
            loadingSentMail.value = true;
            let response = await store.dispatch(
                'WorksModule/sendMailForDemandBoiler',
                dataToSendMail.value
            );

            if (response.data.code === 200 && response.data.success) {
                notification['success']({
                    message: `Un e-mail a été envoyé ${
                        mailTo == 'commune'
                            ? 'au service environnement de la commune'
                            : ' à la Bruxelles-Envrionnement'
                    }`,
                });
                emit('prev');
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            loadingSentMail.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .boilerMove {
        &__authorization {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__authorization-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }

        &__alert {
            @apply my-[5px] bg-[var(--color-gray)] p-[6px] rounded-[4px] italic;
        }
        &__btn {
            @apply flex justify-end;
        }
        &__date {
            @apply flex items-center justify-between gap-[10px] my-[15px];
        }
        &__response {
            @apply mt-[15px];
        }
        &__response-btn,
        &__demand-btn {
            @apply mt-[15px] flex justify-end;
        }

        &__storage-title {
            @apply font-semibold mb-[7px];
        }
    }

    .type-storage {
        @apply p-[5px] rounded-[8px];
        border: 1px solid var(--color-primary);
    }

    .type-storage > li {
        @apply m-[5px] p-[5px] rounded-[5px];
        border: 1px solid var(--color-gray);
    }

    .type-storage > li:hover {
        @apply bg-[var(--color-gray)];
    }

    .demande-date {
        @apply font-semibold;
    }

    .demande-status {
        @apply p-[7px] rounded-[8px] text-[var(--color-warn)];
        border: solid 1px var(--color-warn);
    }
    .separator {
        @apply my-[15px];
    }

    .message-title {
        @apply font-medium;
    }
</style>
