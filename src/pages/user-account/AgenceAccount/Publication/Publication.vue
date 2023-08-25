<script setup lang="ts">
    import { computed, onMounted, reactive, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    const store: Store<any> = useStore();
    const loadPub = ref(true);
    let publicationData = ref([]);

    async function getPublication() {
        const selectededAgence =
            store.getters['AgenceModule/getSelectedAgence'];
        await store.dispatch('AgenceModule/setAgencyPublication', {
            societyId: selectededAgence.id,
        });
        const data = computed(
            () => store.getters['AgenceModule/getAgencyPublication']
        );
        publicationData.value = data.value;
        loadPub.value = false;
    }

    onMounted(() => {
        getPublication();
    });
</script>
<template>
    <Loader v-if="loadPub" />
    <div v-if="!loadPub" class="publication-agence">
        <Paragraphe fontSize="12px">
            <span>{{ publicationData.length }}</span>
            Publication(s)
        </Paragraphe>
        <div class="publication-agence__content">
            <ListProducts :isBordered="true" :DataCard="publicationData" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .publication-agence {
        p {
            @apply mb-[20px];
            span {
                font-weight: bold;
            }
        }

        &__content {
            @apply grid sm:grid-cols-2 gap-[13px];
        }
    }
</style>
