import { computed } from 'vue';
import { useStore } from 'vuex';

export function useSlug() {
    const store = useStore();
    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    const usernameSlug = computed(
        () =>
            `/${userLoggedIn.value.name.toLowerCase()}-${userLoggedIn.value.firstname.toLowerCase()}`
    );

    return usernameSlug;
}
