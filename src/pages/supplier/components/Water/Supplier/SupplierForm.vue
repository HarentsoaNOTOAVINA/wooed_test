<template>
    <div class="form">
        <div class="form__header">
            <div class="form__header-title">
                <Vivaqua />
                <Title
                    type="h3"
                    label="DÉMÉNAGEMENT / CHANGEMENT DE CLIENT"
                    class="title"
                />
            </div>
            <Paragraphe>
                À renvoyer <b>par e-mail</b> à contact@vivaqua.be ou
                <b>par courrier</b> à VIVAQUA –Bd de l’Impératrice 17-19 – 1000
                Bruxelles.
            </Paragraphe>
        </div>
        <div class="form__content">
            <Title type="h4" label="Adresse de consommation" class="title" />
            <div class="form__wrap">
                <Input
                    name-input="roadConsumption"
                    label="Rue"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="numberConsumption"
                    label="N°"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
            <div class="form__wrap">
                <Input
                    name-input="boxConsumption"
                    label="Bte"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="appartementNb"
                    label="N° appartement"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
            <Input
                name-input="floor"
                label="Étage"
                input-type="text"
                @input="handleChange($event, 'value')"
            />
            <CheckBox
                name="left"
                label="Gauche"
                :return-boolean="true"
                @click="handleChange($event, 'checked')"
            />
            <CheckBox
                name="middle"
                label="Milieu"
                :return-boolean="true"
                @click="handleChange($event, 'checked')"
            />
            <CheckBox
                name="right"
                label="Droite"
                :return-boolean="true"
                @click="handleChange($event, 'checked')"
            />
            <div class="form__wrap">
                <Input
                    name-input="postalCode"
                    label="Code postale"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="municipality"
                    label="Commune"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
        </div>
        <div class="form__content">
            <Title type="h4" label="Données du compteur" class="title" />
            <div class="form__wrap">
                <Input
                    name-input="currentIndexCounter"
                    label="Index actuel"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="counterNb"
                    label="N° du compteur"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
            <InputDate
                name="statementDate"
                label="Date du relevé"
                @handle-date="hanldeDateChange"
                :min="true"
            />
            <!-- <div class="">
                <label>DATE DU RELEVÉ</label>
                <a-date-picker @change="hanldeDateChange" />
            </div> -->
        </div>

        <div class="form__content">
            <Title type="h4" label="Client sortant" class="title" />
            <p>
                <span class="mr-5">LANGUE</span>
                <input
                    name="language"
                    @input="handleChange($event, 'checked', 'fr')"
                    type="radio"
                    id="FR"
                /><label class="mr-3" for="FR">FR</label>
                <input
                    @input="handleChange($event, 'checked', 'nl')"
                    type="radio"
                    name="language"
                    id="NL"
                /><label for="NL">NL</label>
            </p>
            <Input
                name-input="guestNb"
                label="N° du client"
                input-type="text"
                @input="handleChange($event, 'value')"
            />
            <div>
                <Paragraphe>Je suis</Paragraphe>
                <CheckBox
                    name="proprietary"
                    label="Propriétaire"
                    :return-boolean="true"
                    @click="handleChange($event, 'checkbox')"
                />
                <CheckBox
                    name="tenant"
                    label="Locataire"
                    :return-boolean="true"
                    @click="handleChange($event, 'checkbox')"
                />
                <CheckBox
                    name="representative"
                    label="Mandataire"
                    :return-boolean="true"
                    @click="handleChange($event, 'checkbox')"
                />
            </div>

            <Input
                name-input="societyNameOrName"
                label="Nom(s) ou Nom de la société"
                input-type="text"
                @input="handleChange($event, 'value')"
            />
            <Input
                name-input="lastname"
                label="Prénom(s)"
                input-type="text"
                @input="handleChange($event, 'value')"
            />
            <div class="form__wrap">
                <Input
                    name-input="nationalRegister"
                    label="Registre national"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="societyNumber"
                    label="ou N° d’entreprise"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
            <Input
                name-input="phonenumber"
                label="Téléphone"
                input-type="text"
                @input="handleChange($event, 'value')"
            />
            <Input
                name-input="beAccountNb"
                label="N° de compte BE"
                input-type="text"
                @input="handleChange($event, 'value')"
            />

            <p>
                <b>Je souhaite que la facture de clôture soit envoyée</b>
            </p>

            <Input
                name-input="email"
                label="Par e-mail"
                input-type="text"
                @input="handleChange($event, 'value')"
            />
            <div class="form__wrap">
                <Input
                    name-input="roadSend"
                    label="Par courrier Rue"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="nbSend"
                    label="N°"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
            <div class="form__wrap">
                <Input
                    name-input="boxSend"
                    label="Bte"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="postalCodeSend"
                    label="Code postal"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
            <div class="form__wrap">
                <Input
                    name-input="municipalitySend"
                    label="Commune"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
                <Input
                    name-input="countrySend"
                    label="Pays"
                    input-type="text"
                    @input="handleChange($event, 'value')"
                />
            </div>
        </div>

        <div>
            <Title type="h4" label="Signature client sortant" class="title" />
            <SignatureCard @signature="saveSignature" />
        </div>

        <Button @click="handleSubmit" class="btn btn-primary"> Envoyer </Button>

        <div>
            <i
                >En signant ce formulaire les parties déclarent avoir pris
                connaissance et accepté les Conditions générales consultables
                sur www.vivaqua.be ou envoyées sur simple demande. VIVAQUA
                accorde une grande importance à la protection des données à
                caractère personnel qu’elle est amenée à traiter. Vous trouverez
                toutes les informations nécessaires sur la manière dont VIVAQUA
                protège votre vie privée et traite vos données personnelles dans
                la Charte de vie privée disponible sur www.vivaqua.be.en cas de
                demandes particulières liées à vos données à caractère
                personnel, vous pouvez adresser vos questions par e-mail à
                privacy@vivaqua.be ou par courrier, à VIVAQUA, 17 - 19 Bd de
                l’Impératrice, 1000 Bruxelles</i
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import RadioButton from '@/components/Common/RadioButton/RadioButton.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ref } from 'vue';
    import Vivaqua from '@/components/Icon/Logo/Vivaqua.vue';
    import SignatureCard from '@/components/Display/signatureCard/SignatureCard.vue';
    import Button from '@/components/Common/Button/Button.vue';

    const params = ref<any>({
        roadConsumption: '',
        numberConsumption: '',
        boxConsumption: '',
        appartementNb: '',
        floor: '',
        left: false,
        middle: false,
        right: false,
        postalCode: '',
        municipality: '',
        currentIndexCounter: '',
        counterNb: '',
        date: '',
        fr: false,
        nl: false,
        guestNb: '',
        proprietary: '',
        tenant: '',
        representative: '',
        societyNameOrName: '',
        lastname: '',
        nationalRegister: '',
        societyNumber: '',
        phonenumber: '',
        beAccountNb: '',
        email: '',
        roadSend: '',
        nbSend: '',
        boxSend: '',
        postalCodeSend: '',
        municipalitySend: '',
        countrySend: '',
        signature: '',
    });

    const emit = defineEmits<{
        (event: 'input', value: object): void;
    }>();

    function hanldeDateChange(date: any) {
        params.value = {
            ...params.value,
            [date]: date.format('LL'),
        };
    }

    function handleChange(event: any, type: any, paramsname?: any) {
        const key = paramsname ? event.target[paramsname] : event.target.name;
        params.value = {
            ...params.value,
            [key]: event.target[type],
        };
    }

    function saveSignature(signature: any) {
        params.value = {
            ...params.value,
            signature,
        };
    }

    function handleSubmit() {
        emit('input', params.value);
        console.log(params.value);
    }
</script>

<style lang="scss" scoped>
    .form {
        @apply flex flex-col gap-[18px];
        &__header {
            @apply flex flex-col gap-[18px];
        }
        &__header-title {
            @apply flex flex-col gap-[18px];
        }
        &__content {
            @apply flex flex-col gap-[18px];
        }
        &__wrap {
            @apply grid grid-cols-1 gap-[18px];
            @screen sm {
                @apply grid grid-cols-2;
            }
            @screen md {
                @apply grid grid-cols-1;
            }
            @screen lg {
                @apply grid grid-cols-2;
            }
        }
        &:deep() {
            p {
                font-style: italic;
                color: var(--color-gray-icon);
            }
        }
    }
    .title {
        font-weight: 600;
    }
</style>
