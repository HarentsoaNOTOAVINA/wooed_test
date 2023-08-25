import { createStore, StoreOptions } from 'vuex';
import * as HomeModule from './HomeModule';
import * as UserModule from './UserModule';
import * as ProductsListModule from './ProductListModule';
import * as SubscriptionModule from './SubscriptionModule';
import * as BienDetailModule from './BienDetailModule';
import * as FindPropertyModule from './findProperty/index';
import * as AddProductModule from './AddProductModule/index';
import * as PropertyDetailModule from './PropertyDetailModule/index';
import * as MakeOfferModule from './MakeOfferModule';
import * as AgenceModule from './AgenceModule';
import * as SellerModule from './SellerModule';
import * as ErrorModule from './ErrorModule';
import * as NotaryModule from './NotaryModule/index';
import * as AccountMenuSelectedModule from './AccountMenuSelectedModule';
import * as miniMailBoxModule from './miniMailBox/index';
import * as NotificationModule from './NotificationModule';
import * as NearByServicesModule from './NearByServicesModule';
import * as FinancialModule from './FinancialModule';
import * as PrecompteModule from './PrecompteModule';
import * as AssuranceModule from './AssuranceModule';
import * as ExchangePropertyModule from './ExchangePropertyModule';
import * as CommunityModule from './CommunityModule';
import * as TransportModule from './transportModule';
import * as MobilityModule from './MobilityModule';

import * as RentalModule from './RentalModule';
import * as EducationModule from './EducationModule';
import * as UrbanismeModule from './UrbanismeModule';
import * as HeritageModule from './HeritageModule';
import * as SecurityModule from './SecurityModule';
import * as WorksModule from './WorksModule';
import * as MessagesModule from './MessagesModule';
import * as SupplierModule from './SupplierModule';
import * as EnvironmentModule from './EnvironmentModule';
import * as CollectiveGardenModule from './CollectiveGardenModule';
import * as ManagePropertyModule from './ManageProperty';
import * as PrimesModule from './PrimesModule';
import * as SurveyModule from './SurveyModule';
import * as SyndicModule from './SyndicModule';
import * as CoPropertyModule from './CoPropertyModule';
import * as WagendaModule from './WagendaModule';
import * as ArtHomeModule from './ArtHomeModule';


// Create a new store instance.
const store = createStore<any>(<StoreOptions<any>>{
    modules: {
        SupplierModule: <Object>{
            namespaced: true,
            ...SupplierModule,
            persist: true,
        },
        AssuranceModule: <Object>{
            namespaced: true,
            ...AssuranceModule,
        },
        ExchangePropertyModule: <Object>{
            namespaced: true,
            ...ExchangePropertyModule,
        },
        NotificationModule: <Object>{
            namespaced: true,
            ...NotificationModule,
        },
        AccountMenuSelectedModule: <Object>{
            namespaced: true,
            ...AccountMenuSelectedModule,
            persit: true,
        },
        UserModule: <Object>{
            namespaced: true,
            ...UserModule,
            persist: true,
        },
        ProductsListModule: <Object>{
            namespaced: true,
            ...ProductsListModule,
            // persist: true,
        },
        SubscriptionModule: <Object>{
            namespaced: true,
            ...SubscriptionModule,
            persist: true,
        },
        BienDetailModule: <Object>{
            namespaced: true,
            ...BienDetailModule,
            persist: true,
        },
        FindPropertyModule: <Object>{
            namespaced: true,
            ...FindPropertyModule,
            persist: true,
        },
        AddProductModule: <Object>{
            namespaced: true,
            ...AddProductModule,
        },
        PropertyDetailModule: <Object>{
            namespaced: true,
            ...PropertyDetailModule,
            // persist: true,
        },
        MakeOfferModule: <Object>{
            namespaced: true,
            ...MakeOfferModule,
        },
        AgenceModule: <Object>{
            namespaced: true,
            ...AgenceModule,
            persist: true,
        },
        SellerModule: <Object>{
            namespaced: true,
            ...SellerModule,
        },
        NotaryModule: <Object>{
            namespaced: true,
            ...NotaryModule,
        },
        miniMailBoxModule: <Object>{
            namespaced: true,
            ...miniMailBoxModule,
        },
        NearByServicesModule: <Object>{
            namespaced: true,
            ...NearByServicesModule,
        },
        FinancialModule: <Object>{
            namespaced: true,
            ...FinancialModule,
        },
        TransportModule: <Object>{
            namespaced: true,
            ...TransportModule,
        },
        ErrorModule: <Object>{
            namespaced: true,
            ...ErrorModule,
        },
        PrecompteModule: <Object>{
            namespaced: true,
            ...PrecompteModule,
        },
        CommunityModule: <Object>{
            namespaced: true,
            ...CommunityModule,
        },
        RentalModule: <Object>{
            namespaced: true,
            ...RentalModule,
        },

        EducationModule: <Object>{
            namespaced: true,
            ...EducationModule,
        },

        MobilityModule: <Object>{
            namespaced: true,
            ...MobilityModule,
        },
        UrbanismeModule: <Object>{
            namespaced: true,
            ...UrbanismeModule,
        },
        HeritageModule: <Object>{
            namespaced: true,
            ...HeritageModule,
        },
        SecurityModule : <Object>{
            namespaced : true,
            ...SecurityModule,
        },
        WorksModule: <Object>{
            namespaced: true,
            ...WorksModule,
        },
        MessagesModule: <Object>{
            namespaced: true,
            ...MessagesModule,
        },
        EnvironmentModule: <Object>{
            namespaced: true,
            ...EnvironmentModule,
        },
        ManagePropertyModule : <Object>{
            namespaced : true,
            ...ManagePropertyModule,
        },
        PrimesModule : <Object>{
            namespaced : true,
            ...PrimesModule,
        },
        SurveyModule : <Object>{
            namespaced : true,
            ...SurveyModule
        },
        CollectiveGardenModule: <Object>{
            namespaced: true,
            ...CollectiveGardenModule,
        },
        SyndicModule: <Object>{
            namespaced: true,
            ...SyndicModule,
        },

        CoPropertyModule: <Object>{
            namespaced: true,
            ...CoPropertyModule,
        },
        WagendaModule: <Object>{
            namespaced: true,
            ...WagendaModule,
        },
        ArtHomeModule: <Object>{
            namespaced: true,
            ...ArtHomeModule,
        },
    },
});

export default store;
