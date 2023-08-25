import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
    Router,
    RouteLocationNormalized,
} from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior: (to: RouteLocationNormalized) => {
        if (to) {
            return { selector: to.hash };
        }

        return { left: 0, top: 0 };
    },
});

export default router;
