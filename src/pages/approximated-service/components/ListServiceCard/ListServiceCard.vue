<script setup lang="ts">
    import { computed, ref } from 'vue';
    import Map from '../../../../components/Icon/Map.vue';
    import Edit from '../../../../components/Icon/Edit.vue';
    import Trash from '../../../../components/Icon/Trash.vue';
    import Paragraph from '../../../../components/Common/Paragraphe/Paragraphe.vue';
    import CalendarIcon from '@/components/Icon/Calendar.vue';
    import Ellipsis from '@/components/Icon/Ellipsis.vue';
    import moment from 'moment';
    import store from '@/store';
    import APopover from 'ant-design-vue/lib/popover';

    const props = defineProps({
        showTitle: {
            type: Boolean,
            default: false,
        },
        dataServices: {
            type: Array<any>,
            default: [],
        },
        visiblePopover: {
            type: Boolean,
            default: false,
        },
    });
    const idClick = ref<number>();
    let isMobile = window.matchMedia(
        'only screen and (max-width: 519px)'
    ).matches;

    console.log(isMobile, 'is Mobile ');

    const emit = defineEmits<{
        (e: 'on-handle-edit', id: number): void;
        (e: 'on-handle-remove', id: number): void;
    }>();

    let BASE_URL = import.meta.env.VITE_API_BASE_URL;
    BASE_URL = BASE_URL.replace('/api/immo/v2', '');

    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );

    const visible = ref<boolean>(false);

    function handleEditService(service: any) {
        emit('on-handle-edit', service);
        console.log(service, 'Servide');
        visible.value = false;
    }

    function handleRemoveService(id: number) {
        emit('on-handle-remove', id);
        visible.value = false;
    }

    function showPopover(id: number) {
        idClick.value = id;
        if (idClick.value === id) {
            visible.value = !visible.value;
        }
    }
</script>

<template>
    <div>
        <div class="cardList__title" v-if="showTitle && !isMobile">
            <p class="basis-2/4">Service</p>
            <p>Date</p>
            <p>Promotion</p>
            <p>Action</p>
        </div>
        <div
            class="cardList__content"
            v-for="(item, index) in dataServices"
            :key="index"
            v-if="!isMobile"
        >
            <div class="cardList__services">
                <figure>
                    <img
                        :src="`${
                            BASE_URL + '/' + item.imgpath + '/' + item.image
                        }`"
                        alt="img service"
                        class="services-img"
                    />
                </figure>
                <div class="cardList__services-title">
                    <Paragraph is="h2" type="bold" class="text-base"
                        >&nbsp;{{ item.title }}</Paragraph
                    >
                    <Paragraph class="service-inline">
                        <Map /> <span>{{ item.address }}</span>
                    </Paragraph>
                </div>
            </div>
            <div class="cardList__date">
                {{ moment(item.created).format('MM/DD/YYYY') }}
            </div>
            <div class="cardList__status">
                <Paragraph
                    type="bold"
                    :class="
                        [item.status ? item.status : 'none'] +
                        ' font-semibol text-center'
                    "
                    >{{
                        item.status === 'valid'
                            ? 'Validé'
                            : item.status === 'waiting'
                            ? 'En attente'
                            : item.status === 'refused'
                            ? 'Refusé'
                            : 'Pas de status'
                    }}</Paragraph
                >
            </div>
            <div class="cardList__action">
                <Edit
                    class="cursor-pointer"
                    @click="handleEditService(item)"
                    v-if="
                        +item.user.replace('/api/immo/v2/users/', '') ===
                        userLoggedIn.id
                    "
                />
                <Trash
                    class="cursor-pointer"
                    @click="handleRemoveService(item.id)"
                />
            </div>
        </div>
        <!-- for mobile-->
        <div
            class="cardList__content-mobile"
            v-for="(item, index) in dataServices"
            :key="index"
            v-if="isMobile"
        >
            <div class="cardList__services-mobile">
                <figure>
                    <img
                        :src="`${
                            BASE_URL + '/' + item.imgpath + '/' + item.image
                        }`"
                        alt="img service"
                        class="services-img-mobile"
                    />
                </figure>
            </div>
            <div class="container-mobile w-full">
                <div class="cardList__services-title">
                    <Paragraph is="h2" type="bold" class="text-base"
                        >&nbsp;{{ item.title }}</Paragraph
                    >
                    <Paragraph class="service-inline">
                        <Map />&nbsp; <span>{{ item.address }}</span>
                    </Paragraph>
                </div>

                <div class="cardList__status-mobile">
                    <div
                        :class="
                            'dote ' +
                            [item.status ? item.status + '-dote' : 'none-dote']
                        "
                    ></div>
                    <Paragraph
                        type="bold"
                        :class="
                            [
                                item.status
                                    ? item.status + '-mobile'
                                    : 'none-mobile',
                            ] + ' font-semibol'
                        "
                        >{{
                            item.status === 'valid'
                                ? 'Validé'
                                : item.status === 'waiting'
                                ? 'En attente'
                                : item.status === 'refused'
                                ? 'Refusé'
                                : 'Pas de status'
                        }}</Paragraph
                    >
                </div>

                <div class="cardList__date-mobile">
                    <CalendarIcon />
                    &nbsp;
                    {{ moment(item.created).format('MM/DD/YYYY') }}
                </div>
                <div class="ellipsis">
                    <a-popover
                        :visible="idClick === item.id ? visible : false"
                        trigger="click"
                    >
                        <Ellipsis @click="showPopover(item.id)" />
                        <template #content>
                            <div class="content-ellipsis">
                                <Edit
                                    class="cursor-pointer"
                                    @click="handleEditService(item)"
                                    v-if="
                                        +item.user.replace(
                                            '/api/immo/v2/users/',
                                            ''
                                        ) === userLoggedIn.id
                                    "
                                />
                                <Trash
                                    class="cursor-pointer"
                                    @click="handleRemoveService(item.id)"
                                />
                            </div>
                        </template>
                    </a-popover>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .cardList {
        &__title {
            @apply flex flex-row items-center justify-between pt-[12px] rounded-[8px] gap-[10px] text-[var(--color-primary)] font-semibold;
        }
        &__content {
            border: 0.5px solid var(--color-stroke-gray);
            @apply flex flex-row items-center justify-between p-[12px] rounded-[8px] my-[15px] gap-[10px];
        }

        &__services {
            @apply flex items-center gap-[10px] basis-2/4 flex-wrap;
        }

        &__action {
            @apply flex items-center justify-center gap-[10px];
        }

        &__content-mobile {
            border: 0.5px solid var(--color-stroke-gray);
            @apply relative flex flex-row items-center justify-start p-[12px] rounded-[8px] my-[15px] gap-[10px];
        }

        &__services-mobile {
            @apply flex items-center gap-[10px];
        }
        &__date-mobile {
            @apply flex items-center justify-start;
        }
        &__status-mobile {
            @apply flex items-center;
        }
    }

    .dote {
        @apply p-[5px] rounded-full;
    }

    .services-img {
        @apply w-[94px] h-[74px] rounded-[8px];
    }
    .services-img-mobile {
        @apply w-[130px] h-[100px] rounded-[8px] object-cover;
    }
    .service-inline {
        @apply flex items-center;
    }

    .ellipsis {
        @apply absolute top-[15px] right-[15px] p-[5px] cursor-pointer;
    }
    .content-ellipsis {
        @apply flex items-center;
    }

    .valid {
        background: rgba(103, 205, 132, 0.2);
        @apply text-[var(--color-green)] rounded-[20px] py-1 px-2 min-w-[81px];
    }

    .refused {
        background: rgba(239, 121, 96, 0.2);
        @apply text-[var(--color-red)] rounded-[20px] py-1 px-2 min-w-[81px];
    }

    .waiting {
        background: rgba(255, 152, 0, 0.3);
        @apply text-[var(--color-warn)] rounded-[20px] py-1 px-2 min-w-[81px];
    }

    .none {
        background: rgba(148, 159, 181, 0.25);
        @apply text-[var(--color-primary)] rounded-[20px] py-1 px-2 min-w-[81px];
    }
    .valid-mobile {
        @apply text-[var(--color-green)] rounded-[20px] py-1 px-2 min-w-[81px];
    }

    .refused-mobile {
        @apply text-[var(--color-red)] rounded-[20px] py-1 px-2 min-w-[81px];
    }

    .waiting-mobile {
        @apply text-[var(--color-warn)] rounded-[20px] py-1 px-2 min-w-[81px];
    }

    .none-mobile {
        @apply text-[var(--color-primary)] rounded-[20px] py-1 px-2 min-w-[81px];
    }

    .valid-dote {
        background: var(--color-green);
    }

    .refused-dote {
        background: var(--color-red);
    }

    .waiting-dote {
        background: var(--color-warn);
    }

    .none-dote {
        background: var(--color-primary);
    }
</style>
