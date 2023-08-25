<template>
    <div>
        <MobilityCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="bike__section"
        >
            <div class="bike__container">
                <template v-if="!typeView">
                    <div
                        v-for="(item, index) in dataBikes"
                        :key="index"
                        class="bike__items"
                        @click="handleClick(item)"
                    >
                        <div class="bike__content">
                            <Icon :icon-name="item.icon" />
                            <span>{{ item.label }}</span>
                        </div>
                        <Icon icon-name="ArrowNext" />
                    </div>
                </template>
                <template v-else>
                    <component :is="typeView" :country="country" />
                </template>
            </div>
        </MobilityCard>
    </div>
</template>
<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import MobilityCard from '@/pages/mobility/components/MobilityCard.vue';
    import SaveBikes from './components/Bikes/SaveBikes/SaveBikes.vue';
    import FindBikes from './components/Bikes/FindBikes/FindBikes.vue';

    import { ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    
    const store = useStore();
    const route = useRouter()

    const dataBikes = [
        {
            icon: 'SaveAs',
            label: 'Enregistrer mon vélo',
            component: SaveBikes,
        },
        {
            icon: 'FindIn',
            label: 'Rétrouver mon vélo',
            component: FindBikes,
        },
        {
            icon: 'Speaker',
            label: 'Déclarer le vol de mon vélo',
            country: [
                {
                    id: 3,
                    country: 'BE',
                    path: 'https://apps.digital.belgium.be/forms/show/police/bikeTheft?lng=fr',
                },

                {
                    id: 4,
                    country: 'FR',
                    path: 'https://www.pre-plainte-en-ligne.gouv.fr/unite/',
                },
            ],
        },
        {
            icon: 'Bikes',
            label: 'Louer un vélo',
        },
        {
            icon: 'Garages',
            label: 'Trouver un abri pour mon vélo',
        },
    ];

    const breadcrumbListsData = [
        {
            url: '/mobilite',
            label: 'Mobilité',
        },
        {
            label: 'Vélos',
            url: '/mobilite/velos',
        },
    ];

    const typeView = ref<any>();
    const country = ref<string>('');

    onMounted(() => {
        checkCountry();
    });

    const checkCountry = function () {
        country.value = store.getters['UserModule/getUserDetails'].country;
    };

    const handleClick = function (item: any) {
        typeView.value = item?.component;
        if (item.country && item.country.length > 0) {
            item.country.forEach((element: any) => {
                if (country.value === element.country)
                    (window as any).open(element.path, '_blank');
            });
        } else if (item.icon === "Bikes" || item.icon === "Garages") typeLocation()
    };

    const typeLocation = function () {
        store.dispatch('AddProductModule/setPropertyData', {
            data: { operationType: 'lease' },
        });
        route.push("/ajouter");
    };
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .bike {
        &__container {
            @apply flex flex-col gap-y-[18px];
        }
        &__items {
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            line-height: 17px;
            @apply bg-white text-grayIcon flex items-center justify-between p-[16px] border border-gray rounded-[4px];
            @include hoverButtonDark;
        }
        &__content {
            @apply flex items-center gap-x-[16px];
        }
    }
</style>
