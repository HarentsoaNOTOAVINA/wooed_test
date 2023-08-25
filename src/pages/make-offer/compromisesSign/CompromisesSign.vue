<template>
    <div class="container-pdf-html flex justify-center">
        <a-affix :offsetTop="70">
            <div class="container-pdf-html__actions">
                <Paragraphe
                    class="flex text-pd items-center justify-center gap-[10px] mb-[10px]"
                >
                    <Info :size="'xs'" /><span
                        >Ceci est utile pour la signature de votre document,
                        après avoir cliquer sur le button ci-dessous vous pouvez
                        mettre l'element sur l'endroit ou vous pouvez mettre
                        votre signature.</span
                    >
                </Paragraphe>
                <div class="button__container">
                    <Button @on-click="checkForm">
                        <AddOptions />
                        Placer les deux plages de signature
                    </Button>
                    <Button
                        v-if="show"
                        :disabled="loading"
                        @on-click="handleSave"
                    >
                        <!-- <a-spin v-if="loading">
                            <a-icon
                                slot="indicator"
                                type="loading"
                                style="font-size: 24px"
                                spin
                            />
                        </a-spin> -->
                        <LoadingButton size="xs" theme="dark" v-if="loading" />
                        <Save v-else />
                        Enregistrer
                    </Button>
                </div>
            </div>
        </a-affix>
        <div class="container-pdf-html__desc">
            <div class="container-pdf-html__render">
                <div
                    class="w-100 h-100 container-pdf-html__render__content"
                    ref="contentPdf"
                    id="contentPdf"
                    style="top: 0; position: relative"
                >
                    <div
                        v-for="(page, i) in allPages"
                        :key="i"
                        v-html="page"
                        class="pdf-rendered"
                    ></div>
                    <div
                        class="container-pdf-html__desc__form"
                        :class="{ show: show }"
                        id="input-wrapper"
                    >
                        <div
                            class="container-pdf-html__desc__form__draggable"
                            @mousedown="mouseDown"
                        >
                            Glissez vers acheteur
                        </div>
                    </div>
                    <div
                        class="container-pdf-html__desc__form_2"
                        :class="{ show: show }"
                        id="input-wrapper"
                    >
                        <div
                            class="container-pdf-html__desc__form__draggable_2"
                            @mousedown="mouseDown2"
                        >
                            Glissez vers vendeur
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import jsPDF, { AcroFormTextField } from 'jspdf';
    import { Alert as AAlert } from 'ant-design-vue';
    import Button from '@/components/Common/Button/Button.vue';
    import AddOptions from '@/components/Icon/AddOptions.vue';
    import Save from '@/components/Icon/Save.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Info from '@/components/Icon/Info.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import MakeOffer from '@/services/offerService';
    import { Affix as AAffix } from 'ant-design-vue';
    import { createFormData } from '@/utils/formdata/formData';

    export default {
        props: ['allPages'],
        data() {
            return {
                show: false,
                loading: false,
                wrapper: null,
                container: null,
                wrapper2: null,
                container2: null,
                position1: 0,
                position2: 0,
                position3: 0,
                position4: 0,
                pixelT: 0,
                pixellL: 0,
                pixelT2: 0,
                pixellL2: 0,
            };
        },
        components: {
            AAlert,
            Button,
            AddOptions,
            Save,
            Paragraphe,
            Info,
            LoadingButton,
            AAffix,
        },
        destroyed() {
            window.removeEventListener('mousemove', this.move);
        },
        mounted() {
            this.wrapper = document.querySelector(
                '.container-pdf-html__desc__form'
            );
            this.container = document.querySelector(
                '.container-pdf-html__render__content'
            );
            const elementDrag = this.wrapper.querySelector(
                '.container-pdf-html__desc__form__draggable'
            );
            if (elementDrag) {
                document.addEventListener('mouseup', () => {
                    elementDrag.classList.remove('active');
                    elementDrag.removeEventListener('mousemove', this.onDrag);
                });
            }

            /***************************************/

            this.wrapper2 = document.querySelector(
                '.container-pdf-html__desc__form_2'
            );
            this.wrapper.style.top = `${window.screen.height / 4}px`;
            this.wrapper2.style.top = `${window.screen.height / 4}px`;
            console.log(
                this.wrapper2.style.top,
                window.screen.height,
                'this.wrapper2.style.top'
            );
            this.container2 = document.querySelector(
                '.container-pdf-html__render__content'
            );
            const elementDrag2 = this.wrapper2.querySelector(
                '.container-pdf-html__desc__form__draggable_2'
            );
            if (elementDrag2) {
                document.addEventListener('mouseup', () => {
                    elementDrag2.classList.remove('active');
                    elementDrag2.removeEventListener('mousemove', this.onDrag2);
                });
            }
        },
        methods: {
            mouseDown(e) {
                this.position3 = e.clientX;
                this.position4 = e.clientY;
                const elementDrag = this.wrapper.querySelector(
                    '.container-pdf-html__desc__form__draggable'
                );
                elementDrag.classList.add('active');
                elementDrag.addEventListener('mousemove', this.onDrag);
            },
            mouseDown2(e) {
                this.position1 = e.clientX;
                this.position2 = e.clientY;
                const elementDrag = this.wrapper2.querySelector(
                    '.container-pdf-html__desc__form__draggable_2'
                );
                elementDrag.classList.add('active');
                elementDrag.addEventListener('mousemove', this.onDrag2);
            },
            checkForm() {
                this.wrapper.style.top = `${window.innerHeight / 4}px`;
                this.wrapper2.style.top = `${window.innerHeight / 4}px`;
                this.wrapper.style.display = 'block';
                this.wrapper2.style.display = 'block';
                this.show = true;
            },
            onDrag(evt) {
                const { movementX, movementY } = evt;
                var offset = this.container.getBoundingClientRect();
                var innerDivWidth = this.wrapper.getBoundingClientRect().width;
                var innerDivHeight =
                    this.wrapper.getBoundingClientRect().height;
                var l = offset.left;
                var t = offset.top;
                var h = offset.height;
                var w = offset.width;
                let getStyle = window.getComputedStyle(this.wrapper);

                let leftVal = parseInt(getStyle.left);
                let topVal = parseInt(getStyle.top);
                var maxx = l + w - innerDivWidth;
                var maxy = t + h - innerDivHeight;
                this.wrapper.style.position = `absolute`;
                if (evt.clientY <= maxy && evt.clientY >= t) {
                    // this.wrapper.style.top = `${evt.clientY + 15}px`;
                    this.pixelT = topVal;
                    this.wrapper.style.top = `${topVal + movementY}px`;
                }
                if (evt.clientX <= maxx && evt.clientX >= l) {
                    this.pixelL = leftVal;
                    this.wrapper.style.left = `${leftVal + movementX}px`;
                    //  this.wrapper.style.left = `${evt.clientX + 15}px`;
                }
            },
            onDrag2(evt) {
                const { movementX, movementY } = evt;
                var offset = this.container2.getBoundingClientRect();
                var innerDivWidth = this.wrapper2.getBoundingClientRect().width;
                console.log(innerDivWidth);
                var innerDivHeight =
                    this.wrapper2.getBoundingClientRect().height;
                var l = offset.left;
                var t = offset.top;
                var h = offset.height;
                var w = offset.width;
                let getStyle = window.getComputedStyle(this.wrapper2);

                let leftVal = parseInt(getStyle.left);
                let topVal = parseInt(getStyle.top);
                var maxx = l + w - innerDivWidth;
                var maxy = t + h - innerDivHeight;
                this.wrapper2.style.position = `absolute`;
                if (evt.clientY <= maxy && evt.clientY >= t) {
                    // this.wrapper.style.top = `${evt.clientY + 15}px`;
                    this.pixelT2 = topVal;
                    this.wrapper2.style.top = `${topVal + movementY}px`;
                }
                if (evt.clientX <= maxx && evt.clientX >= l) {
                    this.pixelL2 = leftVal;
                    this.wrapper2.style.left = `${leftVal + movementX}px`;
                    //  this.wrapper.style.left = `${evt.clientX + 15}px`;
                }
            },
            handleSave() {
                this.generateReport();
            },
            generateReport() {
                this.loading = true;
                const doc = new jsPDF('portrait', 'px', 'a4');
                const height = 1263;
                const heightPdf = 636.4175;

                const numberPageInput = Math.ceil(this.pixelT / height);
                let i = numberPageInput;
                // console.log(this.pixelL /height)
                const postionTopBrowser = this.pixelT;
                const postionLeftBrowser =
                    this.pixelL - this.container.offsetLeft;
                let positionTopPdf = (postionTopBrowser * heightPdf) / height;
                let positionLeftPdf = (postionLeftBrowser * heightPdf) / height;
                console.log(
                    this.container.getBoundingClientRect(),
                    'offset top'
                );
                let textField = new AcroFormTextField();
                let topPxInput =
                    numberPageInput >= 2
                        ? positionTopPdf - heightPdf * (i - 1)
                        : positionTopPdf;
                textField.showWhenPrinted = true;
                textField.x =
                    positionLeftPdf -
                        (this.wrapper.getBoundingClientRect().width - 200) ||
                    100;
                console.log(this.wrapper2);
                textField.y = topPxInput + numberPageInput * 6 || 20;
                textField.width = 100;
                textField.height = 20;
                textField.fieldName = '[Signer1.Fullname1]';
                textField.color = 'red';

                const numberPageInput2 = Math.ceil(this.pixelT2 / height);
                let i2 = numberPageInput2;
                // console.log(this.pixelL /height)
                const postionTopBrowser2 = this.pixelT2;
                const postionLeftBrowser2 =
                    this.pixelL2 - this.container2.offsetLeft;
                let positionTopPdf2 = (postionTopBrowser2 * heightPdf) / height;
                let positionLeftPdf2 =
                    (postionLeftBrowser2 * heightPdf) / height;
                console.log(
                    this.container2.getBoundingClientRect(),
                    'offset top'
                );
                let textField2 = new AcroFormTextField();
                let topPxInput2 =
                    numberPageInput2 >= 2
                        ? positionTopPdf2 - heightPdf * (i2 - 1)
                        : positionTopPdf2;
                textField2.showWhenPrinted = true;
                console.log(
                    this.wrapper2.getBoundingClientRect().width,
                    positionLeftPdf2
                );
                textField2.x =
                    positionLeftPdf2 -
                        (this.wrapper.getBoundingClientRect().width - 200) ||
                    100;
                textField2.y = topPxInput2 + numberPageInput * 6 || 20;
                textField2.width = 100;
                textField2.height = 20;
                textField2.fieldName = '[Signer2.Fullname2]';
                textField2.color = 'red';
                this.wrapper.style.display = 'none';
                this.wrapper2.style.display = 'none';
                console.log(numberPageInput, 'numberPageInput2');
                const contentHtml =
                    document.getElementById('contentPdf').innerHTML;
                doc.html(contentHtml, {
                    html2canvas: {
                        scale: 0.5,
                    },
                    callback: (d) => {
                        d.setPage(numberPageInput);
                        d.addField(textField);
                        d.setPage(numberPageInput2);
                        d.addField(textField2);
                        // d.save();
                        var blob = new Blob([d.output('blob')], {
                            type: 'application/pdf',
                        });
                        var blobURL = URL.createObjectURL(blob);
                        // window.open(blobURL);
                        // this.loading = false;

                        this.signCompromise(blob);
                    },
                    x: 0,
                    y: 0,
                    margin: [2, 2, 2, 2],
                });
            },
            async signCompromise(blob) {
                this.loading = true;
                let formdata = new FormData();
                formdata.append('file[]', blob);
                formdata.append('idClientSales', 16);
                formdata.append('urlClient', `${window.location.origin}`);
                console.log('params:', formdata);
                let p = {
                    file: blob,
                    idClientSales: 16,
                    urlClient: `${window.location.origin}`,
                };
                let params = createFormData(p);
                try {
                    const data = await MakeOffer.postClientSalesPdf(params);
                    console.log(data, 'data');
                    window.open(data.data);
                } catch (error) {
                    console.log(error, 'error');
                } finally {
                    this.loading = false;
                }
                // this.$services.offre
                //     .post('signCompromise', formdata)
                //     .then(({ data, status }) => {
                //         if (status === 200 && data && data.code === 200) {
                //             window.open(data.data, '_self');
                //         }
                //         this.loading = false;
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //         this.loading = false;
                //     });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .container-pdf-html {
        @apply flex justify-center flex-col;
        &__desc {
            position: relative;
            padding-bottom: 50px;
            &__form {
                position: absolute;
                top: 500px;
                left: 55px;
                display: none;
                height: 100px;
                z-index: 9990;
            }

            &__form.show {
                display: block;
                z-index: 9999;
            }

            &__form__draggable {
                background-color: transparent;
                padding: 10px;
                border: 3px dashed var(--color-gray-icon);
                text-align: center;
                background-color: var(--color-primary);
                color: #fff;
                &:hover {
                    cursor: grab;
                }
            }

            &__form__draggable.active {
                cursor: grabbing;
                user-select: none;
            }

            /******************************/

            &__form_2 {
                position: absolute;
                top: 500px;
                left: 55px;
                display: none;
                height: 100px;
                z-index: 9990;
            }

            &__form_2.show {
                display: block;
                z-index: 9999;
            }

            &__form__draggable_2 {
                background-color: transparent;
                padding: 10px;
                border: 3px dashed var(--color-gray-icon);
                text-align: center;
                background-color: var(--color-primary);
                color: #fff;
                &:hover {
                    cursor: grab;
                }
            }

            &__form__draggable_2.active {
                cursor: grabbing;
                user-select: none;
            }
        }

        img {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain;
        }

        &__render {
            // padding-top: 110px;
            margin-bottom: 10px;
            @apply scale-[0.5] -mt-[60vh] md:scale-[1] md:mt-[0px];
            // @media screen and (max-width: 680px) {
            //     transform: scale(0.41);
            //     transform-origin: -17px 150px;
            //     // overflow-x: hidden;
            // }
            &__content {
                @apply flex items-center justify-center flex-col;
            }
        }

        &__actions {
            // width: calc(100% - 200px);
            // left: 100px;
            border-radius: 8px;
            box-shadow: 1px 1px 10px var(--color-stroke-gray);
            height: auto;
            background-color: #fff;
            // box-shadow: 0 6px 3px 0px rgb(0 0 0 / 50%);
            padding: 10px;
            z-index: 8889;
            .button__container {
                @apply flex items-center gap-[10px];
            }
            &:deep() {
                span {
                    color: var(--color-primary);
                }
                button {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                    .icon {
                        margin-right: 5px;
                    }
                    // @media screen and (max-width: 680px) {
                    //     font-size: 10px;
                    //     margin-bottom: 2px;
                    // }
                    min-height: 40px;
                }
            }
        }
        .pdf-rendered {
            & > div {
                margin: auto;
                // @media screen and (max-width: 680px) {
                // }
            }
        }
        // @media screen and (max-width: 680px) {
        // }
    }
</style>
