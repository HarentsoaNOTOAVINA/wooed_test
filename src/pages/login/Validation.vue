<template>
    <Loader v-if="loadingValidation" />
    <div v-else class="confirm-subscription">
        <div class="confirm-subscription__content">
            <div class="flex items-center justify-center flex-col gap-[20px]">
                <img
                    v-if="errorMsg"
                    src="@/static/images/error-primary.png"
                    alt="erreur"
                />
                <Check v-else size="lg" />
                <Title
                    :label="
                        errorMsg
                            ? 'Une erreur est survenue'
                            : 'Félicitations! Vous êtes inscrit.'
                    "
                    type="h1"
                    weight="700"
                />
                <Paragraphe class="info">
                    {{
                        errorMsg
                            ? "Veuillez contacter l'administrateur"
                            : 'Une facture vous a été envoyée par email. Vous pouvez vous connecter maintenant'
                    }}
                </Paragraphe>
                <Button @click="onRedirect" type-button="secondary">{{
                    errorMsg ? 'Accueil' : 'Se connecter'
                }}</Button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Check from '../../components/Icon/Check.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import UserService from '@/services/userService';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const route = useRoute();
    const router = useRouter();

    const token = ref<any>();
    const errorMsg = ref<string>();
    const loadingValidation = ref<boolean>(false);

    onMounted(() => {
        onVaidate();
    });

    async function onVaidate() {
        token.value = route.params.token;
        loadingValidation.value = true;
        try {
            const res = await UserService.validate({
                id: token.value,
            });
            if (res.code === 404) {
                errorMsg.value = "Une erreur s'est produite!";
            }
        } catch (error) {
            console.log(error);
        } finally {
            loadingValidation.value = false;
        }
    }
    function onRedirect() {
        router.push({ name: errorMsg.value ? 'home' : 'authLogin' });
        // router.push('/connexion');
    }
</script>
<style lang="scss" scoped>
    .confirm-subscription {
        img {
            width: 100%;
            height: auto;
        }
        width: 100%;
        height: 93vh;
        padding: 20px;
        @screen sm {
            padding: 50px;
        }
        @apply container flex justify-center items-center;
        &__content {
            // width: 100%;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            &:deep() {
                h1 {
                    color: var(--color-primary);
                    text-align: center;
                }
            }
            .info {
                font-size: 16px;
                color: var(--color-secondary);
                font-weight: 100;
            }
            img {
                width: 150px;
            }
        }
    }
</style>