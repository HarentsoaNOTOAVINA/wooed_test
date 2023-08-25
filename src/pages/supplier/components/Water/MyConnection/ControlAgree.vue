<template>
    <div>
        <Modal
            :is-show-modal="showSendingMailModal"
            title="Confirmer l'envoie de l'email au controller"
            @onBack="showSendingMailModal = false"
            width="750"
        >
            <template #content>
                <div class="sending-mail-modal-container">
                    <p class="title-items">Votre message</p>
                    <textarea
                        style="min-height: 180px"
                        disabled
                        class="modal-input"
                        v-model="emailCore.content"
                    />
                    <p class="title-items mt-3">Destinataire</p>
                    <input
                        type="text"
                        v-model="emailCore.recipient"
                        class="input"
                        disabled
                    />
                    <div
                        v-if="filePathFromListener"
                        class="file-container mt-3"
                    >
                        <h5><u>Piéces jointes</u></h5>
                        <a :href="filePathFromListener" download="document.pdf">
                            <!-- <a-icon style="font-size: 50px" type="file-pdf" /> -->
                        </a>
                    </div>
                    <div class="btn-container">
                        <Button
                            @click="handleSendEmail"
                            class="btn btn-primary"
                        >
                            <!-- <a-icon v-if="loadingSendEmail" type="loading" /> -->
                            Contacter
                        </Button>
                    </div>
                </div>
            </template>
        </Modal>
        <div class="map-title"></div>
        <div  class="map-area">
            <Title
                type="h4"
                weight="600"
                label="Trouver un contrôleur agréé dans votre région"
                class="supplier-work__head-title"
            />
            <div class="">
                <!-- <map-google
                    @noConnectionFound="noConnectionFound"
                    :center="{ lat: 50.84554, lng: 4.35571 }"
                    :zoom="10"
                    :markers="markersOfControls"
                    @showSendingNotif="handleShowSendingNotif"
                    ref="googleMaps"
                /> -->
                <Map
                    class="map"
                    id-map="map"
                    :controller-list="markersOfControls"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Map from '@/components/section/map/index.vue';
    import { controls } from './Constant/controlAgree.data';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { ref, onMounted } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';

    const map = ref<any>(null);

    const filePathFromListener = ref<string>('');
    const markersOfControls = ref<any>([]);
    const loadingSendEmail = ref<boolean>(false);
    const showSendingMailModal = ref<boolean>(false);
    const emailCore = ref<any>({
        content: '',
        recipient: '',
        title: 'DEMANDE DE TRAVEAUX',
    });

    const props = defineProps({
        textChoice: {
            type: String,
            default: `un travaux`,
        },
        fileFromListener: String,
    });

    onMounted(() => {
        getMarkersOfControls();
    });

    function getMarkersOfControls() {
        controls.forEach((control) => {
            var optionMarker = {
                position: {
                    lat: parseFloat(control.address.latitude),
                    lng: parseFloat(control.address.longitude),
                },
                // latitude: control.address.latitude,
                // longitude: control.address.longitude,

                type: 'myPosition',
                // icon: this.$refs.googleMaps.getIcon(
                //     '/images/bien/manage/raccordement/icon-control.png'
                // ),
                icon: `${window.location.origin}/src/assets/icon-control.png`,
                info:
                    "<div style='padding:10px'>    " +
                    '<h6>' +
                    control.title +
                    '</h6>' +
                    '<div>' +
                    "<p  style='margin-bottom:0;'>" +
                    '<strong> ' +
                    control.address.addressLine2 +
                    ' </strong>' +
                    '</p>' +
                    "<p  style='margin-bottom:0;'>" +
                    '<strong> ' +
                    `${control.address.postalCode} ${control.address.locality}` +
                    ' </strong>' +
                    '</p>' +
                    '<div>' +
                    "<a href='" +
                    `${control.email}` +
                    "'  target='_blank' style='margin-bottom:0;'>" +
                    '<strong> ' +
                    `${control.email}` +
                    ' </strong>' +
                    '</a>' +
                    '</div>' +
                    '<div>' +
                    "<a href='" +
                    `${control.website}` +
                    "'  target='_blank' style='margin-bottom:0;'>" +
                    '<strong> ' +
                    `${control.website}` +
                    ' </strong>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    ' </div>',
                isInfoWindow: true,
                objInfo: control,
            };
            markersOfControls.value.push(optionMarker);
        });
    }

    function noConnectionFound(value: any) {
        value && console.log('noConnectionFound');
    }

    function handleShowSendingNotif(markerCtn: any) {
        let sendBtn = null;
        const additonalContent =
            filePathFromListener.value &&
            `Vous trouverez ci-joint: - Le document sur la commande de travaux
            `;

        console.log(markerCtn, 'markerCtn');
        emailCore.value = {
            ...emailCore.value,
            path: '',
            urlSite: process.env.BASE_URL,
            // recipient: markerCtn.email,
            recipient: 'manjaka@yopmail.com',
            content: `Bonjour,
    Je souhaite obtenir un devis pour: - ${props.textChoice}
    Le bien est situé à {$store.state.accountProductDetails.product.address}
    ${additonalContent}
    `,
        };
        alert({
            duration: 10,
            message: 'Notification',
            description: `
                        Contacter ${emailCore.value.recipient} dans la mini boite mail?
                `,
            // btn: () => {
            //     sendBtn = this.$createElement(
            //         Button,
            //         {
            //             props: {
            //                 type: 'primary',
            //                 loading: false,
            //             },
            //             on: {
            //                 click: () => {
            //                     showSendingMailModal.value = true;
            //                     this.$notification.close('notification');
            //                 },
            //             },
            //         },
            //         ['Contacter']
            //     );
            //     return sendBtn;
            // },
            key: `notification`,
            onClose: close,
        });
    }

    function handleSendEmail() {
        // loadingSendEmail.value = true;
        // this.$services.bien
        //     .post('post_provider_solar_operation_email', {
        //         ...emailCore.value,
        //     })
        //     .then(({ status }) => {
        //         if (status === 200) {
        //             loadingSendEmail.value = false;
        //             this.$notification['success']({
        //                 message: 'Succès',
        //                 description: 'Votre email a bien été envoyé',
        //             });
        //         } else {
        //             this.$notification['success']({
        //                 message: 'Erreur',
        //                 description:
        //                     "Erreur erreur s'est produite, veuillez reéssayer",
        //             });
        //         }
        //         showSendingMailModal.value = false;
        //     });
    }
</script>

<style lang="scss" scoped>
    .map {
        height: 60vh;
        width: 100%;
    }
    .map-area {
        @apply flex flex-col gap-[18px];
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
