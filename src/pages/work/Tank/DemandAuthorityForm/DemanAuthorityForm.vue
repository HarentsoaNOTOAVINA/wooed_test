<template>
    <div class="work">
        <Title type="h3">Demande par écrit aux autorité compétente</Title>
        <Hr />
        <div class="work__form">
            <Paragraphe
                >Demandez par écrit l’autorisation à l’autorité compétente avant
                de remplacer un réservoir</Paragraphe
            >
            <div class="work__status">
                <a-badge
                    :count="badgeText"
                    :numberStyle="{ backgroundColor: badgeColor }"
                />
            </div>
            <div class="work__info">
                <Important />
                <Paragraphe>
                    Attendez toujours l’autorisation officielle pour procéder à
                    ces changements.</Paragraphe
                >
                <div class="work__demandList">
                    <div class="work__infoDate">
                        <span>Date d'envoie de la demande:</span>
                        <span class="work__infoList">{{ dayDemand }}</span>
                    </div>
                    <div v-if="demandDone" class="work__infoBtn">
                        <Button @on-click="respondDemand"
                            ><LoadingButton size="xs" v-if="btnLoadRespond" />
                            Valider la réponse des autorités</Button
                        >
                    </div>
                </div>
                <DatePicker
                    v-if="!demandDone"
                    @handleDateFormatFr="handleDate($event)"
                    name="date"
                    :max="true"
                    label="Faire une demande"
                    placeholder="Selectionner une date"
                />
                <div v-if="!demandDone" class="work__btnContainer">
                    <Button :disabled="hasSent" @on-click="sendDemand"
                        ><LoadingButton size="xs" v-if="btnLoad" />{{
                            btnTextSend
                        }}</Button
                    >
                </div>
            </div>
            <!-- <UploadImage @upload-single="handleUpload" /> -->
            <Button
                v-if="props.isReplacing"
                type-button="border"
                @on-click="gotoForm"
                >{{ btnTxtForm }}</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Important from '@/components/Icon/Important.vue';
    import { useRoute, useRouter } from 'vue-router';
    // import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { Badge as ABadge } from 'ant-design-vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import DatePicker from '@/components/Common/InputDate/InputDate.vue';
    import { btnTextCancel, btnTextSend } from '../data';
    import { computed, onMounted, ref, watch } from 'vue';
    import { Store, useStore } from 'vuex';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { textStatus } from './data';
    import moment from 'moment';

    const emit = defineEmits(['validateDemand']);

    const props = defineProps([
        'paramsDemandAuthorityForm',
        'isReplacing',
        'isResponseDone',
    ]);

    const store: Store<any> = useStore();
    const router = useRouter();
    let badgeColor = ref<string>('');
    let btnLoad = ref<boolean>(false);
    let btnLoadRespond = ref<boolean>(false);
    let btnTxtForm = ref<string>(
        'vous constatez une pollution du sol au moment des travaux de remplacement'
    );
    let dateParam = ref<any>();
    let hasSent = ref<boolean>(true);
    let listDemand = ref<Array<any>>([{}]);
    let idDemand = ref<number>();
    let badgeText = ref<string>('');
    let listRespond = ref<any>();
    let demandExist = ref<boolean>(false);
    let listDemandData = ref<any>();
    let responseDone = ref<boolean>(false);
    let demandDone = ref<boolean>(false);

    onMounted(async () => {
        getDemandList();
        getListResponse();
        checkStatus();
        console.log('badge text:', badgeText.value);
        // checkStatus();setRespondDemandDoubleTank
    });

    const getListResponse = async () => {
        const idDemand = localStorage.getItem('idDemand');
        console.log('id demand: ', idDemand);
        await store.dispatch('WorksModule/setListResponseDoubleTank', idDemand);
        const data = computed(
            () => store.getters['WorksModule/getListResponseDoubleTank']
        );
        listRespond.value = data.value.data;
        console.log('data respond:', data.value.data);
    };

    const respondDemand = async () => {
        console.log('id demand:', idDemand.value);
        let date = moment().format('L');
        let params = {
            idDemand: idDemand.value,
            date: date,
            link: '',
        };
        try {
            btnLoadRespond.value = true;
            await store.dispatch(
                'WorksModule/setRespondDemandDoubleTank',
                params
            );
            const data = computed(
                () => store.getters['WorksModule/getResponseDemandDoubleTank']
            );

            let res = data.value.data;
            let status = data.value.data.code;
            if (status === 200) {
                notification['success']({
                    message: 'Votre action a bien été prise en compte',
                });
                btnLoadRespond.value = false;
                responseDone.value = true;
                setTimeout(() => {
                    emit('validateDemand');
                }, 5000);
            }
            props.isReplacing.value = true;
            // listRespond.value = data.value.data;
            badgeText.value = textStatus.allowed;
            badgeColor.value = 'var(--color-green)';
            console.log('data response getters:', res);
        } catch (error) {
            console.log('error:', error);
            // notification['error']({
            //     message: "Une erreur s'est produite ",
            //     description: 'Veuillez réessayer..kjhikjkjhk.',
            // });
        } finally {
            // getListResponse();
            getDemandList();
            checkStatus();
            btnLoadRespond.value = false;
        }
        console.log('params respond:', params);
    };

    const checkStatus = () => {
        if (listDemand.value.length === 0) {
            badgeText.value = textStatus.neutral;
            badgeColor.value = 'var(--color-grayBlack)';
        }
        if (listDemand.value.length !== 0) {
            badgeText.value = textStatus.pending;
            listRespond.value = [];
            badgeColor.value = 'var(--color-warn)';
            console.log('status:', badgeText.value);
        }
        // if (listRespond.value) {
        //     if (listRespond.value.length > 0) {
        //         badgeText.value = textStatus.allowed;
        //     }
        // }
    };

    const getDemandList = async () => {
        console.log('first', props.paramsDemandAuthorityForm);
        let params = {
            thePropertyId: props.paramsDemandAuthorityForm.thePropertyId,
            typeofWorkId: props.paramsDemandAuthorityForm.typeOfWorkId,
            subsection: props.paramsDemandAuthorityForm.subsection,
            category: props.paramsDemandAuthorityForm.category,
        };
        console.log('firstaaa ', params);
        await store.dispatch('WorksModule/setListDemandDoubleTank', params);
        const data = computed(
            () => store.getters['WorksModule/getListDemandDoubleTank']
        );
        listDemand.value = data.value.data.data;
        if (listDemand.value?.length !== 0) {
            idDemand.value = listDemand.value[0].id;
            localStorage.setItem('idDemand', listDemand.value[0].id);
            // console.log('demand list:', idDemand.value);
        } else {
            hasSent.value = false;
        }
        let dataExtracted = listDemand.value.map((item: any) => item.date);
        // dataExtracted[0] = moment().format('L');
        dayDemand.value = moment(dataExtracted[0]).format("L")
        console.log("date:", dayDemand.value);
        
    };
    let dayDemand = ref<string>("")
    const gotoForm = () => {
        router.push({ name: 'work-form-pollution' });
    };

    const handleDate = (value: any) => {
        dateParam.value = value.date;
        hasSent.value = false;
        console.log('value date:', dateParam.value);
    };

    const sendDemand = async () => {
        let params = {
            ...props.paramsDemandAuthorityForm,
            date: dateParam.value,
        };
        console.log('send demand params:', params);
        try {
            btnLoad.value = true;
            await store.dispatch('WorksModule/setDemandDoubleTank', params);
            const data = computed(
                () => store.getters['WorksModule/getSendDemandDoubleTank']
            );
            let status = data.value.status;
            let statusError = data.value.data.code;
            if (status === 200 && statusError === 200) {
                notification['success']({
                    message: 'Votre demande a bien été envoyer',
                });
            } else {
                notification['error']({
                    message: 'Votre demande est déjà en cours',
                    description:
                        'Attendez la réponse des autorité avant de procéder a une nouvelle demande',
                });
                // hasSent.value = true;
            }
            btnLoad.value = false;
            // if(status)
            console.log('data demand status:', status, 'error:', statusError);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            getDemandList();
        }
    };

    watch(
        () => listRespond.value,
        () => {
            checkStatus();
        }
    );
    watch(
        () => listDemand.value,
        () => {
            if (listDemand.value.length !== 0) {
                demandDone.value = true;
            } else {
                demandDone.value = false;
            }
            checkStatus();
            // getDemandList();
        }
    );

    const onCancel = () => {};

    // const handleUpload = (value: any) => {
    //     console.log('doc:', value);
    // };
</script>

<style lang="scss" scoped>
    .work {
        &__form {
            @apply flex flex-col gap-[14px];
        }
        &__status {
            @apply w-full flex justify-end;
        }
        &__info {
            border: 1px solid var(--color-gray);
            @apply flex flex-col rounded p-[8px] gap-[14px];
        }
        &__demandList {
            @apply flex items-center gap-[18px];
        }
        &__infoDate {
            @apply flex gap-[18px];
        }
        &__infoBtn {
            @apply flex justify-end;
        }
        &__infoList {
            @apply font-bold;
        }
        &__btnContainer {
            @apply flex justify-end gap-[14px];
        }
    }
</style>
