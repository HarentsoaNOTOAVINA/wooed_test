<template>
    <div class="urba__container">
        <div class="urba__class spaceV">
            <Title
                type="h2"
                label="Mesure de classement"
                weight="bold"
                class="urba-title"
            />
            <div class="urba__items">
                <label class="para-bold"
                    >Le bien est classé &nbsp;<span class="no-class">Non</span>
                    <!-- <span class="yes-class">Oui</span> --></label
                >
            </div>
        </div>
        <div class="urba__pemit spaceV">
            <Title
                type="h2"
                label="Permis d'urbanisme"
                weight="bold"
                class="urba-title"
            />
            <div class="urba__items">
                <span class="para-bold"
                    >Insérer ici les permis d'urbanisme délivrés pour le bien
                </span>
                <UploadImage
                    name="documentUrbanismeFile"
                    @upload-single-with-name="handleUploadPermit"
                />
                <!-- :default-file-list="propertyDatas.documentUrbanismeFile" -->
            </div>
        </div>
        <div class="urba__geoporel spaceV mb-5">
            <Title
                type="h2"
                label="Etat du sol"
                weight="bold"
                class="urba-title"
            />
            <div class="urba__items">
                <label class="para-bold"
                    >Votre bien est sis :
                    <span class="category-parcel">Aucun</span>
                </label>
            </div>
        </div>
        <div class="urba__information spaceV">
            <Title
                type="h2"
                label="Renseignements urbanistiques"
                weight="bold"
                class="urba-title"
            />
            <div class="urba__items">
                <div class="urba__info-container">
                    <div class="urba__info-icon" @click="handleShowInfo">
                        <span class="para-bold"
                            >Renseignements urbanistiques
                        </span>
                        <Info class="information-info" />
                    </div>
                    <div class="urba__info-content" v-if="showInfo">
                        (Belgique) Selon la loi, l'offrant doit disposer de ces
                        renseignements avant de conclure une convention
                        d'acquisition valable.
                    </div>
                </div>
                <div class="urba__info-reqDem">
                    <Button
                        v-if="showBtnRensignNotary"
                        type-button="border"
                        @on-click="handleDemande('toNotary')"
                        >Demander a un notaire de proceder à la demande
                    </Button>

                    <Button
                        type-button="border"
                        @on-click="handleDemande(regionSelected)"
                        >Demander les renseignements urbanistiques à l’autorité
                        compétente
                    </Button>
                </div>
            </div>
        </div>

        <div class="urba__moa spaceV">
            <Modal
                title="Demande de renseignement"
                :is-show-modal="showModalUrban"
                @on-back="handleClosedModal"
                ><template #content>
                    <div class="urba__modal">
                        <!-- <Radio
                            label="Demande de renseignement pour quelle region?"
                            name="region"
                            :element="regions"
                            @get-radio-input="handleRadioRegion"
                        /> -->

                        <Paragraphe v-if="regionSelected" class="para-bold mb-3"
                            >Demande de renseignement pour la région du
                            {{ regionSelected }}
                        </Paragraphe>
                        <!-- v-if="bruxelleNotary" -->
                        <div class="env__request-notary">
                            <SelectAutoComplet
                                @change-select="handleNotarySelected"
                                :options="notaryList"
                                placeholder="Selectionner notaire"
                                name="test"
                                sub-title="Notaire"
                            />

                            <div class="urba__info-upload spaceV">
                                <label class="para-bold"
                                    >Ajouter ici les renseignements
                                    urbanistiques
                                </label>
                                <UploadImage
                                    name="rensgnementsUrbainfile"
                                    @upload-single-with-name="
                                        handleUploadInfoUrban
                                    "
                                />
                                <!-- :default-file-list="propertyDatas.rensgnementsUrbainfile" -->
                            </div>
                        </div>
                        <template v-for="(item, index) in infosUrban">
                            <div
                                class="info-region-content spaceV"
                                v-if="
                                    item.region == regionSelected &&
                                    showFormRenseign
                                "
                            >
                                <label class="para-bold"
                                    >Renseignements urbanistiques
                                </label>

                                <Paragraphe class="urba__info-region">
                                    {{ item.messageInfo }}
                                    <!-- {{ setUrbanData(item.messageInfo) }} -->
                                </Paragraphe>

                                <div
                                    class="urba__info-other spaceV"
                                    v-if="item.hasOther"
                                >
                                    <div class="urba__info-description">
                                        <label class="para-bold"
                                            >Un descriptif sommaire du bien
                                        </label>
                                        <div
                                            class="urba__info-desc-caracteristic -border"
                                        >
                                            <Title
                                                type="h4"
                                                label="Caractéristiques des façades visibles depuis l’espace public"
                                                class="title-desc"
                                            />
                                            <div class="urba__info-camera">
                                                <div class="urba__video-desc">
                                                    <video
                                                        id="video"
                                                        class="video"
                                                        autoplay
                                                        v-if="cameCaracteristic"
                                                    />
                                                    <canvas id="canvas" />
                                                </div>
                                                <div
                                                    class="urba__info-btnCamera"
                                                >
                                                    <Button
                                                        @on-click="startCamera"
                                                        v-if="
                                                            !cameCaracteristic
                                                        "
                                                    >
                                                        Start Camera
                                                    </Button>
                                                    <Button
                                                        v-if="cameCaracteristic"
                                                        :style="{
                                                            borderRadius: '50%',
                                                        }"
                                                        @on-click="capture"
                                                    >
                                                        <!--   Capture Camera -->
                                                        <CameraIcon size="xs" />
                                                    </Button>
                                                    <Button
                                                        @on-click="stopCamera"
                                                    >
                                                        Stop Camera
                                                    </Button>
                                                </div>
                                            </div>
                                            <div
                                                class="urba__caracteristique spaceV"
                                                v-if="!cameCaracteristic"
                                            >
                                                <label class="para-bold"
                                                    >Photos de la façade
                                                </label>
                                                <UploadImage
                                                    name="propertySummaryFile"
                                                    @upload-single-with-name="
                                                        handleUploadFacade
                                                    "
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="urba__info-desc-toiture -border spaceV"
                                            v-if="!cameCaracteristic"
                                        >
                                            <Title
                                                type="h4"
                                                label="et des toitures "
                                                class="title-desc"
                                            />

                                            <div class="urba__info-toit">
                                                <Select
                                                    label="Toiture"
                                                    name="roofProperty"
                                                    placeholder="Selectionner toitures"
                                                    :options="toitures"
                                                    @change-select="
                                                        handleSelectDestination
                                                    "
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="urba__info-desc-destination -border spaceV"
                                            v-if="!cameCaracteristic"
                                        >
                                            <Title
                                                type="h4"
                                                label="Destination du bien "
                                                class="title-desc"
                                            />

                                            <div class="urba__info-destination">
                                                <Select
                                                    label="Destination"
                                                    name="destinationProperty"
                                                    placeholder="Selectionner la destination du bien"
                                                    :options="destinations"
                                                    @change-select="
                                                        handleSelectDestination
                                                    "
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="urba__info-unityNumber -border spaceV"
                                            v-if="!cameCaracteristic"
                                        >
                                            <Title
                                                type="h4"
                                                label="Nombre d’unités de logement "
                                                class="title-desc"
                                            />

                                            <div class="urba__info-nbrUnity">
                                                <Input
                                                    input-type="number"
                                                    label="Logement"
                                                    name-input="housingUnit"
                                                    placeholder="0"
                                                    @input="handleInputUrba"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="urba__info-stationLocation -border spaceV"
                                            v-if="!cameCaracteristic"
                                        >
                                            <Title
                                                type="h4"
                                                label="Nombre d’emplacements de stationnement"
                                                class="title-desc"
                                            />

                                            <div class="urba__info-nbrStation">
                                                <Input
                                                    input-type="number"
                                                    label="Stationnement"
                                                    name-input="parkingCount"
                                                    placeholder="0"
                                                    @input="handleInputUrba"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="urba__info-titleProperty -border spaceV"
                                            v-if="!cameCaracteristic"
                                        >
                                            <Title
                                                type="h4"
                                                label="Copie du titre de propriété"
                                                class="title-desc"
                                            />

                                            <div class="urba__info-copyTitle">
                                                <UploadImage
                                                    name="propertyTitleCopyFile"
                                                    @upload-single-with-name="
                                                        handleUploadTitleProperty
                                                    "
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="urba__info-propertyPlan -border spaceV"
                                            v-if="!cameCaracteristic"
                                        >
                                            <Title
                                                type="h4"
                                                label="Plan du bien"
                                                class="title-desc"
                                            />

                                            <div class="urba__info-copyTitle">
                                                <div
                                                    class="urba__info-plan"
                                                    v-for="(
                                                        plan, index
                                                    ) in propertyPlan"
                                                >
                                                    <div
                                                        class="urba__info-plan-menu"
                                                        @click="
                                                            handleClickedPlan(
                                                                plan.value
                                                            )
                                                        "
                                                    >
                                                        {{ plan.label }}
                                                    </div>
                                                    <div
                                                        class="urba__info-plan-upload"
                                                        v-if="
                                                            plan.value ==
                                                            valuePlan
                                                        "
                                                    >
                                                        <UploadImage
                                                            :name="
                                                                plan.nameUpload
                                                            "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="urba__info-paiment -border spaceV"
                                            v-if="!cameCaracteristic"
                                        >
                                            <Title
                                                type="h4"
                                                label="Payement"
                                                class="title-desc"
                                            />

                                            <div class="urba__info-copyTitle">
                                                <Switch
                                                    :to-align="true"
                                                    name="hasPayed"
                                                    item-label="Avez-vous déjà une preuve de paiment?"
                                                    @switch-value="
                                                        handleSwitchPaiment
                                                    "
                                                />
                                                <!--    <PayementForm
                                                    v-if="!hasPayed"
                                                    :budget="900"
                                                    :registration-info="20"
                                                    :proposition-id="1"
                                                    @hide-form="true"
                                                />
                                            -->
                                                <div
                                                    class="urba__info-proof"
                                                    v-if="hasPayed"
                                                >
                                                    <label class="para-bold"
                                                        >Preuve de payement
                                                    </label>
                                                    <UploadImage
                                                        name="bankProofFile"
                                                        @upload-single-with-name="
                                                            handleUploadTitleProof
                                                        "
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- <div class="urba__info-button spaceV"></div> -->
                        <Button
                            @on-click="handleContactAutority"
                            v-if="!cameCaracteristic"
                            >Envoyer la demande
                            <CheckIcon v-if="requestInfoSending" />
                        </Button>
                    </div>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import PayementForm from '@/pages/transport/components/PaymentForm.vue';

    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import CameraIcon from '@/components/Icon/CameraDevice.vue';
    import SelectAutoComplet from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Info from '@/components/Icon/Info.vue';
    import { reactive, ref, onMounted } from 'vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import { useStore } from 'vuex';
    import CheckIcon from '@/components/Icon/CheckIcon.vue';

    interface IPropertyPlan {
        label: string;
        value: string;
        nameUpload: string;
    }

    const store = useStore();

    let showInfo = ref<boolean>(false);
    let showFormRenseign = ref<boolean>(true);
    let bruxelleNotary = ref<boolean>(true);
    let showBtnRensignNotary = ref<boolean>(false);
    let showModalUrban = ref<boolean>(false);
    let cameCaracteristic = ref<boolean>(false);
    let hasPayed = ref<boolean>(true);
    let requestInfoSending = ref<boolean>(false);
    let regionSelected = ref<string>();
    let valuePlan = ref<string>();

    const camData = reactive<{
        video: any;
        stream: MediaStream | undefined;
        oldstream: MediaStream | undefined;
        track: MediaStreamTrack | undefined;
        canvas: any;
    }>({
        video: undefined,
        stream: undefined,
        oldstream: undefined,
        track: undefined,
        canvas: undefined,
    });

    const propertyPlan = ref<IPropertyPlan[]>([
        {
            label: 'Introduire ici les plans du bien',
            value: 'plan',
            nameUpload: 'planProperty',
        },
        {
            label: 'Esquisser ici le croquis du bien (a main levée)',
            value: 'sketch',
            nameUpload: 'sketchProperty',
        },
        {
            label: 'Introduire ici la figure 3D du bien',
            value: '3D',
            nameUpload: '3D',
        },
    ]);

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    function handleDemande(sender?: string) {
        showModalUrban.value = !showModalUrban.value;
        switch (sender) {
            case 'toNotary':
                showFormRenseign.value = false;
                break;
            case 'Bruxelles':
                bruxelleNotary.value = false;
                break;

            default:
                break;
        }

        // if (sender == 'toNotary') {
        //     showFormRenseign.value = false;
        // }
        // setDataToStore({ urbanData: 'Urban data' });
    }

    function handleShowInfo() {
        showInfo.value = !showInfo.value;
    }

    function handleUploadPermit(value: object) {
        setDataToStore(value);
        setDataToStore({
            documentUrbanismeTypeName:
                'les permis d’urbanisme délivrés pour le bien vendu',
        });
    }

    function handleUploadInfoUrban(value: object) {
        setDataToStore(value);
        setDataToStore({
            rensgnementsUrbainName: 'Renseignements urbanistiques',
        });
    }
    // function setUrbanData(value: string) {
    //     setDataToStore({
    //         urbanData: value,
    //     });

    //     console.log(value, 'datattttttttttttttttttta');
    // }

    function handleUploadTitleProperty(value: object) {
        setDataToStore(value);
        setDataToStore({
            propertyTitleCopyName: 'Copie du titre de propriété',
        });
    }

    function handleUploadFacade(value: object) {
        setDataToStore(value);
        setDataToStore({
            propertySummaryName: 'Un descriptif sommaire du bien',
        });
    }

    function handleUploadTitleProof(fileProof: object) {
        setDataToStore(fileProof);
        setDataToStore({
            bankProofName: 'Preuve de paiement',
        });
    }

    function handleNotarySelected(notaireSelected: object) {
        console.log(notaireSelected, 'Notaire seledt3d');
    }

    function handleSelectDestination(destination: object) {
        setDataToStore(destination);
    }

    function handleInputUrba(data: object) {
        setDataToStore(data);
    }

    function handleRadioRegion(valueRadion: any) {
        regionSelected.value = valueRadion.target.value;
    }

    function handleContactAutority() {
        requestInfoSending.value = true;
        setDataToStore({ requestInformationUrba: true });

        setTimeout(() => {
            showModalUrban.value = false;
        }, 3000);
    }

    interface IRegion {
        label: string;
        value: string;
    }

    interface INotaryList {
        label: string;
        value: string;
        email: string;
    }

    interface IInfo {
        region: string;
        messageInfo: string;
        hasOther?: boolean;
    }

    const regions = ref<IRegion[]>([
        {
            label: 'Flandre',
            value: 'Flandre',
        },
        {
            label: 'Bruxelles',
            value: 'Bruxelles',
        },
        {
            label: 'Wallonie',
            value: 'Wallonie',
        },
        {
            label: 'Luxembourg',
            value: 'Luxembourg',
        },
        {
            label: 'France',
            value: 'France',
        },
    ]);

    let messageInfoContent = {
        bruxelles:
            'La demande doit être adressée au Service de l’Urbanisme de la commune et doivent y être joints les documents suivants',
        luxembourg:
            'Aucune disposition légale n’impose au vendeur de transmettre un certificat/une attestation d’urbanisme à l’acquéreur',
        france: 'Reprendre le formulaire ci-joint (uniquement le certificat d’urbanisme d’information)',
    };

    const infosUrban = ref<IInfo[]>([
        {
            region: 'Bruxelles',
            messageInfo: messageInfoContent.bruxelles,
            hasOther: true,
        },
        {
            region: 'Luxembourg',
            messageInfo: messageInfoContent.luxembourg,
        },
        {
            region: 'France',
            messageInfo: messageInfoContent.france,
        },
    ]);

    const notaryList = ref<INotaryList[]>([]);
    const destinations = ref<Array<any>>([]);
    const toitures = ref<Array<any>>([]);

    let stream: MediaStream | null = null;
    const video = ref<HTMLVideoElement | null>(null);

    onMounted(async () => {
        await getNotaryList();
        await getRegion();
    });

    function getNotaryList() {
        const notaryLists = store.getters['AddProductModule/getNotaryList'];
        let destinationStore =
            store.getters['AddProductModule/getDestinations'];
        toitures.value = store.getters['AddProductModule/getToitures'];

        notaryLists.forEach((element: any) => {
            notaryList.value.push({
                label: element.name,
                value: element.name,
                email: element.email,
            });
        });

        destinationStore.forEach((data: any) => {
            destinations.value.push({
                id: data.value,
                label: data.label,
                value: data.label,
            });
        });
    }

    async function getRegion() {
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
                regionSelected.value = 'France';
                setDataToStore({ urbanData: messageInfoContent.france });

                break;
            case 'Luxembourg':
                regionSelected.value = 'Luxembourg';
                setDataToStore({ urbanData: messageInfoContent.luxembourg });

                break;

            default:
                break;
        }

        switch (regionStore) {
            case 'Bruxelles':
                regionSelected.value = 'Bruxelles';
                setDataToStore({ urbanData: messageInfoContent.bruxelles });
                showBtnRensignNotary.value = true;

                break;
            case 'Région Wallonne':
                regionSelected.value = 'Wallonie';
                break;
            case 'Flandres':
                regionSelected.value = 'Flandre';
                break;

            default:
                break;
        }
    }

    async function startCamera() {
        setTimeout(async () => {
            camData.canvas = document.querySelector('#canvas');
            camData.video = document.querySelector('#video');
            camData.stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            camData.oldstream = camData.stream;
            camData.video.srcObject = camData.stream;
            camData.track = camData.stream.getAudioTracks()[0];
        }, 100);

        cameCaracteristic.value = true;
    }

    function handleClickedPlan(value: string) {
        console.log(value, 'Value menu clicked');
        valuePlan.value = value;
    }

    function handleSwitchPaiment() {
        // hasPayed.value = !hasPayed.value;
    }

    function handleClosedModal() {
        showModalUrban.value = false;
        showFormRenseign.value = true;
        bruxelleNotary.value = true;
    }

    async function capture() {
        camData.canvas
            .getContext('2d')
            .drawImage(
                camData.video,
                0,
                0,
                camData.canvas.width,
                camData.canvas.height
            );
        const img = camData.canvas.toDataURL('image/jpeg');
        // connst blob = this.dataURItoBlob(this.img);
        stopCamera();

        console.log(img, 'image');
        cameCaracteristic.value = false;
    }

    async function stopCamera() {
        await camData.stream
            ?.getTracks()
            .forEach(async (track: MediaStreamTrack) => {
                await track.stop();
            });

        cameCaracteristic.value = false;
    }

    function base64ToBlob(base64: string) {
        const _ = base64.split('base64,')[1];
        const bytes = atob(_);
        let byteArray: any = new Array(bytes.length);

        for (let i = 0; i < bytes.length; i++) {
            byteArray[i] = bytes.charCodeAt(i);
        }
        byteArray = new Uint8Array(byteArray);
        return new Blob([byteArray], { type: 'image/jpeg' });
    }
    function BlobToFile(blob: any, filename: string = 'File') {
        return new File([blob as any], filename, {
            lastModified: new Date().getTime(),
            type: blob.type,
        });
    }
    function base64ToFile(base64: string) {
        const blob = base64ToBlob(base64);
        return BlobToFile(blob);
    }

    function setDataToStore(value: any) {
        console.log(value, 'Value');
        store.dispatch('AddProductModule/setPropertyData', {
            data: value,
        });
    }
</script>

<style lang="scss" scoped>
    .urba {
        &__container {
            // @apply bg-white rounded-[8px] p-[10px];
            @apply flex flex-col gap-[18px];
            @screen md {
                @apply gap-[24px];
            }
        }
        &__items {
            @apply relative flex flex-col gap-[18px] py-[8px] ml-[20px] pl-[18px];
            &:before {
                content: '';
                @apply absolute top-0 left-0 w-[1px] h-full bg-gray;
            }
        }
        &__info {
            &-container {
                @apply flex flex-col gap-[10px];
            }
            &-icon {
                @apply cursor-pointer flex items-center gap-[10px] w-max;
                &:deep() {
                    svg {
                        @apply w-[18px] h-[18px];
                    }
                }
                &:hover {
                    .para-bold {
                        @apply text-primary;
                    }
                }
            }
            &-content {
                @apply bg-[var(--color-gray)] p-[8px] rounded-[8px] max-w-[500px];
            }

            &-button {
                @apply flex justify-end;
            }

            &-region {
                @apply bg-[var(--color-gray)] p-[5px] rounded-[8px];
            }

            &-camera {
                @apply w-[200px] h-[200px];
            }

            &-btnCamera {
                @apply flex gap-[10px] mt-3 w-[430px];
            }

            &-reqDem {
                @apply grid gap-[10px];
                &:deep() {
                    button {
                        @apply w-full h-full;
                    }
                }

                @screen lg {
                    @apply grid-cols-2;
                }
            }

            &-plan {
                &-menu {
                    @apply mt-3 cursor-pointer text-white border-solid border-[var(--color-gray)] p-[8px] rounded-[8px] bg-[var(--color-primary)] text-center;

                    @screen md {
                        @apply text-left;
                    }
                }
                &-upload {
                    @apply mt-1;
                }
            }
        }
        &__modal {
            @apply flex flex-col gap-[18px];
        }
    }

    .para-bold {
        @apply font-semibold text-[var(--color-gray-icon)];
    }

    .spaceV {
        @apply flex flex-col gap-[10px];
    }

    .information-info {
        @apply cursor-pointer;
    }

    .-border {
        border: 1px solid var(--color-primary);
        padding: 5px;
        border-radius: 8px;
    }

    .title-desc {
        @apply text-[var(--color-primary)];
    }

    .category-parcel {
        @apply bg-[var(--color-gray)] px-[8px] py-[5px] rounded-[8px] italic;
    }

    .no-class {
        @apply bg-[var(--color-gray)] py-[5px] px-[15px] rounded-[8px];
    }
    .yes-class {
        @apply bg-[var(--color-green)] py-[5px] px-[15px] rounded-[8px];
    }

    .urba-title {
        @apply text-primary font-[600] text-[18px];
    }
    .env__request-notary {
        @apply flex flex-col gap-[18px];
        &:deep() {
            .select-autocomplete {
                @apply flex flex-col gap-[10px];
            }
            .label-select {
                @apply mx-0;
            }
        }
    }
</style>
