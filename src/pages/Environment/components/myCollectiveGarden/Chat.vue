<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="chat">
            <div class="chat__container">
                <Title type="h3" label="Chat" class="chat__title" />
                <hr class="__hr" />
                <div class="chat__items"></div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
import { computed, onBeforeMount } from 'vue';

    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const garden = computed(() => store.getters["CollectiveGardenModule/getSelectedGarden"]);
    const breadcrumbListsData = [
        {
            label: 'Jardin collectif',
            url: `/environnement/${route.params.id}/jardin-collectif`
        },
        {
            label: 'Mes jardin collectifs',
        },
    ];
    onBeforeMount(()=>{
        router.push(`/messages/${garden.value.conversation.id}`) // redirection vers la partie chat 
        //forme : chat/idConversation
    })

</script>

<style lang="scss" scoped>
    .chat {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
