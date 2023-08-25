<template>
    <div class="companyMaintains__container">
        <div
            class="companyMaintains__content"
            v-if="!isLarge && dataCompany.length > 0"
            v-for="(company, index) in dataCompany"
            :key="index"
        >
            <div class="companyMaintains__content-para">
                <div class="companyMaintains__coordinate">
                    <Title
                        class="companyMaintains__title"
                        type="p"
                        label="ENTREPRISE"
                    />
                    <ul>
                        <li>{{ company.name }}</li>
                        <li>{{ company.address }}</li>
                        <li>Numéro d'entreprise : {{ company.number }}</li>
                    </ul>
                </div>
                <div class="companyMaintains__certification">
                    <Title
                        class="companyMaintains__title"
                        type="p"
                        label="ORGANE DE CERTIFICATION"
                    />
                    <Paragraphe v-html="company.organe" />
                </div>
                <div class="companyMaintains__scope-certification">
                    <Title
                        class="companyMaintains__title"
                        type="p"
                        label="CHAMP D'APPLICATION DU CERTIFICAT"
                    />
                    <Paragraphe v-html="company.certificate" />

                    <Paragraphe
                        >Date d'expiration : {{ company.expired }}</Paragraphe
                    >
                </div>
            </div>
            <div class="companyMaintains__button">
                <Button class="btn"
                    ><CallIcon /><a :href="`tel:+${company.number}`"
                        >Contacter</a
                    ></Button
                >
                <!--<Button class="btn" @on-click="sendMail(company.id)"
                    ><Message size="xs" /> Mail</Button
                >-->
            </div>
        </div>

        <div
            class="companyMaintains__content-web"
            v-if="isLarge && dataCompany.length > 0"
        >
            <table id="customers">
                <tr class="table-title">
                    <th>ENTREPRISE</th>
                    <th>ORGANE DE CERTIFICATION</th>
                    <th>CHAMP D'APPLICATION DU CERTIFICAT</th>
                </tr>
                <tr
                    v-for="(company, index) in dataCompany"
                    :key="index"
                    class="content-company"
                >
                    <td>
                        <ul class="data-first">
                            <li>{{ company.name }}</li>
                            <li>{{ company.address }}</li>
                            <li>Numéro d'entreprise: {{ company.number }}</li>
                            <!-- <li>9050 Gentbrugge</li>
                                <li>Numéro d'entreprise: 0452.906.460</li>-->

                            <li class="companyMaintains__button-web">
                                <Button
                                    class="btn"
                                    @on-click="addIdCompany(company.id)"
                                    ><CallIcon /><a
                                        :href="`tel:+${company.number}`"
                                        >Contacter</a
                                    ></Button
                                >
                                <!-- <Button
                                    class="btn"
                                    @on-click="sendMail(company.id)"
                                    ><Message
                                        size="xs"
                                        v-if="!loadingBtn"
                                    /><LoadingButton
                                        size="xs"
                                        theme="dark"
                                        v-if="loadingBtn"
                                    />
                                    Mail</Button
                                >-->
                            </li>
                        </ul>
                    </td>
                    <td>
                        <Paragraphe v-html="company.organe" />
                    </td>
                    <td>
                        <Paragraphe v-html="company.certificate" />
                        <br />

                        <Paragraphe class="date-expired"
                            >Date d'expiration :
                            {{
                                moment(company.expired).format('L')
                            }}</Paragraphe
                        >
                    </td>
                </tr>
            </table>
        </div>

        <div class="noExpert" v-if="dataCompany.length == 0">
            <a-empty description="Aucun entreprise d'entretien trouvée" />
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

    interface IDataCompany {
        id: number;
        name: string;
        address: string;
        number: string;
        organe: string;
        certificate: string;
        expired: string;
        starRatings: [];
    }

    const props = defineProps({
        dataCompany: {
            type: Array<IDataCompany>,
            default: [],
        },
        loadingBtn: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'sendMail', v: number): void;
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

    function sendMail(idClicked: number) {
        console.log('Envoier mail', idClicked);
        emit('sendMail', idClicked);
    }
</script>

<style scoped lang="scss">
    .companyMaintains {
        &__content {
            @apply border-solid border-2 border-[var(--color-gray)] rounded-[8px] mb-[15px];
        }
        &__content-para {
            @apply border-l-[3px] border-l-[var(--color-warn)] border-solid pl-[14px];
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
