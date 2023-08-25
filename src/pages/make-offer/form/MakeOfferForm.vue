<template>
    <div class="makeOffer__head-mobile">
        <InfoIcon class="makeOffer__head-info-icon" @click="handleShowModal" />
        <Title
            type="h3"
            :label="title"
            weight="bold"
            class="makeoffer__head-mobile-title"
            @click="handleShowModal"
        />

        <Modal
            class="mobile-modal"
            title="Apperçu du document"
            :is-show-modal="isShow"
            @on-back="onOpenModal"
        >
            <template #content>
                <DocsResult
                    class="makeOffer__doc-displayer"
                    titleResult="Apperçu du document"
                    :has-title="true"
                    :names="formValue.name ? [formValue.value] : []"
                    :conditions="conditions"
                    :price-offer="
                        formValue.prices ? parseInt(formValue.prices) : 0
                    "
                    :image-signature="signature"
                    :condition-credit-amount="
                        formValue.credit ? parseInt(formValue.credit) : 0
                    "
                    :duration-credit="
                        formValue.delay ? parseInt(formValue.delay) : 0
                    "
                    :date-offer="formValue?.validityDate"
                    :deposit-signature="
                        formValue.paymentRule
                            ? parseInt(formValue?.paymentRule)
                            : 0
                    "
                    :document-dwelling="documentDwelling"
                    :document-date="TODAY"
                    :condition-showing-suspens="formValue?.withcondition"
                    :has-input-hidden="hasInputHidden"
                    :notary-name="selectedNotary?.name"
                />
            </template>
        </Modal>
    </div>
    <div class="makeOffer__head-desktop">
        <BreadCrumb :items="breadCrumbContent" />
    </div>

    <!-- <Loader v-if="loadingNotary" /> -->

    <TransitionComponent v-if="showForm">
        <div class="makeOffer__main-content">
            <div class="makeOffer__both-sides">
                <div class="makeOffer__left-side">
                    <div class="makeOffer__main-form">
                        <!-- uncomment this part of code should be displayed only in case of there are multiple buyers -->
                        <!-- <div class="makeOffer__offer-senders">
                            <label>Emmetteur de l'offre</label>
                            <div v-if="names.length" class="w-full">
                                <ul class="list-disc ml-6">
                                    <li v-for="(name, index) in names" :key="index">
                                        <div class="makeOffer__name-element">
                                            <span class="block">{{ name }}</span>
                                            <Delete 
                                                class="cursor-pointer" 
                                                title="Supprimer de la liste"
                                                @click="deleteList(index, 'name')" 
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <TextInput 
                                input-type="text"
                                class="w-full"
                                @input="handleNewName($event)"
                                :key="nameKey"
                            />
                            <Button
                                type-button="primary"
                                @click="addNewName"
                            >
                                Ajouter
                            </Button>
                        </div> -->

                        <TextInput
                            label="Votre nom"
                            input-type="text"
                            name-input="name"
                            placeholder="Ajouter votre nom ..."
                            @input="handleFormValue"
                        />

                        <TextInput
                            label="Prix offert"
                            input-type="number"
                            name-input="prices"
                            placeholder="0"
                            unity="€"
                            @input="handleFormValue"
                        />

                        <div class="makeOffer__offer-conditions">
                            <label>Conditions particulières</label>

                            <div v-if="conditions.length" class="w-full">
                                <ul class="list-disc ml-6">
                                    <li
                                        v-for="(condition, index) in conditions"
                                        :key="index"
                                    >
                                        <div
                                            class="makeOffer__condition-element"
                                        >
                                            <span class="block">{{
                                                condition
                                            }}</span>
                                            <Delete
                                                class="cursor-pointer"
                                                title="Supprimer de la liste"
                                                @click="
                                                    deleteList(
                                                        index,
                                                        'condition'
                                                    )
                                                "
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <TextArea
                                class="w-full"
                                :name-input="'conditions'"
                                placeholder="Ajouter votre condition"
                                @input="handleNewCondition($event)"
                                :key="conditionKey"
                            />

                            <Button
                                type-button="primary"
                                @click="addNewCondition"
                            >
                                Ajouter
                            </Button>
                        </div>

                        <Switch
                            item-label="Condition suspensive de l'obtention d'un crédit bancaire"
                            name="withcondition"
                            :is-checked="false"
                            @handle-switch="handleFormValue"
                        />

                        <TextInput
                            name-input="credit"
                            input-type="number"
                            label="Montant du crédit sollicité"
                            placeholder="0"
                            unity="€"
                            @input="handleFormValue"
                        />

                        <TextInput
                            name-input="delay"
                            input-type="number"
                            label="Durée de la condition"
                            placeholder="0"
                            unity="semaine(s)"
                            @input="handleFormValue"
                        />

                        <div class="makeOffer__validity-timer">
                            <InputDate
                                label="Durée de validité de l'offre"
                                name="validityDate"
                                format="DD-MM-YYYY"
                                :min="true"
                                @handle-date-format-en="handleFormValue"
                            />
                            <TimePicker
                                label="Heure"
                                name="hourValidity"
                                placeholder="00:00"
                            />
                        </div>

                        <TextInput
                            name-input="paymentRule"
                            label="Acompte garantie"
                            type="number"
                            placeholder="0"
                            unity="%"
                            @input="handleFormValue"
                        />

                        <Select
                            label="Mon notaire"
                            name="notary"
                            placeholder="Selectionner un notaire"
                            :disabled="loadingNotary"
                            :options="notaries"
                            @change-select="handleFormValue"
                        />

                        <div class="makeOffer__doc-place-time">
                            <label>Détail du document</label>
                            <TextInput
                                class="w-2/3 -mt-0.5"
                                label="Fait à"
                                name-input="city"
                                @input="handleFormValue"
                            />
                            <InputDate
                                class="w-1/3"
                                label="le"
                                :format="'DD/MM/YYYY'"
                                :value="TODAY"
                                :disable="true"
                                name="datedAt"
                            />
                        </div>

                        <div class="makeOffer__doc-uses">
                            <label>Que voulez-vous faire de cette offre?</label>
                            <CheckBox
                                v-for="(docUses, index) in docUsesOptions"
                                :key="index"
                                class="ml-4"
                                :name="docUses.value"
                                :return-boolean="true"
                                :label="docUses.label"
                                @click-with-value="handleEmailRecipients"
                            />
                        </div>

                        <Radio
                            label="Signature"
                            name="isOnSpanSign"
                            :element="docSignatureOptions"
                            :radio-default-check="
                                docSignatureOptions[0].extraValue
                            "
                            @get-radio-input="handleSignatureOption"
                        />

                        <div class="makeOffer__doc-signature">
                            <Singature
                                title="Signature"
                                :show-btn-action="true"
                                @signature="saveSignature"
                                @supp="deleteSignature"
                                :has-title="true"
                            />
                        </div>

                        <div class="offer__btn-valid">
                            <Button
                                class="btn-valid-content"
                                width="100%"
                                :disabled="disableSubmit || loading"
                                @on-click="submitForm"
                            >
                                <LoadingButton size="sm" v-if="loading" />
                                <span>Enregistrer</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div class="makeOffer__right-side" id="documentPdf">
                    <DocsResult
                        class="makeOffer__doc-displayer"
                        titleResult="Apperçu du document"
                        :has-title="true"
                        :names="formValue.name ? [formValue.name] : []"
                        :conditions="conditions"
                        :price-offer="
                            formValue.prices ? parseInt(formValue.prices) : 0
                        "
                        :image-signature="signature"
                        :condition-credit-amount="
                            formValue.credit ? parseInt(formValue.credit) : 0
                        "
                        :duration-credit="
                            formValue.delay ? parseInt(formValue.delay) : 0
                        "
                        :date-offer="formValue?.validityDate"
                        :deposit-signature="
                            formValue.paymentRule
                                ? parseInt(formValue?.paymentRule)
                                : 0
                        "
                        :document-dwelling="
                            formValue.city ? formValue.city : '...'
                        "
                        :document-date="TODAY"
                        :condition-showing-suspens="formValue?.withcondition"
                        :has-input-hidden="hasInputHidden"
                        :notary-name="selectedNotary?.name"
                    />
                </div>
            </div>
        </div>
    </TransitionComponent>
</template>
<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import { computed, onMounted, reactive, ref, watch } from 'vue';
    import { notification } from 'ant-design-vue';
    import MiniMailBox from '@/services/miniMailBoxService';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import TextInput from '@/components/Common/Input/Input.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Singature from '@/components/Display/signatureCard/SignatureCard.vue';
    import DocsResult from '@/components/Display/DocOffer/DocOffer.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import Delete from '@/components/Icon/deleteRoudedBG.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import moment from 'moment';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    import jsPDF from 'jspdf';
    import OfferService from '@/services/offerService';

    const store: Store<any> = useStore();

    const baseUrl = import.meta.env.VITE_API_ROOT_URL;

    const currentUser = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    // const currentProperty = computed(() => store.getters['PropertyDetailModule/getPropertyDetail']);
    const propertyDetails = computed(
        () => store.getters['PropertyDetailModule/getPropertyDetail'].data
    );
    const notaryList = computed(
        () => store.getters['MakeOfferModule/getNotaryList']
    );

    const docUsesOptions = [
        {
            label: "L'envoyer sur votre boîte mail",
            value: 'client',
        },
        {
            label: 'La soumettre à votre notaire',
            value: 'notary',
        },
        {
            label: "La signer et l'adresser au vendeur",
            value: 'seller',
        },
    ];

    const docSignatureOptions = [
        {
            label: 'Signature simple',
            value: false,
            extraValue: 'signatureSimple',
        },
        {
            label: 'Signature qualifiée  ',
            value: true,
            extraValue: 'signatureElectronic',
        },
    ];

    interface DataObject {
        [key: string]: any;
    }

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

    const TODAY = moment(new Date()).format('DD/MM/YYYY');
    const route = useRoute();
    const missingFields = ref<any>([]);

    const names: any = ref([]);
    const conditions: any = ref([]);
    const formValue: any = ref({
        datedAt: TODAY,
        theProperty: Number(route.params.id),
        clientUrl: '',
        isOnSpanSign: false,
        siteUrl: baseUrl,
        thePropertyDetailUrl: `${baseUrl}/detail/${route.params.id}`,
        withcondition: false,
        city: '',
    });

    const newName = ref();
    const newCondition = ref();
    const nameKey = ref(0);
    const conditionKey = ref(0);
    const disableSubmit = ref(true);

    const selectedNotary = ref();

    const clientEmailObj = {
        messageBody: `Cher **${currentUser.value.firstname} ${currentUser.value.name}**, 

    Ci-joint votre offre sur le bien 
    
    <a href='${baseUrl}/detail/${route.params.id}'>**${propertyDetails.value?.reference}**</a> 
    
    sis à ${propertyDetails.value?.address}`,
        emailAddress: currentUser.value.email,
    };

    const notaryEmailObj = {
        messageBody: `Cher Notaire **${formValue.value?.notary}**,
    
    Un de nos client vous a transmis son offre sur un bien 
    
    <a href='${baseUrl}/detail/${route.params.id}'>**${propertyDetails.value?.reference}**</a> 
    
    sis à ${propertyDetails.value?.address},

    **Veuillez trouver ci-dessous ses coordonnées :**
    - **Nom:** **${currentUser.value.firstname} ${currentUser.value.name}**
    - **Téléphone:** **${currentUser.value.telephone}**
    - **Email:** <a href='mailto:${currentUser.value.email}' target='_blank'>"**${currentUser.value.email}**</a>`,
        emailAddress: selectedNotary.value?.email,
    };

    const sellerEmailObj = {
        messageBody: `Cher **${propertyDetails.value?.user?.firstname} ${propertyDetails.value?.user?.name}**,
    
    Vous avez reçu une offre de la part de notre client sur votre bien 
    
    <a href='${baseUrl}/detail/${route.params.id}'>**${propertyDetails.value?.reference}**</a> 
    
    sis à ${propertyDetails.value?.address},
    
    **Veuillez trouver ci-dessous ses coordonnées :**
    - **Nom:** **${currentUser.value.firstname} ${currentUser.value.name}**
    - **Téléphone:** **${currentUser.value.telephone}**
    - **Email:** <a href='mailto:${currentUser.value.email}' target='_blank'>"**${currentUser.value.email}**</a>`,
        emailAddress: propertyDetails.value?.user?.email,
    };

    const predifinedEmails = ref<DataObject>({
        notary: notaryEmailObj,
        client: clientEmailObj,
        seller: sellerEmailObj,
    });

    const emailRecipients = ref<DataObject>({
        notary: false,
        client: false,
        seller: false,
    });

    const emailData = ref();

    const router = useRouter();
    const notaries = ref<any[]>();
    const isShow = ref<boolean>(false);
    const signature = ref('');
    const documentDwelling = ref();
    const hasInputHidden = ref(false);
    const title = "Voir l'aperçu du document";
    const loading = ref(false);
    const showForm = ref(false);
    const loadingNotary = ref(false);
    const breadCrumbContent = computed(() => [
        {
            label: 'Détails du bien',
            url: `/detail/${route.params.id}`,
        },
        { label: 'Faire une offre' },
    ]);

    const handleNewName = (value: any) => {
        newName.value = Object.values(value).shift();
    };

    const handleNewCondition = (value: any) => {
        newCondition.value = value.srcElement.value;
    };

    const addNewName = () => {
        names.value.push(newName.value);
        newName.value = undefined;
        nameKey.value += 1;
    };

    const addNewCondition = () => {
        conditions.value.push(newCondition.value);
        const temp = conditions.value.map((element: string) => {
            return { description: element };
        });
        newCondition.value = undefined;
        conditionKey.value += 1;
        const formValue = { clientClauses: temp };
        handleFormValue(formValue);
    };

    const handleFormValue = (value: any) => {
        if ('notary' in value) {
            const found = notaryList.value.find((element: any) => element.name === value['notary']);
            if (found) {
                selectedNotary.value = found;
                const temp = { notary: found.id, citySignatureNotary: found.municipality ? found.municipality : found.address };
                formValue.value = { ...formValue.value, ...temp };
            }
        } else if ('prices' in value || 'credit' in value || 'paymentRule' in value) {
            const key = Object.keys(value).shift() as string;
            const newVal = Object.values(value).shift() as string;
            if (newVal && key) formValue.value = { ...formValue.value, ...{ [key] : newVal } };
        } else if('paymentRule' in value) {
            const temp = { paymentRule: String(value.paymentRule) };
            formValue.value = { ...formValue.value, ...temp };
        } else {
            formValue.value = { ...formValue.value, ...value };
        }
        checkRequiredFields();
        // checkBtnActive();
    };

    const checkRequiredFields = () => {
        const requiredKeys = [
            'prices',
            'clientClauses',
            'validityDate',
            'paymentRule',
            'city',
            'datedAt',
            'theProperty',
            'destination',
            'notary',
            'withcondition',
            'clientUrl',
            'thePropertyDetailUrl',
            'siteUrl',
            'clientSign',
        ];

        missingFields.value = requiredKeys.map((key: string) =>
            formValue.value[key] === undefined
                ? { [key]: true }
                : { [key]: false }
        );
    };

    const handleSignatureOption = ($event: any) => {
        const formValue = { [$event.target.name]: $event.target.value };
        console.error(formValue);
        handleFormValue(formValue);
    };

    const handleEmailRecipients = (value: any) => {
        emailRecipients.value = { ...emailRecipients.value, ...value };
        emailData.value = emailToSend(emailRecipients.value);
    };

    const emailToSend = (data: any) => {
        let payload = {};
        let recipients = '';
        const keys = Object.keys(data);
        const emailObjects: any = keys.forEach((key) => {
            if (data[key]) {
                payload = { ...payload, ...predifinedEmails.value[key] };
                recipients = `${recipients}/${key}`;
            }
        });
        const formValue = { destination: recipients };
        handleFormValue(formValue);
        return emailObjects;
    };

    const convertToFormdata = (value: any) => {
        const formData = new FormData();
        Object.keys(value).forEach((key: string) => {
            if (key === 'attachments') {
                value[key].forEach((file: any, index: number) => {
                    formData.append(
                        `attachments[${index}][file]`,
                        file.originFileObj
                    );
                });
            } else if (Array.isArray(value[key])) {
                value[key].forEach((item: any, value: number) => {
                    formData.append(`${key}[${value}]`, item);
                });
            } else {
                formData.append(key, value[key]);
            }
        });
        return formData;
    };

    const sendEmail = async (mailData: any) => {
        try {
            const payload = convertToFormdata(mailData);
            await MiniMailBox.postEmails(payload);
            notification.success({
                message: 'Vos destinataires ont été notifier',
            });
        } catch (error) {
            notification.error({
                message: `Une erreur s'est produite, veuillez reessayer`,
            });
        }
    };

    watch(
        () => propertyDetails.value,
        async (details) => {
            if (details)
                await store.dispatch('MakeOfferModule/fetchAroundNotaries', {
                    lat: details.latitude,
                    lng: details.longitude,
                });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => notaryList.value,
        (newValue) => {
            if (newValue && newValue.length > 0) {
                notaries.value = newValue.map((element: any) => ({
                    value: element.name,
                    label: element.name,
                    key: element.id,
                }));
            }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => notaries.value,
        () => {},
        { deep: true }
    );

    watch(
        () => missingFields.value,
        (newValue) => {
            let missingKeys: any = [];
            newValue.forEach((element: any) => {
                if (Object.values(element).pop() === true)
                    missingKeys.push(Object.keys(element).pop());
            });
            missingKeys.length > 0
                ? (disableSubmit.value = true)
                : (disableSubmit.value = false);
        },
        { immediate: true, deep: true }
    );

    // On mounted
    onMounted(() => {
        showForm.value = true;
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
        }
    });

    const handleShowModal = () => {
        console.log('Show modal');
        isShow.value = true;
    };

    function onOpenModal(key: number) {
        isShow.value = !isShow.value;
    }

    const saveSignature = (imgSignature: string) => {
        signature.value = imgSignature;
        const formValue = { clientSign: imgSignature };
        handleFormValue(formValue);
    };
    const deleteSignature = (imgSignature: string) => {
        signature.value = imgSignature;
    };

    // Validation de l'ajout de l'offre de l'acheteur
    function callback() {
        notification.success({
            message: 'Offre envoyée',
            description:
                "Votre offre à bien été créer le propriétaire recevra votre offre quand il sera membre de l'application",
        });
    }
    const submitForm = async () => {
        /**
         *
         * Le premier cas est pour un bien pas encore créer
         * mais l'utilisateur est interéssé par l'endroit
         * et veut faire une offre si un bien y est construit
         */
        if (+route.params.id === -1) {
            store.commit('FindPropertyModule/setCriteria', {
                offer: formValue.value,
            });
            store.dispatch('FindPropertyModule/createAlerte', callback);
        } else {
            await validate();
        }
    };

    const validate = async () => {
        try {
            loading.value = true;
            const { data } = await OfferService.valideFormOffer(
                formValue.value
            );

            // console.log(data, '************ DATA ***********');
            const emailKeys = Object.keys(emailRecipients);
            let confirmedEmailKeys: string[] = [];
            emailKeys.forEach((key: string) => {
                if (emailRecipients.value[key] === true)
                    confirmedEmailKeys.push(Object.keys(key).pop() as any);
            });

            if (data.code === 200) {
                loading.value = false;
                notification['success']({
                    message: 'Offre envoyée',
                    description: 'Votre offre a ce bien a été bien envoyée.',
                });
                if (confirmedEmailKeys.length > 0) {
                    confirmedEmailKeys.forEach(async (element: string) => {
                        const emailData = predifinedEmails.value[element];
                        await sendEmail(emailData);
                    });
                }
                store.dispatch('MakeOfferModule/setStatusRequest', true);
                // route vers la page d'acceuil
                console.log(data.data.urlOnespan1, '***********************');
                formValue.value.isOnSpanSign
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

    function deleteList(id: number, type: string) {
        // conditionList.splice(id, 1);
        switch (type) {
            case 'condition':
                conditions.value.splice(id, 1);

                break;
            case 'name':
                names.value.splice(id, 1);

                break;

            default:
                break;
        }
    }
</script>
<style lang="scss" scoped>
    .makeOffer {
        &__head-mobile {
            @apply lg:hidden;
        }

        &__head-desktop {
            @apply mt-4;
        }

        &__head-modal {
        }

        &__head-info-icon {
        }

        &__head-mobile-title {
        }

        &__main-content {
            @apply py-4;
            // background-color: #fff;
        }

        &__both-sides {
            @apply container rounded-lg grid grid-cols-2 gap-8 p-6;
            background-color: #fff;
        }

        &__main-form {
            @apply grid grid-cols-1 gap-4;
        }

        &__offer-senders,
        &__doc-place-time,
        &__offer-conditions {
            @apply flex flex-wrap justify-end gap-2 pt-1 p-2 rounded;
            border: 1px solid var(--color-gray-label);
        }

        &__doc-uses {
            @apply flex flex-col gap-2;
        }

        &__validity-timer:deep() {
            @apply flex gap-2;

            .paragraphe__normal {
                @apply font-semibold mb-2;
                color: var(--color-gray-icon);
            }
        }

        &__doc-signature:deep() {
            .signature__title {
                font-size: 14px;
                font-weight: 500;
                color: var(--color-primary);
                margin-bottom: 10px;
                display: block;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
                    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
                    'Noto Color Emoji';
            }
        }

        &__doc-displayer {
            &:deep() {
                .doc__main-content {
                    @apply py-4 px-6 rounded;
                    background-color: var(--color-gray);
                }
            }
        }

        &__name-element,
        &__condition-element {
            @apply flex flex-row justify-between items-center hover:font-semibold duration-300 mb-0.5;
        }
    }

    label {
        @apply block w-full;
        font-size: 14px;
        font-weight: 500;
        color: var(--color-primary);
    }
</style>
