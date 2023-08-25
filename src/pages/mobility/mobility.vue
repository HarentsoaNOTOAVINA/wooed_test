<template>
    <div>
        <MobilityCard
            label-title="Mobilité"
            :dataBreadcrumbs="breadcrumbListsData"
            class="mobilityMenu__section"
        >
            <div class="mobilityMenu__container">
                <!-- :to="item.link" -->
                <div
                    v-for="(item, index) in mobilityMenu"
                    :key="index"
                    class="mobilityMenu__link"
                    @click="handleClick(item.type, item.link)"
                >
                    <CardWrapper class="mobilityMenu__item">
                        <Icon
                            :icon-name="item.icon"
                            class="mobilityMenu__icon"
                        />

                        <Title
                            type="h2"
                            :label="item.label"
                            weight="600"
                            class="mobilityMenu__title"
                        />
                    </CardWrapper>
                </div>
            </div>
        </MobilityCard>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import MobilityCard from '@/pages/mobility/components/MobilityCard.vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';

    const route = useRouter();
    const store = useStore();

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '#',
        },
    });

    interface MenuContent {
        label: string;
        icon: string;
        link: string;
        type: string;
    }

    const mobilityMenu: MenuContent[] = [
        {
            label: 'Chantier en cours',
            icon: 'BuildingHome',
            link: '/mobilite/chantier',
            type: 'worksite',
        },
        {
            label: 'Défectuosité',
            icon: 'ToolsWork',
            link: '/mobilite/defectuosite',
            type: 'defect',
        },
        {
            label: 'Velos',
            icon: 'Bike',
            link: '/mobilite/velos',
            type: 'bike',
        },
        {
            label: 'Covoiturage',
            icon: 'CarLight',
            link: '/mobilite/covoiturage',
            type: 'carpooling',
        },
    ];

    const breadcrumbListsData = [
        {
            label: 'Mobilité',
        },
    ];

    const region = ref<string>('');

    onMounted(() => {
        checkCountry();
    });

    const checkCountry = function () {
        region.value = store.getters['UserModule/getUserDetails'].region;
    };

    const handleClick = function (type: string, link: string) {
        switch (type) {
            case 'worksite':
                store.dispatch('MobilityModule/getListWorkSite');
                break;
        }
        if (type === 'defect') {
            switch (region.value) {
                case 'flandre':
                    (window as any).open("https://meldpuntwegen.be/meldpuntwegen/index.html#", "_blank")
                    break;
                case 'Luxembourg':
                    (window as any).open("https://www.vdl.lu/fr/la-ville/participez-vous-aussi/report-it-signalez-un-incident", "_blank")
                    break;
                case 'Wallonie':
                    route.push(link);
                    break;
            }
        } else {
        }
        route.push(link);
    };
</script>

<style lang="scss" scoped>
    .mobilityMenu {
        &__container {
            @apply grid grid-cols-1 gap-[10px] w-full;
            @screen sm {
                @apply grid-cols-2 gap-[21px];
            }
            @screen md {
                @apply grid-cols-4 gap-[21px];
            }
        }
        &__link {
            cursor: pointer;
            &:hover,
            &:active {
                .mobilityMenu__item {
                    @apply bg-strokeGray transition;
                }
            }
        }
        &__item {
            @apply flex flex-col items-center gap-[10px] transition-colors border-strokeGray;
        }
        &__title {
            @apply text-[14px];
        }
        &__icon {
            @apply w-[28px] h-[28px];
            @screen sm {
                @apply w-[40px] h-[40px];
            }
            &:deep() {
                svg {
                    @apply w-[100%] h-auto;
                }
            }
        }
    }
</style>
