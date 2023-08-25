<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <Loader v-if="isLoadTheProperty" />
            <div v-else class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Communauté"
                    class="supplier-work__head-title"
                />
                <hr class="__hr" />
                <Alert>
                    <div class="element">
                        <Paragraphe
                            >Vous pouvez consulter votre annonce dans la partie
                            (Divers services) :
                        </Paragraphe>
                        <Button @click="router.push('/community/service')"
                            >Communauté</Button
                        >
                    </div>
                </Alert>
                <Title
                    type="h4"
                    weight="400"
                    label="Mon annonce"
                    class="supplier-work__title"
                />
                <hr class="__hr" />
                <div>
                    <div class="annonce">
                        <Paragraphe
                            >Je souhaite placer des panneaux solaires sur le
                            toit de mon immeuble conjointement avec les
                            propriétaires voisins (achat groupé)</Paragraphe
                        >
                        <Button
                            typeButton="gray"
                            :is-load="isLoadPostAd"
                            @click="postAd(false)"
                            :loading-theme="'dark'"
                            >Poster mon annonce</Button
                        >
                    </div>
                </div>
                <hr class="__hr" />
                <CheckBox
                    name="shareElectricity"
                    label="Je souhaite partager l’électricité surnuméraire produite avec mes voisins"
                    :return-boolean="true"
                    @click="handleChange($event, 'checked')"
                />
                <div v-if="isShow" class="community-post">
                    <Paragraphe
                        ><b
                            >Faites un déclaration par parcelle cadastrale</b
                        ></Paragraphe
                    >
                    <hr class="__hr" />
                    <!-- PANNEL DETAILS -->
                    <Input
                        name-input="price"
                        label="Je suis prêt à revendre l’énergie produite à mes voisins au prix de"
                        placeholder="0.00 €"
                        @input="handleInput"
                    />
                    <Input
                        name-input="marketprice"
                        label="Prix moyen sur le marché"
                        placeholder="0.00 €"
                        @input="handleInput"
                    />
                    <!-- SHARE -->
                    <div
                        v-if="priceDetails.marketprice && priceDetails.price"
                        class="share-with"
                    >
                        <div class="community-post__element">
                            <div class="link">
                                <RoundLink /><a
                                    href="https://energiecommune.be/wp-content/uploads/sites/8/2021/01/Template_Convention_Producteur_Consommateurs_EC.docx"
                                    >Etablir la Convention entre Producteur et
                                    consommateur</a
                                >
                            </div>
                            <Button
                                typeButton="gray"
                                @click="isDisplayAddDoc = true"
                                >Partager avec mes voisins</Button
                            >
                        </div>
                        <div class="community-post__element">
                            <div class="link">
                                <RoundLink /><a
                                    href="https://energiecommune.be/wp-content/uploads/sites/8/2021/01/Template_Convention_CER-CEC_GRD__EC.docx"
                                    >Etablir la Convention entre Producteur et
                                    Gestionnaire du réseau de distribution</a
                                >
                            </div>
                            <Button
                                typeButton="gray"
                                @click="isDisplayAddDoc = true"
                                >Partager avec mes voisins</Button
                            >
                        </div>
                        <div class="community-post__element">
                            <div class="link">
                                <RoundLink /><a
                                    href="https://projets-innovants.brugel.brussels/projets-innovants/procedure-408"
                                    >Envoyer une demande de dérogation à
                                    {{
                                        store.getters[
                                            'SupplierModule/getSupplierName'
                                        ]
                                    }}</a
                                >
                            </div>
                            <Button
                                typeButton="gray"
                                @click="isDisplayAddDoc = true"
                                >Partager avec mes voisins</Button
                            >
                        </div>
                    </div>
                    <div class="community-post__element">
                        <Paragraphe
                            >Demander l’assistance de l’asbl «ENERGIE
                            COMMUNE»</Paragraphe
                        >
                        <Button @click="handleShowModal">Demander</Button>
                    </div>
                    <!-- MODAL -->
                    <Modal
                        :is-show-modal="isShowModal"
                        @on-back="onOpenModal"
                        title="Envoyer l'email"
                        width="650"
                    >
                        <template #content>
                            <div class="modal-content">
                                <div class="modal-content__items">
                                    <Paragraphe>Destinataire</Paragraphe>
                                    <div class="community-post__element">
                                        <Paragraphe>info@apere.org</Paragraphe>
                                    </div>
                                    <hr class="my-[20px] text-gray" />
                                    <Paragraphe>Message</Paragraphe>
                                    <div class="community-post__element">
                                        <Paragraphe>{{ msg }}</Paragraphe>
                                    </div>
                                </div>
                                <Button
                                    :is-load="isLoadSendingMail"
                                    @click="sendMail"
                                    >Envoyer</Button
                                >
                            </div>
                        </template>
                    </Modal>
                    <Modal
                        :is-show-modal="isDisplayAddDoc"
                        @on-back="isDisplayAddDoc = false"
                        title="Envoyer l'email"
                        width="650"
                    >
                        <template #content>
                            <div class="modal-content">
                                <div class="modal-content__items">
                                    <Paragraphe>Description</Paragraphe>
                                    <div class="community-post__element">
                                        <Paragraphe>{{
                                            addDocMsgDesc
                                        }}</Paragraphe>
                                    </div>
                                    <hr class="my-[20px] text-gray" />
                                    <Paragraphe>Document</Paragraphe>
                                    <UploadImage @upload="handleAddDoc" />
                                </div>
                                <Button
                                    @click="postAd(true)"
                                    :is-load="isLoadShare"
                                    >Publier</Button
                                >
                            </div>
                        </template>
                    </Modal>
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import { computed, ref, onMounted } from 'vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import RoundLink from '@/components/Icon/RoundLink.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue';
    import { CommunityService } from '@/services/communityService';
    import { useStore } from 'vuex';
    import PropertyDetailService from '@/services/PropertyDetailService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import SupplierServices from '@/services/supplierService';

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const theProperty = computed(() => route.params.id);

    const isLoadShare = ref<boolean>(false);
    const isLoadTheProperty = ref<boolean>(true);
    const isLoadPostAd = ref<boolean>(false);
    const isLoadSendingMail = ref<boolean>(false);
    const isShow = ref<boolean>(false);
    const isShowModal = ref<boolean>(false);
    const isDisplayAddDoc = ref<boolean>(false);
    const thePropertyAddr = ref<string>();
    const priceDetails = ref<any>({ price: null, marketprice: null });
    const addDocFiles = ref<any[]>([]);
    const mailCore = ref<{
        message?: string;
        email: string;
        urlSite: any;
    }>({
        email: 'testsend@yopmail.com',
        // email: 'info@apere.org',
        urlSite: window.location.origin,
    });
    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },
        {
            label: 'Eléctricité',
        },
        {
            label: 'Panneaux solaires',
        },
    ];

    const user = computed(
        () =>
            `${store.getters['UserModule/getUserDetails'].firstname} ${store.getters['UserModule/getUserDetails'].name}`
    );

    const msg = computed(
        () => `Bonjour,\nJe suis propriétaire d’une installation solaire à ${thePropertyAddr.value}.
            Je souhaiterais partager l’électricité excédentaire produite. Je souhaiterais solliciter votre assistance afin de mener à bien ce processus\n
            Je vous remercie\n
            Bien à vous.\n
            ${user.value}`
    );
    const addDocMsgDesc = computed(
        () =>
            `Mon prix: ${priceDetails.value.price}€\nPrix sur le marché: ${priceDetails.value.marketprice}€`
    );

    onMounted(() => {
        getPropertyDetail();
    });

    function handleChange(event: any, type: any) {
        if (event) {
            isShow.value = true;
        } else {
            isShow.value = false;
        }
    }

    function handleInput(value: any) {
        priceDetails.value = { ...priceDetails.value, ...value };
        console.log(priceDetails.value);
    }

    function handleAddDoc(files: any) {
        addDocFiles.value = files;
    }

    function handleShowModal() {
        isShowModal.value = true;
    }

    function onOpenModal() {
        isShowModal.value = !isShowModal.value;
    }

    async function getPropertyDetail() {
        try {
            const { data } = await PropertyDetailService.getProductDetail(
                route.params.id as any
            );
            thePropertyAddr.value = data.address;
        } catch (error) {
        } finally {
            isLoadTheProperty.value = false;
        }
    }

    async function postAd(withDoc?: boolean) {
        let payload = { idProperty: route.params.id, type: 'purchase' } as any;
        if (withDoc) {
            const params = {
                ...payload,
                content: addDocMsgDesc.value,
                files: addDocFiles.value,
            };
            isLoadShare.value = true;
            payload = new FormData();
            Object.keys(params).forEach((key: any) => {
                if (key === 'files') {
                    params[key].forEach((item: any, index: number) => {
                        payload.append(
                            `files[${index}][file]`,
                            item.originFileObj
                        );
                    });
                } else {
                    payload.append(key, params[key]);
                }
            });
            console.log(params);
        } else {
            isLoadPostAd.value = true;
            payload = {
                ...payload,
                content:
                    'Je souhaite placer des panneaux solaires sur le toit de mon immeuble conjointement avec les propriétaires voisins',
            };
        }
        try {
            const { data } = await CommunityService.postCommunity(payload);
            console.log(data);
            notification.success({
                message:
                    'Votre publication a bien été ajouté dans la section "Communauté"',
            });
        } catch (error) {
            notification.error({
                message: 'Une erreur est apparue, veuillez reesayez',
            });
        } finally {
            isLoadPostAd.value = false;
            isLoadShare.value = false;
            isDisplayAddDoc.value = false;
        }
    }

    async function sendMail() {
        isLoadSendingMail.value = true;
        try {
            mailCore.value = { ...mailCore.value, message: msg.value };
            const { data, code } = await SupplierServices.postSolarMail(
                mailCore.value
            );
            notification.success({ message: 'Votre email a bien été envoyer' });
        } catch (error) {
            notification.error({
                message: `Il se peut qu'une erreur se soit produite, veuillez reessayez.`,
            });
        } finally {
            isLoadSendingMail.value = false;
            isShowModal.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .supplier-work {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
        }
        &__head-title {
            @apply text-[16px] text-grayIcon;
        }
        &__title {
            color: var(--color-primary);
        }
        &__items {
            @apply flex flex-col gap-[18px];
            &--connection {
                @apply flex justify-between items-center;
            }
            &--consumption {
                @apply flex items-center gap-[4px] p-[7px] rounded-[4px] bg-gray text-primary cursor-pointer;
            }
        }
        &__item-supplier {
            @apply flex justify-between items-center px-[14px] py-[12px] rounded-[4px] bg-gray;
            &:deep() {
                button {
                    @apply text-[10px] px-[14px] py-[4px];
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
    .form-wrap {
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
    .element {
        @apply flex justify-between items-center;
        flex-flow: wrap;
    }
    .annonce {
        @apply flex flex-col gap-[18px] w-full items-end;
        &:deep() {
            p {
                @apply w-full p-[10px] rounded-[8px];
                border: 0.5px solid var(--color-gray);
            }
        }
    }
    .community-post {
        @apply w-full p-[18px] rounded-[8px] flex flex-col gap-[18px];
        border: 0.5px solid var(--color-gray);
        &__element {
            @apply p-[10px] flex justify-between items-center rounded-[4px];
            border: 0.5px solid var(--color-gray);
            flex-flow: wrap;
        }
    }
    .link {
        @apply flex gap-[18px];
        a {
            color: var(--color-primary);
        }
    }
    .modal-content {
        @apply flex flex-col gap-[18px] items-end;
        &__items {
            @apply w-full;
        }
        &:deep() {
            .ant-upload-select {
                @apply w-full;
            }
        }
    }
</style>
