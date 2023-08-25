<template>
    <div class="envi__container">
        <div class="envi__last-control">
            <!-- <hr class="__hr" /> -->
            <div class="env__permis">
                <Title
                    type="h2"
                    label="Citerne"
                    weight="bold"
                    class="env-title"
                />
                <div class="envi__items">
                    <Switch
                        class="btnSwitch"
                        name="hasControle"
                        item-label="Avez-vous fait un contrôle de la citerne ?"
                        @switch-value="handleSwitch"
                        :to-align="true"
                        :value="
                            propertyDatas.dateControls ||
                            propertyDatas.costControls ||
                            propertyDatas.stateControls
                                ? true
                                : false
                        "
                    />
                    <div class="envi__last-control-container">
                        <!-- @on-click="handleDemande('toNotary')" -->
                        <Button
                            class="mt-3"
                            v-if="!hasLastControl"
                            type-button="border"
                            @on-click="gotoWork"
                            >Aller vers la partie travaux
                        </Button>
                        <div
                            class="envi__last-control-content"
                            v-if="hasLastControl"
                        >
                            <InputDate
                                label="Date du dernier contrôle"
                                name="dateControls"
                                :max="true"
                                @handle-date-format-fr="handleDateControl"
                                :value="
                                    propertyDatas.dateControls
                                        ? moment(
                                              propertyDatas.dateControls
                                          ).format('DD-MM-YYYY')
                                        : ''
                                "
                            />
                            <Input
                                name-input="costControls"
                                label="Coût du dernier contrôle"
                                unity="€"
                                placeholder="0"
                                input-type="number"
                                @input="handleCost"
                                :default-value="propertyDatas.costControls"
                            />

                            <div class="doc-control spaceV">
                                <label class="title-upload"
                                    >Document des contrôles</label
                                >
                                <UploadImage
                                    name="document"
                                    @upload-single-with-name="
                                        handleUploadDocControl
                                    "
                                />
                                <!-- :default-file-list="propertyDatas.document" -->
                            </div>
                            <div class="spaceV type-control">
                                <label class="title-upload"
                                    >Etat du contrôle :
                                    {{
                                        stateControls
                                            ? stateControls
                                            : stateControl
                                            ? stateControl
                                            : 'Moyenne'
                                    }}</label
                                >
                                <div class="buchon-content">
                                    <Paragraphe
                                        v-for="(item, i) in buchons"
                                        :class="[
                                            item.class,
                                            item.value == stateControls
                                                ? 'selected'
                                                : isBuchonSelected &&
                                                  indexSelected === i
                                                ? 'selected'
                                                : '',
                                        ]"
                                        @click="handleBuchon(item.value, i)"
                                        >{{ item.label }}
                                    </Paragraphe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="__hr" />

            <div class="env__permis">
                <Title
                    type="h2"
                    label="Permis d'environnement"
                    weight="bold"
                    class="env-title"
                />
                <div class="envi__items">
                    <div class="doc-control spaceV">
                        <label class="title-upload"
                            >Si vous votre bien à fait objet d'une permit
                            d'environnement veuillez l'insérer ici</label
                        >
                        <UploadImage
                            name="permitEnvFile "
                            @upload-single-with-name="handleUploadPermis"
                        />
                        <!-- :default-file-list="propertyDatas.permitEnvFile" -->
                    </div>
                    <div class="envi__parcel-sis" v-if="isFrance">
                        <div class="envi__parcel-sis-ok" v-if="hasSis">
                            <Paragraphe
                                >Votre terrain est répertorié en Secteur
                                d’Information sur les Sols (SIS), c-à-d qu’il
                                est affecté totalement ou partiellement par une
                                pollution connue par les services de l’État.
                                <br />
                                L’information préalable des locataires ou
                                acheteurs d’un bien situé sur un terrain
                                répertorié en SIS est obligatoire.
                            </Paragraphe>
                        </div>
                        <div class="envi__parcel-sis-not" v-else>
                            <Paragraphe
                                >Votre terrain n’est pas répertorié en Secteur
                                d’Information sur les Sols (SIS), c-à-d qu’il
                                n’est pas affecté totalement ou partiellement
                                par une pollution connue par les services de
                                l’État. <br />
                                Aucun diagnostic de pollution des sols ne doit
                                être établi dans le cadre de la vente de votre
                                parcelle.
                            </Paragraphe>
                        </div>
                    </div>
                    <div class="envi__parcel-sis" v-if="isLuxembourg">
                        <Paragraphe class="no-region"
                            >Pour contacter CASIPO, veuillez effectuer une
                            demande d'attestation du sol
                        </Paragraphe>
                    </div>
                </div>
            </div>
            <hr class="__hr" />
            <div class="envi__parcel">
                <div class="envi__parcel-notaire-att">
                    <Title
                        type="h2"
                        label="Etat du sol"
                        weight="bold"
                        class="env-title"
                    />
                    <div class="envi__items">
                        <div class="envi__parcel-land">
                            <label class="title-upload"
                                >La parcelle de terrain est reprise sous la
                                catégorie :
                                <span class="category-parcel">Aucun</span>
                            </label>
                        </div>
                        <Switch
                            class="btnSwitch"
                            name="hasDemandAttestation"
                            item-label="Avez-vous des demandes d'attestation ?"
                            :checked-default="true"
                            :to-align="true"
                            @switch-value="handleSwitchAttestationRequest"
                            :value="propertyDatas.hasDemandAttestation"
                        />

                        <div class="envi__parcel-content">
                            <div class="envi__parcel-infoReqAtt">
                                <div class="envi__parcel-info-info">
                                    <div
                                        class="envi__parcel-info-icon"
                                        @click="handleShowInformation"
                                    >
                                        <span>Voir les informations</span>
                                        <Info />
                                    </div>
                                    <div
                                        class="envi__parcel-info"
                                        v-if="showInformation"
                                    >
                                        <Paragraphe
                                            >ATTESTATION DU SOL (B) / INFORMATIONS
                                            CASIPO (Lux)/INFORMATION SUR LES SIS
                                            (France). <br />
                                            <span class="italic">
                                                (Belgique) Selon la loi, l'offrant
                                                doit disposer de ce document avant
                                                de conclure une convention
                                                d'acquisition valable
                                            </span>
                                        </Paragraphe>
                                    </div>
                                    <!--   <div class="envi__parcel-attestation spaceV">
                                        <label class="title-upload"
                                            >Je possède déjà une attestation du
                                            sol</label
                                        >
                                        <UploadImage
                                            name="attestationFile"
                                            @upload-single-with-name="
                                                handleUploadAttestation
                                            "
                                        />
                                    </div>
                                --></div>
                            </div>
                        </div>

                        <div
                            class="envi__parcel-attestation spaceV"
                            v-if="hasRequestAttestation"
                        >
                            <label class="title-upload"
                                >Je possède déjà une attestation du sol</label
                            >
                            <UploadImage
                                name="attestationFile"
                                @upload-single-with-name="handleUploadAttestation"
                            />
                            <!-- :default-file-list="propertyDatas.attestationFile" -->
                        </div>

                        <div
                            class="envi__send-demand-attestation"
                            v-else-if="!hasRequestAttestation"
                        >
                            <div class="envi__parcel-notaire">
                                <Paragraphe class="title-upload"
                                    >Charger un notaire de procéder à la demande
                                </Paragraphe>

                                <div class="doc-control spaceV">
                                    <SelectAutoComplet
                                        @change-select="selectCompleted"
                                        :options="notaryList"
                                        placeholder="Selectionner notaire"
                                        name="myNotaireSelected"
                                        :has-sub-title="false"
                                        :default-value="notaryLabel"
                                    />
                                </div>
                            </div>

                            <div class="envi__parcel-reqAtt spaceV">
                                <Button type-button="border" @on-click="handleShowModal"
                                    >Demander l'attestation du sol à l'autorité
                                    compétente
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="envi__modal-attestation">
            <Modal
                title="Demande d'attestation"
                :is-show-modal="showModal"
                @on-back="showModal = false"
                ><template #content>
                    <div class="envi__in-region" v-if="inRegion">
                        <div class="envi__radio-region mb-5">
                            <label class="title-upload"
                                >Demande d'attestation pour la région du
                                {{ region }}
                            </label>
                        </div>
                        <div class="envi__radio-destination">
                            <Paragraphe
                                >Envoyer la demande à
                                {{
                                    region == 'Flandre'
                                        ? "l'OVAM"
                                        : region == 'Wallonie'
                                        ? 'la BDES'
                                        : region == 'Bruxelles'
                                        ? 'Bxl-Environnt'
                                        : 'Aucun'
                                }}</Paragraphe
                            >
                            <div
                                class="envi__request-bxl"
                                v-if="region == 'Bruxelles'"
                            >
                                <Paragraphe class="mt-3"
                                    >Vous allez être redirigé vers
                                    <a
                                        href="https://brusoil.environnement.brussels/home.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >Brusoil</a
                                    >
                                </Paragraphe>

                                <Paragraphe class="mt-3"
                                    >Pour avoir plus d'infos sur la demande
                                    d'attestation
                                    <a
                                        class="italic text-bold"
                                        href="http://www.irisbox.irisnet.be/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >cliquez ici</a
                                    >
                                </Paragraphe>
                            </div>

                            <div
                                class="envi__request-wallonie"
                                v-if="region == 'Wallonie'"
                            >
                                <Paragraphe class="mt-3"
                                    >Pour avoir plus d'infos sur la demande
                                    d'attestation dans la région de wallonie
                                    <a
                                        class="italic text-bold"
                                        href="http://bdes.spw.wallonie.be/portal/#BBOX=155895.24208118606,156130.72171881198,123031.56739999901,123125.4946711869"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >cliquez ici</a
                                    >
                                </Paragraphe>
                            </div>

                            <div
                                class="envi__request-flamade"
                                v-if="region == 'Flandre'"
                            >
                                <Paragraphe class="mt-3"
                                    >Pour avoir plus d'infos sur la demande
                                    d'attestation dans la région de Flandre
                                    <a
                                        class="italic text-bold"
                                        href="https://app.keysurvey.com/f/1412766/2726/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >cliquez ici</a
                                    >
                                </Paragraphe>
                            </div>

                            <div class="envi__parcel-notaire">
                                <Paragraphe class="title-upload"
                                    >Charger un notaire de procéder à la demande
                                </Paragraphe>

                                <div class="doc-control spaceV">
                                    <SelectAutoComplet
                                        @change-select="selectCompleted"
                                        :options="notaryList"
                                        placeholder="Selectionner notaire"
                                        name="myNotaireSelected"
                                        :has-sub-title="false"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="envi__radio-contact">
                            <label class="title-upload"
                                >Document de demande
                            </label>
                            <UploadImage
                                name="docFile"
                                @upload-single-with-name="
                                    handleUploadDocDemandAttestation
                                "
                            />
                        </div>
                        <div class="envi__radio-btn">
                            <Button
                                @on-click="sendRequestAttestation"
                                :disabled="canSendRequest"
                                >Contacter <CheckIcon v-if="requestAttSending"
                            /></Button>
                        </div>
                    </div>

                    <div class="env__country">
                        <div
                            class="env__country-fr"
                            v-if="inCountry && countryName == 'Luxembourg'"
                        >
                            <Paragraphe>Envoyer la demande à CASIPO</Paragraphe>

                            <div class="envi__radio-contact">
                                <label class="title-upload"
                                    >Document de demande
                                </label>
                                <UploadImage
                                    name="docFile"
                                    @upload-single-with-name="
                                        handleUploadDocDemandAttestation
                                    "
                                />
                            </div>

                            <div class="envi__radio-btn">
                                <Button
                                    @on-click="sendRequestAttestation"
                                    :disabled="canSendRequest"
                                    >Contacter
                                    <CheckIcon v-if="requestAttSending"
                                /></Button>
                            </div>
                        </div>
                        <div
                            class="env__country-fr"
                            v-if="inCountry && countryName == 'France'"
                        >
                            <Paragraphe class="no-region"
                                >Vous ne pouvez pas effectuer aucune demande
                                pour la region de votre bien
                            </Paragraphe>
                        </div>
                    </div>

                    <div
                        class="envi__not-region"
                        v-if="!inRegion && !inCountry"
                    >
                        <Paragraphe class="no-region"
                            >Vous ne pouvez pas effectuer aucune demande pour la
                            region de votre bien
                        </Paragraphe>
                    </div>
                </template></Modal
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import SelectAutoComplet from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Info from '@/components/Icon/Info.vue';
    import { Divider as divider } from 'ant-design-vue';
    import { ref, onMounted, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { SelectValue } from 'ant-design-vue/lib/select';
    import CheckIcon from '@/components/Icon/CheckIcon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { useRouter } from 'vue-router';
    import moment from 'moment';

    interface IBuchon {
        label: string;
        value: string;
        class: string;
    }

    interface ILatLong {
        lat: string;
        lng: string;
    }

    interface INotaryList {
        label: string;
        value: string;
        email: string;
    }

    const store = useStore();
    const router = useRouter();

    let hasLastControl = ref<boolean>(false);
    let showModal = ref<boolean>(false);
    let isBuchonSelected = ref<boolean>(false);
    let indexSelected = ref<number>();
    let showInformation = ref<boolean>(false);
    let requestAttSending = ref<boolean>(false);
    let hasSis = ref<boolean>(false);
    let hasRequestAttestation = ref<boolean>(false);
    let isFrance = ref<boolean>(false);
    let isLuxembourg = ref<boolean>(false);
    let stateControl = ref<string>('Moyenne');
    let inRegion = ref<boolean>(true);
    let countryName = ref<string>();
    let inCountry = ref<boolean>(true);
    let canSendRequest = ref<boolean>(true);
    let region = ref<string>();
    let latLong = ref<ILatLong>({
        lat: '',
        lng: '',
    });
    let notaryList = ref<INotaryList[]>([]);

    let regionSisStatic = ref<Array<string>>([
        'Île-de-France',
        'Normandie',
        'Occitanie',
        'La Réunion',
        'Centre-Val de Loire',
    ]);

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );
    const notaryLabel = ref<string>();
    const stateControls = ref<string>();
    watch(
        () =>
            store.getters['AddProductModule/getAddPropertyDatas'].stateControls,
        (value) => {
            stateControls.value = value;
        },
        { immediate: true, deep: true }
    );

    onMounted(async () => {
        await getNotaryList();
        await getLocalization();
        await getStatusEnvironemt();
        const comp = notaryList.value.filter((item) => {
            return item.email === propertyDatas.value.notaryMail;
        });
        if (comp.length) {
            notaryLabel.value = comp[0].label;
        }
    });

    async function getStatusEnvironemt() {
        const propertyData = computed(
            () => store.getters['AddProductModule/getAddPropertyDatas']
        );
        latLong.value.lat = propertyData.value.detailLocation.latitude;
        latLong.value.lng = propertyData.value.detailLocation.longitude;
        console.log(latLong.value, 'Property latitude et longitude value');
        // let response = store.dispatch(
        //     'CollectiveGardenModule/fetchEnvironmentStatus',
        //     latLong.value
        // );

        // console.log(response, 'REsposne deeee');
    }

    function getNotaryList() {
        const notaryLists = store.getters['AddProductModule/getNotaryList'];

        console.log(notaryLists, 'listes notaires');

        notaryLists.forEach((element: any) => {
            notaryList.value.push({
                label: element.name,
                value: element.name,
                email: element.email,
            });
        });
    }

    function getLocalization() {
        let country =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['country'];
        let regionStore =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['region'];

        switch (country) {
            case 'France':
                isFrance.value = true;
                inCountry.value = true;
                countryName.value = country;

                regionSisStatic.value.includes(regionStore)
                    ? (hasSis.value = true)
                    : (hasSis.value = false);
                break;
            case 'Luxembourg':
                isLuxembourg.value = true;
                inCountry.value = true;
                countryName.value = country;

                break;

            default:
                break;
        }

        switch (regionStore) {
            case 'Bruxelles':
                region.value = 'Bruxelles';
                break;
            case 'Région Wallonne':
                region.value = 'Wallonie';
                break;
            case 'Flandres':
                region.value = 'Flandre';
                break;

            default:
                inRegion.value = false;
                break;
        }
    }

    let buchons = ref<IBuchon[]>([
        {
            label: 'Bouchon vert',
            value: 'Bien',
            class: 'buchon green',
        },
        {
            label: 'Bouchon orange',
            value: 'Moyenne',
            class: 'buchon orange',
        },
        {
            label: 'Bouchon rouge',
            value: 'Mauvaise',
            class: 'buchon red',
        },
    ]);

    function handleDateControl(date: string) {
        console.log(date, 'DATE CONTROL');

        setDataToStore(date);
    }
    function handleCost(cost: any) {
        console.log(cost, 'COST CONTROL');

        setDataToStore(cost);
    }

    function handleSwitch(value: boolean) {
        hasLastControl.value = !hasLastControl.value;
        store.dispatch('AddProductModule/setPropertyData', {
            data: {
                typeControls: null,
            },
        });
    }

    function selectCompleted(value: SelectValue, notaire: any) {
        setDataToStore({ notaryMail: notaire.email });
        setDataToStore({ ovamMail: 'harentsoa@yopmail.com' }); // on ne connais pas encoure a qui?
        console.log('Valeur: ' + notaire.email);
    }

    function handleBuchon(buchonState: string, index: number) {
        setDataToStore({ stateControls: buchonState });
        isBuchonSelected.value = true;
        indexSelected.value = index;

        stateControl.value = buchonState;
        // console.log(buchonState, 'Buchon statue');
    }

    function handleUploadDocControl(docsUpload: any) {
        setDataToStore(docsUpload);
    }

    function handleUploadDocDemandAttestation(docsUpload: any) {
        setDataToStore(docsUpload);
        setDataToStore({ demandName: "Demande d 'attestation du sol" });

        let files =
            store.getters['AddProductModule/getAddPropertyDatas']['docFile'];
        console.log(files, 'FILSES');

        files != null
            ? (canSendRequest.value = false)
            : (canSendRequest.value = true);
    }

    function handleUploadPermis(docsUpload: any) {
        setDataToStore(docsUpload);
        setDataToStore({ permitEnvName: "Permis d'environment octroyé" });
    }

    function handleUploadAttestation(docsUpload: any) {
        setDataToStore(docsUpload);
        setDataToStore({ attestationName: 'Attestation du sol' });
    }

    function handleShowModal() {
        showModal.value = !showModal.value;
    }

    function handleSwitchAttestationRequest() {
        hasRequestAttestation.value = !hasRequestAttestation.value;
    }

    function sendRequestAttestation() {
        requestAttSending.value = true;
        setDataToStore({ requestAttestationEnv: true });

        setTimeout(() => {
            showModal.value = false;
        }, 3000);
    }

    function handleShowInformation() {
        showInformation.value = !showInformation.value;
    }

    function setDataToStore(value: any) {
        console.log(value, 'Value');
        store.dispatch('AddProductModule/setPropertyData', {
            data: value,
        });
    }

    function gotoWork() {
        // router.push({ name: 'work' });
        window.open('/travaux', '_blank');
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .envi {
        &__container {
            @apply bg-white rounded-[8px];
        }

        &__last-control {
            @apply flex flex-col gap-[18px];
            @screen md {
                @apply gap-[24px];
            }
        }
        &__last-control-container {
            // height: 300px;
            // display: flex;
            // justify-content: center;
            // align-items: center;
        }

        &__last-control-content {
            @apply flex flex-col gap-[18px];
            // width: 500px;
            // height: 100px;
            // background-color: gray;
            // display: flex;
            // justify-content: center;
            // align-items: center;
        }
        &__parcel {
            // @apply mt-5;
            @apply flex flex-col gap-[18px];

            &-infoReqAtt {
                // @apply flex flex-wrap items-center gap-[5px];

                @screen lg {
                    @apply flex-nowrap;
                }
            }

            &-reqAtt {
                @apply justify-center mt-4;
                // flex
            }

            &-info {
                @apply bg-[var(--color-gray)] p-[8px] rounded-[8px] max-w-[500px];

                &-icon {
                    @apply flex gap-[10px] items-center cursor-pointer;
                    svg {
                        @apply w-[18px] h-[18px];
                    }
                    &:hover {
                        @apply text-primary;
                    }
                }
                &-info {
                    @apply flex flex-col gap-[10px];
                }
                .paragraphe__normal {
                    @apply text-[12px];
                }
            }

            // &-content {
            //     @apply mt-5;
            // }

            &-notaire {
                @apply flex flex-col gap-[10px];
                // @screen lg {
                //     @apply grid grid-cols-2	items-center;
                // }
                &-att {
                    @apply flex flex-col gap-[14px];
                }
                .spaceV {
                    @screen lg {
                        @apply max-w-[50%];
                    }
                }
            }

            &-sis {
                @apply italic;
            }

            // &-land {
            //     @apply my-[15px];
            // }
        }
        &__radio {
            &-btn {
                @apply flex justify-end;
            }
            &-destination {
                @apply mb-3;
            }
        }
        &__items {
            @apply relative flex flex-col gap-[18px] pl-[18px] ml-[20px];
            &:before {
                content: "";
                @apply absolute left-0 h-full w-[1px] bg-gray;
            }
        }
    }

    .spaceV {
        // @apply mt-3;
        @apply flex flex-col gap-[10px];
    }

    // .type-control {
    //     @apply flex flex-col gap-[14px];
    // }
    .title-upload {
        @apply font-semibold text-[var(--color-gray-icon)] flex items-center gap-[10px];
    }
    .buchon-content {
        @apply flex flex-wrap gap-[10px];
    }
    .buchon {
        @apply cursor-pointer mb-2 p-3 rounded-[8px] font-semibold;
        @include hoverButtonDark;
    }
    .buchon:hover {
        @apply text-white;
    }

    .green {
        @apply bg-[var(--color-green)];
    }
    .orange {
        @apply bg-[var(--color-warn)];
    }
    .red {
        @apply bg-[var(--color-red)];
    }

    .category-parcel {
        @apply bg-[var(--color-gray)] px-[8px] py-[5px] rounded-[8px] italic;
    }

    .selected {
        @apply border-double border-4 border-[white] text-[white];
    }

    .no-region {
        @apply italic text-[var(--color-red)];
    }

    .env-title {
        @apply text-[var(--color-primary)] text-[18px] font-[600];
    }

    .env__permis {
        @apply flex flex-col gap-[14px];
    }

    .btnSwitch {
        @apply flex flex-col items-start gap-[10px];
    }

    .__hr {
        @apply hidden;
    }
</style>
