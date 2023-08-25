<template>
    <div class="solicitation">
        <div class="solicitation__head">
            <span class="solicitation__headTxt">CATEGORIE</span>
            <span class="solicitation__headTxt">DETAIL</span>
            <span class="solicitation__headTxt">DATE</span>
        </div>
        <div class="solicitation__container">
            <div
                class="solicitation__content"
                v-for="(item, index) in allSolicitation"
                :key="index"
            >
                <span class="solicitation__fieldCategory">{{ item.type }}</span>
                <span
                    class="solicitation__fieldContent"
                    v-html="item.content"
                ></span>
                <span class="solicitation__fieldCategory">{{
                    item.created
                }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from 'vuex';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import moment from 'moment';

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const items: Array<any> = [
        {
            id: 1,
            type: 'Echange du bien',
            content:
                "<p>Bonjour,<br>Je souhaite faire une echange définitive de mon bien </p>\n        <p>\n            <b>Détail de mon bien :</b> <a href='detail/43'>IMM301122134907</a><br>\n </p>",
            created: '12/12/12',
        },
        {
            id: 2,
            type: 'Echange du bien2',
            content:
                "<p>Bonjour,<br>Je souhaite faire une echange définitive de mon bien </p>\n        <p>\n            <b>Détail de mon bien :</b> <a href='detail/43'>IMM301122134907</a><br>\n </p>",
            created: '12/12/12',
        },
        {
            id: 3,
            type: 'Echange du bien3',
            content:
                "<p>Bonjour,<br>Je souhaite faire une echange définitive de mon bien </p>\n        <p>\n            <b>Détail de mon bien :</b> <a href='detail/43'>IMM301122134907</a><br>\n </p>",
            created: '12/12/12',
        },
    ];
    let allSolicitation = ref<Array<any>>([]);

    onMounted(() => {
        getAllSolicitation();
    });

    const getAllSolicitation = async () => {
        try {
            let res = await store.dispatch('UserModule/setAllSolicitations');
            allSolicitation.value = res.map(
                ({ content, created, type }: any) => ({
                    content,
                    created: moment(created).format('L'),
                    type,
                })
            );
            console.log('res solicitaka:', allSolicitation.value);
        } catch (error) {}
    };
</script>

<style lang="scss" scoped>
    .solicitation {
        @apply flex flex-col;

        &__head {
            @apply flex justify-between mb-[8px];
        }

        &__headTxt {
            @apply font-[600] text-[var(--color-gray-icon)];
        }

        &__container{
            @apply flex flex-col gap-[8px];
        }

        &__content {
            border: 1px solid var(--color-gray);
            @apply flex justify-between rounded-[8px] text-center;
        }

        &__fieldCategory {
            // border-left: 2px solid red;
            @apply text-[#000] font-bold pt-[10px] px-[5px];
        }

        &__fieldContent {
            @apply font-[400];
        }
    }
</style>
