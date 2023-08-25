<template>
    <div class="companyMaintains__container">
        <!--v-if="dataCompany.length > 0"
        v-for="(company, index) in dataCompany"
        :key="index"-->
        <div
            class="companyMaintains__content"
            v-for="(data, index) in dataExpert"
            :key="index"
        >
            <div class="companyMaintains__content-para">
                <div class="companyMaintains__coordinate">
                    <Title
                        class="companyMaintains__title"
                        type="p"
                        label="EXPERT"
                    />
                    <ul>
                        <li>
                            {{
                                data.office?.name ? data.office?.name : 'Aucun'
                            }}
                        </li>
                    </ul>
                </div>
                <div class="companyMaintains__certification">
                    <Title
                        class="companyMaintains__title"
                        type="p"
                        label="ADRESSE"
                    />
                    <ul>
                        <li v-for="(expert, i) in data.experts">
                            Employeur :
                            {{ expert.name ? expert.name : 'Aucun' }}
                        </li>
                        <li>
                            Adresse :
                            <span v-html="data.office?.address"></span>
                        </li>
                    </ul>
                </div>
                <div class="companyMaintains__scope-certification">
                    <Title
                        class="companyMaintains__title"
                        type="p"
                        label="CONTACT"
                    />
                    <ul>
                        <li>Numéro d'agrément : {{ data.approvalNumber }}</li>
                        <li>
                            E-mail :
                            {{
                                data.office?.mail ? data.office?.mail : 'Aucun'
                            }}
                        </li>
                        <li>
                            Telephone :
                            {{
                                data.office?.phone
                                    ? data.office?.phone
                                    : 'Aucun'
                            }}
                        </li>
                    </ul>

                    <Paragraphe
                        >Date d'expiration :
                        {{
                            moment(data.dueDate).format('DD/MM/YYYY')
                        }}</Paragraphe
                    >
                </div>
            </div>
            <div class="companyMaintains__button">
                <Button class="btn" v-if="data.office?.phone"
                    ><CallIcon /><a :href="`tel:+${data.office?.phone}`"
                        >Contacter</a
                    ></Button
                >
                <Button
                    class="btn"
                    @on-click="sendMail(data)"
                    v-if="data.office?.mail"
                    ><Message
                        size="xs"
                        v-if="props.loadingBtn == false"
                    /><LoadingButton
                        size="xs"
                        theme="dark"
                        v-if="props.loadingBtn && data.id === props.idExpert"
                    />
                    Mail</Button
                >
                <!--<Button class="btn"><Message size="xs" /> Mail</Button>-->
            </div>
        </div>

        <div class="noExpert" v-if="dataExpert.length == 0">
            <a-empty description="Aucun expert trouvée" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import CallIcon from '@/components/Icon/CallIcon.vue';
    import Message from '@/components/Icon/MessageBox.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import { ref, onMounted } from 'vue';
    import moment from 'moment';
    import { Store, useStore } from 'vuex';

    interface IOffice {
        id?: string;
        name?: string;
        address?: string;
        number?: string;
        phone?: string;
        fax?: string;
        mail?: string;
        web?: string;
    }

    interface IExpert {
        id?: string;
        name?: string;
    }

    interface IDataCompany {
        id?: any;
        office?: IOffice;
        approvalNumber?: string;
        dueDate?: string;
        comments?: string;
        region?: [];
        starRatings?: [];
        experts: IExpert[];
    }

    const props = defineProps({
        dataExpert: {
            type: Array<IDataCompany>,
            default: [],
        },
        loadingBtn: {
            type: Boolean,
            default: false,
        },
        idExpert: {
            type: Number,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'handleSendMail', v: object): void;
    }>();

    const store: Store<any> = useStore();
    let isLarge = ref<boolean>(false);

    window.screen.width > 496 && window.screen.width < 770
        ? (isLarge.value = true)
        : (isLarge.value = false);

    if (window.screen.width > 920) {
        isLarge.value = true;
    }

    function addIdCompany(idCompany: number) {
        store.dispatch('WorksModule/setIdExpertElevator', idCompany);
    }

    function sendMail(expert: object) {
        emit('handleSendMail', expert);
    }
</script>

<style scoped lang="scss">
    .companyMaintains {
        &__content {
            @apply border-solid border-2 border-[var(--color-gray)] rounded-[8px] mb-[15px];

            &:hover {
                @apply shadow-xl;
            }
        }
        &__content-para {
            @apply border-l-[3px] border-l-[var(--color-warn)] border-solid pl-[14px];

            @screen sm {
                @apply flex items-start gap-[50px];
            }
        }
        &__title {
            @apply text-[var(--color-warn)] font-semibold mt-[18px];
        }
        &__button {
            @apply flex gap-[15px] my-[15px] ml-[14px];
            &:deep() {
                button {
                    @apply min-w-[150px] bg-[var(--color-gray)] text-black rounded-[8px];
                }

                .button__primary {
                    @apply flex items-center justify-center gap-[10px] p-[10px];
                }
            }
        }
        &__button-web {
            @apply flex gap-[15px] my-[15px];
            &:deep() {
                button {
                    @apply min-w-[150px] bg-[#fff] text-black rounded-[8px];
                }

                .button__primary {
                    @apply flex items-center justify-center gap-[10px] p-[10px];
                }
            }
        }
    }

    table {
        table-layout: fixed;
        border-collapse: collapse;
        border-spacing: 0 10px;
    }

    th {
        width: 20%;
    }
    td {
        vertical-align: top;
    }
    .data-first {
        border-left: 2px solid var(--color-warn);
        padding-left: 5px;
        height: 100%;
    }
    // .content-company {
    //     // border: 1px solid var(--color-gray);
    //     border: 1px solid var(--color-gray);
    //     margin: 10px 0;
    // }
    .date-expired {
        @apply text-[var(--color-gray)];
    }

    #customers {
        font-family: Arial, Helvetica, sans-serif;
        width: 100%;
    }

    #customers td,
    #customers th {
        @apply p-[8px];
    }

    // #customers tr:nth-child(even) {
    //     @apply bg-[var(--color-gray)];
    // }

    #customers tr:hover {
        background-color: #ddd;
        border-radius: 8px;

        .data-first {
            border-left: none;
        }
    }

    #customers th {
        @apply py-[12px] text-left text-[var(--color-gray)];
    }

    .table-title {
        @apply border-y border-[var(--color-gray)];
        // @apply bg-[var(--color-primary)];
    }
    a:hover {
        @apply text-[#000];
    }
</style>
