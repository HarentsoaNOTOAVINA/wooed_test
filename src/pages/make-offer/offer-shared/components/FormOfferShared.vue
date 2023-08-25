<template>
    <div class="formShared__container">
        <Title type="h4" label="Faire une offre" />
        <div class="formShared__content">
            <div class="formShared__undersigned">
                <Title type="h5" label="Les soussignés(es):" />
                <div class="formShared__undersigned-content">
                    <div class="formShared__undersigned-header">
                        <div class="formShared__undersigned-profile">
                            <img
                                class="formShared__undersigned-avatar"
                                :src="
                                    store.getters['UserModule/getUserDetails']
                                        .logo ??
                                    '/src/static/images/default_profil.png'
                                "
                                alt="profile"
                            />
                        </div>
                        <span>{{
                            store.getters['UserModule/getUserDetails']
                                .firstname ?? 'Nom User'
                        }}</span>
                    </div>

                    <div class="formShared__undersigned-price">
                        <Title
                            type="h5"
                            :label="separatorMillier(resultCal) + ' €'"
                        />
                    </div>
                </div>
                <div
                    class="formShared__undersigned-content"
                    v-for="(buyer, i) in detailParticipant.buyers"
                    :key="i"
                >
                    <div class="formShared__undersigned-header">
                        <div class="formShared__undersigned-profile">
                            <img
                                class="formShared__undersigned-avatar"
                                :src="
                                    buyer.user.logo ??
                                    '/src/static/images/default_profil.png'
                                "
                                alt="profile"
                            />
                        </div>
                        <span>{{ buyer.user.name }}</span>
                    </div>

                    <div class="formShared__undersigned-price">
                        <Title
                            type="h5"
                            :label="`${separatorMillier(
                                (+buyer.quote * +dataResutlHead.prices) / 100
                            )} €`"
                        />
                    </div>
                </div>
            </div>

            <div class="formShared__percentage">
                <Input
                    label="Pourcentage"
                    input-type="number"
                    name-input="quote"
                    unity="%"
                    placeholder="0"
                    @input="handlePercent"
                    :max-length="2"
                />
            </div>

            <div class="formShared__conditions">
                <div class="formShared__textarea-title">
                    <Paragraphe class="title">Mes conditions</Paragraphe>
                    <ul class="list-disc ml-[20px]">
                        <li
                            v-for="(
                                condition, index
                            ) in dataFormOfferShared.conditions"
                        >
                            {{
                                isParticipate
                                    ? condition.description
                                    : condition
                            }}
                        </li>
                    </ul>
                </div>
                <div class="formShared__textarea-container">
                    <TextArea
                        class="formShared__textarea-form"
                        name-input="conditions"
                        :disabled-new-line="true"
                        @on-change="handleChangeConditions"
                        @submit="addConditions"
                    />
                    <div class="formShared__icon-add" @click="addConditions">
                        <AddIcon class="icon-add" />
                    </div>
                </div>
            </div>

            <div class="formShared__validity">
                <InputDate
                    class="dateValidity"
                    label="Durée de validité de l’offre"
                    name="validityDate"
                    :min="true"
                    @handle-date-format="handlePercent"
                />
                <TimePicker
                    label="heure"
                    name="hourValidity"
                    placeholder="00:00"
                />
            </div>

            <div class="formShared__notary">
                <SelectAutoComplet
                    @change-select="handleSelectNotary"
                    :options="notaries"
                    placeholder="Selectionner un notaire"
                    name="notary"
                    sub-title="Mon notaire"
                />
            </div>

            <div class="formShared__signature">
                <Singature
                    title="Signature"
                    width="100%"
                    height="120px"
                    @signature="handleSaveSign"
                    @supp="handleDeleteSign"
                    :show-btn-action="true"
                />
            </div>

            <div class="formShared__button">
                <Button
                    width="100%"
                    @on-click="onSaveOffer"
                    :disabled="disabled"
                >
                    <LoadingButton size="sm" v-if="isSaveOffer" />
                    <span>{{
                        isParticipate
                            ? "Joindre l'offre"
                            : 'Publier mon annonce'
                    }}</span>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import SelectAutoComplet from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Singature from '@/components/Display/signatureCard/SignatureCard.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { data } from '@/pages/addProduct/data';
    import MiniMailBox from '@/services/miniMailBoxService';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    let props = defineProps({
        isSaveOffer: {
            type: Boolean,
            default: false,
        },
    });

    let emit = defineEmits<{
        // (e: 'handleSaveOfferShared', data: any): void;
        (event: 'handleSaveOfferShared', value: any): void;
        (e: 'onSignOffer', value: any): void;
        (e: 'handlePassedMailBoxSeller', value: any): void;
    }>();

    interface IDataResultHead {
        details: string;
        prices: string;
        reference: string;
    }

    let route = useRoute();
    let store = useStore();
    let loadingNotary = ref<boolean>(false);
    let disabled = ref<boolean>(true);

    // let dataParamsOffer = ref<any>();
    let dataToDocs = ref<any>({
        price: 0,
        signature: '',
        nameBuyer: store.getters['UserModule/getUserDetails'].firstname,
    });

    let notaries = reactive<Array<any>>([]);
    let notaryList = ref<any>([]);
    let detailParticipant = ref<any>([]);
    let condition = ref<string>();

    let userDetail = ref<any>();
    let mailBoxSeller = ref<string>();
    let resultCal = ref<number>(0);
    let isParticipate = store.getters['MakeOfferModule/getParticipate'];
    // let isParticipate = true;

    let dataFormOfferShared = ref<any>({
        theProperty: route.params.id,
        isOneSpanSign: false,
        conditions: [],
    });

    let dataResutlHead = reactive<any>({
        details: 'Moderne',
        prices: '1000000',
        reference: 'IMM191121113154',
    });

    onMounted(async () => {
        getUserDetail();
        checkNotary();
        dataHead();
        getDetailParticipant();
        console.log(isParticipate, 'STETETETE');
    });

    function getUserDetail() {
        userDetail.value = store.getters['UserModule/getUserDetails'];

        console.log(userDetail.value, 'User details');
    }
    const dataHead = () => {
        if (
            store.getters['PropertyDetailModule/getPropertyDetail'].data !==
            null
        ) {
            Object.assign(
                dataResutlHead,
                store.getters['PropertyDetailModule/getPropertyDetail'].data
            );
            setDataMailBoxToStore();
            console.log(dataResutlHead, 'detail bien no request');
        } else {
            getDetailsBien();
        }
    };

    async function setDataMailBoxToStore() {
        if (dataResutlHead) {
            try {
                const inboxDataSeller = await getInboxById(
                    dataResutlHead.user.id
                );
                console.log(inboxDataSeller, 'INBOX SELLER');
                if (
                    inboxDataSeller &&
                    inboxDataSeller.length &&
                    inboxDataSeller[0].id !== null
                ) {
                    console.log(
                        inboxDataSeller[0].emailAddress,
                        'mail box propertaire detail'
                    );
                    mailBoxSeller.value = inboxDataSeller[0].emailAddress;
                } else {
                    // Ceci crée un inbox si on n'a pas encore un inbox
                    const param = {
                        userId: dataResutlHead.user.id,
                        name: dataResutlHead.user.name,
                    };
                    const data = await createInbox(param);
                    console.log(
                        data.emailAddress,
                        'mail box propertaire detail'
                    );

                    mailBoxSeller.value = data.emailAddress;
                }
            } catch (error) {
                console.error(error, 'Error when get or create inbox');
            }
        }
    }

    function getDetailParticipant() {
        detailParticipant.value =
            store.getters['MakeOfferModule/getDetailOfferShared'];
    }

    async function getDetailsBien() {
        try {
            await store.dispatch(
                'BienDetailModule/setDetailBien',
                route.params.id
            );

            dataResutlHead = Object.assign(
                dataResutlHead,
                store.getters['BienDetailModule/getDetailBien'].data
            );
            setDataMailBoxToStore();

            console.log(dataResutlHead, 'detail bien');
        } catch (error) {}
    }

    async function checkNotary() {
        let notaireConditionRequest: any = reactive([]);
        notaireConditionRequest = Object.assign(
            notaireConditionRequest,
            store.getters['MakeOfferModule/getNotaryList']
        );
        if (notaireConditionRequest.length > 0) {
            notaireConditionRequest = Object.assign(
                notaireConditionRequest,
                store.getters['MakeOfferModule/getNotaryList']
            );
            notaireConditionRequest.forEach((notaire: any) => {
                notaries.push({
                    value: notaire.name,
                    label: notaire.name,
                    key: notaire.id,
                });
            });

            notaryList.value = notaireConditionRequest;
        } else {
            getNotary();
        }
    }

    async function getNotary() {
        try {
            loadingNotary.value = true;
            console.log('tafiditra anaty getNotary');
            await store.dispatch('MakeOfferModule/setNotaryList');
            let notairesList: any = reactive([]);
            notairesList = Object.assign(
                notairesList,
                store.getters['MakeOfferModule/getNotaryList']
            );

            console.log('notairesList', notairesList);
            notaryList.value = notairesList;

            notairesList.forEach((notaire: any) => {
                notaries.push({
                    value: notaire.name,
                    label: notaire.name,
                    key: notaire.id,
                });
            });
        } catch (error) {
        } finally {
            loadingNotary.value = false;
        }
    }

    function handlePercent(object: any) {
        if (Object.keys(object)[0] == 'quote') {
            resultCal.value = (+dataResutlHead.prices * +object['quote']) / 100;
            console.log(dataResutlHead.prices, 'datahedae price');
            console.log(resultCal.value, 'datahedae price * 2');

            dataToDocs.value.price = resultCal.value;
        }

        dataFormOfferShared.value = { ...dataFormOfferShared.value, ...object };

        console.log(dataFormOfferShared.value, 'DATA FORM');
    }

    function handleChangeConditions(conditionTapez: string) {
        condition.value = conditionTapez;
    }

    function addConditions(e: any) {
        isParticipate
            ? dataFormOfferShared.value.conditions.push({
                  description: condition.value,
              })
            : dataFormOfferShared.value.conditions.push(condition.value);
    }

    function handleSelectNotary(valueSelected: string, option: any) {
        console.log(option.key, 'Select value');
        dataFormOfferShared.value = {
            ...dataFormOfferShared.value,
            ...{ notary: option.key },
        };
    }

    function handleSaveSign(signB64: string) {
        dataFormOfferShared.value = {
            ...dataFormOfferShared.value,
            ...{ signSimple: signB64 },
        };

        disabled.value = false;

        dataToDocs.value.signature = signB64;

        // isParticipate ? null : emit('onSignOffer', dataToDocs.value);
        emit('onSignOffer', dataToDocs.value);
        emit('handlePassedMailBoxSeller', mailBoxSeller.value);
    }

    function handleDeleteSign() {
        dataFormOfferShared.value = {
            ...dataFormOfferShared.value,
            ...{ signSimple: '' },
        };

        disabled.value = true;
    }

    function onSaveOffer() {
        emit('handleSaveOfferShared', dataFormOfferShared.value);
    }

    async function getInboxById(userId: any) {
        const data = await MiniMailBox.getInboxesById(userId);
        return data;
    }

    async function createInbox(param: any) {
        const { data } = await MiniMailBox.createInbox(param);
        return data;
    }
</script>

<style scoped lang="scss">
    .formShared {
        &__container {
            @apply ml-[10px];
        }

        &__content {
            @apply mr-[15px];
        }

        &__undersigned {
            @apply m-[10px];

            &-content {
                @apply flex justify-between bg-[var(--color-gray)] p-[15px] rounded-[8px] mt-[10px];
            }
            &-header {
                @apply inline-flex gap-[5px];
            }
            &-profile {
                @apply w-[25px] h-[25px] rounded-[25px] overflow-hidden;
            }

            &-avatar {
                @apply w-[100%] h-[100%] object-cover;
            }

            &-price {
                @apply font-semibold;
            }
        }

        &__percentage {
            @apply mt-4;
        }

        &__textarea-container {
            @apply mt-[10px];
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &__textarea-title {
            @apply mt-[15px];
        }

        &__textarea-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            flex-basis: 90%;
        }

        &__icon-add {
            @apply p-[6px] bg-[var(--color-gray)] rounded-full cursor-pointer;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__validity {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 15px;
        }

        &__notary {
            @apply mt-4;
        }

        &__signature {
            @apply mt-4;
        }

        &__button {
            @apply mt-[25px];
        }
    }

    .title {
        @apply font-semibold;
    }

    .offerShared__form :global(.label-select) {
        margin-left: 0px !important;
        font-size: large !important;
    }

    .dateValidity {
        gap: 0px !important;
    }
</style>
