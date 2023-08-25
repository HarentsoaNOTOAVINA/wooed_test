<template>
    <div class="auth">
        <!-- CONNECTION -->
        <div class="auth__form-container" v-if="loginDisplay === 'login'">
            <div class="auth__head">
                <figure class="auth__image">
                    <!-- <img src="" alt="" /> -->
                    <User size="lg" />
                </figure>
                <Title type="h3" label="Connexion" :weight="700" />
            </div>
            <form
                @submit.prevent="
                    () => {
                        handleSubmit('');
                    }
                "
                class="auth__form"
            >
                <!-- FIELDS -->
                <Input
                    label="Email ou nom d’utilisateur"
                    placeholder="Email ou nom d’utilisateur"
                    :vmodel="formParams.username"
                    name-input="username"
                    @input="handleInput"
                    :value="formParams.username"
                    :has-error="{
                        status: errors.username !== '' && activeError,
                        errorMsg: errors.username,
                    }"
                />
                <Input
                    inputType="password"
                    label="Mot de passe"
                    name-input="password"
                    placeholder="Mot de passe"
                    :vmodel="formParams.password"
                    @input="handleInput"
                    :value="formParams.password"
                    :has-error="{
                        status: errors.password !== '' && activeError,
                        errorMsg: errors.password,
                    }"
                />
                <!-- FIELDS END -->

                <!-- MOT DE PASS OUBLIER -->
                <div class="flex justify-end">
                    <Paragraphe
                        is="span"
                        class="auth__forgotpwd"
                        @click="gotoForgotPsw"
                        >Mot de passe oublié ?</Paragraphe
                    >
                </div>

                <!-- ERREUR SERVER -->
                <small
                    class="auth__form-container--error-server"
                    v-if="serverErrorMsg !== ''"
                    >{{ serverErrorMsg }}</small
                >

                <!-- BOUTTON SOUMETTRE -->
                <Button
                    :disabled="loadingLogin"
                    type="secondary"
                    html-type="submit"
                    width="100%"
                >
                    <LoadingButton size="sm" v-if="loadingLogin" />
                    <span v-else>Connexion</span>
                </Button>

                <!-- CONNEXION -->
                <div class="auth__link-bottom">
                    <span>Ou</span><br />
                    <router-link to="/inscription">
                        <Paragraphe is="span"
                            ><span class="auth__link-bottom__redirect"
                                >Créer un compte</span
                            ></Paragraphe
                        >
                    </router-link>
                </div>
            </form>
        </div>
        <!--  -->

        <!-- FORGOT PASSWORD -->
        <div class="auth__form-container" v-if="loginDisplay === 'confirm'">
            <div class="auth__head">
                <figure class="auth__image">
                    <User size="lg" />
                </figure>
                <Title
                    type="h3"
                    label="Confirmer l'adresse email"
                    :weight="700"
                />
            </div>
            <form
                @submit.prevent="
                    () => {
                        handleSubmit('email');
                    }
                "
                class="auth__form"
                v-if="!confirmNow"
            >
                <!-- FIELDS -->
                <Input
                    label="Email ou nom d’utilisateur"
                    placeholder="Email ou nom d’utilisateur"
                    :model="formParams.username"
                    name-input="username"
                    @input="handleInput"
                    :value="formParams.username"
                    :has-error="{
                        status: errors.username !== '' && activeError,
                        errorMsg: errors.username,
                    }"
                />
                <!-- FIELDS END -->

                <!-- BOUTTON SOUMETTRE -->
                <Button
                    :disabled="loadingLogin"
                    type="secondary"
                    html-type="submit"
                    width="100%"
                >
                    <LoadingButton size="sm" v-if="loadingLogin" />
                    <span v-else>Confirmer mon adresse email</span>
                </Button>
                <!-- CONNEXION -->
                <div class="auth__link-bottom">
                    <span>Ou</span><br />
                    <Paragraphe
                        is="span"
                        class="auth__link-bottom__redirect"
                        @click="gotoLoginPage"
                        >Revenir à la connexion</Paragraphe
                    >
                </div>
            </form>
            <div v-if="confirmNow" class="auth__form-container text-center">
                <Paragraphe is="span" class="auth__confirm"
                    >Veuillez consulter votre mail pour proceder à la
                    suite</Paragraphe
                >
            </div>
        </div>
        <!--  -->

        <!-- EDIT PASSWORD -->
        <div class="auth__form-container" v-if="loginDisplay === 'edit'">
            <div class="auth__head">
                <figure class="auth__image">
                    <User size="lg" />
                </figure>
                <Title
                    type="h3"
                    label="Changer le mot de passe"
                    :weight="700"
                />
            </div>
            <form
                @submit.prevent="
                    () => {
                        handleSubmit('password');
                    }
                "
                class="auth__form"
            >
                <!-- FIELDS -->
                <Input
                    inputType="password"
                    label="Entrer un nouveau mot de passe"
                    name-input="password"
                    placeholder="Mot de passe"
                    :vmodel="formParams.password"
                    @input="handleInput"
                    :has-error="{
                        status: errors.password !== '' && activeError,
                        errorMsg: errors.password,
                    }"
                />
                <Input
                    inputType="password"
                    label="Confirmer le mot de passe"
                    name-input="confirmPassword"
                    placeholder="Mot de passe"
                    :vmodel="formParams.confirmPassword"
                    @input="handleInput"
                    :has-error="{
                        status: errors.confirmPassword !== '' && activeError,
                        errorMsg: errors.confirmPassword,
                    }"
                />
                <!-- FIELDS END -->

                <!-- BOUTTON SOUMETTRE -->
                <Button
                    :disabled="loadingLogin"
                    type="secondary"
                    html-type="submit"
                    width="100%"
                >
                    <LoadingButton size="sm" v-if="loadingLogin" />
                    <span v-else>Valider</span>
                </Button>

                <!-- CONNEXION -->
                <div class="auth__link-bottom">
                    <span>Ou</span><br />
                    <Paragraphe
                        is="span"
                        class="auth__link-bottom__redirect"
                        @click="gotoLoginPage"
                        >Revenir à la connexion</Paragraphe
                    >
                </div>
            </form>
        </div>
        <!--  -->

        <figure class="auth__bg">
            <img src="@/static/images/bg-auth.png" alt="illustration-maison" />
        </figure>
    </div>
</template>
<script setup lang="ts">
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    import UserService from '@/services/userService';
    import store from '@/store';
    import emailValidation from '@/utils/validation/email_validation';
    import { reactive, ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import '@/assets/style/auth.scss';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import User from '@/components/Icon/User.vue';

    // route
    const route = useRoute();
    const router = useRouter();

    // interface
    interface IFormParams {
        username: string;
        password: string;
        confirmPassword: string;
    }

    // ref
    const activeError = ref<boolean>(false);

    let formParams = reactive<IFormParams>({
        username: '',
        password: '',
        confirmPassword: '',
    });
    let errors = reactive<IFormParams>({
        username: 'Ce champ est obligatoire',
        password: 'Ce champ est obligatoire',
        confirmPassword: 'Ce champ est obligatoire',
    });

    const tmpErrors: IFormParams = {
        ...errors,
    };

    const loadingLogin = ref<boolean>(false);

    const loginDisplay = ref<string>('');

    const confirmNow = ref<boolean>(false);

    const serverErrorMsg = ref<string>('');

    // watch

    watch(
        [
            () => formParams.username,
            () => formParams.password,
            () => formParams.confirmPassword,
        ],
        (newValues) => {
            const [username, password, confirmPassword] = newValues;
            formParams.username = username;
            formParams.password = password;
            formParams.confirmPassword = confirmPassword;
        },
        { immediate: true }
    );

    // fn

    const handleInput = (e: IFormParams | Object) => {
        serverErrorMsg.value = '';
        checkParamsError(e);
        console.log(errors);
    };

    interface ICookie {
        cname: string;
        cvalue: string;
    }

    const handleUserLogin = async (): Promise<void> => {
        interface TypesUtils {
            token?: string;
            user?: any;
            status?: number;
            data?: any;
        }
        loadingLogin.value = true;
        try {
            const data: TypesUtils | { data: TypesUtils } =
                await UserService.login(formParams);

            let user = null;
            let token = null;
            if (!!(data as { data: TypesUtils }).data) {
                token = (data as { data: TypesUtils }).data.token;
                user = (data as { data: TypesUtils }).data.user;
            } else {
                token = (data as TypesUtils).token;
                user = (data as TypesUtils).user;
            }

            if (
                (data as TypesUtils).status === 200 &&
                data.data.status === 401
            ) {
                handleServerErrors(data);
                console.log('error');
            } else {
                user &&
                    store.dispatch('UserModule/setUserDetails', {
                        detail: user,
                        token,
                    });
                /**
                 * set token in cookie for webgl part
                 */
                const cookie = {
                    cname: 'session',
                    cvalue: token,
                };

                const params = {
                    tokenUser: token,
                    userDetails: user,
                };

                setCookie(cookie as any);
                navigateTo(JSON.stringify(params));

                const redirectTo = route.query.redirect?.toString();
                (window as any).location = redirectTo ? redirectTo : '/';
                console.log('no error');
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            handleServerErrors(error);
        } finally {
            loadingLogin.value = false;
        }
    };

    function setCookie({ cname, cvalue }: ICookie): void {
        document.cookie = `${cname}=${cvalue};SameSite=None;Secure`;
    }

    function navigateTo(params: any) {
        //   !!(window as any).flutter_inappwebview &&
        //       (window as any).flutter_inappwebview.callHandler('login', params);
        !!(window as any).login && (window as any).login.postMessage(params);
    }

    function checkParamsError(value: any) {
        for (const key in value) {
            (formParams as any)[key] = (value as any)[key];
            if ((formParams as any)[key] === '') {
                (errors as any)[key] = (tmpErrors as any)[key];
            } else {
                switch (key) {
                    case 'username':
                        let isEmailValid: boolean = emailValidation(
                            (formParams as any)[key]
                        );
                        if (!isEmailValid) {
                            (errors as any)[key] = 'Votre email est invalide';
                        } else {
                            (errors as any)[key] = '';
                        }
                        break;
                    default:
                        (errors as any)[key] = '';
                        break;
                }
            }
        }
    }

    function handleServerErrors(error: any) {
        /**
         * init all error and field
         */
        // formParams.username = '';
        // formParams.password = '';
        // formParams.confirmPassword = '';
        activeError.value = !activeError.value;
        const param = ['username', 'password', 'confirmPassword'];
        checkParamsError(param);
        // errors = Object.assign(errors, tmpErrors);

        
        /**
         *
         */
        serverErrorMsg.value = "Une erreur s'est produite, Veuillez réessayer";
        if (
            (!!error.status && error?.status === 401) ||
            (!!error.code && /^4/g.test(error.code))
        ) {
            serverErrorMsg.value = 'Identifiants incorrects';
        }
    }

    const handleSubmit = (type?: string) => {
        activeError.value = true;
        serverErrorMsg.value = '';
        console.log(errors);
        console.log(type);
        switch (type) {
            case 'password':
                // const isValidConfirmation: boolean = confirmPassWordValid()
                confirmPassWordValid() && handleValidPassword();
                break;
            case 'email':
                confirmMailValid() && handleConfirmMail();
                break;
            case '':
                console.log('default');
                const { confirmPassword, ...parseErr } = errors;
                const isDataValid: Boolean = Object.values({
                    ...parseErr,
                }).every((value) => value === '');
                isDataValid === true
                    ? handleUserLogin()
                    : console.log('not ok');
                break;
        }
    };

    const gotoForgotPsw = () => {
        loginDisplay.value = 'confirm';
    };

    const gotoLoginPage = () => {
        loginDisplay.value = 'login';
    };

    const confirmMailValid = () => {
        const { password, confirmPassword, ...parseErr } = errors;
        const areNotEmpty = Object.values({ ...parseErr }).every(
            (v) => v === ''
        );
        return areNotEmpty;
    };

    const confirmPassWordValid = () => {
        const { username, ...parseErr } = errors;
        const areNotEmpty = Object.values({ ...parseErr }).every(
            (v) => v === ''
        );
        const isValid =
            formParams.confirmPassword === formParams.password && areNotEmpty;
        errors.confirmPassword = !isValid
            ? 'Le mot de passe ne conrespond pas'
            : '';
        return isValid;
    };

    const handleConfirmMail = async () => {
        loadingLogin.value = true;
        try {
            const data = await UserService.confirmMail({
                url: window.location.origin + '/connexion',
                email: formParams.username,
            });
            confirmNow.value = true;
            loadingLogin.value = false;
        } catch (error) {}
    };

    const handleValidPassword = async () => {
        loadingLogin.value = true;
        try {
            const data = await UserService.reinitializePassword({
                token: route.params.content as string,
                password: formParams.password,
            });
            console.log(data, 'data');
            router.push('/connexion');
            loadingLogin.value = false;
        } catch (error) {}
    };

    onMounted(() => {
        loginDisplay.value = 'login';
        if (route.params.content !== undefined) {
            loginDisplay.value = 'edit';
        } else {
            console.log('have no params');
        }
    });
</script>
<style lang="scss">
    .auth {
        &__form-container--error-server {
            color: salmon;
            font-size: 14px;
            text-align: center;
            display: block;
            margin-bottom: 10px;
        }
        &__forgotpwd {
            text-decoration: none;
            //   margin-bottom: 10px;
            cursor: pointer;
        }
        &__confirm {
            color: var(--color-green);
            font-weight: 400;
        }
    }
</style>
