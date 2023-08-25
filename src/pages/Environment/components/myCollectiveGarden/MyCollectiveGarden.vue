<template>
    <MainContainer class="joinGarden__container">
        <SideMenu class="joinGarden__sidemenu" @active-comp="setActiveDisplay" />
        <KeepAlive>
            <component :is="activeComponent" class="joinGarden__section" />
        </KeepAlive>
    </MainContainer>
</template>
<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, shallowRef } from 'vue';
import { useStore } from 'vuex';
import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
import Pitch from '@/pages/Environment/components/Pitch.vue';
import SideMenu from '@/pages/Environment/components/myCollectiveGarden/SideMenu/SideMenu.vue';

const store = useStore();

const activeComponent = shallowRef(computed(() => store.getters["CollectiveGardenModule/getActiveDisplay"]));

onMounted(() => setActiveDisplay({ component: Pitch }));
onBeforeUnmount(() => store.commit("CollectiveGardenModule/cleanUpGardenList"));

function setActiveDisplay(item: any) {
    store.commit("CollectiveGardenModule/updateActiveDisplay", item.component);
}
</script>
<style scoped lang="scss">
.joinGarden {
    &__container {
        @apply flex flex-col my-[18px] px-[15px] gap-y-[14px];

        @screen md {
            @apply flex-row gap-x-[18px] mb-0;
        }

        @screen lg {
            @apply gap-x-[20px] container;
        }

        @screen xl {
            @apply gap-x-[24px];
        }
    }

    &__sidemenu {
        @screen md {
            @apply mb-[14px];
            min-height: calc(100vh - 94px);
        }
    }

    &__section {
        @apply px-0 mt-0 w-full max-w-none;

        @screen md {
            max-width: calc(100% - 339px);
        }
    }
}
</style>
