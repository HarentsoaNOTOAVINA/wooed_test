<script lang="ts" setup>
    import jsPDF from 'jspdf';
    import { ref, reactive, onMounted, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    // import {createFormData} from "@/utils/formdata/formData";
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Card from './card.vue';
    import { notification } from 'ant-design-vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        hasTitle: {
            type: Boolean,
            default: false,
        },
        typeSignatureState: {
            type: String,
            default: 'entry',
        },
        isFromHtml: {
            type: Boolean,
            default: false,
        },
        idOfferLease: {
            type: Number,
        },
    });

    interface payloadI {
        offerLease: any;
        inventoryImages: { [key: string]: any }[];
        file: any;
        type: string;
        status: string;
    }

    const route = useRoute();
    const store = useStore();
    const text = reactive<{ [key: string]: any }>({
        title: 'Etat des lieux',
        imgLable: 'Image',
        imgInfo: 'La taille maximale par image est 5MB Formats acceptés: JPG',
        generateAction: 'Generer le pdf',
    });
    let requestSending = ref<boolean>(false);

    const imgFiles = ref<any[]>([]);

    const cardEntity = {
        img: '',
        comment: '',
    };

    const cardData = ref<any>([]);
    const payload = ref<payloadI>({
        // offerLease: parseInt(route.params.id as never),
        offerLease: props.idOfferLease,
        inventoryImages: [],
        file: null,
        type: props.typeSignatureState,
        status: 'sent',
    });

    watch(
        () => props.idOfferLease,
        (newValue, oldValue) => {
            payload.value.offerLease = newValue;
        }
    );

    const handleUpload = (event: any) => {
        console.log('DBG event: ', event.fileList);
        const x: any = [];

        event.fileList.forEach((elt: any) => {
            x.push({ file: elt.originFileObj });
        });
        imgFiles.value = x;

        let cardInstance: any = JSON.stringify(cardEntity);
        cardInstance = JSON.parse(cardInstance);

        cardData.value.push({
            ...cardInstance,
            img: event.base64.slice(-1).pop(),
        });
    };

    const handleComment = (event: any) => {
        cardData.value[event.key].comment = event.comment;
    };

    function adaptSize(w: number, h: number) {
        if (w >= 600 && w < 800) {
            return { width: w / 2, height: h / 2 };
        } else if (w >= 800 && w <= 1024) {
            return { width: w / 3, height: h / 3 };
        }
        return { width: w, height: h };
    }

    function toFormdata(payload: any) {
        const f = new FormData();

        for (let index = 0; index < cardData.value.length; index++) {
            f.append(
                `inventoryImages[${index}][comment]`,
                cardData.value[index].comment
            );
        }

        Object.keys(payload).forEach((key: any) => {
            if (key === 'inventoryImages') {
                console.log('DBG inventoryImages', payload[key]);
                payload[key].forEach((img: any, idx: number) => {
                    f.append(
                        `inventoryImages[${idx}][file]`,
                        img.file,
                        'file.jpeg'
                    );
                    // f.append(`key[${idx}][comment]`, cardData.value[idx].comment )
                });
            } else if (key === 'file') {
                // f.append(`file[0]`, payload[key], 'iventory');
                props.isFromHtml
                    ? f.append(`file`, payload[key], 'iventory')
                    : f.append(`file[0]`, payload[key], 'iventory');
            } else {
                f.append(key, payload[key]);
            }
        });
        return f;
    }

    const generatePdf = async () => {
        const dx = 1240;
        const dy = 1504;
        const Xtext: number = 80;
        let lastImgHeight = 0;
        const commentLabel = 'Commentaires : ';
        const doc = new jsPDF('portrait', 'px', 'a4');

        cardData.value.forEach((elt: any, key: number) => {
            if (key === 0) {
                const img = new Image();
                img.src = elt.img;
                const { width, height }: any = adaptSize(
                    img.naturalWidth,
                    img.naturalHeight
                );
                doc.addImage(elt.img, 'JPEG', Xtext, 40, width, height);
                lastImgHeight = height;
                const text = doc.splitTextToSize(elt.comment, 300);
                doc.text(commentLabel, Xtext, lastImgHeight + 60);
                doc.text(text, Xtext, lastImgHeight + 80);

                // }else if(key > 1 && (key % 2) === 0 ){
            } else {
                doc.addPage('a4');
                doc.setPage(key + 1);
                const img = new Image();
                img.src = elt.img;
                const { width, height }: any = adaptSize(
                    img.naturalWidth,
                    img.naturalHeight
                );

                doc.addImage(elt.img, 'JPEG', Xtext, 40, width, height);
                lastImgHeight = height;
                doc.text(commentLabel, Xtext, lastImgHeight + 60);
                const text = doc.splitTextToSize(elt.comment, 300);
                doc.text(text, Xtext, lastImgHeight + 80);
            }
        });
        const x = await doc.output('blob');
        payload.value.file = x;
        payload.value.inventoryImages = imgFiles.value;

        await doc.save();

        // const formdata = createFormData(payload);
        const form__ = toFormdata(payload.value);

        store.dispatch('RentalModule/postInventoryDatas', form__);
        // console.log('DBg');
    };

    async function generatePdfFromHtml() {
        const opt = {
            margin: [0, 10, 0, 10],
            filename: 'Etat_de_lieu_de_sortie.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { dpi: 192, scale: 2, letterRendering: true },
            pagebreak: { mode: 'avoid-all' },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        };
        const worker = new (window as any).html2pdf.Worker(opt);
        const pdfGenerated = await worker
            .from(document.getElementById('overview-form'))
            .outputPdf('blob') // Ajouter cette ligne pour obtenir un blob
            .then((blob: any) => {
                worker.from(document.getElementById('overview-form')).save();

                return blob; // Retourner le blob
            });
        payload.value.file = pdfGenerated;
        payload.value.inventoryImages = imgFiles.value;

        const form__ = toFormdata(payload.value);

        try {
            requestSending.value = true;
            let response: any = await store.dispatch(
                'RentalModule/postInventoryDatas',
                form__
            );

            if (response.code == 201) {
                notification['success']({
                    message: 'État  de lieux de sortie ajouter',
                });
            }
        } catch (error) {
            console.error(error, 'Error when adding state ground');

            notification['warning']({
                message:
                    'Une erreur est survenu, Veuillez verifier les informations',
            });
        } finally {
            requestSending.value = false;
        }
    }

    function postPdf() {
        props.isFromHtml ? generatePdfFromHtml() : generatePdf();
    }

    function handleDeleteEvent($event: any) {
        cardData.value.splice($event, 1);
    }
</script>

<template>
    <div class="overview-container">
        <div class="overview-title" v-if="!props.hasTitle">
            <P type="bold">{{ text.title }}</P>
            <hr />
        </div>
        <div class="overview-form">
            <div class="overview-title">
                <P type="bold">{{ text.imgLable }}</P>
                <p>{{ text.imgInfo }}</p>
            </div>
            <UploadImage
                :need-base64="true"
                :type-image="true"
                :show-preview="false"
                @upload="handleUpload"
            />
        </div>

        <div
            class="overview-card-container"
            v-if="cardData.length > 0"
            id="overview-form"
        >
            <Card
                v-for="(data, key) in cardData"
                :key="key"
                :id="key"
                :image="data.img"
                :title="` Photo ${key + 1}`"
                @comment="handleComment"
                @delete="handleDeleteEvent"
            />
            <div class="signature">
                <div class="signature__bailleur">
                    <input type="hidden" name="[Signer1.Fullname1]" />
                </div>
                <div class="signature__renter">
                    <input type="hidden" name="[Signer1.Fullname2]" />
                </div>
            </div>
        </div>
        <div class="overview-action" v-if="cardData.length > 0">
            <Button
                class="overview-action-btn"
                type="secondary"
                @click="postPdf"
            >
                <LoadingButton size="xs" v-if="requestSending" />
                {{ text.generateAction }}
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .overview {
        &-title {
            @apply p-2 place-content-10px;
            border-radius: 8px;
            color: var(--color-gray-icon);
        }
        &-container {
            @apply w-full flex flex-col bg-white;
        }

        &-card-container {
            @apply w-full flex flex-col;
            min-height: 50vh;
            @screen lg {
                min-height: none;
            }
        }
        &-card {
            @apply w-full flex flex-col;

            @screen lg {
                @apply w-full flex flex-row;
            }
        }
        &-action {
            @apply w-full flex flex-row justify-end;

            &-btn {
                @apply p-2;
                font-weight: bold;
                border-radius: 8px;
                color: white;
                background-color: var(--color-primary);
            }
        }
    }

    .signature {
        @apply mt-3 flex justify-between;
    }
</style>
