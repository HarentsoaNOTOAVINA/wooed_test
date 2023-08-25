<template>
    <div class="search">
        <span class="search__title">Suivre une annonce</span>
        <hr class="__hr" />
        <Input 
            :icon-field="true"
            nameInput="reference"
            icon-name-field="Search" 
            placeholder="Renseignez votre reference de suivi"
            class="message__searchField" 
            @input="handleSearch"
        />
        <ColisCardItem v-if="result" :colis-data="result" @click="handleClick" class="cursor-pointer" />
        <Modal :is-show-modal="announcementData !== undefined" @on-back="hideModal"
            :width="screenType >= 1024 ? '800' : '520'" :title="announcementData ? announcementData.title : ''">
            <template #content>
                <AnnounceOverview :data="announcementData" />
            </template>
        </Modal>
    </div>
</template>
<script lang="ts" setup>
import Input from '@/components/Common/Input/Input.vue';
import ColisCardItem from '@/pages/transport/components/ColisCardItem.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import AnnounceOverview from '@/pages/transport/components/AnnounceOverview.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';

const screenType = ref<number>(screen.width);

const store = useStore();
const announcements = computed(() => store.getters["TransportModule/getAnnouncementList"]);
const result = ref<any>();
const announcementData = ref<any>();

watch(() => result.value,
    (value) => {
        result.value = value;
    }, { immediate: true, deep: true }
)

onMounted(async () =>  await store.dispatch("TransportModule/fetchAnnouncements"))

function handleSearch(value: any) {
    const payload = value.reference;
    // TODO: add regex for searching controller to 
    result.value = announcements.value.find((element: any) => element.reference === payload);  
}

function handleClick(value: any) {
    announcementData.value = value.announcementInfo;
    console.error("object");
}

function hideModal() {
    announcementData.value = undefined;
}
</script>
<style lang="scss" scoped>
.search {
    &__title {
        @apply text-primary font-[600] my-[18px];
    }
}

.__hr {
    @apply block my-[10px] text-gray;
}
</style>