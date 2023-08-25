<template>
    <div class="counterOffer___form">
        <div
            class="counterOffer__head-mobile"
            @click="handleShowModal"
            v-if="screenType < 1024"
        >
            <InfoIcon class="counterOffer__head-info-icon" />

            <Title
                type="h3"
                label="Voir l'aperçu du document"
                weight="bold"
                class="counterOffer__head-mobile-title"
            />
        </div>
        <div class="counterOffer__head-desktop">
            <BreadCrumb :items="breadCrumbContent" />
        </div>
        <div class="counterOffer__main-content">
            <div class="counterOffer__maint-left-side">
                <div class="counterOffer__main-form">
                    <InputLabeled
                        required
                        inputType="number"
                        label="Prix proposé"
                        name-input="prices"
                        placeholder="0"
                        unity="€"
                        @input="addValueInput"
                    />  
                    <label>Conditions</label>
                    <div v-if="conditionList.length">
                        <ul
                            v-for="(item, index) in conditionList"
                            class="counterOffer__condition-list-content"
                        >
                            <span class="counterOffer__condition-list-element">
                                <li :key="index">{{ item }}</li>
                                <Delete class="cursor-pointer" @click="removeCondition(index)" />
                            </span>
                        </ul>
                    </div>
                    <div class="counterOffer__condition-input">
                        <InputLabeled
                            id="condition"
                            name-input="condition"
                            inputType="text"
                            placeholder="Ajouter votre condition"
                            :key="inputKey"
                        />
                        <!-- <AddIcon class="offerForm__addInput" @click="addList" /> -->
                        <Button 
                            class="counterOffer__add-conditions-btn"
                            type-button="primary"
                            @click="addList"
                        >
                            Ajouter
                        </Button>

                    </div>
                    <InputLabeled
                        label="Condition de crédit"
                        name-input="credit"
                        inputType="number"
                        placeholder="Montant de crédit"
                        :unity="'€'"
                        @input="addValueInput"
                    />

                    <InputLabeled
                        label="Délai de "
                        name-input="delay"
                        placeholder="0"
                        inputType="number"
                        :unity="'semaine(s)'"
                        @input="addValueInput"
                    />

                    <InputDate
                        label="Valabilité de l'offre"
                        name="validityDate"
                        :min="true"
                        @handleDateFormat="addValueInput"
                    />

                    <Signature
                        @signature="saveSignature"
                        @supp="deleteSignature"
                        :hasTitle="true"
                        title="Signature"
                    />
                </div>

                <Modal
                    title="Aperçu du document"
                    width="100%"
                    :isShowModal="modalShow"
                    @onBack="modalHandler"
                >
                    <template #content>
                        <DocOffer class="offerForm__docOffer" />
                        <div class="flex justify-end gap-3">
                            <Button @on-click="modalHandler">Annuler</Button>
                            <Button>Valider</Button>
                        </div>
                    </template>
                </Modal>
            </div>
            <div
                class="counterOffer__maint-right-side"
                v-if="screenType >= 1024"
            >
                <DocOffer
                    class="counterOffer__doc-display"
                    :priceOffer="prices"
                    :conditions="conditions"
                    :conditionCreditAmount="conditionCreditAmount"
                    :durationCredit="durationCredit"
                />
                <div class="counterOffer__doc-footer-btn">
                    <Button v-if="!loading" @on-click="router.go(-1);">Annuler</Button>
                    <Button @on-click="validation">
                        <LoadingButton
                            size="sm"
                            v-if="loading"
                        />Valider</Button
                    >
                </div>
            </div>
            <!-- <hr class="my-[14px]" /> -->
            <Button v-if="screenType < 1024" class="offerForm__btnValidate"
                >Valider</Button
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
    import InputLabeled from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Signature from '@/components/Display/signatureCard/SignatureCard.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import InfoIcon from '@/components/Icon/Info.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import OfferService from '@/services/offerService';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import DocOffer from '@/components/Display/DocOffer/DocOffer.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import Delete from '@/components/Icon/deleteRoudedBG.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, reactive, ref, computed } from 'vue';
    import { notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';

    const route = useRoute();
    const router = useRouter();
    const store: Store<any> = useStore();
    let modalShow = ref<boolean>(false);
    const loading = ref(false);
    let prices = ref(0);
    let conditions: any = ref([]);
    let conditionCreditAmount = ref(0);
    let durationCredit = ref(0);
    const inputKey = ref(0);

    //BreadCrumb contenu
    const breadCrumbContent = computed(() => [
        {
            label: 'Les offres',
            url: `/offres/${route.params.id}`,
        },
        { label: 'Faire une contre offre' },
    ]);

    let dataParams = ref({});

    let signature = ref<string>('');
    let conditionList: any = reactive([]);

    //screen size
    const screenType = ref<number>(screen.width);

    onMounted(() => {
        dataParams.value = {
            ...dataParams.value,
            ...{ offer: route.params.id },
        };
    });

    // const returnTofferList = () => {
    //     router.push({ path: `/offres/${route.params.id}` });
    // };

    const saveSignature = (imgSignature: string) => {
        signature.value = imgSignature;
        dataParams.value = {
            ...dataParams.value,
            ...{ clientSign: signature.value },
        };
    };
    const deleteSignature = (imgSignature: string) => {
        signature.value = imgSignature;
    };

    const removeCondition = (id: number) => {
        conditionList.splice(id, 1);
        conditions.value.splice(id, 1);
        console.log('delete id:', id);
    };
    const handleShowModal = () => {
        modalShow.value = !modalShow.value;
    };
    const modalHandler = () => {
        modalShow.value = !modalShow.value;
    };

    function addValueInput(value: any) {
        dataParams.value = {
            ...dataParams.value,
            ...value,
        };

        if (value['prices']) {
            prices.value = parseInt(value['prices']);
        } else if (value['credit']) {
            conditionCreditAmount.value = parseInt(value['credit']);
        } else if (value['delay']) {
            durationCredit.value = parseInt(value['delay']);
        }
        //  else if (e['validityDate']) {
        //     dateOffer.value = e['validityDate'];
        // } else if (e['city']) {
        //     documentDwelling.value = e['city'];
        // } else if (e['datedAt']) {
        //     documentDate.value = e['datedAt'];
        // }

        console.log(value, 'dataParams.value ');
        console.log(dataParams.value, 'dataParams.value ');
    }

    const addList = () => {
        let conditionTyped = (
            document.getElementById('condition') as HTMLInputElement
        ).value;
        console.log(conditionTyped, 'document value');

        if (conditionTyped !== '') {
            conditionList.push(conditionTyped);
            conditions.value.push(conditionTyped);
            const clientClauses: Array<Object> = [];
            conditionList.forEach((e: any) => {
                clientClauses.push({ description: e });
            });

            dataParams.value = {
                ...dataParams.value,
                ...{ clientClauses: clientClauses },
            };

            inputKey.value += 1;

            console.log('Data Params at condtion', dataParams.value);

        } else {
            console.log('Veuillez saisiser un une condition');
        }
    };

    async function validation() {
        try {
            loading.value = true;
            const { code, data } = await OfferService.addCounterOffer(
                dataParams.value
            );
            if (code === 200) {
                loading.value = false;
                notification['success']({
                    message: 'Contre Offre envoyée',
                    description: 'Votre contre a été bien envoyée.',
                });
                console.log('OK', data.data);
                router.push('/');
                store.dispatch('MakeOfferModule/setStatusRequest', true);
            } else {
                notification['warning']({
                    message: 'Erreur',
                    description: "Impossible d'envoyée votre contre offre",
                });
            }
        } catch (error) {
            console.log("erreur de validation de l'offre", error);
        } finally {
            loading.value = false;
        }
        console.log('validation contre offrea');
    }
</script>



<style lang="scss" scoped>
    .counterOffer {
        &__label {
            @apply font-semibold min-w-fit;
        }

        &__head-desktop {
            @apply container block mt-2.5 mb-5 bg-[#fff] py-2.5 rounded-lg;
        }
        
        &__main-content {
            @apply container py-[20px] px-[20px] bg-white my-[10px] rounded-[8px] grid grid-cols-2;
        }

        &__head-mobile {
            @apply mt-2.5 mb-2.5 mx-[10px] bg-[#fff] rounded-lg flex flex-row items-center py-2.5 gap-2.5;
        }

        &__head-mobile-title {
            width: 192px;
            height: 17px;

            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;

            color: #000000;
        }

        &__main-form {
            @apply grid grid-cols-1 gap-y-2.5;
            &:deep() {
                .signature__title {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--color-gray-icon);
                    margin-bottom: 10px;
                    display: block;     
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
                }
            }
        }

        &__condition-list-content {
            @apply  list-disc ml-6;
        }

        &__condition-list-element {
            @apply flex flex-row justify-between items-center hover:font-semibold duration-300 mb-0.5;
        }

        &__maint-right-side {
            @apply lg:rounded lg:py-[18px] lg:px-[18px] lg:bg-[var(--color-gray)] flex-1 ml-5;
        }

        &__doc-display {
            &:deep() {
                .offer__result-footer {
                    @apply mt-0;
                }
            }
        }

        &__doc-footer-btn {
            @apply flex justify-end gap-3;
        }

        &__condition-input {
            @apply flex flex-col justify-end
        }

        &__add-conditions-btn:deep() {
            @apply flex justify-end mt-2;
            // .button__primary {

            // }
        }
    }

    label {
        font-size: 14px;
        font-weight: 500;
        color: var(--color-gray-icon);
        display: block;
    }
</style>
