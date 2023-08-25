<template>
    <div class="flex flex-col gap-[18px]">
        <div
            v-for="(item, index) in movingData"
            :key="index"
            :class="{
                'moving-items': true,
                disabled: isDisabled(
                    item.datePreview === 'oneMonthBefore'
                        ? oneMonthBefore
                        : item.datePreview === 'oneWeekBefore'
                        ? oneWeekBefore
                        : item.datePreview === 'dDay'
                        ? dDay
                        : ''
                ),
            }"
        >
            <div class="flex w-full justify-between">
                <Title
                    :label="item.title"
                    type="h6"
                    class="moving-items__title"
                />
                <div v-if="date">
                    <LoadingButton theme="dark" v-if="isLoad" />
                    <div v-else>
                        <Paragraphe
                            class="italic text-primary text-xs"
                            v-if="item.datePreview === 'oneMonthBefore'"
                            >Date ultime conseillée:
                            {{ moment(oneMonthBefore).format('DD/MM/YYYY') }}
                        </Paragraphe>
                        <Paragraphe
                            class="italic text-primary text-xs"
                            v-if="item.datePreview === 'oneWeekBefore'"
                            >Date ultime conseillée:
                            {{ moment(oneWeekBefore).format('DD/MM/YYYY') }}
                        </Paragraphe>
                        <Paragraphe
                            class="italic text-primary text-xs"
                            v-if="item.datePreview === 'dDay'"
                            >Date ultime conseillée:
                            {{ moment(date).format('DD/MM/YYYY') }}
                        </Paragraphe>
                    </div>
                </div>
            </div>
            <hr class="__hr" />
            <div>
                <component :is="item.component" v-if="item.component" />
            </div>
            <div
                class="flex justify-between w-full items-center flex-wrap gap-[18px]"
            >
                <div class="flex gap-[18px] flex-wrap" v-if="item.bouton">
                    <div v-for="(i, idx) in item.bouton" :key="idx">
                        <Button
                            type-button="border"
                            @click="handleClick(i.click, idx)"
                            ><LoadingButton
                                size="xs"
                                theme="dark"
                                v-if="loadingBtn === idx"
                            />{{ i.label }}</Button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ComponentOptions, ref, watch, onMounted, computed } from 'vue';
    import CounterSign from './CounterSign.vue';
    import moment from 'moment';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import MiniMailBox from '@/services/miniMailBoxService';
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue';
    import { type } from 'os';
    import { WindowsFilled } from '@ant-design/icons-vue';
    import { useStore } from 'vuex';

    const router = useRouter();
    const store = useStore();

    interface MovingDataType {
        datePreview?: string;
        title: string;
        bouton?: {
            label: string;
            click: string;
            disabled?: boolean;
        }[];
        sign?: {
            label: string;
            name: string;
        }[];
        link?: string;
        component?: any;
    }

    const props = defineProps({
        propertyDetail: {
            type: Object,
            default: {}
        },
        date: {
            type: String,
            default: '',
        },
        isLoad: {
            type: Boolean,
            default: false,
        },
        roadwayService: {
            type: Object,
            default: {}
        }
    });

    const oneMonthBefore = ref<any>();
    const oneWeekBefore = ref<any>();
    const dDay = ref<any>();
    const loadingBtn = ref<any>(null);

    const movingData: MovingDataType[] = [
        {
            title: 'Gérer le transport de mes effets personnel',
            bouton: [
                {
                    label: "Recourir aux services d'un professionnel",
                    click: 'cocolis',
                },
                {
                    label: "Recourir aux services des membres de l'application",
                    click: 'cocolis',
                },
            ],
            datePreview: 'oneMonthBefore',
        },
        {
            title: 'Réserver un emplacement sur la voirie',
            bouton: [
                {
                    label: 'Remplir le formulaire',
                    click: 'voirie',
                },
            ],
            datePreview: 'oneMonthBefore',
        },
        {
            title: "Envoyer un message au syndic de l'immeuble",
            bouton: [
                {
                    label: 'Envoyer un message',
                    click: 'sendMessageToSyndic',
                },
            ],
            datePreview: 'oneWeekBefore',
        },
        // {
        //     title: 'Signer le relevé contradictoire des compteurs',
        //     bouton: [
        //         {
        //             label: 'Envoyer un message',
        //             click: '',
        //         },
        //     ],
        //     sign: [
        //         {
        //             label: "Accord du vendeur sur l'index de sortie",
        //             name: '',
        //         },
        //         {
        //             label: "Accord de l'acquéreur sur l'index",
        //             name: '',
        //         },
        //     ],
        //     component: CounterSign,
        //     datePreview: 'dDay',
        // },
        {
            title: 'Signer le formulaire de changement de titulaire de la citerne',
            bouton: [
                {
                    label: 'Envoyer un message',
                    click: 'formulaire-titulaire-citerne',
                },
            ],
            sign: [
                {
                    label: '',
                    name: '',
                },
            ],
            datePreview: 'dDay',
        },
        {
            title: "Déclarer mon changment d'adresse à la commune",
            bouton: [
                {
                    label: 'Envoyer un message',
                    click: 'commune',
                },
            ],
            datePreview: 'dDay',
        },
        {
            title: "Transmettre à l'acquereur le DIU",
            bouton: [
                {
                    label: 'Transmettre',
                    click: 'transmettre-diu',
                    disabled: true,
                },
            ],
            datePreview: 'dDay',
        },
    ];

    watch(
        () => props.date,
        (v) => {
            formatDate(v);
        },
        { immediate: true }
    );

    
    function formatDate(date: any) {
        dDay.value = new Date(date);
        oneMonthBefore.value = new Date(
            dDay.value.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        oneWeekBefore.value = new Date(
            dDay.value.getTime() - 7 * 24 * 60 * 60 * 1000
        );
    }

    const params = ref<any>({
        emailTo: [],
        subject: 'Sans objet',
        body: '',
        inbox: 0,
    });

    function isDisabled(value: any) {
        if (!value) {
            return true;
        }
        const currentDate = new Date();
        return currentDate <= value;
    }

    async function handleClick(value: any, idx: number) {
        switch (value) {
            case 'sendMessageToSyndic':
                loadingBtn.value = idx;
                sendMessageToSyndic();
                break;
            case 'cocolis':
                router.push({ name: 'transport-moving-announcement' });
                break;
            case 'voirie':
                window.location.href = props.roadwayService.formVoirie;
                break;
            case 'commune':
                window.location.href = props.roadwayService.formChangeAdress;
                break;
            case 'transmettre-diu':
                await confirmDIUTransmission();
                break;
            case 'formulaire-titulaire-citerne':
                // let redirect user to the official website in case there is a future update
                const formPath = 'https://environnement.brussels/sites/default/files/user_files/form_notiftitulaire_fr.pdf'; 
                window.location.href = formPath;
                break;
            default:
                break;
        }
    }

    async function sendMessageToSyndic() {
        // recupère l'adresse email du syndic s'il existe
        if (props.propertyDetail) {
            if (props.propertyDetail.coOwnerhipTheProperty) {
                params.value.emailTo.push(
                    props.propertyDetail.coOwnerhipTheProperty.syndic.email
                );
                // Vérifie si l'user a un inbox ID et le recupère
                if (props.propertyDetail.user.mailId !== null) {
                    params.value.inbox = props.propertyDetail.user.mailId;
                } else {
                    // Récupère l'ID inbox de cet utilisateur s'il existe
                    try {
                        const inboxData = await getInboxById(
                            props.propertyDetail.user.id
                        );
                        if (inboxData && inboxData.length && inboxData[0].id !== null) {
                            params.value.inbox = inboxData[0].id;
                        } else {
                            // Ceci crée un inbox si on n'a pas encore un inbox
                            const param = {
                                userId: props.propertyDetail?.user.id,
                                name: props.propertyDetail?.user.name,
                            };
                            const data = await createInbox(param);
                            params.value.inbox = data.id;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
                // Envoyer le message au syndic
                sendMessageWithParam();
            } else {
                notification.warning({
                    message: "Votre bien n'a aucun syndinc enregistré",
                });
                loadingBtn.value = null;
            }
        } else {
            console.log('Propertydetail = null');
        }
    }

    async function sendMessageWithParam() {
        params.value = {
            ...params.value,
            subject: 'Envoie depuis déménagement',
            body: 'Message de démenagement vers le SYNDIC',
            category: 'moving',
        };
        try {
            const formData = new FormData();
            Object.keys(params.value).forEach((key) => {
                if (key === 'attachments') {
                    params.value[key].forEach((file: any, index: number) => {
                        formData.append(
                            `attachments[${index}][file]`,
                            file.originFileObj
                        );
                    });
                } else if (Array.isArray(params.value[key])) {
                    params.value[key].forEach((item: any, value: number) => {
                        formData.append(`${key}[${value}]`, item);
                    });
                } else {
                    formData.append(key, params.value[key]);
                }
            });
            const { data } = await MiniMailBox.postEmails(formData);
            notification.success({
                message: 'Message envoyé',
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Message non envoyé',
            });
        } finally {
            loadingBtn.value = null;
        }
    }

    async function getInboxById(userId: any) {
        const data = await MiniMailBox.getInboxesById(userId);
        return data;
    }

    async function createInbox(param: any) {
        const { data } = await MiniMailBox.createInbox(param);
        return data;
    }

    async function confirmDIUTransmission() {
        const acceptedOffer = props.propertyDetail.offers.find((element: any) => element.status === 'accepted');
        const payload = { property: props.propertyDetail.id, data: { user: acceptedOffer.user.id }};
        const { data } = await store.dispatch("MakeOfferModule/transmitDIU", payload);
    }

</script>
<style lang="scss" scoped>
    .moving-items {
        border: 0.5px solid var(--color-gray);
        @apply rounded-md flex flex-col gap-[18px] p-[12px];
        &__title {
            @apply text-grayIcon font-semibold;
        }
    }
    .disabled {
        pointer-events: none;
        opacity: 0.3;
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
