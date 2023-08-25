<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="locationData">
        <div class="locationData__container place-content-14px">
            <div class="locationData__container-title">
                <Title type="h2" label="Données" class="locationData__title" />
            </div>
            <hr class="__hr" />
            <div
                class="locationData__container-content place-content-14px"
                v-if="!loading && hasHistory"
            >
                <Timeline :contrat-sign="contratSign" :end-lease="endLease" />
                <hr class="__hr" />
                <div class="locationData__items place-content-14px">
                    <template v-if="!touristAccommodation">
                        <ContentValue
                            label="Durée du bail : "
                            :value="`${durationLease ?? 'Aucun'} mois`"
                        />
                        <ContentValue
                            label="Loyer de base :"
                            :value="baseRent ?? 'Aucun'"
                            unity="€"
                        />
                        <CardWrapper class="locationData__content">
                            <div class="locationData__content-content">
                                <Input
                                    label="Compte du bailleur"
                                    nameInput="lessorAccount"
                                    @input="handleInputToUpdateDataDetail"
                                    placeholder="0000 0000 0000 0000"
                                />
                            </div>
                            <div class="locationData__content-content">
                                <Input
                                    label="Loyer indexé"
                                    nameInput="indexedRent"
                                    input-type="number"
                                    @input="handleInputToUpdateDataDetail"
                                    placeholder="0"
                                    unity="€"
                                />
                                <InputDate
                                    label="Date"
                                    name="dateToIndexedRent"
                                    @handle-date-eng="
                                        handleInputToUpdateDataDetail
                                    "
                                />
                            </div>
                            <CheckBox
                                name="sendTaker"
                                label="Envoyer au preneur la demande d’indexation du loyer à la date anniversaire du bail"
                                @handleCheck="handleChange"
                            />
                            <div class="locationData__btn">
                                <Button
                                    :disabled="btnValue"
                                    @on-click="sendIndexingRequest"
                                >
                                    <LoadingButton
                                        size="xs"
                                        v-if="isSendIndexingRequest"
                                    />
                                    Envoyer
                                </Button>
                            </div>
                        </CardWrapper>
                        <ContentValue
                            label="Provision pour charges :"
                            :value="accruedExpenses"
                            unity="€"
                        />
                    </template>
                    <TouristAccommodation
                        v-else
                        :data-period-occupation="dataPeriodOccupation"
                        :options="yearOptions"
                        @handle-year-occupation="handleOccupationPeriod"
                        @handle-year-history="handleOccupationPeriod"
                    />
                    <CardWrapper
                        class="locationData__content"
                        v-if="!touristAccommodation"
                    >
                        <Title
                            type="h3"
                            label="Historique des payements"
                            class="locationData__content-title"
                        />
                        <hr class="__hr" />
                        <div
                            class="locationData__content-items place-content-18px"
                        >
                            <Select
                                name="dateStory"
                                label="Année"
                                placeholder="Selectionnez l'année"
                                :options="options"
                                @change-select="selectChange"
                            />
                            <ContentValue
                                v-if="yearsSelected"
                                :label="
                                    'Total de l’année ' + yearsSelected + ' :'
                                "
                                :value="separatorMillier(totalRentOfYear)"
                                unity="€"
                            />
                            <TabsCard
                                v-if="yearsSelected"
                                :dataTabs="dataTabs"
                                class="locationData__tabs"
                                @change="handleChangeMonth"
                            >
                                <template
                                    v-for="tab in dataTabs"
                                    :key="tab.tabName"
                                    v-slot:[tab.tabName]
                                >
                                    <Transition v-if="isYearSelected">
                                        <HistoryContent
                                            :is-add-history="isAddHistory"
                                            :data="tab"
                                            :years="yearsSelected"
                                            :rest-is-positive="restIsPositive"
                                            :rest-to-paid="Math.abs(restPaid)"
                                            :is-rent-per-month-paid="
                                                tab.isRentPerMonthPaid
                                            "
                                            @handle-rent-price="handleRentPrice"
                                            @handle-provision-price="
                                                handleProvisionPrice
                                            "
                                            @handle-paid-rent="addPaymentRent"
                                        />
                                    </Transition>
                                    <div
                                        v-if="!isYearSelected"
                                        class="loading-year"
                                    >
                                        <Loader v-if="!isYearSelected" />
                                    </div>
                                </template>
                            </TabsCard>
                        </div>
                    </CardWrapper>
                    <CardWrapper
                        class="locationData__content"
                        v-if="!touristAccommodation"
                    >
                        <div class="locationData__conge-title">
                            <Title
                                type="h3"
                                label="Congé"
                                class="locationData__content-title"
                            />
                            <Button
                                @on-click="
                                    toSendRequestLeave = !toSendRequestLeave
                                "
                                type-button="gray"
                                >{{
                                    !toSendRequestLeave
                                        ? 'Demander un congé'
                                        : "Voir l'historique"
                                }}</Button
                            >
                        </div>
                        <hr class="__hr" />
                        <template
                            v-if="toSendRequestLeave"
                            v-for="(item, index) in leaveData"
                            :key="index"
                        >
                            <div
                                v-if="item.name === 'donatedLessor'"
                                class="locationData__content-items place-content-14px"
                            >
                                <Select
                                    :label="item.title"
                                    name="motif"
                                    :options="item.options"
                                    placeholder="Selectionnez"
                                    @change-select="handleSelectLeave"
                                />

                                <div class="locationData__content-content">
                                    <ContentValue
                                        :label="item.duration.label"
                                        :value="item.duration.value"
                                    />
                                    <Select
                                        :label="item.dateUltime.label"
                                        :name="'dateUltime'"
                                        :placeholder="
                                            dataToSendRequestLeave.deadline
                                        "
                                        :disabled="true"
                                    />
                                </div>
                                <div class="locationData__btn">
                                    <Button @on-click="sendRequestLeave">
                                        <LoadingButton
                                            size="xs"
                                            v-if="loadingLeave"
                                        />
                                        Envoyer la demande
                                    </Button>
                                </div>
                            </div>
                        </template>
                        <template v-if="!toSendRequestLeave">
                            <div
                                class="locationData__content-items space-gap-14"
                                v-if="responseConge"
                            >
                                <Alert type="info"
                                    >Voici votre dernier demande de congé</Alert
                                >

                                <Select
                                    name="val"
                                    label="Raison"
                                    :placeholder="responseConge.reason"
                                    :disabled="true"
                                />

                                <div class="locationData__content-content">
                                    <ContentValue
                                        label="Durée"
                                        :value="responseConge.duration"
                                    />
                                    <Select
                                        label="Date ultime"
                                        name="val"
                                        :placeholder="
                                            responseConge.deadline ?? 'Aucun'
                                        "
                                        :disabled="true"
                                    />
                                </div>
                            </div>
                            <div
                                class="locationData__conge-noData"
                                v-if="!responseConge"
                            >
                                <Empty
                                    description="Vous n'avez aucune demande de congé"
                                />
                            </div>
                        </template>
                    </CardWrapper>
                </div>
            </div>
            <div class="locationData__noData" v-if="!loading && !hasHistory">
                <Empty description="Vous n'avez aucun historique" />
            </div>
            <div class="locationData__loading">
                <Loader v-if="loading" />
            </div>
        </div>
    </MainCard>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Timeline from './Timeline.vue';
    import { onMounted, ref, watch } from 'vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import ContentValue from '@/components/Display/ContentValue/ContentValue.vue';
    import HistoryContent from './HistoryContent.vue';
    import Transition from '@/components/Common/Transition/Transition.vue';
    import {
        dataTabs,
        leaveData,
    } from '@/pages/rentalManagement/components/LocationData/LocationData';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import moment from 'moment';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { Empty, notification, Alert as AAlert } from 'ant-design-vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import TouristAccommodation from './TouristAccommodation.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';

    const store = useStore();
    const route = useRoute();

    interface IDataToUpdateDetail {
        idRentDetail: any;
        indexedRent: number;
        lessorAccount: string;
        dateToIndexedRent: any;
    }
    interface IParamsHistory {
        theProperty: any;
        year: string;
    }

    interface IPayment {
        month: number;
        amountDue: number;
        amountPaid: number;
        isPaid: boolean;
        provisionDue: number;
        provisionPaid: number;
        toBePaid?: number | null;
        toBeRefund?: number | null;
    }

    interface IDataToPayRent {
        year?: number;
        rentalManagement: any;
        payments: IPayment[];
    }

    const breadcrumbListsData = [
        {
            label: 'Biens mis en location : GESTION (LOCATION)',
        },
    ];

    const btnValue = ref<boolean>(true);
    const isYearSelected = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const yearsSelected = ref<string>('');
    let hasHistory = ref<boolean>(false);
    let contratSign = ref<any>();
    let endLease = ref<any>();
    let baseRent = ref<string>('0');
    let durationLease = ref<any>();

    let accruedExpenses = ref<string>('0');

    let totalDue = ref<number>(0);

    let restPaid = ref<number>(0);
    let rentHistories = ref<any>();
    let historyYearSelected = ref<any>();
    let rentPerMonth = ref<number>(0);
    let restIsPositive = ref<boolean>(true);
    let isAddHistory = ref<boolean>(false);
    let isSendIndexingRequest = ref<boolean>(false);
    let totalRentOfYear = ref<number>(0);
    let toSendRequestLeave = ref<boolean>(false);
    let hasDataLeave = ref<boolean>(true);
    let touristAccommodation = ref<boolean>(true);

    let dataLastRequestLeave = ref<any>(null);
    let responseConge = ref<any>();

    let dataToUpdateDetail = ref<IDataToUpdateDetail>({
        idRentDetail: null,
        indexedRent: 0,
        lessorAccount: '',
        dateToIndexedRent: null,
    });

    let paramsToGetHistoryPaymentRent = ref<IParamsHistory>({
        theProperty: route.params.id,
        year: '',
    });

    let dataToAddPayment = ref<IDataToPayRent>({
        rentalManagement: null,
        payments: [
            {
                month: 1,
                amountDue: 0,
                amountPaid: 0,
                isPaid: true,
                provisionDue: 0,
                provisionPaid: 0,
                toBePaid: null,
                toBeRefund: null,
            },
        ],
    });

    let dataToSendRequestLeave = ref<any>({
        rentalManagement: null,
        givenBy: 'tenant',
        duration: 6,
        deadline: 'Fin du triennat',
        reason: null,
    });

    let dataPeriodOccupationTourist = ref<any>({
        rentalManagement: null,
        year: null,
    });

    let dataPeriodOccupation = ref<any>({
        remainingDay: 0,
        yemaxDays: 0,
        totalDay: 0,
        lists: [],
    });

    let loadingLeave = ref<boolean>(false);

    const options: any = [];
    let yearOptions: any = [];

    onMounted(() => {
        getDataBailToManage();
        getDataLeave();
    });

    async function getDataBailToManage() {
        try {
            loading.value = true;
            let data = await store.dispatch(
                'RentalModule/getDataBailManagment',
                {
                    theProperty: route.params.id,
                }
            );
            data.data.length > 0
                ? (hasHistory.value = true)
                : (hasHistory.value = false);
            if (data.success) {
                baseRent.value = data.data[data.data.length - 1].baseRent;
                dataToUpdateDetail.value.idRentDetail =
                    data.data[data.data.length - 1].id;
                dataToSendRequestLeave.value.rentalManagement =
                    data.data[data.data.length - 1].id;
                accruedExpenses.value =
                    data.data[data.data.length - 1].provision;

                dataToAddPayment.value.rentalManagement =
                    data.data[data.data.length - 1].id;
                dataPeriodOccupationTourist.value.rentalManagement =
                    data.data[data.data.length - 1].id;
                dataToAddPayment.value.payments[0].amountDue = +baseRent.value;
                dataToAddPayment.value.payments[0].provisionDue =
                    +baseRent.value / 10;
                contratSign.value =
                    data.data[data.data.length - 1].dateSignContract;
                totalDue.value = +baseRent.value + +baseRent.value / 10;
                endLease.value = data.data[data.data.length - 1].dateEndLease;
                durationLease.value = moment(endLease.value).diff(
                    moment(contratSign.value),
                    'month'
                );
                data.data[data.data.length - 1].dateToIndexedRent !== null
                    ? (dataToUpdateDetail.value.dateToIndexedRent = moment(
                          data.data[data.data.length - 1].dateToIndexedRent
                      ).add(1, 'years'))
                    : (dataToUpdateDetail.value.dateToIndexedRent = moment(
                          contratSign.value
                      ).add(1, 'years'));

                rentHistories.value =
                    data.data[data.data.length - 1].rentHistories;

                data.data[0].rentHistories.forEach((obj: any) => {
                    options.push({ label: obj.year, value: obj.year });
                });

                const yearsPeriodOccupationTouristAccommodation = [
                    ...new Set(
                        data.data[0].offerLeaseList.map((item: any) =>
                            new Date(item.dateSignContract).getFullYear()
                        )
                    ),
                ];

                yearsPeriodOccupationTouristAccommodation.forEach((year: any) =>
                    yearOptions.push({ label: year, value: year })
                );
            }
        } catch (error) {
            console.error('error when we fetch getDataBailToManage');
        } finally {
            loading.value = false;
        }
    }

    async function getDataLeave() {
        try {
            let response = await store.dispatch(
                'RentalModule/listRequestLeave',
                route.params.id
            );
            if (response.code == 200) {
                responseConge.value = response.data[response.data.length - 1];

                console.log(
                    responseConge.value,
                    'RRRRRRRRRRRRRR DDDDDDDDDDDDDDDDD'
                );
            }
        } catch (error) {}
    }

    function handleInputToUpdateDataDetail(data: any) {
        switch (Object.keys(data)[0]) {
            case 'indexedRent':
                dataToUpdateDetail.value.indexedRent = +data.indexedRent;
                break;
            case 'lessorAccount':
                dataToUpdateDetail.value.lessorAccount = data.lessorAccount;
                break;
            case 'dateToIndexedRent':
                dataToUpdateDetail.value.dateToIndexedRent =
                    data.dateToIndexedRent;
                break;

            default:
                break;
        }
    }

    function handleChange(value: any) {
        btnValue.value = !value.sendTaker;
    }

    async function selectChange(value: any) {
        yearsSelected.value = value.dateStory;
        paramsToGetHistoryPaymentRent.value.year = yearsSelected.value;
        dataToAddPayment.value.year = +yearsSelected.value;

        rentHistories.value.forEach((history: any) => {
            if (history.year == yearsSelected.value) {
                historyYearSelected.value = history;

                dataTabs.forEach((tabs: any) => {
                    (tabs.tabContent.rentDue = history.rent),
                        (tabs.tabContent.provisionChargesDue =
                            history.provision);
                    rentPerMonth.value = history.rent;
                });
            }
        });

        console.log(historyYearSelected.value, 'historyYearSelected');

        historyYearSelected.value = '';

        try {
            isYearSelected.value = false;

            let response = await store.dispatch(
                'RentalModule/setHistoryPaymentRent',
                paramsToGetHistoryPaymentRent.value
            );

            totalRentOfYear.value = 0;
            response.data.forEach((rentPaid: any) => {
                totalRentOfYear.value += rentPaid.total;
                for (let i = 0; i < dataTabs.length; i++) {
                    const element = dataTabs[i];
                    if (element.tabName == rentPaid.payments[0].month) {
                        element.isRentPerMonthPaid = true;
                        element.tabContent.rentPaid =
                            rentPaid.payments[0].amountPaid;
                        element.tabContent.provisionChargesPaid =
                            rentPaid.payments[0].provisionPaid;
                    }
                }
            });

            console.log(response.data, 'History paiement');
            console.log(totalRentOfYear.value, 'Total rent paid in this year');
        } catch (error) {
        } finally {
            isYearSelected.value = true;
        }
    }

    async function sendIndexingRequest() {
        try {
            isSendIndexingRequest.value = true;
            let response = await store.dispatch(
                'RentalModule/putDataBailManagment',
                dataToUpdateDetail.value
            );
            console.log(response, 'Response for updating detail bail');
            if (response.status) {
                notification['success']({
                    message: "Demande d'indexation envoyer",
                });
            }
        } catch (error: any) {
            switch (error.status) {
                case 403:
                    notification['warning']({
                        message:
                            "Vous n'êtes pas autorisé à effectuer cette action",
                    });
                    break;
                case 400:
                    notification['warning']({
                        message:
                            "Vous ne pouvez effectuer cette action qu'une seule fois par an",
                    });
                    break;

                default:
                    break;
            }
        } finally {
            isSendIndexingRequest.value = false;
        }

        //console.log(dataToUpdateDetail.value, 'DATA TO UPDATE')
        // let response = await store.dispatch(
        //     'RentalModule/putDataBailManagment',
        //     dataToUpdateDetail.value
        // );
        // if successful, return ...
    }

    function handleChangeMonth(data: any) {
        dataToAddPayment.value.payments[0].month = +data;
        console.log(data, 'DATA MONTH');
    }

    function handleRentPrice(value: any) {
        dataToAddPayment.value.payments[0].amountPaid = +value.amountPaid;
        // rentPerMonth.value
        restPaid.value = restToPaid();

        console.log(restPaid.value, 'REST a payer From rentDue');
    }
    function handleProvisionPrice(value: any) {
        dataToAddPayment.value.payments[0].provisionPaid = +value.provisionPaid;
        restPaid.value = restToPaid();
        console.log(restPaid.value, 'REST a payer From provisionDue');
    }

    async function addPaymentRent() {
        try {
            isAddHistory.value = true;
            let response = await store.dispatch(
                'RentalModule/postPaymentRent',
                dataToAddPayment.value
            );
            console.log(response, 'RESPONSE CONSOLE LOG');
            if (response.data.code == 201 && response.data.success) {
                notification['success']({
                    message: 'Loyer ajouté avec succès',
                });
            }
        } catch (error) {
            console.error(error, 'when paid rent');
        } finally {
            isAddHistory.value = false;
        }
    }

    function handleSelectLeave(value: any) {
        let choices = [
            'Sans motif',
            'Pour occupation personnelle',
            'Pour gros travaux',
        ];
        switch (Object.keys(value)[0]) {
            case 'motif':
                dataToSendRequestLeave.value.reason = value['motif'];
                if (
                    value['motif'] == choices[0] ||
                    value['motif'] == choices[2]
                ) {
                    dataToSendRequestLeave.value.deadline = 'Fin du triennat';
                } else if (value['motif'] == choices[1]) {
                    dataToSendRequestLeave.value.deadline = 'À tout moment';
                }
                break;

            default:
                break;
        }
    }

    async function handleOccupationPeriod(year: string) {
        console.log(year, 'yar period');
        dataPeriodOccupationTourist.value.year = year;

        try {
            let response = await store.dispatch(
                'RentalModule/getPeriodOccupationTouristAccomode',
                dataPeriodOccupationTourist.value
            );
            console.log(response, 'RESPONSE');
            if (
                response.code == 200 &&
                response.success &&
                response.data.length > 0
            ) {
                dataPeriodOccupation.value = response.data[0];
                console.log(dataPeriodOccupation.value, 'DATA 000000000000');
            }
        } catch (error: any) {
            console.log('ERRRERRRRR');
        } finally {
        }
    }

    async function sendRequestLeave() {
        try {
            loadingLeave.value = true;
            let response = await store.dispatch(
                'RentalModule/addRequestLeave',
                dataToSendRequestLeave.value
            );
            if (response.data.code == 201 && response.data.success) {
                notification['success']({
                    message: 'Demande de congé envoyer',
                });
            }
            console.log(response);
        } catch (error: any) {
            if (
                error.data.code == 400 &&
                error.data.data.detail == 'User already sent a leave'
            ) {
                notification['warning']({
                    message: 'Vous avez déjà de la demande pour cette année',
                });
            }
        } finally {
            loadingLeave.value = false;
        }
    }

    function restToPaid() {
        let totalTopay = rentPerMonth.value + +rentPerMonth.value / 10;
        let rest =
            totalTopay -
            (+dataToAddPayment.value.payments[0].amountPaid +
                +dataToAddPayment.value.payments[0].provisionPaid);

        rest >= 0
            ? ((dataToAddPayment.value.payments[0].toBePaid = rest),
              (restIsPositive.value = true))
            : ((dataToAddPayment.value.payments[0].toBeRefund = Math.abs(rest)),
              (restIsPositive.value = false));

        return rest;
    }
</script>

<style lang="scss" scoped>
    .locationData {
        &__container {
            @apply h-full;
        }
        &__title {
            @apply font-[600] text-[14px] text-primary;
        }
        &__content {
            @apply flex flex-col gap-[14px];
            &-title {
                @apply text-primary font-[600] text-[14px];
            }
            &-content {
                @apply grid grid-cols-1 gap-[14px];
                @screen sm {
                    @apply grid-cols-2;
                }
                @screen md {
                    @apply grid-cols-1;
                }
                @screen lg {
                    @apply grid-cols-2;
                }
                &:deep() {
                    .contentValue {
                        @apply w-full;
                    }
                }
            }
        }
        &__tabs {
            &:deep() {
                .ant-tabs-nav-wrap {
                    @apply overflow-hidden;
                }
            }
        }
        &__btn {
            @apply flex justify-end;
        }
        &__conge-title {
            @apply flex items-center justify-between;
        }
        &__noData {
            @apply h-full flex items-center justify-center;
        }
    }

    .loading-year {
        @apply relative h-[380px];
    }
</style>
