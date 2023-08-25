<template>
    <Loader v-if="loadReset" />
    <div v-else class="notification md:container">
        <div class="notification__header">
            <Paragraphe>
                <span class="notification__header__desc"
                    ><BackButton @return="onBackHandler" /> Notifications</span
                >
                <Bell />
            </Paragraphe>
        </div>
        <div
            class="notification__content"
            :class="{ 'notification__content--empty': isNotificationsEmpty }"
        >
            <a-empty
                v-if="isNotificationsEmpty"
                description="Vous n'avez pas de notifications pour l'instant"
            />

            <template v-else>
                <NotificationItem
                    @click="redirectionHandler(item)"
                    :notification="item"
                    v-for="item in notificationsList"
                    :key="item.id"
                />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Bell from '@/components/Icon/Bell.vue';
    import NotificationItem from './NotificationItem/NotificationItem.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    import { onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { NotificationsService } from '@/services/notificationsService';
    import { useStore } from 'vuex';
    import updateDatetime from '@/utils/date/updateDatetime';
    import { useSlug } from '@/composables/user/useUsernameSlug';

    const store = useStore();
    const router = useRouter();
    const slug = useSlug();

    interface TypesNotification {
        created: string;
        id: number;
        message: string;
        subtype: string | null;
        thePropertyId: number | null;
        type: string;
        view: boolean;
        typeUser: string;
        providerTankInstallationUid: string;
    }

    const loadReset = ref<boolean>(false);
    const notificationsList = ref<Array<TypesNotification>>([]);
    const isRedirected = ref<boolean>(false);

    onMounted(() => {
        resetNotification();
    });

    const isNotificationsEmpty = ref<boolean>(false);
    watch(
        () => store.getters['NotificationModule/getNotificationsCount'],
        (v) => {
            if (v !== 0) {
                resetNotification();
            }
        }
    );

    watch(
        () => store.getters['NotificationModule/getNotifications'],
        (value) => {
            if (!value) {
                loadReset.value = true;
            } else {
                if (!isRedirected.value) {
                    loadReset.value = false;
                }
                notificationsList.value = value
                    ? formateNestedDateTime(value.notifications)
                    : [];
                isNotificationsEmpty.value = !!!notificationsList.value.length;
            }
        },
        { immediate: true }
    );

    function formateNestedDateTime(
        notificationArray: Array<TypesNotification>
    ): Array<TypesNotification> {
        return [
            ...notificationArray.map((item) => ({
                ...item,
                created: updateDatetime(item.created, 'il y a'),
            })),
        ] as Array<TypesNotification>;
    }

    async function resetNotification() {
        loadReset.value = true;
        const { code } = await NotificationsService.resetNotification();
        store.dispatch('NotificationModule/setNotificationsCount', 0);

        if (Object.keys(notificationsList.value).length || code === 200) {
            loadReset.value = false;
        }
    }

    function onBackHandler() {
        router.go(-1);
    }

    async function redirectionHandler(notificationItem: TypesNotification) {
        console.log('object');
        isRedirected.value = true;
        loadReset.value = true;
        const { code } = await NotificationsService.makeNotificationSeen(
            notificationItem.id
        );
        if (code === 200) {
            router.push(notificationURLControl(notificationItem));
        }
    }
    interface TypesUrlForm {
        name?: string;
        query?: any;
        params?: any;
        path?: any;
    }
    function notificationURLControl(
        notificationItem: TypesNotification
    ): TypesUrlForm {
        let urlData: TypesUrlForm = { name: 'home' };
        const type = notificationItem.type;
        const subtype = notificationItem.subtype;
        const tankInstallationUid = notificationItem.providerTankInstallationUid;
        let thePropertyId = notificationItem.thePropertyId ?? null;
        urlData = {
            path: slug.value,
            query: {
                to: JSON.stringify({ name: 'offer-detail', thePropertyId }),
            },
        };
        switch (type) {
            case 'property':
                switch (subtype) {
                    case 'offer':
                        urlData = {
                            name: 'offres',
                            params: { id: thePropertyId },
                        };
                        break;
                    case 'counter_offer':
                        switch (notificationItem.typeUser) {
                            case 'seller':
                                urlData = {
                                    name: 'offres',
                                    params: { id: thePropertyId },
                                };
                                break;
                            case 'buyer':
                                urlData = {
                                    path: slug.value,
                                    query: {
                                        to: JSON.stringify({
                                            name: 'offer-detail',
                                            thePropertyId,
                                        }),
                                    },
                                };
                                break;
                        }
                        break;
                    case 'tank_installation':
                        urlData = {
                            path: `/installation-citerne/${tankInstallationUid}/${thePropertyId}`,
                        }
                        break;
                }
        }
        console.log(urlData, 'urlData');
        return urlData;
    }
</script>

<style lang="scss" scoped>
    .notification {
        @apply flex flex-col gap-[10px] p-[10px];
        &__header,
        &__content {
            background-color: #fff;
            border-radius: 8px;
            padding: 10px;
        }
        &__content {
            min-height: calc(100vh - 133px);
            &--empty {
                @apply flex justify-center items-center;
                :deep() {
                    .ant-empty-description {
                        color: var(--color-stroke-gray);
                    }
                }
            }
        }
        &__header {
            &__desc {
                @apply flex justify-start;
            }
            &:deep() {
                p {
                    font-weight: 600;
                    @apply flex justify-between;
                    .backBtn {
                        margin: 0;
                        width: auto;
                    }
                }
            }
        }
    }
</style>
