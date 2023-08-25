<script lang="ts" setup>
    import { createFormData } from '@/utils/formdata/formData';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Map from '@/components/Icon/Map.vue';
    import UploadFile from '@/components/Display/UploadImage/UploadImage.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import PdfIcon from '@/components/Icon/DocPdf.vue';
    import moment from 'moment';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { isAnArrayorPush } from '@/utils/formdata/formData';
    import store from '@/store';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRouter } from 'vue-router';
    import { message, notification } from 'ant-design-vue';

    const emptyData = ref<string>('Non défini');
    interface IDataCard {
        theProperty?: number;
    }
    const props = defineProps({
        dataCard: {
            type: Array<any>,
            default: '',
        },
    });

    console.log('log dataCard', props.dataCard);

    const router = useRouter();
    let modalShow = ref<boolean>(false);
    let loadingBtn = ref<boolean>(false);
    let descriptionValue = ref<object>();
    const params = ref<any>({
        idTheProperty: '',
        urlClient: '',
        urlSite: '',
        urlDetailTheProperty: '',
        messageDiscussion: '',
        file: [],
    });

    onMounted(() => {
        console.log(props.dataCard, 'dtaCarad');

        params.value.idOffer = props.dataCard[0].id;
        params.value.idTheProperty = props.dataCard[0].theProperty.id;
        params.value.urlDetailTheProperty = `"${window.location.origin}/detail/${props.dataCard[0].theProperty.id}"`;
        params.value.urlClient = `"${window.location.origin}/"`;
        params.value.urlSite = `"${window.location.origin}/"`;
        // for the Deed_sales
        params.value.offer = props.dataCard[0].id;
        params.value.theProperty = 'null';
    });

    const showModal = () => {
        modalShow.value = !modalShow.value;
    };

    const handleUpload = (value: any) => {
        console.log(value, 'handleUpload');

        params.value.file = [value];
        console.log('upload file', params.value.file);
    };
    const handleChange = (value: object) => {
        params.value.messageDiscussion = value;
        console.log('handle change', value);
    };

    async function postAgreementOrDeedNotary() {
        let formData = new FormData();
        console.log(Object.keys(params.value), 'Object.keys(params.value)');
        let param = createFormData(params.value);
        // Object.keys(params.value).forEach((item) => {
        //     if (item === 'file') {
        //         console.log('file', params.value[item]);

        //         if (Array.isArray(params.value[item])) {
        //             console.log('file[]');
        //             params.value[item].forEach((file: any) => {
        //                 formData.append(`${item}[]`, file);
        //             });
        //         }
        //     } else {
        //         isAnArrayorPush(item, params.value[item], formData);
        //     }
        // });

        loadingBtn.value = true;

        switch (props.dataCard[0].documentStatus) {
            case 'waitingDeedSale':
                try {
                    await store.dispatch('NotaryModule/postDeedSales', param);

                    let data = computed(
                        () =>
                            store.getters['NotaryModule/getResponseDeedNotary']
                    );
                    if (data.value.code == 200) {
                        notification['success']({
                            message: 'Acted de vente ajoutée',
                            description:
                                'Votre acte de vente a été bien ajoutée.',
                        });
                        router.push('/');
                    } else {
                        notification['error']({
                            message: "Erreur d'ajout d'acte de vente",
                            description:
                                "Une erreur est survenu lors de l'ajout d'acte de vente.",
                        });
                    }
                } catch (error) {
                    console.log('erreur', error);
                } finally {
                    loadingBtn.value = false;
                    modalShow.value = false;
                }
                console.log("Ajout d'acte de vente clicked");

                break;

            default:
                try {
                    let res = await store.dispatch(
                        'NotaryModule/postCompromiseNotary',
                        param
                    );

                    // let d = computed(
                    //     () => store.getters['NotaryModule/getResponseNotary']
                    // );
                    console.log('status validation compromis:', res);

                    if (res.code == 200) {
                        notification['success']({
                            message: 'Compromis ajoutée',
                            description: 'Votre compromis a été bien ajoutée.',
                        });
                        router.push('/');
                    } else {
                        notification['error']({
                            message: "Erreur d'ajout de compromis",
                            description:
                                "Une erreur est survenu lors de l'ajout de compromis.",
                        });
                    }
                } catch (error) {
                    console.log('erreur', error);
                } finally {
                    loadingBtn.value = false;
                    modalShow.value = false;
                }
                break;
        }
    }
</script>

<template>
    <div>
        <div class="notaryCard" v-for="(data, index) in dataCard" :key="index">
            <div class="notaryCard__head">
                <span class="notaryCard__propertyType">{{
                    data.theProperty.title || emptyData
                }}</span>
                <span class="notaryCard__price"
                    >{{ separatorMillier(data.prices) || emptyData }} €</span
                >
            </div>
            <div class="notaryCard__detail">
                <span>Proprietaire du Bien:</span>
                <span class="font-semibold">{{
                    data.theProperty.user.name || emptyData
                }}</span>
            </div>
            <div class="notaryCard__detail">
                <span>Acheteur du Bien:</span>
                <span class="font-semibold">{{
                    data.user.name || emptyData
                }}</span>
            </div>
            <!--<figure class="notaryCard__image">
            <img
                :src="
                    data.theProperty.images
                        ? data.theProperty.images[
                              data.theProperty.images.length - 1
                          ]
                        : `@/assets/immo.jpeg`
                "
                alt="card product"
            />
        </figure>-->

            <a class="notaryCard__document" :href="data.path">
                <PdfIcon />
                <span>Télecharger le document</span>
            </a>
            <div class="notaryCard__detail">
                <Map />
                <span class="font-semibold"
                    >{{ data.theProperty.address || emptyData }}
                </span>
            </div>
            <div class="notaryCard__detail">
                <span>Date de publication:</span>
                <span class="font-semibold">{{
                    moment(data.datedAt).format('DD/MM/YYYY') || emptyData
                }}</span>
            </div>
            <div class="notaryCard__detail">
                <span>Prix d'offre:</span>
                <span class="font-semibold"
                    >{{ separatorMillier(data.prices) || emptyData }}€</span
                >
            </div>
            <Button @on-click="showModal" class="myBtn">{{
                props.dataCard[0].documentStatus === 'waitingDeedSale'
                    ? 'Ajouter une acte de vente'
                    : 'Ajouter compromis'
            }}</Button>
            <Modal
                :isShowModal="modalShow"
                @onBack="showModal"
                :title="
                    props.dataCard[0].documentStatus === 'waitingDeedSale'
                        ? 'Ajout d\'acte de vente'
                        : 'Ajout de compromis'
                "
            >
                <template #content>
                    <UploadFile
                        :need-base64="false"
                        @upload-single="handleUpload"
                    />
                    <TextArea
                        placeholder="Description"
                        label="Description"
                        nameInput="desc"
                        v-model:value="descriptionValue"
                        @onChange="handleChange"
                    ></TextArea>
                    <Button
                        class="notaryCard__btnSend"
                        @click="postAgreementOrDeedNotary"
                    >
                        <LoadingButton size="sm" v-if="loadingBtn" />
                        Envoyer
                    </Button>
                </template>
            </Modal>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .notaryCard {
        @apply flex flex-col gap-[5px] border py-4 px-4 rounded-[8px];

        &__head {
            @apply flex justify-between mb-[10px];
        }
        &__image {
            @apply w-full;
            img {
                @apply rounded;
            }
        }
        &__document {
            @apply flex mt-[10px] gap-1;
            cursor: pointer;
        }
        &__propertyType {
            @apply font-semibold text-base;
        }
        &__price {
            @apply ml-auto rounded-[15px] py-1 px-3 not-italic font-semibold text-sm text-[#ff8282];
            background: rgba(255, 130, 130, 0.15);
        }
        &__detail {
            @apply flex flex-row gap-2;
        }
        &__btnSend {
            @apply w-full flex justify-end;
            &:deep() {
                .button__primary {
                    @apply lg:w-auto;
                }
            }
            @apply rounded text-sm font-semibold w-full mt-[20px];
        }
    }

    .myBtn {
        &:deep() {
            .button__primary {
                float: right;
            }
        }
    }
</style>
