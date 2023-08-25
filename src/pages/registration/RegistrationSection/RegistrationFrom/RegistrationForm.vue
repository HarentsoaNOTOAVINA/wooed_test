<template>
    <form
        ref="formRef"
        v-show="hiddenForm"
        @submit.prevent="handleSubmit"
        class="auth__form"
    >
        <div class="auth__form__title-section" v-if="professionalMode">
            <div v-if="loadAgencieServices" class="flex justify-center">
                <LoadingButton theme="dark" />
            </div>
            <Paragraphe>Information sur l'entreprise</Paragraphe>
            <hr />
        </div>
        <Select
            v-if="professionalMode"
            placeholder="Selectionnez"
            name="typeRole"
            :options="professionnalUserOption"
            @change-select="handleChangeSelect"
            label="Vous êtes"
            :required="true"
            :mode="professionalMode ? 'multiple' : undefined"
            :defaultValue="!professionalMode ? particularUserOption : undefined"
            :disabled="!professionalMode"
            :has-error="{
                        status: professionalMode && (!!(errors as any).typeRole && (errors as any).typeRole !== '' && activeError),
                        errorMsg: (errors as any).typeRole || '',
                    }"
            :disabled-option="0"
            ref="typeRoleRef"
        />
        <!-- NOT NEEDED FOR THE MOMENT -->
        <!-- <template v-if="usertype === 'professional'">
            <div v-if="loadAgenciesList" class="flex justify-center">
                <LoadingButton theme="dark" />
            </div>
            <template v-else>
                <Select
                    v-if="agenciesListLabel.length"
                    placeholder="Selectionnez"
                    name="agency"
                    :options="agenciesListLabel"
                    @change-select="handleChangeSelect"
                    label="Agence(s) disponible(s)"
                    :required="true"
                    mode="multiple"
                />
            </template>
        </template> -->

        <div v-for="field in formParams">
            <div
                class="auth__form__title-section"
                v-if="professionalMode && field.name === 'name'"
            >
                <Paragraphe>Information personnelle</Paragraphe>
                <hr />
            </div>
            <div
                v-if="professionalMode && field.name === 'agencyTva'"
                class="mb-4"
            >
                <Select
                    placeholder="Selectionnez un/des service(s)"
                    name="approvals"
                    :disabled="loadAgencieServices"
                    :options="agenciesServicesListLabel"
                    @change-select="handleChangeSelect"
                    label="Services de l'entreprise"
                    :required="true"
                    mode="multiple"
                    :has-error="{
                            status: professionalMode && (!!(errors as any).approvals && (errors as any).approvals !== '' && activeError),
                            errorMsg: (errors as any).approvals || '',
                        }"
                    :value="agenciesServicesListValues"
                    ref="approvalsRef"
                />
            </div>

            <Input
                :value="field.value"
                :disabled="(loadGoogleMap && field.name === 'address') || (field.name === 'telephone' && !(finalFormParams as any).longitude)"
                :id="field.id"
                :key="field.id"
                :label="field.label"
                :required="field.required"
                :placeholder="field.placeholder"
                :name-input="field.name"
                :inputType="field?.type"
                @input="handleInput"
                @blur="
                    handleValueChecking({
                        name: field.name,
                        value: field.value,
                    })
                "
                :addon-before="
                    field.name === 'telephone' && dialcodeCountry
                        ? dialcodeCountry.iso
                        : ''
                "
                :has-error="{
                        status: !!(errors as any)[field.name] && (errors as any)[field.name] !== '' && activeError,
                        errorMsg: (errors as any)[field.name] || '',
                    }"
                :unity="field.unity"
                :default-value="field.defaultValue"
                :loading="emailOnCheck"
            />
        </div>
        <Button type-button="secondary" html-type="submit" width="100%"
            ><span>S'inscrire</span></Button
        >
        <Modal
            :is-show-modal="displayServiceForm"
            @on-back="toggleServiceForm"
            width="520"
            title="Ajouter une service"
        >
            <template #content>
                <NewServiceForm
                    @confirm="addNewService"
                    @hide-modal="toggleServiceForm"
                />
            </template>
        </Modal>
    </form>
</template>

<script lang="ts" setup>
    import dialcodeData from '@/utils/json/dial-code-country';
    import Button from '@/components/Common/Button/Button.vue';
    import {
        useGoogleMapAPI,
        removeScript,
    } from '@/composables/google-maps-api';
    import Input from '@/components/Common/Input/Input.vue';
    import { SelectValue } from 'ant-design-vue/lib/select';
    import {
        onMounted,
        watchEffect,
        PropType,
        ref,
        watch,
        Ref,
        reactive,
    } from 'vue';
    import emailValidation from '@/utils/validation/email_validation';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import Select from '../../../../components/Common/Select/Select.vue';
    import {
        particularUserForm,
        professionnalUserForm,
        professionnalUserFormWithAgencies,
        particularErrorFields,
        professsionnalErrorFields,
    } from './registration.data';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import AgencyService from '@/services/agencyService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    import NewServiceForm from '@/pages/registration/RegistrationSection/RegistrationFrom/NewServiceForm.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { notification } from 'ant-design-vue';
    /** */

    interface option {
        label: string;
        value: number;
        unselect?: boolean;
    }

    interface Errors {
        [key: string]: string;
    }
    interface FormErrors {
        [key: string]: string;
    }

    /**
     * utils
     */
    const store: Store<any> = useStore();
    const router: Router = useRouter();

    /**Props */
    const props = defineProps({
        usertype: {
            type: String,
            require: true,
        },
        logo: {
            type: String,
        },
        prevUserForm: {
            type: Object,
        },
    });

    /**REF & REACTIVE */

    const professionalMode = ref(false);
    const emailOnCheck = ref(false);
    const displayServiceForm = ref(false);
    const serviceList = ref<string[]>([]);
    const serviceToAdd = ref('');

    /**OPTION */
    const particularUserOption = ref<any>();
    const professionnalUserOption = ref<any>();
    /**errros */
    const errors: Ref<Errors> = ref({});
    const tmpErrors: Ref<Errors> = ref({});
    const activeError = ref<boolean>(false);
    /**FIELDS */
    const formParams = ref<Array<IUserField>>([]);
    let finalFormParams = ref<any>({});

    const gm_inputAutocomplete = ref<any>();

    /**@start  agencies_list */
    const hasAgenciesList = ref<boolean>();
    let agenciesListLabel = ref<Array<any>>([]);
    let agenciesListValues = ref<Array<any>>([]);
    /**@end  agencies_list*/

    /**@start agencies_services_list */
    const agenciesServicesListLabel = ref<option[]>([
        { label: 'Autre ...', value: 0, unselect: true },
    ]);
    const agenciesServicesListValues = ref<Array<number>>([]);
    /**@end agencies_services_list */

    /**@start loading */
    const loadAgenciesList = ref<boolean>(false);
    const loadGoogleMap = ref<boolean>(false);
    const loadAgencieServices = ref<boolean>(false);
    /**@end loading */

    const hiddenForm = ref<boolean>(true);
    const dialcodeCountry = ref<{
        name: string;
        iso: string;
        countryCode: string;
    } | null>(null);
    const formRef = ref<HTMLFormElement | null>(null);
    // Références pour les champs de sélection
    const typeRoleRef = ref<any>(null);
    const approvalsRef = ref<any>(null);

    /**
     * INITIALIZATION STATE
     */
    watchEffect(() => {
        /**init usertype option on watchEffect (its immediatly reactive) */
        if (props.usertype === 'particular') {
            particularUserOption.value = {
                value: 'particular',
                label: 'Particulier',
            };
        } else {
            professionnalUserOption.value = [
                { value: 'agence', label: 'Agent immobilier' },
                { value: 'notaire', label: 'Notaire' },
                { value: 'prestataire', label: 'Fournisseur de services' },
                { value: 'syndic', label: 'Syndic' },
                { value: 'huissier', label: 'Huissier' },
            ];
        }

        /**
         * assign LOGO
         */
        finalFormParams.value = {
            ...finalFormParams.value,
            logo: props.logo,
        };
    });
    onMounted(() => {
        /**
         * reset
         */
        store.dispatch('UserModule/setIsFromSubscription', false);
        /**
         * NOT NEEDED FOR THE MOMENT
         */
        // props.usertype === 'professional' && getAgenciesList();
        getAgenciesServicesList();
        if (!!(window as any).google) {
            initGoogleMap();
        } else removeScript();
        /**
         * Init fields, errors.value and memorize errors.value on mount
         */
        switch (props.usertype) {
            case 'particular':
                professionalMode.value = false;
                formParams.value = [...particularUserForm];
                errors.value = Object.assign(
                    errors.value,
                    particularErrorFields
                );
                tmpErrors.value = Object.assign(
                    tmpErrors.value,
                    particularErrorFields
                );
                // disable error on type
                (errors.value as any).type = '';
                /**assign type */
                finalFormParams.value = {
                    ...finalFormParams.value,
                    type: props.usertype,
                };
                break;
            case 'professional':
                professionalMode.value = true;
                formParams.value = [...professionnalUserForm];
                errors.value = Object.assign(
                    errors.value,
                    professsionnalErrorFields
                );
                tmpErrors.value = Object.assign(
                    tmpErrors.value,
                    professsionnalErrorFields
                );
                break;
            default:
                break;
        }
        assignPrevUserForm();
    });
    watch(
        () => formParams.value,
        (val, oldVal) => {
            if (oldVal && val.length !== oldVal.length) {
                removeScript();
                initGoogleMap();
            }
        },
        { deep: true, immediate: true }
    );

    watch(
        () => agenciesServicesListLabel.value,
        (newValue) => {
            serviceList.value = [];
            newValue.forEach((element: any) => {
                const temp = cleanUpString(element.label);
                serviceList.value.push(temp);
            });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => serviceToAdd.value,
        () => {},
        { deep: true }
    );

    function cleanUpString(str: string) {
        let cleanedString = str.toLocaleLowerCase();
        cleanedString = cleanedString
            .replace(/[\s'"]/g, '_')
            .replace(/[àáâãäå]/g, 'a')
            .replace(/æ/g, 'ae')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõöø]/g, 'o')
            .replace(/œ/g, 'oe')
            .replace(/[ùúûü]/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/ñ/g, 'n');
        cleanedString = cleanedString.replace(
            /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g,
            ''
        );
        return cleanedString;
    }

    function assignPrevUserForm() {
        if (props.prevUserForm) {
            formParams.value = formParams.value.map((item) => {
                let returnedItem = item;
                Object.keys(props.prevUserForm as any).forEach((key) => {
                    (errors.value as any)[key] = '';
                    if (key === item.name) {
                        returnedItem = {
                            ...item,
                            value: (props.prevUserForm as any)[key],
                        };
                    }
                });
                return returnedItem;
            });
            finalFormParams.value = props.prevUserForm;
        }
    }

    async function handleValueChecking(event: any) {
        if (event.name === 'email') {
            emailOnCheck.value = true;
            const dbCheckResult = await store.dispatch(
                'UserModule/checkEmailAvailablity',
                event.value
            );
            dbCheckResult === true
                ? (errors.value = {
                      ...errors.value,
                      ...{ email: 'Cette adresse email est déjà utilisée' },
                  })
                : '';
            emailOnCheck.value = true;
        }
    }

    async function getAgenciesServicesList() {
        loadAgencieServices.value = true;
        interface TypeAgencySevices {
            id: number;
            roadWorks: string;
            status: boolean;
        }
        try {
            const {
                data,
                code,
            }: { data: Array<TypeAgencySevices>; code: number } =
                await AgencyService.getAgenciesServicesList();
            if (code === 200) {
                agenciesServicesListLabel.value = [
                    ...data.map((item) => ({
                        label: item.roadWorks,
                        value: item.id,
                    })),
                    ...agenciesServicesListLabel.value,
                ];
            }
        } catch (error) {
        } finally {
            loadAgencieServices.value = false;
        }
    }

    async function addNewService(payload: any) {
        toggleServiceForm();
        const newService = cleanUpString(payload.roadWorks);
        const isAlreadyExist = serviceList.value.includes(newService);
        if (isAlreadyExist) {
            const found = agenciesServicesListLabel.value.find(
                (element: any) => element.label === toCapitalize(newService)
            );
            if (found) agenciesServicesListValues.value.push(found.value);
        } else {
            const { data } = await AgencyService.createService(payload);
            if (data.success) {
                await getAgenciesServicesList();
                agenciesServicesListValues.value.push(data.data.id);
            } else {
                notification.error({
                    message: `Une erreur s'est produite, veuillez reessayer`,
                });
            }
        }
    }

    function toCapitalize(str: string) {
        const lowercaseStr = str.toLowerCase();
        const firstLetter = lowercaseStr.charAt(0).toUpperCase();
        const restOfString = lowercaseStr.slice(1);
        return firstLetter + restOfString;
    }

    async function initGoogleMap() {
        loadGoogleMap.value = true;
        const initGmp = useGoogleMapAPI();
        initGmp.then((googleInit: any) => {
            loadGoogleMap.value = false;

            gm_inputAutocomplete.value =
                new googleInit.maps.places.Autocomplete(
                    document.getElementById('gm_address')
                );
            gm_inputAutocomplete.value.addListener('place_changed', () => {
                const place = gm_inputAutocomplete.value.getPlace();
                getDialCodeCountry(place);
                try {
                    const location = JSON.parse(
                        JSON.stringify(place.geometry.location)
                    );
                    /**assigne address paramaters */
                    finalFormParams.value = {
                        ...finalFormParams.value,
                        address: place.formatted_address,
                        longitude: JSON.stringify(location.lng),
                        latitude: JSON.stringify(location.lat),
                    };
                    (errors.value as any).address = '';
                } catch (error) {
                    /**handle error if not valid value */
                    (errors.value as any).address =
                        'Votre addrèsse est invalide';
                }
            });
        });
    }

    /**
     * @start
     * search dial code by country
     */
    interface gm_IPlace {
        address_components: Array<{ types: Array<string>; short_name: string }>;
    }
    function gm_getCountry(place: gm_IPlace): string {
        let countryCode: string = '';
        place.address_components.forEach((item) => {
            if (item.types.includes('country')) {
                countryCode = item.short_name;
            }
        });
        return countryCode;
    }

    function getDialCodeCountry(place: gm_IPlace) {
        const countryCode: string = gm_getCountry(place);
        dialcodeData.forEach((country) => {
            if (country.countryCode === countryCode) {
                dialcodeCountry.value = country;
                return;
            }
        });
    }
    /**
     * @end
     */

    function handleChangeSelect(objValue: any) {
        for (const key in objValue) {
            switch (key) {
                case 'typeRole':
                    if ((objValue as any).typeRole.length) {
                        (errors.value as any).typeRole = '';
                    } else {
                        (errors.value as any).typeRole = (
                            tmpErrors.value as any
                        ).typeRole;
                    }
                    finalFormParams.value = {
                        ...finalFormParams.value,
                        ...objValue,
                    };
                    break;
                case 'agency':
                    // switch on with agencies and without agencies
                    if ((objValue as any).agency.length) {
                        // 1 agency choose
                        const agenciesIdList: Array<number> = [];
                        (objValue as any).agency.forEach((item: string) => {
                            agenciesIdList.push(getIdAgency(item));
                        });
                        hasAgenciesList.value = true;
                        formParams.value = [
                            ...professionnalUserFormWithAgencies,
                        ];
                        finalFormParams.value = {
                            ...finalFormParams.value,
                            societies: [...agenciesIdList],
                        };
                    } else {
                        // no societies choose
                        hasAgenciesList.value = false;
                        formParams.value = [...professionnalUserForm];
                        finalFormParams.value = {
                            ...finalFormParams.value,
                            societies: [],
                        };
                    }
                    break;
                case 'approvals':
                    const lastIndex = objValue.approvals.length - 1;
                    const lastElement = objValue.approvals[lastIndex];
                    if (lastElement === 0) {
                        displayServiceForm.value = true;
                    } else {
                        agenciesServicesListValues.value =
                            objValue[key as keyof typeof objValue];
                        if (agenciesServicesListValues.value.length) {
                            (errors.value as any).approvals = '';
                        } else {
                            (errors.value as any).approvals = (
                                tmpErrors.value as any
                            ).approvals;
                        }
                    }
                    break;
            }
        }
    }

    function handleInput(e: object) {
        /**check error on input event and assign value */
        for (const key in e) {
            formParams.value.forEach((field) => {
                if (key === field.name) {
                    formParams.value.splice(
                        formParams.value.indexOf(field),
                        1,
                        { ...field, value: (e as any)[key] }
                    );
                    if (field.required) {
                        /**HANLDE ERROR IF EMPTY */
                        const isEmpty = (e as any)[key] === '';
                        (errors.value as any)[key] = isEmpty
                            ? (tmpErrors.value as any)[key]
                            : '';

                        /**specific errors.value */
                        switch (key) {
                            case 'email':
                                if (
                                    (e as any)[key] !== '' &&
                                    !emailValidation((e as any)[key])
                                )
                                    (errors.value as any)[key] =
                                        'Votre email est invalide';
                                break;
                            case 'confirmPassword':
                            case 'password':
                                handleCofirmedPassword(e, key);
                            default:
                                break;
                        }
                    }
                }
            });
        }
    }
    function getIdAgency(params: string): number {
        return agenciesListValues.value
            .filter((item) => item.name === params)
            .at(-1).id;
    }

    function handleCofirmedPassword(e: object, key: string): void {
        const pwdValue: any = formParams.value
            .filter((field) => field.name === 'password')
            .at(-1)?.value;
        const cfrmPwdValue: any = formParams.value
            .filter((field) => field.name === 'confirmPassword')
            .at(-1)?.value;
        switch (key) {
            case 'confirmPassword':
                if ((e as any)[key] !== '' && (e as any)[key] !== pwdValue) {
                    (errors.value as any).confirmPassword =
                        'Mot de passe incorrect';
                }
                break;
            case 'password':
                if (
                    (e as any)[key] !== '' &&
                    (e as any)[key] !== cfrmPwdValue
                ) {
                    (errors.value as any).confirmPassword =
                        'Mot de passe incorrect';
                }
            default:
                break;
        }
    }

    /**
     * hanlde error before submit
     */
    function handleError(): boolean {
        const isAddressValid = !!(finalFormParams.value as any).longitude;
        (errors.value as any).address = !isAddressValid
            ? 'Votre adresse est invalide'
            : '';
        let isFormValid: any;
        if (!hasAgenciesList.value) {
            isFormValid = Object.values(errors.value).every((v) => v === '');
        } else {
            // remove agencies attributes from errors
            let obj: any;
            Object.keys(errors.value).forEach((key) => {
                if (
                    key !== 'agencyName' &&
                    key !== 'approvals' &&
                    key !== 'agencyTva'
                ) {
                    obj = {
                        ...obj,
                        [key]: (errors.value as any)[key],
                    };
                }
            });
            console.log(obj);
            isFormValid = Object.values(obj).every((v) => v === '');
        }

        return isFormValid;
    }
    /**
     * handle actions after error handling
     */
    function formateData() {
        /**control field
         * address field will be handle by google api
         */
        const mappedArray = Object.fromEntries(
            formParams.value
                /** remove address from initial state */
                .filter((field) => field.name !== 'address')
                .filter((field) => field.name !== 'confirmPassword')
                .map((field) => {
                    if (field.name === 'telephone')
                        // assing dial code on phone number
                        return [
                            field.name,
                            `${
                                (dialcodeCountry.value as { iso: string })?.iso
                            }${field.value}`,
                        ];
                    return [field.name, field.value];
                })
        );

        finalFormParams.value = {
            ...finalFormParams.value,
            /**assign input values */
            ...mappedArray,
            /**assign usertype */
            type: props.usertype,
        };

        /**
         * if has agency => parse obj
         */
        if (!hasAgenciesList.value) {
            let obj: any;
            // get agency values
            const societies = [
                {
                    name: (finalFormParams.value as any).agencyName,
                    // number: (finalFormParams.value as any).agencyNumber,
                    vat: (finalFormParams.value as any).agencyTva,
                    iti: (finalFormParams.value as any).iti,
                    approvals: agenciesServicesListValues.value,
                },
            ];
            // remove agency input values
            Object.keys(finalFormParams.value).forEach((key) => {
                if (
                    key !== 'agencyName' &&
                    // key !== 'agencyNumber' &&
                    key !== 'agencyTva' &&
                    key !== 'iti'
                ) {
                    obj = {
                        ...obj,
                        [key]: (finalFormParams.value as any)[key],
                    };
                }
            });
            finalFormParams.value = {
                ...obj,
                /**assign agency values */
                societies,
            };
        }
        if (props.usertype === 'particular') {
            /**
             * if particular remove agency
             */
            let obj: any;
            Object.keys(finalFormParams.value).forEach((key) => {
                if (key !== 'agency' && key !== 'societies') {
                    obj = {
                        ...obj,
                        [key]: (finalFormParams.value as any)[key],
                    };
                } else {
                    obj = {
                        ...obj,
                        [key]: [],
                    };
                }
            });
            finalFormParams.value = {
                ...obj,
            };
            console.log('particular >>>> ', finalFormParams.value);
        }
    }

    function handleSubmit() {
        activeError.value = true;
        /**
         * HANDLE ERROR AND EMPTY FIELD
         */
        const isFormValid: boolean = handleError();
        formateData();

        console.log(finalFormParams.value);
        isFormValid && prossToStripSection();
        if (!isFormValid) {
            // Créer les données statiques pour typeRole et approval
            const typeRoleData = reactive({
                id: 'typeRole', 
                name: 'typeRole',
                label: 'Votre rôle',
                required: true,
                placeholder: 'Sélectionnez votre rôle',
                type: 'select', 
                value: '', 
            });

            const approvalData = reactive({
                id: 'approval', 
                name: 'approvals',
                label: 'Approbations',
                required: true,
                placeholder: 'Sélectionnez les approbations',
                type: 'select', 
                value: '', 
            });

            // Créer une copie de formParams à l'aide de slice()
            const newFormParams = formParams.value.slice();
            // Ajouter typeRoleData à l'index 0 et approvalData à l'index 2 à l'aide de splice()
            newFormParams.splice(0, 0, typeRoleData);
            newFormParams.splice(2, 0, approvalData);
            /**
             * Trouver le premier champ avec une erreur
             */
            const firstErrorField = newFormParams.find(
                (field) =>
                    !!errors.value[field.name as keyof FormErrors] &&
                    errors.value[field.name as keyof FormErrors] !== '' &&
                    activeError.value
            );

            if (firstErrorField) {
                let fieldElement;
                if (firstErrorField.name === 'typeRole') {
                    // Utilisez la référence du champ de sélection 'typeRole'
                    fieldElement = typeRoleRef.value?.$el.nextSibling;
                } else if (firstErrorField.name === 'approvals') {
                    // Utilisez la référence du champ de sélection 'approvals'
                    fieldElement = approvalsRef.value[0]?.$el.nextSibling;
                } else {
                    // Utilisez la référence du champ de formulaire générique
                    const fieldId = firstErrorField.id;
                    fieldElement = fieldId
                        ? document.getElementById(fieldId)
                        : null;
                }

                if (fieldElement && fieldElement instanceof HTMLElement) {
                    fieldElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                    });
                }
            }
        }
    }

    function prossToStripSection() {
        /**
         * add [] in typeRole if particular user
         * manage isAdmin if user create his own societies
         */
        if (!!!(finalFormParams.value as any).typeRole) {
            finalFormParams.value = {
                ...finalFormParams.value,
                typeRole: [],
                isAdmin:
                    props.usertype === 'professional' && !hasAgenciesList.value,
                forSyndic: false,
            };
        } else {
            finalFormParams.value = {
                ...finalFormParams.value,
                isAdmin:
                    props.usertype === 'professional' && !hasAgenciesList.value,
                forSyndic: false,
            };
        }

        /** Keep data user into store */
        store.dispatch('UserModule/setRegisteredUser', finalFormParams.value);
        // go to subscription section

        /**
         * THIS IS NEEDED FOR AVOID BUG ON LOADING RENDING
         */
        hiddenForm.value = false;
        setTimeout(() => {
            router.push({
                name: 'authSubscription',
            });
        }, 350);
    }

    function toggleServiceForm() {
        displayServiceForm.value = !displayServiceForm.value;
    }
</script>

<style lang="scss" scoped>
    .auth__form {
        &__title-section {
            :deep() {
                color: var(--color-gray-icon);
                margin: 40px 0 10px 0;
                font-weight: 700;
            }
        }
    }
</style>
