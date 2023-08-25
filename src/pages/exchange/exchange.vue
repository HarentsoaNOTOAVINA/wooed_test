<template>
    <MainContainer class="exchange">
        <Modal :is-show-modal="isShowContact" @on-back="isShowContact = false">
            <template #content>
                <div class="contact">
                    <div class="contact__form">
                        <Title
                            class="contact-title"
                            type="h4"
                            label="Propriétaire"
                        />
                        <hr />
                        <Paragraphe class="contact-details">
                            <User /> {{ userContact?.name }}</Paragraphe
                        >
                        <Paragraphe class="contact-details">
                            <Mail /> {{ userContact?.email }}</Paragraphe
                        >
                    </div>
                    <Button
                        :is-load="isLoadContact"
                        loading-theme="light"
                        @click="handleContact"
                        class="contact-submit"
                        >Contactez</Button
                    >
                </div>
            </template>
        </Modal>
        <!-- <div class="exchange__header">
              <div class="flex items-center gap-[10px]">
                  <ArrowBack
                      class="hover:cursor-pointer back-icon"
                      @click="onBack"
                  />
                  <NavigationComponent
                      :navigation-menu-array="navigation"
                      @on-navigate-to="handleSpecNav"
                  />
              </div>
          </div> -->
        <MainCard
            :dataBreadcrumbs="[{ label: title }]"
            :go-back="true"
            class="exchange__main-container"
            @go-back="goBack"
        >
            <!-- <Title class="title" type="h3">{{ title }}</Title>
              <hr /> -->
            <transition name="fade-step" mode="out-in">
                <component
                    :is="activeCmp"
                    :search-params="searchParams"
                    @on-select-duration="handleSelectedDuration"
                    @on-select-owner-property-way="hanldeSelectedChoosingWay"
                    @on-select-owner-property="handleSelectedOwnerProperty"
                    @on-select-other-property="handleSelectedOtherProperty"
                    @on-get-search-params="handleSearchExchangable"
                    @on-select-other-property-way="handleExchangableOrNot"
                    :globalParams="params"
                />
            </transition>
        </MainCard>
    </MainContainer>
</template>
<script lang="ts" setup>
    import { onMounted, ref, shallowRef, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { notification } from 'ant-design-vue';
    import Title from '@/components/Common/Title/Title.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Mail from '@/components/Icon/Mail.vue';
    import User from '@/components/Icon/User.vue';
    import exchangeProperty from '@/services/exchangeProperty';
    /**
     * @STEP_START
     */
    import Duration from './Step/Duration.vue';
    import ChooseMyProperty from './Step/ChooseMyProperty.vue';
    import NavigationComponent from '@/components/Display/NavigationComponent/NavigationComponent.vue';
    import OwnerPropertyList from './Step/OwnerPropertyList.vue';
    import OtherPropertyHandling from './Step/OtherPropertyHandling.vue';
    import SearchExchangableProperty from './Step/SearchExchangableProperty.vue';
    import OtherPropertyList from './Step/OtherPropertyList.vue';
    import SearchSimpleProperty from './Step/SearchSimpleProperty.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import { stepData } from './stepData';
    /**
     * @STEP_END
     */

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    interface Params {
        isDefinitive?: boolean;
        myPropertyId?: number;
        thePropertyId?: number;
        urlDetailProperty?: string;
        dateStart?: string;
        dateEnd?: string;
    }
    const isShowContact = ref<boolean>(false);
    const params = ref<Params>({ urlDetailProperty: 'detail' });
    const activeCmp = shallowRef<any>(null);
    const title = ref<string>('');
    const searchParams = ref<any>(null);
    const userContact = ref<{ email: string; name: string }>();
    const isLoadContact = ref<boolean>(false);
    // const navigation = shallowRef<any[]>([
    //     {
    //         label: 'Durée',
    //         name: 'duration',
    //         component: Duration,
    //     },
    // ]);

    // watch(
    //     () => navigation.value,
    //     (v) => {
    //         makeChoice(v);
    //     },
    //     { immediate: true, deep: true }
    // );

    // function makeChoice(v: any) {
    //     let item = Array.isArray(v) ? v.at(-1) : v;
    //     const { label, component } = item;
    //     title.value = label;
    //     activeCmp.value = component;
    // }
    // function onBack() {
    //     if (navigation.value.length === 1) {
    //         router.go(-1);
    //     } else {
    //         const newArr = [...navigation.value];
    //         newArr.pop();
    //         navigation.value = [...newArr];
    //     }
    // }
    function handleSpecNav(chosenItem: any) {
        // const idx = navigation.value.indexOf(
        //     navigation.value.filter((item) => chosenItem.name === item.name)[0]
        // );
        // navigation.value = [...navigation.value.slice(0, idx + 1)];
    }
    function handleSelectedDuration(duration: any) {
        params.value = {
            ...params.value,
            ...duration,
        };
        // navigation.value = [
        //     ...navigation.value,
        //     {
        //         label: 'Identifier le bien que je souhaite échanger',
        //         name: 'choicePropOwner',
        //         component: ChooseMyProperty,
        //     },
        // ];
        addQueryParams('choicePropOwner');
    }
    function hanldeSelectedChoosingWay(choice: string) {
        if (choice === 'create') {
            store.dispatch('ProductsListModule/setOperationType', 'sale');
            router.push('/ajouter');
        } else {
            // navigation.value = [
            //     ...navigation.value,
            //     {
            //         label: 'Sélectionner l’un de « mes biens »',
            //         name: 'choseOwnerProperty',
            //         component: OwnerPropertyList,
            //     },
            // ];
            addQueryParams('choseOwnerProperty');
        }
    }

    function handleSelectedOwnerProperty(details: any) {
        const { id, lat, lng } = details;
        params.value = {
            ...params.value,
            myPropertyId: id,
        };
        store.dispatch('ExchangePropertyModule/setOwnerPropertyCoords', {
            lat,
            lng,
        });
        // navigation.value = [
        //     ...navigation.value,
        //     {
        //         label: 'Identifier le bien contre lequel je souhaite échanger mon bien',
        //         name: 'choicePropOther',
        //         component: OtherPropertyHandling,
        //     },
        // ];
        addQueryParams('choicePropOther');
    }
    function handleSelectedOtherProperty(otherProperty: any) {
        const { id, user } = otherProperty;
        params.value = {
            ...params.value,
            thePropertyId: id,
        };
        const { name, firstname, email } = user;
        userContact.value = {
            name: `${firstname} ${name}`,
            email,
        };
        isShowContact.value = true;
    }
    function handleExchangableOrNot(isExchangable: boolean) {
        if (isExchangable) {
            // navigation.value = [
            //     ...navigation.value,
            //     {
            //         label: 'Rechercher le bien à échanger',
            //         name: 'simpleSearchProperty',
            //         component: SearchExchangableProperty,
            //     },
            // ];
            addQueryParams('simpleSearchProperty');
        } else {
            // navigation.value = [
            //     ...navigation.value,
            //     {
            //         label: 'Rechercher des biens au alentours',
            //         name: 'mapSearchProperty',
            //         component: SearchSimpleProperty,
            //     },
            // ];
            addQueryParams('mapSearchProperty');
        }
    }
    function handleSearchExchangable(params: any) {
        searchParams.value = params;
        // navigation.value = [
        //     ...navigation.value,
        //     {
        //         label: 'Resultat des biens disponible',
        //         name: 'exchangablePropertyResult',
        //         component: OtherPropertyList,
        //     },
        // ];
        addQueryParams('exchangablePropertyResult');
    }
    async function handleContact() {
        try {
            isLoadContact.value = true;
            const { data } = await exchangeProperty.contact(params.value);
            console.log(data, 'SEND');
            notification.success({ message: `Le propriétaire à été notifié` });
            isShowContact.value = false;
        } catch (error) {
            notification.error({
                message: `Une erreur s'est produite, veuilliez reessayer`,
            });
        } finally {
            isLoadContact.value = false;
        }
    }

    onMounted(() => {
        activeComponent();
    });

    const goBack = () => {
        router.go(-1);
    };

    function addQueryParams(name: string) {
        const data = stepData.filter((item) => {
            return item.name === name;
        });
        const typeQuery = data[0].query;
        router.push({
            name: 'exchange',
            query: {
                status: typeQuery,
            },
        });
    }

    function activeComponent() {
        if (route.query.status) {
            const comp = stepData.filter((item) => {
                return item.query === route.query.status;
            });
            activeCmp.value = comp[0].component;
            title.value = comp[0].label;
        } else {
            activeCmp.value = stepData[0].component;
            title.value = stepData[0].label;
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .contact {
        &__form {
            &:deep() {
                path {
                    fill: var(--color-primary);
                    fill-opacity: 1;
                }
            }
        }
        hr {
            @apply text-gray mt-[5px] mb-[15px];
        }
        &-title {
            @apply font-semibold text-primary text-[14px];
        }
        &-details {
            @apply flex my-[20px] items-center gap-[10px];
        }
        &-submit {
            @apply w-full;
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }
    .exchange {
        .fade-step-enter-active,
        .fade-step-leave-active {
            @apply transition-all;
        }
        .fade-step-enter-from,
        .fade-step-leave-to {
            @apply translate-x-[-100px] opacity-0;
        }
        .back-icon {
            flex: 0 0 40px;
        }
        &__main-container {
            @apply max-w-full;
        }
        &:deep(.mainCard__items-wrap) {
            height: calc(100vh - 168px);
            @apply mx-[-14px] px-[14px] pt-[18px] overflow-y-auto;
            @include scrollbar;
        }
        &:deep(.exchange-items) {
            @apply h-[calc(100vh-186px)];
            @screen md {
                @apply h-[calc(100vh-192px)];
            }
            @media (min-height: 550px) {
                @apply flex;
            }
        }
        &:deep(.exchange-items__choice) {
            @apply flex transition-all justify-center items-center flex-col gap-[5px] p-[15px];
        }
        // @apply md:container p-[20px] overflow-hidden;
        &:deep(.go-back) {
            @apply mb-[-10px] mt-[-7px] mr-[5px];
        }
        &__header {
            @apply mb-[20px] p-[10px] rounded-[8px] bg-white;
        }
        .title {
            @apply font-semibold text-primary text-[14px];
        }
    }
</style>
