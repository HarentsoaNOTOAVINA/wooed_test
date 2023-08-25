<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import CommunityCard from '@/pages/community/components/CommunityCard.vue';
    import { onMounted, ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';

    const router = useRouter();
    const type = ref('');

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

    const communityMenu = [
        {
            label: 'Consultation',
            icon: 'Consultation',
            link: '/community/categorie',
            name: 'Consultation',
        },
        {
            label: 'Comité de quartier',
            icon: 'QuarterCommittee',
            link: '/community/categorie',
            name: 'quarterCommittee',
        },
        {
            label: 'Divers services',
            icon: 'Service',
            link: '/community/categorie',
            name: 'Service',
        },
        {
            label: 'Education',
            icon: 'Education',
            link: '/community/categorie',
            name: 'Education',
        },
    ];

    function handleAddParamsRoute(name: string) {
        router.push({ name: 'community', query: { type: name } });
    }

    onMounted(() => {
        if (router.currentRoute.value.query.type) {
            type.value = router.currentRoute.value.query.type as string;
        }
    });
</script>

<template>
    <CommunityCard label-title="Communauté" class="communityMenu__section">
        <div class="communityMenu__container">
            <!-- :to="item.link" -->
            <div
                v-for="(item, index) in communityMenu"
                :key="index"
                class="communityMenu__link"
                @click="handleAddParamsRoute(item.name)"
            >
                <CardWrapper class="communityMenu__item">
                    <Icon :icon-name="item.icon" class="communityMenu__icon" />
                    <Title
                        type="h2"
                        :label="item.label"
                        weight="600"
                        class="communityMenu__title"
                    />
                </CardWrapper>
            </div>
        </div>
    </CommunityCard>
</template>
<style lang="scss" scoped>
    .communityMenu {
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
            &:hover,
            &:active {
                .communityMenu__item {
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
