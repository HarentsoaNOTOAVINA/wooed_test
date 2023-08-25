<template>
    <div class="stepCreated">
        <Title
            type="h2"
            label="Créer un nouveau jardin collectif"
            class="stepCreated__title"
        />
        <div class="stepCreated__container">
            <hr class="__hr" />
            <Steps
                :data="dataStep"
                stepPosition="horizontal"
                :disable="disabled"
                @next="next"
                @prev="prev"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Steps from '@/components/Display/Steps/index.vue';
    import { ref, watch } from 'vue';
    import FindLand from './FindLand.vue';
    import IdentityActors from './IdentityActors.vue';
    import EstablishDocument from './EstablishDocument.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import SolicitExpressions from './SolicitExpressions.vue';
    import EstablishPartnership from './EstablishPartnership.vue';
    import EstablishAgreement from './EstablishAgreement.vue';
    import PostApplication from './PostApplication.vue';
    import OrganizeMeeting from './OrganizeMeeting.vue';
    
    interface typeDataSteps {
        label: string;
        content?: object;
    }

    const dataStep: typeDataSteps[] = [
        {
            label: 'Trouver un terrain',
            content: FindLand,
        },
        {
            label: 'Identifier les acteurs du projet',
            content: IdentityActors,
        },
        {
            label: 'Etablir un document de présentation du projet',
            content: EstablishDocument,
        },
        {
            label: 'Solliciter des marques d’intérêt',
            content: SolicitExpressions,
        },
        {
            label: 'Etablir un partenariat',
            content: EstablishPartnership,
        },
        {
            label: 'Etablir une convention d’occupation',
            content: EstablishAgreement,
        },
        {
            label: 'Poster votre appel à candidatures',
            content: PostApplication,
        },
        {
            label: 'Organiser une réunion (visite du terrain, lancement du projet…)',
            content: OrganizeMeeting,
        },
    ];

    const disabled = ref<boolean>(false);
    // interface


    const next = async (nextPage: string) => {
        // console.log('next step');
    };
    const prev = (prevPage: string) => {
        // console.log('previous step');
    };
</script>
<style lang="scss" scoped>
    .stepCreated {
        @apply flex flex-col gap-[18px];
        &__title {
            @apply text-[16px] text-grayIcon  font-[600];
        }
        &__container {
            @apply m-0;
        }
        &:deep() {
            .steps__container {
                @apply mb-0 px-0 pb-0;
            }
            .ant-steps {
                @apply w-full;
            }
            .ant-steps-item {
                @apply p-0;
            }
            .ant-steps-item-container {
                @apply flex p-0;
            }
            .ant-steps-item-content {
                width: calc(100% - 21px);
            }
            .ant-steps-item-icon {
                @apply w-[21px] h-[21px] bg-gray border-gray m-0;
            }
            .ant-steps-icon {
                @apply text-primary font-[600];
            }
            .ant-steps-item-process
                > .ant-steps-item-container
                > .ant-steps-item-icon
                .ant-steps-icon {
                @apply text-primary font-[600];
            }
            .ant-steps-item-active,
            .ant-steps-item-finish {
                .ant-steps-item-container
                    > .ant-steps-item-icon
                    .ant-steps-icon {
                    @apply text-white font-[600];
                }
                .ant-steps-item-icon {
                    @apply bg-primary border-primary;
                }
            }
            .ant-steps-item-finish {
                .ant-steps-item-title {
                    &::after {
                        @apply bg-grayIcon;
                    }
                }
            }
            .ant-steps-item-title {
                @apply h-full;
                span {
                    @apply block text-primary text-[14px] font-[600] leading-[17px];
                    @media (min-width: 576px) {
                        @apply hidden;
                    }
                }
                &::after {
                    width: calc(100% - 10px);
                    @apply h-[4px] left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%];
                }
            }
            .steps-content {
                @apply text-left bg-transparent mt-0 pt-0;
            }
            .horizontal-steps {
                @apply gap-[14px];
            }
            .ant-steps-item {
                @apply hidden;
            }
            .ant-steps-item-active {
                @apply block;
            }
            @media (max-width: 575px) {
                .ant-steps-vertical > .ant-steps-item .ant-steps-item-content {
                    min-height: 0;
                }
                .ant-steps-item-container {
                    @apply flex items-center gap-[10px];
                }
            }
            @media (min-width: 576px) {
                .ant-steps-item {
                    @apply block;
                }
            }
            .steps__container {
                @apply mt-0;
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
