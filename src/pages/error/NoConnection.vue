<template>
    <div class="error-server">
        <div class="error-server__container">
            <div class="error-server__content">
                <img
                    src="@/static/images/error/no-connection-error.png"
                    alt="erreur-serveur"
                />
                <div class="error-server__content__info">
                    <Title type="h2" label="Pas de connexion" />
                    <Button @click="recallURL">Rafraichir</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { useStore } from 'vuex';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();

    const errorRedirection = ref<string>('');
    onMounted(() => {
        errorRedirection.value = store.getters['ErrorModule/getUrlOnline'];
    });

    function recallURL() {
        router.push(errorRedirection.value);
    }
</script>
<style lang="scss" scoped>
    .error-server {
        width: auto;
        height: calc(100vh - 62px);
        @apply p-[10px];
        &__container {
            border-radius: 8px;
            background-color: #fff;
            height: 100%;
            @apply flex justify-center items-center;
        }
        &__content {
            @apply flex items-center justify-center flex-col gap-[32px];
            &__info {
                @apply flex items-center justify-center flex-col gap-[16px];
            }
            &:deep() {
                h2 {
                    color: var(--color-primary);
                }
            }
            img {
                width: 180px;
                @screen sm {
                    width: 300px;
                }
            }
        }
    }
</style>
