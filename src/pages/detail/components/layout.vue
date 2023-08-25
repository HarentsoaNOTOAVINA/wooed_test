<template>
    <div class="main-container">
        <div class="main-navigation">
            <slot name="navigation" />
        </div>
        <div class="detail__btnContainer">
            <!-- <Button
                v-if="showMakeOffer"
                class="detail__btnOffer"
                @click="gotoOffer"
                >Faire une offre</Button
            > -->
            <Button
                v-if="!isMe || !route.query.type"
                class="detail__btnOffer"
                @click="gotoOffer"
                >Faire une offre</Button
            >
            <Button
                theme="light"
                class="detail__btnOffer showMobileSimilar"
                @click="showMobileSimilar"
                >Bien similaire</Button
            >
            <Button
                v-if="route.query.type"
                class="detail__btnOffer"
                @click="gotoOfferList"
            >
                Voir les offres
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import { reactive, computed, shallowRef, ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import MainDetail from '@/pages/detail/components/mainDetail/MainDetail.vue';
    import LiveVideo from '@/pages/detail/components/liveVideo/LiveVideo.vue';
    import DetailedInfo from '@/pages/detail/components/detailedInfo/DetailedInfo.vue';
    import RelateDocument from '@/pages/detail/components/RelateDocument/RelateDocument.vue';
    import ButtonLocation from '@/pages/detail/components/Location/ButtonLocation.vue';
    import { Store, useStore } from 'vuex';

    onMounted(() => {
        console.log('is me:', totalOffer.value);
        console.log('user email:', userLoggedIn.value.email);
        console.log('users offers:', totalUserOffer.value);
        console.log('property owner:', ownerEmail.value);
        checkUserOffers();
        console.log('users offers:', hasUserDoneOffer.value);
    });

    //variables
    const route = useRoute();
    const router = useRouter();
    const store: Store<any> = useStore();
    // let isMe = ref(false)
    let isMe = computed(
        () => store.getters['PropertyDetailModule/getPropertyOwner']
    );
    let totalOffer = computed(
        () => store.getters['PropertyDetailModule/getTotalOffer']
    );
    let totalUserOffer = computed(
        () => store.getters['PropertyDetailModule/getTotalUserOffer']
    );
    let ownerEmail = computed(
        () => store.getters['PropertyDetailModule/getPropertyOwnerByMail']
    );
    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    let hasUserDoneOffer = ref<boolean>(false);
    let hasSentUserOffer = ref<boolean>(false);
    // const checkUserOffers = () => {
    //     hasUserDoneOffer.value = totalUserOffer.value.some((mail: any) =>
    //         mail.user.email.includes(userLoggedIn.value)
    //     );
    //     console.log('hasUserDoneOffer', hasUserDoneOffer.value);
    // };

    const checkUserOffers = () => {
        // totalUserOffer.value.forEach((mail: any) => {
        //     console.log('mail total user offer:', mail.user.email);

        //     if (!mail.user.email.includes(userLoggedIn.value)) {
        //         hasUserDoneOffer.value = true;
        //     } else {
        //         hasUserDoneOffer.value = false;
        //     }
        // });
        // console.log('hasUserDoneOffer', hasUserDoneOffer.value);
        console.log('user logged in', userLoggedIn.value);

        let usersMail = totalUserOffer.value.filter(
            (userOffer: any) =>
                userOffer.user.email === userLoggedIn.value.email
        );
        console.log('user last offer', usersMail);
        let lastOffer = usersMail[usersMail.length - 1];
        if (lastOffer) {
            if (lastOffer.status === 'sent') {
                hasSentUserOffer.value = false;
            } else {
                hasSentUserOffer.value = true;
            }
        }
    };

    let showMakeOffer = computed(() => {
        if (userLoggedIn.value === ownerEmail.value) {
            return false;
        } else if (!hasSentUserOffer.value) {
            return false;
        } else {
            return true;
        }
    });
    //screen size
    const screenType = ref<string | number>(screen.width);
    //detailedInfo
    let showInfo = ref<boolean>(false);
    //relateDocument
    let showDoc = ref<boolean>(false);
    //location
    let showLocationBtn = ref<boolean>(false);
    //MainDetail data props
    const userStatus = computed(
        () => store.getters['UserModule/isUSerConnected']
    );
    let infoData = ref<any>();
    //loader
    let loading = ref<boolean>(true);
    const operationType = computed(
        () => store.getters['PropertyDetailModule/getOperationTye']
    );
    const isDrower = ref<boolean>(false);
    const emit = defineEmits<{
        (e: 'isDrower', value: boolean): void;
        (e: 'handleModalChoicesOffer'): void;
    }>();
    const viewList: string[] | any = {
        MainDetail,
        LiveVideo,
        DetailedInfo,
        RelateDocument,
        ButtonLocation,
    };

    const text = reactive({
        operationType: {
            LEASE: 'lease',
            SALE: 'sale',
        },
    });

    //functions handler
    function locationFn(item: any) {
        console.log('url', item);
        switch (item.case) {
            case 'parcelleCadastrale':
                console.log(item.url);
                router.push({
                    path: `/detail/localisation/${route.params.id}`,
                });
                break;
            default:
                break;
        }
    }
    function gotoOffer(): void {
        if (operationType.value.toLowerCase() === text.operationType.LEASE) {
            router.push({
                name: 'rental-processes',
                params: { id: route.params.id },
            });
        } else if (
            operationType.value.toLowerCase() === text.operationType.SALE
        ) {
            emit('handleModalChoicesOffer');

            // router.push({
            //     name: 'make-offer',
            //     params: { id: route.params.id },
            // });
        }
    }

    //close detailedInfo
    function hide(): void {
        console.log('last');
        showInfo.value = false;
    }
    //close relateDoc
    function returnToMain(): void {
        showDoc.value = false;
    }

    const gotoOfferList = () => {
        router.push({ path: `/offres/${route.params.id}` });
    };

    function showMobileSimilar() {
        isDrower.value = true;
        emit('isDrower', isDrower.value);
    }
</script>

<style lang="scss" scoped>
    .main {
        &-container {
            @apply w-full flex flex-col gap-[10px] bg-white pb-[10px] px-[10px] rounded-[8px] rounded-t-none;
            @screen md {
                @apply gap-[24px];
            }
            @screen lg {
                @apply p-0 rounded-none;
            }
        }
        &-navigation {
            min-height: 10vh;
            @screen lg {
                min-height: none;
            }
        }
    }
    .fade-page-enter-active,
    .fade-page-leave-active {
        transition: all 0.4s ease;
        visibility: hidden;
        transition-delay: 0.1s;
    }

    .fade-page-enter-from,
    .fade-page-leave-to {
        opacity: 0;
        visibility: visible;
    }
    .detail {
        &__btnContainer {
            display: flex;
            flex-direction: column;
            gap: 5px;
            justify-content: center;
            @apply lg:flex lg:flex-row lg:justify-center;
            @screen lg {
                @apply absolute bottom-[12px] w-full left-0 px-[12px];
            }
        }
        .button {
            @apply w-full;
        }
        &__btnOffer {
            &.showMobileSimilar {
                @screen lg {
                    @apply hidden;
                }
            }
            &:deep() {
                .button__primary {
                    width: 100%;
                }
            }
            @apply rounded text-sm font-semibold w-full;
            @media (min-width: 1024px) {
                width: 367px;
            }
        }
    }
</style>
