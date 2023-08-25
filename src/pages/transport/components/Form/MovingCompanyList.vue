<template>
    <div class="contact-list__container">
        <ContactList :options="companyList" :name-input="'moving-company'" @select-option="handleChange" />
    </div>
</template>
<script lang="ts" setup>
import ContactList from "@/pages/transport/components/ContactCard.vue";
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const emit = defineEmits(["store-announcement-data"]);

const companyList = computed(() => store.getters["TransportModule/getMovingCompanyList"])

onMounted(async () => {
    const data = store.getters['TransportModule/getAnnouncementData'];
    const payload = { lat: data.departureLatitude, lng: data.departureLongitude };
    await store.dispatch('TransportModule/fetchMovingCompanies', payload);
})

function handleChange(value: any) {
    setMovingCompanyContact(value);
    emit('store-announcement-data', value);
}

function setMovingCompanyContact(value: any) {
    const found = companyList.value.find((element: any) => element.id === value['moving-company']);
    store.commit("TransportModule/SET_MOVING_COMPANY_CONTACT", found);
}
</script>
<style lang="scss" scoped>
.contact-list {
    &__container {
        width: -webkit-fill-available; 
        display: block;
    }
}
</style>