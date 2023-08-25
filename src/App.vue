<script setup lang="ts">
    import AppHeader from '@/components/Layouts/AppHeader.vue';
    import { onBeforeUnmount, onMounted, ref, watch, computed } from 'vue';
    import Loader from './components/Common/Loader/Loader.vue';
    import router from '@/routes';
    import store from '@/store';
    import { useSocketNotification } from './composables/socket/socket';
    import moment from 'moment';
    import SubscriptionModal from './pages/subscription/subscriptionModal.vue';

    const { notifications, evtSource, initSocket } = useSocketNotification();

    const isLoading = ref<boolean>(false);
    const isOnline = ref<boolean>(navigator.onLine);
    const isShowSubscription = ref<boolean>(false);
    router.beforeEach(() => {
        isLoading.value = true;
    });

    moment.locale('fr', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
            '_'
        ),
        monthsShort:
            'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
                '_'
            ),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split(
            '_'
        ),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function (number) {
            return number + (number === 1 ? 'er' : 'e');
        },
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        // In case the meridiem units are not separated around 12, then implement
        // this function (look at locale/id.js for an example).
        // meridiemHour : function (hour, meridiem) {
        //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
        // },
        meridiem: function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4, // Used to determine first week of the year.
        },
    });

    router.afterEach(() => {
        isLoading.value = false;
    });

    watch(
        () => notifications?.value,
        (v) => {
            store.dispatch('NotificationModule/setNotifications', v);
        },
        { immediate: true, deep: true }
    );
    watch(
        () => store.getters['UserModule/getUserDetails'],
        (v) => {
            if (v) {
                initSocket();
            } else {
                if (evtSource.value) {
                    evtSource.value.close();
                }
            }
        },
        { immediate: true }
    );
    watch(
        () => isOnline.value,
        (v) => {
            const currentUrl: string =
                location.pathname === '/no-connection'
                    ? history.state.back
                    : location.pathname;
            store.dispatch('ErrorModule/setUrl', currentUrl);
            v ? router.push(currentUrl) : router.push('/no-connection');
        },
        { immediate: true }
    );
    watch(
        () =>  store.getters['ErrorModule/getAbonnementError'],
        (v) => {
            isShowSubscription.value = v;
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        
        setHtml2PDF()

    });
    onBeforeUnmount(() => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
    });

    function setHtml2PDF() {
        function addScript(url: string) {
            var script = document.createElement('script');
            script.type = 'application/javascript';
            script.src = url;
            document.head.appendChild(script);
        }
        addScript(
            'https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js'
        );
    }

    function updateOnlineStatus(e: Event) {
        const { type } = e;
        isOnline.value = type === 'online';
    }

</script>

<template>
    <AppHeader />
    <template v-if="isLoading">
        <transition appear name="fade-page" mode="out-in">
            <Loader />
        </transition>
    </template>
    <router-view v-else v-slot="{ Component }">
        <transition appear name="fade-page" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
    <SubscriptionModal :showModal="isShowSubscription" />
</template>
<style lang="scss" scoped>
    .fade-page-enter-active,
    .fade-page-leave-active {
        transition: all 0.4s ease;
        visibility: hidden;
        transition-delay: 0.1s;
    }

    .fade-page-enter-from,
    .fade-page-leave-to {
        opacity: 0;
        visibility: visible;
    }
</style>
