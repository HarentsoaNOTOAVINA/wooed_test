<template>
    <div class="container urbanisme">
        <Loader  v-if="loading" />
        <UrbaMenu
            v-if="isShowMenu || screenType >= 1024"
            @switchComponent="changeComponent"
        />
        <div v-if="!isShowMenu" class="urbanisme__contentContainer">
            <div
                v-if="screenType <= 1024"
                class="urbanisme__contentHead"
                @click="showMenu"
            >
                <Title
                    :label="titleMobile"
                    type="h3"
                    class="urbanisme__contentHeadTxt"
                />
            </div>
            <div class="urbanisme__content">
                <component :is="activeComponent" @showList="showList" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import UrbaMenu from './UrbaMenu/index.vue';
    import PublicInquiry from './PublicInquiry/index.vue';
    import NewProject from './NewProject/index.vue';
    import MenuRedraw from './RedrawNeighborhood/MenuRedraw.vue';
    import ListDrawed from './RedrawNeighborhood/ListDrawed.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import UrbanStatus from './UrbanStatus/index.vue';
    import { computed, onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const router = useRouter();
    const routes = useRoute();
    const store: Store<any> = useStore();
        const loading = ref<boolean>(false)

    let activeComponent = ref<object>(PublicInquiry);
    let isShowMenu = ref<boolean>(true);
    let propertyDetail = ref<Array<any>>([]);
    const titleMobile = ref<string>('Urbanisme');

    onMounted(() => {
        getPropertyDetail();
        // checkStore();
        console.log('screen type :', screenType.value);
        console.log('screen type :', screenType.value);
    });

    const screenType = ref<number>(screen.width);

    const checkStore = () => {
        if (propertyDetail.value.length == 0) {
            // router.back();
            router.go(-1);
            console.log('first');
        }
    };

     const getPropertyDetail = async () => {
        const data : any = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        // propertyDetail.value = data.value;
        
        if(data.length <= 0){
            propertyDetail.value = data.value;
        }else{
            loading.value = true;
            propertyDetail.value = await store.dispatch('UrbanismeModule/getDetailsProperty', routes.params.id)
            console.log('property detail:', propertyDetail.value);
            loading.value = false;
        }
        
        // propertyDetail.value = data.value;
    };

    const showMenu = () => {
        isShowMenu.value = true;
        activeComponent.value = {};
    };

    const changeComponent = (item: string) => {
        console.log(item, 'item');

        switch (item) {
            case 'status':
                activeComponent.value = UrbanStatus;
                isShowMenu.value = false;
                break;
            case 'inquiry':
                activeComponent.value = PublicInquiry;
                isShowMenu.value = false;
                break;
            case 'redraw':
                activeComponent.value = MenuRedraw;
                isShowMenu.value = false;

                break;
            case 'newProject':
                activeComponent.value = NewProject;
                isShowMenu.value = false;
                break;
            default:
                break;
        }
    };

    function showList() {
        activeComponent.value = ListDrawed;
        console.log("set");
        
    }
</script>

<style lang="scss" scoped>
    .urbanisme {
        @apply p-[10px] h-[calc(100vh-100px)];
        @screen lg {
            @apply flex gap-[20px];
        }

        &__contentContainer {
            @screen lg {
                @apply w-full;
            }
        }

        &__contentHead {
            background-color: #fff;
            @apply rounded-lg p-[12px];
            // @screen lg {
            //     @apply flex;
            // }
        }
        &__contentHeadTxt {
            @apply font-semibold cursor-pointer;
            @screen lg {
                @apply font-semibold;
            }
        }
        &__content {
            background-color: #fff;
            // height: calc(100vh - 100px);
            @apply rounded-lg p-[12px] my-[10px];
            @screen lg {
                @apply my-0 min-h-[363px];
            }
        }
    }
</style>
