<template>
    <div class="choicesOffer__container">
        <div class="choicesOffer__typeChoices" v-if="props.choicesType">
            <Paragraphe
                class="choicesOffer__typeChoices-label"
                v-for="choice in typeOfferChoices"
                @click="handleChoice(choice.value)"
                >{{ choice.label }}</Paragraphe
            >
        </div>
        <div class="choicesOffer__typeShared" v-if="!props.choicesType">
            <div class="choicesOffer__back" @click="handleBack">
                <ArrowBack /> <span>Retour</span>
            </div>
            <Paragraphe
                v-if="!showUsersList"
                class="choicesOffer__typeChoices-label"
                v-for="choiceShared in typeOfferToShared"
                @click="handleChoiceShared(choiceShared.value)"
                >{{ choiceShared.label }}</Paragraphe
            >

            <div class="choicesOffer__userToProposed" v-if="showUsersList">
                <Paragraphe class="user_label"
                    >Veuillez choisir l'utilisateur que vous voulez rejoindre
                    votre offre partager.</Paragraphe
                >
                <SelectAutoComplet
                    sub-title="Les utilisateurs"
                    name="userToProposed"
                    mode="multiple"
                    :options="userListe"
                    @change-select="handleSelectUser"
                />
                <Button
                    class="choicesOffer__btn"
                    @on-click="goToMakeOfferShared"
                    >Compléter l'offre</Button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import SelectAutoComplet from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const router = useRouter();
    const route = useRoute();

    const store = useStore();

    const props = defineProps({
        choicesType: {
            type: Boolean,
            default: true,
        },
        // userList: {
        //     type: Array<IUsersList>,
        //     default: null,
        // },
    });

    const emit = defineEmits<{
        (e: 'handleChoicesType', v: Boolean): void;
    }>();

    // let choicesType = ref<boolean>(true);

    let typeOfferChoices = [
        {
            label: 'Je souhaite acquérir seul le bien',
            value: 'offerUnique',
        },
        {
            label: 'Je souhaite m’associer à un autre offrant pour acquérir le bien',
            value: 'offerShared',
        },
    ];

    let typeOfferToShared = [
        {
            label: 'Dans LE BUT de faire un investissement conjoint',
            value: 'investment',
        },
        {
            label: 'Dans LE BUT de diviser à terme le bien',
            value: 'divideProperty',
        },
        {
            label: 'Dans LE BUT de se partager la jouissance du bien au cours de l’année',
            value: 'shareProperty',
        },
    ];
    let showUsersList = ref<boolean>(false);

    let userListe = ref<Array<any>>([]);

    interface IUsersList {
        label: string;
        value: string;
    }

    onMounted(() => {
        addListData();
    });

    async function addListData() {
        let data = store.getters['UserModule/getAllUser'];

        if (data !== null) {
            let users = store.getters['UserModule/getAllUser'];
            users.forEach((user: any) => {
                userListe.value.push({
                    value: user.email,
                    label: user.email,
                    key: user.email,
                });
            });
        } else {
            await store.dispatch('UserModule/setAllUser').then(() => {
                addListData();
            });
        }
    }

    function handleChoice(value: string) {
        switch (value) {
            case 'offerUnique':
                router.push({
                    name: 'make-offer',
                    params: { id: route.params.id },
                });
                break;
            case 'offerShared':
                emit('handleChoicesType', false);

                break;

            default:
                break;
        }
    }

    function handleBack() {
        emit('handleChoicesType', true);
    }

    function handleChoiceShared(value: string) {
        console.log(value, 'Value shared');
        showUsersList.value = true;
    }

    function handleSelectUser(value: any, option: any) {
        store.dispatch('MakeOfferModule/setParticipantSelected', option);
    }

    function goToMakeOfferShared() {
        router.push({
            name: 'make-offer-shared',
            params: { id: route.params.id },
        });
    }
</script>

<style scoped lang="scss">
    .choicesOffer {
        &__container {
            @apply relative;
        }
        &__back {
            @apply flex items-center gap-[10px] p-[8px] cursor-pointer top-[5px] left-[5px] mb-[15px] max-w-max;
        }
        &__typeChoices {
            &-label {
                @apply bg-[var(--color-gray)] text-center text-[var(--color-primary)] font-bold p-[10px] rounded-[8px] cursor-pointer mb-3 duration-300;
            }

            &-label:hover {
                @apply shadow-md;
            }
        }
        &__btn {
            @apply my-4 flex justify-end;
        }
    }

    .choicesOffer__userToProposed :global(.ant-select) {
        width: 100%;
    }

    .user_label {
        @apply mb-3;
    }
</style>
