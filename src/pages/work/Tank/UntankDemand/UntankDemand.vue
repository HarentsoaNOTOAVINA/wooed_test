<template>
    <div class="work">
        <Title type="h3"
            >Avertissez l’autorité compétente par lettre recommandée
            préalablement à tous les travaux
        </Title>
        <Hr />
        <div class="work__status">
            <a-badge
                :count="badgeText"
                :numberStyle="{ backgroundColor: badgeColor }"
            />
        </div>
        <div class="work__info">
            <span>Date d'envoie de la dernière demande:</span>
            <span class="work__infoList">{{ demandDate }}</span>
            <div v-if="demandList.length > 0">
                <Button @on-click="respondDemand"
                    ><LoadingButton size="xs" v-if="btnLoadRespond" /> Valider
                    la réponse des autorités</Button
                >
            </div>
        </div>
        <div class="work__form" v-if="!hasSentDemand">
            <DatePicker
                @handleDateFormatFr="handleDate($event)"
                name="date"
                :max="true"
                placeholder="Selectionner une date"
            />
            <div class="work__btnContainer">
                <Button @on-click="sendDemand"
                    ><LoadingButton size="xs" v-if="btnLoad" />{{
                        btnTextSend
                    }}</Button
                >
                <Button v-if="hasRespond" @on-click="nextStep"
                    ><LoadingButton size="xs" v-if="btnLoad" />Etape
                    suivante</Button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import DatePicker from '@/components/Common/InputDate/InputDate.vue';
    import moment from 'moment';
    import { Badge as ABadge } from 'ant-design-vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { btnTextSend } from '../data';
    import { Store, useStore } from 'vuex';
    import { computed, onMounted, ref, watch } from 'vue';
    import { textStatus } from '../DemandAuthorityForm/data';

    const props = defineProps(['demandData']);
    const store = useStore();
    let dateDemand = ref<string>('');
    let demandList = ref<Array<any>>([]);
    let respondList = ref<any>();
    let demandId = ref<number>();
    let demandDate = ref<string>();
    let btnLoad = ref<boolean>(false);
    let btnLoadRespond = ref<boolean>(false);
    let badgeText = ref<string>('');
    let badgeColor = ref<string>('');
    let hasSentDemand = ref<boolean>(false);
    let hasRespond = ref<boolean>(false);

    const emit = defineEmits(['respondDone']);

    onMounted(() => {
        getListDemand();
        getListResponse();
        checkStatus();
    });

    const nextStep = () => {
        emit('respondDone');
    };

    const checkStatus = () => {
        if (demandList.value) {
            if (demandList.value.length === 0) {
                badgeText.value = textStatus.neutral;
                badgeColor.value = 'var(--color-grayBlack)';
            } else if (demandList.value.length !== 0) {
                badgeText.value = textStatus.pending;
                badgeColor.value = 'var(--color-warn)';
            }
        }
    };

    const getListResponse = async () => {
        if (demandId.value) {
            await store.dispatch(
                'WorksModule/setListResponseDoubleTank',
                demandId.value
            );
            const data = computed(
                () => store.getters['WorksModule/getListResponseDoubleTank']
            );
            respondList.value = data.value.data;
        } else {
            console.log('return 0');
            return;
        }
        console.log('id demand to respond:', demandId.value);
    };

    const respondDemand = async () => {
        let date = moment().format('L');
        let params = {
            idDemand: demandId.value,
            date: date,
            link: '',
        };

        try {
            hasRespond.value = false;
            btnLoadRespond.value = true;
            await store.dispatch(
                'WorksModule/setRespondDemandDoubleTank',
                params
            );
            const data = computed(
                () => store.getters['WorksModule/getResponseDemandDoubleTank']
            );
            let status = data.value.data.code;
            if (status === 200) {
                notification['success']({
                    message: 'Votre action a bien été prise en compte',
                });
                btnLoadRespond.value = false;
                hasRespond.value = true;
                hasSentDemand.value = false;
                // emit('respondDone');
            }
            console.log('data respond demand:', data.value);
        } catch (error) {
            notification['error']({
                message: "Une erreur s'est produite ",
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoadRespond.value = false;
            hasRespond.value = true;
            getListDemand();
            checkStatus();
        }
    };

    const getListDemand = async () => {
        let params = {
            thePropertyId: props.demandData.thePropertyId,
            typeofWorkId: props.demandData.typeOfWorkId,
            subsection: props.demandData.subsection,
            category: props.demandData.category,
        };

        await store.dispatch('WorksModule/setListDemandDoubleTank', params);
        const data = computed(
            () => store.getters['WorksModule/getListDemandDoubleTank']
        );
        demandList.value = data.value.data.data;
        let extract = data.value.data.data.map((item: any) => {
            return { id: item.id, date: item.date };
        });

        if (demandList.value?.length !== 0) {
            let dateIn = extract[0].date;
            demandId.value = extract[0].id;
            dateIn = moment().format('L');
            demandDate.value = dateIn;
        }
        console.log('list demand date:', demandDate.value);
    };

    const sendDemand = async () => {
        let params: object = {
            ...props.demandData,
            date: dateDemand.value,
        };

        try {
            hasSentDemand.value = false;
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
                hasSentDemand.value = true;
            } else {
                notification['error']({
                    message: 'Votre demande est déjà en cours',
                    description:
                        'Attendez la réponse des autorité avant de procéder a une nouvelle demande',
                });
            }
            btnLoad.value = false;
            console.log('data send demand:', data.value);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            getListDemand();
            btnLoad.value = false;
        }
    };

    const handleDate = (value: any) => {
        dateDemand.value = value.date;
        console.log('date demand:', dateDemand.value);
    };
    watch(
        () => respondList.value,
        () => {
            checkStatus();
        }
    );

    watch(
        () => demandList.value,
        () => {
            checkStatus();
        }
    );
</script>

<style lang="scss" scoped>
    .work {
        @apply flex flex-col gap-[14px];
        &__status {
            @apply w-full flex justify-end;
        }
        &__info {
            @apply flex flex-row gap-[4px];
        }
        &__infoList {
            @apply font-bold;
        }
        &__form {
            @apply flex flex-col gap-[14px];
        }
        &__btnContainer {
            @apply flex justify-end gap-[14px];
        }
    }
</style>
