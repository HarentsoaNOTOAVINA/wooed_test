<template>
    <div class="btnDetail">
        <ButtonMenu
            v-for="(item, index) in btnList"
            :key="index"
            :isIcon="item.icon"
            class="btnDetail__btn"
            :class="
                (item.case === 'AddServicesModal' && props.isMe) ||
                item.showBtn == false
                    ? 'hide'
                    : null
            "
            @on-click="clickChangeView(item.case)"
        >
            <!-- changeViewDetailedInfo(item.case);
        changeViewRelateDoc(item.case); -->
            <!-- changeViewLocation(item.case); -->
            <span>
                {{ item.label }}
            </span>
        </ButtonMenu>
    </div>
</template>

<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import btnList from '@/pages/detail/data/BtnList';
    import { Console } from 'console';
    import { PropType, computed, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const props = defineProps({
        isMe: {
            type: Boolean,
            default: false,
        },
        return: {
            type: Function as PropType<any>,
            default: () => null,
        },
    });
    const emit = defineEmits<{
        (e: 'clickChangeView', value: any): void;
        (e: 'showDetailedInfo', value: any): void;
        (e: 'showRelateDoc', value: any): void;
        (e: 'changeViewLocation', value: any): void;
    }>();

    const store = useStore();
    const route = useRoute();

    onMounted(() => {
        checkIfShowDemenagement();
    });

    async function checkIfShowDemenagement() {
        console.log(route.params.id, 'Params');

        await store.dispatch('MakeOfferModule/setOfferList', route.params.id);

        let data = computed(
            () => store.getters['MakeOfferModule/getOfferList']
        );

        console.log(data.value.data.offerAccepted, 'offerAccepted');
        if (
            data.value.data.offerAccepted &&
            data.value.data.offerAccepted.user.id ==
                store.getters['UserModule/getUserDetails'].id
        ) {
            btnList.forEach((btnMenu) => {
                if (btnMenu.label == 'Déménagement') {
                    btnMenu.showBtn = true;
                }
            });
        }

        // console.log(btnList.forEach((btn) => console.log(btn.showBtn)));
    }

    function clickChangeView(view: any): void {
        emit('clickChangeView', view);
    }
    function changeViewDetailedInfo(component: any): void {
        emit('showDetailedInfo', component);
    }
    function changeViewRelateDoc(component: any): void {
        emit('showRelateDoc', component);
    }
    function changeViewLocation(component: any): void {
        emit('changeViewLocation', component);
    }
</script>

<style scoped lang="scss">
    @import '@/style.scss';
    .btnDetail {
        @apply grid grid-cols-1 gap-[10px];
        @screen sm {
            @apply grid-cols-2;
        }
        @screen md {
            @apply grid-cols-3;
        }

        &__btn {
            //sm
            @apply flex items-center gap-[10px] w-full mb-0 transition-all;
            @include hoverButtonDark;
            // //md
            // @apply md:w-[250px] md:flex-wrap;
            // flex: 1;
            &:deep() {
                .button-menu__wrap-icon {
                    @apply mr-0;
                }
            }
            span {
                @apply text-left;
            }
        }
    }
    .hide {
        display: none;
    }

    //responsive
    // @media (min-width: 1200px) {
    //     .btnDetail {
    //         @apply flex flex-col xl;
    //     }
    // }
</style>
