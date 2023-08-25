// Check for token and localstorage here
import store from '@/store';
import axios, { AxiosStatic } from 'axios';
import { Router } from 'vue-router';
import { routesName } from './routes';

export function routeGuard(_: Router, __: Router, next: Function) {
    next('/');
}

// guard auth

export function requiresAuthGuard(
    to: Router | any,
    _: Router | any,
    next: Function
): boolean {
    const User = store.getters['UserModule/getUserDetails'];
    const isLoggedIn = !!User;
    const url = to.params?.user ? to.params.user : to.fullPath;
    if (to.meta.requireAuth) {
        if (!isLoggedIn) {
            if (
                routesName.find((key) => key === url) ||
                /^\/services\//.test(url)
            ) {
                next({
                    name: 'authLogin',
                    query: { redirect: to.fullPath },
                });
            } else {
                next({ name: 'not-found' });
            }
        } else {
            next();
        }
        return true;
    }
    return false;
}

// logout
export function logoutGuard(_: Router | any, __: Router | any, next: Function) {
    delete (axios as AxiosStatic).defaults.headers.common['Authentication'];
    store.dispatch('UserModule/setUserDetails', null);
    localStorage.clear();
    next('/');
}

export function requiresRegistrationGuard(
    to: Router | any,
    from: Router | any,
    next: Function
) {
    if (to.meta.shouldRegisterAnUser) {
        const User = store.getters['UserModule/getRegisteredUser'];
        console.log(User, 'store user');
        if (!Object.keys(User).length) {
            // console.log('user.length OK');
            console.log('user.length NOT OK');
            next(from.fullPath);
        }
        next();
    }
}

export function errorExistGuard(
    _: Router | any,
    from: Router | any,
    next: Function
) {
    const errorStatus = store.getters['ErrorModule/getErrorStatus'];
    store.dispatch('ErrorModule/setError', {
        errorStatus,
        errorRedirection: from.fullPath,
    });
    if (errorStatus) {
        next();
    } else {
        next('/');
    }
}

export function alreadyLoggedIn(
    _: Router | any,
    __: Router | any,
    next: Function
) {
    const User = store.getters['UserModule/getUserDetails'];
    const isLoggedIn = !!User;
    console.log(isLoggedIn);
    if (!isLoggedIn) {
        next();
    } else {
        next('/');
    }
}
