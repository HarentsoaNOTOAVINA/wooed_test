<template>
    <div class="auth">
        <div class="auth__form-container">
            <div
                v-if="usertype !== ''"
                @click="onBack"
                class="auth__form-container__back"
            >
                <ArrowBack />
            </div>
            <div class="auth__head">
                <div class="relative w-fit flex justify-center">
                    <figure class="auth__image">
                        <template v-if="urlImgData">
                            <img
                                class="image-guest"
                                :src="urlImgData"
                                alt="image-utilisateur"
                            />
                            <div
                                @click="handleDeletePhoto"
                                class="image-guest--overlay"
                            >
                                <Trash />
                            </div>
                        </template>
                        <img
                            v-else
                            src="@/static/images/empty-img.png"
                            alt="image-vide"
                        />
                        <label
                            @input="handleAddPhoto"
                            for="take-photo"
                            class="img-photo"
                        >
                            <Photo />
                            <input
                                id="take-photo"
                                type="file"
                                style="display: none"
                                name=""
                                :value="inputFile"
                                accept="image/*"
                            />
                        </label>
                    </figure>
                </div>
                <Title type="h3" label="Créer un compte" :weight="700" />
            </div>
            <template v-if="usertype === ''">
                <transition appear name="fade-step" mode="in-out">
                    <UserType @on-click-choices="handleChoices" />
                </transition>
            </template>
            <template v-else>
                <transition appear name="fade-step" mode="in-out">
                    <RegistrationForm
                        :logo="urlImgData"
                        :usertype="usertype"
                        :prev-user-form="prevUserForm"
                    />
                </transition>
            </template>
            <div class="auth__link-bottom mt-[10px]">
                <span>Ou</span><br />
                <router-link to="/connexion">
                    <Paragraphe is="span"
                        ><span class="auth__link-bottom__redirect"
                            >Connexion</span
                        ></Paragraphe
                    >
                </router-link>
            </div>
        </div>
        <figure class="auth__bg">
            <img src="@/static/images/bg-auth.png" alt="illustration-maison" />
        </figure>
    </div>
</template>
<script lang="ts" setup>
    import '@/assets/style/auth.scss';
    import { ref, watch, onMounted } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import UserType from './RegistrationSection/UserType/UserType.vue';
    import RegistrationForm from './RegistrationSection/RegistrationFrom/RegistrationForm.vue';
    import ArrowBack from '../../components/Icon/ArrowBack.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Photo from '@/components/Icon/Photo.vue';
    import Trash from '@/components/Icon/Trash.vue';
    import { useStore } from 'vuex';

    const store = useStore();

    const urlImgData = ref<string>('');
    const inputFile = ref<any>('');
    const addPaddingTop = ref<string>('0px');
    const usertype = ref<'particular' | 'professional' | ''>('');
    const prevUserForm = ref<any>(null);
    const isFromSubscription = ref<boolean>(false);

    onMounted(() => {
        getPrevUserForm();
    });

    function getPrevUserForm() {
        isFromSubscription.value = store.getters['UserModule/getIsFromSubscription'];
        if (isFromSubscription.value) {
            prevUserForm.value = store.getters['UserModule/getRegisteredUser'];
        }
    }

    watch(
        () => prevUserForm.value,
        (v) => {
            if (isFromSubscription && Object.values(v).length) {
                usertype.value = v.type;
            }
        }
    );

    watch(usertype, (v) => {
        if (v !== '') {
            addPaddingTop.value = '100px';
        } else {
            addPaddingTop.value = '0px';
        }
    });
    function handleChoices(userType: 'particular' | 'professional' | ''): void {
        usertype.value = userType;
    }

    function onBack() {
        usertype.value = '';
    }

    function handleAddPhoto(e: any) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if ((e.target as any).result) {
                urlImgData.value = (e.target as any).result;
            }
        };
        console.log(e.target.files);
        reader.readAsDataURL(file);
    }
    function handleDeletePhoto() {
        urlImgData.value = '';
        inputFile.value = '';
        // inputFile.value.target.value = '';
    }
</script>
<style lang="scss" scoped>
    .auth {
        &__image {
            img {
                width: 60px;
            }
            .image-guest {
                width: 100%;
                height: 100%;
                object-fit: cover;
                &--overlay {
                    transition: all 0.3s ease;
                    opacity: 0;
                    background-color: #0000008f;
                    border-radius: 50%;
                    @apply flex justify-center items-center w-full h-full absolute;
                }
            }
            &:not(#take-photo):hover {
                .image-guest--overlay {
                    opacity: 1;
                    cursor: pointer;
                }
            }
        }
        &__form-container {
            padding-top: v-bind('addPaddingTop');
            padding-bottom: 20px;
            &__back {
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .fade-step-enter-active,
        .fade-step-leave-active {
            transition: all 0.3s ease-in-out;
        }

        .fade-step-enter-from,
        .fade-step-leave-to {
            opacity: 0;
            transform: translateX(50px);
        }
    }
</style>
