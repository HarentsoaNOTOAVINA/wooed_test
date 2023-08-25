<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import CircleBell from '@/components/Icon/CircleBell.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { menu } from './dataMenuRedraw';
    import Redraw from '@/components/Icon/Redraw.vue';
    import ListBullet from '@/components/Icon/ListBullet.vue';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const emit = defineEmits<{
        (e: 'showList'): void;
    }>();

    const route = useRoute();
    const showMenu = ref(false);

    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        showMenu.value = true;
    } else {
        showMenu.value = false;
    }

    function gotoNeighborhood(path: string) {
        // (window as any).flutter_inappwebview.callHandler(
        //     'navigateTo',
        //     path,
        //     route.params.id,
        //     'urbanisme'
        // );
        !!(window as any).navigateTo &&
          (window as any).navigateTo.postMessage(JSON.stringify({"path": path, "route": route.params.id, "type": "urbanisme"}));
    }

    function handleShowList() {
        emit('showList');
        console.log('On va afficher le list');
    }
</script>

<template>
    <div class="container urbanisme__container">
        <div class="urbanisme__title">
            <Paragraphe class="title-redraw">
                Redessiner votre quartier
            </Paragraphe>
            <hr class="separator-redraw" />
        </div>
        <div class="urbanisme__information" v-if="!showMenu">
            <Paragraphe class="info-urba"
                ><CircleBell class="bell" color-fill="var(--color-green)" />Un
                bouton “Redessiner” apparait uniquement si vous utiliser un
                appareil mobile</Paragraphe
            >
        </div>

        <div class="urbanisme__menu">
            <ul class="urbanisme__menu-unorderList">
                <li
                    class="urbanisme__menu-list"
                    v-if="showMenu"
                    @click="gotoNeighborhood('/neighborhood')"
                >
                    <Redraw class="urbanisme__menu-icon" />
                    <span>Redessiner votre quartier</span>
                </li>
                <li class="urbanisme__menu-list" @click="handleShowList">
                    <ListBullet class="urbanisme__menu-icon" />
                    <span>Liste</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .urbanisme {
        &__container {
            margin-top: 20px;
            background: #fff;
            padding: 10px;
            border-radius: 8px;
        }
        &__information {
            @apply mt-[15px] p-[15px] rounded-[8px] text-[var(--color-green)];
            background: rgba(103, 205, 132, 0.14);
        }

        &__menu {
            @apply mt-[15px];
        }
        &__menu-list {
            @apply flex gap-[15px] mt-[15px] rounded-[4px] p-[20px];
            border: 1px solid var(--color-gray);
            @screen md {
                &:hover {
                    @apply bg-gray cursor-pointer;
                }
            }
        }
    }

    .title-redraw {
        @apply mb-[20px] font-semibold;
    }

    .separator-redraw {
        border: 1px solid var(--color-gray);
    }
    .bell {
        @apply w-[45px];
    }
    .info-urba {
        @apply flex gap-[10px];
    }
</style>
