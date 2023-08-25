<template>
    <div>
        <div class="row header mb-5">
            <div class="col-lg-6">
                <img src="/images/logo/vivaqua.png"
alt="vivaqua-logo"
>
            </div>
            <div class="col-lg-6 d-flex align-items-center">
                <div class="header-info">
                    <h3>DÉMÉNAGEMENT / CHANGEMENT DE CLIENT</h3>
                    <div>
                        <p>
                            À renvoyer <b>par e-mail</b> à contact@vivaqua.be ou
                            <b>par courrier</b> à VIVAQUA –Bd de l’Impératrice
                            17-19 – 1000 Bruxelles.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="card p-3 mb-5">
                <h4>ADRESSE DE CONSOMMATION</h4>
                <div class="row input-form">
                    <div class="col-lg-4">
                        <label>Rue</label>
                        <input
                            name="roadConsumption"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="col-lg-4">
                        <label>N°</label>
                        <input
                            name="numberConsumption"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="col-lg-4">
                        <label>Bte</label>
                        <input
                            name="boxConsumption"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                </div>
                <div class="row input-form">
                    <div class="col-lg-4">
                        <label>N° appartement</label>
                        <input
                            name="appartementNb"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="col-lg-4">
                        <label>Étage</label>
                        <input
                            name="floor"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="col-lg-4">
                        <div>
                            <input
                                name="left"
                                @input="handleChange($event, 'checked')"
                                type="checkbox"
                            >
                            <label>Gauche</label>
                        </div>
                        <div>
                            <input
                                name="middle"
                                @input="handleChange($event, 'checked')"
                                type="checkbox"
                            >
                            <label>Milieu</label>
                        </div>
                        <div>
                            <input
                                name="right"
                                @input="handleChange($event, 'checked')"
                                type="checkbox"
                            >
                            <label>Droite</label>
                        </div>
                    </div>
                </div>
                <div class="row input-form">
                    <div class="col-lg-6">
                        <label>Code postal</label>
                        <input
                            name="postalCode"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="col-lg-6">
                        <label>Commune</label>
                        <input
                            name="municipality"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                </div>
            </div>

            <div class="card p-3 mb-5">
                <h4>DONNÉES DU COMPTEUR</h4>
                <div class="row">
                    <div class="col-lg-4">
                        <label>INDEX ACTUEL</label>
                        <input
                            name="currentIndexCounter"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="col-lg-4">
                        <label>N° DE COMPTEUR</label>
                        <input
                            name="counterNb"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="col-lg-4">
                        <label>DATE DU RELEVÉ</label>
                        <a-date-picker
                            @change="hanldeDateChange"
                        />
                    </div>
                </div>
            </div>

            <div class="card p-3 mb-5">
                <h4>CLIENT SORTANT</h4>
                <div>
                    <p>
                        <span class="mr-5">LANGUE</span>
                        <input
                            name="language"
                            @input="handleChange($event, 'checked', 'fr')"
                            type="radio"
                            id="FR"
                        ><label class="mr-3"
for="FR"
>FR</label>
                        <input
                            @input="handleChange($event, 'checked', 'nl')"
                            type="radio"
                            name="language"
                            id="NL"
                        ><label for="NL">NL</label>
                    </p>

                    <div class="input-form">
                        <label>N° de client</label>
                        <input
                            name="guestNb"
                            @input="handleChange($event, 'value')"
                            type="text"
                        >
                    </div>
                    <div class="row input-form">
                        <div class="col-lg-3">
                            <p><b>Je suis</b></p>
                        </div>
                        <div class="col-lg-3">
                            <input
                                name="proprietary"
                                @input="handleChange($event, 'checkbox')"
                                type="checkbox"
                            >
                            <label>propriétaire</label>
                        </div>
                        <div class="col-lg-3">
                            <input
                                name="tenant"
                                @input="handleChange($event, 'checkbox')"
                                type="checkbox"
                            >
                            <label>locataire</label>
                        </div>
                        <div class="col-lg-3">
                            <input
                                name="representative"
                                @input="handleChange($event, 'checkbox')"
                                type="checkbox"
                            >
                            <label>mandataire</label>
                        </div>
                    </div>

                    <div class="row input-form">
                        <div class="col-lg-6">
                            <label>Nom(s) ou Nom de la sociét</label>
                            <input
                                name="societyNameOrName"
                                @input="handleChange($event, 'value')"
                                type="text"
                            >
                        </div>
                        <div class="col-lg-6">
                            <label>Prénom(s)</label>
                            <input
                                name="lastname"
                                @input="handleChange($event, 'value')"
                                type="text"
                            >
                        </div>
                    </div>
                    <div class="row input-form">
                        <div class="col-lg-6">
                            <label>Registre national </label>
                            <input
                                name="nationalRegister"
                                @input="handleChange($event, 'value')"
                                type="text"
                            >
                        </div>
                        <div class="col-lg-6">
                            <label>ou N° d’entreprise</label>
                            <input
                                name="societyNumber"
                                @input="handleChange($event, 'value')"
                                type="text"
                            >
                        </div>
                    </div>
                    <div class="row input-form">
                        <div class="col-lg-6">
                            <label>Téléphone</label>
                            <input
                                name="phonenumber"
                                @input="handleChange($event, 'value')"
                                type="text"
                            >
                        </div>
                        <div class="col-lg-6">
                            <label>N° de compte BE</label>
                            <input
                                name="beAccountNb"
                                @input="handleChange($event, 'value')"
                                type="text"
                            >
                        </div>
                    </div>
                    <div class="input-form">
                        <p>
                            <b>Je souhaite que la facture de clôture soit
                                envoyée</b>
                        </p>
                        <br>
                        <div class="pl-3">
                            <div>
                                <label>par e-mail</label>
                                <input
                                    name="email"
                                    @input="handleChange($event, 'value')"
                                    type="text"
                                >
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label>par courrier Rue</label>
                                    <input
                                        name="roadSend"
                                        @input="handleChange($event, 'value')"
                                        type="text"
                                    >
                                </div>
                                <div class="col-lg-4">
                                    <label>N°</label>
                                    <input
                                        name="nbSend"
                                        @input="handleChange($event, 'value')"
                                        type="text"
                                    >
                                </div>
                                <div class="col-lg-4">
                                    <label>Bte</label>
                                    <input
                                        name="boxSend"
                                        @input="handleChange($event, 'value')"
                                        type="text"
                                    >
                                </div>
                            </div>
                            <div class="pl-3 row">
                                <div class="col-lg-4">
                                    <label>Code postal</label>
                                    <input
                                        name="postalCodeSend"
                                        @input="handleChange($event, 'value')"
                                        type="text"
                                    >
                                </div>
                                <div class="col-lg-4">
                                    <label>Commune</label>
                                    <input
                                        name="municipalitySend"
                                        @input="handleChange($event, 'value')"
                                        type="text"
                                    >
                                </div>
                                <div class="col-lg-4">
                                    <label>Pays</label>
                                    <input
                                        name="countrySend"
                                        @input="handleChange($event, 'value')"
                                        type="text"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-end p-3 mb-5">
                <div>
                    <p class="text-secondary">
                        <u>SIGNATURE CLIENT SORTANT</u>
                    </p>
                    <Signature @saveSignature="saveSignature"
:title="false"
/>
                </div>
            </div>

            <div class="d-flex mb-5 justify-content-end">
                <button @click="handleSubmit"
class="btn btn-primary"
>
                    Envoyer
                </button>
            </div>

            <div>
                <i>En signant ce formulaire les parties déclarent avoir pris
                    connaissance et accepté les Conditions générales
                    consultables sur www.vivaqua.be ou envoyées sur simple
                    demande. VIVAQUA accorde une grande importance à la
                    protection des données à caractère personnel qu’elle est
                    amenée à traiter. Vous trouverez toutes les informations
                    nécessaires sur la manière dont VIVAQUA protège votre vie
                    privée et traite vos données personnelles dans la Charte de
                    vie privée disponible sur www.vivaqua.be.en cas de demandes
                    particulières liées à vos données à caractère personnel,
                    vous pouvez adresser vos questions par e-mail à
                    privacy@vivaqua.be ou par courrier, à VIVAQUA, 17 - 19 Bd de
                    l’Impératrice, 1000 Bruxelles</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: {
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
            },
        };
    },
    methods: {
        hanldeDateChange(date) {
            this.params = {
                ...this.params,
                [date]: data.format('LL'),
            };
        },
        handleChange(event, type, paramsname) {
            const key = paramsname
                ? event.target[paramsname]
                : event.target.name;
            this.params = {
                ...this.params,
                [key]: event.target[type],
            };
        },
        saveSignature(signature) {
            this.params = {
                ...this.params,
                signature,
            };
        },
        handleSubmit() {
            /**
             * if BRUXELLE Destinataire: contact@vivaqua.be
             */
            console.log(this.params);
        },
    },
};
</script>

<style lang="scss" scoped>
input[type='text'],
input[type='number'] {
    background-color: #fff !important;
    border: 1px solid #aaaaaa !important;
    border-radius: 8px !important;
    padding: 8px;
    width: 100%;
    flex-wrap: wrap;
    height: fit-content;
}
input[type='checkbox'],
input[type='radio'] {
    margin-right: 5px;
}
.input-form {
    margin-bottom: 20px;
}
</style>