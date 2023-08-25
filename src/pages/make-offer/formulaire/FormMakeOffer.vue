<template>
    <!-- Head 'Faire une offre' mobile -->
    <div class="offer__head-mobile">
        <InfoIcon class="offer__head-info-icon" @click="handleShowModal" />
        <Title
            type="h3"
            :label="title"
            weight="bold"
            class="offer__head-mobile-title"
            @click="handleShowModal"
        />

        <Modal
            class="mobile-modal"
            title="Aperçu du document"
            :is-show-modal="isShow"
            @on-back="onOpenModal"
        >
            <template #content>
                <DocsResult
                    :names="names"
                    :conditions="conditions"
                    :price-offer="priceOffer"
                    :image-signature="signature"
                    :condition-credit-amount="conditionCreditAmount"
                    :duration-credit="durationCredit"
                    :date-offer="dateOffer"
                    :deposit-signature="depositSignature"
                    :document-dwelling="documentDwelling"
                    :document-date="documentDate"
                    :condition-showing-suspens="conditionShowingSuspens"
                    :has-input-hidden="hasInputHidden"
                    :notary-name="signatureNotary"
                />
            </template>
        </Modal>
    </div>

    <!-- Head 'Faire une offre' desktop -->
    <div class="offer__head-desktop">
        <BreadCrumb :items="breadCrumbContent" />
        <!--<Paragraphe class="ml-3.5">
            Détails du bien | <span class="font-bold"> Faire une offre </span>
        </Paragraphe>-->
    </div>
    <!-- Loading' -->
    <div>
        <Loader v-if="loadingNotary" />
    </div>
    <!-- Froms to add new 'Faire une offre' -->
    <TransitionComponent v-if="showForm && !loadingNotary">
        <div class="offer__content">
            <div class="offer__title-content">
                <Title
                    type="h4"
                    :label="titleContent"
                    weight="bold"
                    class="offer__title"
                />
            </div>
            <hr class="separator-form" />

            <div class="offer__content-inline-lg">
                <div class="offer__content-form">
                    <div
                        v-for="(element, index) in elementOffer"
                        :key="index"
                        class="mb-3.5"
                    >
                        <p class="title-input-dark">{{ element.titleInput }}</p>
                        <div :class="element.class">
                            <span class="offer__form-label">
                                {{ element.title }}
                            </span>

                            <ul
                                class="condtion-list"
                                v-if="element.hasListCondition"
                            >
                                <li
                                    v-if="conditions.length === 0"
                                    class="list-disc ml-6 text-xs italic"
                                >
                                     N’oubliez pas d’appuyer sur + si vous
                                    souhaitez émettre plusieurs conditions
                                </li>
                                <li
                                    class="list-decimal ml-6"
                                    v-for="(condition, index) in conditions"
                                    :key="index"
                                >
                                    <div class="conditions-close" :key="index">
                                        {{ condition }}
                                        <Delete
                                            class="del"
                                            @click="deleteList(index, 'cond')"
                                        />
                                    </div>
                                </li>
                            </ul>

                            <div v-if="element.hasRadio">
                                <Radio
                                    :element="element.dataRadio"
                                    :align="element.align"
                                    class="radioElementClass"
                                    :radio-default-check="
                                        element.dataRadio[0].value
                                    "
                                    :name="element.checkGroup"
                                    @get-radio-input="handleChangeRadio($event)"
                                />
                            </div>

                            <div
                                v-if="element.hasCheckBox"
                                class="destionation__checkBox-content"
                            >
                                <div
                                    class="checkBoxElement"
                                    v-for="(
                                        dataCheck, index
                                    ) in element.dataRadio"
                                >
                                    <CheckBox
                                        class="destionation__checkbox"
                                        :return-boolean="true"
                                        :name="dataCheck.value"
                                        :label="dataCheck.label"
                                        :value="dataCheck.value"
                                        @clickWithValue="handleCheckBox"
                                    />
                                </div>
                            </div>
                        </div>

                        <ul class="name-list" v-if="element.name">
                            <li
                                v-if="names.length === 0"
                                class="list-disc ml-6 text-xs italic"
                            >
                                 N’oubliez pas d’appuyer sur + si vous souhaitez
                                émettre l’offre au nom de plusieurs personnes
                            </li>
                            <li
                                v-for="(listName, iList) in names"
                                :key="iList"
                                class="list-disc ml-6"
                            >
                                <div class="conditions-close" :key="index">
                                    {{ listName }}
                                    <Delete
                                        class="del"
                                        @click="deleteList(index, 'name')"
                                    />
                                </div>
                            </li>
                        </ul>

                        <div
                            :class="`offer__form-inline ${
                                element.hasAdd ? 'flex-nowrap' : 'flex-wrap'
                            }`"
                        >
                            <div
                                v-for="(data, key) in element.dataInput ||
                                element.dataArea ||
                                element.dataSelect"
                                :key="key"
                                class="offer__form-input"
                            >
                                <AppInput
                                    :name-input="data.id"
                                    :label="data.label"
                                    :inputType="data.type"
                                    :value="paramsInput[data.id]"
                                    :class="` ${
                                        element.hasAdd || element.hasInputFull
                                            ? 'basis-full'
                                            : ''
                                    }`"
                                    :placeholder="data.placeholder"
                                    :id="data.id"
                                    v-if="
                                        element.conditionShowingSuspens &&
                                        !element.hasTextArea &&
                                        !element.isDateFormat &&
                                        !data.showAlign
                                    "
                                    @input="handleInput($event)"
                                    @blur="handleAddNameCondition(data.id)"
                                    :maxLength="data.maxLength"
                                    :unity="data.unity"
                                />

                                <!-- @handle-date-format="handleValidity" -->
                                <InputDate
                                    class="dateDocument"
                                    v-if="data.showAlign"
                                    :placeholder="moment().format('DD-MM-YYYY')"
                                    :disable="true"
                                    label="Le"
                                    name="datedAt"
                                    :min="true"
                                />

                                <div v-if="element.hasTextArea" class="w-full">
                                    <textarea
                                        class="textarea-conditions"
                                        @input="handleTextarea($event)"
                                        @blur="handleAddNameCondition(data.id)"
                                        :placeholder="data.placeholder"
                                        :name="data.id"
                                        :id="data.id"
                                        cols="30"
                                        rows="3"
                                        autocapitalize="sentences"
                                    ></textarea>
                                </div>
                                <span v-if="element.conditionShowingSuspens">{{
                                    data.unitMesure
                                }}</span>

                                <div
                                    class="offer__autocomplet-select"
                                    v-if="element.hasSelect"
                                >
                                    <label for="" class="label-select"
                                        >Mon notaire  est</label
                                    >
                                    <a-select
                                        style="width: 100%"
                                        show-search
                                        placeholder="Selectionner un notaire"
                                        :options="notaries"
                                        @focus="handleFocus"
                                        @blur="handleBlur"
                                        @change="handleChange"
                                    ></a-select>
                                </div>

                                <div
                                    class="offer__icon-add"
                                    v-if="element.hasAdd"
                                    @click="handleAddNameCondition(data.id)"
                                >
                                    <AddIcon class="icon-add" />
                                </div>
                            </div>
                        </div>
                        <div
                            class="offer__validity-date"
                            v-if="element.isDateFormat"
                        >
                            <InputDate
                                label="Durée de validité de l’offre"
                                name="validityDate"
                                :min="true"
                                @handle-date-format="handleValidity"
                            />
                            <TimePicker
                                label="heure"
                                name="hourValidity"
                                placeholder="00:00"
                            />
                        </div>
                    </div>

                    <!-- This is the signature -->
                    <div
                        class="offer__signature"
                        v-if="signatureOfferedCondition"
                    >
                        <Singature
                            title="Signature"
                            width="100%"
                            height="120px"
                            @signature="saveSignature"
                            @supp="deleteSignature"
                            :show-btn-action="true"
                        />

                        <p
                            v-if="dataParams.clientSign === ''"
                            class="text-xs italic"
                        >
                            N'oublie pas de valider votre signature
                        </p>
                    </div>
                    <hr />

                    <div class="offer__btn-valid">
                        <Button
                            class="btn-valid-content"
                            width="100%"
                            :disabled="btnDisabled || loading"
                            @on-click="makeOffer"
                        >
                            <LoadingButton size="sm" v-if="loading" />
                            <span>Enregistrer</span>
                        </Button>
                    </div>
                </div>

                <!-- This is the docs result of the form -->
                <div class="offer__content-result" id="documentPdf">
                    <DocsResult
                        :has-title="true"
                        titleResult="Aperçu du document"
                        :names="names"
                        :conditions="conditions"
                        :price-offer="priceOffer"
                        :image-signature="signature"
                        :condition-credit-amount="conditionCreditAmount"
                        :duration-credit="durationCredit"
                        :date-offer="dateOffer"
                        :deposit-signature="depositSignature"
                        :document-dwelling="documentDwelling"
                        :document-date="documentDate"
                        :condition-showing-suspens="conditionShowingSuspens"
                        :has-input-hidden="hasInputHidden"
                        :notary-name="signatureNotary"
                    />
                </div>
            </div>
        </div>
    </TransitionComponent>
</template>
<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import AppInput from '@/components/Common/Input/Input.vue';
    import Singature from '@/components/Display/signatureCard/SignatureCard.vue';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import Delete from '@/components/Icon/deleteRoudedBG.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import DocsResult from '@/components/Display/DocOffer/DocOffer.vue';
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import ASelect, {
        DefaultOptionType,
        SelectValue,
    } from 'ant-design-vue/lib/select';
    import OfferService from '@/services/offerService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    import { useRoute, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { elementOffer, params } from './dataFormMakeOffer';
    import { message, notification } from 'ant-design-vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import moment from 'moment';
    import jsPDF from 'jspdf';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';

    interface IDataParams {
        name: string;
        conditions: string;
        conditionSuspens: string;
        prices?: string;
        credit?: string;
        delay?: string;
        validityDate?: string;
        payementDate?: string;
        city?: string;
        datedAt?: string;
        theProperty?: any;
        destination?: string;
        notary?: string;
        paymentRule?: string;
        withcondition?: boolean;
        clientSign?: string;
        clientClauses?: Array<Object>;
        isOnSpanSign?: boolean;
        clientUrl?: string;
        thePropertyDetailUrl?: string;
        siteUrl?: string;
    }

    const router = useRouter();
    const route = useRoute();
    let notaries = reactive<Array<any>>([]);
    let notaryList = ref<any>([]);
    const store: Store<any> = useStore();

    let isShow = ref<boolean>(false);
    let signature = ref('');
    let priceOffer = ref(0);
    let conditionCreditAmount = ref(0);
    let durationCredit = ref(0);
    let dateOffer = ref(new Date().toString());
    let depositSignature = ref(0);
    let documentDwelling = ref();
    let documentDate = ref(moment().format('L'));
    let hasInputHidden = ref(false);
    let signatureNotary = ref();
    let title = "Voir l'aperçu du document";
    let titleContent = 'Faire une offre';
    let valPaymentRuleType = ref<any>('');

    const paramsInput = ref<any>(params);

    const btnDisabled = ref(true);
    const loading = ref(false);

    let conditionShowingSuspens = ref(true);
    let signatureOfferedCondition = ref(true);
    let showForm = ref(false);
    let loadingNotary = ref(false);

    let dataParams = ref<IDataParams>({
        name: '',
        conditions: '',
        conditionSuspens: 'withCondition',
        withcondition: true,
        destination: 'client',
        isOnSpanSign: false,
        clientSign: '',
        datedAt: moment().format('YYYY-MM-DD'),
    });

    let dataMiniBoiteMail = ref<any>({
        emailTo: [],
        attachements: [],
        inbox: 3,
        subjet: 'Offres sur votre bien',
        body: 'Voici ci-joint mon offre sur cette bien',
        category: 'offer',
    });

    let names: any = reactive([]);
    let conditions: any = reactive([]);
    console.log('conidtions initila', conditions);

    // On mounted
    onMounted(() => {
        //
        const dateNow = moment().format('YYYY-MM-DD');
        console.log(dateNow, 'DATE NOW');
        showForm.value = true;
        console.log(
            'route details',
            `"${window.location.origin}/detail/${route.params.id}"`
        );
        console.log('route accueil', `"${window.location.origin}/"`);
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

        dataParams.value = {
            ...dataParams.value,
            ...{ theProperty: route.params.id },
            ...{ clientUrl: 'liens vers les listes des offres' },
            ...{
                thePropertyDetailUrl: `"${window.location.origin}/detail/${route.params.id}"`,
            },
            ...{ siteUrl: `"${window.location.origin}/"` },
        };
    });

    //BreadCrumb contenu
    const breadCrumbContent = computed(() => [
        {
            label: 'Détails du bien',
            url: `/detail/${route.params.id}`,
        },
        { label: 'Faire une offre' },
    ]);

    // Function pour prendre les listes des notaires
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

            console.log('notariessssss', notaries);
        } catch (error) {
        } finally {
            loadingNotary.value = false;
        }
    }

    // Function pour afficher le modale en mobile
    const handleShowModal = () => {
        console.log('Show modal');
        isShow.value = true;
    };

    function onOpenModal(key: number) {
        isShow.value = !isShow.value;
    }

    // Function pour les radio
    const handleChangeRadio = (e: Event) => {
        let key = (e.target as HTMLInputElement).name;
        let value = (e.target as HTMLInputElement).value;
        console.log(key);
        console.log('Value', value);

        dataParams.value = {
            ...dataParams.value,
            ...{ [key]: value },
        };

        switch (key) {
            case 'conditionSuspens':
                if (value === 'withCondition') {
                    elementOffer[3].conditionShowingSuspens = true;
                    conditionShowingSuspens.value = true;
                    dataParams.value = {
                        ...dataParams.value,
                        ...{ withcondition: true },
                    };
                } else if (value === 'noCondition') {
                    conditionShowingSuspens.value = false;
                    elementOffer[3].conditionShowingSuspens = false;
                    dataParams.value = {
                        ...dataParams.value,
                        ...{ withcondition: false },
                    };
                }
                break;
            case 'signatureOffered':
                if (value === 'signatureSimple') {
                    signatureOfferedCondition.value = true;
                    hasInputHidden.value = false;
                    dataParams.value = {
                        ...dataParams.value,
                        ...{ isOnSpanSign: false },
                    };
                } else if (value === 'signatureElectronic') {
                    signatureOfferedCondition.value = false;
                    hasInputHidden.value = true;
                    signature.value = '';
                    dataParams.value = {
                        ...dataParams.value,
                        ...{ isOnSpanSign: true },
                    };
                }

            default:
                break;
        }
        checkBtnActive();
    };

    // Function pour les input
    const handleInput = (e: any) => {
        let obj: any = {};
        Object.keys(e).forEach((key) => {
            if (key === 'paymentRule') {
                if (+e[key] <= 100) {
                    obj[key] = e[key];
                    dataParams.value = {
                        ...dataParams.value,
                        ...{ paymentRule: e[key] },
                    };
                    depositSignature.value = parseInt(e[key]);
                }
            } else {
                dataParams.value = { ...dataParams.value, ...e };
                obj = e;
            }
        });
        paramsInput.value = {
            ...paramsInput.value,
            ...obj,
        };

        console.log('paramsInput>>>>>>>>>>>', paramsInput.value);

        console.log('dataParams', dataParams.value);

        if (e['prices']) {
            priceOffer.value = parseInt(e['prices']);
        } else if (e['credit']) {
            conditionCreditAmount.value = parseInt(e['credit']);
        } else if (e['delay']) {
            durationCredit.value = parseInt(e['delay']);
        } else if (e['validityDate']) {
            dateOffer.value = e['validityDate'];
            console.log(dateOffer.value, 'date offre point value');
        } else if (e['city']) {
            documentDwelling.value = e['city'];
        } else if (e['datedAt']) {
            documentDate.value = e['datedAt'];
        } else if (e['signatureNotary']) {
            signatureNotary.value = e['signatureNotary'];
        } else {
            console.log('TSY TAFIDITRA ANATY Payement rules');
        }

        console.log('dataParams.value', dataParams.value);
        checkBtnActive();
    };

    // Function pour les textarea
    const handleTextarea = (e: Event) => {
        const value = {
            [(e.target as HTMLInputElement).name]: (
                e.target as HTMLInputElement
            ).value,
        };

        dataParams.value = { ...dataParams.value, ...value };
        checkBtnActive();
    };

    const handleChange = (value: SelectValue, option: DefaultOptionType) => {
        dataParams.value = {
            ...dataParams.value,
            ...{ signatureNotary: value },
            ...{ notary: option.key },
        };
        signatureNotary.value = value;
        console.log('dataParams.value', dataParams.value);
        console.log('option', option.key);

        notaryList.value.forEach((oneNotaire: any) => {
            if (oneNotaire.name == option.value) {
                console.log(oneNotaire.email, 'EMAIL  MINI Boit email');
                dataMiniBoiteMail.value.emailTo.push(oneNotaire.email);
            }
        });

        console.log(dataMiniBoiteMail.value, 'DATA MINI Boit email');

        checkBtnActive();
    };
    const handleBlur = () => {
        console.log('blur');
    };
    const handleFocus = () => {
        console.log('focus');
    };

    // Function pour les icons ajouter (plus)
    const handleAddNameCondition = (name: string) => {
        if ((document.getElementById(name) as HTMLInputElement).value !== '') {
            switch (name) {
                case 'name':
                    names.push(dataParams.value.name);
                    console.log('Name add clicked', names);

                    break;

                case 'conditions':
                    conditions.push(dataParams.value.conditions);
                    const clientClauses: Array<Object> = [];
                    conditions.forEach((e: any) => {
                        clientClauses.push({ description: e });
                    });

                    dataParams.value = {
                        ...dataParams.value,
                        ...{ clientClauses: clientClauses },
                    };
                    console.log('Condition add clicked', conditions);
                    break;

                default:
                    break;
            }
        } else {
            message.warn('Veuillez remplir le champ');
        }

        emptyField(name);
        checkBtnActive();
    };

    const saveSignature = (imgSignature: string) => {
        signature.value = imgSignature;
        dataParams.value = {
            ...dataParams.value,
            ...{ clientSign: imgSignature },
        };
        checkBtnActive();
    };
    const deleteSignature = (imgSignature: string) => {
        signature.value = imgSignature;
    };

    const emptyField = (nameInput: string) => {
        interface Iname {
            value: string;
        }

        const name: any = document.getElementById(nameInput);
        console.log(name, 'NAME NAME');

        name.value = '';
    };

    // Validation de l'ajout de l'offre de l'acheteur
    function callback() {
        notification.success({
            message: 'Offre envoyée',
            description:
                "Votre offre à bien été créer le propriétaire recevra votre offre quand il sera membre de l'application",
        });
    }
    const makeOffer = () => {
        /**
         *
         * Le premier cas est pour un bien pas encore créer
         * mais l'utilisateur est interéssé par l'endroit
         * et veut faire une offre si un bien y est construit
         */
        if (+route.params.id === -1) {
            store.commit('FindPropertyModule/setCriteria', {
                offer: dataParams.value,
            });
            store.dispatch('FindPropertyModule/createAlerte', callback);
        } else {
            validate();
        }
    };

    function handleValidity(date: any) {
        paramsInput.value = {
            ...paramsInput.value,
            ...date,
        };

        dataParams.value = {
            ...dataParams.value,
            ...date,
        };

        if (date['validityDate']) {
            dateOffer.value = date['validityDate'];
        } else if (date['datedAt']) {
            documentDate.value = date['datedAt'];
        }

        // dateOffer.value = date['validityDate'];
        // documentDate.value = date['datedAt'];

        checkBtnActive();
    }

    const validate = async () => {
        try {
            loading.value = true;
            const { data } = await OfferService.valideFormOffer(
                dataParams.value
            );

            console.log(data, '************ DATA ***********');

            if (data.code === 200) {
                loading.value = false;
                notification['success']({
                    message: 'Offre envoyée',
                    description: 'Votre offre a ce bien a été bien envoyée.',
                });
                // sendToMiniBoiteMail();
                console.log('OK', data.data);
                store.dispatch('MakeOfferModule/setStatusRequest', true);
                // route vers la page d'acceuil
                console.log(data.data.urlOnespan1, '***********************');
                dataParams.value.isOnSpanSign
                    ? (window.location.href = data.data.urlOnespan1)
                    : router.push('/');
            } else if (data.code === 412) {
                notification['warning']({
                    message: 'Erreur',
                    description:
                        'Vous avez déjà des offres en attente sur cette bien.',
                });
            } else if (data.code === 511) {
                notification['warning']({
                    message: 'Erreur',
                    description: "Vous n'etes pas connecter.",
                });
            } else {
                notification['warning']({
                    message: 'Erreur',
                    description:
                        'Veuillez vous connecter ou verifiez vos information.',
                });
            }
        } catch (error: any) {
            console.log("erreur de validation de l'offre", error);
            if (error.data.detail == "Warning: Illegal string offset 'url'") {
                notification['warning']({
                    message: 'Erreur',
                    description:
                        "Une erreur est survenue lors de l'envoi vers One Span",
                });
            }
        } finally {
            loading.value = false;
        }
        console.log('Valider button clicked');
    };

    const checkBtnActive = () => {
        if (
            (dataParams.value.prices &&
                dataParams.value.clientClauses &&
                dataParams.value.validityDate &&
                dataParams.value.paymentRule &&
                dataParams.value.city &&
                dataParams.value.datedAt &&
                dataParams.value.theProperty &&
                dataParams.value.destination &&
                dataParams.value.notary &&
                dataParams.value.withcondition &&
                dataParams.value.clientUrl &&
                dataParams.value.thePropertyDetailUrl &&
                dataParams.value.siteUrl) !== undefined
        ) {
            if (
                dataParams.value.withcondition &&
                (dataParams.value.credit && dataParams.value.delay) !==
                    undefined &&
                dataParams.value.clientSign !== ''
            ) {
                btnDisabled.value = false;
                console.log('if voaloany');
            } else if (
                (dataParams.value.withcondition === false &&
                    dataParams.value.isOnSpanSign) ||
                (dataParams.value.withcondition === false &&
                    dataParams.value.clientSign !== '')
            ) {
                btnDisabled.value = false;
                console.log('ELSEif voaloany');
            } else if (
                (dataParams.value.isOnSpanSign &&
                    dataParams.value.withcondition &&
                    (dataParams.value.credit && dataParams.value.delay) !==
                        undefined) ||
                (dataParams.value.isOnSpanSign &&
                    dataParams.value.withcondition === false)
            ) {
                btnDisabled.value = false;
                console.log('OnSapanTrue');
            } else {
                btnDisabled.value = true;
            }
            console.log('checkBtnActive', dataParams.value.clientSign);
        }
    };

    function deleteList(id: number, type: string) {
        // conditionList.splice(id, 1);
        switch (type) {
            case 'cond':
                conditions.splice(id, 1);

                break;
            case 'name':
                names.splice(id, 1);

                break;

            default:
                break;
        }
    }

    let checkBoxSeller = false;
    let checkBoxClient = false;
    let checkBoxNotary = false;
    let destinationValueChecked = '';
    function handleCheckBox(dataCheck: any) {
        switch (Object.keys(dataCheck)[0]) {
            case 'client':
                checkBoxClient = !checkBoxClient;
                checkBoxClient
                    ? (destinationValueChecked += '/client')
                    : (destinationValueChecked =
                          destinationValueChecked.replace('/client', ''));

                break;
            case 'seller':
                checkBoxSeller = !checkBoxSeller;
                checkBoxSeller
                    ? (destinationValueChecked += '/seller')
                    : (destinationValueChecked =
                          destinationValueChecked.replace('/seller', ''));

                break;
            case 'notary':
                checkBoxNotary = !checkBoxNotary;
                checkBoxNotary
                    ? (destinationValueChecked += '/notary')
                    : (destinationValueChecked =
                          destinationValueChecked.replace('/notary', ''));

                break;

            default:
                break;
        }

        const dateFormatted =
            destinationValueChecked.slice(0, 0) +
            destinationValueChecked.slice(1);

        dataParams.value.destination = dateFormatted;

        console.log(destinationValueChecked, 'dddddddddddddddd');
        console.log(dateFormatted, 'true chaine');
    }

    function sendToMiniBoiteMail() {
        const htmlToPdf: any = document.getElementById('documentPdf');

        const pdf = new jsPDF();

        pdf.html(htmlToPdf, {
            callback: () => {
                const binaryData = pdf.output('arraybuffer');

                console.log(binaryData, 'fichier pdf');

                // dataMiniBoiteMail.value.attachements[0][file] = binaryData;

                // console.log(dataMiniBoiteMail.value, 'DATA FOR MINI_BOITE_MAIL');
            },
        });
    }
</script>

<style lang="scss" scoped>
    .offer {
        &__head-mobile {
            @apply mt-2.5 mb-2.5 mb-5 bg-[#fff] rounded-lg flex flex-row items-center py-2.5 gap-2.5;
        }

        &__head-desktop {
            @apply hidden;
        }

        &__head-info-icon {
            margin-left: 10px;
        }

        &__head-mobile-title {
            width: 192px;
            height: 17px;

            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;

            color: #000000;
        }

        &__content {
            @apply bg-[#fff] p-2.5 rounded-lg;
        }

        &__title-content {
            @apply flex flex-row items-center justify-between overflow-hidden rounded-lg;
        }

        &__title {
            @apply mb-2.5;
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 15px;
            color: #000000;
        }

        &__content-form {
            @apply flex flex-col;
            @screen lg {
                @apply w-full m-4;
            }
        }

        &__content-inline-lg {
            @screen lg {
                @apply flex flex-row gap-2.5;
            }
        }

        &__content-result {
            @apply hidden;

            @screen lg {
                @apply inline-block w-full bg-[#F2F2F2] p-4 m-4;
            }
        }

        &__form-inline {
            @apply flex flex-row items-center justify-start gap-2 w-full;
            &:deep() {
                .fields {
                    @apply mb-0 flex flex-row flex-nowrap w-full items-center;

                    label {
                        min-width: fit-content;
                        margin-bottom: 0px;
                    }
                }
            }
        }

        &__icon-add {
            @apply p-[6px] bg-[var(--color-gray)] rounded-full cursor-pointer;
        }

        &__form-input {
            @apply flex flex-row flex-nowrap items-center justify-start gap-1 sm:flex-1 basis-full;

            &:deep() {
                .custom-input__fields {
                    @apply mb-0 w-full flex items-center;

                    input#paymentRule {
                        min-width: 40px;
                    }

                    label {
                        @apply mb-0 min-w-max mr-1;
                    }
                }

                .relative {
                    @apply w-full;
                }

                .custom-select__wrapper {
                    @apply flex items-center basis-11/12 mb-0;

                    label {
                        @apply mb-0 ml-2.5 mr-[5px];
                    }
                }
            }
        }

        &__validity-date {
            @apply flex items-center gap-[10px];
        }

        &__signature {
            @apply mb-2.5;
        }

        &__btn-valid {
            @apply mt-3.5;
        }

        &__autocomplet-select {
            display: flex;
            flex-basis: 91.666667%;
            align-items: center;

            &:deep() {
                .ant-select {
                    @apply max-w-[100px];

                    @media (min-width: 440px) {
                        @apply max-w-full;
                    }
                    // @screen sm {
                    //     @apply max-w-[300px];
                    // }
                }
                .ant-select-single:not(.ant-select-customize-input)
                    .ant-select-selector {
                    @apply w-full h-[38px] py-0 px-[11px] flex items-center rounded;
                }
                .ant-select-selector:hover {
                    box-shadow: unset;
                    border: 1px solid var(--color-primary);
                }
            }
        }
    }

    .destionation {
        &__checkBox-content {
            @screen lg {
                @apply flex flex-row gap-[5px];
            }
        }
    }

    .separator-form {
        @apply mb-2.5 lg:hidden;
    }

    .btn-valid-content {
        @apply w-full;
    }

    .name-list {
        @apply my-1.5;
    }

    .title-input-dark {
        @apply my-2.5 font-normal text-[#949FB5];
    }

    .radioElementClass {
        &:deep() {
            .ant-radio-group {
                @apply sm:flex sm:flex-row gap-9;
            }
        }
    }

    .textarea-conditions {
        @apply w-full rounded p-2.5;
        border: 1px solid var(--color-stroke-gray);
    }
    .condtion-list {
        @apply my-1.5;
    }

    .app-radio-group {
        &:deep() {
            span {
                @apply min-w-fit;
            }
        }
    }

    @screen lg {
        .offer {
            &__head-mobile {
                @apply hidden;
            }
            &__head-desktop {
                @apply block mt-2.5 mb-2.5 mb-5 bg-[#fff] py-2.5 rounded-lg;
            }
        }
    }

    .label-select {
        @apply ml-2.5 mr-[5px] text-sm font-medium;
        color: var(--color-gray-icon);
    }

    .conditions-close {
        @apply flex items-center justify-start gap-[15px];
    }

    .del {
        @apply cursor-pointer;
    }
    .offer__validity-date :global(.paragraphe__normal) {
        @apply mb-[8px] font-semibold;
    }
    .dateDocument {
        @apply flex-row items-center;
    }

    .dateDocument :global(div.ant-space-item:nth-of-type(2)) {
        width: 100%;
    }
</style>
