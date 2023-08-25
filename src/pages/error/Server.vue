<template>
    <div class="error-server">
        <div class="error-server__container">
            <div class="error-server__content">
                <img
                    src="@/static/images/error/on-error-img.png"
                    alt="erreur-serveur"
                />
                <div class="error-server__content__info">
                    <Title type="h2" class="title-error" :label="errorMsg" />
                    <Button @click="recallURL">Veuillez réessayez</Button>
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
    const errorStatus = ref<string | number>('');
    const errorMsg = ref<string>(
        "Oops 😥 Il semble qu'une erreur est survenue"
    );

    onMounted(() => {
        errorRedirection.value =
            store.getters['ErrorModule/getErrorRedirection'];
        errorStatus.value = store.getters['ErrorModule/getErrorStatus'];

        if (errorStatus.value === 'ECONNABORTED') {
            errorMsg.value = "⏰ Le delai d'attente a été dépassé";
        }
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
    .title-error {
        text-align: center;
    }
</style>
