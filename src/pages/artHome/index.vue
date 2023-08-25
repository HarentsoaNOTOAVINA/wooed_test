<template>
    <MainContainer class="list__property place-content-18px">
        <Card class="container">
            <Paragraphe class="list__property-title"
                >Veuillez choisir le bien à
                <span class="title-action">{{ titleAction }}</span></Paragraphe
            >
        </Card>
        <ListMyProperty
            routeName="art-home"
            :isArtHome="true"
            :action="actionType"
        />
    </MainContainer>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import ListMyProperty from '@/components/Display/ListMyProperty/index.vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    const store = useStore();
    const route = useRoute();

    let titleAction = ref<string>('Acquérir un meuble');
    let actionType = ref<string>('');

    onMounted(() => {
        getActionArtHomeFromStore();
    });

    async function getActionArtHomeFromStore() {
        let action = await store.getters['ArtHomeModule/getActionType'];
        actionType.value = action;

        switch (action) {
            case 'relooking':
                titleAction.value = 'Relooker mon bien';
                break;
            // case 'edit':
            //     titleAction.value = 'Acquérir un meuble';
            //     break;
            // case 'visit':
            //     titleAction.value = 'Proposer mes services';
            //     break;

            default:
                break;
        }
    }
</script>

<style scoped lang="scss">
    .list {
        &__property {
            &-title {
            }
        }
    }
</style>
