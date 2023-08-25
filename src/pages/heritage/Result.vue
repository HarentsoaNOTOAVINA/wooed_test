<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { Alert as AAlert } from 'ant-design-vue';
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import { computed } from '@vue/reactivity';

    const router = useRouter();
    const store: Store<any> = useStore();
    const route = useRoute();

    let showResult = ref<boolean>(false);

    onMounted(() => {
        checkDataBrugis();
    });

    async function checkDataBrugis() {
        console.log(route.params.id, 'route.params.id');

        try {
            await store.dispatch(
                'HeritageModule/setBrugisResult',
                route.params.id
            );

            const data = computed(
                () => store.getters['HeritageModule/getBrugisResult']
            );

            data.value.soignes_zone === true ||
            data.value.european_zone === true
                ? (showResult.value = true)
                : (showResult.value = false);

            console.log(showResult.value, 'data data data');
        } catch (error) {}
    }

    function gotoFinancial() {
        console.log('Go to financial');
    }

    function gotoPatrimoine() {
        router.push({ name: 'heritage' });
    }
</script>

<template>
    <div class="container heritage">
        <div class="heritage__result" v-if="showResult">
            <div class="heritage__result-title">
                <Paragraphe>D'après la localisation de votre bien </Paragraphe>
                <hr class="separator" />
            </div>
            <div class="heritage__yesResult">
                <a-alert
                    description="Vous avez droit à une réduction du précompte immobilier."
                    type="info"
                    show-icon
                />
                <Button class="heritage__btn" @on-click="gotoFinancial"
                    >Aller à la Finance</Button
                >
            </div>
        </div>
        <div class="heritage__noResult" v-else>
            <a-alert
                message="Desoler"
                description="Votre bien ne se trouve pas dans une zone proteger."
                type="warning"
                show-icon
            />
            <Button class="heritage__btn" @on-click="gotoPatrimoine"
                >Retour</Button
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
    .heritage {
        @apply mt-2 bg-[#fff] rounded-[8px] p-[20px];
        &__result-title {
            @apply font-semibold;
        }

        &__btn {
            @apply my-[10px];
        }
    }
    .separator {
        @apply text-[var(--color-gray)] my-[5px];
    }
</style>
