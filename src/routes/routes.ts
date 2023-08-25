import {
    routeGuard,
    requiresAuthGuard,
    logoutGuard,
    requiresRegistrationGuard,
    alreadyLoggedIn,
    errorExistGuard,
} from './guard';
import { RouteRecordRaw } from 'vue-router';

const routes = <Array<RouteRecordRaw>>[
    {
        name: 'property-location',
        path: '/localisation/:coords',
        component: () => import('@/pages/locateProperty/locateProperty.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'exchange',
        path: '/echanger_un_bien',
        component: () => import('@/pages/exchange/exchange.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'tank-installation',
        path: '/installation-citerne/:uid/:thePropertyId',
        component: () =>
            import(
                '@/pages/supplier/components/Water/CiternInstallation/page/installationDemand.vue'
            ),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'engie-simulation',
        path: '/simulation-engie/:id',
        component: () =>
            import(
                '@/pages/supplier/components/EngieSimulation/EngieSimulation.vue'
            ),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'service-nearby',
        path: '/services/:id',
        component: () => import('@/pages/nearbyService/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'global-notification',
        path: '/notification',
        component: () => import('@/pages/notifications/notifications.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'pdf',
        path: '/pdf',
        component: () => import('@/pages/index.vue'),
    },
    {
        name: 'home',
        path: '/',
        props: true,
        component: () => import('@/pages/find-Property/homePage/index.vue'),
        children: [
            {
                path: '',
                component: () =>
                    import('@/pages/find-Property/homePage/searchCard.vue'),
                props: true,
            },
            {
                path: '/avancee',
                component: () =>
                    import('@/pages/find-Property/homePage/advancedSearch.vue'),
                props: (route) => ({
                    defaultAddress: route.query.defaultAddress,
                }),
            },
            {
                path: 'trouver-un-bien-sur-carte',
                component: () =>
                    import('@/pages/find-Property/components/FindMap.vue'),
                props: (route) => ({
                    requestOrigin: route.query.requestOrigin,
                }),
            },
        ],
    },

    {
        name: 'property-finder',
        path: '/trouver-un-bien',
        component: () =>
            import('@/pages/find-Property/homePage/ResultPage.vue'),
        props: (route) => ({
            defaultAddress: route.query.defaultAddress,
        }),
    },
    {
        name: 'find-property-lease',
        path: '/trouver-un-bien-en-location',
        component: () => import('@/pages/find-Property/lease/index.vue'),
    },

    {
        path: '/about',
        component: () => import('@/pages/about.vue'),
        beforeEnter: [routeGuard],
    },
    {
        name: 'authLogin',
        path: '/connexion',
        component: () => import('@/pages/login/Login.vue'),
        beforeEnter: [alreadyLoggedIn],
    },
    {
        name: 'authForgotPassword',
        path: '/connexion/:content',
        component: () => import('@/pages/login/Login.vue'),
        beforeEnter: [alreadyLoggedIn],
    },
    {
        name: 'authRegistration',
        path: '/inscription',
        component: () => import('@/pages/registration/Registration.vue'),
        beforeEnter: [alreadyLoggedIn],
    },
    {
        name: 'authSubscription',
        path: '/abonnement',
        component: () =>
            import('@/pages/registration/SubscriptionSection/Subscription.vue'),
        beforeEnter: [requiresRegistrationGuard],
        meta: { shouldRegisterAnUser: true },
    },
    {
        name: 'Subscription',
        path: '/abonnements',
        component: () =>
            import('@/pages/registration/SubscriptionSection/Subscription.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true },
    },
    {
        name: 'authValidation',
        path: '/success/:token',
        component: () => import('@/pages/login/Validation.vue'),
        // beforeEnter: [requiresRegistrationGuard],
        // meta: { shouldRegisterAnUser: true },
    },
    {
        name: 'authSubscriptionConfirmation',
        path: '/confirmation',
        component: () => import('@/pages/registration/Confirmation.vue'),
        beforeEnter: [requiresRegistrationGuard],
        meta: { shouldRegisterAnUser: true },
    },
    {
        path: '/styleguide',
        component: () => import('@/pages/Styleguide.vue'),
    },
    {
        name: 'art-home-index',
        path: '/mes-biens',
        component: () => import('@/pages/artHome/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'art-home',
        path: '/art-home',
        component: () => import('@/pages/artHome/artHome.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'user-account',
        path: '/:user',
        component: () => import('@/pages/user-account/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'agency-account',
        path: '/compte-agence/:username',
        component: () => import('@/pages/user-account/AgenceAccount/index.vue'),
    },
    {
        name: 'disconnection',
        path: '/logout',
        beforeEnter: [logoutGuard],
    },
    {
        name: 'find-property',
        path: '/recherche-bien/',
        component: () => import('@/pages/find-Property/index.vue'),
    },
    {
        name: 'find-property-by-city',
        path: '/recherche-bien/ville',
        component: () => import('@/pages/find-Property/ByCity.vue'),
    },
    {
        name: 'find-property-by-agency',
        path: '/recherche-bien/agence',
        component: () => import('@/pages/find-Property/ByAgency.vue'),
    },
    {
        name: 'find-property-by-map',
        path: '/recherche-bien/carte',
        component: () => import('@/pages/find-Property/ByMap.vue'),
    },
    {
        name: 'find-property-by-criteria',
        path: '/recherche-bien/critere',
        component: () => import('@/pages/find-Property/byCriteria.vue'),
    },
    {
        name: 'street-view',
        path: '/detail/:id/street-view',
        component: () => import('@/pages/detail/streetView/index.vue'),
    },
    {
        name: 'sign',
        path: '/signature-offre-location/:id(\\d+)/:offerId(\\d+)',
        component: () => import('@/pages/lease/offer/sign.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'sign-directly',
        path: '/signature-offre-location/:id',
        component: () => import('@/pages/lease/offer/sign.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'detail',
        path: '/detail/:id',
        component: () => import('@/pages/detail/index.vue'),
    },
    {
        name: 'product-list',
        path: '/liste-produit/:operationType',
        component: () => import('@/pages/product-list/List.vue'),
        props: (route) => ({
            defaultAddress: route.query.defaultAddress,
        }),
    },

    {
        name: 'location',
        path: '/detail/localisation/:id',
        component: () =>
            import('@/pages/detail/components/Location/Location.vue'),
    },
    /*start Profile -> Make offer*/

    {
        name: 'rental-processes',
        path: '/rental-processes/:id',
        component: () => import('@/pages/make-offer-location/index.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'rent-procedure',
        path: '/rent-procedure/:id',
        component: () =>
            import('@/pages/make-offer-location/RentOfferForm.vue'),
    },
    {
        name: 'offres',
        path: '/offres/:id',
        component: () =>
            import(
                '@/pages/user-account/Menu/Purchases/Seller/components/OfferList/OfferList.vue'
            ),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'contre-offre',
        path: '/contre-offre/:id',
        component: () =>
            import(
                '@/pages/user-account/Menu/Purchases/Common/CounterOfferForm/CounterOfferForm.vue'
            ),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'etat-des-lieux',
        path: '/etat-des-lieux/:id',
        component: () => import('@/pages/lease/overview/mainoverview.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    /*end Profile -> Make offer*/

    /*======= COCOLIS =======*/

    /* --- page d'acceuil transport --- */
    {
        name: 'transport',
        path: '/transport',
        component: () => import('@/pages/transport/transport.vue'),
    },

    /* --- liste des annonces --- */
    {
        name: 'transport-announcements',
        path: '/transport/annonces',
        component: () => import('@/pages/transport/Announcements/index.vue'),
    },
    // listing des types
    {
        name: 'transport-create-announcement',
        path: '/transport/nouvelle-annonce',
        component: () =>
            import('@/pages/transport/SendReceivePackage/index.vue'),
    },
    /* --- tous types d'objets page --- */
    {
        name: 'transport-all-object-announcement',
        path: '/transport/nouvelle-annonce/tout-type-d-objets',
        component: () =>
            import('@/pages/transport/SendReceivePackage/AllObjects/index.vue'),
    },
    /* --- demenagement page --- */
    {
        name: 'transport-moving-announcement',
        path: '/transport/nouvelle-announce/demenagement',
        component: () =>
            import('@/pages/transport/SendReceivePackage/Moving/index.vue'),
    },
    {
        name: 'moving',
        path: '/demenagement/:id',
        component: () => import('@/pages/moving/moving.vue'),
    },
    /* --- vehicule page --- */
    {
        name: 'transport-vehicle-announcement',
        path: '/transport/nouvelle-annonce/vehicule',
        component: () =>
            import('@/pages/transport/SendReceivePackage/Vehicle/index.vue'),
    },
    /* --- propositions --- */
    {
        name: 'transport-propositions',
        path: '/transport/annonce/:reference/liste-propositions',
        component: () => import('@/pages/transport/Propositions/index.vue'),
    },
    /* --- map --- */
    {
        name: 'transport-itinerary',
        path: '/transport/annonce/:reference/itineraire',
        component: () => import('@/pages/transport/Announcements/map.vue'),
    },

    /* --- Ajout bien --- */
    {
        name: 'ajout-property',
        path: '/ajouter-bien',
        component: () => import('@/pages/addProperty/addProperty.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true },
    },
    {
        name: 'ajout-location',
        path: '/ajouter-location',
        component: () => import('@/pages/addProperty/AddLocation.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true },
    },
    {
        name: 'add',
        path: '/ajouter',
        component: () => import('@/pages/addProduct/addProduct.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true },
    },

    {
        name: 'make-offer',
        path: '/faire-une-offre/:id',
        component: () => import('@/pages/make-offer/MakeOffer.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'make-offer-shared',
        path: '/faire-une-offre/partager/:id',
        component: () => import('@/pages/make-offer/offer-shared/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'contact-liste',
        path: '/liste-contact/:category',
        component: () => import('@/pages/contact-list/contactList.vue'),
        beforeEnter: [requiresAuthGuard],
    },
    {
        name: 'approximated-service',
        path: '/service-approximite',
        component: () =>
            import('@/pages/approximated-service/ListeServices.vue'),
    },

    /* syndic */
    {
        name: 'syndic',
        path: '/syndic-d-immeuble',
        component: () => import('@/pages/syndic/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },

    {
        name: 'agenda',
        path: '/mon-agenda',
        component: () => import('@/pages/user-account/Menu/WAgenda/index.vue'),
    },

    /* coproperty */
    {
        name: 'coproperty',
        path: '/copropriete/:id',
        component: () => import('@/pages/coproperty/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'my-coproperty',
        path: '/ma-copropriete',
        component: () => import('@/pages/coproperty/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },

    /**
     * @start error
     */
    {
        name: 'not-found',
        path: '/:path(.*)*',
        component: () => import('@/pages/error/404.vue'),
    },
    {
        name: 'server-error',
        path: '/error',
        component: () => import('@/pages/error/Server.vue'),
        beforeEnter: [errorExistGuard],
    },
    {
        name: 'no-connection-error',
        path: '/no-connection',
        component: () => import('@/pages/error/NoConnection.vue'),
    },
    /**
     * @end error
     */
    //=============mini Mail Box ============
    {
        name: 'mini-mail-box',
        path: '/mini-boite-mail',
        component: () => import('@/pages/miniMailBox/miniMailBox.vue'),
        // beforeEnter: [requiresAuthGuard],
    },
    //=======================================
    {
        name: 'finance-index',
        path: '/finance-index',
        component: () => import('@/pages/finance/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'finance-menu',
        path: '/finance/:id',
        component: () => import('@/pages/finance/Menu.vue'),
    },
    {
        name: 'financial-help',
        path: '/financial-help/:id',
        component: () => import('@/pages/finance/FinancialHelp.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'financial-simulation',
        path: '/simulation-finance',
        component: () => import('@/pages/finance/FinancialHelp.vue'),
    },
    {
        name: 'coproperty-charge',
        path: '/coproperty-charge',
        component: () =>
            import('@/pages/finance/CopropertyCharge/CopropertyCharge.vue'),
    },
    {
        name: 'community-menu',
        path: '/community',
        component: () =>
            import('@/pages/community/CommunityMenu/CommunityMenu.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'education',
        path: '/education',
        component: () => import('@/pages/education/index.vue'),
    },
    {
        name: 'community',
        path: '/community/categorie',
        component: () => import('@/pages/community/Community.vue'),
    },
    {
        name: 'committee-creation',
        path: '/committee-creation',
        component: () =>
            import(
                '@/pages/community/QuarterCommittee/QuarterCommitteeCreation/QuarterCommitteeCreation.vue'
            ),
    },
    {
        name: 'publication',
        path: '/community/publication/:id',
        component: () =>
            import(
                '@/pages/community/components/CommunityPublication/CommunityPublication.vue'
            ),
    },
    {
        name: 'messageId',
        path: '/messages/:id',
        component: () => import('@/pages/messages/messages.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'message',
        path: '/messages',
        component: () => import('@/pages/messages/messages.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'otherService',
        path: '/community/divers-services',
        component: () => import('@/pages/community/OtherService.vue'),
    },
    {
        name: 'consultation',
        path: '/community/consultation',
        component: () => import('@/pages/community/Consultation.vue'),
    },
    {
        name: 'mobility',
        path: '/mobilite',
        component: () => import('@/pages/mobility/mobility.vue'),
    },
    {
        name: 'worksite',
        path: '/mobilite/chantier',
        component: () => import('@/pages/mobility/worksite.vue'),
    },
    {
        name: 'defect',
        path: '/mobilite/defectuosite',
        component: () => import('@/pages/mobility/defect.vue'),
    },
    {
        name: 'bikes',
        path: '/mobilite/velos',
        component: () => import('@/pages/mobility/bikes.vue'),
    },
    {
        name: 'carpooling',
        path: '/mobilite/covoiturage',
        component: () => import('@/pages/mobility/carpooling.vue'),
    },
    {
        name: 'carpooling-find',
        path: '/mobilite/recherche-covoitureur',
        component: () =>
            import('@/pages/mobility/components/Carpooling/CarpoolingFind.vue'),
    },
    {
        name: 'carpooling-service',
        path: '/mobilite/service-covoitureur',
        component: () =>
            import(
                '@/pages/mobility/components/Carpooling/CarpoolingService.vue'
            ),
    },
    //====================== Urbanisme =================
    {
        name: 'urbanism',
        path: '/urbanisme',
        component: () => import('@/pages/urbanism/Urbanism.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'urbanism-content',
        path: '/urbanisme/:id',
        component: () => import('@/pages/urbanism/Content.vue'),
    },
    {
        name: 'urbanism-status',
        path: '/ubanisme-status',
        component: () => import('@/pages/urbanism/UrbanStatus/index.vue'),
    },
    {
        name: 'integration',
        path: '/integration',
        component: () =>
            import(
                '@/pages/addProduct/components/Envirironment/Environment.vue'
            ),
    },

    //====================== Patrimoine =================
    {
        name: 'heritage',
        path: '/patrimoine',
        component: () => import('@/pages/heritage/Heritage.vue'),
    },
    {
        name: 'heritage-result',
        path: '/patrimoine/:id',
        component: () => import('@/pages/heritage/Result.vue'),
    },
    //====================== Security =================
    {
        name: 'security',
        path: '/security/:id',
        component: () => import('@/pages/security/security.vue'),
    },
    //====================== end security =================

    // ===================== Travaux =====================
    {
        name: 'work',
        path: '/travaux',
        component: () => import('@/pages/work/Work.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'work-home',
        path: '/travaux/:id',
        component: () => import('@/pages/work/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'work-maintains',
        path: '/travaux/entretien/:id',
        component: () => import('@/pages/work/Maintains/index.vue'),
    },
    {
        name: 'work-boiler',
        path: '/travaux/chaudiere/:id',
        component: () => import('@/pages/work/Boiler/index.vue'),
    },
    {
        name: 'work-boiler-installation',
        path: '/travaux/chaudiere/installation/:id',
        component: () => import('@/pages/work/Boiler/IndexInstallation.vue'),
    },
    {
        name: 'work-boiler-repair',
        path: '/travaux/chaudiere/reparation/:id',
        component: () => import('@/pages/work/Boiler/Repair/IndexRepair.vue'),
    },
    {
        name: 'work-boiler-replace',
        path: '/travaux/chaudiere/remplace/:id',
        component: () => import('@/pages/work/Boiler/Replace/IndexReplace.vue'),
    },
    {
        name: 'work-boiler-move',
        path: '/travaux/chaudiere/deplacer/:id',
        component: () => import('@/pages/work/Boiler/Moving/IndexMove.vue'),
    },
    {
        name: 'work-boiler-diagnostic',
        path: '/travaux/chaudiere/diagnostic/:id',
        component: () =>
            import('@/pages/work/Boiler/Diagnostic/IndexDiagnostic.vue'),
    },
    {
        name: 'work-boiler-log-book',
        path: '/travaux/chaudiere/carnet-de-bord/:id',
        component: () => import('@/pages/work/Boiler/LogBook/IndexLogBook.vue'),
    },
    {
        name: 'work-emergency',
        path: '/travaux/urgent/:id',
        component: () => import('@/pages/work/Emergency/index.vue'),
    },
    {
        name: 'work-tanks',
        path: '/travaux/citerne/:id',
        component: () => import('@/pages/work/Tank/index.vue'),
    },
    {
        name: 'work-form-pollution',
        path: '/travaux/doubler-paroi/alert-de-pollution-du-sol',
        component: () =>
            import('@/pages/work/Tank/FormSoilPollution/FormSoilPollution.vue'),
    },
    {
        name: 'transformation-works',
        path: '/travaux/travaux-de-transformation/:id',
        component: () =>
            import('@/pages/work/TransformationWorks/TransformationWorks.vue'),
    },
    //====================== Assurance =================
    {
        name: 'assurance',
        path: '/assurance/:id',
        component: () => import('@/pages/assurance/assurance.vue'),
    },
    //===================ENVIRONMENT START============================

    {
        name: 'environment-detail',
        path: '/environnement/:id(\\d+)',
        component: () => import('@/pages/Environment/Environment.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'environment-comp',
        path: '/environnement/:id/:feature',
        component: () => import('@/pages/Environment/Environment.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'environment',
        path: '/environnement',
        component: () => import('@/pages/Environment/Environment.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'viewer',
        path: '/visualisation-pdf',
        component: () => import('@/pages/viewer/index.vue'),
    },

    //===================ENVIRONMENT END============================

    // {
    //     name: 'indexUrba',
    //     path: '/urbanisme',
    //     component: () => import('@/pages/urbanism/UrbaMenu/index.vue'),
    // },

    /**
     * Gérer mon bien
     */

    {
        name: 'manage-property',
        path: '/manage-property',
        component: () => import('@/pages/manageProperty/Manage.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'ajouter',
        path: '/manage-property/ajouter',
        component: () =>
            // import('@/pages/manageProperty/addProperty/AddProperty.vue'),
            import('@/pages/manageProperty/map/Map.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'details',
        path: '/manage-property/details/:id',
        component: () =>
            import(
                '@/pages/manageProperty/DetailsProperty/DetailsProperty.vue'
            ),
        meta: { requireAuth: true, isUserValid: true },
    },

    /**
     * Primes
     */
    {
        name: 'primes',
        path: '/primes/:id',
        component: () => import('@/pages/primes/Primes.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },

    {
        name: 'procedures',
        path: '/primes/procedures/:id',
        component: () => import('@/pages/primes/Details/DetailsProcedure.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    {
        name: 'Demandes',
        path: '/primes/procedures/demandes',
        component: () => import('@/pages/primes/MakeRequest/Request.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },

    /**
     * End primes
     */

    //====================== Fournisseur =================
    {
        name: 'supplier',
        path: '/fournisseur/:id',
        component: () => import('@/pages/supplier/supplierMenu.vue'),
    },
    {
        name: 'supplier-gas',
        path: '/fournisseur/gaz/:id',
        component: () => import('@/pages/supplier/supplierGas.vue'),
    },
    {
        name: 'supplier-water',
        path: '/fournisseur/eau/:id',
        component: () => import('@/pages/supplier/supplierWater.vue'),
    },
    {
        name: 'supplier-electricity',
        path: '/fournisseur/electricite/:id',
        component: () => import('@/pages/supplier/supplierElectricity.vue'),
    },
    {
        name: 'carrier-info',
        path: '/transport/information',
        component: () => import('@/pages/transport/components/CarrierInfo.vue'),
    },

    //=======================End Fournisseur ================

    /**Doodle */
    {
        name: 'survey',
        path: '/survey',
        component: () => import('@/pages/doodle/Survey.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },

    {
        name: 'details survey',
        path: '/survey/:id',
        component: () => import('@/pages/doodle/Details/Details.vue'),
        meta: { requireAuth: true, isUserValid: true },
    },
    /**End doodle */

    /** Subcription */
    {
        name: 'subscription-modal',
        path: '/abonnement-modal',
        component: () => import('@/pages/subscription/subscriptionModal.vue'),
    },
    /** End subscription */

    /** Terms */
    {
        name: 'confidentiality',
        path: '/regle-confidentialite',
        component: () => import('@/pages/cms/ConfidentialityRules.vue'),
    },
    {
        name: 'user',
        path: '/regle-utilisation',
        component: () => import('@/pages/cms/UseRules.vue'),
    },
    {
        name: 'privacy',
        path: '/politique-confidentialite',
        component: () => import('@/pages/cms/PrivacyPolicy.vue'),
    },
    {
        name: 'preamble',
        path: '/preambule',
        component: () => import('@/pages/cms/Preamble.vue'),
    },
    {
        name: 'infoRelative',
        path: '/information_relative',
        component: () => import('@/pages/relativePropertyInfo/index.vue'),
        children: [
            {
                name: 'streetView',
                path: '/information_relative/street_view',
            },
        ],
    },
    /**End terms */

    /* Begin gestion location */
    {
        name: 'rentalManagement',
        path: '/gestion-location/:id',
        component: () =>
            import('@/pages/rentalManagement/rentalManagement.vue'),
    },
    /* End gestion location */
];

export const routesName = routes.map((item) => item.path);

export default routes;
