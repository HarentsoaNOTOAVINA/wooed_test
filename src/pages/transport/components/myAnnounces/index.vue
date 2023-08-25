<template>
    <AnnounceList>
        <template v-for="(item, index) in announcements" :key="index">
            <ColisCardItem v-if="item.user === currentUser.id" :grid-display-mode="!list" :colisData="item"
                class="cursor-pointer" @click="handleClick" />
        </template>
    </AnnounceList>
</template>
<script lang="ts" setup>
import AnnounceList from '@/pages/transport/components/AnnounceList.vue';
import ColisCardItem from '@/pages/transport/components/ColisCardItem.vue';
import { computed, ref, PropType } from 'vue';

import { useStore } from 'vuex';

interface IColisData {
    user: string,
}

const store = useStore();

const list = ref<boolean>(true);
const currentUser = computed(() => store.getters["UserModule/getUserDetails"]);

const emit = defineEmits(['set-announcement-details'])

const props = defineProps({
    announcements :{
        type: Array as PropType<IColisData[]>,
        default: []
    },
})

function handleClick($event: any) {
    emit('set-announcement-details', $event.announcementInfo);
}
</script>