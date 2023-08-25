<template>
    <div class="btnLocalisation">
        <div class="btnLocalisation__btnContainer">
            <ButtonMenu
                class="btnLocalisation__btn"
                v-for="(item, index) in btnLocalisation"
                :key="index"
                :isIcon="item.icon"
                @on-click="changeBtnList(item)"
                >{{ item.label }}
            </ButtonMenu>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import btnLocalisation from '@/pages/detail/data/BtnListLocalisation';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import { useStore } from 'vuex';
    import { computed, onMounted, reactive, PropType } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const text = reactive({
        appType: {
            googleStreetView: 'GSV',
            googleEarth: 'GE',
        },
    });

    const props = defineProps({
        return: {
            type: Function as PropType<any>,
            default: () => null,
        },
    });

    const coordinates: any = computed(
        () => store.getters['PropertyDetailModule/getPropertyCoords']
    );
    const emit = defineEmits<{
        (e: 'gotoMap', value: any): void;
        (e: 'return'): void;
    }>();
    function changeBtnList(item: any): void {
        switch (item.case) {
            case 'parcelleCadastrale':
                console.log('DBG go to map btn <=========');
                router.push(`${item.url}${route.params.id}`);
                emit('gotoMap', item);
                break;
            case 'googleStreetView':
                router.push(`/detail/${route.params.id}/street-view`);

                break;
            case 'googleEarth':
                if (window.innerWidth < 1024) {
                    !!(window as any).openApp &&
                        (window as any).openApp.postMessage(
                            JSON.stringify({
                                lat: coordinates.value[0].lat,
                                lng: coordinates.value[0].lng,
                            })
                        );
                    // !!(window as any ).flutter_inappwebview && (window as any).flutter_inappwebview
                    //     .callHandler('openApp',
                    //         JSON.stringify(text.appType.googleEarth),
                    //         JSON.stringify({
                    //             "lat" : coordinates.value[0].lat,
                    //             "lng" : coordinates.value[0].lng
                    //         })
                    //     );
                } else {
                    window.open(
                        `${item.url}'${coordinates.value[0].lat},${coordinates.value[0].lng}`,
                        '_blank'
                    );
                }
                break;
            default:
                break;
        }
    }
    onMounted(() => {
        console.log('coordinates', coordinates.value);
    });
    function back(): void {
        emit('return');
    }
</script>

<style lang="scss" scoped>
    .btnLocalisation {
        @apply flex flex-wrap flex-col gap-[10px];

        &__btnContainer {
            @apply flex gap-0 flex-col;
            //responsive
            @apply lg:flex lg:flex-row lg:gap-[10px] lg:flex-wrap;
        }
        &__btn {
            @apply lg:w-[280px] w-full;
        }
    }
</style>
